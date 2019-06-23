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
              <Latest :atoms="Atoms" />
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
    tableQueries: ['_content', 'capsid-previews', 'atoms-latest']
  },

  data () {
    return {
      // mission: this.$cytosis.findOne('home-mission', this.$store.state['Content'] ).fields['Markdown'],
      featured: this.$cytosis.findOne('home-featured', this.$store.state['Content'] ).fields['Markdown'],
    }
  },
  
  computed: {
    ...mapState([
      'Content',
      'Manuscripts',
      'Atoms',
      ]),

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
  },



}
</script>

<style>
</style>

