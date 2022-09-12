
<!-- 

  example from: https://adamwathan.me/renderless-components-in-vuejs/
  refer to: proptester.vue

  - using a renderless component to wrap all of Cytosis queries

 -->

<script>

import { loadQuery } from '~/other/loaders'

export default {

  props: {
    // 'tableQuery': String,
    // 'tableQueries': Array,
    // 'refreshOnLoad': Boolean,
    'base': String,
    'apikey': String,
    'env': Object,
    'routeName': String, 
    'query': String
  },

  data() {
    return {
      loaded: false,
      response: null,
    }
  },

  render() {
    if(this.$scopedSlots.default) {

      if (!this.loaded) {
        return this.$scopedSlots.default({
          loading: true,
          response: null,
        }) 
      }

      return this.$scopedSlots.default({
        loading: false,
        response: this.response,
      })
    }
  },

  created: async function() {
    const routeName = this.$route.name || this.$route.path
    const env = this.env
    const _this = this

    // specific data requests can be set through meta: in page pages/templates, to reduce server load
    const tableQuery = this.tableQuery
    const tableQueries = this.tableQueries
    const keyword = this.keyword
    const refreshOnLoad = this.refreshOnLoad

    const event = await loadQuery({
      _key: this.apikey, // Live Public DB
      _base: this.base, // Live Public DB
      store: this.$store, 
      routeName: this.routeName, 
      query: this.query
    })

    let data = event

    this.response = data
    this.loaded = true

    // if(refreshOnLoad) {
    //   // console.log('refresh — clear out the store', tableQuery, tableQueries)
    //   // store.cache.delete('loadCytosis')
    //   this.$store.dispatch('clear', "Atoms")
    // }

    // if (tableQuery) {
    //   // loads data from airtable based on a partial query
    //   this.response = this.loadQueryData(routeName, this.$store, env, tableQuery, keyword)
    //   this.loaded = true
    // } else if (tableQueries) {
    //   // in this case, we have multiple linked queries in airtable
    //   const getData = async function() {
    //     // console.log('tableQueries... ', tableQueries)
    //     let queryData = tableQueries.map( (query) => {
    //       return _this.loadQueryData(routeName, _this.$store, env, query, keyword)
    //     })
    //     return Promise.all(queryData)
    //   }

    //   const data = await getData()
    //   // console.log('finally', data.flat(2))
    //   // return data
    //   this.response = data
    //   this.loaded = true

    // } else {
    //   // return loadData(routeName, store, env)
    //   this.response = loadData(routeName, this.$store, env)
    //   this.loaded = true
    // }
  },

  methods: {

    loadQueryData: async function (routeName, store, env, tableQuery, keyword) {
      let data
      data = await loadQuery({env, store, routeName, tableQuery, keyword})
      return Promise.all([data])
    }

  },

}
</script>

