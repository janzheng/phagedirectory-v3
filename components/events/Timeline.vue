<template>

  <!-- 

    - todo:
      - sort Oldest first!! BUT only show the last five posts
        - button to show more (at the top of the stream)
        - easier to read when newest at bottom — like a chat, not like twitter
      - add loader
      - add "More" button
   -->


  <div class="Timeline ">

    <!-- show current or upcoming in timeline -->
    <div v-if="showNow || showNext" class="Timeline-nownext" >
      <Agenda 
        :show-now="showNow"
        :show-next="showNext"

        :show-future="false"
        :show-past="false"
        :show-all="false"
        :agenda="agenda"
        />
    </div>

    <div v-for="item of timelineAgenda" :key="item.id" class="Timeline-posts">
      
      <TimelineCard 
        :post="item"
        :author="getAuthor(item)"
        v-if="item.fields['Data:Type'] == 'Timeline'" 
        class="Timeline-post _grid-gap-small" 
      />
      <!-- <StreamCard v-if="!post['isAgenda']" class="PhageFutures-post _grid-gap-small">
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
            <div v-if="post.fields['Data:Markdown']" class="PhageFutures-post-markdown" v-html="$md.render(post.fields['Data:Markdown'] || '')" />
            <div v-if="post.fields['Data:Twitter']" class="PhageFutures-post-twitter" >
              <blockquote class="twitter-tweet" data-lang="en">
                <a :href="post.fields['Data:Twitter']">Twitter</a>
              </blockquote>

            </div>
            <div v-if="post.fields['Data:Attachments']" class="PhageFutures-post-images" >
              <div v-for="image of post.fields['Data:Attachments']" :key="image['url']">
                <img :src="image['url']" >
              </div>
            </div>
          </div>
        </div>
      </StreamCard> -->

      <!-- agenda post within timeline -->
      <div>
        <AgendaEvent :event="item" class="Timeline-AgendaEvent _margin-bottom-2" />
      </div>

    </div>

    <!-- required to render twitter embeds properly -->
    <script async v-if="timeline.length > 0" src="https://platform.twitter.com/widgets.js" charset="utf-8" />

  </div>

</template>


<script>

import TimelineCard from '~/components/events/TimelineCard.vue'
import Agenda from '~/components/events/Agenda.vue'
import AgendaEvent from '~/components/events/AgendaEvent.vue'

export default {

  props: {
    order: { // asc (oldest first) / desc (newest first)
      type: String,
      default: 'asc',
    },
    postCount: { // only show the latest posts
      type: Number,
      default: 10,
    },
    timeline: Array,
    agenda: Array,
    authors: Array,
    showNow: {
      type: Boolean,
      default: true,
    },
    showNext: {
      type: Boolean,
      default: true,
    },
  },

  components: {
    TimelineCard,
    Agenda,
    AgendaEvent,
  },

  data: function () {
    return {
    }
  },

  computed: {

    timelineAgenda() {

      // get the posts from timeline
      let timeline = this['timeline']
      let agenda = this['agenda']

      // add an internal "isAgenda" tag to agenda items since they display differently
      // for (const i of agenda.keys()) {
      //   agenda[i]['isAgenda'] = true
      // }

      // merge posts from timeline w/ Agenda items
      if(agenda)
        timeline = [ ...timeline, ...agenda ]

      // get rid of timeline items that might not have dates associate (will mess up sorting)
      // for (const i of timeline.keys()) {
      //   if(!timeline[i].fields['Time'])
      //     timeline.splice(i,1)
      // }

      // sort timeline by Time / newest first (like Twitter)
      if(this.order == 'desc') {
        timeline = this.$cytosis.sort(timeline, 'Time:Raw').reverse()
      } else {
        timeline = this.$cytosis.sort(timeline, 'Time:Raw')
      }

      // get rid of items that haven't happened yet
      const nowDate = new Date
      const now = nowDate.toISOString()
      timeline = timeline.reduce((total, current) => {
        if (now > current.fields['Time:Raw']) {
          total.push(current)
        }
        return total
      }, [])

      // only show by postCount number of posts
      if(timeline.length-this.postCount >= 0)
        return timeline.slice(timeline.length-this.postCount, timeline.length)
      
      return timeline

    }
  },

  created: async function () {
  },

  mounted: function () {
  },

  methods: {
    showMore() {
      this.postCount = this.postCount + 6

      if(this.postCount >= 24)
        this.postCount = this['timeline'].length
    },
    getAuthor(post) {
      if (post.fields['Author'])
        return this.$cytosis.getLinkedRecords(post.fields['Author'], this.authors, true)[0]
    },

  }

}

</script>

<style lang="scss" scoped>

</style>

