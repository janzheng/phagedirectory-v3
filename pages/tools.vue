<template>
  <div class="Community">
    <Template>

      <template #container>

        <div class="_section-article _margin-center">
          <div class="" v-html="$md.render(intro || '')" />
          <!-- <div class="_margin-bottom-2" v-html="$md.render(content || '')" /> -->

          <Tabbed 
            :left="{
              'Phage Tools':{},
            }"
            tab-attrs="_grid-2-1-sm Tabbed-mobile"
            :right="{'Suggest a Tool':{}}"
            :active-tab="activeTab"
            v-on="{ 'tabClick': tabClick }"
          >

            <template slot="Phage Tools">
              <div class="_padding-top">
                <div>
                  <p class="_font-small">Showing {{ tools.length }} tools</p>
                </div>

                <div class="Tools-list">
                  <div v-for="item of tools" :key="item.id" class="Tools-item _card _padding">
                    <h5 class="Tools-name">{{ item.fields['Name'] }}</h5>
                    <div v-if="item.fields['Data:Subtitle']" class="Tools-subtitle">{{ item.fields['Data:Subtitle'] }}</div>
                    <div class="_margin-top">
                      <div v-if="item.fields['URL']" class="Tools-url">URL: <a :href="item.fields['URL']" target="_blank">{{ item.fields['URL'] }}</a></div>
                      <div v-if="item.fields['Data:Content']" class="Tools-creator">Organization: {{ item.fields['Data:Content'] }}</div>
                      <div v-if="item.fields['Markdown']" class="Tools-creator _margin-top" >
                        <div>Description:</div>
                        <div v-html="$md.render( item.fields['Markdown'] ||'')" />
                      </div>
                      <div class="Tools-tags _margin-bottom-half">
                        <span v-for="tag of item.fields['Data:Tags']" :key="tag" class="_tag">{{ tag }}</span>
                      </div> 
                    </div>
                  </div>
                </div>

              </div>
            </template>

            <template slot="Suggest a Tool">
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

    </Template>

  </div>
</template>




<script>

import { mapState } from 'vuex'
import { loadQuery } from '~/other/loaders'
import NodeForm from '~/components/render/NodeForm.vue'
// import Template from '~/templates/context.vue'
import Template from '~/templates/article.vue'
import Tabbed from '~/components/layout/Tabbed.vue'

export default {

  components: {
    NodeForm,
    Template,
    Tabbed,
  },

  layout: 'contentframe',
  middleware: 'pageload',
  meta: {
    tableQueries: ["_content-copy", "atoms-tools"],
    refreshOnLoad: true,
  },

  data () {

    const _this = this
    loadQuery({
      _key: process.env.airtable_api, 
      _base: process.env.airtable_base, 
      store: this.$store, 
      routeName: '{tools}', 
      query: '_content-slug',
      keyword: 'form-tools'
    }).then(data => {
      if(data.tables['Content'] && data.tables['Content'][0])
        _this.form = data.tables['Content'][0]
    })

    return {
      activeTab: 'Phage Tools',
      intro: this.$cytosis.findField('tools-intro', this.$store.state['Content'], 'Markdown' ),
      // content: this.$cytosis.findField('community-content', this.$store.state['Content'], 'Markdown' ),
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
  //     routeName: '{community}', 
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
    tools() {
      return this.Atoms.filter(t => t.fields['Atom:Type'] == 'Tool')
    },

  },

  watch: {
    $route () {
      this.$sys.log('route changed', this.$route)
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

