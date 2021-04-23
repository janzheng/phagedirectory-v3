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
// import { loadQuery } from '~/other/loaders'
import Alert from '../components/Alert.vue'
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
    tableQueries: ["_content-copy", "atoms-alerts"],
    refreshOnLoad: true,
  },

  data () {
    return {
      activeTab: 'Active',

      intro: this.$cytosis.findField('alerts-intro', this.$store.state['Content'], 'Markdown' ),
      content: this.$cytosis.findField('alerts-content', this.$store.state['Content'], 'Markdown' ),
      alertSignup: this.$cytosis.findField('footer-alertsintro', this.$store.state['Content'], 'Markdown' ),
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

  mounted () {
    if(this.$segmentize) {
      this.$segmentize({
        segment: this.$segment,
        type: 'page',
        event: 'Alerts',
        data: {
          path: this.$route.path,
        }
      })
    }
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

