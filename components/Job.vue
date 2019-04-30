
<template>

  <div :class="atom.fields['Data:Status'][0]" class="Job _card --shadow _padding " >

    <div class="Job-header ">

      <div v-if="getCover" class="Job-logo" >
        <img :src="getCover" alt="Job logo">
      </div>

      <div class="_grid-1-auto _align-vertically _margin-bottom-half _grid-gap-small">
        <div>
          <span v-if="atom.fields['Data:Categories']" class="Job-type _tag --highlight">
            {{ atom.fields['Data:Categories'][0] }}
          </span>
        </div>
        <div class="Job-date _right-sm _font-small">
          <span>Posted {{ atom.fields['Data:Date'] | dateTo }}</span>
        </div>
      </div>

      <div class="Job-title _font-bold _margin-top-half ">
        <h5 v-if="atom.fields['Data:Title']" class="_inline _md-p_fix _padding-bottom-half" v-html="$md.strip($md.render( atom.fields['Data:Title'] || ''))" />
      </div>

      <div class="Job-tags _margin-bottom-half">
        <span v-for="item of atom.fields['Data:Tags']" :key="atom.id + item" class="Job-tag _tag">{{ item }}</span>
      </div>

      <div class="Job-info _margin-bottom _margin-top">
        <div v-if="atom.fields['Data:Source']">
          <strong>{{ atom.fields['Data:Source'] }}</strong>
        </div>
        <div v-if="atom.fields['Data:Subtitle']" v-html="$md.render(atom.fields['Data:Subtitle'] || '')" />
      </div>
    </div>

    <div class="Job-content">
      <div v-html="$md.render(atom.fields['Markdown'] || '')" />
    </div>

    <div v-if="!isExpired && atom.fields['URL']" class="Job-action ">
      <a v-if="atom.fields['URL']" :href="atom.fields['URL']" class="Job-action-apply _button --short --outline _margin-bottom-none _margin-right-half" target="_blank">More Details</a>
      <span v-if="atom.fields['Data:DateEnd']" class="Job-expiry _font-small --nowrap">
        Last day to apply: <span class="_font-bold">{{ atom.fields['Data:DateEnd'] | niceDate }} </span>
      </span>
    </div>
    <div v-else>
      <span v-if="atom.fields['URL']" class="Job-action-apply _button --short --disabled --outline _margin-bottom-none _margin-right-half" >Job expired</span>
    </div>

  </div>

</template>


<script>

export default {

  props: {
    atom: Object,
  },

  data: function () {
    return {
    }
  },

  computed: {
    isExpired() {
      if( this.atom.fields['Data:Status'][0] == 'Expired' ) return true
      return undefined
    },

    getCover() {
      // currently only works for the first attachment
      // console.log('attachment', job.fields['Attachment'][0]['url'])
      if(this.atom.fields['Cover'])
        return this.atom.fields['Cover'][0]['url']
    },
  },

  mounted: async function () {
  },


  methods: {
  }

}
</script>

