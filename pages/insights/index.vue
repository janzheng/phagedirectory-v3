<template>
  <div class="Insights Dir-category">
    <no-ssr>
      <!-- <Template grid-classes="Template--Main-Sidebar _grid-3-1-sm _grid-gap" sidebar-classes="Dir-sidebar --sticky _top-1"> -->
      <!-- <Template grid-classes="Template--Main-Sidebar _grid-3-1-sm _grid-gap" sidebar-classes="Dir-sidebar --sticky _top-1"> -->
      <Template main-classes="Template--Main _section-content _margin-bottom _margin-center _margin-top-none-i"
                article-classes="">
        <!--  <template #header-container>
          <h1 class="_padding-bottom-half"><span class="_color-mono-60">Phage </span>Insights</h1>
          <h2 class="--title _padding-bottom-2">a phage preprint and micropublication <br> for and by the community.</h2>

          <h1 v-if="search.string" class="--title _padding-bottom-half" _padding-bottom-half><span class="_color-mono-60">Search: </span>{{ search.string }}</h1>
          <h2 v-if="search.string" class="--title _padding-bottom-2" ><span class="_color-mono-60">Results: </span>{{ filterOrgs.length }}</h2>
        </template>
 -->

        <template #default>

          <!-- intro -->
          <div class="_section-article">
            <div class="" v-html="$md.render(intro || '')" />
            <!-- <div class="" v-html="$md.render(intro || '')" /> -->

            <Toggle class="_pointer" :no-close-allowed="true">
              <template #off>
                <div class="_padding _card" v-html="$md.render(cta || '')" />
              </template>
              <template #on>
                <Signup :form="formBeta" />
              </template>
            </Toggle>

          </div>
          
          <div class="" v-html="$md.render(abstract || '')" />

          <!-- Early CTA form -->
          <!-- <NodeForm :src="formTest"/> -->

          <div class="_section-article">
            <!-- Early CTA form -->
            <Signup class="_divider-top _divider-bottom" :form="formBeta" />

            <Cytosis
              apikey="keyAe6M1KoPfg25aO"
              base="appEuZLle3bAy2g2g"
              route-name="{Insights:index}"
              query="evergreen-2019-signups"
            >
              <template #default="{ response }">
                <div v-if="response && response.tables && response.tables['Signups'].length > 0" >
                  <div class="Insights-commits _card _padding">
                    <h3 class="--title">Signups</h3>
                    <div v-for="item of response.tables['Signups']" :key="item.id">
                      <div v-if="item.fields['Type'] == 'Insights'">
                        <span>{{ item.fields['Name'] }}</span> <span v-for="tag of item.fields['Tags']" :key="tag.id" class="_tag" >{{ tag }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
            </Cytosis>

            <!-- EVG shoutout -->
            <div v-if="evg" class="_card _padding _margin-bottom ">
              <div class="" v-html="$md.render(evg || '')" />
              <!-- <EvgPromo /> -->
            </div>

            <!-- Main content body -->
            <!-- author guidelines etc -->
            <div v-if="body" class="_divider-top _divider-bottom _margin-bottom ">
              <div class="" v-html="$md.render(body || '')" />
            </div>

            <!-- Early CTA form -->
            <Signup class="_divider-top _divider-bottom" :form="formBeta" />
          </div>

        </template>
      </Template>
    </no-ssr>

  </div>
</template>




<script>

import { mapState } from 'vuex'
// import { loadQuery } from '~/other/loaders'
// import NodeForm from '~/components/render/NodeForm.vue'

import Cytosis from '~/components/experiments/Cytosis.vue'
import Signup from '~/components/InsightsSignup.vue'
import Toggle from '~/components/Toggle.vue'
// import EvgPromo from '~/components/events/EvergreenPromo.vue'

// import Card from '~/components/dir/OrgCard.vue'
import { dirSearch } from '~/other/helpers.js'
import _ from '~/other/lodash.custom.min.js'
// import Person from '~/components/dir/DirPeopleList.vue'

// import Template from '~/templates/context.vue'
import Template from '~/templates/article.vue'


export default {

  components: {
    Template,
    // Card,
    // NodeForm,
    Cytosis,
    Signup,
    Toggle,
    // EvgPromo,
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
      intro: this.$cytosis.findField('insights-intro', this.$store.state['Content'], 'Markdown' ),
      abstract: this.$cytosis.findField('insights-abstract', this.$store.state['Content'], 'Markdown'),
      evg: this.$cytosis.findField('insights-evg', this.$store.state['Content'], 'Markdown'),
      cta: this.$cytosis.findField('insights-cta', this.$store.state['Content'], 'Markdown'),
      body: this.$cytosis.findField('insights-body', this.$store.state['Content'], 'Markdown'),
      formBeta: this.$cytosis.findOne('form-insights-beta', this.$store.state['Content'] ),
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
    // filterOrgs() {

    //   let _orgs = []

    //   if(this.search.string) {
    //     const str = this.search.string.toLowerCase()

    //     // inclusive filter:
    //     /*
    //       {Name} &' - '& {AltName} &' - '& {Org:Types} &' - '& {Location} &' - '& {Location:Parent} &' - '&{PhageCollections:Hosts::Names} &' - '& {Orgs:Parent:Name} &' - '& {People:Supervisors::Names} &' - '& {People:LabMembers::Names} &' - '& {People:OrgMembers::Names}
    //     */
    //     this.orgs.map((org) => {
    //       if(org.fields['Data:Search'].toLowerCase().includes(str)) {
    //         _orgs.push(org)
    //       }
    //     })
    //   } else {
    //     _orgs = this.orgs
    //   }

    //   if(this.orgTypeFilter) {
    //     _orgs = _orgs.reduce((acc, org) => {
    //       if(org.fields['Org:Types'] == this.orgTypeFilter) {
    //         acc.push(org)
    //       }
    //       return acc
    //     }, [])
    //   }

    //   return _orgs 
    // },
  },

  watch: {
    $route () {
      // console.log('route changed', this.$route)
    }
  },

  // runs on server+generation and page route (but not on first page load)
  // async asyncData({env, route}) {
  //   // const slug = route.params.slug
  //   // const data = await loadQuery({
  //   //   useDataCache: true,
  //   //   _key: env.db_api, 
  //   //   _base: env.db_base, 
  //   //   store, 
  //   //   routeName: 'insights', 
  //   //   query: 'Orgs-index'
  //   // })
  //   // console.log('matched node: ', node, ' @ ', slug)

  //   // const testdata = app.$cytosis.cleanTable( data.tables['PhageCollections'] )
  //   // console.log('jobs AT test: ', JSON.stringify(testdata) )

  //   return {
  //     // slug,
  //     // env,
  //     // orgs: data.tables['Organizations'],
  //     // phageCollections: data.tables['PhageCollections'],
  //   }
  // },

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
  }

}
</script>

<style>
</style>

