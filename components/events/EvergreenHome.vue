<template>

  <div class="Evergreen-Home">
    <no-ssr>

      <Template 
        grid-classes="Template--Main-Sidebar _grid-2-1-sm _grid-gap"
        header-classes="Template--Header _section-page _margin-bottom _margin-center _margin-top-none-i _padding-none-i" 
      >

        <template #header>

          <slot/>

          <!-- <div v-if="intro" :class="intro.fields['Data:Classes']" class="_margin-bottom" v-html="$md.render(intro.fields['Markdown'] || '')"/> -->

          <RecentSignups>
            <h3 class="--title">Signups @ Evergreen 2019:</h3>
          </RecentSignups>

        </template>

        <template #default>


          <div v-if="announcements" :class="announcements.fields['Data:Classes']" class="_margin-bottom" v-html="$md.render(announcements.fields['Markdown'] || '')"/>

          <div class="_card _padding" >
            <h6>Evergreen Feed</h6>
            <Timeline 
              v-if="timeline"
              :timeline="timeline"
              :agenda="agenda"
              :authors="authors"
              :show-now="false"
              :show-next="false"
              order="desc"
              :count="4"
            />

            <div class="post">
              <a target="_blank" class="_button _width-full CTA _margin-bottom-none-i _center" href="https://airtable.com/shrqc7FzTrk8pRHS3">Post to our Evergreen feed!</a>
            </div>

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
          <!-- 
                    <Posters v-if="posters" :posters="posters" class="_card _padding">
                      <h6>Evergreen Posters</h6>
                      <NodeForm v-if="formPosters" class="_margin-bottom-2" :src="formPosters"/>
                    </Posters>
           -->
        </template>


        <template #context>

          <!-- just now and what's next -->
          <Agenda 
            v-if="agenda"
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
// import Posters from '~/components/events/Posters.vue'
import RecentSignups from '~/components/events/RecentSignups.vue'
import EvgPromo from '~/components/events/EvergreenPromo.vue'
import { loadQuery } from '~/other/loaders'
// import NodeForm from '~/components/render/NodeForm.vue'
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
    // Posters,
    Agenda,
    EvgPromo,
    // NodeForm,
    // Toggle,
    RecentSignups,
  },

  layout: 'contentframe',
  middleware: 'pageload',
  meta: {
    tableQueries: ["_content"],
    refreshOnLoad: true,
  },
  
  data() {

    const _this = this
    const event = loadQuery({
      _key: 'keyAe6M1KoPfg25aO', // Live Public DB
      _base: 'appEuZLle3bAy2g2g', // Live Public DB
      store: _this.$store, 
      routeName: '{live:pfdc-2019}', 
      // query: 'pfdc-2019'
      query: 'evergreen-2019'
    })
    event.then((data) => {
      // console.log('PD live:, ', data)
      _this.posters = data.tables['Posters']
      _this.timeline = data.tables['Timeline']
      _this.content = data.tables['Content']
      _this.agenda = data.tables['Agenda']
      _this.authors = data.tables['Authors']

      _this.intro = _this.$cytosis.findOne('evg-intro', data.tables['Content'] )
      _this.announcements = _this.$cytosis.findOne('evg-announcements', data.tables['Content'] )

      _this.formPosters = this.$cytosis.findOne('form-evg-posters', this.$store.state['Content'] )
    })

    return {
      
      posters: '',
      timeline: '',
      content: '',
      agenda: '',
      authors: '',

      intro: '',
      announcements: '',

      formPosters: '',
    }
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

