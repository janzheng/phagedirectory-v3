<template>
  <div class="People Dir-category">

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
              <p>
                This is a directory of vetted individuals involved in phage research and phage therapy fields, from researchers and doctors to regulators and biotech founders. 
              </p>
              <p>
                This list is opt-in: if you'd like to be on the list, please sign up, and we'll verify your information and add you!
              </p>

              <p class="_font-small">
                Number of people listed: <strong>{{ people.length }}</strong>
                <br>If you'd like your information updated, <a href="mailto:hello@phage.directory" class="--url">please let us know</a>.
              </p>
            </div>
            <div class="_right-sm">
              <a href="/signup" class="_button CTA --inverse _width-100 _center">Sign Up</a>
            </div>
          </div>

          <div v-if="search.string && filterPeople.length == 0" class="Dir-notice">
            <h1 class="" >No results found.</h1>
          </div>


          <div class="People-list">
            <div v-for="item of filterPeople" :key="item.id" class="" >
              <Card :person="item" class="People-list-item" />
            </div>
          </div>

        </div>
      </template>

      <template #context >
        <div>
          <input id="header_searchbar" ref="headerSearch" v-model.trim="searchString" class="Header-search _form-input _inline" type="text" name="header_searchbar" placeholder="Search" @input="doSearch">
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

  // runs on generation and page route (but not on first page load)
  async asyncData({env, store, route}) {
    const slug = route.params.slug
    const data = await loadQuery({_key: env.db_api, _base: env.db_base, store, routeName: '{people}', query: 'People-test'})
    // const search = store.state.search.string //route.query.search ? route.query.search : undefined
    // const search = store.state.search ? store.state.search.string : route.query.search
    // console.log('matched node: ', node, ' @ ', slug)

    return {
      slug,
      people: data.tables['People'],
      // search: search
    }
  },

  mounted () {
  },

  methods: {
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

