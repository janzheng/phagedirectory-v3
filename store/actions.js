
// import _ from 'lodash'
import _ from '~/other/lodash.custom.min.js'
import limit from 'simple-rate-limiter'
import axios from 'axios'


export default {
  // async loadCytosis ({ commit, state }, {env, tableQuery, options, caller}) {
  // async loadCytosis ({ commit }, {routeName, env, tableQuery, options, payloads, config, _key, _base}) {
  async loadCytosis ({ commit }, {routeName, tableQuery, options, payloads, config, _key, _base}) {

    // async loadCytosis ({ commit }, {env, tableQuery, options, payloads, caller, _key, _base}) {
    const airKey = _key || process.env.airtable_api
    const airBase = _base || process.env.airtable_base
    const cytosisLimit = process.env.cytosisLimit
    const cytosisTime = process.env.cytosisTime

    const _this = this

    // populate config with cache on first hit; once it's loaded it'll end up in the store
    if(process.env.useCytosisCacheConfig && !config) {
      const config_cached = await axios.get(`${process.env.api_url}/api/exocytosis/config`)

      if(config_cached && config_cached.data && config_cached.data[airBase]) {
        config = config_cached.data[airBase]
        // console.log('pulled config data:', config_cached.data, process.env.airtable_base)
      } else {
        // refresh the cache if it's stale
        axios.get(`${process.env.api_url}/api/exocytosis/cacheconfig?airBase=${airBase}&tableQuery=${tableQuery}`)
      }
    }

    const data = {
      routeName,
      airKey, 
      airBase, 
      tableQuery, 
      options,
      config,
      payloads,
    }

    const cytosisRequest = limit(function(data, callback) {
      let cytosis = new _this.$cytosis(data)
      callback(cytosis)
    }).to(cytosisLimit).per(cytosisTime)

    const cytosis = await new Promise(function(resolve, reject) {
      cytosisRequest(data, function(cytosisPromise) {
        cytosisPromise.then((_cytosis, err) => {
          if (err) {
            reject(err)
          }
          resolve(_cytosis)
        })
      })
    })

    commit('setCytosis', cytosis)
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


