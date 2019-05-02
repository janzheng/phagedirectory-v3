<template>
  <div class="Coeur">

    <Template>
      
      <div slot="sidebar">
        <div class="_sidebar-content-group">
          <div class="_sidebar-item _sidebar-heading _sidebar-label">
            Main
          </div>
        </div>
        <nuxt-link v-scroll-to="'#basics'" to="/coeur#basics" class="_sidebar-item _sidebar-content-group _block">
          Basics
        </nuxt-link>
        <nuxt-link v-scroll-to="'#sizing'" to="/coeur#sizing" class="_sidebar-item _sidebar-content-group _block">
          Sizing
        </nuxt-link>
        <nuxt-link v-scroll-to="'#colors'" to="/coeur#colors" class="_sidebar-item _sidebar-content-group _block">
          Colors
        </nuxt-link>
        <nuxt-link v-scroll-to="'#typography'" to="/coeur#typography" class="_sidebar-item _sidebar-content-group _block">
          Typography
        </nuxt-link>
        <nuxt-link v-scroll-to="'#depth'" to="/coeur#depth" class="_sidebar-item _sidebar-content-group _block">
          Depth
        </nuxt-link>
      </div>

      <Basics />
      <Sizing />
      <Color />
      <Typography />
      <Depth />

    </Template>

  </div>
</template>




<script>

// import { mapState } from 'vuex'
import Template from '~/pages/templates/base-documentation.vue'
import Basics from '~/components/coeur/Basics.vue'
import Sizing from '~/components/coeur/Sizing.vue'
import Color from '~/components/coeur/Color.vue'
import Typography from '~/components/coeur/Typography.vue'
import Depth from '~/components/coeur/Depth.vue'

export default {

  components: {
    Template,
    Basics,
    Sizing,
    Color,
    Typography,
    Depth,
  },

  layout: 'contentframe',
  middleware: 'pageload',
  meta: {
    tableQueries: ["_content"],
  },

  data () {
    return {
    }
  },
  
  computed: {
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
  },


}
</script>

<style>
</style>

