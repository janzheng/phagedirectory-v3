

/*

  EXOCYTOSIS — Cytosis API endpoit


  Server error tracker / notes / todo

  - large ones like https://phage.directory/api/exocytosis/data/cache?airBase=appYvj7j9Ta5I15ks&tableQuery=_content&payloads=%7B%22keyword%22:%22phages-at-asm%22%7D seem to get errors a lot
  - >>> maybe using keywords to build files isn't such a good idea
  - >>> this happens: "appYvj7j9Ta5I15ks-_content","appYvj7j9Ta5I15ks-_content-phage-therapy-aquaculture" and you get LOTS of repeated stuff that's massive 
  - >>> consider stripping some of the saved data as they're massive requests
  - >>> consider breaking \_content into \_chrome, homepage, \_forms, \_nodes etc
    - more requests is ok now b/c of caching
  - probably will need a cytosis/airtable proxy
    - this can act as a limiter / report airtable errors consistently
    - all cytosis calls would come through this proxy
    - could eventually be replaced with another airtable or other API

*/


// wrapper + proxy for cytosis (for getting stuff out of airtable)

const app = require('../app')
const fs = require('fs');
const util = require('util');

const path = require('path');
const cors = require('cors');
const Cytosis = require('cytosis');
// const Cytosis = require('../../other/cytosis.js');

const exo = require('./exo.js')
 
const async_readFile = util.promisify(fs.readFile);

app.use(require('express').json());


app.use(cors({
  origin: [
    'http://localhost:1919',
    'https://phage.directory',
    'https://www.phage.directory',
    'https://phagedirectory.yawnxyz.now.sh',
    'https://phagedirectory-spa.yawnxyz.now.sh',
  ]
}))












// 
//    FILE ENDPOINTS
// 

// use api/exocytosis/list to find files
// filename ex: http://localhost:2929/api/exocytosis/delete?file=appYvj7j9Ta5I15ks-_content.json
// filename ex: http://localhost:2929/api/exocytosis/delete?file=config.json
// query ex: https://phage.directory/api/exocytosis/delete?airBase=appYvj7j9Ta5I15ks&tableQuery=_content&payloads=%7B%22keyword%22:%22phage-therapy-faq%22%7D
// NOTE: errors out for unknown reasons but file still deletes: TypeError: First argument must be a string or Buffer
app.get('/api/exocytosis/cache/delete', (req, res, next) => {
  if(!req.query.file && !req.query.airBase) {
    // console.log('[exo/delete] /api/exocytosis/delete', req.query) 
    res.status(200).end("[exo/cache/delete][EXO:ERROR] Please provide a file name or a file query")
  }

  let dataName

  if(req.query.file)
    dataName = req.query.file
  else if(req.query.airBase)
    dataName = exo.makeDataName(req)

  // res.status(200).end(JSON.stringify(dataName))
  console.log('[exo/delete] Deleting file:', dataName)
  exo.deleteFile(dataName).then((fname) => {
    // console.log('[exo/delete] File successfully deleted', fname)
    res.end(200)
  }).catch((err) => {
    // throws a weird error every time even though the file's deleted properly
    // console.error('[exo/delete] Couldn\'t delete file:', dataName, err)
    next()
  })
})

// example: http://localhost:2929/api/exocytosis/cache/delete
app.get('/api/exocytosis/cache/clear', (req, res, next) => {
  exo.deleteAll().then((data) => {
    console.log("[exo/cache/clear] All json files deleted successfully")
    res.status(200).end("All json files are gone!")
  }).catch(err => {
    console.error('[exo/cache/clear][EXO:ERROR] Couldn\'t delete all files:', err)
    next()
  })
})

// example: http://localhost:2929/api/exocytosis/cache/list
app.get('/api/exocytosis/cache/list', (req, res, next) => {
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
      console.error('[exo/cache/list][EXO:ERROR] Couldn\'t list files:', err)
      next(err) // send to error handler
    }
  });
})

