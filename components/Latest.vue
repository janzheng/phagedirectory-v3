
<template>

  <div class="Latest" >

    <div class="Latest-container ">

      <div v-for="item of atoms" :key="item.id" class="_card --img _padding">
        <h6 class="_padding-none _color-mono-40">{{ item.fields['Atom:Type'] }}</h6>
        <div v-if="item.fields['Data:Title']" class="_margin-bottom _font-bold">{{ item.fields['Data:Title'] }}</div>
        <div v-if="item.fields['Markdown']" class="_md-pfix" v-html="$md.render(item.fields['Markdown'] || '')" />
      </div>

    </div>

  </div>

</template>


<script>

// import { mapState } from 'vuex'

export default {

  props: {
    atoms: Array,
  },

  data: function () {
    return {
    }
  },

  computed: {
  },

  mounted: async function () {
  },

  methods: {
  }

}
</script>

