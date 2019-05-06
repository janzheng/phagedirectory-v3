<template>
  
  <Article>
    <template #header>
      <h1>This is the header :P ;)</h1>
    </template>

    <h3>Cytosis Component</h3>

    <!-- <Cytosis 
      :tableQueries = "['_content', 'atoms-alerts']"
      :refreshOnLoad = "true"
    /> -->


  </Article>
</template>




<script>

import { mapState } from 'vuex'
// import FormContact from '~/forms/FormContact.vue'
// import Form from '~/templates/node-form.vue'
import Article from '~/templates/article.vue'
// import Cytosis from '~/components/experiments/Cytosis.vue'

export default {

  components: {
    // Form,
    Article,
    // Cytosis,
  },

  layout: 'contentframe',
  middleware: 'pageload',
  meta: {
    tableQueries: ["_content"],
  },

  data () {
    return {

    }
  },
  
  computed: {
  },

  // runs on generation and page route (but not on first page load)
  async asyncData({env}) {

    return {
      postUrl: env.ext_handler,
    }
  },

  mounted () {
  },

  methods: {
  },


}
</script>

<style>
</style>

