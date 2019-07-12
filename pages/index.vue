<template>
  <div class="Home">

    <div class="Home-hero _section-page _margin-center _margin-top-2 _margin-bottom-2">
      <div class="Home-img-container _section-content _padding-top-2 ">
        <img class="Home-img" width="250px" src="~/static/phagedirectory_home.png">
        <div class="Home-hero-txt --title _font-normal" v-html="$md.render(mission || '')">
          <!-- We support fundamental phage research <br>
          and the development of safe and effective uses of <br>
          phages in medicine and industry around the world.
          <div class="_margin-top">
            Read <nuxt-link to="/about#mission">our mission</nuxt-link>.
          </div> -->
        </div>
      </div>
    </div>

    <no-ssr>
      <Template class="Home-grid _divider-bottom" 
                grid-classes="Template--Main-Sidebar-xs _grid-2-1-sm _grid-1-xs _grid-gap"
                sidebar-classes="_sidebar _height-100">
        <template #default>
          <div class="Home-grid-main">
            <div v-if="featured" class="Home-featured _margin-bottom-2">
              <div class="" v-html="$md.render(featured || '') "/>
            </div>

            <div class="Home-capsid-container _section-page _margin-center _margin-bottom-2">
              <div class="Home-capsid">
                <div>
                  <CapsidStub :show-logo="true" :issue="Manuscripts[0]" :is-featured="true" class="" />
                </div>
              </div>
            </div>

            <div class="Home-latest _divider-top _section-page _margin-center ">
              <h6 class="_padding-bottom-half"><span class="phagey _padding-right">⬢-{</span> Phage Pheed <span class="phagey  _padding-left">}-⬢</span></h6>
              <Latest :atoms="featuredAtoms" />
              <Latest :atoms="nonFeaturedAtoms" />
              <button class="_button --width-full _center CTA --brand _font-bold _margin-none-i" @click="getLatestAtoms(numLatest)">
                <span v-if="!isLoadingMore" class="">Load More</span> 
                <!-- <div v-else class="_spinner"> </div> -->
                <div v-else >Loading <span class="_margin-left _spinner" /> </div>
              </button>
            </div>
          </div>
        </template>

        <template #context>
          <Twitter class="_height-100" />
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

export default {

  components: {
    Latest,
    Template,
    Twitter,
    CapsidStub,
  },

  layout: 'contentframe',
  middleware: 'pageload',
  meta: {
    // tableQuery: "_content"
    tableQueries: ['_content', 'capsid-previews', 'atoms-featured', 'atoms-latest']
  },

  data () {
    const numLatest = 5
    this.getLatestAtoms(numLatest)
    return {
      mission: this.$cytosis.findOne('home-mission', this.$store.state['Content'] ).fields['Markdown'],
      featured: this.$cytosis.findOne('home-featured', this.$store.state['Content'] ).fields['Markdown'],
      latestAtoms: null, // pulled later
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

    featuredAtoms() {
      return this.Atoms.filter(e => {
      // return this.latestAtoms.filter(e => {
        return e.fields['Status'] == 'FeedFeature'
      })
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

  async asyncData({env}) {

    return {
      postUrl: env.ext_handler,
    }
  },

  mounted() {
    this.$segment.page('PDv3:index')
  },

  methods: {

    async getLatestAtoms(numLatest) {
      const _this = this
      this.isLoadingMore = true
      loadQuery({
        _key: process.env.airtable_api, 
        _base: process.env.airtable_base, 
        store: _this.$store, 
        routeName: '{Index}', 
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

