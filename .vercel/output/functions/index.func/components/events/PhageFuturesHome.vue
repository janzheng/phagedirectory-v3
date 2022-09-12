<template>

  <div class="PF-Home">
    <no-ssr>

      <Template 
        grid-classes="Template--Main-Sidebar-xs _grid-2-1-sm _grid-1-xs _grid-gap"
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
          <a href="https://phage-futures.com/events/phage-futures-2020" target="_blank"><img style="width: 100%; max-width: 250px" src="https://dl.phage.directory/.attachments/3b23ed38e0e1ab0cd60d55b84f019468/9712be9e/pfdc2020.jpg" alt="Phage Futures 2019 details"></a>
          <div class="_padding-bottom-half _font-small">Sponsored by <a href="https://www.kisacoresearch.com/">Kisaco Research</a></div>
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
// import { headMatter } from '~/other/headmatter.js'

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

      // intro: app.$cytosis.findOne('pfdc-intro', event.tables['Content'] ),
      announcements: this.$cytosis.findOne('pfdc-announcements', this.$store.state['Content'] ),
    }
  },

  created: function () {
    
  },

  mounted: function () {
    this.refresh()
  },

  methods: {
    async loadData() {

      const event = await loadQuery({
        useDataCache: true, 
        _key: 'keyAe6M1KoPfg25aO', // Live Public DB
        _base: 'appEuZLle3bAy2g2g', // Live Public DB
        store: this.$store, 
        routeName: 'pfdc-2020', 
        query: 'pfdc-2020'
      })

      // no timeline caching
      const timeline = await loadQuery({
        _key: 'keyAe6M1KoPfg25aO', // Live Public DB
        _base: 'appEuZLle3bAy2g2g', // Live Public DB
        store: this.$store, 
        routeName: 'pfdc-2020-timeline', 
        query: 'pfdc-2020-timeline'
      })

      // this[posters] = event.tables['Posters'],
      this['isLoadingTimeline'] = false
      this['timeline'] = timeline.tables['Timeline']
      this['content'] = event.tables['Content']
      this['agenda'] = event.tables['Agenda']
      this['authors'] = event.tables['Authors']

      this.refresh()
    },

    refresh() {
      if(typeof(twttr) !== 'undefined')
        twttr.widgets.load()
    },
  }

}

</script>

<style lang="scss" scoped>

</style>

