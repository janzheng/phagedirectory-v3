<template>
  <div class="Jobs _section-page">

    <div class="_section-content _margin-center" v-html="$md.render(intro || '')" />
    <div class="_section-content _margin-center">
      <!-- <div class="Template-sidebar">
        <div class="_margin-bottom" v-html="$md.render(content || '')" />
      </div> -->
      <div>
        <div>
          <h6>Upcoming Events</h6>
          <Event v-for="item of upcoming" :key="item.id" :atom="item" />
        </div>

        <div class="_padding-top-2">
          <h6>Past Events</h6>
          <Event v-for="item of past" :key="item.id" :atom="item" />
        </div>
      </div>
    </div>

  </div>
</template>




<script>

import { mapState } from 'vuex'
// import FormContact from '~/forms/FormContact.vue'
// import Form from '~/templates/node-form.vue'
import Event from '~/components/Event.vue'

export default {

  components: {
    // Form,
    Event,
  },

  layout: 'contentframe',
  middleware: 'pageload',
  meta: {
    tableQueries: ["_content", "atoms-events"],
    refreshOnLoad: true,
  },

  data () {
    return {
      intro: this.$cytosis.find('Content.events-intro', {'Content': this.$store.state['Content']} )[0]['fields']['Markdown'],
      content: this.$cytosis.find('Content.events-content', {'Content': this.$store.state['Content']} )[0]['fields']['Markdown'],
      // jo: this.$cytosis.find('Content.footer-alerts', {'Content': this.$store.state['Content']} )[0]['fields']['Markdown'],
    }
  },
  
  computed: {
    ...mapState([
      'Atoms',
      ]),
    events() {
      return this.Atoms.filter(t => t.fields['Atom:Type'] == 'Event')
    },

    past() {
      // events in the past, w/ newest first
      return this.events.filter(item => {
        const date = item.fields['Data:Date']
        return !this.$dayjs().isBefore(this.$dayjs(String(date)))
      }).reverse()
    },
    upcoming() {
      // events in the future
      return this.events.filter(item => {
        const date = item.fields['Data:Date']
        return this.$dayjs().isBefore(this.$dayjs(String(date)))
      })
    }
  },

  // runs on generation and page route (but not on first page load)
  async asyncData({env}) {

    return {
      postUrl: env.ext_handler,
    }
  },

  mounted () {
  },

  methods: {
  },


}
</script>

<style>
</style>

