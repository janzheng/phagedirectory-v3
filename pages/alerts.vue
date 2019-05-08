<template>
  <div class="Alerts">
    <Template>
      <template>
        <div class="" v-html="$md.render(intro || '')" />
        <div class="_margin-bottom" v-html="$md.render(content || '')" />
        <div class="Alerts-form FormCard --simple" v-html="$md.render(alertSignup || '')" />
        <Alert v-for="item of alerts" :key="item.id" :atom="item" />
      </template>
    </Template>

  </div>
</template>




<script>

import { mapState } from 'vuex'
import Alert from '~/components/alert.vue'
import Template from '~/templates/article.vue'

export default {

  components: {
    Alert,
    Template,
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

