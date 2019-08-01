<template>

  <!-- posters mode -->
  <div class="Events-posters" >

    <div class="_margin-bottom">
      <span class="_font-bold _link" @click="openAllPosters = !openAllPosters">Expand all posters</span>
    </div>

    <!-- No toggle -->
    <div v-for="poster of posters" :key="poster.id" class="Events-poster 
      _margin-bottom _card _padding" >
      <div class="Events-poster-name _font-bold " v-html="$md.strip($md.render( poster.fields['Name'] || ''))" />
      <div class="Events-poster-authors _margin-top " v-html="$md.strip($md.render( poster.fields['Authors'] || ''))" />
    </div>

    <!-- Toggle -->
    <!-- <Toggle v-for="poster of posters" :key="poster.id" class="Events-poster 
      _margin-bottom _card _padding _pointer" :override="openAllPosters" >
      <template #off>
        <div class="Events-poster-name _font-bold " v-html="$md.strip($md.render( poster.fields['Name'] || ''))" />
        <div class="Events-poster-authors _margin-top " v-html="$md.strip($md.render( poster.fields['Authors'] || ''))" />
      </template>

      <template #on>
        <div class="Events-poster-name _font-bold " v-html="$md.strip($md.render( poster.fields['Name'] || ''))" />
        <div class="Events-poster-authors _margin-top " v-html="$md.strip($md.render( poster.fields['Authors'] || ''))" />
        <div class="Events-poster-abstract _margin-top " v-html="$md.strip($md.render( poster.fields['Abstract'] || ''))" />
      </template>
    </Toggle> -->

  </div>
</template>


<script>

// import Toggle from '~/components/Toggle.vue'

export default {

  components: {
    // Toggle,
  },

  props: {
    posters: Array, // cytosis table/array of objects
  },

  data: function () {
    return {
      openAllPosters: false,
    }
  },

  computed: {
  },

  created: async function () {

  },

  mounted: function () {
  },

  methods: {
  }

}

</script>

<style lang="scss" scoped>

</style>

