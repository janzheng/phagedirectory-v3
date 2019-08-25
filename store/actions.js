
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

export default {
  // async loadCytosis ({ commit, state }, {env, tableQuery, options, caller}) {
  // async loadCytosis ({ commit }, {routeName, env, tableQuery, options, payloads, config, _key, _base}) {
  async loadCytosis ({ commit }, {routeName, tableQuery, options, payloads, config, _key, _base, useDataCache}) {

    // async loadCytosis ({ commit }, {env, tableQuery, options, payloads, caller, _key, _base}) {
    const airKey = _key || process.env.airtable_api
    const airBase = _base || process.env.airtable_base
    let cytosis = undefined
    const _this = this

    console.log('[action/loadCytosis] Loading Cytosis [routeName]:[tableQuery]:',`[${routeName}]:[${tableQuery}]`,`[useDataCache: ${useDataCache}]`)

    async function fetchConfigCache(_config) {
      // Cache the config w/ zeit now lambda
      // populate config with cache on first hit; once it's loaded it'll end up in the store
      // if config exists, skip it
      try {
        if(process.env.useCytosisConfigCache && !_config) {
          // const config_cached = await axios.get(`${process.env.api_url}/api/exocytosis/get/config`,{timeout: 10111})
          const config_cached = await axios.get(`${process.env.api_url}/api/exocytosis/get/config`, {timeout: process.env.cache_timeout})

          if(config_cached && config_cached.data && config_cached.data[airBase]) {
            _config = config_cached.data[airBase].config
            console.log('[action/loadCytosis] Config cache loaded', )
          } else { 
          // refresh the cache if it's stale; also pull the config internally 
          /// don't rely on cache to get the config data, so no need for timeout here
            axios.get(`${process.env.api_url}/api/exocytosis/cache/config?airBase=${airBase}&tableQuery=${tableQuery}`)
          }
        }
      } catch(err) {
        console.log('[action/loadCytosis] Config cache timed out or errored. Proceeding w/o cache ... ')
      }
      return _config
    }

    async function fetchDataCache(result_data) {
      // Cache airtable data w/ lambda
      // this current iteration only works for simple tableQueries and does NOT work for complex payloads 
      // (TODO: next iteration is for more complex fetches)

      try {
        if(process.env.useCytosisDataCache && useDataCache) {
          const _payloads = JSON.stringify(payloads)
          result_data = await axios.get(`${process.env.api_url}/api/exocytosis/get/data?airBase=${airBase}&tableQuery=${tableQuery}&payloads=${_payloads}`, {timeout: process.env.cache_timeout})

          if(result_data && result_data.data) {
            // console.log('[action/loadCytosis] Cache retrieved for data:', result_data.data)
            console.log('[action/loadCytosis] Cache retrieved for data:', `[${routeName}]:[${tableQuery}]`)
            result_data = result_data.data // just get the data part from the query
            return result_data
          } else { 
            console.log('[action/loadCytosis] No cache found for data:', `[${routeName}]:[${tableQuery}]` )
            // refresh cache, BUT use the results of refresh to populate Cytosis data
            // otherwise it might double the # of requests to airtable

            // this waits for and uses the server's Cytosis payload
            if(process.env.keepCytosisDataCache) {
              result_data = await axios.get(`${process.env.api_url}/api/exocytosis/cache/data?airBase=${airBase}&tableQuery=${tableQuery}&payloads=${_payloads}`, {timeout: process.env.cache_timeout})
              result_data = result_data.data
              // TODO: check integrity
              return result_data
            } else {
              // if we don't want to wait for the server, just wait a bit and cache (so it doesn't interfere with client's cytosis / hitting Airtable limits)
              // and return empty
              setTimeout(
                axios.get(`${process.env.api_url}/api/exocytosis/cache/data?airBase=${airBase}&tableQuery=${tableQuery}&payloads=${_payloads}`)
                , 1500)
              return undefined
            }
          }
          // console.log('[action/loadCytosis] Final cached data:', result_data)
        }
      } catch(err) {
        console.log('[action/loadCytosis] Data cache timed out or errored. Proceeding w/o cache... ')
      }
      return result_data
    }

    function fetchCytosis(result_data, callback) {

      // if no cached data or integrity is bad
      if(!result_data) {
        const data = {
          routeName,
          airKey, 
          airBase, 
          tableQuery, 
          options,
          config,
          payloads,
          // endpointUrl: "https://bananararararama.net"
        }

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
          // console.log('resolving',err, results)
          callback(err, results)
        })
        // }) 
      }
    }


    // 
    // LOAD CYTOSIS THROUGH CACHE / SERVER
    // 
    // get the config cache (or pass through if turned off / cache doesn't exist)
    config = await fetchConfigCache(config)
    cytosis = await fetchDataCache(cytosis)

    // 
    // LOAD CYTOSIS THROUGH CLIENT
    // 

    if(!cytosis) {
      // only load from client if caching didn't work,
      // and cytosis is empty

      var intermediate = function(err, tries, delay) {
        if(process.server) {
          console.error('[action/loadCytosis] Backoff is running ------')
          console.log(err)   // last error
          console.log(tries) // total number of tries performed thus far
          console.log(delay) // the delay for the next attempt
          // return false;       // this will cancel additional tries
          console.log('[action/loadCytosis] Backoff ------')
        }
      }
      
      try { // this is really messy but we're wrapping a Promise around oibackoff and limit
        const getBackoff = function() { 
          return new Promise((resolve, reject) => {
            backoff(fetchCytosis, cytosis, intermediate, function(err, data) {
              // console.log('backoff callback:', err, data)
              if(err)
                reject(err)
              if(data)
                resolve(data)
            })
          })
        }
        cytosis = await getBackoff()
      } catch(err) {
        // no need to throw; cytosis will just remain undefined
        // console.log('bwhadsad',err)
      }
    }



    if(cytosis) {
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

// const emit = function (evtName, data) { // replaces entire dance object
//   window.dispatchEvent( new CustomEvent(evtName, {detail: data}))
// }

const debouncedUpdate = _.debounce(function(commit, object){
  // console.log('update debounced!')
  commit('update', object)
}, 1800)


