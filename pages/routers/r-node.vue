
<!-- 

  Router for handling node routes / generating pages for node

 -->

<template>
  <div class="Template-Documentation">
    <!-- generated ssr gets screwy with these, but zeit now is fine -->
    <!-- <no-ssr> -->
    <!-- 
    <div class="_section-page">
      <h6>[ t-router ] </h6>
      <div class="_card _padding">Node: {{ node }}</div>
      <div class="_card _padding">Source: {{ source }}</div>
    </div> -->

    <!-- consider using dynamic loading only after too many templates (> 7) -->
    <div v-if="node">

      <!-- For landing pages and basic articles -->
      <TemplateArticle v-if="node && node.fields['Render:Template'] == 'Article'" :node="node" :route="route" />

      <!-- For lists like alerts, jobs, etc. (not developed, curr. using documentation -->
      <!-- <TemplateDatalist v-if="node.fields['Render:Template'] == 'Article'" :node="node" :route="route" /> -->

      <!-- <TemplateDocs :node="node" :route="route" /> -->
      <TemplateDocumentation v-if="node && node.fields['Render:Template'] == 'Documentation'" :node="node" :route="route" />

      <!-- scroll spy alt -->
      <TemplateScrollDocumentation v-if="node && node.fields['Render:Template'] == 'ScrollDocumentation'" :node="node" :route="route" />
    </div>


    <!-- </no-ssr> -->
  </div>
</template>




<script>
  
import { mapState } from 'vuex'
// import { loadQuery } from '~/other/loaders'

import TemplateArticle from '~/templates/node-article'
// import TemplateBasic from '~/templates/node-basic'
import TemplateDocumentation from '~/templates/node-documentation'
import TemplateScrollDocumentation from '~/templates/node-scroll-documentation'


export default {

  components: {
    TemplateArticle,
    // TemplateBasic,
    TemplateDocumentation,
    TemplateScrollDocumentation,
  },

  layout: 'contentframe',
  middleware: 'pageload',
  meta: {
    tableQueries: ["_content-nodes"]
  },

  data () {
    // const _this = this
    // const slug = '/' + unescape(this.$router.history.current.params.slug)
    // console.log('[Node Router] (data)', slug)
    // this.getNode(slug)

    return {
      route: this.$router.history.current,
      node: undefined
    }
  },

  computed: {
    ...mapState([
      'Content'
      ]),

    // contents() {
    //   let contents = this.$cytosis.getLinkedRecords(this.node.fields['Node:Contents'], this.Content , true )
    //   return contents.reverse()
    // },
  },

  // runs on server+generation and page route (but not on first page load)
  async asyncData({app, store, route, error}) {

    // const slug = '/' + unescape(route.params.slug)
    const slug = unescape(route.params.slug)
    // const slug = '/' + unescape(this.$router.history.current.params.slug)
    console.log('[Node Router] slug:', slug)

    const _this = this
    // const node = app.$cytosis.findOne(slug, store.state['Content'], ['Slug']) // unable to find connected nodes
    const node = app.$cytosis.findOne(slug, store.state['Content'], ['Node:AbsolutePath'])

    // console.log('Node Router: node :: ', node)

    if(node && node.fields) {
        _this.node = node

      // special type of node that redirects to another page
      if(node.fields['Type'] && node.fields['Type'] == 'Node:Redirect' && node.fields['Data:String']) {
        window.location.replace(node.fields['Data:String'])
      }

      return {
        node: node,
      }
    } else {
      console.error('[Node Router] Node not found for slug:', slug)
      // put in a SENTRY thing here that catches all the weird routes
      // bots sometimes try to get to
      error({ statusCode: 404, message: "Page not Found" })
    }

  },

  mounted () {
    console.log('r-node mounted:', this.$route)
    this.$segmentize({
      segment: this.$segment,
      type: 'page',
      event: 'Router/Node',
      data: {
        path: this.$route.fullPath,
      },
      log: this.$route.path,
    })
  },

  methods: {
    // loading _content-nodes through middleware replaces this bit

    // getNode(slug) {
    //   const _this = this
    //   // console.log('Getting node ...')
    //   loadQuery({
    //     _key: process.env.airtable_api, 
    //     _base: process.env.airtable_base, 
    //     store: _this.$store, 
    //     routeName: '{index/getNode}', 
    //     query: 'Node-AbsolutePath',
    //     keyword: slug,
    //   }).then((node) => {
    //     console.log('Node gotten:', node.tables['Content'][0])

    //     if(node.tables['Content'][0])
    //       _this.node = node.tables['Content'][0]

    //     // special type of node that redirects to another page
    //     if(node.tables['Content'] && node.tables['Content'][0] && node.tables['Content'][0].fields['Type'] && node.tables['Content'][0].fields['Type'] == 'Node:Redirect' && node.tables['Content'][0].fields['Data:String']) {
    //       window.location.replace(node.tables['Content'][0].fields['Data:String'])
    //     }

    //     if(node && node.tables && node.tables['Content'] && node.tables['Content'].length == 0) {
    //       console.error('[Node Router] Node not found for slug:', slug)
    //       _this.$nuxt.error({ statusCode: 404, message: "Page not Found" })
    //     }

    //   })
    //   return undefined
    // },

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



