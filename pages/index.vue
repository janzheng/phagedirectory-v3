<template>
  <div class="Home">

    <div class="Home-hero _section-page _margin-center _margin-top-2 _margin-bottom-2">
      <!-- <div class="Home-img-container _section-content _padding-top-2 "> -->
      <div class="Home-img-container _padding-top-2  ">
        <img class="Home-img" alt="Phage Directory logo" width="250px" src="~/static/phagedirectory_home.png">
        <div v-if="!isStaging"  class="Home-hero-txt --title _font-normal" v-html="$md.render(mission || '')" />
      </div>
    </div>
    
    
    <div v-if="isStaging" class="Home-promo _margin-top-2 _padding-top-2 _padding-bottom-2  _divider-bottom _color-bg-white">
      <div class="_section-page _margin-center">
        <PhageFuturesEUHome>
          <div slot="default" class="" v-html="$md.render(promo || '') "/>
          <div slot="footer" class="" v-html="$md.render(promofooter || '') "/>
        </PhageFuturesEUHome>
      </div>
    </div>
    

    <no-ssr>
      <Template class="Home-grid _divider-bottom" 
                grid-classes="Template--Main-Sidebar-xs _grid-3-1 _grid-gap"
                sidebar-classes="_sidebar _height-100">
        <template #default>
          <div class="Home-grid-main">
            <div v-if="featured" class="Home-featured _margin-bottom-2">
              <div class="" v-html="$md.render(featured || '') "/>
            </div>

            <div v-if="latestCapsid" class="Home-capsid-container _divider-bottom _margin-center _margin-bottom-2 _padding-left-xs _padding-right-xs">
              <div class="Home-capsid">
                <div>
                  <CapsidStub :authors="authors" :show-logo="true" :issue="latestCapsid" :is-featured="true" class="" />
                </div>
              </div>
            </div>

            <div class="Home-latest _margin-center _padding _card">
              <h6 class="_padding-bottom-half"><span class="phagey _padding-right">⬢-{</span> Phage Pheed <span class="phagey  _padding-left">}-⬢</span></h6>
              <!-- featured has been rolled into Latest — add FeedFeature tag and it should show up here -->
              <!-- <Latest v-if="featuredAtoms" :atoms="featuredAtoms" /> -->
              <NodeForm v-if="form" :src="form"/>
              <!-- <Latest v-if="nonFeaturedAtoms" class="_margin-top-2 --tight" :atoms="nonFeaturedAtoms" /> -->
              <Latest class="_margin-top-2 --tight" :atoms="latestAtoms" />
              <button class="_button --width-full _center CTA --brand _font-bold _margin-none-i" @click="getLatestAtoms(numLatest)">
                <span v-if="!isLoadingMore" class="">Load More</span> 
                <!-- <div v-else class="_spinner"> </div> -->
                <div v-else >Loading <span class="_margin-left _spinner" /> </div>
              </button>
            </div>
          </div>
        </template>

        <template #context>
          <no-ssr>
            <Twitter class="_height-100" />
          </no-ssr>
        </template>
      </Template>
    </no-ssr>
      
  </div>
</template>




<script>


import { mapState } from 'vuex'
import Latest from '~/components/Latest.vue'
import Twitter from '~/components/Twitter.vue'
import Template from '~/templates/context.vue'
import CapsidStub from '~/components/publications/CapsidStub.vue'
import { loadQuery } from '~/other/loaders'
import NodeForm from '~/components/render/NodeForm.vue'

import PhageFuturesEUHome from '~/components/events/PhageFuturesEUHome.vue'


const _numLatest = 8 // latest number of Atoms to show in the feed


