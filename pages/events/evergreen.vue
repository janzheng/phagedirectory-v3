<template>

  <div class="Evergreen">
    <no-ssr>

      <Template 
        grid-classes="Template--Main-Sidebar _grid-2-1-sm _grid-gap"
        header-classes="Template--Header _section-page _margin-bottom _margin-center _margin-top-none-i _padding-none-i" 
      >

        <template #header>

          <div v-if="intro" :class="intro.fields['Data:Classes']" class="_margin-bottom" v-html="$md.render(intro.fields['Markdown'] || '')"/>

        </template>

        <template #default>

          <div v-if="announcements" :class="announcements.fields['Data:Classes']" class="_margin-bottom" v-html="$md.render(announcements.fields['Markdown'] || '')"/>

          <div class="_card _padding" >
            <h6>Evergreen Feed</h6>
            <Timeline 
              :timeline="timeline"
              :agenda="agenda"
              :authors="authors"
              :show-now="false"
              :show-next="false"
            />

            <div class="post">
              <a target="_blank" class="_button _width-full CTA _margin-bottom-none-i _center" href="https://airtable.com/shrqc7FzTrk8pRHS3">Post to our Evergreen feed!</a>
            </div>

            <!--<Toggle class="_pointer" :no-close-allowed="true">
              <template #off>
                Post to the feed
              </template>
              <template #on>
                <iframe class="airtable-embed" src="https://airtable.com/embed/shrqc7FzTrk8pRHS3?backgroundColor=pink" frameborder="0" onmousewheel="" width="100%" height="533" style="background: transparent; border: 1px solid #ccc;"></iframe>

                <!~~ autosize ~~>
                <!~~ <script src="https://static.airtable.com/js/embed/embed_snippet_v1.js"></script><iframe class="airtable-embed airtable-dynamic-height" src="https://airtable.com/embed/shrqc7FzTrk8pRHS3?backgroundColor=pink" frameborder="0" onmousewheel="" width="100%" height="400" style="background: transparent; border: 1px solid #ccc;"></iframe> ~~>
              </template>
            </Toggle>-->



          </div>

          <!-- <Agenda 
            :show-now="true"
            :show-next="true"

            :show-future="true"
            :show-past="false"
            :show-all="true"
            :agenda="agenda"
            /> -->

          <EvgPromo class="_hidden-sm-up" />

          <div class="_card _padding --silver">
            <h6 class="_padding-none">Agenda</h6>
            <Agenda 
              :show-now="false"
              :show-next="false"

              :show-future="true"
              :show-past="false"
              :show-all="false"
              :agenda="agenda"
              count="-1"
            />
          </div>

          <Posters :posters="posters" class="_card _padding">
            <h6>Evergreen Posters</h6>
            <NodeForm class="_margin-bottom-2" :src="formPosters"/>
          </Posters>

        </template>


        <!-- sidebar -->
        <template #context>

          <!-- just now and what's next -->
          <Agenda 
            :agenda="agenda"
            :show-now="true"
            :show-next="true"
            :show-all="false"
          />

          <EvgPromo class="_hidden-xs" />

        </template>

      </Template>
    </no-ssr>

    <script async src="https://platform.twitter.com/widgets.js" charset="utf-8" />

  </div>
</template>


<script>

import Template from '~/templates/context.vue'
import Timeline from '~/components/events/Timeline.vue'
import Agenda from '~/components/events/Agenda.vue'
import Posters from '~/components/events/Posters.vue'
import EvgPromo from '~/components/events/EvergreenPromo.vue'
import { loadQuery } from '~/other/loaders'
import NodeForm from '~/components/render/NodeForm.vue'
// import Toggle from '~/components/Toggle.vue'

export default {
  head () {
    const title = "Evergreen 2019: LIVE"

    return {
      title,
    }
  },

  components: {
    Template,
    Timeline,
    Posters,
    Agenda,
    EvgPromo,
    NodeForm,
    // Toggle,
  },

  layout: 'contentframe',
  middleware: 'pageload',
  meta: {
    tableQueries: ["_content"],
    refreshOnLoad: true,
  },
  
  data () {
    return {
      formPosters: this.$cytosis.findOne('form-evg-posters', this.$store.state['Content'] ),
    }
  },

  // runs on generation and page route (but not on first page load)
  async asyncData({app, store}) {
    const event = await loadQuery({
      _key: 'keyAe6M1KoPfg25aO', // Live Public DB
      _base: 'appEuZLle3bAy2g2g', // Live Public DB
      store, 
      routeName: '{live:pfdc-2019}', 
      // query: 'pfdc-2019'
      query: 'evergreen-2019'
    })

    return {
      posters: event.tables['Posters'],
      timeline: event.tables['Timeline'],
      content: event.tables['Content'],
      agenda: event.tables['Agenda'],
      authors: event.tables['Authors'],

      intro: app.$cytosis.findOne('evg-intro', event.tables['Content'] ),
      announcements: app.$cytosis.findOne('evg-announcements', event.tables['Content'] ),
    }
  },

  // computed: {
  // },

  // created: function () {
    
  // },

  // mounted: function () {
  // },

  // methods: {
  // }

}

</script>

<style lang="scss" scoped>

</style>

