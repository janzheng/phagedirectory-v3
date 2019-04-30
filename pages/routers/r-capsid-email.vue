
<!--  

  Router for Capsid & Tail issues
  // basis for other manuscript routers

-->

<template>
  <div class="Router-Capsid-Email">

    <!-- the route should match against a slug and only the first matched slug should be relevant -->
    <CapsidTemplate :issue="Manuscripts[0]" :atoms="atoms" :route="route" />


  </div>
</template>




<script>
  
import { mapState } from 'vuex'
import { loadQuery } from '~/other/loaders'

import CapsidTemplate from '~/pages/templates/node-capsid-email'


export default {

  components: {
    CapsidTemplate,
  },

  // layout: 'contentframe',
  middleware: 'pageload',
  meta: {
    tableQueries: ["_content"]
  },

  // runs on generation and page route (but not on first page load)
  async asyncData({env, store, route}) {
    const slug = unescape(route.params.slug)
    // const node = await loadQuery(env, store, '{capsid router}', 'Node-AbsolutePath', slug)
    // console.log('matched node: ', node, ' @ ', slug)

    const manuscript = await loadQuery(env, store, '{capsid router}', 'capsid-single', slug)
    // console.log('matched manuscript: ', manuscript, ' @ ', slug)

    // fetches the relevant atoms into the store
    const atoms = await loadQuery(env, store, '{capsid router}', 'capsid-atoms', manuscript.tables.Manuscripts[0].fields['Name'])
    console.log('matched atoms: ', atoms, ' @ ', manuscript.tables.Manuscripts[0].fields['Name'])

    return {
      slug,
      route,
      manuscript: manuscript.tables.Manuscripts[0],
      atoms: atoms.tables.Atoms,
    }
  },

  data () {

    return {
    }
  },
  
  computed: {
    ...mapState([
      'Content',
      'Manuscripts',
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
    },
  },


}
</script>

<style>
</style>

