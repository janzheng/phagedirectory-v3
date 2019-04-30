<template>
  <div class="Jobs Template-1-2 _section-page">

    <div class="_section-content _margin-center" v-html="$md.render(intro || '')" />
    <div class="_section-content _margin-center _grid-1-3 _grid-gap-large">
      <div class="Template-sidebar">
        <div class="_margin-bottom" v-html="$md.render(content || '')" />
      </div>
      <div>
        <Job v-for="item of Atoms" :key="item.id" :atom="item" />
      </div>

    </div>

  </div>
</template>




<script>

import { mapState } from 'vuex'
// import FormContact from '~/forms/FormContact.vue'
import Form from '~/pages/templates/node-form.vue'
import Job from '~/components/Job.vue'

export default {

  components: {
    Form,
    Job,
  },

  layout: 'contentframe',
  middleware: 'pageload',
  meta: {
    tableQueries: ["_content", "atoms-jobs"],
    refreshOnLoad: true,
  },

  // runs on generation and page route (but not on first page load)
  async asyncData({env}) {

    return {
      postUrl: env.ext_handler,
    }
  },

  data () {
    return {
      intro: this.$cytosis.find('Content.jobs-intro', {'Content': this.$store.state['Content']} )[0]['fields']['Markdown'],
      content: this.$cytosis.find('Content.jobs-content', {'Content': this.$store.state['Content']} )[0]['fields']['Markdown'],
      // jo: this.$cytosis.find('Content.footer-alerts', {'Content': this.$store.state['Content']} )[0]['fields']['Markdown'],
    }
  },
  
  computed: {
    ...mapState([
      'Atoms',
      ]),
  },

  mounted () {
  },

  methods: {
  },


}
</script>

<style>
</style>

