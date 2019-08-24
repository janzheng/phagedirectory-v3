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
            v-on="{ 'tabClick': tabClick }"
          >

            <template slot="Upcoming Events">
              <div class="_padding-top">
                <div id="map-wrap" class="Leaflet _hidden-xs _margin-bottom" style="height: 50vh">
                  <!-- <no-ssr> ssr breaks inside the template lol.. -->
                  <l-map :zoom="1" :center="[47.413220, -1.219482]" class="Leaflet-map" >
                    <l-tile-layer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
                                  attribution="Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a>" 
                    />
                    <l-marker v-for="item of upcoming" 
                              :key="item.id" 
                              :lat-lng="item.fields['Meta:LatLng'][0].split(',')" 
                              class="Leaflet-marker"
                    >
                      <l-tooltip class="Leaflet-tooltip">
                        {{ item.fields['Name'] }}
                        <div class="_font-small"> 
                          <span>{{ item.fields['Data:Date'] | niceDate }}</span>
                          <span v-if="item.fields['Data:DateEnd']" > – {{ item.fields['Data:DateEnd'] | niceDate }}</span>
                        </div>
                      </l-tooltip>
                    </l-marker>
                    <l-tile-layer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />
                  </l-map>
                  <!-- </no-ssr> -->
                </div>

                <Event v-for="item of upcoming" :key="item.id" :atom="item" />
              </div>
            </template>

            <template slot="Past Events">
              <div class=" _padding-top">
                <Event v-for="item of past" :key="item.id" :atom="item" />
              </div>
            </template>

            <template slot="Add an Event">
              <div class=" _padding-top">
                <NodeForm :src="form"/>
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
import Event from '~/components/Event.vue'
import Tabbed from '~/components/layout/Tabbed.vue'
import NodeForm from '~/components/render/NodeForm.vue'
import Template from '~/templates/article.vue'

export default {

  components: {
    Event,
    Template,
    Tabbed,
    NodeForm,
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
        'Past Events':{},
      },
      rightData: {
        'Add an Event':{},
      },
      intro: this.$cytosis.find('Content.events-intro', {'Content': this.$store.state['Content']} )[0]['fields']['Markdown'],
      form: this.$cytosis.find('Content.form-event', {'Content': this.$store.state['Content']} )[0],
      // content: this.$cytosis.find('Content.events-content', {'Content': this.$store.state['Content']} )[0]['fields']['Markdown'],
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

