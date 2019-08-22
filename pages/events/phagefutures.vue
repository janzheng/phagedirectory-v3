<template>

  <div class="PhageFutures">
    <client-only>

      <Template 
        grid-classes="Template--Main-Sidebar _grid-2-1-sm _grid-gap"
        header-classes="Template--Header _section-page _margin-bottom _margin-center _margin-top-none-i _padding-none-i" 
      >

        <template #header>

          Placeholder intro for an event, like phage futures

        </template>

        <template #default>

          <div class="_card _padding-2" >
            <Timeline 
              :timeline="timeline"
              :agenda="agenda"
              :authors="authors"
              :show-now="true"
              :show-next="true"
            />
          </div>

          <!-- <Agenda 
            :show-now="true"
            :show-next="true"

            :show-future="true"
            :show-past="false"
            :show-all="true"
            :agenda="agenda"
            /> -->
          <!-- <Posters :posters="posters"/> -->

        </template>

      </Template>
    </client-only>

    <script async src="https://platform.twitter.com/widgets.js" charset="utf-8" />

  </div>
</template>


<script>

import Template from '~/templates/context.vue'
import Timeline from '~/components/events/Timeline.vue'
import Agenda from '~/components/events/Agenda.vue'
import Posters from '~/components/events/Posters.vue'
import { loadQuery } from '~/other/loaders'

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
    Posters,
    Agenda,
  },

  layout: 'contentframe',
  middleware: 'pageload',
  meta: {
    tableQuery: "_content"
    // tableQueries: ['_content', 'capsid-previews', 'atoms-featured', 'atoms-latest']
  },
  
  // runs on generation and page route (but not on first page load)
  async asyncData({env, store}) {
    const event = await loadQuery({
      _key: 'keyAe6M1KoPfg25aO', // Live Public DB
      _base: 'appEuZLle3bAy2g2g', // Live Public DB
      store, 
      routeName: '{live:pfdc-2019}', 
      query: 'pfdc-2019'
      // query: 'evergreen-2019'
    })

    return {
      posters: event.tables['Posters'],
      timeline: event.tables['Timeline'],
      agenda: event.tables['Agenda'],
      authors: event.tables['Authors'],
    }
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

