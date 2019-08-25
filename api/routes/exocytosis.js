

// wrapper + proxy for cytosis (for getting stuff out of airtable)

const express = require('express');
const app = require('../app')
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const Cytosis = require('cytosis');

app.use(express.static('tmp'));


app.use(cors({
  origin: [
    'http://localhost:1919',
    'https://phage.directory',
    'https://www.phage.directory',
    'https://phagedirectory.yawnxyz.now.sh',
    'https://phagedirectory-spa.yawnxyz.now.sh',
  ]
}))

function loadCytosis({routeName, tableQuery, options, payloads, config, _key, _base}) {
  const airKey = _key || process.env.PD_AIRTABLE_PUBLIC_API
  const airBase = _base || process.env.PD_AIRTABLE_PUBLIC_BASE

  console.log('loading Cytosis w/ ', airKey, ' /// ', airBase )

  const _cytosis = new Cytosis({
    airKey: airKey,
    airBase: airBase,
    tableQuery,
    options,
    config,
    payloads,
  });
  return _cytosis;
}



// 
//  Filesystem / Data styff
// 

// updates data by loading the data and appending the key
function updateData({fileName, key, payload}) {

  fs.readFile('/tmp/'+fileName, 'utf8', function(err, contents) {
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
      } else {
        console.log('[exocytosis/updateData] successfully saved data to: ', fileName);                                
      }
    });
  });
}

// forcefully overwrites data
function writeData({fileName, key, payload}) {
  fs.writeFile('/tmp/'+fileName, JSON.stringify(payload), (err) => {
    if (err) {
      console.log("[exocytosis/updateData] failed to save data to: ", fileName);
    } else {
      console.log('[exocytosis/updateData] successfully saved data to: ', fileName);                                
      updateData({
        fileName: 'datalog.json',
        key: `${fileName}.json`,
        payload: {
          date: Date(),
        }
      })
    }
  });
}

function deleteFile(fname) {
  fs.unlink(`/tmp/${fname}`, (err) => {
    if (err) {
      console.log("[exocytosis/deleteFile] failed to delete ", fname, err);
    } else {
      console.log('[exocytosis/deleteFile] successfully deleted', fname);                                
    }
  });
}

function deleteAll() {
  // deletes all json files
  const directory = '/tmp'
  fs.readdir(directory, (err, files) => {
    if (err) throw err;

    for (const file of files) {
      console.log('[exocytosis/deleteAll] File:', file)
      if(file.substring(file.length-5) == '.json') {
        console.log('[exocytosis/deleteAll] Deleting JSON file:', file)
        const filename = file
        fs.unlink(path.join(directory, file), err => {
          if (err) throw err;
        });
      }
    }
  });

  console.log('[exocytosis/deleteAll] all /tmp/ files deleted');
}

app.get('/api/exocytosis/delete/file', (req, res) => {
  const dataName = makeDataName(req)
  console.log('[exocytosis] Clearing data:', req.query, 'name:', dataName)
  deleteFile(dataName + '.json')
})

app.get('/api/exocytosis/delete/all', (req, res) => {
  deleteAll()
  console.log("[exocytosis] All json files deleted successfully")
  res.status(200).send("All json files are gone!")
})

app.get('/api/exocytosis/list/all', (req, res) => {
  const directory = '/tmp'
  fs.readdir(directory, (err, files) => {
    if (err) throw err;

    for (const file of files) {
      console.log('file:', file)
    }

    res.status(200).send({files})
  });
})



//
// Cytosis Config (_cytosis object) caching
// - grabbing these things hits the airtable DB a lot
//


function updateConfigCache({cytosis}) {
  // cache current cytosis request to /tmp
  console.log('[exocytosis] caching config w/ key:', cytosis.airBase.id)
  updateData({
    fileName: 'config.json',
    key: cytosis.airBase.id, 
    payload: cytosis.config
  })
  // console.log('[exocytosis/cacheCytosis] config:', config)
}

// Re-cache the config
// Need to ping: https://phage.directory/api/exocytosis/config/cache?appYvj7j9Ta5I15ks&tableQuery=_content
app.get('/api/exocytosis/cache/config', (req, res) => {
  console.log('[exocytosis] caching config', req.query)
  // console.log('[exocytosis] key', process.env.AIRTABLE_PUBLIC_BASE)

  const routeName = '{exo config cache}'
  const tableQuery = req.query.tableQuery

  loadCytosis({
    routeName: routeName,
    tableQuery: tableQuery,
    // _key: req.query.airKey,
    _base: req.query.airBase,
  }).then(function(data, err) {
    if(err) {
      console.error("[exocytosis] cache/config went wrong", req.query)
      res.status(500).send()
    }

    updateData({
      fileName: 'config.json',
      key: req.query.airBase,
      payload: data,
    })


    console.log('[exocytosis] config cache generated data for:', req.query)
    res.status(200).send({
      message: `Config cache complete`,
      result: JSON.stringify(data)
    })
    if(err) {
      console.error('[exocytosis] No dice, exocytosis config cache failed.')
    }
  })
})


