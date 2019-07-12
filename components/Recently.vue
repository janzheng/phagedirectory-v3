
<template>

  <div class="Recently" >

    <div class="Recently-container ">
      <h3 class="">
        {{ header }}
      </h3>
      <div v-for="item of items" :key="item.id" class=" _font-small">
        <div class="_grid-1-5 _grid-gap-small _margin-bottom">
          <div class="_margin-bottom-half _color-mono-60 _font-small">{{ item.fields['Date'] | niceDate }}</div>
          <div class="">
            <div class="_margin-bottom-half">{{ item.fields['Name'] }}</div>
            <div class="" v-html="$md.render(item.fields['Message'] || '')" />
          </div>
        </div>
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

