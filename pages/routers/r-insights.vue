
<!--  

  Router for Insights publicataions
  // built on top of r-capsid

-->

<template>
  <div class="Router-Insights">

    <!-- the route should match against a slug and only the first matched slug should be relevant -->

    <Template class="_section-page _margin-center">
      
      <div slot="sidebar" >
        Right sidebar: {{ manuscript.fields['Name'] }}
        <!-- <div class="_sidebar-content-group">
          <div class="_sidebar-item _sidebar-heading _sidebar-label">
            {{ manuscript.fields['Name'] }}
          </div>
        </div>
        <div v-scroll-spy-active="{class: '--scrollspy-active', selector: '._sidebar-item'}" 
             v-scroll-spy-link="{selector: 'a._sidebar-item'}"
             class="scrollspy _card --silver" 
        >
          <nuxt-link to="#intro" class="_sidebar-item _block --active-disabled">
            Intro
          </nuxt-link>
          <nuxt-link to="#whats-new" class="_sidebar-item _sidebar-content-group _block --active-disabled">
            What's New
          </nuxt-link>
          <nuxt-link to="#jobs" class="_sidebar-item _block --active-disabled">
            Jobs
          </nuxt-link>
          <nuxt-link to="#community" class="_sidebar-item _sidebar-content-group _block --active-disabled">
            Community
          </nuxt-link>
          <nuxt-link to="#article" class="_sidebar-item _block --active-disabled">
            Article
          </nuxt-link> 
        </div>-->
        <div clas="_sidebar-footer">
          <nuxt-link
            v-scroll-to="{
              el: '#Capsid-authors'
            }"
            to="#Capsid-authors" 
            class="_font-smaller _block _padding-left --active-disabled ">
            Author information
          </nuxt-link>
          <nuxt-link
            v-scroll-to="{
              el: '#Capsid-cite'
            }"
            to="#Capsid-cite" 
            class="_font-smaller _block _padding-left --active-disabled ">
            How to cite
          </nuxt-link>
          <nuxt-link
            v-scroll-to="{
              el: '#Capsid-license'
            }"
            to="#Capsid-license" 
            class="_font-smaller _block _padding-left --active-disabled ">
            License
          </nuxt-link>
        </div>
      </div>

      <!-- <a href="/capsid" class="--quiet _inline-block _padding-bottom">Browse all issues of Capsid &amp; Tail</a> -->

      <!-- <Capsid :issue="manuscript" :atoms="atoms" class="Template-Main" /> -->
      Main content here {{ manuscript.fields['Data:Body'] }}
    </Template>

  </div>
</template>




<script>
  
// import { mapState } from 'vuex'
import { loadQuery } from '~/other/loaders'

import Template from '~/templates/manuscript-capsid.vue'
// import Capsid from '~/components/publications/CapsidFour.vue'


export default {

  components: {
    // Capsid,
    Template,
  },

  layout: 'contentframe',
  middleware: 'pageload',
  meta: {
    tableQueries: ["_content"]
  },

  data () {

    return {
    }
  },

  computed: {
    // ...mapState([
    //   'Content',
    //   'Manuscripts',
    //   ]),

    // contents() {
    //   let contents = this.$cytosis.getLinkedRecords(this.node.fields['Node:Contents'], this.Content , true )
    //   return contents.reverse()
    // },
  },

  // runs on server+generation and page route (but not on first page load)
  async asyncData({env, store, route}) {
    const slug = unescape(route.params.slug)
    const manuscript = await loadQuery({env, store, routeName:'insight-router-single', query:'insights-single', keyword: slug})

    // fetches the relevant atoms into the store
    // const atoms = await loadQuery({env, store, routeName:'{capsid router}', query:'capsid-atoms', keyword: manuscript.tables.Manuscripts[0].fields['Name']})

    // console.log('manuscript:', manuscript, ' @ ', slug)

    return {
      manuscript: manuscript.tables.Manuscripts[0],
    }
  },

  beforeCreate () {
  },

  mounted () {
    this.$segmentize({
      segment: this.$segment,
      type: 'page',
      event: 'Router/Insights',
      data: {
        path: this.$route.path,
      }
    })
  },

  beforeDestroy() {
  },

  methods: {
    pathMatch(path) {
      // console.log('pathMatch',this.route.path)
      if(!this.route.path)
        return false

      if(this.route.path == path)
        return true

      // const pathstrs = this.route.path.substring(1).split('/')
      // const secstrs = section.route.substring(1).split('/')

      // if (pathstrs.length == 1) {
      //   return this.route.path.includes(section.route) // partial matches for sub strs
      // }

      // if (pathstrs.length == 2) {
      //   return this.route.path == section.route
      // }

      // // this happens when a subsection like /code/css/variables
      // // matches /code/css — we still want this highlighted
      // if (pathstrs.length > secstrs.length && secstrs.length > 1) {
      //   return this.route.path.includes(section.route)
      // }

      // return this.route.path.includes(section.route) // partial matches for sub strs
      // return section && section.sections && this.route.path == section.route
    },
  },


}
</script>

<style>
</style>

