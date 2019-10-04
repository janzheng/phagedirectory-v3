<template>

  <div class="EventPost">
    <no-ssr>

      <Template 
        grid-classes="Template--Main-Sidebar _grid-3-1-sm _grid-gap"
        header-classes="Template--Header _section-page _margin-bottom _margin-center _margin-top-none-i _padding-none-i" 
        sidebar-classes="--sticky --top-1"
      >

        <template #header>

          <div v-if="intro" :class="intro.fields['Data:Classes']" class="_margin-bottom" v-html="$md.render(intro.fields['Markdown'] || '')"/>

        </template>



        <template #default>

          <div v-if="announcements" :class="announcements.fields['Data:Classes']" class="_margin-bottom _divider-bottom" v-html="$md.render(announcements.fields['Markdown'] || '')"/>
          <div v-scroll-spy class="scrollspy" >

            <div id="timeline" class="_card _padding _divider-bottom" >
              <h6>Timeline</h6>
              <Timeline 
                :timeline="timeline"
                :agenda="agenda"
                :authors="authors"
                :show-now="false"
                :show-next="false"
              />

              <!-- <div class="post">
                <a target="_blank" class="_button _width-full CTA _margin-bottom-none-i _center" href="https://airtable.com/shrqc7FzTrk8pRHS3">Post to our Evergreen feed!</a>
              </div> -->

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

            <!-- <EvgPromo class="_hidden-sm-up" /> -->

            <div v-if="agenda" id="agenda" class="_card _padding _divider-bottom">
              <h6 class="_padding-none">Agenda</h6>
              <Agenda 
                :show-now="false"
                :show-next="false"

                :show-future="true"
                :show-past="false"
                :show-all="false"
                :agenda="agenda"
                :count="6"
              />
            </div>

            <Posters v-if="posters" id="posters" :posters="posters" class="_card _padding _divider-bottom">
              <h6>Posters</h6>
              <!-- <NodeForm class="_margin-bottom-2" :src="formPosters"/> -->
            </Posters>

            <Staff v-if="authors" id="staff" :staff="authors" class="_card _padding _divider-bottom">
              <h6>Staff</h6>
              <!-- <NodeForm class="_margin-bottom-2" :src="formPosters"/> -->
            </Staff>

          </div>
        </template>


        <!-- sidebar -->
        <template #context>
          <div class="Sidebar">
            <div v-scroll-spy-active="{class: '--scrollspy-active', selector: '._sidebar-item'}" 
                 v-scroll-spy-link="{selector: 'a._sidebar-item'}"
                 class="scrollspy _card --silver" 
            >
              <nuxt-link to="#timeline" class="_sidebar-item _block --active-disabled">
                Timeline
              </nuxt-link>
              <nuxt-link v-if="agenda" to="#agenda" class="_sidebar-item _block --active-disabled">
                Agenda
              </nuxt-link>
              <nuxt-link v-if="posters" to="#posters" class="_sidebar-item _block --active-disabled">
                Posters
              </nuxt-link>
              <nuxt-link v-if="authors" to="#staff" class="_sidebar-item _block --active-disabled">
                Staff
              </nuxt-link>
            </div>
          </div>
          
          <!-- just now and what's next -->
          <!-- <Agenda 
            :agenda="agenda"
            :show-now="true"
            :show-next="true"
            :show-all="false"
          /> -->

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
import Staff from '~/components/events/Staff.vue'
// import EvgPromo from '~/components/events/EvergreenPromo.vue'
import { loadQuery } from '~/other/loaders'
// import NodeForm from '~/components/render/NodeForm.vue'
// import Toggle from '~/components/Toggle.vue'

export default {
  head () {
    const title = "Phage Futures EU 2019"

    return {
      title,
    }
  },

  components: {
    Template,
    Timeline,
    Posters,
    Agenda,
    Staff,
    // NodeForm,
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
      // formPosters: this.$cytosis.findOne('form-evg-posters', this.$store.state['Content'] ),
    }
  },

  // runs on server+generation and page route (but not on first page load)
  async asyncData({app, store}) {
    const event = await loadQuery({
      useDataCache: true, 
      _key: 'keyAe6M1KoPfg25aO', // Live Public DB
      _base: 'appEuZLle3bAy2g2g', // Live Public DB
      store, 
      routeName: 'pfeu-2019', 
      query: 'pfeu-2019'
    })

    // no timeline caching
    const timeline = await loadQuery({
      _key: 'keyAe6M1KoPfg25aO', // Live Public DB
      _base: 'appEuZLle3bAy2g2g', // Live Public DB
      store, 
      routeName: 'pfeu-2019-timeline', 
      query: 'pfeu-2019-timeline'
    })

    return {
      posters: event.tables['Posters'],
      timeline: timeline.tables['Timeline'],
      content: event.tables['Content'],
      agenda: event.tables['Agenda'],
      authors: event.tables['Authors'],

      intro: app.$cytosis.findOne('pfeu-intro', event.tables['Content'] ),
      announcements: app.$cytosis.findOne('pfeu-announcements', event.tables['Content'] ),
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

