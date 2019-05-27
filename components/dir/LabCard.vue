
<!-- 

    Directory — Lab — Listing

 -->

<template>
  <div class="Lab Lab-Card Dir-card _padding _margin-bottom " >

    <div class="Lab-container _flex-row">
      <div class="Lab-profile ">
        <!-- <img :src="profileUrl" class="--profile --medium _margin-right"/> -->
      </div>
      <div class="Lab-info _width-100">

        <!-- basic info -->
        <div class="Lab-basic Dir-section">

          <div class="Lab-name _flex-row _flex-vertically">
            <div class="Dir-title _flex-1">
              <!-- <router-link :to="`/labs/${item.fields['Slug']}`">{{ item.fields['Name'] }}</router-link> -->
              <span>{{ lab.fields['Name'] }}</span>
            </div>
            <div class="Dir-social ">
              <a v-if="lab.fields['Social:Twitter']" :href="`https://twitter.com/${lab.fields['Social:Twitter']}`" class="Dir-icon --url"><span class="_font-phage icon-twitter" /></a>
              <a v-if="lab.fields['Social:Linkedin']" :href="`${lab.fields['Social:Linkedin']}`" class="Dir-icon --url"><span class="_font-phage icon-linkedin" /></a>
            </div>
          </div>

          <div class="Lab-parent Dir-subtitle">
            <router-link :to="`/orgs/${ lab.fields['Orgs:Parent:Slug'] }`" class="--url">{{ lab.fields['Orgs:Parent:Name'] +'' }}</router-link>
          </div>
          <div v-if="lab.fields['Short']" class="Dir-short">
            {{ lab.fields['Short'] }}
          </div>
          <div v-if="url" class="Dir-link _padding-top _padding-bottom">
            Website: <a :href="url" class="_wordbreak --url">{{ url }}</a>
          </div>
          <div v-if="PIs" class="_padding-top _padding-bottom">
            Principal Investigator<span v-if="PIs.length>1">s</span>: 
            <span v-for="item of PIs" :key="item.name">
              <a v-if="item.slug" :href="`/people/${item.slug}`" class="_wordbreak --url _block">{{ item.name }}</a>
              <span v-else>{{ item.name }}</span>
            </span>
          </div>
          <div v-if="members" class="_padding-top _padding-bottom">
            <!-- Lab Member<span v-if="members.length>1">s</span>:  -->
            Lab members:
            <a v-for="item of members" :key="item.name" :href="`/people/${item.slug}`" class="_wordbreak --url _block">{{ item.name }}</a>
          </div>

          <div class="">
            Phage Collections::: 
            <div v-for="item of getPhageCollections" :key="item.id" class="">
              {{ item.fields['Name:Nice'] }} — 
              <router-link :to="`/people/${item.fields['Owners:People::Slug']}`">{{ item.fields['Owners:People::Name'][0] }}</router-link> / {{ item.fields['Owners:People::Roles'].join(', ') }}

              <div v-for="hosts of sortHostNames(item)" :key="hosts">
                {{ hosts }}
              </div>
            </div>
          </div>
        </div>

        <!-- <div v-if="hostNames && hostNames.length>0" 
          class="">
          <div class="Lab-phageHosts" >
            <div v-for="organism of hostNames" :key="organism" >
              <span class="--organism">{{ organism }}</span>
            </div>
          </div>
        </div> -->

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
    'lab': Object,
    'phageCollections': Array,
  },
  computed: {
    profile() {
      if(this.lab.fields['Profile'])
        return this.lab.fields['Profile'][0]
      return undefined
    },
    profileUrl() {
      return this.profile ? this.profile['url'] : 'https://dl.airtable.com/.attachmentThumbnails/5f73211953262a41d993a9cd077a4ec9/370c6e95'
    },
    hostNames() {
      if(!this.lab.fields['PhageCollections:Hosts::Names'])
        return undefined
      const names = this.$cytosis.deduplicate(this.lab.fields['PhageCollections:Hosts::Names'])
      return names.sort()
    },
    orgNames() {
      let string = this.lab.fields['Orgs::Name'] + '' // casts this into a string
      if (this.lab.fields['Orgs:Labs::Name'])
        string += `, ${this.lab.fields['Orgs:Labs::Name']}`
      return string
    },
    url() {
      let string = this.lab.fields['URL']

      if (!string)
        return undefined

      if(string.substring(0,4) != 'http')
        string = 'https://' + string

      return string
    },
    roles() {
      let string = this.lab.fields['Roles']

      if(!string)
        return undefined

      return string.join(', ')
    },
    PIs() {
      if (!this.lab.fields['People:Supervisor'])
        return undefined
      let arr = []
      this.lab.fields['People:Supervisors::Names'].map((item, i) => {
        arr.push({
          name: this.lab.fields['People:Supervisors::Names'][i],
          slug: this.lab.fields['People:Supervisors::Slugs'] ? this.lab.fields['People:Supervisors::Slugs'][i] : '',
        })
      })
      return arr
    },
    members() {
      if (!this.lab.fields['People:LabMembers::Names'])
        return undefined
      let arr = []
      this.lab.fields['People:LabMembers::Names'].map((item, i) => {
        arr.push({
          name: this.lab.fields['People:LabMembers::Names'][i],
          slug: this.lab.fields['People:Supervisors::Slugs'] ? this.lab.fields['People:Supervisors::Slugs'][i] : '',
        })
      })
      return arr
    },

    getPhageCollections() {
      return this.$cytosis.getLinkedRecords(this.lab.fields['PhageCollections'], this.phageCollections, true).reverse()
    }


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
    sortHostNames(item) {
      return item.fields['Hosts::Names'].concat().sort()
    },

  }
}
</script>


