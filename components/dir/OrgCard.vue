
<!-- 

    Directory — Org — Listing (no labs, no universities)

 -->

<template>
  <div :id="org.fields['Slug']" class="Org Org-Card Dir-card " >

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
                <h5 v-if="org.fields['AltName']" class="_font-small _padding-none">{{ org.fields['AltName'] }}</h5>
              </div>
              <div class="Dir-social Dir-title">
                <a v-if="org.fields['Email']" :href="`mailto:${org.fields['Email']}`" class="Dir-icon --url"><span class="_font-phage icon-mail-alt"/></a>
                <a v-if="org.fields['Social:Linkedin']" :href="`${org.fields['Social:Linkedin']}`" class="Dir-icon --url"><span class="_font-phage icon-linkedin"/></a>
                <a v-if="org.fields['Social:Twitter']" :href="`https://twitter.com/${org.fields['Social:Twitter']}`" class="Dir-icon --url"><span class="_font-phage icon-twitter"/></a>
              </div>
            </div>
          </div>

          <div v-if="org.fields['Org:Types:Custom']" class="_margin-top-half">
            <span class="_tag">{{ org.fields['Org:Types:Custom'] }}</span>
          </div>
          <div v-else-if="org.fields['Org:Types']" class="_margin-top-half">
            <span v-for="item of org.fields['Org:Types']" :key="item" class="_tag">{{ item }}</span>
          </div>
          <div v-if="org.fields['URL']" class="">
            <a v-if="org.fields['URL']" :href="org.fields['URL']" class="--url --none">{{ org.fields['URL'] }}</a>
          </div>
        </div>
      </div>

      <div class="People-info-block Dir-block">
        <div>
          <div v-if="org.fields['ContactPerson']" class="Dir-row-half _grid-1-6-xs _align-vertically">
            <span class="Dir-label">Contact </span><span>{{ org.fields['ContactPerson'] }}</span>
          </div>
          <div v-if="org.fields['Email']" class="Dir-row-half _grid-1-6-xs _align-vertically">
            <span class="Dir-label">Email </span><a :href="`mailto:${org.fields['Email']}`" class="_wordbreak --url --none">{{ org.fields['Email'] }}</a>
          </div>
          <div v-if="url" class="Dir-row-half _grid-1-6-xs _align-vertically">
            <span class="Dir-label">Website </span><a :href="url" class="_wordbreak --url --none">{{ url }}</a>
          </div>
        </div>
        <div>
          <div v-if="org.fields['Social:Twitter']" class="Dir-row-half _grid-1-6-xs _align-vertically">
            <span class="Dir-label">Twitter </span><a :href="`https://twitter.com/${getTwitter}`" class="_wordbreak --url --none">{{ getTwitter }}</a>
          </div>
          <div v-if="org.fields['Social:Linkedin']" class="Dir-row-half _grid-1-6-xs _align-vertically">
            <span class="Dir-label">LinkedIn </span><a :href="`${org.fields['Social:Linkedin']}`" class="_wordbreak --url --none">{{ org.fields['Social:Linkedin'] }}</a>
          </div>
        </div>
      </div>

      <div v-if="org.fields['Description']" class="Dir-people Dir-block" >
        <div v-html="$md.render(org.fields['Description'] || '')" />
      </div>

      <div v-if="org.fields['People:OrgMembers::Names']" class="Dir-people Dir-block" >
        <div><span class="Dir-label">Members</span></div>
        <div class="Dir-miniCard">
          <span v-for="(item, i) of org.fields['People:OrgMembers::Names']" 
                :key="item.id" 
                class="_commas" >
            <!-- <nuxt-link v-if="org.fields['People:OrgMembers::Slugs']" :to="`/people/${org.fields['People:OrgMembers::Slugs'][i]}`" class="--url">{{ item }}</nuxt-link> -->
            <nuxt-link v-if="org.fields['People:OrgMembers::Slugs'][i]" :to="`/people#${org.fields['People:OrgMembers::Slugs'][i]}`" class="--url">{{ item }}</nuxt-link>
            <span v-else>{{ item }}</span>
            <!-- {{ item }} // {{org.fields['People:OrgMembers::Slugs']}} // {{ i }} -->
          </span>
        </div>
      </div>

      <div v-if="linkedPhageCollections.length > 0" class="Dir-phages Dir-block" >
        <div><span class="Dir-label">Phage Collections</span></div>
        <div v-for="(item, i) of linkedPhageCollections" :key="item.id" class="Dir-miniCard">
          <div class="">
            <div class="Dir-subtitle">{{ item.fields['Name:Nice'] }}</div>
            <div>
              <nuxt-link v-if="item.fields['Owners:People::Slug'][i]" :to="`/people#${item.fields['Owners:People::Slug']}`" class="--url">{{ item.fields['Owners:People::Name'][0] }}</nuxt-link>
              <span v-else>{{ item.fields['Owners:People::Name'][0] }}</span><span v-if="item.fields['Owners:People::Roles'].length>0"> {{ item.fields['Owners:People::Roles'].join(', ') }}</span>
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
      if(this.org.fields['ProfileImage'])
        return this.org.fields['ProfileImage'][0]
      return undefined
    },
    logoUrl() {
      return this.logo ? this.logo['url'] : ''
    },

    linkedPhageCollections() {
      return this.$cytosis.getLinkedRecords(this.org.fields['PhageCollections'], this.phageCollections, true).reverse()
    },
    url() {
      let string = this.org.fields['URL']

      if (!string)
        return undefined

      if(string.substring(0,4) != 'http')
        string = 'https://' + string

      return string
    },
    getTwitter() {
      let twitter = this.org.fields['Social:Twitter']
      if(twitter.substring(0,1) == '@')
        return twitter
      else
        return '@'+twitter
    }

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


