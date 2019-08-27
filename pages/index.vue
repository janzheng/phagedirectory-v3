<template>
  <div class="Home">

    <div class="Home-hero _section-page _margin-center _margin-top-2 _margin-bottom-2">
      <!-- <div class="Home-img-container _section-content _padding-top-2 "> -->
      <div class="Home-img-container _padding-top-2  ">
        <img class="Home-img" width="250px" src="~/static/phagedirectory_home.png">
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

            <div class="Home-capsid-container _margin-center _margin-bottom-2 _padding-left-xs _padding-right-xs">
              <div class="Home-capsid">
                <div>
                  <CapsidStub :authors="getAuthorsOfManuscript(Manuscripts[0])" :show-logo="true" :issue="Manuscripts[0]" :is-featured="true" class="" />
                </div>
              </div>
            </div>

            <div class="Home-latest _divider-top _margin-center _padding-left-xs _padding-right-xs">
              <h6 class="_padding-bottom-half"><span class="phagey _padding-right">⬢-{</span> Phage Pheed <span class="phagey  _padding-left">}-⬢</span></h6>
              <Latest :atoms="featuredAtoms" />
              <NodeForm :src="form"/>
              <Latest class="_margin-top-2 --tight" :atoms="nonFeaturedAtoms" />
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
    tableQueries: ['_content', 'capsid-previews']
  },

  data () {

    const numLatest = 5
    this.getLatestAtoms(numLatest)
    this.getFeaturedAtoms()
    this.getPeople()

    return {
      mission: this.$cytosis.findOne('home-mission', this.$store.state['Content'] ).fields['Markdown'],
      featured: this.$cytosis.findOne('home-featured', this.$store.state['Content'] ).fields['Markdown'],
      more: this.$cytosis.findOne('home-more', this.$store.state['Content'] ).fields['Markdown'],
      form: this.$cytosis.findOne('form-feed', this.$store.state['Content'] ),
      latestAtoms: null, // pulled later
      featuredAtoms: null, // use this if you want to pull featured atoms manually
      numLatest,
      isLoadingMore: false, // loading more atoms
      People: null,
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
        _this.featuredAtoms = data.tables.Atoms
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
        this.isLoadingMore = false
        // _this.$sys.log('latest atoms:', data)
        _this.latestAtoms = data.tables.Atoms
        _this.numLatest = _this.numLatest + 5
      })
      return undefined
    },
    getPeople() {
      const _this = this
      loadQuery({
        useDataCache: true,
        _key: process.env.db_api, 
        _base: process.env.db_base, 
        store: _this.$store,
        routeName: '{index/getPeople}', 
        query: 'People-index',
      }).then((data) => {
        const People = data.tables['People']
        _this['People'] = People
      })
      return undefined
    },
    getAuthorsOfManuscript(manuscript) {
      if(this['People'] && this['People'].length > 0) {
        // const authorSlug = manuscript.fields['Data:MainAuthorSlug']
        let authorSlugs = manuscript.fields['Data:MainAuthorSlug']

        // const authorSlugs = [... manuscript.fields['Data:MainAuthorSlug'], ... manuscript.fields['Data:AuthorSlugs']]
        if(manuscript.fields['Data:AuthorSlugs'])
          authorSlugs = [... authorSlugs, ... manuscript.fields['Data:AuthorSlugs']]

        const _this = this
        let authors = []

        authorSlugs.map((slug) => {
        // console.log('authorSlugs.map', slug, _this.$cytosis.findOne(slug, _this['People'], 'Slug'))
          authors.push(_this.$cytosis.findOne(slug, _this['People'], ['Slug'] ))
        })

        return authors
      }
      return undefined
    },
  },



}
</script>

<style>
</style>

