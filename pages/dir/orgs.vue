<template>
  <div class="Orgs Dir-category">
    <no-ssr>
      <Template grid-classes="Template--Main-Sidebar _grid-3-1-sm _grid-gap" sidebar-classes="Dir-sidebar --sticky _top-1">

        <template #header-container>
          <h1 class="--title"><span class="_color-mono-60">Phage </span>Organizations</h1>
          <h1 v-if="search.string" class="--title _padding-bottom-half" _padding-bottom-half><span class="_color-mono-60">Search: </span>{{ search.string }}</h1>
          <h2 v-if="search.string" class="--title _padding-bottom-2" ><span class="_color-mono-60">Results: </span>{{ filterOrgs.length }}</h2>
        </template>


        <template #default>

          <div>
            <div v-if="!search.string" class="Dir-notice _grid-3-1 _align-vertically">
              <div>
                <div class="" v-html="$md.render(intro || '')" />
                <p class="_font-small">
                  Number of organizations: <strong>{{ orgs.length }}</strong>
                  <br>
                  If you'd like your information updated, <a href="mailto:hello@phage.directory" class="--url">please let us know</a>.
                </p>
              </div>
              <div class="_right-sm">
                <a href="https://phage.directory/apply/orgs" class="_button CTA --inverse _width-100 _center">Sign Up</a>
              </div>
            </div>

            <div id="content-top" class="Orgs-list" >
              <div v-if="search.string && filterOrgs.length == 0" class="Dir-notice">
                <h1 class="" >No results found.</h1>
              </div>

              <div v-for="item of filterOrgs" :key="item.id" >
                <Card :org="item" :phage-collections="phageCollections" class="Hosts-list-item" />
              </div>
            </div>
          </div>

        </template>
        <template #context>
          <div class="Dir-sidebar">
            <div>
              <label for="dirSearch" class="_form-label-search _padding-left-half _padding-bottom-none _height-100">
                <span class="_font-phage icon-search"/>
              </label>
              <input id="Dir-searchbar" ref="dirSearch" v-model.trim="searchString" class="Dir-search _padding-left-2 _form-input " type="text" name="dir_searchbar" placeholder="Search" @input="doSearch">
              <span v-if="searchString && searchString.length > 0" role="button" class="_form-label-cancel _padding-left-half _padding-right-half _padding-bottom-none _height-100" @click="doClear" >
                <span class="_font-phage icon-cancel"/>
              </span>
            </div>

            <div class="Dir-filter _margin-top">
              <div class="Dir-sidebar-label _label">Filter by</div>
              <div class="_pointer" :class="orgTypeFilter == 'Biotech' ? '_color-brand-active' : ''" @click="setOrgTypeFilter('Biotech')">Biotechs</div>
              <div class="_pointer" :class="orgTypeFilter == 'Society' ? '_color-brand-active' : ''" @click="setOrgTypeFilter('Society')">Societies</div>
              <div class="_pointer" :class="orgTypeFilter == 'Nonprofit' ? '_color-brand-active' : ''" @click="setOrgTypeFilter('Nonprofit')">Nonprofits</div>
              <div class="_pointer" :class="orgTypeFilter == 'Phage Bank' ? '_color-brand-active' : ''" @click="setOrgTypeFilter('Phage Bank')">Phage banks</div>
              <div v-if="orgTypeFilter" class="_font-small _pointer" @click="clearOrgTypeFilter()">Clear Filter</div>
            </div>
          </div>
          
          <nuxt-link v-scroll-to="{el: '#top', onDone: (element) => { doneScrolling(element) }}" :to="`#top`" class="_font-small --url _margin-top _inline-block _hidden-xs">
            Back to top
          </nuxt-link>
        </template>

      </Template>
    </no-ssr>

  </div>
</template>




<script>

import { mapState } from 'vuex'
import { loadQuery } from '~/other/loaders'
import Card from '~/components/dir/OrgCard.vue'
import { dirSearch } from '~/other/helpers.js'
import _ from '~/other/lodash.custom.min.js'
// import Person from '~/components/dir/DirPeopleList.vue'

import Template from '~/templates/context.vue'
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
      orgTypeFilter: false, // Biotechs, Nonprofits, etc.
      intro: this.$cytosis.findOne('directory-orgs', this.$store.state['Content'] ).fields['Markdown'],
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
    filterOrgs() {

      let _orgs = []

      if(this.search.string) {
        const str = this.search.string.toLowerCase()

        // inclusive filter:
        /*
          {Name} &' - '& {AltName} &' - '& {Org:Types} &' - '& {Location} &' - '& {Location:Parent} &' - '&{PhageCollections:Hosts::Names} &' - '& {Orgs:Parent:Name} &' - '& {People:Supervisors::Names} &' - '& {People:LabMembers::Names} &' - '& {People:OrgMembers::Names}
        */
        this.orgs.map((org) => {
          if(org.fields['Data:Search'].toLowerCase().includes(str)) {
            _orgs.push(org)
          }
        })
      } else {
        _orgs = this.orgs
      }

      if(this.orgTypeFilter) {
        _orgs = _orgs.reduce((acc, org) => {
          if(org.fields['Org:Types'] == this.orgTypeFilter) {
            acc.push(org)
          }
          return acc
        }, [])
      }

      return _orgs 
    },
  },

  watch: {
    $route () {
      // console.log('route changed', this.$route)
    }
  },

  // runs on generation and page route (but not on first page load)
  async asyncData({env, store, route}) {
    const slug = route.params.slug
    const query = env.pd_env == 'stage' ? 'Orgs-preview' : 'Orgs-index'
    const data = await loadQuery({
      useDataCache: true,
      _key: env.db_api, 
      _base: env.db_base,
       store, 
       routeName: '{orgs}', 
       query: query
     })
    // console.log('matched node: ', node, ' @ ', slug)

    // const testdata = app.$cytosis.cleanTable( data.tables['PhageCollections'] )
    // console.log('jobs AT test: ', JSON.stringify(testdata) )

    return {
      slug,
      orgs: data.tables['Organizations'],
      phageCollections: data.tables['PhageCollections'],
    }
  },

  mounted () {
  },

  methods: {
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

    setOrgTypeFilter(filter) {
      // toggle to clear/turn off if the orgtype is the same as the one sent in
      if(this.orgTypeFilter == filter)
        this.orgTypeFilter = false
      else
        this.orgTypeFilter = filter
    },
    clearOrgTypeFilter() {
      this.orgTypeFilter = false
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

