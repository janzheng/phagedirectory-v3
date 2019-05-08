<template>
  <div class="Coeur">


    <NodeForm :src="form"/>

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
import NodeForm from '~/components/render/NodeForm.vue'

export default {

  components: {
    Cytosis,
    NodeForm,
  },

  layout: 'contentframe',
  middleware: 'pageload',
  meta: {
    tableQueries: ["_content"],
  },

  data () {
    return {
      form: this.$cytosis.findOne('form-tester', this.$store.state['Content'] ),
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

