/*

    content-loader.js

    - loads content (cytosis.results) for this project
    - saves json files to static/data (vercel requirement)
    - uses the API endpoints to download data into flat json files
    - use this with deploy hooks for generated content
    - don't forget, you can't use import w/ these



    - loads the config routes
    - steps through config routes and builds an object w/ all the data
    - saves that data to file
    
*/

require("dotenv").config();

// const fetch = require("node-fetch")
const fs = require('fs')
const cytosisPath = 'static/data/content.json'
const configPath = 'static/data/_config.json'
let config = require('../static/data/_config.json')

const Cytosis = require("cytosis")

// create a folder if needed
if (!fs.existsSync('static/data')){
   fs.mkdirSync('static/data');
}




let data = {} // stores route names as keys w/ data
const loadContent = async () => {

  const apiKey = process.env.PD_AIRTABLE_PUBLIC_API
  const baseId = process.env.PD_AIRTABLE_PUBLIC_BASE
  const dbBaseId = process.env.PD_AIRTABLE_DB_BASE

	try {

    console.log('[loading content] ------------------------------')

    let tasks = Object.keys(config).map(async (conf) => {
      // takes a bunch of _cytosis routes, and gets the content for each of them
      // the route names as keys w/ route data
      console.log('conf:', conf)

      // this is very manual, but doesn't really matter
      let _baseId = (conf == 'appYvj7j9Ta5I15ks') ? baseId : dbBaseId
      let cytosis = await getContentFromLoaders(config[conf]['_cytosis'], apiKey, _baseId)
    })

    await Promise.all(tasks)
    // console.log('[content]', data)
    await saveJson(data, cytosisPath)
    console.log('[content saved] ------------------------------')
    
	} catch(err) {
    throw new Error('[loader] Error', err)
	}
}




// save from fetch stream to file
const saveJson = (async (data, path) => {
  try {
    data['_date'] = new Date()
	  const fileStream = await fs.writeFileSync(path, JSON.stringify(data))
    console.log('[saving]', data, path, fileStream)
	} catch(e) {
		console.error('[saveJson] error', e)
	}
});







const getContentFromLoaders = async (queries, apiKey, baseId) => {
  try {
    console.log('[getContentFromLoaders]', baseId)
    await Promise.all(queries.map(async (query) => {
      let fields = query.fields
      let route = fields['Name']
      // console.log(`[${route}]`, fields)

      if(fields['isPublished'] != true) {
        console.log(route + ' ------> SKIPPED')
      }
      else {
        let _cytosis = await getCytosis(apiKey, baseId, route, fields['Tables'], fields['view'], queries)
        let tables = {}
        Object.keys(_cytosis['tables']).map(table => {
          tables[table] = Cytosis.cleanTable(_cytosis['tables'][table])
        })
        // console.log(route + ' ------> TABLES ', tables)

        // add to main data object here
        data[route] = tables
      }

    }))
  } catch(e) {
    console.error('[getContentFromLoaders] error:', e)
  }
  
}





const getCytosis = async (apiKey, baseId, route, tables=["Content"], view="Grid view", _cytosis) => {
	try {

	  let results = await new Cytosis({
	    airKey: apiKey,
	    airBase: baseId,
	    tableQuery:	route,
      config: { _cytosis }
	  })

	  return results

	} catch(e) {
		console.error('[getCytosis] error:', e)
	}
}













// load the data
loadContent()
