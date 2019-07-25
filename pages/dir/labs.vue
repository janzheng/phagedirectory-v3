<template>
  <div class="Labs Dir-category">
    <no-ssr>

      <Template grid-classes="Template--Main-Sidebar _grid-3-1-sm _grid-gap" sidebar-classes="Dir-sidebar --sticky _top-1">
        <template #header-container>
          <h1 class="--title"><span class="_color-mono-60">Phage </span>Labs</h1>
          <h1 v-if="search.string" class="--title _padding-bottom-half"><span class="_color-mono-60">Search: </span>{{ search.string }}</h1>
          <h2 v-if="search.string" class="--title _padding-bottom-2" ><span class="_color-mono-60">Results: </span>{{ filterLabs.length }}</h2>
        </template>

        <template #default>
          <div>
            <div v-if="!search.string" class="Dir-notice _grid-3-1 _grid-gap-large _align-vertically">
              <div>
                <div class="" v-html="$md.render(intro || '')" />
                <p class="_font-small">
                  Number of labs: <strong>{{ labs.length }}</strong>
                  <br>
                  If you'd like your information updated, <a href="mailto:hello@phage.directory" class="--url">please let us know</a>.
                </p>
              </div>
              <div class="_right-sm">
                <a href="https://airtable.com/shrbZHMw6R2dCij9v" class="_button CTA --inverse _width-100 _center">Sign Up</a>
              </div>
            </div>

            <div id="content-top" class="Labs-list" >
              <div v-if="search.string && filterLabs.length == 0" class="Dir-notice">
                <h1 class="" >No results found.</h1>
              </div>

              <div v-for="item of filterLabs" :key="item.id" >
                <Card :lab="item" :phage-collections="phageCollections" class="Labs-list-item" />
              </div>
            </div>
          </div>

        </template>
        <template #context >
          <div class="Dir-sidebar">
            <label for="dirSearch" class="_form-label-search _padding-left-half _padding-bottom-none _height-100">
              <span class="_font-phage icon-search"/>
            </label>
            <input id="Dir-searchbar" ref="dirSearch" v-model.trim="searchString" class="Dir-search _padding-left-2 _form-input" type="text" name="dir_searchbar" placeholder="Search" @input="doSearch">
            <span v-if="searchString && searchString.length > 0" role="button" class="_form-label-cancel _padding-left-half _padding-right-half _padding-bottom-none _height-100" @click="doClear" >
              <span class="_font-phage icon-cancel"/>
            </span>
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
import Card from '~/components/dir/LabCard.vue'
import { dirSearch } from '~/other/helpers.js'
import _ from '~/other/lodash.custom.min.js'
// import Person from '~/components/dir/DirPeopleList.vue'

import Template from '~/templates/context.vue'
// import Template from '~/templates/article.vue'


export default {

  components: {
    Card,
    Template,
  },

  layout: 'contentframe',
  middleware: 'pageload',
  meta: {
    tableQueries: ["_content"],
    refreshOnLoad: true,
  },


  data () {
    return {
      intro: this.$cytosis.findOne('directory-labs', this.$store.state['Content'] ).fields['Markdown'],
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
    filterLabs() {
      if(!this.search.string)
        return this.labs

      const str = this.search.string.toLowerCase()

      // inclusive filter:
      /*
        {Name} &' - '& {AltName} &' - '& {Org:Types} &' - '& {Location} &' - '& {Location:Parent} &' - '&{PhageCollections:Hosts::Names} &' - '& {Orgs:Parent:Name} &' - '& {People:Supervisors::Names} &' - '& {People:LabMembers::Names} &' - '& {People:OrgMembers::Names}
      */
      let labs = []
      this.labs.map((lab) => {
        if(lab.fields['Data:Search'].toLowerCase().includes(str)) {
          labs.push(lab)
        }
      })

      return labs //this.holabssts
    },
  },

  watch: {
  },

  // runs on generation and page route (but not on first page load)
  async asyncData({env, store, route}) {
    const slug = route.params.slug
    const data = await loadQuery({_key: env.db_api, _base: env.db_base, store, routeName: '{labs}', query: 'Labs-index'})

    return {
      slug,
      labs: data.tables['Organizations'],
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
  },

}
</script>

<style>
</style>

