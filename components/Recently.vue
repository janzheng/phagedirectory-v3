
<template>

  <div class="Recently" >

    <div class="Recently-container ">
      <h3 class="">
        {{ header }}
      </h3>
      <div v-for="item of items" :key="item.id" class=" _font-small">
        <div class="_grid-1-5 _grid-gap-small _margin-bottom-2">
          <div class="_margin-bottom-half _color-mono-60 _font-small">{{ item.fields['Date'] | niceDate }}</div>
          <div class="">
            <div v-if="item.fields['Name']" class="_margin-bottom-half" v-html="$md.render(item.fields['Name'] || '')" />
            <div class="" v-html="$md.render(item.fields['Message'] || '')" />
            <div v-if="item.fields['Data:Tags']">
              <span v-for="tag of item.fields['Data:Tags']" :key="tag" class="_tag">{{ tag }}</span>
            </div>
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

