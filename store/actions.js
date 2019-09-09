
// import _ from 'lodash'
import _ from '~/other/lodash.custom.min.js'

import limiter from 'async-limiter'
import oibackoff from 'oibackoff'
import axios from 'axios'

const limiter_jobs = new limiter({concurrency: 4})


// 1: 1, 2, 4, 8, 16, 32 seconds... though by then the user's probably left
// 0.2: 0.2, 0.4, 0.8, 1.6, 3.2, 6.4 seconds
let backoff = oibackoff.backoff({
  algorithm  : 'exponential',
  delayRatio : 0.2,
  maxTries   : 6,
})


// 
// SERVER INIT / SETUP CONFIG CODE 
// 

async function setupConfig(airtables, app) {
  // Cache the config w/ zeit now lambda
  // populate config with cache on first hit; once it's loaded it'll end up in the store
  // if config exists, skip it

  // this will get cached in the store
  let _configArr = []

  // final config object
  let _config = {}

  console.log('[nuxtServerInit/setupConfig] env:', process.env.useCytosisConfigCache)
  // console.log('env mode:', process.env.mode)
  // console.log('env pdenv:', process.env.pd_env)

  try {
    if(process.env.useCytosisConfigCache && process.env.api_url) {
      console.log('[nuxtServerInit/setupConfig] Pulling config from cache.')
      // this grabs config from cache if it exists, otherwise gets configs from airtable and saves them to cache
      try {
        _config = await axios.get(`${process.env.api_url}/api/exocytosis/config/setup?airtables=${JSON.stringify(airtables)}`, {timeout: process.env.cache_timeout})
        _config = _config.data
        return _config
      } catch(err) {
        console.error('[nuxtServerInit/setupConfig] Config cache API timed out')
        // continue pulling configs w/ Cytosis if no API
      }
    }

    console.log('[nuxtServerInit/setupConfig] loading configs w/o cache.')
    // load the configs here in the client
    let configsP = []
    airtables.map(async function({api, base}) {

      // with backoff; don't need limiter b/c only a few configs so far
      configsP.push(new Promise((resolve, reject) => {
        backoff((data, cb) => {
            cb(null, app.$cytosis.getConfig(data))
          },
          {
            airKey: api,
            airBase: base,
            routeName: "nuxtServerInit-setup-config",
          }, function(err, data) {
            if(err)
              reject(err)
            if(data) {
              resolve(data)
              // resolve({
              //   base: base,
              //   data: data
              // })
            }
          })
        }
      ))
      // without backoff
      // configsP.push(app.$cytosis.getConfig({
      //   airKey: api,
      //   airBase: base,
      //   routeName: "[nuxtServerInit/setupConfig]",
      // }))
    })

    let configs = await Promise.all(configsP)
    // console.log('[nuxtServerInit/setupConfig] final configs :::' , configs)
    await configs.map(async function(configObj) {
      _configArr.push(configObj)
    })

    // return a config object that can be added to the store
    airtables.map(({base}, i) => {
      _config[base] = _configArr[i]
    })

    return _config
  
  } catch(err) {
    console.log('[nuxtServerInit] Config cache timed out or errored. Proceeding w/o cache ... ', err)
    return Promise.reject()
  }
}




// const emit = function (evtName, data) { // replaces entire dance object
//   window.dispatchEvent( new CustomEvent(evtName, {detail: data}))
// }

const debouncedUpdate = _.debounce(function(commit, object){
  // console.log('update debounced!')
  commit('update', object)
}, 1800)





function fetchCytosis({data, _this}, callback, ) {

  try {
    // console.log(' Fetch Cytosis!', data)
    let results, err
    // oibackoff uses callbacks, can't handle promises
    // return new Promise((resolve, reject) => {
    limiter_jobs.push(function(done) {
      let cytosisPromise = new _this.$cytosis(data)
      cytosisPromise.then((_cytosis) => {
        done() 
        results = _cytosis
      }, (_err) => {
        done()
        err = _err
      })
    })

    limiter_jobs.onDone(() => {
      // console.log('fetchCytosis Resolving: ', err, results)
      callback(err, results)
    })
    // }) 
  } catch(err) {
    console.log('Cytosis not fetched')
    callback(new Error('[fetchCytosis] Cytosis not fetched'))
  }
}