// example: http://localhost:2929/api/exocytosis/file/get?filename=appYvj7j9Ta5I15ks-Node-AbsolutePath-keyword.json
// example: http://localhost:2929/api/exocytosis/file/get?filename=config.json
app.get('/api/exocytosis/file/get', (req, res, next) => {
  try {
    // console.log('[exocytosis] grabbing file:', req.query.name)

    fs.readFile('/tmp/'+req.query.filename, 'utf8', function(err, contents) {
      if(err) {
        console.error("[exo/file/get][EXO:ERROR] No file found for file/get: ", req.query.name)
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


app.get('/api/exocytosis/config/setup', async (req, res, next) => {
  // find config from cache

  // load config from cache, if found send it away
  try {
    console.log('[exo/config/setup] Setting up config.json')
    // let config = await async_readFile('/tmp/config.json', 'utf8')
    let config = await exo.readFile('config.json')
    // console.log('[exo/config/setup] Cached config:', config)
    res.status(200).send(JSON.parse(config))
  } catch(err) {

    // if config from cache not found, load it through Cytosis
    // and save it to cache

    console.log('[exo/config/setup] No config file found.', req.query.airtables, err ? err : '')
    const airtables = JSON.parse(req.query.airtables)

    try {
      // build config files
      let configsP = [], _configArr = [], _config = {}
      airtables.map(async function({api, base}) {
        // without backoff
        configsP.push(Cytosis.getConfig({
          airKey: api,
          airBase: base,
          routeName: "nuxtServerInit-setup-config",
        }))
      })

      let configs = await Promise.all(configsP)
      // console.log('[nuxtServerInit/setupConfig] final configs :::' , configs)
      await configs.map(async function(configObj) {
        _configArr.push(configObj)
      })

      // return a config object that can be added to the store
      airtables.map(({api, base}, i) => {
        _config[base] = _configArr[i]
      })

      let save = await exo.writeFile({filename: 'config.json', payload: _config})

      res.send(_config)
    } catch(err) {
      // fail if configs not found
      next(err)
    }
  }
})

// Re-cache the config
// Example: http://localhost:2929/api/exocytosis/config/cache?airBase=appYvj7j9Ta5I15ks
// app.get('/api/exocytosis/config/cache', (req, res, next) => {
//   try {
//     if(!req.query.airBase) {
//       // console.log('[exo/config/cache] Please provide a key')
//       res.status(200).end("[exo/config/cache][EXO:ERROR] Please provide a key")
//       // next(err)
//     }
//     console.log('[exo/config/cache] caching config', req.query)
//     // console.log('[exocytosis] key', process.env.AIRTABLE_PUBLIC_BASE)
//     const routeName = 'exo-config-cache'

//     exo.loadCytosisConfig({
//       routeName: "exo-config-cache]",
//       _base: req.query.airBase,
//     }).then((data) => {

//       exo.updateFile({
//         filename: 'config.json',
//         key: req.query.airBase,
//         payload: data,
//       }).then((data) => {
//         console.log('[exo/config/cache] Config cache generated data for:', req.query)
//         res.status(200).send({
//           message: `Config cache complete`,
//           result: JSON.stringify(data)
//         })
//       }).catch( (err) => {
//         console.error('[exo/config/cache][EXO:ERROR] Unable to update data', req.query, err)
//         next(err) // send to error handler
//       })
//     }).catch( (err) => {
//       console.error('[exo/config/cache][EXO:ERROR] Unable to cache config.json', req.query, err)
//       next(err) // send to error handler
//     })
//   } catch(err) {
//     next(err) // send to error handler
//   }
// })


// Retrieve ALL config objects — it's mapped by base key
// example: http://localhost:2929/api/exocytosis/config/get
// note: equivalent to http://localhost:2929/api/exocytosis/file/get?name=config.json
// app.get('/api/exocytosis/config/get', (req, res, next) => {
//   try {
//     // console.log('[exocytosis] Finding config.json')
//     fs.readFile('/tmp/config.json', 'utf8', function(err, contents) {
//       if(err) {
//         console.error("[exo/config/get][EXO:ERROR] config.json not found", req.query)
//         // res.status(500).send()
//         // res.status(200).send() // return a blank for empty
//         next(err)
//       } else {
//         if(contents) {
//           res.status(200).send(JSON.parse(contents))
//         } else {
//           // res.status(200).send({ message: `contents empty.` })
//           res.status(200).send(undefined)
//         }
//       }
//     });
//   } catch(err) {
//     next(err) // send to error handler
//   }
// })



// example: http://localhost:2929/api/exocytosis/config/delete
app.get('/api/exocytosis/config/delete', (req, res, next) => {
  try {
    console.log('[exo/config/delete] Deleting config.json')
    exo.deleteFile('config.json').then(data => {
      res.status(200).send('config.json deleted')
    }).catch((err) => {
      console.error('[exo/config/delete][EXO:ERROR] Unable to delete config.json')
      next(err)
    })
  } catch(err) {
    next(err) // send to error handler
  }
})









// 
//    DATA ENDPOINTS
// 



// 
// Retrieve cached data / cache get
// http://localhost:2929/api/exocytosis/data/get?airBase=appYvj7j9Ta5I15ks&tableQuery=_content&payloads=%7B%22keyword%22:%22phage-therapy-faq%22%7D
// app.get('/api/exocytosis/data/get', async (req, res, next) => {
//   try {
//     if(!req.query.airBase) {
//       // console.log('[exo/data/get] Please provide a key')
//       res.status(200).end("[exo/data/get][EXO:ERROR] Please provide a key")
//       // next(err)
//     }

//     const dataName = exo.makeDataName(req)
//     console.log('[exo/data/get] Grabbing data:', req.query, 'name:', dataName)

//     let data = await exo.readFile(dataName)
//     console.log('[exo/data/get] Grabbed data:', data)
//     res.status(200).send()

//     // fs.readFile('/tmp/'+dataName, 'utf8', function(err, contents) {
//     //   if(err) {
//     //     // console.error("[exo/data/get][EXO:ERROR] No file found for data/get: ", dataName)
//     //     // res.status(500).send()
//     //     // res.status(200).send() // return a blank for empty
//     //     next(err)
//     //   } else {
//     //     if(contents) {
//     //       // console.log('[exo/data/get] data found!')
//     //       res.status(200).send(JSON.parse(contents))
//     //     } else {
//     //       // res.status(200).send({ message: `contents empty.` })
//     //       res.status(200).send(undefined)
//     //     }
//     //   }
//     // });
//   } catch(err) {
//     next(err) // send to error handler
//   }
// })


// a combination of data/get and data/cache, this one loads and caches data from cytosis 
// if a cached file isn't found
app.get('/api/exocytosis/data/fetch', async (req, res, next) => {

  try {
    if(!req.query.airBase) {
      // console.log('[exo/data/get] Please provide a key')
      res.status(200).end("[exo/data/fetch][EXO:ERROR] Please provide a key")
      // next(err)
    }

    const dataName = exo.makeDataName(req)
    // console.log('[exo/data/fetch] Feching data:', req.query, 'name:', dataName, 'filename:', dataName)

    // if there's cached data, send it and exit
    try {
      let filedata = await exo.readFile(dataName)
      // console.log('[exo/data/fetch] Successfully fetched data from file:', dataName)
      res.send(filedata)
    } catch(err) {

      try {
        // if no cached data, then get it from cytosis

        console.log('[exo/data/fetch] No cache found. Pulling data from Cytosis.')

        let config = req.query.config? JSON.parse(req.query.config) : undefined
        let cytosis = await exo.loadCytosis({
            routeName: req.query.routeName,
            tableQuery: req.query.tableQuery,
            // _key: req.query.airKey,
            _base: req.query.airBase,
            // payloads: payloads, 
            config: config,
            // note: don't use data/fetch for slugs, as it adds too much redundancy
          })

        cytosis = Cytosis.strip(cytosis)
        exo.writeFile({filename: dataName, payload: cytosis})
        res.send(cytosis)

      } catch(err) {
        console.log('[exo/data/fetch] Error pulling data from Cytosis')
        next(err) // send to error handler
      }
    }
  } catch(err) {
    console.log('[exo/data/fetch] Error:',)
    next(err) // send to error handler
  }
})

  // this version takes a config object
  app.post('/api/exocytosis/data/fetch', async (req, res, next) => {

    try {
      let request = req.body
      let config = request.config

      // console.log('[POST:exo/data/fetch] request:', req.query.airBase, request)
      if(!req.query.airBase) {
        // console.log('[exo/data/get] Please provide a key')
        res.status(200).end("[POST:exo/data/fetch] Please provide a key!")
        // next(err)
      }

      const dataName = exo.makeDataName(req)
      // console.log('[exo/data/fetch] Feching data:', req.query, 'name:', dataName, 'filename:', dataName)

      // if there's cached data, send it and exit
      try {
        let filedata = await exo.readFile(dataName)
        // console.log('[exo/data/fetch] Successfully fetched data from file:', dataName)
        res.send(filedata)
      } catch(err) {

        try {
          // if no cached data, then get it from cytosis

          // console.log('[exo/data/fetch] No cache found. Pulling data from Cytosis.', config)
          let cytosis = await exo.loadCytosis({
              routeName: req.query.routeName,
              tableQuery: req.query.tableQuery,
              // _key: req.query.airKey,
              _base: req.query.airBase,
              // payloads: payloads, 
              config: config,
              // note: don't use data/fetch for slugs, as it adds too much redundancy
            })

          cytosis = Cytosis.strip(cytosis)
          exo.writeFile({filename: dataName, payload: cytosis})
          res.send(cytosis)

        } catch(err) {
          console.log('[exo/data/fetch] Error pulling data from Cytosis', err)
          next(err) // send to error handler
        }
      }
    } catch(err) {
      console.log('[exo/data/fetch] Error:', err)
      next(err) // send to error handler
    }
  })














// ex: http://localhost:2929/api/exocytosis/data/cache?airBase=appYvj7j9Ta5I15ks&tableQuery=_content&payloads=%7B%22keyword%22:%22phage-therapy-faq%22%7D
// crash request list:
//    /api/exocytosis/data/cache?airBase=appYvj7j9Ta5I15ks&tableQuery=_content&payloads=%7B%7D
// app.get('/api/exocytosis/data/cache', (req, res, next) => {
//   try {
//     if(!req.query.airBase) {
//       // console.error('[exo/data/cache] Please provide a key')
//       res.status(200).end("[exo/data/cache][EXO:ERROR] Please provide a key")
//       // next(err)
//     }

//     const dataName = exo.makeDataName(req)
//     // console.log('[exocytosis] Caching data: ', req.query, 'name:', dataName)

//     const routeName = 'exo-data-cacher'
//     const tableQuery = req.query.tableQuery
//     let payloads

//     if(req.query.payloads)
//       payloads = JSON.parse(req.query.payloads)

//     exo.loadCytosis({
//       routeName: routeName,
//       tableQuery: tableQuery,
//       // _key: req.query.airKey,
//       _base: req.query.airBase,
//       payloads: payloads,
//     }).then(function(data) {
//       try {
//         // check if there's actually any data 
//         // console.error("[exocytosis] retrieved data:")
//         if(Object.keys(data.tables).length>0 && Object.keys(data.tables)[0].length > 0) {
//           writeData({
//             filename: dataName,
//             key: req.query.airBase,
//             payload: data,
//           }).then(data => {
//             // send back the data regardless
//             res.status(200).send(data)
//           }).catch((err) => { 
//             console.error('[exo/data/cache][EXO:ERROR] Unable to write to cache')
//             next(err) 
//           })
//         } else {
//           console.error("[exo/data/cache][EXO:ERROR] Didn't find any data in Cytosis; canceling cache process", data.tables)
//           // TODO/FIX: Note: the current cache strategy generates cache files for pages that don't exist, which can lead to DDOS
//           next(err)
//         }
//       } catch(err) {
//         next(err) // send to error handler
//       }
//     }).catch((err) => {
//       console.error('[exo/data/cache][EXO:ERROR] Unable to get cytosis data', req.query, err)
//       next(err) // send to error handler
//     })
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






