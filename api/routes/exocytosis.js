

/*

  EXOCYTOSIS — Cytosis API endpoit


  Server error tracker:

  - large ones like https://phage.directory/api/exocytosis/cache/data?airBase=appYvj7j9Ta5I15ks&tableQuery=_content&payloads=%7B%22keyword%22:%22phages-at-asm%22%7D seem to get errors a lot
  - >>> maybe using keywords to build files isn't such a good idea
  - >>> this happens: "appYvj7j9Ta5I15ks-_content","appYvj7j9Ta5I15ks-_content-phage-therapy-aquaculture" and you get LOTS of repeated stuff that's massive 
  - >>> consider stripping some of the saved data as they're massive requests
  - >>> consider breaking \_content into \_chrome, homepage, \_forms, \_nodes etc
    - more requests is ok now b/c of caching

  - maybe test all the endpoints
    - all file endpoints tested
    - all function handlers should be ok


*/


// wrapper + proxy for cytosis (for getting stuff out of airtable)

const app = require('../app')
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const Cytosis = require('cytosis');
// const Cytosis = require('../../other/cytosis.js');

// app.use(express.static('tmp'));


app.use(cors({
  origin: [
    'http://localhost:1919',
    'https://phage.directory',
    'https://www.phage.directory',
    'https://phagedirectory.yawnxyz.now.sh',
    'https://phagedirectory-spa.yawnxyz.now.sh',
  ]
}))



// returns a promise
function loadCytosisConfig({routeName, _key, _base}) {
  const airKey = _key || process.env.PD_AIRTABLE_PUBLIC_API
  const airBase = _base || process.env.PD_AIRTABLE_PUBLIC_BASE

  console.log('[exo/loadCytosisConfig] loading Config w/ ', airKey, ' /// ', airBase )
  try {
    const _config = Cytosis.getConfig({
      airKey: airKey,
      airBase: airBase,
      routeName: routeName,
    });

    return _config;
  } catch(err) {
    console.error('[exo/loadCytosisConfig][EXO:ERROR] Failed to load Config! Failing silently', err)
    return Promise.reject(undefined)
  }
}

// returns a promise
function loadCytosis({routeName, tableQuery, options, payloads, config, _key, _base}) {
  const airKey = _key || process.env.PD_AIRTABLE_PUBLIC_API
  const airBase = _base || process.env.PD_AIRTABLE_PUBLIC_BASE

  console.log('[exo/loadCytosis] loading Cytosis w/ ', airKey, ' /// ', airBase )
  try {
    const _cytosis = new Cytosis({
      airKey: airKey,
      airBase: airBase,
      tableQuery,
      options,
      config,
      payloads
    });
    return _cytosis;
  } catch(err) {
    console.error('[exo/loadCytosis][EXO:ERROR] Failed to load Cytosis! Failing silently', err)
    return Promise.reject(undefined)
  }
}



// 
//  Filesystem / Data styff
// 

// returns a promise
// updates data by loading the data and appending the key
function updateData({fileName, key, payload}) {
  return new Promise(function(resolve, reject) {
    fs.readFile('/tmp/'+fileName, 'utf8', function(err, contents) {
      try {

        // ignore this error, since we're reading the file to see if there's anything in there
        // if (err) {
        //   console.log("[exo/updateData] failed to save data to: ", fileName);
        //   // throw(new Error("Failed to save data"))
        //   reject(err)
        // }

        let outdata, fdata
        if(contents) {
          fdata = JSON.parse(contents)
          fdata[key] = payload // could overwrite whatever's already there, which is ok
          outdata = fdata
        } else {
          let data = {}
          data[key] = payload
          outdata = data
        }

        fs.writeFile('/tmp/'+fileName, JSON.stringify(outdata), (err) => {
          if (err) {
            console.log("[exo/updateData] failed to save data to: ", fileName);
            // throw(new Error("Failed to save data"))
            reject(err)
          } else {
            resolve(outdata)
            // console.log('[exo/updateData] successfully saved data to: ', fileName);                                
          }
        });

      } catch(err) {
        console.log("[exo/updateData] failed to update ", fileName, err);
        reject(undefined)
      }

    });
  })
}

// forcefully overwrites data
function writeData({fileName, key, payload}) {
  return new Promise(function(resolve, reject) {
    fs.writeFile('/tmp/'+fileName, JSON.stringify(payload), (err) => {
      if (err) {
        console.log("[exo/writeData] failed to save data to: ", fileName);
        reject(err)
      } else {
        // console.log('[exocytosis/writeData] saving data to: ', fileName); 
        // console.log('[exocytosis/writeData] successfully saved data to: ', fileName);  
        resolve(payload)
      }
    });
  })
}

