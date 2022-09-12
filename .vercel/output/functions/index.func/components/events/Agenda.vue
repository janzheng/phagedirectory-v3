<template>

  <div class="Agenda">

    <div v-if="showNow && nowEvent" class="Agenda-block Agenda-now" >
      <AgendaEvent :event="nowEvent" :is-now="true" class="Agenda-now" />
    </div>

    <div v-if="showNext && nextEvent" class="Agenda-block Agenda-next" >
      <AgendaEvent :event="nextEvent" :is-next="true" class="Agenda-event" />
    </div>

    <div v-if="showPast" >
      <div v-for="item of pastEvents" :key="'agenda_'+item.id" class="Agenda-block Agenda-past">
        <AgendaEvent :event="item" />
      </div>
      <div v-if="postCount < agenda.length" class="Agenda-more _margin-top _margin-bottom-2">
        <button v-if="postCount < agenda.length "
                class="_button --width-full _center CTA --brand _font-bold _margin-none-i" @click="showMore()">
          <span class="">Show More</span>
        </button>
      </div>
    </div>

    <div v-if="showFuture" >
      <div v-for="item of futureEvents" :key="'agenda_'+item.id" class="Agenda-block Agenda-future">
        <AgendaEvent :event="item" />
      </div>
      <div v-if="postCount < agenda.length" class="Agenda-more _margin-top _margin-bottom-2">
        <button v-if="postCount < agenda.length "
                class="_button --width-full _center CTA --brand _font-bold _margin-none-i" @click="showMore()">
          <span class="">Show More</span>
        </button>
      </div>
    </div>

    <div v-if="showAll" >
      <div v-for="item of agenda" :key="'agenda_'+item.id" class="Agenda-block Agenda-all">
        <AgendaEvent :event="item" />
      </div>
    </div>


  </div>
</template>


<script>

import AgendaEvent from '~/components/events/AgendaEvent.vue'

export default {

  components: {
    AgendaEvent,
  },

  props: {
    agenda: Array,

    // future, past, now, next, all
    showNow: {
      type: Boolean,
      default: true,
    },
    showNext: {
      type: Boolean,
      default: true,
    },
    showAll: {
      type: Boolean,
      default: true,
    },

    showFuture: { // just future events
      type: Boolean,
      default: false,
    },
    showPast: { // just past events
      type: Boolean,
      default: false,
    },

    count: { // show a total count of agenda items
      type: Number,
      default: 6, // use -1 for infinite
    },
  },

  data: function () {
    // preload the variables here, as they're not recalculated once loaded otherwise
    let _count = this.count
    return {
      postCount: _count
    }
  },

  computed: {

    now() {
      const nowDate = new Date
      return this.$dayjs(nowDate)
    },
    nowEvent() {
      // shows any event that is currently happening / has been happening for 15 minutes
      // after 15 minute mark it goes away
      let agenda = this['agenda']

      if(!agenda)
        return false

      const nowDate = new Date
      const now = this.$dayjs(nowDate)

      for (const event of agenda) {
        const minuteDiff = now.diff(this.$dayjs(event.fields['Time:GMT:UTC']), 'minutes')

        if (minuteDiff < 15 && 
          minuteDiff >= 0
          // event.fields['Type'] != 'Day' && // day is actually quite useful
          && event.fields['Type'] != 'Session') {
          // ) {
          return event
        }
      }
      return false // no more items in the agenda
    },

    nextEvent() {
      // this shows the next event by date listed in Agenda
      // this only really works if Agenda is sorted! But, we also don't want to force-sort Agenda here in case anything changes
      let agenda = this['agenda']

      if(!agenda)
        return false

      // let final = []
      const nowDate = new Date
      const now = nowDate.toISOString()

      for (let event of agenda) {
        // skip Day
        // if (event.fields['Type'] == 'Day' || event.fields['Type'] == 'Day End') {
        if (now < event.fields['Time:GMT:UTC']
          // event.fields['Type'] != 'Day' && 
          && event.fields['Type'] != 'Session') {
          // console.log('now:', now, '<?', event.fields['Time:GMT:UTC')
          // ) {
          return event
        }
      }

      return false // no more items in the agenda
    },

    pastEvents() {
      let agenda = this['agenda']

      if(!agenda)
        return false

      // let final = []
      const nowDate = new Date
      const now = nowDate.toISOString()

      const final = agenda.reduce((total, current) => {
        if (now >= current.fields['Time:GMT:UTC']
          // current.fields['Type'] != 'Session') {
          ) {
          total.push(current)
        }
        return total
      }, [])

      if(this.postCount>0)
        return final.slice(0,this.postCount)
      return final
    },

    futureEvents() {
      let agenda = this['agenda']

      if(!agenda)
        return false

      // let final = []
      const nowDate = new Date
      const now = nowDate.toISOString()

      const final = agenda.reduce((total, current) => {
        if (now < current.fields['Time:GMT:UTC']
          // current.fields['Type'] != 'Session') {
          ) {
          total.push(current)
        }
        return total
      }, [])

      if(this.postCount>0)
        return final.slice(0,this.postCount)
      return final
    },

    events() {
      let agenda = this['agenda']

      if(this.postCount>0)
        return agenda.slice(0,this.postCount)
      return agenda
    }
  },

  created: async function () {
  },

  mounted: function () {
  },

  methods: {

    showMore() {
      this.postCount = this.postCount + 6

      if(this.postCount >= 48)
        this.postCount = this.agenda.length
    },
  }

}

</script>

<style lang="scss" scoped>

</style>

