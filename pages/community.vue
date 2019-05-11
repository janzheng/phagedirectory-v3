<template>
  <div class="Community">
    <Template>

      <template #container>

        <div class="_section-article _margin-center">
          <div class="" v-html="$md.render(intro || '')" />
          <div class="_margin-bottom" v-html="$md.render(content || '')" />

          <Tabbed 
            :left="{
              'Active Posts':{},
              'Expired Posts':{},
            }"
            tab-attrs="_grid-2-1-sm Tabbed-mobile"
            :right="{'Create a New Post':{}}"
            :active-tab="activeTab"
            v-on="{ 'tabClick': tabClick }"
          >

            <template slot="Active Posts">
              <div class="_padding-top">
                <CommunityPost v-for="item of current" :key="item.id" :atom="item" />
              </div>
            </template>

            <template slot="Expired Posts">
              <div class=" _padding-top">
                <!-- <Event v-for="item of expired" :key="item.id" :atom="item" /> -->
                <CommunityPost v-for="item of expired" :key="item.id" :atom="item" />
              </div>
            </template>

            <template slot="Create a New Post">
              <div class=" _padding-top">
                <NodeForm :src="form"/>
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
    tableQueries: ["_content", "atoms-community"],
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
      activeTab: 'Active Posts',
      intro: this.$cytosis.find('Content.community-intro', {'Content': this.$store.state['Content']} )[0]['fields']['Markdown'],
      content: this.$cytosis.find('Content.community-content', {'Content': this.$store.state['Content']} )[0]['fields']['Markdown'],
      form: this.$cytosis.find('Content.form-community', {'Content': this.$store.state['Content']} )[0],
    }
  },
  
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
  },

  mounted () {
    const tab = this.$router.currentRoute.hash.substring(1).replace(/[-]/g, ' ') // replace all '-' in the slugified hash with spaces
    this.activeTab = tab
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

