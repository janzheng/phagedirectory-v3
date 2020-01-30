
<!-- 

    Directory — Lab — Listing

 -->

<template>
  <div :id="lab.fields['Slug']" class="Lab Lab-Card Dir-card " >

    <div class="Lab-container">
      <!-- <div class="Lab-profile "> -->
      <!-- <img :src="profileUrl" class="--profile --medium _margin-right"/> -->
      <!-- </div> -->
      <div class="Lab-info _width-100">

        <div class=" Dir-section _flex-row _flex-vertically">
          <div class="Dir-title _flex-1">
            <!-- <nuxt-link :to="`/labs/${item.fields['Slug']}`">{{ item.fields['Name'] }}</nuxt-link> -->
            <span>{{ lab.fields['Name'] }}</span>
          </div>
          <div class="Dir-social ">
            <a v-if="lab.fields['Social:Twitter']" :href="`https://twitter.com/${lab.fields['Social:Twitter']}`" class="Dir-icon --url"><span class="_font-phage icon-twitter" /></a>
            <a v-if="lab.fields['Social:Linkedin']" :href="`${lab.fields['Social:Linkedin']}`" class="Dir-icon --url"><span class="_font-phage icon-linkedin" /></a>
          </div>
        </div>

        <div class="Dir-body _grid-1-2 _grid-gap-large"><!-- basic info -->
          <div class="Dir-section Dir-basic">
            <div v-if="lab.fields['Markdown']" class="Dir-description Dir-block">
              {{ lab.fields['Markdown'] }}
            </div>
            <div v-if="lab.fields['Orgs:Parent:Name']" class="Lab-parent Dir-block">
              <div class="Dir-label">University</div>
              <span>{{ lab.fields['Orgs:Parent:Name'] +'' }}</span>
            </div>
            <div v-if="url" class="Dir-link Dir-block">
              <div class="Dir-label">Website</div>
              <a :href="url" class="_wordbreak --url">{{ url }}</a>
            </div>
            <div v-if="lab.fields['Social:Twitter']" class="Dir-link Dir-block">
              <div class="Dir-label">Twitter</div>
              <a :href="`https://twitter.com/${lab.fields['Social:Twitter']}`" class="_wordbreak --url">{{ getTwitter }}</a>
            </div>
            <div v-if="PIs" class="Dir-block">
              <div class="Dir-label">Principal Investigator<span v-if="PIs.length>1">s</span></div>
              <span v-for="item of PIs" :key="item.name">
                <a v-if="item.slug" :href="`/people#${item.slug}`" class="_wordbreak --url _block">{{ item.name }}</a>
                <div v-else>{{ item.name }}</div>
              </span>
            </div>
            <div v-if="contactPersons" class="Dir-block">
              <div class="Dir-label">Lab Contact<span v-if="contactPersons.length>1">s</span></div>
              <span v-for="item of contactPersons" :key="item.name">
                <a v-if="item.slug" :href="`/people#${item.slug}`" class="_wordbreak --url _block">{{ item.name }}</a>
                <div v-else>{{ item.name }}</div>
              </span>
            </div>
            <div v-if="members" class="Dir-block">
              <div class="Dir-label">
                <!-- Lab members -->
                Lab Member<span v-if="members.length>1">s</span>
              </div>
              <div v-for="item of members" :key="item.name" >
                <a v-if="item.slug" :href="`/people#${item.slug}`" class="_wordbreak --url _block">{{ item.name }}
                </a>
                <div v-else>{{ item.name }}</div>
              </div>
            </div>
          </div>

          <!-- phage collections -->
          <div class="Dir-phages">
            <div>
              <span class="Dir-label">Phage Collections</span>
            </div>
            <div v-if="linkedPhageCollections.length == 0" class="Dir-miniCard">
              <!-- empty state -->
              No phage hosts added yet
            </div>
            <div v-for="item of linkedPhageCollections" :key="item.id" class="Dir-miniCard">
              <div class="">
                <div class="Dir-row">{{ item.fields['Name:Nice'] }}</div>
                <div class="Dir-row">
                  <nuxt-link v-if="item.fields['Owners:People::Name'][0]" :to="`/people#${item.fields['Owners:People::Slug']}`" class="--url">{{ item.fields['Owners:People::Name'][0] }}, </nuxt-link>{{ item.fields['Owners:People::Roles'].join(', ') }}
                </div>
              </div>
              <div class="Dir-block">
                <div v-for="host of sortHostNames(item)" :key="host[0]" >
                  <nuxt-link :to="`/hosts#${host[1]}`" class="_organism">{{ host[0] }}</nuxt-link>
                </div>
              </div>
              <div class="Dir-block _font-small Dir-disabled">Phage hosts: {{ sortHostNames(item).length }}</div>

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
    'lab': Object,
    'phageCollections': Array,
  },
  computed: {
    getTwitter() {
      let twitter = this.lab.fields['Social:Twitter']
      if(twitter.substring(0,1) == '@')
        return twitter
      else
        return '@'+twitter
    },

    url() {
      let string = this.lab.fields['URL']

      if (!string)
        return undefined

      if(string.substring(0,4) != 'http') {
        string = 'https://' + string
      }

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
    contactPersons() {
      if (!this.lab.fields['People:Contact::Names'])
        return undefined

      let arr = []
      this.lab.fields['People:Contact::Names'].map((item, i) => {
        let slug = ""
        // if (this.lab.fields['People:Supervisors::Slugs'])
        //   slug = this.lab.fields['People:Supervisors::Slugs'][i]
        if (this.lab.fields['People:Contact::Slugs'])
          slug = this.lab.fields['People:Contact::Slugs'][i]

        arr.push({
          name: this.lab.fields['People:Contact::Names'][i],
          slug: slug, 
        })
      })
      return arr
    },
    members() {
      if (!this.lab.fields['People:LabMembers::Names'])
        return undefined
      let arr = []
      this.lab.fields['People:LabMembers::Names'].map((item, i) => {
        let slug = ""
        // if (this.lab.fields['People:Supervisors::Slugs'])
        //   slug = this.lab.fields['People:Supervisors::Slugs'][i]
        if (this.lab.fields['People:LabMembers::Slugs'])
          slug = this.lab.fields['People:LabMembers::Slugs'][i]

        arr.push({
          name: this.lab.fields['People:LabMembers::Names'][i],
          slug: slug, 
        })
      })
      return arr
    },

    linkedPhageCollections() {
      return this.$cytosis.getLinkedRecords(this.lab.fields['PhageCollections'], this.phageCollections, true).reverse()
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


