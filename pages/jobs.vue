<template>
  <div class="Jobs">
    <Template>

      <template #container>

        <div class="_section-article _margin-center">
          <div class="" v-html="$md.render(intro || '')" />
          <div class="_margin-bottom" v-html="$md.render(content || '')" />

          <!-- {{ current }} -->
          <Tabbed 
            :left="{
              'Current Jobs':{},
              'Expired Jobs':{}
            }"
            :right="{}"
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
                <Job v-for="item of expired" :key="item.id" :atom="item" />
              </div>
            </template>
          </Tabbed>

          <!-- 
          <div>
            <h6>Upcoming Events</h6>
            <Event v-for="item of upcoming" :key="item.id" :atom="item" />
          </div>

          <div class="_padding-top-2">
            <h6>Past Events</h6>
            <Event v-for="item of past" :key="item.id" :atom="item" />
          </div> -->
        </div>

      </template>
      
    </Template>

  </div>
</template>




<script>

import { mapState } from 'vuex'
import Job from '~/components/Job.vue'
// import Template from '~/templates/context.vue'
import Template from '~/templates/article.vue'
import Tabbed from '~/components/layout/Tabbed.vue'

export default {

  components: {
    Job,
    Template,
    Tabbed,
  },

  layout: 'contentframe',
  middleware: 'pageload',
  meta: {
    tableQueries: ["_content", "atoms-jobs"],
    refreshOnLoad: true,
  },

  data () {
    return {
      activeTab: "Current Jobs",
      intro: this.$cytosis.find('Content.jobs-intro', {'Content': this.$store.state['Content']} )[0]['fields']['Markdown'],
      content: this.$cytosis.find('Content.jobs-content', {'Content': this.$store.state['Content']} )[0]['fields']['Markdown'],
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
      return this.jobs.filter(t => {return t.fields['Data:Status'] == 'Expired'})
    },
    current() {
      // jobs in the future
      return this.jobs.filter(t => {return t.fields['Data:Status'] !== 'Expired'})
    },
    currentCount() {
      return this.current.length
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
      // console.log('default tabclick', item, key)
      this.activeTab = key
    },
  },


}
</script>

<style>
</style>