// Retrieve cached config
app.get('/api/exocytosis/get/config', (req, res) => {
  console.log('[exocytosis] grabbing config.json')

  fs.readFile('/tmp/config.json', 'utf8', function(err, contents) {
    if(err) {
      console.error("[exocytosis] get/config went wrong", req.query)
      // res.status(500).send()
      res.status(200).send() // return a blank for empty
    }

    if(contents) {
      res.status(200).send(JSON.parse(contents))
    } else {
      // res.status(200).send({ message: `contents empty.` })
      res.status(200).send(undefined)
    }

  });
})

app.get('/api/exocytosis/clear/config', (req, res) => {
  console.log('[exocytosis] clearing config.json')
  deleteFile('config.json')
  res.status(200).send('config.json deleted')
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
app.get('/api/exocytosis/get/data', (req, res) => {
  const dataName = makeDataName(req)
  // console.log('[exocytosis] grabbing data:', req.query, 'name:', dataName, 'url:', req.originalUrl)
  console.log('[exocytosis] grabbing data:', req.query, 'name:', dataName)

  fs.readFile('/tmp/'+dataName+'.json', 'utf8', function(err, contents) {
    if(err) {
      console.error("[exocytosis] get/data went wrong (no file?)", req.query)
      // res.status(500).send()
      res.status(200).send() // return a blank for empty
    }

    if(contents) {
      console.log('[exocytosis] data found!')
      res.status(200).send(JSON.parse(contents))
    } else {
      // res.status(200).send({ message: `contents empty.` })
      res.status(200).send(undefined)
    }

  });
})

// example: http://localhost:2929/api/exocytosis/get/file?name=appYvj7j9Ta5I15ks-Node-AbsolutePath-keyword.json
app.get('/api/exocytosis/get/file', (req, res) => {
  console.log('[exocytosis] grabbing data:', req.query.name)

  fs.readFile('/tmp/'+req.query.name, 'utf8', function(err, contents) {
    if(err) {
      console.error("[exocytosis] get/data went wrong (no file?)", req.query.name)
      res.status(200).send() // return a blank for empty
    }

    if(contents) {
      res.status(200).send(JSON.parse(contents))
    } else {
      // res.status(200).send({ message: `contents empty.` })
      res.status(200).send(undefined)
    }

  });
})



app.get('/api/exocytosis/cache/data', (req, res) => {
  const dataName = makeDataName(req)
  console.log('[exocytosis] caching data: ', req.query, 'name:', dataName)

  const routeName = '{exocytosis data cacher}'
  const tableQuery = req.query.tableQuery
  const payloads = JSON.parse(req.query.payloads)

  loadCytosis({
    routeName: routeName,
    tableQuery: tableQuery,
    // _key: req.query.airKey,
    _base: req.query.airBase,
    payloads: payloads,
  }).then(function(data, err) {
    if(err) {
      console.error("[exocytosis] cache/data went wrong", req.query)
      res.status(500).send()
    }

    // check if there's actually any data 
    console.error("[exocytosis] retrieved data:")
    if(Object.keys(data.tables).length>0 && Object.keys(data.tables)[0].length > 0) {
      writeData({
        fileName: dataName + '.json',
        key: req.query.airBase,
        payload: data,
      })
    } else {
      console.error("[exocytosis] cache/data didn't find any data; canceling cache process", data.tables)
      // TODO/FIX: Note: the current cache strategy generates cache files for pages that don't exist, which can lead to DDOS
    }
    // send back the data regardless
    res.status(200).send(data)
  })
})

app.get('/api/exocytosis/log/data', (req, res) => {
  fs.readFile('/tmp/datalog.json', 'utf8', function(err, contents) {
    if(err) {
      console.error("[exocytosis] log/data went wrong", req.query)
      res.status(200).send() // return a blank for empty
    }

    if(contents) {
      res.status(200).send(JSON.parse(contents))
    } else {
      // res.status(200).send({ message: `contents empty.` })
      res.status(200).send(undefined)
    }

  });
})


module.exports = app






