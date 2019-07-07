
<!-- 

    Directory — Org — Listing (no labs, no universities)

 -->

<template>
  <div class="Org Org-Card Dir-card " >

    <div class="Org-container">
      <div class="Org-info _width-100" :class="logoUrl ? '_grid-1-3' : ''">
        <div v-if="logoUrl" class="Dir-logo" >
          <a :href="org.fields['URL']" class="_inline-block"><img :src="logoUrl" class="" :alt="`${org.fields['Name']} Logo`"></a>
        </div>
        <div class="">
          <div class="">
            <div class="Org-name-social _flex-row">
              <div class="_flex-1">
                <div class="Dir-title --title _padding-bottom-none-i">{{ org.fields['Name'] }}</div>
              </div>
              <div class="Dir-social Dir-title">
                <a v-if="org.fields['Social:Linkedin']" :href="`${org.fields['Social:Linkedin']}`" class="Dir-icon --url"><span class="_font-phage icon-linkedin"/></a>
                <a v-if="org.fields['Social:Twitter']" :href="`https://twitter.com/${org.fields['Social:Twitter']}`" class="Dir-icon --url"><span class="_font-phage icon-twitter"/></a>
              </div>
            </div>
            <h5 v-if="org.fields['AltName']" class="_font-normal _padding-none">{{ org.fields['AltName'] }}</h5>
          </div>

          <!-- <div class="People-name-social _flex-row">
            <div class="Dir-title _flex-1">
              {{ person.fields['Name'] }} <span v-if="person.fields['Title']" class="Dir-personTitle">{{ person.fields['Title'] }}</span>
            </div>
            <div class="Dir-social Dir-title">
              <a v-if="person.fields['Social:Linkedin']" :href="`${person.fields['Social:Linkedin']}`" class="Dir-icon --url"><span class="_font-phage icon-linkedin"/></a>
              <a v-if="person.fields['Social:GoogleScholar']" :href="`${person.fields['Social:GoogleScholar']}`" class="Dir-icon --url"><span class="_font-phage icon-google-scholar" /></a>
              <a v-if="person.fields['Social:ResearchGate']" :href="`${person.fields['Social:ResearchGate']}`" class="Dir-icon --url"><span class="_font-phage icon-researchgate" /></a>
              <a v-if="person.fields['Social:ORCID']" :href="`https://orcid.org/${person.fields['Social:ORCID']}`" class="Dir-icon --url"><span class="_font-phage icon-orcid"/></a>
              <a v-if="person.fields['Social:Twitter']" :href="`https://twitter.com/${person.fields['Social:Twitter']}`" class="Dir-icon --url"><span class="_font-phage icon-twitter"/></a>
            </div>
          </div> -->

          <div v-if="org.fields['Org:Types']" class="_margin-top-half">
            <span v-for="item of org.fields['Org:Types']" :key="item" class="_tag">{{ item }}</span>
          </div>
          <div v-if="org.fields['URL']" class="">
            <a v-if="org.fields['URL']" :href="org.fields['URL']" class="--url --none">{{ org.fields['URL'] }}</a>
          </div>
        </div>
      </div>

      <div v-if="org.fields['People:OrgMembers::Names']" class="Dir-people Dir-block" >
        <div><span class="Dir-label">Members</span></div>
        <div class="Dir-miniCard">
          <span v-for="(item, i) of org.fields['People:OrgMembers::Names']" 
                :key="item.id" 
                class="_commas" >
            <!-- <nuxt-link v-if="org.fields['People:OrgMembers::Slugs']" :to="`/people/${org.fields['People:OrgMembers::Slugs'][i]}`" class="--url">{{ item }}</nuxt-link> -->

            <nuxt-link v-if="org.fields['People:OrgMembers::Slugs']" :to="`/people#${org.fields['People:OrgMembers::Slugs'][i]}`" class="--url">{{ item }}</nuxt-link>
            <span v-else>{{ item }}</span>
            <!-- {{ item }} // {{org.fields['People:OrgMembers::Slugs']}} // {{ i }} -->
          </span>
        </div>
      </div>

      <div v-if="linkedPhageCollections.length > 0" class="Dir-phages Dir-block" >
        <div><span class="Dir-label">Phage Collections</span></div>
        <div v-for="item of linkedPhageCollections" :key="item.id" class="Dir-miniCard">
          <div class="">
            <div class="Dir-subtitle">{{ item.fields['Name:Nice'] }}</div>
            <div>
              <nuxt-link :to="`/people#${item.fields['Owners:People::Slug']}`" class="--url">{{ item.fields['Owners:People::Name'][0] }}</nuxt-link>, {{ item.fields['Owners:People::Roles'].join(', ') }}
            </div>
            <div class="Dir-block">Phage hosts: {{ sortHostNames(item).length }}</div>
          </div>
          <div class="Dir-block">
            <div v-for="host of sortHostNames(item)" :key="host[0]" >
              <nuxt-link :to="`/hosts#${host[1]}`" class="_organism">{{ host[0] }}</nuxt-link>
            </div>
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
    'org': Object,
    'phageCollections': Array,
  },
  computed: {
    logo() {
      if(this.org.fields['Logo'])
        return this.org.fields['Logo'][0]
      return undefined
    },
    logoUrl() {
      return this.logo ? this.logo['url'] : ''
    },

    linkedPhageCollections() {
      return this.$cytosis.getLinkedRecords(this.org.fields['PhageCollections'], this.phageCollections, true).reverse()
    },

  },
  methods: {
    sortHostNames(item) {
      // return item.fields['Hosts::Names'].concat().sort()

      const names = item.fields['Hosts::Names']
      const slugs = item.fields['Hosts::Slugs']

      let hosts = names.map((name,i) => {
        return [name, slugs[i]]
      })
      hosts = hosts.sort((a,b) => {
        return ('' + a[0]).localeCompare(b[0])
      } )
      return hosts
    },

  }
}
</script>


