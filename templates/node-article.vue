<template>
  <div class="Node-Article">

    <Article>
      <template>
        <div class="" v-html="$md.render(node.fields['Markdown'] || '')" />

        <!-- Linked Contents  -->
        <div v-for="item of contents" :key="item.id">
          <div v-if="item.fields['Render:Template'] == 'Form'" >
            <Form :src="item"/>
          </div>
          <div v-else class="" v-html="$md.render(item.fields['Markdown'] || '')" />
        </div>
        
      </template>
    </Article>

  </div>
</template>




<script>
  
import Article from '~/templates/article.vue'
import Form from '~/templates/node-form.vue'
import { mapState } from 'vuex'

export default {

  components: {
    Form,
    Article,
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

