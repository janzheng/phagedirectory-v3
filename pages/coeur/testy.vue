<template>
  <div class="Coeur">
    <Template>


      <h1>Test Room!</h1>

      <h2>Map of Events</h2>

      <div class="Leaflet" id="map-wrap" style="height: 40vh">
        <client-only>
          <l-map :zoom=1 :center="[47.413220, -1.219482]" class="Leaflet-map" >
            <l-tile-layer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
              attribution="Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a>" 
            />
            <l-marker v-for="item of events" 
                     :key="item.id" 
                     :lat-lng="item.fields['Meta:LatLng'][0].split(',')" 
                     class="Leaflet-marker"
            >
              <l-tooltip class="Leaflet-tooltip">
                {{ item.fields['Name'] }}</h5>
              </l-tooltip>
            </l-marker>
            <l-tile-layer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />
          </l-map>
        </client-only>
      </div>

      <h2>Form</h2>
      <NodeForm :src="form"/>


      <h2>Cytosis</h2>
      <Cytosis
        :tableQueries="['atoms-alerts']"
        :refreshOnLoad="true"
        :env="env"
      >
        <template #default="{ response }">
          [Uncomment for response] 
          <!-- Response: {{ response }} -->
        </template>
      </Cytosis>


  
    </Template>

  </div>
</template>


<script>

import { mapState } from 'vuex'
import Cytosis from '~/components/experiments/Cytosis.vue'
import NodeForm from '~/components/render/NodeForm.vue'
import Template from '~/templates/article.vue'

export default {

  components: {
    Cytosis,
    NodeForm,
    Template,
  },

  layout: 'contentframe',
  middleware: 'pageload',
  meta: {
    tableQueries: ["_content","atoms-events"],
  },

  data () {
    return {
      form: this.$cytosis.findOne('form-tester', this.$store.state['Content'] ),
    }
  },
  
  computed: {
    ...mapState([
      'Atoms',
      ]),
    events() {
      return this.Atoms.filter(t => t.fields['Atom:Type'] == 'Event')
    },
  },

  // runs on generation and page route (but not on first page load)
  async asyncData({env}) {

    return {
      postUrl: env.ext_handler,
      env,
    }
  },

  mounted () {
  },

  methods: {
  },


}
</script>

<style>
</style>

