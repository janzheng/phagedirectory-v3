
<!-- 

 -->
<template>

  <div :class="(isNext || isNow) ? '--upcoming' : '' " class="AgendaEvent" >

    <!-- these are "meta" type events that break up the day -->

    <!-- messaging to show if this is an "up next" event -->
    <div v-if="isNext" class="AgendaEvent-next">
      Upcoming:
    </div>

    <div v-if="isNow" class="AgendaEvent-now AgendaEvent-next">
      In Progress:
    </div>

    <!-- Type: Day -->
    <div v-if="agendaType == 'Day' " :class="[agendaType, expiredClass]" class="AgendaEvent-item --meta-major ">
      <div class="_grid-2-1 _grid-gap-small _align-vertically">
        <div class="AgendaEvent-item-title" v-html="$md.strip($md.render( event.fields['Name'] || ''))" />
        <div class="AgendaEvent-item-date _right-sm">{{ event.fields['Time:Nice'] }}</div>
      </div>
      <div v-if="event.fields['Description']" class="AgendaEvent--description" v-html="$md.render( event.fields['Description'] || '')" />
    </div>

    <!-- Type: End of Day -->
    <div v-else-if="agendaType == 'Day End' " :class="[agendaType, expiredClass]" class="AgendaEvent-item --meta-descriptor">
      <div class="_grid-2-1 _grid-gap-small _align-vertically">
        <div class="AgendaEvent-item-title" v-html="$md.strip($md.render( event.fields['Name'] || ''))" />
        <div class="AgendaEvent-item-date _right-sm">{{ event.fields['Time:Nice'] }}</div>
      </div>
      <div v-if="event.fields['Description']" class="AgendaEvent--description" v-html="$md.render( event.fields['Description'] || '')" />
    </div>

    <!-- Type: Event -->
    <div v-else-if="agendaType == 'Event' " :class="[agendaType, expiredClass]" class="AgendaEvent-item --meta-event ">
      <!-- <div class="_grid-2-1 _grid-gap-small _align-vertically">
        <div class="AgendaEvent-item-title" v-html="$md.strip($md.render( event.fields['Name'] || ''))" />
        <div class="AgendaEvent-item-date _right-sm">{{ event.fields['Time:Nice'] }}</div>
      </div>
      <div v-if="event.fields['Description']" class="AgendaEvent--description" v-html="$md.strip($md.render( event.fields['Description'] || ''))" />
       -->
      <AgendaCard>
        <div slot="type">{{ agendaType }}</div>
        <div slot="date">{{ event.fields['Time:Nice'] }}</div>
        <div slot="main">
          <div class="AgendaEvent-item-name">{{ event.fields['Name'] }}</div>
          <div v-if="event.fields['Description']" class="AgendaEvent--description _md-pfix" v-html="$md.render( event.fields['Description'] || '')" />
        </div>
      </AgendaCard>
    </div>

    <!-- Type: Session -->
    <div v-else-if="agendaType == 'Session' " :class="[agendaType, expiredClass]" class="AgendaEvent-item --meta-session">
      <div class="AgendaEvent-item-title">
        <div class="--meta-session-header">Session</div>
        <div v-html="$md.strip($md.render( event.fields['Name'] || ''))" />
      </div>
      <div v-if="event.fields['Description']" class="AgendaEvent--description" v-html="$md.render( event.fields['Description'] || '')" />
      <!-- <div class="AgendaEvent-item-date _right">{{ event.fields['Time'] | niceTimeDate }}</div> -->
    </div>

    <!-- remarks is a meta talk w/ no set speakers -->

    <!-- Type: Remarks -->
    <div v-else-if="agendaType == 'Remarks' " :class="[agendaType, expiredClass]" class="AgendaEvent-item --speaker">
      <AgendaCard>
        <div slot="type">{{ agendaType }}</div>
        <div slot="date">{{ event.fields['Time:Nice'] }}</div>
        <div slot="main">
          <div class="AgendaEvent-item-name">{{ event.fields['Name'] }}</div>
          <div v-if="event.fields['Description']" class="AgendaEvent--description" v-html="$md.render( event.fields['Description'] || '')" />
        </div>
      </AgendaCard>
    </div>

    <!-- inviter speaker talks are called "speaker" -->

    <!-- Type: Keynote -->
    <div v-else-if="agendaType == 'Keynote' " :class="[agendaType, expiredClass]" class="AgendaEvent-item --speaker">
      <AgendaCard>
        <div slot="type">{{ agendaType }}</div>
        <div slot="date">{{ event.fields['Time:Nice'] }}</div>
        <div slot="main">
          <div class="AgendaEvent-item-name" v-html="$md.strip($md.render( event.fields['Name'] || ''))" />
          <div class="AgendaEvent-item-speakers" v-html="$md.strip($md.render( event.fields['Speakers'] || ''))" />
          <div v-if="event.fields['Description']" class="AgendaEvent--description" v-html="$md.render( event.fields['Description'] || '')" />
        </div>
      </AgendaCard>
    </div>

    <!-- Type: Speaker -->
    <div v-else-if="agendaType == 'Speaker' " :class="[agendaType, expiredClass]" class="AgendaEvent-item --speaker">
      <AgendaCard>
        <div slot="type">{{ agendaType }}</div>
        <div slot="date">{{ event.fields['Time:Nice'] }}</div>
        <div slot="main">
          <div class="AgendaEvent-item-name" v-html="$md.strip($md.render( event.fields['Name'] || ''))" />
          <div class="AgendaEvent-item-speakers" v-html="$md.strip($md.render( event.fields['Speakers'] || ''))" />
          <div v-if="event.fields['Description']" class="AgendaEvent--description _margin-top" v-html="$md.render( event.fields['Description'] || '')" />
        </div>
      </AgendaCard>
    </div>

    <!-- Type: Panel -->
    <div v-else-if="agendaType == 'Panel' " :class="[agendaType, expiredClass]" class="AgendaEvent-item --speaker">
      <AgendaCard>
        <div slot="type">{{ agendaType }}</div>
        <div slot="date">{{ event.fields['Time:Nice'] }}</div>
        <div slot="main">
          <div class="AgendaEvent-item-name" v-html="$md.strip($md.render( event.fields['Name'] || ''))" />
          <div class="AgendaEvent-item-speakers" v-html="$md.strip($md.render( event.fields['Speakers'] || ''))" />
          <div v-if="event.fields['Description']" class="AgendaEvent--description" v-html="$md.render( event.fields['Description'] || '')" />
        </div>
      </AgendaCard>
    </div>

  </div>



