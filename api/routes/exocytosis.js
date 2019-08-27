

// wrapper + proxy for cytosis (for getting stuff out of airtable)

const express = require('express');
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

  console.log('[exo/loadCytosis] loading Config w/ ', airKey, ' /// ', airBase )
  try {
    const _config = Cytosis.getConfig({
      airKey: airKey,
      airBase: airBase,
      routeName: routeName
    });

    return _config;
  } catch(err) {
    console.error('[exo/loadCytosis] Failed to load Config! Failing silently', err)
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
      payloads,
    });
    return _cytosis;
  } catch(err) {
    console.error('[exo/loadCytosis] Failed to load Cytosis! Failing silently', err)
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
      // ignore this error, since we're reading the file to see if there's anything in there
      // if (err) {
      //   console.log("[exocytosis/updateData] failed to save data to: ", fileName);
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
          console.log("[exocytosis/updateData] failed to save data to: ", fileName);
          // throw(new Error("Failed to save data"))
          reject(err)
        } else {
          resolve(outdata)
          // console.log('[exocytosis/updateData] successfully saved data to: ', fileName);                                
        }
      });

    });
  })
}

// forcefully overwrites data
function writeData({fileName, key, payload}) {
  return new Promise(function(resolve, reject) {
    fs.writeFile('/tmp/'+fileName, JSON.stringify(payload), (err) => {
      if (err) {
        console.log("[exocytosis/writeData] failed to save data to: ", fileName);
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
          console.log("[exocytosis/deleteFile] failed to delete ", fname, err);
          reject(err)
        } else {
          // console.log('[exocytosis/deleteFile] successfully deleted', fname);    
          resolve(fname)                            
        }
      });
    } catch(err) {
      console.log("[exocytosis/deleteFile] failed to delete ", fname, err);
      reject(undefined)
    }
  })
}

function deleteAll() {
  return new Promise(function(resolve, reject) {
    // deletes all json files
    const directory = '/tmp'
    fs.readdir(directory, (err, files) => {
      if (err) {
        console.log("[exocytosis/deleteFile] failed to delete /tmp/ files ", err);
        reject(err);
      }

      for (const file of files) {
        // console.log('[exocytosis/deleteAll] File:', file)
        if(file.substring(file.length-5) == '.json') {
          console.log('[exocytosis/deleteAll] Deleting JSON file:', file)
          const filename = file
          fs.unlink(path.join(directory, file), err => {
            if (err) throw err;
          });
          console.log('[exocytosis/deleteAll] all /tmp/ files deleted');
          resolve(true)
        }
      }
    });
  })
}

app.get('/api/exocytosis/delete/file', (req, res, next) => {
  const dataName = makeDataName(req)
  console.log('[exocytosis] Clearing data:', req.query, 'name:', dataName)
  deleteFile(dataName + '.json').then((data) => {
    res.end(200)
  }).catch(next)
})

app.get('/api/exocytosis/delete/all', (req, res) => {
  deleteAll().then((data) => {
    console.log("[exocytosis] All json files deleted successfully")
    res.status(200).end("All json files are gone!")
  }).catch(next)
})

app.get('/api/exocytosis/list/all', (req, res, next) => {
  try {
    const directory = '/tmp'
    fs.readdir(directory, (err, files) => {
      if (err) {
        next(err)
      } else {
        for (const file of files) {
          console.log('file:', file)
        }
        res.status(200).send({files})
      }
    });
  } catch(err) {
    next(err) // send to error handler
  }
})



//
// Cytosis Config (_cytosis object) caching
// - grabbing these things hits the airtable DB a lot
//


function updateConfigCache({cytosis}) {
  return new Promise(function(resolve, reject) {
    try {
      // cache current cytosis request to /tmp
      console.log('[exocytosis] caching config w/ key:', cytosis.airBase.id)
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
      console.log("[exocytosis/updateData] failed to update config cache ");
      reject(undefined)
    }
  })
}

