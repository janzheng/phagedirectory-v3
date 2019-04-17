<template>
  <div class="Template-Documentation">
    <!-- 
    <div class="_section-page">
      <h6>[ t-router ] </h6>
      <div class="_card _padding">Node: {{ node }}</div>
      <div class="_card _padding">Source: {{ source }}</div>
    </div> -->

    <!-- template selection -->
    <TemplateArticle :node="node" :route="route" v-if="node.fields['Render:Template'] == 'Article'" />

    <TemplateBasic :node="node" :route="route" v-if="node.fields['Render:Template'] == 'Basic'" />

    <!-- <TemplateDocs :node="node" :route="route" /> -->
    <TemplateDocs :node="node" :route="route" v-if="node.fields['Render:Template'] == 'Documentation'" />

  </div>
</template>




<script>
  
import { mapState } from 'vuex'
import { loadQuery } from '~/other/loaders'

import TemplateArticle from '~/templates/t-article'
import TemplateBasic from '~/templates/t-basic'
import TemplateDocs from '~/templates/t-documentation'


export default {

  components: {
    TemplateArticle,
    TemplateBasic,
    TemplateDocs,
  },

  layout: 'contentframe',
  middleware: 'pageload',
  meta: {
    tableQueries: ["_content"]
  },

  // runs on generation and page route (but not on first page load)
  async asyncData({env, store, route}) {
    const slug = '/' + unescape(route.params.slug)
    const node = await loadQuery(env, store, 'template:documentation', 'Node-AbsolutePath', slug)
    console.log('matched node: ', node, ' @ ', slug)

    return {
      slug,
      route,
      node: node.tables['Content'][0],
    }
  },

  data () {

    return {
    }
  },
  
  computed: {
    ...mapState([
      'Content'
      ]),

    contents() {
      let contents = this.$cytosis.getLinkedRecords(this.node.fields['Node:Contents'], this.Content , true )
      return contents.reverse()
    },

    nodeSource() {
      if(this.node && this.node.fields['Node:Source']) {
        let source = this.$cytosis.getLinkedRecords(this.node.fields['Node:Source'], this.Content , true )
        return source.reverse()[0]
      }
    },

    source() {
      // source is either the node's source, or itself!
      return this.nodeSource || this.node
    },

    children() {
      if(this.node.fields['Node:Children']) {
        let children = this.$cytosis.getLinkedRecords(this.node.fields['Node:Children'], this.Content , true )
        // airtable always returns lists in reverse order
        return children.reverse()
      }
    },

    sourceChildren() {
      if(this.source) {
        let children = this.$cytosis.getLinkedRecords(this.source.fields['Node:Children'], this.Content , true )
        // airtable always returns lists in reverse order
        return children.reverse()
      }
    },

    sidebar() {
      // check linked content if sidebar is warranted
      if(this.source)
        return true
    }
  },

  beforeCreate () {
  },
  mounted () {
  },
  beforeDestroy() {
  },

  methods: {
    pathMatch(path) {
      console.log('pathMatch',this.route.path)
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

