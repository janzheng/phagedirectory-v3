<template>
  <div class="Jobs">
    <Template>

      <template #container>

        <div class="_section-article _margin-center">
          <div class="" v-html="$md.render(intro || '')" />
          <div class="_margin-bottom-2" v-html="$md.render(content || '')" />

          <!-- {{ current }} -->
          <Tabbed 
            :left="{
              'Current Jobs':{},
              'Expired Jobs':{}
            }"
            :right="{
              'Post a Job':{}
            }"
            :active-tab="activeTab"
            v-on="{ 'tabClick': tabClick }"
          >

            <template slot="Current Jobs">
              <div class="_padding-top">
                <div>
                  <p class="_font-small">Showing {{ currentCount }} jobs</p>
                </div>
                <Job v-for="item of current" :key="item.id" :atom="item" />
              </div>
            </template>

            <template slot="Expired Jobs">
              <div class=" _padding-top">
                <!-- <Event v-for="item of expired" :key="item.id" :atom="item" /> -->
                <div>
                  <p class="_font-small">Showing {{ expiredCount }} jobs</p>
                </div>
                <Job v-for="item of expired" :key="item.id" :atom="item" />
              </div>
            </template>

            <template slot="Post a Job">
              <div class=" _padding-top">
                <NodeForm v-if="form" :src="form"/>
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
import { loadQuery } from '~/other/loaders'
import Job from '~/components/Job.vue'
// import Template from '~/templates/context.vue'
import Template from '~/templates/article.vue'
import Tabbed from '~/components/layout/Tabbed.vue'
import NodeForm from '~/components/render/NodeForm.vue'

export default {

  components: {
    Job,
    Template,
    Tabbed,
    NodeForm,
  },

  layout: 'contentframe',
  middleware: 'pageload',
  meta: {
    tableQueries: ["_content-copy", "atoms-jobs"],
    refreshOnLoad: true,
  },

  data () {

    // load form in on client; faster load (async) but no SEO
    const _this = this
    loadQuery({
      _key: process.env.airtable_api, 
      _base: process.env.airtable_base, 
      store: this.$store, 
      routeName: '{jobs}', 
      query: '_content-slug',
      keyword: 'form-jobs'
    }).then(data => {
      if(data.tables['Content'] && data.tables['Content'][0])
        _this.form = data.tables['Content'][0]
    })

    return {
      activeTab: "Current Jobs",

      intro: this.$cytosis.findField('jobs-intro', this.$store.state['Content'], 'Markdown' ),
      content: this.$cytosis.findField('jobs-content', this.$store.state['Content'], 'Markdown' ),
      form: null
    }
  },
  
  computed: {
    ...mapState([
      'Atoms',
      ]),
    jobs() {
      return this.Atoms.filter(t => t.fields['Atom:Type'] == 'Job')
    },
    expired() {
      // jobs in the past, w/ newest first
      return this.jobs.filter(t => t.fields['Data:Status'] == 'Expired')
    },
    current() {
      // jobs in the future
      return this.jobs.filter(t => t.fields['Data:Status'] !== 'Expired')
    },
    currentCount() {
      return this.current.length
    },
    expiredCount() {
      return this.expired.length
    }
  },

  mounted () {
    // if(this.$router.currentRoute.hash) {
    if(this.$router.currentRoute.query && this.$router.currentRoute.query.tab) {
      // const tab = this.$router.currentRoute.hash.substring(1).replace(/[-]/g, ' ') // replace all '-' in the slugified hash with spaces
      // use query instead
      this.activeTab = this.$router.currentRoute.query.tab.replace(/[-]/g, ' ')
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

