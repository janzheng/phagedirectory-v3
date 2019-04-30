
<template>
  <!-- <header class="Header _section-page _padding-top _padding-bottom _margin-center"> -->
  <header class="Header _margin-center">
    <div class="Header-content">

      <!-- Mobile Menu -->
      <!-- <div class="_center-xs _align-vertically">
        <div class="Header-left _hidden-sm">
          <div class="_flex _left-xs _align-vertically _margin-bottom">
            <router-link to="/" class="Header-logo-link _border-none-i _margin-right" aria-label="Phage Directory Logo"><img class="logo-xs" src="/icon.png" alt="Phage Directory footer"></router-link>
            <div class=" _flex-2">
              <div class="Header-inset _flex-row _flex-vertically _flex-wrap _padding-right">
                <div class="_margin-bottom-half-sm _flex-row">
                  <router-link to="/phages" class="_button --text --short _padding-none _margin-none --border-none">
                    Phages
                  </router-link>
                  <router-link to="/labs" class="_button --text --short _padding-none _margin-none _margin-right-half --border-none">
                    Labs
                  </router-link>
                  <router-link to="/join" class="_flex-1 _center _button CTA --loud --short _margin-none-i">
                    Join
                  </router-link>
                </div>
              </div>
              <div>
                <router-link to="/phagetherapy" class="_button --text --short _padding-none _margin-none _margin-right-sm --border-none">
                  Phage Therapy
                </router-link>
                <router-link to="/alerts" class="_button --text --short _padding-none _margin-none _margin-right-sm --border-none">
                  Alerts
                </router-link>
                <router-link to="/jobs" class="_button --text --short _padding-none _margin-none _margin-right-sm --border-none">
                  Jobs
                </router-link>
                <router-link to="/community" class="_button --text --short _padding-none _margin-none _margin-right-sm --border-none">
                  Community
                </router-link>
                <router-link to="/capsid" class="_button --text --short _padding-none _margin-none _margin-right-sm --border-none">
                  Capsid &amp; Tail
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div> -->

      <!-- Desktop menu -->
      <div class="Header-desktop _section-page _padding-left _padding-right _margin-center _hidden-mobile _grid-auto-1 _grid-gap-none">
        <div class="Header-logo _align-vertically">
          <router-link name="Home" to="/" class=" Header-logo-link _border-none-i _padding"><img class="logo-xs" alt="Phage Directory Logo" src="~/static/icon.png"></router-link>
        </div>
        <div class="Header-container _margin-half _margin-left-none">
          <div class="Header-inset _flex-row _flex-2  _padding-half  _margin-bottom-none">
            
            <!-- <div class="_button --text --short _padding-none _margin-none-i --border-none ">
              <span class="_font-bold">Phage Directory</span>
            </div> -->
            <router-link to="/phages" class="_button --text _padding-none -left _margin-none-i --border-none">
              Phage Hosts
            </router-link>
            <router-link to="/labs" class="_button --text  _padding-none _margin-none-i _hidden-xs --border-none">
              Organizations
            </router-link>
            <router-link to="/labs" class="_button --text  _padding-none _margin-none-i _hidden-xs --border-none">
              People
            </router-link>
            <router-link to="/labs" class="_button --text _padding-none _margin-none-i _hidden-xs --border-none">
              Labs
            </router-link>
            <router-link to="/join" class="Header-join _button --outline  ">
              Sign Up
            </router-link>

            <div class="Header-search-container _form-control _margin-none">
              <label for="textSearch" class="_form-label-icon _padding-left-half _padding-bottom-none _height-100">
                <svg data-baseweb="icon" viewBox="0 0 24 24" height="100%" width="24"><title>Search</title><path fill-rule="evenodd" clip-rule="evenodd" d="M11 6C8.79086 6 7 7.79086 7 10C7 12.2091 8.79086 14 11 14C13.2091 14 15 12.2091 15 10C15 7.79086 13.2091 6 11 6ZM5 10C5 6.68629 7.68629 4 11 4C14.3137 4 17 6.68629 17 10C17 11.2958 16.5892 12.4957 15.8907 13.4765L19.7071 17.2929C20.0976 17.6834 20.0976 18.3166 19.7071 18.7071C19.3166 19.0976 18.6834 19.0976 18.2929 18.7071L14.4765 14.8907C13.4957 15.5892 12.2958 16 11 16C7.68629 16 5 13.3137 5 10Z" /></svg>
              </label>
              <input id="header_searchbar" ref="headerSearch" v-model.trim="searchString" class="Header-search _form-input _inline _hidden-mobile" type="text" name="header_searchbar" placeholder="Search" @input="search">
            </div>
            
          </div>
          <div class="Header-links _padding-left-half _padding-right-half">
            <router-link v-for="item of links" :key="item.name" :to="item.link" class="_button --text --short _padding-none --border-none">
              {{ item.name }}
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>


<script>
export default {
  data: function () {
    return {
      // searchString: this.$store.state.search.string,
      links: JSON.parse(this.$cytosis.findOne('header-subnav', this.$store.state['Content'] ).fields['Data:JSON'])['links']
    }
  },

  computed: {
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
    }
  },

  methods: {
    search() {
      // console.log("handling search:",this.searchString)
      // const url = `/search/${this.searchString}`
      const url = `/phages`
      // console.log("search url:", url, "?", this.$router.history)
      // $router history push forces a page reload... use window to replace
      // store the searchstring into store?
      if(this.searchString != "")
        this.$router.replace(url)

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


