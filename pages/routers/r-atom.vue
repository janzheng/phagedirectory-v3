
<!-- 

  Router for handling atom pages

 -->

<template>
  <div class="Template-Atom">

    <Article>
      <template>
        <div class="Atom-content _card _padding">
          <div class="_margin-bottom"><span class="_tag">{{ atom.fields['Atom:Type'] }}</span></div>
          <div class="Atom-content" 
               v-html="$md.render(atom.fields['Data:Content'] || '')" />
        </div>
      </template>
    </Article>

  </div>
</template>




<script>
  
import { mapState } from 'vuex'
import { loadQuery } from '~/other/loaders'

import Article from '~/templates/article.vue'


export default {

  components: {
    Article
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
    ...mapState([
      'Content'
      ]),

    contents() {
      let contents = this.$cytosis.getLinkedRecords(this.node.fields['Node:Contents'], this.Content , true )
      return contents.reverse()
    },
  },

  // runs on generation and page route (but not on first page load)
  async asyncData({env, store, route}) {
    const slug = unescape(route.params.slug)
    const atom = await loadQuery({env, store, routeName: '{atom router}', query: 'atoms-slug', keyword: slug})

    return {
      slug,
      route,
      atom: atom.tables['Atoms'][0],
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
      // console.log('pathMatch',this.route.path)
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