function deleteFile(fname) {
  return new Promise(function(resolve, reject) {
    try {
      fs.unlink(`/tmp/${fname}`, (err) => {
        if (err) {
          console.log("[exo/deleteFile] failed to delete ", fname, err);
          reject(err)
        } else {
          console.log('[exo/deleteFile] successfully deleted', fname);    
          resolve(true)                            
        }
      });
    } catch(err) {
      console.error("[exo/deleteFile][EXO:ERROR] failed to delete ", fname, err);
      reject(undefined)
    }
  })
}

// TODO: this is not really async, but it's not used in production
function deleteAll() {
  return new Promise(function(resolve, reject) {
    // deletes all json files
    const directory = '/tmp'
    fs.readdir(directory, (err, files) => {
      try {
        if (err) {
          console.log("[exo/deleteAll] failed to delete /tmp/ files ", err);
          reject(err);
        }

        for (const file of files) {
          // console.log('[exocytosis/deleteAll] File:', file)
          if(file.substring(file.length-5) == '.json') {
            console.log('[exo/deleteAll] Deleting JSON file:', file)
            const filename = file
            fs.unlink(path.join(directory, file), err => {
              if (err) {
                // don't exit on error (e.g. file system), just keep looping
                // throw err;
              } else {
                console.log('[exo/deleteAll] All JSON files successfully deleted');    
                // resolve(fname)                            
              }
            });
          }
        }
        console.log('[exo/deleteAll] all /tmp/ files deleted');
        resolve(true)
      } catch(err) {
        console.error('[exo/deleteAll][EXO:ERROR] Files not deleted', err);
        reject()
      }
    });
  })
}

function updateConfigCache({cytosis}) {
  return new Promise(function(resolve, reject) {
    try {
      // cache current cytosis request to /tmp
      console.log('[exo/updateConfigCache] caching config w/ key:', cytosis.airBase.id)
      updateData({
        fileName: 'config.json',
        key: cytosis.airBase.id, 
        payload: cytosis.config
      }).then((data) => {
        resolve(data)
      }, (err) => {
        reject(err)
      })
      // console.log('[exocytosis/cacheCytosis] config:', config)
    } catch(err) {
      console.log("[exo/updateConfigCache][EXO:ERROR] failed to update config cache ");
      reject(undefined)
    }
  })
}

// uses query to make a coherent file name.json
function makeDataName(req) {
  // current strategy is to use [airtable_basekey]-[tableQuery]-[keyword]
  // this helps create multiple tiny files, rather than a mega file 
  let name = `${req.query.airBase}-${req.query.tableQuery}`
  // console.log('keyword ??? :', req.query.payloads)
  let keyword = JSON.parse(req.query.payloads)['keyword']
  if(keyword) {
    // console.log('keyword:', keyword)
    name += `-${keyword}`
  }
  return name + '.json'
}




















// 
//    FILE ENDPOINTS
// 

// use api/exocytosis/list to find files
// filename ex: http://localhost:2929/api/exocytosis/delete?file=appYvj7j9Ta5I15ks-_content.json
// filename ex: http://localhost:2929/api/exocytosis/delete?file=config.json
// query ex: https://phage.directory/api/exocytosis/delete?airBase=appYvj7j9Ta5I15ks&tableQuery=_content&payloads=%7B%22keyword%22:%22phage-therapy-faq%22%7D
// NOTE: errors out for unknown reasons but file still deletes: TypeError: First argument must be a string or Buffer
app.get('/api/exocytosis/delete', (req, res, next) => {
  if(!req.query.file && !req.query.airBase) {
    // console.log('[exo/delete] /api/exocytosis/delete', req.query) 
    res.status(200).end("[exo/delete][EXO:ERROR] Please provide a file name or a file query")
  }

  let dataName

  if(req.query.file)
    dataName = req.query.file
  else if(req.query.airBase)
    dataName = makeDataName(req)

  // res.status(200).end(JSON.stringify(dataName))
  console.log('[exo/delete] Deleting file:', dataName)
  deleteFile(dataName).then((fname) => {
    // console.log('[exo/delete] File successfully deleted', fname)
    res.end(200)
  }).catch((err) => {
    // throws a weird error every time even though the file's deleted properly
    // console.error('[exo/delete] Couldn\'t delete file:', dataName, err)
    next()
  })
})