async function fetchData({data, _this, state}) { 

  try {
    // console.log(' >>>>> Fetching data for:' , data.tableQuery, '/' ,data.routeName, ' useDataCache', data.useDataCache)
    // let keyword = data.payloads ? data.payloads.keyword : undefined
    // console.time(`${data.tableQuery}-${data.routeName}//${keyword}`)

    // if a loadQuery's useDataCache is on ...
    // NOTE: some queries (like latest atoms) you don't want to cache!
    // - first check the state cytosis store ... (for both cached tablequery and pagequery)
    // - then check the cache 
    // - then get it locally
    if(data.useDataCache) {
      // let storeQuery = data.pageQuery || data.tableQuery
      // console.log(' >>>>> Trying caching strategies.')

      // if pageQuery, the data might exist in one of the stored page objects (not built yet)
      // if(data.pageQuery) {
      //   if(state.cytosisStore[pageQuery][data.tableQuery]) {
      //     // console.log('Cytosis found in store:' , data.tableQuery, state.cytosisStore[data.tableQuery])
      //     return Promise.resolve(state.cytosisStore[pageQuery][data.tableQuery])
      //   }
      // }

      if(state.cytosisStore && state.cytosisStore[data.tableQuery]) {
        // console.log(' >>>>> Cytosis found in store:' , data.tableQuery, state.cytosisStore[data.tableQuery])
        // console.timeEnd(`${data.tableQuery}-${data.routeName}//${keyword}`)
        return Promise.resolve(state.cytosisStore[data.tableQuery])
      }

      // check the data cache w/ fetch — grabs from cache AND cytosis
      if(process.env.useCytosisDataCache && process.env.api_url) {
        // too long w/ json data lol
        // let cachedata = await axios.get(`${process.env.api_url}/api/exocytosis/data/fetch?airBase=${data.airBase}&tableQuery=${data.tableQuery}&routeName=${data.routeName}`, {timeout: process.env.cache_timeout})
        
        try {
          let cachedata = await axios.post(`${process.env.api_url}/api/exocytosis/data/fetch?airBase=${data.airBase}&tableQuery=${data.tableQuery}&routeName=${data.routeName}`, {
              airBase: data.airBase,
              tableQuery: data.tableQuery,
              routeName: data.routeName,
              config: data.config
            }, {timeout: process.env.cache_timeout})
          
          // console.timeEnd(`${data.tableQuery}-${data.routeName}//${keyword}`)
          return Promise.resolve(cachedata.data)
        } catch(err) {
          console.error('[action/loadCytosis] API Data cache timed out... getting data from Cytosis.')
        }
      }   
    }

    // console.log(' >>>>> Trying local strategy.')

    return new Promise((resolve, reject) => {

      try {
        // only load from client if caching didn't work,
        // and cytosis is empty
        let retry = false, retries = 0
        // var intermediate = function(err, tries, delay) {
        var intermediate = function() {
          if(process.server) {
            // console.error('[action/loadCytosis] >>>>> Airtable Retrying >>>>> ')
            // console.log('>>>>> Last error: ', err, '> tries:', tries, '> delay:', delay)   // last error
            // console.log(tries) // total number of tries performed thus far
            // console.log(delay) // the delay for the next attempt
            // return false;      // this will cancel additional tries
            retry = true
            retries += 1
            console.log('[action/loadCytosis] >>>>> ')
          }
        }

        backoff(fetchCytosis, {data, _this}, intermediate, function(err, _data) {
          if (retry)
            // console.log('Retrying... #:', retries)
          // console.log('backoff callback:', err, data)
          if(err) {
            console.log('Backoff Failed at', err)
            reject(err)
          }
          if(_data)
            if(retry) {
              console.log('>>> # retries:', retries)
            }
            // console.timeEnd(`${data.tableQuery}-${data.routeName}//${keyword}`)
            resolve(_data)
        })
      } catch(err) {
        console.error('[fetchData] Local data fetching from Cytosis failed:', err)
        return Promise.reject()
      }
    })
  } catch(err) {
    console.error('[fetchData] Data fetching failed:', err)
    return Promise.reject()
  }
}





































