
<!-- 

  Capsid — Jobs

 -->

<template>
  <div class="Capsid-item Capsid-job _card _color-bg-white _padding _margin-none" >
    <div v-if="atom.fields['Data:Categories'] || atom.fields['Data:Type'] || atom.fields['Data:Tags']" class="Capsid-item-taglist _padding-bottom" >
      <span v-if="atom.fields['Data:Type']" class="Job-type _tag --highlight --nowrap _margin-bottom-none-i">{{ atom.fields['Data:Type'] }}</span>
      <span v-if="atom.fields['Data:Categories']" class="_tag --nowrap" >{{ atom.fields['Data:Categories'][0] }}</span> 
      <span v-for="item of atom.fields['Data:Tags']" :key="item" :class="item == 'Sponsor' || item == 'Promotion' ? '--sponsor' : ''" class="Capsid-item-tag _tag --nowrap" >{{ item }}</span>
    </div>
    

    <div v-if="getCover" class="Capsid-logo _margin-top _margin-bottom" >
      <img :src="getCover" alt="Job logo" style="max-width: 250px">
    </div>

    <div class="_flex-1">
      <h4 v-if="atom.fields['Data:Title']" v-html="$md.strip($md.render(atom.fields['Data:Title'] || ''))" />
      <div v-if="atom.fields['Data:Source']" class="_md-pfix _font-bold" v-html="$md.render(atom.fields['Data:Source'] || '')" />
      <div v-if="atom.fields['Data:Subtitle']" v-html="$md.render(atom.fields['Data:Subtitle'] || '')" />
      <div v-if="atom.fields['Markdown']" v-html="$md.strip($md.render(atom.fields['Markdown'] || ''))" />
    </div>

    <div v-if="atom.fields['Data:Status'] != 'Expired' && atom.fields['URL']" class="Capsid-cta  _margin-top _margin-bottom ">
      <a v-if="atom.fields['Data:CTA']" :href="atom.fields['Data:CTA']" class="Job-action-apply CTA _button --short --bright _margin-bottom-none-i _margin-right-half" target="_blank">Apply Here</a>
      <a v-if="atom.fields['Slug']" :href="`/jobs/${atom.fields['Slug']}`" class="Job-action-apply _button --short --outline _margin-bottom-none-i _margin-right-half" >Read more about the job</a>
      <!-- <a v-if="atom.fields['URL']" :href="atom.fields['URL']" class="Job-action-apply --outline _button --short _margin-bottom-none-i _margin-right-half" target="_blank">More Details</a> -->
      <!-- expiration date -->
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
      // console.log('Cover????', this.atom.fields)
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

