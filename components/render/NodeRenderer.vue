
<!-- 

  Renders a list of Atoms linked from another node, as content (on the same document)
  - used by the node- templates

 -->
<template>

  <div class="NodeContent" >
    <div v-for="item of nodes" :key="item.id">
      <div v-if="item.fields['Render:Template'] == 'Form'" >
        <Form :src="item"/>
      </div>
      <div v-else v-html="$md.render(item.fields['Markdown'] || '')" />
    </div>
  </div>

</template>


<script>

import Form from '~/templates/node-form.vue'

export default {

  components: {
    Form,
  },

  props: {
    nodes: Array,
  },

  data: function () {
    return {
    }
  },

  mounted: async function () {
  },

  methods: {
  }

}
</script>

