<template>
  <div class="Home">

    <div class="Home-hero _section-page _margin-center _margin-top-2 _margin-bottom-2">
      <div class="Home-img-container _section-content _padding-top-2 ">
        <img class="Home-img" width="250px" src="~/static/phagedirectory_home.png">
        <h3 class="Home-hero-txt --title _font-normal">
          We support fundamental phage research <br>
          and the development of safe and effective uses of <br>
          phages in medicine and industries around the world.
          <div class="_margin-top">
            Read about <router-link to="/about#mission">our mission</router-link>.
          </div>
        </h3>
      </div>
    </div>


    <no-ssr>
      <Template class="Home-grid" grid-classes="Template--Main-Sidebar-xs _grid-2-1-sm _grid-1-xs _grid-gap">
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

            <div class="Home-latest _section-page _margin-center _margin-bottom-2">
              <Latest :atoms="featuredAtoms" />
              <Latest :atoms="nonFeaturedAtoms" />
              <div class="_button --width-full --outline _center CTA --brand _font-bold" @click="getLatestAtoms(numLatest)">
                Load More 
              </div>
            </div>
          </div>
        </template>

        <template #context>
          <Twitter />
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
    tableQueries: ['_content', 'capsid-previews', 'atoms-featured']
  },

  data () {
    const numLatest = 5
    this.getLatestAtoms(numLatest)
    return {
      // mission: this.$cytosis.findOne('home-mission', this.$store.state['Content'] ).fields['Markdown'],
      featured: this.$cytosis.findOne('home-featured', this.$store.state['Content'] ).fields['Markdown'],
      latestAtoms: null, // pulled later
      numLatest,
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
        return e.fields['Data:Priority'] == 'Featured'
      })
    },

    nonFeaturedAtoms() {
      if(this.latestAtoms) {
        return this.latestAtoms.filter(e => {
          return e.fields['Data:Priority'] != 'Featured'
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