// example: http://localhost:2929/api/exocytosis/delete/all
app.get('/api/exocytosis/delete/all', (req, res) => {
  deleteAll().then((data) => {
    console.log("[exo/delete/all] All json files deleted successfully")
    res.status(200).end("All json files are gone!")
  }).catch(err => {
    console.error('[exo/delete/all][EXO:ERROR] Couldn\'t delete all files:', err)
    next()
  })
})

// example: http://localhost:2929/api/exocytosis/list
app.get('/api/exocytosis/list', (req, res, next) => {
  const directory = '/tmp'
  fs.readdir(directory, (err, files) => {
    try {
      if (err) {
        next(err)
      } else {
        for (const file of files) {
          console.log('file:', file)
        }
        res.status(200).send({files})
      }
    } catch(err) {
      console.error('[exo/list][EXO:ERROR] Couldn\'t list files:', err)
      next(err) // send to error handler
    }
  });
})

// example: http://localhost:2929/api/exocytosis/get/file?name=appYvj7j9Ta5I15ks-Node-AbsolutePath-keyword.json
// example: http://localhost:2929/api/exocytosis/get/file?name=config.json
app.get('/api/exocytosis/get/file', (req, res, next) => {
  try {
    // console.log('[exocytosis] grabbing file:', req.query.name)

    fs.readFile('/tmp/'+req.query.name, 'utf8', function(err, contents) {
      if(err) {
        console.error("[exo/get/file][EXO:ERROR] No file found for get/file: ", req.query.name)
        // res.status(200).send() // return a blank for empty
        next(err)
      } else {
        if(contents) {
          res.status(200).send(JSON.parse(contents))
        } else {
          // res.status(200).send({ message: `contents empty.` })
          res.status(200).send(undefined)
        }
      }
    });
  } catch(err) {
    next(err) // send to error handler
  }
})








// 
//    CONFIG ENDPOINTS
// 

// - grabbing these things hits airtable DB a lot


// Re-cache the config
// Example: http://localhost:2929/api/exocytosis/cache/config?airBase=appYvj7j9Ta5I15ks
app.get('/api/exocytosis/cache/config', (req, res, next) => {
  try {
    if(!req.query.airBase) {
      // console.log('[exo/cache/config] Please provide a key')
      res.status(200).end("[exo/cache/config][EXO:ERROR] Please provide a key")
      // next(err)
    }
    console.log('[exo/cache/config] caching config', req.query)
    // console.log('[exocytosis] key', process.env.AIRTABLE_PUBLIC_BASE)
    const routeName = '{exo config cache}'

    loadCytosisConfig({
      routeName: "[exo/cache/config]",
      _base: req.query.airBase,
    }).then((data) => {

      updateData({
        fileName: 'config.json',
        key: req.query.airBase,
        payload: data,
      }).then((data) => {
        console.log('[exo/cache/config] Config cache generated data for:', req.query)
        res.status(200).send({
          message: `Config cache complete`,
          result: JSON.stringify(data)
        })
      }).catch( (err) => {
        console.error('[exo/cache/config][EXO:ERROR] Unable to update data', req.query, err)
        next(err) // send to error handler
      })
    }).catch( (err) => {
      console.error('[exo/cache/config][EXO:ERROR] Unable to cache config.json', req.query, err)
      next(err) // send to error handler
    })
  } catch(err) {
    next(err) // send to error handler
  }
})


// Retrieve ALL config objects — it's mapped by base key
// example: http://localhost:2929/api/exocytosis/get/config
// note: equivalent to http://localhost:2929/api/exocytosis/get/file?name=config.json
app.get('/api/exocytosis/get/config', (req, res, next) => {
  try {
    // console.log('[exocytosis] Finding config.json')
    fs.readFile('/tmp/config.json', 'utf8', function(err, contents) {
      if(err) {
        console.error("[exo/get/config][EXO:ERROR] config.json not found", req.query)
        // res.status(500).send()
        // res.status(200).send() // return a blank for empty
        next(err)
      } else {
        if(contents) {
          res.status(200).send(JSON.parse(contents))
        } else {
          // res.status(200).send({ message: `contents empty.` })
          res.status(200).send(undefined)
        }
      }
    });
  } catch(err) {
    next(err) // send to error handler
  }
})



