<template>

  <div class="PhageFutures">
    <no-ssr>

      <Template 
        grid-classes="Template--Main-Sidebar _grid-2-1-sm _grid-gap"
        header-classes="Template--Header _section-page _margin-bottom _margin-center _margin-top-none-i _padding-none-i" 
      >

        <template #header>

          Placeholder intro for an event, like phage futures

        </template>

        <template #default>

          <Timeline />

        </template>

      </Template>
    </no-ssr>

    <script async src="https://platform.twitter.com/widgets.js" charset="utf-8" />

  </div>
</template>


<script>

import Template from '~/templates/context.vue'
import Timeline from '~/components/events/Timeline.vue'

export default {
  head () {
    const title = "Phage Futures: LIVE"

    return {
      title,
    }
  },

  components: {
    Template,
    Timeline,
  },

  layout: 'contentframe',
  middleware: 'pageload',
  meta: {
    tableQuery: "_content"
    // tableQueries: ['_content', 'capsid-previews', 'atoms-featured', 'atoms-latest']
  },
  
  data: function () {
    return {
    }
  },

  computed: {
  },

  created: function () {
    
  },

  mounted: function () {
  },

  methods: {
  }

}

</script>

<style lang="scss" scoped>

</style>