// Re-cache the config
// Need to ping: https://phage.directory/api/exocytosis/config/cache?appYvj7j9Ta5I15ks&tableQuery=_content
app.get('/api/exocytosis/cache/config', (req, res, next) => {
  try {
    console.log('[exocytosis] caching config', req.query)
    // console.log('[exocytosis] key', process.env.AIRTABLE_PUBLIC_BASE)
    const routeName = '{exo config cache}'

    loadCytosisConfig({
      routeName: "[exo/cache:config]",
      _base: req.query.airBase,
    }).then((data) => {

      updateData({
        fileName: 'config.json',
        key: req.query.airBase,
        payload: data,
      }).then((data) => {
        console.log('[exocytosis] Config cache generated data for:', req.query)
        res.status(200).send({
          message: `Config cache complete`,
          result: JSON.stringify(data)
        })
      })
    }).catch( (err) => {
      console.error('[exocytosis] Unable to cache config.json', req.query, err)
      next(err) // send to error handler
      // res.status(500).send()
      // res.status(200).send() // fail quietly
    })
  } catch(err) {
    next(err) // send to error handler
  }
})


// Retrieve cached config
app.get('/api/exocytosis/get/config', (req, res, next) => {
  try {
    console.log('[exocytosis] Finding config.json')
    fs.readFile('/tmp/config.json', 'utf8', function(err, contents) {
      if(err) {
        console.error("[exocytosis] config.json not found", req.query)
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

app.get('/api/exocytosis/clear/config', (req, res, next) => {
  try {
    console.log('[exocytosis] Deleting config.json')
    deleteFile('config.json').then(data => {
      res.status(200).send('config.json deleted')
    }, (err) => {
      next(err)
    })
  } catch(err) {
    next(err) // send to error handler
  }
})







// 
//    Airtable Data Content Caching
// 

// uses query to make a coherent file name
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
  return name
}


// Retrieve cached data
app.get('/api/exocytosis/get/data', (req, res, next) => {
  try {
    const dataName = makeDataName(req)
    // console.log('[exocytosis] grabbing data:', req.query, 'name:', dataName, 'url:', req.originalUrl)
    // console.log('[exocytosis] Grabbing data:', req.query, 'name:', dataName)

    fs.readFile('/tmp/'+dataName+'.json', 'utf8', function(err, contents) {
      if(err) {
        console.error("[exocytosis] No file found for get/data: ", dataName)
        // res.status(500).send()
        // res.status(200).send() // return a blank for empty
        next(err)
      } else {
        if(contents) {
          // console.log('[exocytosis] data found!')
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

// example: http://localhost:2929/api/exocytosis/get/file?name=appYvj7j9Ta5I15ks-Node-AbsolutePath-keyword.json
app.get('/api/exocytosis/get/file', (req, res, next) => {
  try {
    // console.log('[exocytosis] grabbing file:', req.query.name)

    fs.readFile('/tmp/'+req.query.name, 'utf8', function(err, contents) {
      if(err) {
        // console.error("[exocytosis] No file found for get/file: ", req.query.name)
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



// ex: https://phage.directory/api/exocytosis/cache/data?airBase=appYvj7j9Ta5I15ks&tableQuery=_content&payloads=%7B%22keyword%22:%22phage-therapy-faq%22%7D
app.get('/api/exocytosis/cache/data', (req, res, next) => {
  try {
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
        }, (err) => { next(err) })
      } else {
        console.error("[exocytosis] cache/data didn't find any data; canceling cache process", data.tables)
        // TODO/FIX: Note: the current cache strategy generates cache files for pages that don't exist, which can lead to DDOS
        res.end()
      }
    }, (err) => {
      console.error('[exocytosis][SILENT FAIL] Unable to cache data', req.query, err)
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
  // console.error("[exocytosis][Silent Error]:", err.stack);
  res.end(false);
});


module.exports = app






