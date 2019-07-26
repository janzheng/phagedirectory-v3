<template>
  <div class="Alerts">
    <Template>
      <template #container>
        <div class="_section-article _margin-center">
          <div class="" v-html="$md.render(intro || '')" />
          <div class="_margin-bottom" v-html="$md.render(content || '')" />
          <!-- <div class="Alerts-form FormCard --simple" v-html="$md.render(alertSignup || '')" /> -->
          <AlertSignup class="_margin-bottom-2" />
          
          <Tabbed 
            :left="{'Active':{}}"
            :right="{'Resolved':{}}"
            :active-tab="activeTab"
            v-on="{ 'tabClick': tabClick }"
          >

            <template slot="Active">
              <div class=" _padding-top">
                <Alert v-for="item of active" :key="item.id" :atom="item" />
              </div>
            </template>

            <template slot="Resolved">
              <div class=" _padding-top">
                <Alert v-for="item of resolved" :key="item.id" :atom="item" />
              </div>
            </template>
          </Tabbed>

        </div>
      </template>
    </Template>

  </div>
</template>




<script>

import { mapState } from 'vuex'
import Alert from '~/components/Alert.vue'
import AlertSignup from '~/components/layout/FooterSignups-alerts.vue'
import Template from '~/templates/article.vue'
import Tabbed from '~/components/layout/Tabbed.vue'

export default {

  components: {
    Alert,
    AlertSignup,
    Template,
    Tabbed,
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
    tabClick(item, key) {
      this.activeTab = key
    },
  },


}
</script>

<style>
</style>

