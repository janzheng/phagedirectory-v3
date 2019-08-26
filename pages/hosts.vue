<template>
  <div class="Hosts Dir-category">
    <Template sidebar-classes="--sticky --top-1" grid-classes="Template--Main-Sidebar _grid-3-1-sm _grid-gap ">

      <template #header-container>
        <h1 class="--title"><span class="_color-mono-60">Phage </span>Hosts</h1>
        <h1 v-if="search.string" class="--title _padding-bottom-half" ><span class="_color-mono-60">Search: </span>{{ search.string }}</h1>
        <h2 v-if="search.string" class="--title _padding-bottom-2" ><span class="_color-mono-60">Results: </span>{{ filterHosts.length }}</h2>
      </template>

      <template #default>

        <div>
          <div v-if="!search.string" class="Dir-notice _grid-3-1 _align-vertically">
            <div>
              <div class="" v-html="$md.render(intro || '')" />
              <p class="_font-small">
                Number of listed phage hosts: <strong>{{ hosts.length }}</strong>
                <br>
                If you'd like your information updated, <a href="mailto:hello@phage.directory" class="--url">please let us know</a>.
              </p>
            </div>
            <div class="_right-sm">
              <a href="/apply" class="_button CTA --inverse _width-100 _center">Sign Up</a>
            </div>
          </div>


          <div cid="content-top" lass="Hosts-list" >
            <div v-if="search.string && filterHosts.length == 0" class="Dir-notice">
              <h1 class="" >No results found.</h1>
            </div>

            <div v-for="item of genusList" :key="item.id" class="" >
              <Card :genus="item" :hosts="getGenusHosts(item)" :phage-collections="phageCollections" class="Hosts-list-item" />
            </div>
          </div>
        </div>

      </template>
      <template #context>
        <div class="Dir-sidebar">
          <label for="dirSearch" class="_form-label-search _padding-left-half _padding-bottom-none _height-100">
            <span class="_font-phage icon-search"/>
          </label>
          <input id="Dir-searchbar" ref="dirSearch" v-model.trim="searchString" class="Dir-search _padding-left-2 _form-input " type="text" name="dir_searchbar" placeholder="Search" @input="doSearch">
          <span v-if="searchString && searchString.length > 0" role="button" class="_form-label-cancel _padding-left-half _padding-right-half _padding-bottom-none _height-100" @click="doClear" >
            <span class="_font-phage icon-cancel"/>
          </span>
        </div>
        
        <nuxt-link v-scroll-to="{el: '#top', onDone: (element) => { doneScrolling(element) }}" :to="`#top`" class="_font-small --url _margin-top _inline-block _hidden-xs">
          Back to top
        </nuxt-link>
      </template>

    </Template>

  </div>
</template>




<script>

import { mapState } from 'vuex'
import { loadQuery } from '~/other/loaders'
import Card from '~/components/dir/HostCard.vue'
import { dirSearch } from '~/other/helpers.js'
// import Person from '~/components/dir/DirPeopleList.vue'

import Template from '~/templates/context.vue'
import _ from '~/other/lodash.custom.min.js'
// import Template from '~/templates/article.vue'


export default {

  components: {
    Template,
    Card,
  },

  layout: 'contentframe',
  middleware: 'pageload',
  meta: {
    tableQueries: ["_content"],
    refreshOnLoad: true,
  },


  data () {
    return {
      intro: this.$cytosis.findOne('directory-hosts', this.$store.state['Content'] ).fields['Markdown'],
    }
  },
  
  computed: {
    ...mapState([
      'search',
      ]),
    searchString: {
      get: function () {
        return this.$store.state.search.string
      },
      // setter
      set: function (str) {
        this.$store.dispatch("updateCreate", {
          search: {
            string: str,
            url: this.$router.currentRoute.fullPath,
          }
        })
        // const url = `/search/${str}`
      }
    },

    genusList() {
      let genera = []
      this.filterHosts.map((host) => {
        const genus = host.fields['Genus']
        if(genera.findIndex(_genus => _genus == genus ) < 0) {
          genera.push(genus)
        }
      })
      return genera
    },

    filterHosts() {
      if(!this.search.string)
        return this.hosts

      const str = this.search.string.toLowerCase()

      // inclusive filter:
      // Data:Search field: host name, collection name, person, org/lab, parent org
      /*
        Name & ' ' & {PhageCollections:Owners:Orgs::Names} & ' ' & {PhageCollections:Owners:ParentOrgs::Names} & ' ' & {PhageCollections:Names} & ' ' & {PhageCollections:Owners:People::Names}
      */
      let hosts = []
      this.hosts.map((host) => {
        if(host.fields['Data:Search'].toLowerCase().includes(str)) {
          hosts.push(host)
        }
      })

      return hosts //this.hosts
    },
  },

  watch: {
    $route () {
    }
  },

  // runs on server+generation and page route (but not on first page load)
  async asyncData({app, env, store, route}) {
    app.$sys.log('Hosts page loading data')
    const slug = route.params.slug
    const data = await loadQuery({
      useDataCache: true,
      _key: env.db_api, 
      _base: env.db_base, 
      store, 
      routeName: '{hosts}', 
      query: 'Hosts-index'
    })
    
    app.$sys.log('Hosts page data loaded', data)

    return {
      slug,
      hosts: data.tables['Hosts'],
      phageCollections: data.tables['PhageCollections'],
    }
  },

  mounted () {
  },
  
  methods: {
    getGenusHosts(genus) {
      return this.filterHosts.filter((host) => host.fields['Genus'] == genus)
    },
    doSearch: new _.debounce(function() {
      dirSearch(this)
      this.$scrollTo("#content-top")
    }, 300, {
      trailing: true
    }),

    doClear() {
      this.searchString = ""
      dirSearch(this)
    },
    
    doneScrolling(el) {
      this.$router.push({
        path: this.$route.path + '#' + el.id
      })
    }
  }
}
</script>

<style>
</style>

