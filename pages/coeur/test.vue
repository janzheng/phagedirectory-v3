<template>
  <div class="Coeur">

    <Cytosis
      :tableQueries="['atoms-alerts']"
      :refreshOnLoad="true"
      :env="env"
    >
      <template #default="{ response }">
        slot props: {{ response }}
      </template>
    </Cytosis>

  </div>
</template>


<script>

// import { mapState } from 'vuex'
import Cytosis from '~/components/experiments/Cytosis.vue'

export default {

  components: {
    Cytosis,
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

