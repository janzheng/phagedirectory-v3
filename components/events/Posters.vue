<template>

  <!-- posters mode -->
  <div class="Events-posters" >

    <slot name="default" />

    <div v-if="showExpand" class="_margin-bottom">
      <span class="_font-bold _link" @click="openAllPosters = !openAllPosters">Expand all posters</span>
    </div>

    <div v-for="poster of posters" :key="poster.id" class="Events-poster 
      _margin-bottom _card _padding" >

      <!-- Toggle -->
      <Toggle v-if="poster.fields['Abstract']" class="_pointer" :override="openAllPosters" >
        <template #off>
          <div class="Events-poster-name _font-bold " v-html="$md.strip($md.render( poster.fields['Name'] || ''))" />
          <div v-if="poster.fields['Authors']" class="Events-poster-authors _margin-top " v-html="$md.strip($md.render( poster.fields['Authors'] || ''))" />
          <div v-if="poster.fields['Markdown']" class="Events-poster-markdown _margin-top ">
            <div v-html="$md.strip($md.render( poster.fields['Markdown'] || ''))" />
            <script async src="https://platform.twitter.com/widgets.js" charset="utf-8" />
          </div>
          <div v-if="poster.fields['Attachments']" class="Events-poster-attachments _margin-top _grid-3-xs" >
            <div v-for="item of poster.fields['Attachments']" :key="item['url']" >
              <img style="max-width: 160px" :src="item['thumbnails']['large']['url']">
            </div>
          </div>
        </template>

        <template #on>
          <div class="Events-poster-name _font-bold " v-html="$md.strip($md.render( poster.fields['Name'] || ''))" />
          <div class="Events-poster-authors _margin-top " v-html="$md.strip($md.render( poster.fields['Authors'] || ''))" />
          <div v-if="poster.fields['Markdown']" class="Events-poster-markdown _margin-top ">
            <div v-html="$md.strip($md.render( poster.fields['Markdown'] || ''))" />
            <script async src="https://platform.twitter.com/widgets.js" charset="utf-8" />
          </div>
          <div v-if="poster.fields['Attachments']" class="Events-poster-attachments _margin-top ">
            <div v-for="item of poster.fields['Attachments']" :key="item['url']" >
              <img style="max-width: 100%" :src="item['thumbnails']['large']['url']">
            </div>
          </div>
          <div class="Events-poster-abstract _margin-top " v-html="$md.strip($md.render( poster.fields['Abstract'] || ''))" />
        </template>
      </Toggle>

      <div v-else>
        <div class="Events-poster-name _font-bold " v-html="$md.strip($md.render( poster.fields['Name'] || ''))" />
        <div class="Events-poster-authors _margin-top " v-html="$md.strip($md.render( poster.fields['Authors'] || ''))" />
      </div>
    </div>


  </div>
</template>


<script>

import Toggle from '~/components/Toggle.vue'

export default {

  components: {
    Toggle,
  },

  props: {
    posters: Array, // cytosis table/array of objects
    showExpand: {
      type: Boolean,
      default: false,
    }
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

