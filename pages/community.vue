<template>
  <div class="Community">
    <Template>

      <template #container>

        <div class="_section-article _margin-center">
          <div class="" v-html="$md.render(intro || '')" />
          <div class="_margin-bottom-2" v-html="$md.render(content || '')" />

          <Tabbed 
            :left="{
              'Active Posts':{},
              'Expired Posts':{},
            }"
            tab-attrs="_grid-2-1-sm Tabbed-mobile"
            :right="{'Post a Message':{}}"
            :active-tab="activeTab"
            v-on="{ 'tabClick': tabClick }"
          >

            <template slot="Active Posts">
              <div class="_padding-top">
                <div>
                  <p class="_font-small">Showing {{ currentCount }} community posts</p>
                </div>
                <CommunityPost v-for="item of current" :key="item.id" :atom="item" />
              </div>
            </template>

            <template slot="Expired Posts">
              <div class=" _padding-top">
                <!-- <Event v-for="item of expired" :key="item.id" :atom="item" /> -->
                <div>
                  <p class="_font-small">Showing {{ expiredCount }} community posts</p>
                </div>
                <CommunityPost v-for="item of expired" :key="item.id" :atom="item" />
              </div>
            </template>

            <template slot="Post a Message">
              <div class=" _padding-top">
                <NodeForm v-if="form" :src="form"/>
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

<!-- 
      <template #header>
        <div class="" v-html="$md.render(intro || '')" />
      </template>

      <CommunityPost v-for="item of community" :key="item.id" :atom="item" />

      <template #context>
        <div class="_margin-bottom" v-html="$md.render(content || '')" />
        <NodeForm :src="form"/>
      </template>
       -->
    </Template>

  </div>
</template>




<script>

import { mapState } from 'vuex'
import { loadQuery } from '~/other/loaders'
import NodeForm from '~/components/render/NodeForm.vue'
// import Template from '~/templates/context.vue'
import Template from '~/templates/article.vue'
import CommunityPost from '~/components/CommunityPost.vue'
import Tabbed from '~/components/layout/Tabbed.vue'

export default {

  components: {
    NodeForm,
    CommunityPost,
    Template,
    Tabbed,
  },

  layout: 'contentframe',
  middleware: 'pageload',
  meta: {
    tableQueries: ["_content-copy", "atoms-community"],
    refreshOnLoad: true,
  },

  data () {

    // load form in on client; faster load (async) but no SEO
    const _this = this
    loadQuery({
      _key: process.env.airtable_api, 
      _base: process.env.airtable_base, 
      store: this.$store, 
      routeName: 'community', 
      query: '_content-slug',
      keyword: 'form-community'
    }).then(data => {
      if(data.tables['Content'] && data.tables['Content'][0])
        _this.form = data.tables['Content'][0]
    })

    return {
      activeTab: 'Active Posts',
      intro: this.$cytosis.findField('community-intro', this.$store.state['Content'], 'Markdown' ),
      content: this.$cytosis.findField('community-content', this.$store.state['Content'], 'Markdown' ),
      // form: form ? form[0] : undefined,
      form: null
    }
  },


  // load forms in on server; will slow server down, but better SEO
  // async asyncData({env, store}) {
  //   const data = await loadQuery({
  //     _key: env.airtable_api, 
  //     _base: env.airtable_base, 
  //     store, 
  //     routeName: 'community', 
  //     query: '_content-slug',
  //     keyword: 'form-community'
  //   })

  //   let form
  //   if(data.tables['Content'] && data.tables['Content'][0])
  //     form = form

  //   return {
  //     form,
  //   }
  // },
  
  computed: {
    ...mapState([
      'Atoms',
      ]),
    community() {
      return this.Atoms.filter(t => t.fields['Atom:Type'] == 'Community')
    },
    expired() {
      // jobs in the past, w/ newest first
      return this.community.filter(t => {return t.fields['Data:Status'] == 'Expired'})
    },
    current() {
      // jobs in the future
      return this.community.filter(t => {return t.fields['Data:Status'] !== 'Expired'})
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

  watch: {
    $route () {
      this.$sys.log('route changed', this.$route)
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

