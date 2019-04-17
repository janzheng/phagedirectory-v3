<template>
  <div class="Alerts _section-page">

    <div class="_section-content _margin-center" v-html="$md.render(intro || '')" />
    <div class="_section-content _margin-center _grid-1-3 _grid-gap-large">
      <div>
        <div class="_margin-bottom" v-html="$md.render(content || '')" />
        <div class="Alerts-form FormCard --simple" v-html="$md.render(alerts || '')" />
      </div>
      <div>
        <Alert v-for="item of Atoms" :key="item.id" :atom="item" />
      </div>

    </div>

  </div>
</template>




<script>

import { mapState } from 'vuex'
// import FormContact from '~/forms/FormContact.vue'
import Form from '~/templates/t-form.vue'
import Alert from '~/components/alert.vue'

export default {

  components: {
    Form,
    Alert,
  },

  layout: 'contentframe',
  middleware: 'pageload',
  meta: {
    tableQueries: ["_content", "atoms-alerts"]
  },

  // runs on generation and page route (but not on first page load)
  async asyncData({env}) {

    return {
      postUrl: env.ext_handler,
    }
  },

  data () {
    return {
      intro: this.$cytosis.find('Content.alerts-intro', {'Content': this.$store.state['Content']} )[0]['fields']['Markdown'],
      content: this.$cytosis.find('Content.alerts-content', {'Content': this.$store.state['Content']} )[0]['fields']['Markdown'],
      alerts: this.$cytosis.find('Content.footer-alerts', {'Content': this.$store.state['Content']} )[0]['fields']['Markdown'],
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

