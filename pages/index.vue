<template>
  <div class="Home">

    <div class="Home-hero _section-page _margin-center _margin-top-2 _margin-bottom-2">
      <!-- <div class="Home-img-container _section-content _padding-top-2 "> -->
      <div class="Home-img-container _padding-top-2  ">
        <img class="Home-img" alt="Phage Directory logo" width="250px" src="~/static/phagedirectory_home.png">
        <div class="Home-hero-txt --title _font-normal" v-html="$md.render(mission || '')" />
      </div>
    </div>
    
    <!-- 
        <div>
          <EvergreenHome class="_margin-top-2 _divider-bottom">
            <img class="" width="250px" src="~/static/phagedirectory_home.png">
            <div class="" v-html="$md.render(more || '') "/>
          </EvergreenHome>
        </div>
     -->
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

            <div class="Home-latest _margin-center _padding-left-xs _padding-right-xs">
              <h6 class="_padding-bottom-half"><span class="phagey _padding-right">⬢-{</span> Phage Pheed <span class="phagey  _padding-left">}-⬢</span></h6>
              <Latest v-if="featuredAtoms" :atoms="featuredAtoms" />
              <NodeForm v-if="form" :src="form"/>
              <Latest v-if="nonFeaturedAtoms" class="_margin-top-2 --tight" :atoms="nonFeaturedAtoms" />
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

// import EvergreenHome from '~/components/events/EvergreenHome.vue'


const _numLatest = 8 // latest number of Atoms to show in the feed


export default {

  components: {
    Latest,
    Template,
    Twitter,
    CapsidStub,
    NodeForm,
    // EvergreenHome,
  },

  layout: 'contentframe',
  middleware: 'pageload',
  meta: {
    // tableQuery: "_content"
    // tableQueries: ['_content']
    tableQueries: ['_content-core']
  },

  data () {

    // this loads in the latest capsid on client; but do it on server instead
    // b/c that's better for SEO
    // this.getLatestCapsid()

    // load the author on client
    if(this.latestCapsid)
      this.getAuthorsOfManuscript(this.latestCapsid)

    // load these in the client so server is faster; can't be cached, so can skip SEO
    this.getLatestAtoms(_numLatest)
    // load this one in last b/c they're not that common, and shouldn't be cached
    this.getFeaturedAtoms()

    return {
      mission: this.$cytosis.findField('home-mission', this.$store.state['Content'], 'Markdown' ),
      featured: this.$cytosis.findField('home-featured', this.$store.state['Content'], 'Markdown' ),
      more: this.$cytosis.findField('home-more', this.$store.state['Content'], 'Markdown' ),
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

    latestAuthors() {
      // load the author on client
      if(this.latestCapsid)
        this.getAuthorsOfManuscript(this.latestCapsid)
      return undefined
    },


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
    //   routeName: '{index/getLatestAtoms}', 
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
    //   routeName: '{index/getFeaturedAtoms}', 
    //   query: 'atoms-featured',
    // })

    // Loads in the latest Capsid from the server
    // this is SEPARATE from the client function
    const capsidData = await loadQuery({
      useDataCache: true,
      _key: env.airtable_api, 
      _base: env.airtable_base, 
      store: store, 
      routeName: '{index/getLatestCapsid}', 
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
    if(this.latestCapsid)
      this.getAuthorsOfManuscript(this.latestCapsid)
  },

  methods: {

    getFeaturedAtoms() {
      const _this = this
      loadQuery({
        useDataCache: true,
        _key: process.env.airtable_api, 
        _base: process.env.airtable_base, 
        store: _this.$store, 
        routeName: '{index/getFeaturedAtoms}', 
        query: 'atoms-featured',
      }).then((data) => {
        if(data.tables['Atoms'])
          _this.featuredAtoms = data.tables.Atoms
      })
      return undefined
    },
    getLatestCapsid() {
      const _this = this
      loadQuery({
        useDataCache: true,
        _key: process.env.airtable_api, 
        _base: process.env.airtable_base, 
        store: _this.$store, 
        routeName: '{index/getLatestCapsid}', 
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
        routeName: '{index/getLatestAtoms}', 
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

    async getAuthor(slug) {
      const _this = this
      const data = await loadQuery({
        // useDataCache: true,
        _key: process.env.db_api, 
        _base: process.env.db_base, 
        store: _this.$store,
        routeName: '{index/getAuthor}', 
        query: 'People-profile',
        keyword: slug,
      })

      return data.tables['People'][0]
    },

    getAuthorsOfManuscript(manuscript) {
      // const authorSlug = manuscript.fields['Data:MainAuthorSlug']
      let authorSlugs = manuscript.fields['Data:MainAuthorSlug']

      // const authorSlugs = [... manuscript.fields['Data:MainAuthorSlug'], ... manuscript.fields['Data:AuthorSlugs']]
      if(manuscript.fields['Data:AuthorSlugs'])
        authorSlugs = [... authorSlugs, ... manuscript.fields['Data:AuthorSlugs']]

      const _this = this
      // let authors = []
      let authorsP = []

      authorSlugs.map(function(slug) {
        // const author = await _this.getAuthor(slug)
        const author = _this.getAuthor(slug)
        authorsP.push(author)
        // _this.authors.push(author[0])
      })

      Promise.all(authorsP).then((authors) => {
        _this.authors = authors
      })

      // return authors
    },
  },



}
</script>

<style>
</style>