export default {

  async nuxtServerInit ({ dispatch }, context) {

    console.log('[nuxtServerInit] Initializing Server >>>>>>>>>> ')

    try {
      const airtables = [
        {
          api: process.env.airtable_api, 
          base: process.env.airtable_base,
        },
        {
          api: process.env.airtable_api,
          base: process.env.db_base
        }
      ]
      let config = await setupConfig(airtables, context.app)

      // update the store cache
      if(config){
        console.log('[nuxtServerInit] Config Loaded.')
        dispatch("updateCreate", {
          config: config
        })
      }

      return Promise.resolve()

      // note: nuxtServerInit doesn't cache any data- all the basic data loading and 
      // caching should be triggered by the pageload middleware, that way you don't
      // load and cache data that isn't used
    } catch(err) {
      console.error('[nuxtServerInit] Unable to initialize config.', err)
      // don't throw an error here, as we can do that on the client
      // return Promise.reject() // this will crash the server
      return Promise.resolve() // fail silently / happily
    }
  },

  // async loadCytosis ({ commit, state }, {env, tableQuery, options, caller}) {
  // async loadCytosis ({ commit }, {routeName, env, tableQuery, options, payloads, config, _key, _base}) {
  async loadCytosis ({ state, commit }, data) {

    try {
      // async loadCytosis ({ commit }, {env, tableQuery, options, payloads, caller, _key, _base}) {
      let {routeName, tableQuery, options, payloads, config, _key, _base, useDataCache, noCommit} = data

      const airKey = _key || process.env.airtable_api
      const airBase = _base || process.env.airtable_base
      let cytosis = undefined
      const _this = this

      console.log('[action/loadCytosis] Loading Cytosis [routeName]:[tableQuery]:',`[${routeName}]:[${tableQuery}]`,`[useDataCache: ${useDataCache}]`)

      if(!cytosis) {
        
        try {
          
          const _data = {
            routeName,
            airKey, 
            airBase, 
            tableQuery, 
            options,
            config,
            payloads,
            useDataCache,
          }

          cytosis = await fetchData({state, data: _data, _this})
        } catch(err) {
          // no need to throw; cytosis will just remain undefined
          console.log('fetchData Error:', err)
        }
      }

      if(cytosis) {
        // clean up the cytosis object for storage
        cytosis = _this.$cytosis.strip(cytosis)

        if(useDataCache) {
          // store it in the local cache
          commit('storeCytosis', cytosis)
        }

        if(noCommit)
          return cytosis
        
        commit('setCytosis', cytosis)

      } else {
        // errors are handled in Contenframe objects, which check for whether node objects exist
        // and throw a Cytosis error message if Cytosis is down; so no need to handle here
        // if (process.server) {
          // console.error('[action/loadCytosis][server] No cytosis found! ', cytosis)
        // }
        throw new Error("[action/loadCytosis] Cytosis not loaded")
      }
      return cytosis
    } catch(err) {
      console.error('[loadCytosis] Failed to load Cytosis:', err)
      throw new Error("[action/loadCytosis] Cytosis not loaded")
    }
  },


  // stores a pageCache into the store
  // but also caches over the API (not built yet)
  // pageCache is really useful for pages w/ a ton of objects linked from other places,
  // like Capsids 
  storePageCache ({ commit }, object) {
    // store.action('storePageCache', {
    //   key: slug,
    //   data: {
    //     manuscript: manuscript,
    //     atoms: atoms.tables.Atoms,
    //     authors: authors,
    //     citation: citation,
    //   }
    // })

    // ** hold off on an API approach for now, since airtable caching seems fine
    commit('storePageCache', object)
  },


  // loads a pageCache
  // 1. from the vuex store state (store.state.cytosisStore['pagekey'])
  // 2. from the API cache (if implemented)
  // 3. from Airtable, using cytosisObj
  async loadPageCache ({ state }, {pagekey, recordId, airKey, baseId}) {

    // 1. from vuex store state
    if(state.cytosisStore[pagekey])
      return state.cytosisStore[pagekey]

    // 2. Nah

    // 3. from Airtable, using cytosisObj
    if(process.env.useCytosisPageCache && recordId) {
      try {
        let cache = await this.$cytosis.getRecord({
          recordId: recordId,
          tableName: '_cache',
          airKey: airKey || process.env.airtable_api,
          baseId: baseId || process.env.airtable_base,
        })
        return cache
        // item = this.$cytosis.cleanRecord(item)
      } catch(err) {
        console.log('[loadPageCache] no records found:', err)
      }
    }

    return Promise.reject()
  },


  // initializes the store
  setElement ({ commit }, el) { // replaces entire object
    commit('setElement', el)
  },
  update ({ commit }, object) {
    // generic mutator action
    // object is: {name: 'stateName', payload: {data} }

    // special rules
    // if updating settings, must clear the data
    // if(object.name == 'settings')
    //   commit('clear', {name: 'data'})

    commit('update', object)
  },
  debouncedUpdate ({ commit }, object) {
    debouncedUpdate(commit, object)
  },
  updateCreate ({ commit }, object) {
    commit('updateCreate', object)
  },
  clear ({ commit }, object) {
    // generic mutator action to clear something
    // console.log('trying to clear', object)
    commit('clear', object)
  },

}

