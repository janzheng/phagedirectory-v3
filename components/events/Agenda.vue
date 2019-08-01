<template>

  <div class="Agenda">

    <div v-if="showNow && nowEvent" class="Agenda-now" >
      <AgendaEvent :event="nowEvent" :is-now="true" class="Agenda-now" />
    </div>

    <div v-if="showNext && nextEvent" class="Agenda-next" >
      <AgendaEvent :event="nextEvent" :is-next="true" class="Agenda-event" />
    </div>

    <div v-if="showPast" >
      <div v-for="item of pastEvents" :key="'agenda_'+item.id" class="Agenda-past">
        <AgendaEvent :event="item" />
      </div>
    </div>

    <div v-if="showFuture" >
      <div v-for="item of futureEvents" :key="'agenda_'+item.id" class="Agenda-future">
        <AgendaEvent :event="item" />
      </div>
    </div>

    <div v-if="showAll" >
      <div v-for="item of agenda" :key="'agenda_'+item.id" class="Agenda-all">
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
  },

  data: function () {
    // preload the variables here, as they're not recalculated once loaded otherwise
    return {
    }
  },

  computed: {

    nowEvent() {
      // shows any event that is currently happening / has been happening for 15 minutes
      // after 15 minute mark it goes away
      let agenda = this['agenda']

      if(!agenda)
        return false

      const nowDate = new Date
      const now = this.$dayjs(nowDate)

      for (const event of agenda) {
        const minuteDiff = now.diff(this.$dayjs(event.fields['Time:Raw']), 'minutes')

        if (minuteDiff < 15 && 
          minuteDiff >= 0 && 
          // event.fields['Type'] != 'Day' && // day is actually quite useful
          event.fields['Type'] != 'Session') {
          return event
        }
      }
      return false // no more items in the agenda
    },

    nextEvent() {
      // this shows the net event by date listed in Agenda
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
        if (now < event.fields['Time:Raw'] && 
          // event.fields['Type'] != 'Day' && 
          event.fields['Type'] != 'Session') {
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

      return agenda.reduce((total, current) => {
        if (now >= current.fields['Time:Raw'] && 
          current.fields['Type'] != 'Session') {
          total.push(current)
        }
        return total
      }, [])
    },

    futureEvents() {
      let agenda = this['agenda']

      if(!agenda)
        return false

      // let final = []
      const nowDate = new Date
      const now = nowDate.toISOString()

      return agenda.reduce((total, current) => {
        if (now < current.fields['Time:Raw'] && 
          current.fields['Type'] != 'Session') {
          total.push(current)
        }
        return total
      }, [])
    }
  },

  created: async function () {
  },

  mounted: function () {
  },

  methods: {

  }

}

</script>

<style lang="scss" scoped>

</style>

