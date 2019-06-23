
<template>

  <div class="Recently" >

    <div class="Recently-container ">
      <div class="_padding-none _margin-bottom-half _color-mono-60 _font-small">{{ header }}</div>
      <div v-for="item of items" :key="item.id" class="_card _padding _font-small">
        <div class="_margin-bottom-half _color-mono-60 _font-small">{{ item.fields['Date'] | niceDate }}</div>
        <div class="_margin-bottom _font-bold">{{ item.fields['Name'] }}</div>
        <div class="" v-html="$md.render(item.fields['Message'] || '')" />
      </div>
    </div>

  </div>

</template>


<script>

// import { mapState } from 'vuex'

export default {

  props: {
    header: String,
    items: Array,
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

