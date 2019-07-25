<template>

  <div class="PhageFutures _section-page _margin-center">
    
    <div class="_section-content _margin-center">

      <div class="PhageFutures-stream _section-article _margin-center">

        <div v-if="intro" v-html="$md.render(intro || '')" />
        
        <!-- timeline mode -->
        <div v-if="nowEvent" class="PhageFutures-now" >
          <AgendaEvent :event="nowEvent" :is-now="true" class="PhageFutures-event" />
        </div>
        <div v-if="nextEvent" class="PhageFutures-next" >
          <AgendaEvent :event="nextEvent" :is-next="true" class="PhageFutures-event" />
        </div>

        <div v-for="post of getTimeline" v-if="post.fields['isPublished']" :key="'timeline_'+post.id" class="PhageFutures-posts">
          
          <!-- timeline post -->
          <StreamCard v-if="!post['isAgenda']" class="PhageFutures-post _grid-gap-small">
            <div v-if="getAuthor(post)" slot="sidebar" class="PhageFutures-post-sidebar _margin-bottom-half-xs" >
              <a v-if="getAuthor(post).fields['Twitter']" :href="'https://twitter.com/'+getAuthor(post).fields['Twitter']" target="_blank"><img v-if="getAuthorImg(post)" :src="getAuthorImg(post)" class="cnt _block _left _margin-center" style="border-radius: 100%" width="70" height="70"></a>
              <img v-if="!getAuthor(post).fields['Twitter'] && getAuthorImg(post)" :src="getAuthorImg(post)" class="cnt _block _left _margin-center" style="border-radius: 100%" width="70" height="70">
            </div>
            <div slot="main" class="PhageFutures-post-main">
              <div v-if="getAuthor(post)" class="PhageFutures-post-header _md-p_fix _margin-bottom-half" >
                <div class="PhageFutures-post-meta _grid-3-2-xs _grid-gap-small">
                  <div>
                    <a v-if="getAuthor(post).fields['Twitter']" :href="'https://twitter.com/'+getAuthor(post).fields['Twitter']" class="PhageFutures-post-author" target="_blank">{{ getAuthor(post).fields['Name'] }}</a>
                    <a v-if="getAuthor(post).fields['Twitter']" :href="'https://twitter.com/'+getAuthor(post).fields['Twitter']" class="PhageFutures-post-header-twitter" target="_blank">{{ getAuthor(post).fields['Twitter'] }}</a>
                    <span v-else class="PhageFutures-post-author">{{ getAuthor(post).fields['Name'] }}</span>
                  </div>
                  <div class="_right">
                    <span class="PhageFutures-post-header-meta">{{ post.fields['Time'] | niceTimeDate }} </span>
                  </div>
                </div>
              </div>
              <div class="PhageFutures-post-content _card --transparent _md-p_fix" >
                <div v-if="post.fields['Markdown']" class="PhageFutures-post-markdown" v-html="$md.render(post.fields['Markdown'] || '')" />
                <div v-if="post.fields['TwitterLink']" class="PhageFutures-post-twitter" >
                  <blockquote class="twitter-tweet" data-lang="en">
                    <a :href="post.fields['TwitterLink']"/>
                  </blockquote>
                </div>
                <div v-if="post.fields['Attachments']" class="PhageFutures-post-images" >
                  <div v-for="image of post.fields['Attachments']" :key="image['url']">
                    <img :src="image['url']" >
                  </div>
                </div>
              </div>
            </div>
          </StreamCard>

          <!-- agenda post within timeline -->
          <div v-else>
            <StreamCard class="PhageFutures-post _grid-gap-small">
              <div v-if="getAuthor(post)" slot="sidebar" class="PhageFutures-post-sidebar _margin-bottom-half-xs" >
                <a v-if="getAuthor(post).fields['Twitter']" :href="'https://twitter.com/'+getAuthor(post).fields['Twitter']" target="_blank"><img v-if="getAuthorImg(post)" :src="getAuthorImg(post)" class="cnt _block _left _margin-center" style="border-radius: 100%" width="70" height="70"></a>
                <img v-if="!getAuthor(post).fields['Twitter'] && getAuthorImg(post)" :src="getAuthorImg(post)" class="cnt _block _left _margin-center" style="border-radius: 100%" width="70" height="70">
              </div>
              <div slot="main" class="PhageFutures-post-main ">
                <AgendaEvent :event="post" class="" />
              </div>
            </StreamCard>
          </div>

        </div>

      </div>

    </div>

    <!-- required to render twitter embeds properly -->
    <script async src="https://platform.twitter.com/widgets.js" charset="utf-8" />

  </div>
</template>


<script>

// import { mapState } from 'vuex'
import StreamCard from '~/components/events/StreamCard.vue'
// import StreamEvent from '~/components/events/StreamEvent.vue'
import AgendaEvent from '~/components/events/AgendaEvent.vue'
// import FormPhageFutures from '~/forms/FormPhageFutures.vue'

import Toggle from '~/components/Toggle.vue'
import Cytosis from '~/other/cytosis'

// const loadPhageFutures = async function ({env, tableQuery, options, caller, _key, _base}) {
const loadPhageFutures = async function ({_cytosis, env, tableQuery, options, _key, _base}) {
  const airKey = _key || env.airtable_api
  const airBase = _base || env.airtable_base

  // console.log(`[actions/loadCytosis] ${caller}: loading:`, tableQuery, options)
  let cytosis = await new _cytosis({
    airKey, 
    airBase, 
    tableQuery, 
    options
  })
  // commit('setCytosis', cytosis)
  // console.log(`[actions/loadCytosis] ${caller}: done.`)
  return Promise.resolve(cytosis)
}

