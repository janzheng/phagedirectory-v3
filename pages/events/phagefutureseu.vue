<template>

  <div class="Evergreen">
    <no-ssr>

      <Template 
        grid-classes="Template--Main-Sidebar _grid-3-1-sm _grid-gap"
        header-classes="Template--Header _section-page _margin-bottom _margin-center _margin-top-none-i _padding-none-i" 
        sidebar-classes="--sticky --top-1"
      >

        <template #header>
          <div v-if="intro" :class="intro.fields['Data:Classes']" class="_margin-bottom _divider-bottom _md-pfix" v-html="$md.render(intro.fields['Markdown'] || '')"/>
        </template>



        <template #default>

          <div v-if="announcements" :class="announcements.fields['Data:Classes']" class="_margin-bottom _divider-bottom" v-html="$md.render(announcements.fields['Markdown'] || '')"/>
          <div v-scroll-spy class="scrollspy" >

            <div id="timeline" class=" _divider-bottom" >
              <h2 class="--title">Live Blog</h2>
              <Timeline 
                :timeline="timeline"
                :agenda="agenda"
                :authors="authors"
                :show-now="false"
                :show-next="false"
                :count="6"
                class="_card _padding"
              />

              <!-- {{ timeline }} -->

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

            <div v-if="agenda" id="agenda" class=" _divider-bottom">

              <div class="_grid-2-xs _align-baseline _padding-bottom">
                <h2 class="_padding-none">Agenda</h2>
                <div class="_font-small _right">
                  <!-- <a>Full Agenda</a> |  --><a href="https://dl.airtable.com/.attachments/9c9ab102121cdd9b46bc2a9aeacd4742/b68ef9f3/phagefutureseurope2019main8.pdf">Download PDF</a>
                </div>
              </div>

              <Agenda 
                :show-now="false"
                :show-next="false"

                :show-future="true"
                :show-past="false"
                :show-all="false"
                :agenda="agenda"
                :count="8"
                class="_card _padding"
              />
            </div>

            <Posters v-if="posters && posters.length>0" id="posters" :posters="posters" class="_card _padding _divider-bottom">
              <h6>Posters</h6>
              <!-- <NodeForm class="_margin-bottom-2" :src="formPosters"/> -->
            </Posters>

            <div id="staff" >
              <h2>Live Staff</h2>
              <Staff v-if="authors && authors.length>0" :staff="authors" class="_card _padding _divider-bottom">
                <!-- <NodeForm class="_margin-bottom-2" :src="formPosters"/> -->
              </Staff>
            </div>

          </div>
        </template>


        <!-- sidebar -->
        <template #context>
          <div class="Sidebar">
            <div v-scroll-spy-active="{class: '--scrollspy-active',   selector: '._sidebar-item'}" 
                 v-scroll-spy-link="{selector: 'a._sidebar-item'}"
                 class="scrollspy _card --silver" 
            >
              <nuxt-link to="#timeline" class="_sidebar-item _block --active-disabled">
                Live Blog
              </nuxt-link>
              <nuxt-link v-if="agenda" to="#agenda" class="_sidebar-item _block --active-disabled">
                Agenda
              </nuxt-link>
              <nuxt-link v-if="posters && posters.length>0" to="#posters" class="_sidebar-item _block --active-disabled">
                Posters
              </nuxt-link>
            </div>
          </div>
          
          <div clas="_sidebar-footer">
            <nuxt-link
              v-scroll-to="{
                el: '#staff'
              }"
              to="#staff" 
              class="_font-smaller _block _padding-left --active-disabled --link-none">
              Live Staff
            </nuxt-link>
            <div class="_margin-top-2">
              <a href="https://www.kisacoresearch.com/events/phage-futures-europe" target="_blank"><img style="width: 100%; max-width: 250px" src="https://dl.airtable.com/.attachments/d139e0ac20c52b687eca42db29aeac30/04ede483/ScreenShot2019-09-10at4.06.47PM.png" alt="Phage Futures 2019 details"/></a>
              <div class="_padding-bottom-half _font-small">Sponsored by <a href="https://www.kisacoresearch.com/">Kisaco Research</a></div>
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
import { headMatter } from '~/other/headmatter.js'
// import NodeForm from '~/components/render/NodeForm.vue'
// import Toggle from '~/components/Toggle.vue'

export default {

  head () {

    let head = headMatter({

      twitterCard: "summary_large_image",
      title: "Phage Futures Europe 2019",
      description: "Progressing phage therapy to treat acute and chronic infections safely and economically",
      author: "Phage Directory & Kisacro Research",
      imageUrl: "https://dl.airtable.com/.attachments/30f5bcaaf32bdc9646d99deb936de9bb/caa96734/pfeu_banner.png", 
      url: "https://phage.directory/phagefutures",
    })

    return head
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

  mounted: function () {
    this.$segmentize({
      segment: this.$segment,
      type: 'page',
      event: 'Event/PhageFuturesEU2019',
      data: {
        path: this.$route.path,
      }
    })
  },

  // methods: {
  // }

}

</script>

<style lang="scss" scoped>

</style>