</template>


<script>

// import StreamCard from '~/components/events/StreamCard.vue'
import AgendaCard from '~/components/events/AgendaCard.vue'

export default {

  components: {
    // StreamCard,
    AgendaCard,
  },

  props: {
    'event': Object, // the data for the event
    'isNext': Boolean, // true when this event is a preview 
    'isNow': Boolean, // true when this event is happening within a 15 minute window
  },

  data: function () {
    return {
    }
  },

  computed: {

    agendaType() {
      // edit this later w/ triggers etc.
      return this.event.fields['Type']
      // if (agenda.fields['Type'] == 'Day' ) { return 'Day' } 
      // else if (agenda.fields['Type'] == 'Event' ) { return 'Event' } 
      // else if (agenda.fields['Type'] == 'Session' ) { return 'Session' } 
      // else if (agenda.fields['Type'] == 'Remarks' ) { return 'Remarks' } 
      // else if (agenda.fields['Type'] == 'Keynote' ) { return 'Keynote' } 
      // else if (agenda.fields['Type'] == 'Day End' ) { return 'Day End' } 
      // else if (agenda.fields['Type'] == 'Speaker' ) { return 'Speaker' } 
      // else if (agenda.fields['Type'] == 'Panel' ) { return 'Panel' } 
    },

    expiredClass() {
      if(this.isNow)
        return undefined
      
      const nowDate = new Date
      const now = nowDate.toISOString()

      if (now > this.event.fields['Time:GMT:UTC'])
        return '--expired'

      return undefined
    }
  },

  methods: {

  }

}
</script>

