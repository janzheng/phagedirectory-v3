<template>
  <div class="Template-Article _padding-top-3 _padding-bottom-2 _section-page ">

    <div class="_margin-bottom _section-content _margin-center">
      <div class="_section-article _margin-center">

        <slot name="intro" />

        <!-- Native Contents -->
        <div class="" v-html="$md.render(node.fields['Markdown'] || '')" />

        <slot />

        <!-- Linked Contents  -->
        <div v-for="item of contents" :key="item.id">
          <div v-if="item.fields['Render:Template'] == 'Form'" >
            <Form :src="item"/>
          </div>
          <div v-else class="" v-html="$md.render(item.fields['Markdown'] || '')" />
        </div>

        <slot name="footer" />

      </div>
    </div>

  </div>
</template>




<script>
  
import Form from '~/pages/templates/t-form.vue'
import { mapState } from 'vuex'

export default {

  components: {
    Form,
  },

  props: {
    'node': Object,
    'route': Object,
  },

  layout: 'contentframe',
  middleware: 'pageload',
  meta: {
    tableQueries: ["_content"]
  },

  // runs on generation and page route (but not on first page load)
  // async asyncData({env, store, route}) {
  // },

  data () {
    this.$store.dispatch("updateCreate", {
      pageName: this.node.fields['Node:Name']
    })

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

