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
              <p>
                This is a directory of bacteriophage host organisms, and the organizations and labs who work with them . 
              </p>
              <p>
                If you'd like us to add a host organism, or if you'd like to add your lab to our directory, please sign up!
              </p>
              <p class="_font-small">
                Number of listed phage hosts: <strong>{{ hosts.length }}</strong>
                <br>
                If you'd like your information updated, <a href="mailto:hello@phage.directory" class="--url">please let us know</a>.
              </p>
            </div>
            <div class="_right-sm">
              <a href="#" class="_button CTA --inverse _width-100 _center">Sign Up</a>
            </div>
          </div>

          <div v-if="search.string && filterHosts.length == 0" class="Dir-notice">
            <h1 class="" >No results found.</h1>
          </div>

          <div v-for="item of genusList" :key="item.id" class="Hosts-list" >
            <Card :genus="item" :hosts="getGenusHosts(item)" :phage-collections="phageCollections" class="Hosts-list-item" />
          </div>
        </div>

      </template>
      <template #context>
        <div>
          <input id="header_searchbar" ref="headerSearch" v-model.trim="searchString" class="Header-search _form-input _inline _width-full" type="text" name="header_searchbar" placeholder="Search" @input="doSearch">
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
      // console.log('route changed', this.$route)
    }
  },

  // runs on generation and page route (but not on first page load)
  async asyncData({env, store, route}) {
    console.log('Hosts page loading data')
    const slug = route.params.slug
    const data = await loadQuery({_key: env.db_api, _base: env.db_base, store, routeName: '{hosts}', query: 'Hosts-index'})
    console.log('Hosts page data loaded', data)

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
    }, 300, {
      trailing: true
    }),
  }
}
</script>

<style>
</style>

