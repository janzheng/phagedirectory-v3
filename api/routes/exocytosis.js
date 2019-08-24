

// wrapper + proxy for cytosis (for getting stuff out of airtable)

const express = require('express');
const app = require('../app')
const fs = require('fs');
const cors = require('cors');
const Cytosis = require('cytosis');

app.use(express.static('tmp'));


app.use(cors({
  origin: 'http://localhost:1919'
}))

app.get('/api/exocytosis/cacheconfig', (req, res) => {
	console.log('[exocytosis] caching config')
  // console.log('[exocytosis] key', process.env.AIRTABLE_PUBLIC_BASE)

  const routeName = '{exo config cache}'

  console.log('cache config ', req.query)
  const tableQuery = req.query.tableQuery

  loadCytosis({
    routeName: routeName,
    tableQuery: tableQuery,
    _key: req.query.airKey,
    _base: req.query.airBase,
  }).then(function(data, err) {

    cacheCytosis({
      name: `${routeName}/${tableQuery}`,
      cytosis: data
    })

    res.status(200).send({
      message: `Config cache complete`,
      result: JSON.stringify(data)
    })
    if(err) {
      console.error('[exocytosis] No dice, exocytosis failed.')
    }
  })

})


function cacheCytosis({name, cytosis}) {
  // cache current cytosis request to /tmp


  // TODO: set up file loading here
  // let config = {}

  // cache the config object separate
  // config[cytosis.airBase.id] = cytosis.config

  // write config to /tmp/ for caching
  console.log('caching data w/ key:', cytosis.airBase.id)
  updateData({
    fileName: 'config.json',
    key: cytosis.airBase.id, 
    payload: cytosis.config
  })

  // console.log('[exocytosis/cacheCytosis] config:', config)
}


function loadCytosis({routeName, tableQuery, options, payloads, config, _key, _base}) {
  const airKey = _key || process.env.PD_AIRTABLE_PUBLIC_API
  const airBase = _base || process.env.PD_AIRTABLE_PUBLIC_BASE

  console.log('loading w/ ', airKey, ' /// ', airBase )

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


app.get('/api/exocytosis/config', (req, res) => {
  console.log('[exocytosis] grabbing config.json')

	fs.readFile('/tmp/config.json', 'utf8', function(err, contents) {
	  if(contents) {
		  res.status(200).send(JSON.parse(contents))
	  } else {
		  // res.status(200).send({
		  //     message: `contents empty.`
		  // })
      res.status(200).send(undefined)
	  }
	});
})

app.get('/api/exocytosis/clearconfig', (req, res) => {
  console.log('[exocytosis] clearing config.json')
  clearData('config.json')
})





// 
//  Filesystem / Data styff
// 

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

function clearData(fname) {
  fs.unlink(`/tmp/${fname}`, (err) => {
    if (err) {
      console.log("[exocytosis/clearconfig] failed to delete ", fname, err);
    } else {
      console.log('[exocytosis/clearconfig] successfully deleted', fname);                                
    }
  });
}


module.exports = app

