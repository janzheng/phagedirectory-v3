
<template>
  <!-- <header class="Header _section-page _padding-top _padding-bottom _margin-center"> -->
  <div class="Header-container ">

    <header class="Header _margin-center">
      <div class="Header-content">

        <div :class="navOpen ? '--open' : ''" class="Header-mobile _hidden-sm-up" >

          <!-- https://w3bits.com/animated-menu-icon-css/ -->
          <!-- <div class="nav-icon --open">
            <div class="nav-icon-child " />
          </div>
          <div class="nav-icon">
            <div class="nav-icon-child " />
          </div> -->

          <div class="Header-mobile-nav _grid-auto-1-xs _align-vertically _padding _padding-top ">
            <div class="Header-logo">
              <nuxt-link name="Home" to="/" class=" Header-logo-link _border-none-i"><img class="logo-xs" alt="Phage Directory Logo" src="~/static/icon.png"></nuxt-link>
            </div>

            <div class="Header-mobile-cta _align-right" @click="toggleNav" >
              <div class="_grid-auto-1-xs _grid-gap-none _align-vertically">
                <h4 class="_padding-none">Menu</h4>
                <div :class="navOpen ? '--open' : ''" class="nav-icon">
                  <div class="nav-icon-child " />
                </div>
              </div>
            </div>
          </div>

          <div v-if="navOpen" class="Header-mobile-content" @click="handleNavClick" >
            <div class="Header-inset _padding-half">
              <div class="Header-mobile-item">
                <div class="Header-search-container _form-control _margin-none">
                  <label for="textSearch" class="_form-label-search _padding-left-half _padding-bottom-none _height-100">
                    <!-- <svg data-baseweb="icon" viewBox="0 0 24 24" height="100%" width="24"><title>Search</title><path fill-rule="evenodd" clip-rule="evenodd" d="M11 6C8.79086 6 7 7.79086 7 10C7 12.2091 8.79086 14 11 14C13.2091 14 15 12.2091 15 10C15 7.79086 13.2091 6 11 6ZM5 10C5 6.68629 7.68629 4 11 4C14.3137 4 17 6.68629 17 10C17 11.2958 16.5892 12.4957 15.8907 13.4765L19.7071 17.2929C20.0976 17.6834 20.0976 18.3166 19.7071 18.7071C19.3166 19.0976 18.6834 19.0976 18.2929 18.7071L14.4765 14.8907C13.4957 15.5892 12.2958 16 11 16C7.68629 16 5 13.3137 5 10Z" /></svg> -->
                    <span class="_font-phage icon-search"/>
                  </label>
                  <input id="header_searchbar" ref="headerSearch" v-model.trim="searchString" class="Header-search _form-input _inline" type="text" name="header_searchbar" placeholder="Search" @input="doSearch">
                  <span v-if="searchString && searchString.length > 0" role="button" class="_form-label-cancel _padding-left-half _padding-right-half _padding-bottom-none _height-100" @click="doClear" >
                    <span class="_font-phage icon-cancel"/>
                  </span>
                </div>
              </div>
              <div class="Header-mobile-item _margin-top">
                <nuxt-link :to="`/hosts${searchQuery}`" class="_button --text _padding-none -left _margin-none-i --border-none">
                  Phage Hosts
                  <span v-if="searchString" ref="mobilesearch" class="_button CTA --short _margin-none-i _float-right" @click="toggleNav">
                    Search
                  </span>
                </nuxt-link>
              </div>
              <div class="Header-mobile-item">
                <nuxt-link :to="`/labs${searchQuery}`" class="_button --text _padding-none _margin-none-i --border-none">
                  Phage Labs
                  <span v-if="searchString" class="_button CTA --short _margin-none-i _float-right" @click="toggleNav">
                    Search
                  </span>
                </nuxt-link>
              </div>
              <div class="Header-mobile-item">
                <nuxt-link :to="`/orgs${searchQuery}`" class="_button --text  _padding-none _margin-none-i --border-none">
                  Organizations
                  <span v-if="searchString" class="_button CTA --short _margin-none-i _float-right" @click="toggleNav">
                    Search
                  </span>
                </nuxt-link>
              </div>
              <div class="Header-mobile-item">
                <nuxt-link :to="`/people${searchQuery}`" class="_button --text  _padding-none _margin-none-i --border-none">
                  People
                  <span v-if="searchString" class="_button CTA --short _margin-none-i _float-right" @click="toggleNav">
                    Search
                  </span>
                </nuxt-link>
              </div>
              <div class="Header-mobile-item">
                <nuxt-link :to="`/insights`" class="_button --text  _padding-none _margin-none-i --border-none">
                  Insights
                  <span v-if="searchString" class="_button CTA --short _margin-none-i _float-right" @click="toggleNav">
                    Search
                  </span>
                </nuxt-link>
              </div>
              <!-- <div class="Header-mobile-item">
                <nuxt-link :to="`/groups`" class="_button --text  _padding-none _margin-none-i --border-none">
                  Groups
                  <span v-if="searchString" class="_button CTA --short _margin-none-i _float-right" @click="toggleNav">
                    Search
                  </span>
                </nuxt-link>
              </div> -->
              <div class="Header-mobile-item _padding-top _padding-bottom">
                <nuxt-link to="/apply" class="_button Header-join  --outline _margin-none-i ">
                  Apply
                </nuxt-link>
              </div>

              <!-- sub section -->
              <div :class="isHome ? '--home' : ''" class="Header-links _padding">
                <div v-for="item of links" :key="item.name" class="Header-mobile-item">
                  <nuxt-link :to="item.link" class="_button --text _padding-none ">
                    {{ item.name }}
                  </nuxt-link>
                </div>
              </div>
            </div>
          </div>
        </div>







        <!-- Desktop menu -->
        <div class="Header-desktop _section-page _margin-center _hidden-xs _grid-auto-1 _grid-gap-none">
          <div class="Header-logo _align-vertically">
            <nuxt-link name="Home" to="/" class=" Header-logo-link _border-none-i _padding"><img class="logo-xs" alt="Phage Directory Logo" src="~/static/icon.png"></nuxt-link>
          </div>
          <div class="Header-container _margin-half _margin-left-none _margin-right-none _padding-bottom-half ">
            <div class="Header-inset _flex-row _flex-2 _padding-half _margin-bottom-none">
              <div class="Header-search-container _flex-1 _form-control _margin-none">
                <label for="textSearch" class="_form-label-search _padding-left-half _padding-bottom-none _height-100">
                  <span class="_font-phage icon-search"/>
                </label>
                <input id="header_searchbar" ref="headerSearch" v-model.trim="searchString" class="Header-search _form-input _inline " type="text" name="header_searchbar" placeholder="Search" @input="doSearch">
                <span v-if="searchString && searchString.length > 0" role="button" class="_form-label-cancel _padding-left-half _padding-right-half _padding-bottom-none _height-100" @click="doClear" >
                  <span class="_font-phage icon-cancel"/>
                </span>
              </div>

              <div class="--nowrap">
                <nuxt-link :to="`/hosts${searchQuery}`" class="_button --text _padding-none -left _margin-none-i --border-none">
                  Phage Hosts
                </nuxt-link>
                <nuxt-link :to="`/labs${searchQuery}`" class="_button --text _padding-none _margin-none-i --border-none">
                  Labs
                </nuxt-link>
                <nuxt-link :to="`/orgs${searchQuery}`" class="_button --text  _padding-none _margin-none-i --border-none">
                  Organizations
                </nuxt-link>
                <nuxt-link :to="`/people${searchQuery}`" class="_button --text  _padding-none _margin-none-i --border-none">
                  People
                </nuxt-link>
                <nuxt-link :to="`/insights${searchQuery}`" class="_button --text  _padding-none _margin-none-i --border-none">
                  Insights
                </nuxt-link>
                <!-- <nuxt-link :to="`/groups`" class="_button --text  _padding-none _margin-none-i --border-none">
                  Groups
                </nuxt-link> -->
                <nuxt-link :to="`/apply`" class="Header-join _button --outline  ">
                  Sign Up
                </nuxt-link>
              </div>
            </div>

            <div :class="isHome ? '--home' : ''" class="Header-links _padding-left-half _padding-right-half">
              <nuxt-link v-for="item of links" :key="item.name" :to="item.link" class="_button --text _padding-none ">
                {{ item.name }}
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </header>
  </div>
