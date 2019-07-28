<template>
  <div>
    <div id="top" class="ContentFrame Layout" :class="navOpen ? '--open' : ''" >
      <Header :scroll-y="scrollY" />
      
      <div class="ContentFrame-body" >
        <nuxt @click="onClick($event)" />

        <no-ssr>
          <PolicyBanner />
        </no-ssr>
        
        <FooterSignups />
        <FooterSupport />
      </div>
      
      <Footer/>
      <div class="Footer --footer-tmp-element">
      </div>

    </div>
  </div>
</template>


<script>

import _ from '~/other/lodash.custom.min.js'

import { mapState } from 'vuex'
import VueScrollTo from 'vue-scrollto'

import Header from '~/components/layout/Header.vue'
import Footer from '~/components/layout/Footer.vue'
import FooterSupport from '~/components/layout/FooterSupport.vue'
import FooterSignups from '~/components/layout/FooterSignups.vue'
import PolicyBanner from '~/components/org/PolicyBanner.vue'

// import Directory from '~/components/Directory.vue'
// import SignupAlert from '~/components/SignupAlert.vue'
// import SignupRequest from '~/components/SignupRequest.vue'
// import SignupCapsid from '~/components/SignupCapsid.vue'

export default {

  components: {
    Header,
    Footer,
    FooterSupport,
    FooterSignups,
    PolicyBanner,
    // SignupAlert,
    // SignupRequest,
    // SignupCapsid,
    // Directory,
  },

  head () {
    return {
      // title: this.$store.state.pageName || 'Phage Directory',
      title: 'Phage Directory',
    }
  },

  async asyncdata () {
  },

  data () {
    return {
      scrollY: 0,
      route: '',
      width: 0,
      // searchString: 'testStr'
      // children: route ? route.children : undefined,
    }
  },


  computed: {
    ...mapState([
      'searchString',
      'navOpen',
      ]),
  },

  watch: {
  },

  beforeUpdate () {
    const route = this.$router.options.routes.find((route) => {
      return route.path === this.$route.path
    })

    // console.log('new route', route)
    this.route = route
  },

  mounted () {
    // handle anchor links on page load
    const _this = this
    let scrolled = false
    this.$nextTick(function () { // this waits to all the children are mounted, too
      if(_this.$route.hash && !scrolled) {
        // console.log('-- hash scroll')
      } 
      if(_this.$route.hash) {
        const scroll = _.throttle(function () {
          VueScrollTo.scrollTo(_this.$route.hash, 900, {
           offset: -50
         })
        }, 600)

        // scrolls too fast / before stuff's loaded, add a small buffer
        setTimeout(scroll, 300)
        // scroll()
      }
      scrolled = true
    })
  
  },

  // link intercept idea from: https://github.com/nuxt/nuxtjs.org/blob/master/components/HtmlParser.vue
  created () {
    // this.width = window.outerWidth
    if(this.$segment)
      this.$segment.page('v3-template-created')

    if(process.browser)
      window.addEventListener('scroll', this.handleScroll)
  },

  destroyed () {
    if(process.browser)
      window.removeEventListener('scroll', this.handleScroll)
  },

  methods: {
    onClick(evt) {
      evt.preventDefault()
      // console.log('on click evt', evt)
    },
    handleScroll() {
      if(process.browser) {
        const _this = this
        _.throttle(function () {
          _this.scrollY = window.scrollY
        }, 200)()
      }
    }
  },
}

</script>


<style lang="scss" scoped>
</style>
