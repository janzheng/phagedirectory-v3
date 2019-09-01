<template>
  <div class="Feed">

    <no-ssr>
      <Template class="Home-grid _divider-bottom" 
                grid-classes="Template--Main-Sidebar-xs _grid-2-1-sm _grid-1-xs _grid-gap-none"
                sidebar-classes="_sidebar _height-100">
        <template #default>
          <div class="Home-grid-main">
            <div v-if="featured" class="Home-featured _margin-bottom-2">
              <div class="" v-html="$md.render(featured || '') "/>
            </div>

            <!-- <div class="Home-capsid-container _section-page _margin-center _margin-bottom-2">
              <div class="Home-capsid">
                <div>
                  <CapsidStub :show-logo="true" :issue="Manuscripts[0]" :is-featured="true" class="" />
                </div>
              </div>
            </div> -->

            <div class="Home-latest _section-page _margin-center ">
              <h6 class="_padding-bottom-half"><span class="phagey _padding-right">⬢-{</span> Phage Pheed <span class="phagey  _padding-left">}-⬢</span></h6>
              <Latest :atoms="featuredAtoms" />
              <NodeForm v-if="form" :src="form"/>
              <Latest class="_margin-top-2 --tight" :atoms="nonFeaturedAtoms" />
              <button class="_button --width-full _center CTA --brand _font-bold _margin-none-i" @click="getLatestAtoms(numLatest)">
                <span v-if="!isLoadingMore" class="">Load More</span> 
                <!-- <div v-else class="_spinner"> </div> -->
                <div v-else >Loading <span class="_margin-left _spinner" /> </div>
              </button>
            </div>
          </div>
        </template>

      </Template>
    </no-ssr>
      
  </div>
</template>




<script>


import { mapState } from 'vuex'
import Latest from '~/components/Latest.vue'
import Template from '~/templates/article.vue'
import { loadQuery } from '~/other/loaders'
import NodeForm from '~/components/render/NodeForm.vue'

export default {

  components: {
    Latest,
    Template,
    NodeForm,
  },

  layout: 'contentframe',
  middleware: 'pageload',
  meta: {
    // tableQuery: "_content"
    tableQueries: ['_content-forms', 'capsid-previews']
  },

  data () {
    const numLatest = 5
    this.getLatestAtoms(numLatest)
    this.getFeaturedAtoms()
    return {
      mission: this.$cytosis.findField('home-mission', this.$store.state['Content'], 'Markdown' ),
      featured: this.$cytosis.findField('home-featured', this.$store.state['Content'], 'Markdown' ),
      form: this.$cytosis.findOne('form-feed', this.$store.state['Content'] ),
      latestAtoms: null, // pulled later
      featuredAtoms: null, // use this if you want to pull featured atoms manually
      numLatest,
      isLoadingMore: false, // loading more atoms
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

  mounted() {
    if(this.$segment)
      this.$segment.page('PDv3:index')
  },

  methods: {

    async getFeaturedAtoms() {
      const _this = this
      loadQuery({
        _key: process.env.airtable_api, 
        _base: process.env.airtable_base, 
        store: _this.$store, 
        routeName: 'Index-featured-atoms', 
        query: 'atoms-featured',
      }).then((data) => {
        _this.featuredAtoms = data.tables.Atoms
      })
      return undefined
    },
    async getLatestAtoms(numLatest) {
      const _this = this
      this.isLoadingMore = true
      loadQuery({
        _key: process.env.airtable_api, 
        _base: process.env.airtable_base, 
        store: _this.$store, 
        routeName: 'Index-latest-atoms', 
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
    }
  },



}
</script>

<style>
</style>

