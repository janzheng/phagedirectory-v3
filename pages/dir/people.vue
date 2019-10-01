<template>
  <div class="People Dir-category">
    <no-ssr>
      <Template grid-classes="Template--Main-Sidebar _grid-3-1-sm _grid-gap" sidebar-classes="Dir-sidebar --sticky _top-1">

        <template #header-container>
          <h1 class="--title"><span class="_color-mono-60">Phage </span>People</h1>
          <h1 v-if="search.string" class="--title _padding-bottom-half" ><span class="_color-mono-60">Search: </span>{{ search.string }}</h1>
          <h2 v-if="search.string" class="--title _padding-bottom-2" ><span class="_color-mono-60">Results: </span>{{ filterPeople.length }}</h2>
        </template>

        <template #default>
          <div>

            <div v-if="!search.string" class="Dir-notice _grid-3-1 _align-vertically">
              <div>
                <div class="" v-html="$md.render(intro || '')" />
                <p class="_font-small">
                  Number of people listed: <strong>{{ people.length }}</strong>
                  <br>If you'd like your information updated, <a href="mailto:hello@phage.directory" class="--url">please let us know</a>.
                </p>
              </div>
              <div class="_right-sm">
                <a href="https://phage.directory/apply/researchers" class="_button CTA --inverse _width-100 _center">Sign Up</a>
              </div>
            </div>

            <div id="content-top" class="People-list" >

              <div v-if="search.string && filterPeople.length == 0" class="Dir-notice">
                <h1 class="" >No results found.</h1>
              </div>

              <div v-for="item of filterPeople" :key="item.id" class="" >
                <Card :person="item" :manuscripts="getManuscriptsOfPerson(item)" class="People-list-item" />
              </div>
            </div>

          </div>
        </template>

        <template #context >
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
    </no-ssr>

  </div>
</template>




<script>

import { mapState } from 'vuex'
import { loadQuery } from '~/other/loaders'
import Card from '~/components/dir/PeopleCard.vue'
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
    tableQueries: ["_content-copy", "capsid-previews"],
    refreshOnLoad: true,
  },

  data () {
    return {
      intro: this.$cytosis.findField('directory-people', this.$store.state['Content'], 'Markdown' )
    }
  },
  
  computed: {
    ...mapState([
      'search',
      'Manuscripts',
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
    filterPeople() {
      if(!this.search.string)
        return this.people

      const str = this.search.string.toLowerCase()

      // inclusive filter:
      /*
        Name & ' ' & {Short} & ' ' & {Description} & ' ' & {Expertise} & ' ' & {Personas} & ' ' & {Roles} & ' ' & {Social:Twitter} & ' ' & {Social:ORCID} & ' ' & {PhageCollections:Hosts::Names} & ' ' & {Orgs:Labs::Name} & ' ' & {Orgs:SupervisorOf::Name} & ' ' & {Orgs::Names}
      */
      let people = []
      this.people.map((person) => {
        if(person.fields['Data:Search'].toLowerCase().includes(str)) {
          people.push(person)
        }
      })

      return people //this.holabssts
    },
  },

  watch: {
    // $route () {
    //   this.search = this.$router.currentRoute.query.search
    // }
  },

  // runs on server+generation and page route (but not on first page load)
  async asyncData({app, env, store}) {

    // this is a MASSIVE pull
    const query = env.pd_env == 'stage' ? 'People-preview' : 'People'
    const data = await loadQuery({
      useDataCache: true,
      _key: env.db_api, 
      _base: env.db_base, 
      store, 
      routeName: 'people-all', 
      query: query
    })

    console.log('Data Size:', app.$sizeup(JSON.stringify(data)))

    let people
    if(data.tables['People']) {
      people = data.tables['People']
    }

    return {
      people
    }
  },

  mounted () {
    this.$segmentize({
      segment: this.$segment,
      type: 'page',
      event: 'Directory/People',
      data: {
        path: this.$route.path,
      }
    })
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

    getManuscriptsOfPerson(author) {
      const authorSlug = author.fields['Slug']
      return this['Manuscripts'].reduce((total, current) => {
          if(current.fields['Data:MainAuthorSlug'] == authorSlug) {
            return [...total, ...[current]]
          }
          return [...total]
        }, [])
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

