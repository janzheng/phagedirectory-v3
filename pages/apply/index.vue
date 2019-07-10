<template>
  <div class="Join">
    <Template>
      <template #container>
        <div class="_section-article" v-html="$md.render(intro || '')" />

        <div class="_section-article _grid-2">
          <!-- <nuxt-link to="/apply/research" class="Join-research _card --button --nolink _padding _margin-none">
            <div class="_flex-col _height-100" v-html="$md.render(research || '')" />
          </nuxt-link> -->
          <a href="https://airtable.com/shrbZHMw6R2dCij9v" target="_blank" class="Join-research _card --button --nolink _padding _margin-none">
            <div class="_flex-col _height-100" v-html="$md.render(research || '')" />
          </a>

          <!-- <nuxt-link to="/apply/medical" class="Join-medical _card --button --nolink _padding _margin-none">
            <div class="_flex-col _height-100" v-html="$md.render(medical || '')" />
          </nuxt-link> -->
          <a href="https://airtable.com/shrdIUxOsr411hNwR" target="_blank" class="Join-research _card --button --nolink _padding _margin-none">
            <div class="_flex-col _height-100" v-html="$md.render(medical || '')" />
          </a>
          
          <!-- <nuxt-link to="/apply/orgs" class="Join-organization _card --button --nolink _padding _margin-none">
            <div class="_flex-col _height-100" v-html="$md.render(organization || '')" />
          </nuxt-link> -->
          <a href="https://airtable.com/shrYdNUwSLMKUvRhz" target="_blank" class="Join-research _card --button --nolink _padding _margin-none">
            <div class="_flex-col _height-100" v-html="$md.render(organization || '')" />
          </a>
          
          
          <!-- <nuxt-link to="/apply/banks" class="Join-banks _card --button --nolink _padding _margin-none">
            <div class="_flex-col _height-100" v-html="$md.render(banks || '')" />
          </nuxt-link> -->
          <a href="https://airtable.com/shrPtmSf5dxdeBnoy" target="_blank" class="Join-research _card --button --nolink _padding _margin-none">
            <div class="_flex-col _height-100" v-html="$md.render(banks || '')" />
          </a>

          

        </div>

        <div class="_section-article ">
          <div class="Join-other _card --button _padding _margin-top">
            <div class="" v-html="$md.render(other || '')" />
          </div>
        </div>

      </template>
    </Template>

  </div>
</template>




<script>

import { mapState } from 'vuex'
import Template from '~/templates/article.vue'
// import Alert from '~/components/alert.vue'
// import AlertSignup from '~/components/layout/FooterSignups-alerts.vue'
// import Tabbed from '~/components/layout/Tabbed.vue'

export default {

  components: {
    Template,
    // Alert,
    // AlertSignup,
    // Tabbed,
  },

  layout: 'contentframe',
  middleware: 'pageload',
  meta: {
    tableQueries: ["_content", "atoms-alerts"],
    refreshOnLoad: true,
  },

  data () {
    return {
      activeTab: 'Active',
      intro: this.$cytosis.findOne('join-intro', this.$store.state['Content'] ).fields['Markdown'],
      research: this.$cytosis.findOne('join-researcher', this.$store.state['Content'] ).fields['Markdown'],
      organization: this.$cytosis.findOne('join-organization', this.$store.state['Content'] ).fields['Markdown'],
      banks: this.$cytosis.findOne('join-banks', this.$store.state['Content'] ).fields['Markdown'],
      medical: this.$cytosis.findOne('join-medical', this.$store.state['Content'] ).fields['Markdown'],
      other: this.$cytosis.findOne('join-other', this.$store.state['Content'] ).fields['Markdown'],
      // content: this.$cytosis.find('Content.alerts-content', {'Content': this.$store.state['Content']} )[0]['fields']['Markdown'],
      // alertSignup: this.$cytosis.find('Content.footer-alerts', {'Content': this.$store.state['Content']} )[0]['fields']['Markdown'],
    }
  },
  
  computed: {
    ...mapState([
      'Atoms',
      ]),
    alerts() {
      return this.Atoms.filter(t => t.fields['Atom:Type'] == 'Alert')
    },
    active() {
      return this.alerts.filter(t => {return t.fields['Data:Status'] !== 'Resolved'})
    },
    resolved() {
      return this.alerts.filter(t => t.fields['Data:Status'] === 'Resolved')
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

