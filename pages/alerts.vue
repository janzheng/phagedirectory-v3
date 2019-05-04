<template>
  <div class="Alerts _section-page _padding-top-3 _padding-bottom-2 _margin-center">

    <div class="_section-content _margin-center">
      <div class="_section-article" v-html="$md.render(intro || '')" />
      <div class="_section-article">
        <div class="_padding-bottom-3">
          <div class="_margin-bottom" v-html="$md.render(content || '')" />
          <div class="Alerts-form FormCard --simple" v-html="$md.render(alertSignup || '')" />
        </div>
      </div>

      <div class="_section-article ">
        <Alert v-for="item of alerts" :key="item.id" :atom="item" />
      </div>
    </div>

  </div>
</template>




<script>

import { mapState } from 'vuex'
// import FormContact from '~/forms/FormContact.vue'
// import Form from '~/templates/node-form.vue'
import Alert from '~/components/Alert.vue'

export default {

  components: {
    // Form,
    Alert,
  },

  layout: 'contentframe',
  middleware: 'pageload',
  meta: {
    tableQueries: ["_content", "atoms-alerts"],
    refreshOnLoad: true,
  },

  data () {
    return {
      intro: this.$cytosis.find('Content.alerts-intro', {'Content': this.$store.state['Content']} )[0]['fields']['Markdown'],
      content: this.$cytosis.find('Content.alerts-content', {'Content': this.$store.state['Content']} )[0]['fields']['Markdown'],
      alertSignup: this.$cytosis.find('Content.footer-alerts', {'Content': this.$store.state['Content']} )[0]['fields']['Markdown'],
    }
  },
  
  computed: {
    ...mapState([
      'Atoms',
      ]),
    alerts() {
      return this.Atoms.filter(t => t.fields['Atom:Type'] == 'Alert')
    }
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

