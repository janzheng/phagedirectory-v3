
<!-- 

    Directory — People — Listing

 -->

<template>
  <div :id="person.fields['Slug']" class="People People-Card Dir-card _padding _margin-bottom " >
    <div class="People-container _flex-row">
      <div class="People-profile _margin-right">
        <img :src="profileUrl" class="--profile --medium" >
      </div>
      <div class="People-info _width-100">

        <!-- basic info -->
        <div class="Dir-basic Dir-section">

          <div class="People-name _flex-row _flex-vertically">
            <div class="Dir-title _flex-1">
              <!-- <router-link :to="`/people/${person.fields['Slug']}`">{{ person.fields['Name'] }}</router-link> -->
              <span>{{ person.fields['Name'] }}</span>
            </div>
            <div class="Dir-social ">
              <a v-if="person.fields['Social:Twitter']" :href="`https://twitter.com/${person.fields['Social:Twitter']}`" class="Dir-icon --url"><span class="_font-phage icon-twitter"/></a>
              <a v-if="person.fields['Social:Linkedin']" :href="`${person.fields['Social:Linkedin']}`" class="Dir-icon --url"><span class="_font-phage icon-linkedin"/></a>
              <a v-if="person.fields['Social:GoogleScholar']" :href="`${person.fields['Social:GoogleScholar']}`" class="Dir-icon --url"><span class="_font-phage icon-google-scholar" /></a>
              <a v-if="person.fields['Social:ResearchGate']" :href="`${person.fields['Social:ResearchGate']}`" class="Dir-icon --url"><span class="_font-phage icon-researchgate" /></a>
              <a v-if="person.fields['Social:ORCID']" :href="`https://orcid.org/${person.fields['Social:ORCID']}`" class="Dir-icon --url"><span class="_font-phage icon-orcid"/></a>
            </div>
          </div>

          <div class="People-orgs">
            <div v-if="roles" class="People-roles Dir-highlight">{{ roles }}</div>
            <span v-if="person.fields['Orgs:Labs::Name'] || person.fields['Orgs:SupervisorOf::Name']">
              <router-link :to="`/labs#${ labSlugs }`" class="--url">{{ labs }}</router-link><span v-if="isPI" class="_margin-left-half _tag">PI</span>,
            </span>
            <span v-for="item of orgs" :key="item.name" :to="`/orgs/${person.fields['Orgs::Slugs'][0]}`" class="--url">
              {{ item.name +'' }}
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
        <div v-if="hostNames && hostNames.length > 0" class="People-phageHosts _margin-top">
          <!-- <h6 class="Dir-section-title">Phage Hosts</h6> -->
          <!-- <span class="Dir-label">Phage Hosts:</span> -->
          <div v-for="host of hostNames" :key="host[0]" >
            <!-- <span class="_organism">{{ organism }}</span> -->
            <router-link :to="`/hosts#${host[1]}`" class="_organism">{{ host[0] }}</router-link>
          </div>
        </div>

      </div>
    
    </div>
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
      const names = this.person.fields['PhageCollections:Hosts::Names']
      const slugs = this.person.fields['PhageCollections:Hosts::Slugs']

      let hosts = names.map((name,i) => {
        return [name, slugs[i]]
      }).sort((a,b) => ('' + a[0]).localeCompare(b[0]) )

      // const names = this.$cytosis.deduplicate(this.person.fields['PhageCollections:Hosts::Names'])
      return hosts
    },
    labs() {
      return this.person.fields['Orgs:Labs::Name'] ? this.person.fields['Orgs:Labs::Name'] + '': this.person.fields['Orgs:SupervisorOf::Name'] + ''
    },
    labSlugs() {
      return this.person.fields['Orgs:Labs::Slug'] ? this.person.fields['Orgs:Labs::Slug'] + '' : this.person.fields['Orgs:SupervisorOf::Slug'] + ''
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