// example: http://localhost:2929/api/exocytosis/clear/config
app.get('/api/exocytosis/clear/config', (req, res, next) => {
  try {
    console.log('[exo/clear/config] Deleting config.json')
    deleteFile('config.json').then(data => {
      res.status(200).send('config.json deleted')
    }).catch((err) => {
      console.error('[exo/clear/config][EXO:ERROR] Unable to delete config.json')
      next(err)
    })
  } catch(err) {
    next(err) // send to error handler
  }
})









// 
//    DATA ENDPOINTS
// 



// Retrieve cached data
// http://localhost:2929/api/exocytosis/get/data?airBase=appYvj7j9Ta5I15ks&tableQuery=_content&payloads=%7B%22keyword%22:%22phage-therapy-faq%22%7D
app.get('/api/exocytosis/get/data', (req, res, next) => {
  try {
    if(!req.query.airBase) {
      res.status(200).end("[exo/get/data][EXO:ERROR] Please provide a key")
      // console.log('[exo/get/data] Please provide a key')
      // next(err)
    }

    const dataName = makeDataName(req)
    // console.log('[exo/get/data] grabbing data:', req.query, 'name:', dataName, 'url:', req.originalUrl)
    // console.log('[exo/get/data] Grabbing data:', req.query, 'name:', dataName)

    fs.readFile('/tmp/'+dataName, 'utf8', function(err, contents) {
      if(err) {
        console.error("[exo/get/data][EXO:ERROR] No file found for get/data: ", dataName)
        // res.status(500).send()
        // res.status(200).send() // return a blank for empty
        next(err)
      } else {
        if(contents) {
          // console.log('[exo/get/data] data found!')
          res.status(200).send(JSON.parse(contents))
        } else {
          // res.status(200).send({ message: `contents empty.` })
          res.status(200).send(undefined)
        }

      }

    });
  } catch(err) {
    next(err) // send to error handler
  }
})

// ex: http://localhost:2929/api/exocytosis/cache/data?airBase=appYvj7j9Ta5I15ks&tableQuery=_content&payloads=%7B%22keyword%22:%22phage-therapy-faq%22%7D
app.get('/api/exocytosis/cache/data', (req, res, next) => {
  try {
    if(!req.query.airBase) {
      // console.error('[exo/cache/data] Please provide a key')
      res.status(200).end("[exo/cache/data][EXO:ERROR] Please provide a key")
      // next(err)
    }

    const dataName = makeDataName(req)
    // console.log('[exocytosis] Caching data: ', req.query, 'name:', dataName)

    const routeName = '{exocytosis data cacher}'
    const tableQuery = req.query.tableQuery
    const payloads = JSON.parse(req.query.payloads)

    loadCytosis({
      routeName: routeName,
      tableQuery: tableQuery,
      // _key: req.query.airKey,
      _base: req.query.airBase,
      payloads: payloads,
    }).then(function(data) {
      // check if there's actually any data 
      // console.error("[exocytosis] retrieved data:")
      if(Object.keys(data.tables).length>0 && Object.keys(data.tables)[0].length > 0) {
        writeData({
          fileName: dataName,
          key: req.query.airBase,
          payload: data,
        }).then(data => {
          // send back the data regardless
          res.status(200).send(data)
        }).catch((err) => { 
          console.error('[exo/cache/data][EXO:ERROR] Unable to write to cache')
          next(err) 
        })
      } else {
        console.error("[exo/cache/data][EXO:ERROR] Didn't find any data in Cytosis; canceling cache process", data.tables)
        // TODO/FIX: Note: the current cache strategy generates cache files for pages that don't exist, which can lead to DDOS
        next(err)
      }
    }).catch((err) => {
      console.error('[exo/cache/data][EXO:ERROR] Unable to get cytosis data', req.query, err)
      next(err) // send to error handler
    })
  } catch(err) {
    next(err) // send to error handler
  }

})

// app.get('/api/exocytosis/log/data', (req, res) => {
//   try {
//     fs.readFile('/tmp/datalog.json', 'utf8', function(err, contents) {
//       if(err) {
//         console.error("[exocytosis] log/data went wrong", req.query)
//         res.status(200).send() // return a blank for empty
//       }

//       if(contents) {
//         res.status(200).send(JSON.parse(contents))
//       } else {
//         // res.status(200).send({ message: `contents empty.` })
//         res.status(200).send(undefined)
//       }

//     });
//   } catch(err) {
//     next(err) // send to error handler
//   }
// })


// error handling
app.use(function (err, req, res, next) {
  // All errors are already displayed elswehere
  // console.error("[EXO:ERROR]", err.stack);
  res.end(false);
});


module.exports = app






