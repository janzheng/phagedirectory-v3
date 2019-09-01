<template>
  <div class="Community">
    <Template>

      <template #container>

        <div class="_section-article _margin-center">
          <div class="" v-html="$md.render(intro || '')" />
          <!-- <div class="_margin-bottom-2" v-html="$md.render(content || '')" /> -->

          <Tabbed 
            :left="{
              'Phage Groups':{},
            }"
            tab-attrs="_grid-2-1-sm Tabbed-mobile"
            :right="{'Suggest a Group':{}}"
            :active-tab="activeTab"
            v-on="{ 'tabClick': tabClick }"
          >

            <template slot="Phage Groups">
              <div class="_padding-top">
                <div>
                  <p class="_font-small">Showing {{ groups.length }} phage groups</p>
                </div>

                <div class="Groups-list">
                  <div v-for="item of groups" :key="item.id" class="Groups-item _card _padding">
                    <h5 class="Groups-name">{{ item.fields['Name'] }}</h5>
                    <div v-if="item.fields['Data:Subtitle']" class="Groups-subtitle">{{ item.fields['Data:Subtitle'] }}</div>
                    <div class="_margin-top">
                      <div v-if="item.fields['URL']" class="Groups-url">URL: <a :href="item.fields['URL']" target="_blank">{{ item.fields['URL'] }}</a></div>
                      <div v-if="item.fields['Data:Content']" class="Groups-creator">Organization: {{ item.fields['Data:Content'] }}</div>
                      <div v-if="item.fields['Markdown']" class="Groups-creator _margin-top" >
                        <div>Description:</div>
                        <div v-html="$md.render( item.fields['Markdown'] ||'')" />
                      </div>
                      <div class="Groups-tags _margin-bottom-half">
                        <span v-for="tag of item.fields['Data:Tags']" :key="tag" class="_tag">{{ tag }}</span>
                      </div> 
                    </div>
                  </div>
                </div>

              </div>
            </template>

            <template slot="Suggest a Group">
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
    tableQueries: ["_content-copy", "atoms-groups"],
    refreshOnLoad: true,
  },

  data () {

    const _this = this
    loadQuery({
      _key: process.env.airtable_api, 
      _base: process.env.airtable_base, 
      store: this.$store, 
      routeName: 'groups-form', 
      query: '_content-slug',
      keyword: 'form-groups'
    }).then(data => {
      if(data.tables['Content'] && data.tables['Content'][0])
        _this.form = data.tables['Content'][0]
    })

    return {
      activeTab: 'Suggest a Group',
      intro: this.$cytosis.findField('groups-intro', this.$store.state['Content'], 'Markdown' ),
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
    groups() {
      return this.Atoms.filter(t => t.fields['Atom:Type'] == 'Group')
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

