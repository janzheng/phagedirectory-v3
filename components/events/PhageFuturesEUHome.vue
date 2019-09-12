<template>

  <div class="PFEU-Home">
    <no-ssr>

      <Template 
        grid-classes="Template--Main-Sidebar _grid-2-1-sm _grid-gap"
        header-classes="Template--Header _section-page _margin-bottom _margin-center _margin-top-none-i _padding-none-i" 
      >

        <template #header>

          <slot/>

        </template>

        <template #default>


          <div v-if="announcements" :class="announcements.fields['Data:Classes']" class="_margin-bottom" v-html="$md.render(announcements.fields['Markdown'] || '')"/>

          <div class="_card _padding" >
            <h6>Live Blog</h6>

            <div v-if="isLoadingTimeline" class="">
              <span class="_inine-block _margin-right-2 _spinner" /> Loading timeline ... 
            </div>
            <div v-else>
              <Timeline 
                v-if="timeline"
                :timeline="timeline"
                :agenda="agenda"
                :authors="authors"
                :show-now="false"
                :show-next="true"
                order="asc"
              />
            </div>

          </div>

          <slot name="footer"/>

        </template>


        <template #context>
          <a href="https://www.kisacoresearch.com/events/phage-futures-europe" target="_blank"><img style="width: 100%" src="https://dl.airtable.com/.attachments/d139e0ac20c52b687eca42db29aeac30/04ede483/ScreenShot2019-09-10at4.06.47PM.png" alt="Phage Futures 2019 details"/></a>
          <div class="_padding-bottom-half">Sponsored by Kisaco</div>
        </template>

      </Template>
    </no-ssr>

    <script async src="https://platform.twitter.com/widgets.js" charset="utf-8" />

  </div>
</template>


<script>

import Template from '~/templates/context.vue'
import Timeline from '~/components/events/Timeline.vue'
import { loadQuery } from '~/other/loaders'

export default {

  components: {
    Template,
    Timeline,
  },

  data() {

    this.loadData()

    return {
      // posters: '',
      timeline: '',
      content: '',
      agenda: '',
      authors: '',
      isLoadingTimeline: true,

      // intro: app.$cytosis.findOne('pfeu-intro', event.tables['Content'] ),
      announcements: this.$cytosis.findOne('pfeu-announcements', this.$store.state['Content'] ),
    }
  },

  created: function () {
    
  },

  mounted: function () {
  },

  methods: {
    async loadData() {

      const event = await loadQuery({
        useDataCache: true, 
        _key: 'keyAe6M1KoPfg25aO', // Live Public DB
        _base: 'appEuZLle3bAy2g2g', // Live Public DB
        store: this.$store, 
        routeName: 'pfeu-2019', 
        query: 'pfeu-2019'
      })

      // no timeline caching
      const timeline = await loadQuery({
        _key: 'keyAe6M1KoPfg25aO', // Live Public DB
        _base: 'appEuZLle3bAy2g2g', // Live Public DB
        store: this.$store, 
        routeName: 'pfeu-2019-timeline', 
        query: 'pfeu-2019-timeline'
      })

      // this[posters] = event.tables['Posters'],
      this['isLoadingTimeline'] = false
      this['timeline'] = timeline.tables['Timeline']
      this['content'] = event.tables['Content']
      this['agenda'] = event.tables['Agenda']
      this['authors'] = event.tables['Authors']
    }
  }

}

</script>

<style lang="scss" scoped>

</style>

