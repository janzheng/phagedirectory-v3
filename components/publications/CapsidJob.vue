
<!-- 

  Capsid — Jobs

 -->

<template>
  <div class="Capsid-item Capsid-job _card _color-bg-white _padding _margin-none" >
    <div v-if="getCover" class="Capsid-logo" >
      <img :src="getCover" alt="Job logo">
    </div>

    <div class="_flex-1">
      <h4 class="" v-html="$md.strip($md.render(atom.fields['Data:Title'] || ''))" />
      <div v-if="atom.fields['Data:Source']" class="_md-pfix _font-bold" v-html="$md.render(atom.fields['Data:Source'] || '')" />
      <div v-if="atom.fields['Data:Subtitle']" v-html="$md.render(atom.fields['Data:Subtitle'] || '')" />
      <div v-if="atom.fields['Markdown']" v-html="$md.render(atom.fields['Markdown'] || '')" />
    </div>

    <div class="Capsid-item-taglist _margin-top-half" >
      <span v-if="atom.fields['Data:Categories']" class="_tag --highlight --nowrap" >{{ atom.fields['Data:Categories'][0] }}</span> 
      <span v-for="item of atom.fields['Data:Tags']" :key="item" :class="item == 'Sponsor' || item == 'Promotion' ? '--sponsor' : ''" class="Capsid-item-tag _tag --nowrap" >{{ item }}</span>
    </div>
    
    <div v-if="atom.fields['Data:Status'] != 'Expired' && atom.fields['URL']" class="Capsid-cta  _margin-top-half _margin-bottom ">
      <a v-if="atom.fields['URL']" :href="atom.fields['URL']" class="Job-action-apply --outline _button --short _margin-bottom-none-i _margin-right-half" target="_blank">More Details</a>
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
      // currently only works for the first attachment
      // console.log('attachment', job.fields['Attachment'][0]['url'])
      if(this.atom.fields['Cover'])
        return this.atom.fields['Cover'][0]['url']
      return undefined
    },
  },
  methods: {

    getJobLink(job) {
      if (job.fields['URL'])
        return job.fields['URL']

      return false
    },
    showJob(job) {
      if (!job.fields['isPublished'])
        return undefined 
      if (Date(job.fields['ExpirationDate']) < Date.now())
        return undefined 
      return true
    },
    getJobStatus(job) {
      return job.fields['Status'] || undefined
    },


  }
}
</script>


<!--
<div v-for="job of getJobs(issue)" v-if="job && job.fields['isPublished']" :key="job.fields['Name']" class="Capsid-jobs-item ">
  <div v-if="getAttachment(job)" class="Capsid-logo" >
    <img :src="getAttachment(job)" alt="Job logo">
  </div>

  <div v-if="getJobStatus(job) != 'Expired' && job.fields['Name']">
    <h5 class="Capsid-job-title _padding-top-half">{{ job.fields['Name'] }}</h5>
  </div>

  <!~~ show Org and/or Supervisor... or only the Org ~~>
  <div v-if="job.fields['Org'] || job.fields['Supervisor']" class="_flex _padding-bottom-half" >
    <div v-if="job.fields['Org']" class="_flex-grow">
      <strong class="Job-org" >{{ job.fields['Org'].join(', ') }}</strong>, <span v-if="job.fields['Location']" class="Job-location _inline-block">{{ job.fields['Location'] }}</span>
    </div>
    <div v-if="job.fields['Supervisor']" class="Job-supervisor _right-sm">
      <div>{{ job.fields['Supervisor'] }}</div>
    </div>
  </div>

  <div class="_md-p_fix" v-html="$md.render(job.fields['Markdown'] || '')" />

  <!~~ copied from the jobs page code; uses Job's page styles ~~>
  <div v-if="getJobStatus(job) != 'Expired' && job.fields['URL']" class="Job-action _margin-top-half ">
    <a v-if="job.fields['URL']" :href="job.fields['URL']" class="Job-action-apply CTA --outline _button --short _margin-bottom-none-i _margin-right-half" target="_blank">More Details</a>
    <span v-if="job.fields['ExpirationDate']" class="Job-expiry _font-small --nowrap">
      Last day: <span class="_font-bold">{{ job.fields['ExpirationDate'] | niceDate }} </span>
    </span>
  </div>

  <div v-if="job.fields['Tags'] || job.fields['JobType']" class="_margin-top-half" >
    <span v-if="job.fields['JobType']" class="_tag --highlight" >{{ job.fields['JobType'] }}</span> <span v-for="tag of job.fields.Tags" :key="tag" :class="tag == 'Sponsor' || tag == 'Promotion' ? '--sponsor' : ''" class="Capsid-item-tag _tag" >{{ tag }}</span>
  </div>
</div>
-->


