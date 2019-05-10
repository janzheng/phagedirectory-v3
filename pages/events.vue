<template>
  <div class="Events">
    <Template :template-classes="'_margin-center'">
      <template #container>

        <div class="_section-article _margin-center">
          <div class="_padding-bottom-2" v-html="$md.render(intro || '')" />

          <Tabbed 
            :left="leftData"
            :right="rightData"
            :active-tab="activeTab"
            v-on="{ 'tabClick': tabClick, 'One': oneHandler, 'Two Button': twoHandler }"
          >

            <template slot="Upcoming Events">
              <div class=" _padding-top">
                <Event v-for="item of upcoming" :key="item.id" :atom="item" />
              </div>
            </template>

            <template slot="Past Events">
              <div class=" _padding-top">
                <Event v-for="item of past" :key="item.id" :atom="item" />
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
import Event from '~/components/Event.vue'
import Tabbed from '~/components/layout/Tabbed.vue'
import Template from '~/templates/article.vue'

export default {

  components: {
    Event,
    Template,
    Tabbed,
  },

  layout: 'contentframe',
  middleware: 'pageload',
  meta: {
    tableQueries: ["_content", "atoms-events"],
    refreshOnLoad: true,
  },

  data () {
    return {
      activeTab: 'Upcoming Events',
      leftData: {
        'Upcoming Events': {
          // link: 'about',
          // attrs: '_pointer',
          // active: true,
        },
      },
      rightData: {
        'Past Events': {
          // attrs: '_pointer',
          // link: 'about',
        },
      },
      intro: this.$cytosis.find('Content.events-intro', {'Content': this.$store.state['Content']} )[0]['fields']['Markdown'],
      content: this.$cytosis.find('Content.events-content', {'Content': this.$store.state['Content']} )[0]['fields']['Markdown'],
      // jo: this.$cytosis.find('Content.footer-alerts', {'Content': this.$store.state['Content']} )[0]['fields']['Markdown'],
    }
  },
  
  computed: {
    ...mapState([
      'Atoms',
      ]),
    events() {
      return this.Atoms.filter(t => t.fields['Atom:Type'] == 'Event')
    },

    featured() {
      // events in the past, w/ newest first
      return this.events.filter(item => {
        return item.fields['Data:Date']
      }).reverse()
    },
    past() {
      // events in the past, w/ newest first
      return this.events.filter(item => {
        const date = item.fields['Data:Date']
        return !this.$dayjs().isBefore(this.$dayjs(String(date)))
      }).reverse()
    },
    upcoming() {
      // events in the future
      return this.events.filter(item => {
        const date = item.fields['Data:Date']
        return this.$dayjs().isBefore(this.$dayjs(String(date)))
      })
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
    // oneHandler(data) {
    //   // console.log('one handler', data)
    // },
    // twoHandler(data) {
    //   // console.log('two handler', data)
    // }
  },


}
</script>

<style>
</style>