export default {
  head () {
    const title = "Phage Futures: LIVE"

    return {
      title,
    }
  },

  components: {
    StreamCard,
    // StreamEvent,
    AgendaEvent,
    Toggle,
  },

  data: function () {
    // preload the variables here, as they're not recalculated once loaded otherwise
    return {
      // content: this.$store.state.Content,
      openAllPosters: false,

      intro: false,
      
      Timeline: false,
      Authors: false,
      Agenda: false,
      Posters: false,
      PFContent: false,

    }
  },

  computed: {
    // ...mapState([
    //   'cytosis',
    //   // 'test'
    //   ]),

    nowEvent() {
      // shows any event that is currently happening / has been happening for 15 minutes
      // after 15 minute mark it goes away
      let agenda = this['Agenda']

      if(!agenda)
        return false

      console.log('eh?!', agenda, !agenda)

      const nowDate = new Date
      const now = this.$dayjs(nowDate)

      for (const event of agenda) {
        const minuteDiff = now.diff(this.$dayjs(event.fields['Time']), 'minutes')

        if (minuteDiff < 15 && 
          minuteDiff >= 0 && 
          // event.fields['Type'] != 'Day' && // day is actually quite useful
          event.fields['Type'] != 'Session' && 
          event.fields['isPublished']) {

          console.log('now event min diff:', minuteDiff, event.fields['Name'])
          return event
        }
      }
      return false // no more items in the agenda
    },

    nextEvent() {
      // this shows the net event by date listed in Agenda
      // this only really works if Agenda is sorted! But, we also don't want to force-sort Agenda here in case anything changes
      let agenda = this['Agenda']

      if(!agenda)
        return false

      // let final = []
      const nowDate = new Date
      const now = nowDate.toISOString()

      for (let event of agenda) {
        // skip Day
        // if (event.fields['Type'] == 'Day' || event.fields['Type'] == 'Day End') {
        if (now < event.fields['Time'] && 
          // event.fields['Type'] != 'Day' && 
          event.fields['Type'] != 'Session' && 
          event.fields['isPublished']) {
          return event
        }
      }
      return false // no more items in the agenda
    },

    getAgenda() {
      // return the agenda in the order it's setup in airtable
      if(this.mode == 'agenda') {
        let agenda = this['Agenda']

        // strip empty / unpublished
        for (const i of agenda.keys()) {
          if (!agenda[i].fields['isPublished']) {
            agenda.splice(i,1)
          }
        }

        return agenda
      } 
    },

    getTimeline() {

      // get the posts from timeline
      let timeline = this['Timeline']
      let agenda = this['Agenda']

      // console.log('getTimeline:', timeline, agenda)
      if(!agenda || !timeline)
        return false

      // add an internal "isAgenda" tag to agenda items since they display differently
      for (const i of agenda.keys()) {
        agenda[i]['isAgenda'] = true
      }

      // merge posts from timeline w/ Agenda items
      timeline = [ ...timeline, ...agenda ]

      // get rid of timeline items that might not have dates associate (will mess up sorting)
      for (const i of timeline.keys()) {
        if(!timeline[i].fields['Time'])
          timeline.splice(i,1)
      }

      // sort timeline by Time
      timeline = this.$cytosis.sort(timeline, 'Time').reverse()

      // get rid of items that haven't happened yet
      let final = []
      const nowDate = new Date
      const now = nowDate.toISOString()
      for (let item of timeline) {
        // console.log('time vs:', now, item.fields['Time'], now > Date.UTC(item.fields['Time']))
        if (now > item.fields['Time']) {
          final.push(item)
        }
      }

      // console.log('timeline:', final, timeline)
      return final

    }
  },

  created: async function () {
    const pfdata = await loadPhageFutures({
      _cytosis: this.$cytosis,
      tableQuery: 'livecontent',
      caller: 'phagefutures page',
      _key: 'keyAe6M1KoPfg25aO',
      _base: 'appEuZLle3bAy2g2g',
    })

    // settings
    // this.mode = mode

    this.intro = this.$cytosis.find('Content.timeline-intro', pfdata.tables)[0]['fields']['Markdown']

    this.Timeline = pfdata.tables['Timeline']
    this.Authors = pfdata.tables['Authors']
    this.Agenda = pfdata.tables['Agenda']
    this.Posters = pfdata.tables['Posters'],
    this.PFContent = pfdata.tables['Content']

    // load twitter on client only
    // if(process.client)
      // setTimeout(this.$twitter, 500)

  },

  mounted: function () {
  },

  methods: {
    getAuthor(post) {
      if (post.fields['Author'])
        return this.$cytosis.getLinkedRecords(post.fields['Author'], this['Authors'], true)[0]
    },

    getAuthorImg(post) {
      if (!post.fields['Author'])
        return

      const author = this.$cytosis.getLinkedRecords(post.fields['Author'], this['Authors'], true)[0]

      if(!author)
        return false

      if (author.fields['Attachments'] && author.fields['Attachments'][0]) {
        return author.fields['Attachments'][0]['thumbnails']['large']['url']
        // return author.fields['Attachments'][0]['url']
      }
      return false

      // url": "https://dl.airtable.com/.attachments/7f459a1f1437b787c232b774c8f21be0/b4df0ae6/801bdb80", "filename": "801bdb80", "size": 41508, "type": "image/jpeg", "thumbnails": { "small": { "url": "https://dl.airtable.com/.attachmentThumbnails/695ca06cffaed869538cff6414a35ccf/743d6845", "width": 54, "height": 36 }, 
    },

    getAgendaType(agenda) {
      // edit this later w/ triggers etc.
      return agenda.fields['Type']
    },
  }

}

</script>

<style lang="scss" scoped>

</style>