</template>


<script>

import { mapState } from 'vuex'
import _ from '~/other/lodash.custom.min.js'
import { dirSearch } from '~/other/helpers.js'

export default {
  data: function () {

    return {
      // searchString: this.$store.state.search.string,
      links: JSON.parse(this.$cytosis.findOne('header-subnav', this.$store.state['Content'] ).fields['Data:JSON'])['links'],
      isHome: this.pathMatch('/') ? true : false
    }
  },

  computed: {
    ...mapState([
      'navOpen',
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
    searchQuery() {
      if(this.searchString)
        return `?search=${this.searchString}`
      return ''
    },
  },

  watch: {
    '$route' () {
      this.isHome = this.pathMatch('/') ? true : false
    }
  },

  mounted() {
    const querySearchString = this.$router.currentRoute.query.search
    if(querySearchString) {
      // this.$store.dispatch("updateCreate", {
      //   searchSource: "header",
      //   searchString: searchString || "",
      //   searchUrl: this.$router.currentRoute.fullPath,
      // })
      this.$store.dispatch("updateCreate", {
        search: {
          string: querySearchString,
          url: this.$router.currentRoute.fullPath,
        }
      })
    }
  },
  
  methods: {
    doSearch: new _.debounce(function() {
      dirSearch(this)
    }, 300, {
      trailing: true
    }),
    doClear() {
      this.searchString = ""
      dirSearch(this)
    },
    pathMatch(path) {
      // console.log('pathMatch',this.$router.currentRoute.path)
      if(!this.$router.currentRoute.path)
        return false

      if(this.$router.currentRoute.path == path)
        return true
    },
    toggleNav() {
      if(this.$store.state.navOpen) {
        this.$store.dispatch("updateCreate", {
          navOpen: false
        })
      } else {
        this.$store.dispatch("updateCreate", {
          navOpen: true
        })
      }
    },
    handleNavClick(el) {
      // nav link clicks should trigger nav close
      // console.log('handleNavClick', el.target.href, el)
      if(el.target.href) {
        this.toggleNav()
      }
    }
  }
}
</script>

<style lang="scss" scoped>

.logo {
  position: relative;
  width: 45px;
  top: 3px;
}

.logo-xs {
  position: relative;
  width: 45px; //34px;
  // top: 3px;
  // margin-right: 16px;
  vertical-align: bottom;
}

</style>


