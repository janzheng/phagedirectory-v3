
<!-- 

  Capsid — Alerts

 -->

<template>
  <div :class="atom.fields['Data:Status']" class="Capsid-item Capsid-alert _card _color-bg-white _padding _margin-none _font-small" >
    <div v-if="atom.fields['Data:Status']" :class="atom.fields['Data:Status']" class="Alert-status-tag _tag --alert " >{{ atom.fields['Data:Status'] }}</div>
    <div v-if="atom.fields['Data:Date']" class="">{{ atom.fields['Data:Date'] | niceDate }}</div>


    <div class="_flex-1 _md-p_fix" v-html="$md.render(atom.fields['Markdown'] || '')" />
    <div v-if="atom.fields['Data:Tags']" class="_margin-top" >
      <span v-for="item of atom.fields['Data:Tags']" :key="item" :class="item == 'Sponsor' || item == 'Promotion' ? '--sponsor' : ''" class="Capsid-item-tag _tag" >{{ item }}</span>
    </div>
  </div>
</template>

<script>

// import { mapState } from 'vuex'

export default {
  props: {
    'atom': Object
  },
}
</script>


<!--

<!~~ 

  Capsid — Jobs

 ~~>

<template>
  <div class="Capsid-item Capsid-job _card _color-bg-white _padding _margin-none" >
    <div v-if="getCover" class="Capsid-logo" >
      <img :src="getCover" alt="Job logo">
    </div>

    <div class="_flex-1">
      <h4 v-if="atom.fields['Data:Title']" v-html="$md.strip($md.render(atom.fields['Data:Title'] || ''))" />
      <div v-if="atom.fields['Data:Source']" class="_md-pfix _font-bold" v-html="$md.render(atom.fields['Data:Source'] || '')" />
      <div v-if="atom.fields['Data:Subtitle']" v-html="$md.render(atom.fields['Data:Subtitle'] || '')" />
      <div v-if="atom.fields['Markdown']" v-html="$md.strip($md.render(atom.fields['Markdown'] || ''))" />
    </div>

    <div v-if="atom.fields['Data:Categories']" class="Capsid-item-taglist _margin-top-half" >
      <span v-if="atom.fields['Data:Categories']" class="_tag --highlight --nowrap" >{{ atom.fields['Data:Categories'][0] }}</span> 
      <span v-for="item of atom.fields['Data:Tags']" :key="item" :class="item == 'Sponsor' || item == 'Promotion' ? '--sponsor' : ''" class="Capsid-item-tag _tag --nowrap" >{{ item }}</span>
    </div>
    
    <div v-if="atom.fields['Data:Status'] != 'Expired' && atom.fields['URL']" class="Capsid-cta  _margin-top-half _margin-bottom ">
      <a v-if="atom.fields['URL']" :href="atom.fields['URL']" class="Job-action-apply --outline _button --short _margin-bottom-none-i _margin-right-half" target="_blank">More Details</a>
      <!~~ expiration date ~~>
      <span v-if="atom.fields['Data:DateEnd']" class="Job-expiry _font-small --nowrap">
        Last day: <span class="_font-bold">{{ atom.fields['Data:DateEnd'] | niceDate }} </span>
      </span>
    </div>

  </div>
</template>

<script>

// import { mapState } from 'vuex'

export default {
  props: {
    'atom': Object
  },
  computed: {
    getCover() {
      // currently only works for the first attachment
      // console.log('attachment', job.fields['Attachment'][0]['url'])
      if(this.atom.fields['Cover'])
        return this.atom.fields['Cover'][0]['url']
      return undefined
    },
  },
  methods: {
  }
}
</script>

-->