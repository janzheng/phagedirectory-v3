
<template>
  <!-- <header class="Header _section-page _padding-top _padding-bottom _margin-center"> -->

  <div :style="{height: navHeight+'px'}" class="Header-container" >
    <!-- if using a fixed header, the header-container height maintains the original height -->
    <header ref="nav" :class="headerClass" class="Header _hide _padding-left-3" >
      <div class="_grid-auto-1-xs _grid-gap _align-vertically">
        <router-link to="/" class="Header-title " >
          <img class="_v-middle" src="/icon.png" width="32">
          <!-- Coeur -->
        </router-link>

        <!-- <div class="_flex-row _flex-vertically _flex-right"> -->
        <div class="_flex-row _flex-vertically">
          <router-link v-for="(item, i) of navs" :to="'/'+$slugify(navlinks[i], {lower: true})" :key="item" class="Header-nav _margin-right">{{ item }}</router-link>
          <!-- <div class="_right-sm"> -->
          <!-- <input id="search" ref="search" v-model.trim="searchString" class="Header-search _form-input _inline" type="text" name="search" placeholder="🔍 Search" @input="search"> -->
          <!-- </div> -->
        </div>
      </div>
    </header>
  </div>
</template>


<script>
import { mapState } from 'vuex'

export default {

  props: {
    scrollY: Number,
  },

  data () {
    return {
      mounted: false,
      scrollSpace: 500, // 
      navHeight: 0,
      // title: this.$cytosis.find('Content.title', {'Content': this.$store.state['Content']} )[0]['fields']['Markdown'],
      navs: this.$cytosis.find('Content.header-nav', {'Content': this.$store.state['Content']} )[0]['fields']['Data:List'],
      navlinks: this.$cytosis.find('Content.header-nav', {'Content': this.$store.state['Content']} )[0]['fields']['Data:List-2'],
    }
  },

  computed: {
    ...mapState([
      'diffTopHeader',
      ]),

    searchString: {
      get: function () {
        return this.$store.state.searchString
      },
      // setter
      set: function (str) {
        const url = `/search/${this.searchString}`
        this.$store.dispatch("updateCreate", {
          searchSource: "header",
          searchString: str || "",
          searchUrl: url,
        })
      }
    },

    headerClass() {

      let returnClass = ''

      // don't show header until mounted
      if(this.mounted) {
        returnClass += '_visible-i '
      }

      // if diffTopHeader is true, we have special behavior when the header is at the top
      // otherwise ignore
      if(this.$store.state.diffTopHeader) {
        let height = this.$store.state.splashHeight > 0 ? this.$store.state.splashHeight : this.scrollSpace
        height = height - this.navHeight
        if (this.scrollY <= height) {
          returnClass += '--top '
        }
      }
      return returnClass
    },

  },

  mounted() {
    this.navHeight = this.$refs.nav.clientHeight
    this.$store.dispatch('updateCreate', { 
      "navHeight": this.$refs.nav.clientHeight,
      "windowHeight": window.innerHeight,
    })
    this.mounted = true
  },
  
  methods: {
    search() {
      console.log("handling search:",this.searchString)
      // const url = `/search/${this.searchString}`
      const urlbase = '/coffee-shops/'
      const url = `${urlbase}?search=${this.searchString}`
      // console.log("search url:", url, "?", this.$router.history)
      // $router history push forces a page reload... use window to replace
      // store the searchstring into store?
      if(this.searchString != "")
        this.$router.replace(url)
      else {
        // empty search string
        this.$router.replace(urlbase)
      }

      // window.location = url;
      // this.$store.dispatch("updateCreate", {
      //   search: {
      //     string: this.searchString,
      //     url: url
      //   }
      // })
    }
  }
}
</script>

<style lang="scss" scoped>


</style>


