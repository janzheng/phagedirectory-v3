<template>
  <div class="Orgs Dir-category">

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
              <p>
                This is a directory of organizations including biotech startups, institutes, and nonprofits working in phage research and phage therapy fields. 
              </p>
              <p>
                If you'd like your organization on this list, please add your organization!
              </p>
              <p class="_font-small">
                Number of organizations: <strong>{{ orgs.length }}</strong>
                <br>
                If you'd like your information updated, <a href="mailto:hello@phage.directory" class="--url">please let us know</a>.
              </p>
            </div>
            <div class="_right-sm">
              <a href="/apply" class="_button CTA --inverse _width-100 _center">Sign Up</a>
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
      if(!this.search.string)
        return this.orgs

      const str = this.search.string.toLowerCase()

      // inclusive filter:
      /*
        {Name} &' - '& {AltName} &' - '& {Org:Types} &' - '& {Location} &' - '& {Location:Parent} &' - '&{PhageCollections:Hosts::Names} &' - '& {Orgs:Parent:Name} &' - '& {People:Supervisors::Names} &' - '& {People:LabMembers::Names} &' - '& {People:OrgMembers::Names}
      */
      let orgs = []
      this.orgs.map((org) => {
        if(org.fields['Data:Search'].toLowerCase().includes(str)) {
          orgs.push(org)
        }
      })

      return orgs //this.holabssts
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
    const data = await loadQuery({_key: env.db_api, _base: env.db_base, store, routeName: '{orgs}', query: 'Orgs-index'})
    // console.log('matched node: ', node, ' @ ', slug)

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
  }

}
</script>

<style>
</style>

