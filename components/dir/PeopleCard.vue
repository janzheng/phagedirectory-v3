
<!-- 

    Directory — People — Listing

 -->

<template>
  <div class="People People-Card Dir-card _padding _margin-bottom " >
    <div class="People-container _flex-row">
      <div class="People-profile _margin-right">
        <img :src="profileUrl" class="--profile --medium" >
      </div>
      <div class="People-info _width-100">

        <!-- basic info -->
        <div class="People-basic Dir-section">

          <div class="People-name _flex-row _flex-vertically">
            <div class="Dir-title _flex-1">
              <router-link :to="`/people/${person.fields['Slug']}`">{{ person.fields['Name'] }}</router-link>
            </div>
            <div class="Dir-social ">
              <a v-if="person.fields['Social:Twitter']" :href="`https://twitter.com/${person.fields['Social:Twitter']}`" class="Dir-icon --url"><span class="_font-phage icon-twitter"/></a>
              <a v-if="person.fields['Social:Linkedin']" :href="`${person.fields['Social:Linkedin']}`" class="Dir-icon --url"><span class="_font-phage icon-linkedin"/></a>
              <a v-if="person.fields['Social:GoogleScholar']" :href="`${person.fields['Social:GoogleScholar']}`" class="Dir-icon --url"><span class="_font-phage icon-google-scholar" /></a>
              <a v-if="person.fields['Social:ResearchGate']" :href="`${person.fields['Social:ResearchGate']}`" class="Dir-icon --url"><span class="_font-phage icon-researchgate" /></a>
              <a v-if="person.fields['Social:ORCID']" :href="`https://orcid.org/${person.fields['Social:ORCID']}`" class="Dir-icon --url"><span class="_font-phage icon-orcid"/></a>
            </div>
          </div>

          <div class="People-orgs Dir-subtitle">
            <span v-if="roles" class="People-roles">{{ roles }}</span>
            <router-link v-for="item of orgs" :key="item.name" :to="`/orgs/${ person.slug }`" class="--url">{{ item.name +'' }}</router-link><span v-if="item.fields['Orgs:Labs::Name']">,
              <router-link :to="`/labs#${item.fields['Orgs:Labs::Slug'][0]}`" class="--url">{{ item.fields['Orgs:Labs::Name'] +'' }}</router-link>
              <span v-if="isPI" class="_margin-left-half _tag">PI</span>
            </span>
            <!-- <span v-if="isPI" class="">(PI)</span> -->
          </div>
          <div v-if="person.fields['Short']" class="Dir-short Dir-subtitle" >
            {{ person.fields['Short'] }}
          </div>
          <div v-if="url" class="Dir-link Dir-subtitle">
            <a :href="url" class="_wordbreak --url">{{ url }}</a>
          </div>
        </div>

        <!-- phage hosts -->
        <div v-if="hostNames && hostNames.length>0" class="People-phageHosts _padding-top">
          <!-- <h6 class="Dir-section-title">Phage Hosts</h6> -->
          <div class="" >
            <!-- <span class="Dir-label">Phage Hosts:</span> -->
            <div v-for="organism of hostNames" :key="organism" >
              <span class="--organism">{{ organism }}</span>
            </div>
          </div>
        </div>

      </div>
    
    </div>
    <!-- <div v-if="getCover" class="Capsid-logo" >
      <img :src="getCover" alt="Job logo">
    </div>

    <div class="_flex-1">
      <h5 class="" v-html="$md.strip($md.render(atom.fields['Data:Title'] || ''))" />
      <div v-if="atom.fields['Data:Source']" v-html="$md.render(atom.fields['Data:Source'] || '')" />
      <div v-if="atom.fields['Data:Subtitle']" v-html="$md.render(atom.fields['Data:Subtitle'] || '')" />
      <div v-if="atom.fields['Markdown']" v-html="$md.render(atom.fields['Markdown'] || '')" />
    </div>

    <div v-if="atom.fields['Data:Status'] != 'Expired' && atom.fields['URL']" class=" _margin-top-half ">
      <a v-if="atom.fields['URL']" :href="atom.fields['URL']" class="Job-action-apply --outline _button --short _margin-bottom-none-i _margin-right-half" target="_blank">More Details</a>
      <span v-if="atom.fields['Data:DateEnd']" class="Job-expiry _font-small --nowrap">
        Last day: <span class="_font-bold">{{ atom.fields['Data:DateEnd'] | niceDate }} </span>
      </span>
    </div>

    <div class="_margin-top-half" >
      <span v-if="atom.fields['Data:Categories']" class="_tag --highlight" >{{ atom.fields['Data:Categories'][0] }}</span> 
      <span v-for="item of atom.fields['Data:Tags']" :key="item" :class="item == 'Sponsor' || item == 'Promotion' ? '--sponsor' : ''" class="Capsid-item-tag _tag" >{{ item }}</span>
    </div> -->
  </div>
</template>

<script>

// import { mapState } from 'vuex'

export default {
  props: {
    'person': Object
  },
  computed: {
    profile() {
      if(this.person.fields['Profile'])
        return this.person.fields['Profile'][0]
      return undefined
    },
    profileUrl() {
      return this.profile ? this.profile['url'] : 'https://dl.airtable.com/.attachmentThumbnails/5f73211953262a41d993a9cd077a4ec9/370c6e95'
    },
    hostNames() {
      if(!this.person.fields['PhageCollections:Hosts::Names'])
        return undefined
      const names = this.$cytosis.deduplicate(this.person.fields['PhageCollections:Hosts::Names'])
      return names.sort()
    },
    orgs() {
      // let string = this.item.fields['Orgs::Name'] + '' // casts this into a string
      // return string
      if (!this.person.fields['Orgs::Names'])
        return undefined

      let arr = []
      this.person.fields['Orgs::Names'].map((item, i) => {
        arr.push({
          name: this.person.fields['Orgs::Names'][i],
          slug: this.person.fields['Orgs::Slugs'] ? this.person.fields['Orgs::Slugs'][i] : '',
        })
      })
      return arr
    },
    url() {
      let string = this.person.fields['URL']

      if (!string)
        return undefined

      if(string.substring(0,4) != 'http')
        string = 'https://' + string

      return string
    },
    roles() {
      let string = this.person.fields['Roles']

      if(!string)
        return undefined

      return string.join(', ')
    },
    isPI() {
      if (this.person.fields['Orgs:Labs:isPI'])
        return true
      return false
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