export default {

  components: {
    Latest,
    Template,
    Twitter,
    CapsidStub,
    NodeForm,

    PhageFuturesEUHome,
  },

  layout: 'contentframe',
  middleware: 'pageload',
  meta: {
    // tableQuery: "_content"
    // tableQueries: ['_content']
    tableQueries: ['_content-copy']
  },

  data () {

    // this loads in the latest capsid on client; but do it on server instead
    // b/c that's better for SEO
    // this.getLatestCapsid()

    // load these in the client so server is faster; can't be cached, so can skip SEO
    this.getLatestAtoms(_numLatest)
    // load this one in last b/c they're not that common, and shouldn't be cached
    // this.getFeaturedAtoms()

    return {
      isStaging: process.env.pd_env == 'stage' ? true : false,

      promo: this.$cytosis.findField('pfeu-promo', this.$store.state['Content'], 'Markdown' ),
      promofooter: this.$cytosis.findField('pfeu-promofooter', this.$store.state['Content'], 'Markdown' ),

      mission: this.$cytosis.findField('home-mission', this.$store.state['Content'], 'Markdown' ),
      featured: this.$cytosis.findField('home-featured', this.$store.state['Content'], 'Markdown' ),
      // more: this.$cytosis.findField('home-more', this.$store.state['Content'], 'Markdown' ),
      form: this.$cytosis.findOne('form-feed', this.$store.state['Content'] ),
      latestCapsid: null,
      latestAtoms: null, // pulled later
      featuredAtoms: null, // use this if you want to pull featured atoms manually
      numLatest: _numLatest,
      isLoadingMore: false, // loading more atoms
      People: null,
      authors: []
    }
  },
  
  computed: {
    ...mapState([
      'Content',
      'Manuscripts',
      'Atoms', 
      ]),

    // this method doesn't retain old featured atoms
    // featuredAtoms() {
    //   return this.Atoms.filter(e => {
    //   // return this.latestAtoms.filter(e => {
    //     return e.fields['Status'] == 'FeedFeature'
    //   })
    // },

    nonFeaturedAtoms() {
      if(this.latestAtoms) {
        return this.latestAtoms.filter(e => {
          return e.fields['Status'] != 'FeedFeature'
        })
      }
      return undefined
    }

  },

  async asyncData({env, store}) {

    // SUPER slow
    // Loads in the latest Atoms from the server
    // this is SEPARATE from the client function
    // const atomData = await loadQuery({
    //   // don't cache data here! that defeats the point of refreshing :)
    //   _key: env.airtable_api, 
    //   _base: env.airtable_base, 
    //   store: store, 
    //   routeName: 'Index-atoms-latest', 
    //   query: 'atoms-latest',
    //   options: {
    //     'view': 'Latest:Published',
    //     'maxRecords': _numLatest,
    //   }
    // })

    // const featureAtomData = await loadQuery({
    //   useDataCache: true,
    //   _key: env.airtable_api, 
    //   _base: env.airtable_base, 
    //   store: store, 
    //   routeName: 'Index-atoms-featured', 
    //   query: 'atoms-featured',
    // })

    // Loads in the latest Capsid from the server
    // this is SEPARATE from the client function
    const capsidData = await loadQuery({
      useDataCache: true,
      _key: env.airtable_api, 
      _base: env.airtable_base, 
      store: store, 
      routeName: 'Index-capsid-latest', 
      query: 'capsid-latest',
    })

    // let latestAtoms, featureAtoms, latestCapsid
    let latestCapsid

    // if(atomData && atomData.tables.Atoms.length > 0)
    //   latestAtoms = atomData.tables.Atoms

    // if(featureAtomData && featureAtomData.tables.Atoms.length > 0)
    //   featureAtoms = featureAtomData.tables.Atoms

    if(capsidData && capsidData.tables.Manuscripts.length > 0)
      latestCapsid = capsidData.tables.Manuscripts[0]

    return {
    //   latestAtoms,
    //   featureAtoms,
      latestCapsid,
    }

  },
  
  mounted() {
    if(this.latestCapsid) {
      this.getAuthorsOfManuscript(this.latestCapsid)
    }
  },

  methods: {

    // s
    getLatestCapsid() {
      const _this = this
      loadQuery({
        useDataCache: true,
        _key: process.env.airtable_api, 
        _base: process.env.airtable_base, 
        store: _this.$store, 
        routeName: 'Index-capsid-latest', 
        query: 'capsid-latest',
      }).then((data) => {
        // Note: these are loaded in ON THE CLIENT 
        if(data.tables['Manuscripts'] && data.tables['Manuscripts'][0]) {
          _this.latestCapsid = data.tables['Manuscripts'][0]
          _this.getAuthorsOfManuscript(data.tables['Manuscripts'][0])
        }

        // Trying to offload these on server
        // _this.getLatestAtoms(_this.numLatest)
        // _this.getFeaturedAtoms()
      })
      return undefined
    },
    getLatestAtoms(numLatest) {
      const _this = this
      this.isLoadingMore = true
      loadQuery({
        // don't cache data here! that defeats the point of refreshing :)
        _key: process.env.airtable_api, 
        _base: process.env.airtable_base, 
        store: _this.$store, 
        routeName: 'Index-atoms-latest', 
        query: 'atoms-latest',
        options: {
          'view': 'Latest:Published',
          'maxRecords': numLatest,
        }
      }).then((data) => {

        if(data.tables['Atoms']) {
          this.isLoadingMore = false
          // _this.$sys.log('latest atoms:', data)
          _this.latestAtoms = data.tables.Atoms
          _this.numLatest = _this.numLatest + 5
        }
      })
      return undefined
    },

    // async getAuthor(slug) {
    //   const _this = this
    //   const data = await loadQuery({
    //     // useDataCache: true,
    //     _key: process.env.db_api, 
    //     _base: process.env.db_base, 
    //     store: _this.$store,
    //     routeName: 'Index-authors', 
    //     query: 'People-profile',
    //     keyword: slug,
    //   })

    //   return data.tables['People'][0]
    // },

    async getAuthorsOfManuscript(manuscript) {
      // if(!this['People'])
      //   return undefined

      if(!manuscript)
        return undefined
    
      let authorSlugs = manuscript.fields['Data:MainAuthorSlug']
      if(manuscript.fields['Data:AuthorSlugs'])
        authorSlugs = [... authorSlugs, ... manuscript.fields['Data:AuthorSlugs']]
      // this.getAuthorsOfManuscript(this.latestCapsid)
    
      let cytosis = await loadQuery({
        // useDataCache: true, // can't data cache this b/c of filter
        _key: process.env.db_api, 
        _base: process.env.db_base, 
        store: this.$store, 
        routeName: 'Index-people', 
        query: process.env.pd_env == 'stage' ? 'People-profile-preview' : 'People-profile',
        options: {
          filter: this.$cytosis.filter_or(authorSlugs, "Slug")
        }
      })

      this['People'] = cytosis.tables['People']
      this['authors'] = cytosis.tables['People']

      return cytosis.tables['People'] // not really used
    },
  },



}
</script>

<style>
</style>

