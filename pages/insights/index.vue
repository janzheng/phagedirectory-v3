<template>
  <div class="Insights Dir-category">
    <no-ssr>
      <Template grid-classes="Template--Main-Sidebar _grid-3-1-sm _grid-gap" sidebar-classes="Dir-sidebar --sticky _top-1">

        <template #header-container>
          <h1 class="_padding-bottom-half"><span class="_color-mono-60">Phage </span>Insights</h1>
          <h2 class="--title _padding-bottom-2">a phage preprint and micropublication <br> for and by the community.</h2>

          <h1 v-if="search.string" class="--title _padding-bottom-half" _padding-bottom-half><span class="_color-mono-60">Search: </span>{{ search.string }}</h1>
          <h2 v-if="search.string" class="--title _padding-bottom-2" ><span class="_color-mono-60">Results: </span>{{ filterOrgs.length }}</h2>
        </template>


        <template #default>

          <div>
            <!-- intro -->
            <div class=" _margin-bottom ">
              <div class="" v-html="$md.render(intro || '')" />
            </div>

            <!-- Early CTA form -->
            <!-- <NodeForm :src="formTest"/> -->

            <!-- Early CTA form -->
            <Signup :intro="cta" :form-beta="formBeta" 
                    :form-one="formOne" :form-two="formTwo" :form-three="formThree" />

            <!-- List of signed up people — they're in the PD Live DB -->
            <Cytosis
              apikey="keyAe6M1KoPfg25aO"
              base="appEuZLle3bAy2g2g"
              route-name="{Insights:index}"
              query="evergreen-2019-signups"
            >
              <template #default="{ response }">
                <div v-if="response && response.tables && response.tables['Signups'].length > 0" >
                  <div class="Insights-commits _card _padding">
                    <h3 class="--title">Commitments</h3>
                    <div v-for="item of response.tables['Signups']" :key="item.id">
                      <span>{{ item.fields['Name'] }}</span> <span v-for="tag of item.fields['Tags']" :key="tag.id" class="_tag" >{{ tag }}</span>
                    </div>
                  </div>
                  <!-- Response: {{ response.tables['Signups'] }} -->
                </div>
              </template>
            </Cytosis>

            <!-- EVG shoutout -->
            <div v-if="evg" class="_card _padding _margin-bottom ">
              <div class="" v-html="$md.render(evg || '')" />
            </div>

            <!-- Main content body -->
            <div v-if="body" class="_margin-bottom ">
              <div class="" v-html="$md.render(body || '')" />
            </div>

            <!-- Early CTA form -->
            <Signup :intro="cta" :form-beta="formBeta" 
                    :form-one="formOne" :form-two="formTwo" :form-three="formThree" />

          </div>

        </template>
        <!-- <template #context>
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
        </template> -->

      </Template>
    </no-ssr>

  </div>
</template>




<script>

import { mapState } from 'vuex'
import { loadQuery } from '~/other/loaders'
// import NodeForm from '~/components/render/NodeForm.vue'

import Cytosis from '~/components/experiments/Cytosis.vue'
import Signup from '~/components/InsightsSignup.vue'

// import Card from '~/components/dir/OrgCard.vue'
import { dirSearch } from '~/other/helpers.js'
import _ from '~/other/lodash.custom.min.js'
// import Person from '~/components/dir/DirPeopleList.vue'

import Template from '~/templates/context.vue'
// import Template from '~/templates/article.vue'


export default {

  components: {
    Template,
    // Card,
    // NodeForm,
    Cytosis,
    Signup,
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
      intro: this.$cytosis.findOne('directory-insights', this.$store.state['Content'] ).fields['Markdown'],
      evg: this.$cytosis.findOne('insights-evg', this.$store.state['Content'] ).fields['Markdown'],
      cta: this.$cytosis.findOne('insights-cta', this.$store.state['Content'] ).fields['Markdown'],
      body: this.$cytosis.findOne('insights-body', this.$store.state['Content'] ).fields['Markdown'],
      form: this.$cytosis.findOne('form-insights-early', this.$store.state['Content'] ),
      formTest: this.$cytosis.findOne('form-tester', this.$store.state['Content'] ),
      formBeta: this.$cytosis.findOne('form-insights-beta', this.$store.state['Content'] ),
      formOne: this.$cytosis.findOne('form-insights-one', this.$store.state['Content'] ),
      formTwo: this.$cytosis.findOne('form-insights-two', this.$store.state['Content'] ),
      formThree: this.$cytosis.findOne('form-insights-three', this.$store.state['Content'] ),
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
    const data = await loadQuery({_key: env.db_api, _base: env.db_base, store, routeName: '{orgs}', query: 'Orgs-index'})
    // console.log('matched node: ', node, ' @ ', slug)

    // const testdata = app.$cytosis.cleanTable( data.tables['PhageCollections'] )
    // console.log('jobs AT test: ', JSON.stringify(testdata) )

    return {
      slug,
      env,
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
  }

}
</script>

<style>
</style>

