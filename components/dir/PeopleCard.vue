
<!-- 

    Directory — People — Listing

 -->

<template>
  <div :id="person.fields['Slug']" class="People People-card Dir-card " >

    <div v-if="person.fields['Status'] != 'Published'" class="_Stage">
      Preview
    </div>

    <div class="People-container _flex-row">
      <div class="People-profile _margin-right">
        <img alt="Profile Image" :src="profileUrl" class="--profile --medium" loading="lazy">
      </div>
      <!-- <div class="People-info _width-100"> -->
      <div class="People-info _flex-1">

        <!-- basic info -->
        <div class="">

          <div class="People-name People-header-block">
            <!-- <nuxt-link :to="`/people/${person.fields['Slug']}`">{{ person.fields['Name'] }}</nuxt-link> -->

            <div class="People-name-social _flex-row _margin-bottom-half">
              <div class="Dir-title _flex-1">
                <!-- link from name is useful for C&T and other places where the card appears -->
                <nuxt-link :to="`/people#${person.fields['Slug']}`" class="--nolink">{{ person.fields['Name'] }}</nuxt-link> <span v-if="person.fields['Title']" class="Dir-personTitle">{{ person.fields['Title'] }}</span>
              </div>
              <div class="Dir-social Dir-title">
                <a v-if="person.fields['Email']" :href="`mailto:${person.fields['Email']}`" class="Dir-icon --url"><span class="_font-phage icon-mail-alt"/> </a>
                <a v-if="person.fields['Social:Linkedin']" :href="`${person.fields['Social:Linkedin']}`" class="Dir-icon --url"><span class="_font-phage icon-linkedin"/></a>
                <a v-if="person.fields['Social:GoogleScholar']" :href="`${person.fields['Social:GoogleScholar']}`" class="Dir-icon --url"><span class="_font-phage icon-google-scholar" /></a>
                <a v-if="person.fields['Social:ResearchGate']" :href="`${person.fields['Social:ResearchGate']}`" class="Dir-icon --url"><span class="_font-phage icon-researchgate" /></a>
                <a v-if="person.fields['Social:ORCID']" :href="`${person.fields['Social:ORCID']}`" class="Dir-icon --url"><span class="_font-phage icon-orcid"/></a>
                <a v-if="person.fields['Social:Publons']" :href="`${person.fields['Social:Publons']}`" class="Dir-icon --url"><span class="_font-phage icon-publons"/></a>
                <a v-if="person.fields['Social:Twitter']" :href="`${getTwitter}`" class="Dir-icon --url"><span class="_font-phage icon-twitter"/></a>
                <a v-if="person.fields['Social:Github']" :href="`${person.fields['Social:Github']}`" class="Dir-icon --url"><span class="_font-phage icon-github-circled"/></a>
              </div>
            </div>

            <div v-if="person.fields['Short']" class="People-name-short _margin-bottom">
              <div v-html="$md.strip($md.render(person.fields['Short'] || ''))" />
            </div>


            <div v-if="roles || jobTitle" class="People-roles _font-small ">
              <span v-for="role of roles" :key="role" class="_tag">{{ role }}</span>
              <span v-if="jobTitle" class="_tag">{{ jobTitle }}</span>
            </div>

            <div class="People-orgs Dir-row _margin-top _margin-bottom-2">

              <div v-if="person.fields['Orgs:Labs::Name'] || person.fields['Orgs:SupervisorOf::Name']" class="_margin-bottom-half">
                <nuxt-link v-if="labSlugs" :to="`/labs#${ labSlugs }`" class="People-orgs-labs --url">{{ labs }}</nuxt-link><span v-else>{{ labs }}</span><span v-if="isPI" class="People-orgs-PI"> (PI)</span>,
              </div>

              <div v-if="orgs" class="_margin-bottom-half">
                <div v-for="(item) of orgs" :key="item.name" class="People-orgs-name _padding-bottom-half _padding-top-half"><!-- <span v-if="i > 0"><br> </span> --><nuxt-link v-if="person.fields['Orgs::Slugs'][0]" :to="`/orgs#${person.fields['Orgs::Slugs'][0]}`"> {{ item.name +'' }}</nuxt-link><span v-else> {{ item.name +'' }}</span><span v-if="item.location">, {{ item.location }}</span>
                </div>
                <span v-if="person.fields['Orgs:Custom']" class="People-orgs-custom">
                  {{ person.fields['Orgs:Custom'] }}
                </span>
              </div>
            </div>

          </div>


          <div class="People-info-block Dir-block _margin-top-2">
            <!-- <div><span class="Dir-label">Website</span></div> -->
            <div v-if="person.fields['Email']" class="Dir-row-half _grid-1-6-xs _align-vertically">
              <span class="Dir-label">Email </span><a :href="`mailto:${person.fields['Email']}`" class="_wordbreak --url --none">{{ person.fields['Email'] }}</a>
            </div>
            <div v-if="person.fields['Social:Twitter']" class="Dir-row-half _grid-1-6-xs _align-vertically">
              <span class="Dir-label">Twitter </span><a :href="`${getTwitter}`" class="_wordbreak --url --none">{{ getTwitter }}</a>
            </div>
            <div v-if="url" class="Dir-row-half _grid-1-6-xs _align-baseline">
              <span class="Dir-label">Website </span><a :href="url" class="_wordbreak --url --none">{{ url }}</a>
            </div>

            <!-- skills here for now -->
            <div v-if="person.fields['Skills'] || person.fields['Skills:Custom']" class="People-skills Dir-row _grid-1-6-xs _align-baseline" >
              <span class="Dir-label">Skills </span><p>
                <span>{{ person.fields['Skills'] ? person.fields['Skills'].join(', ') : person.fields['Skills:Custom'] }}</span>
                <!-- <span v-for="_item of person.fields['Skills']" :key="_item" class="_wordbreak --url --none">{{ _item }}</span> -->
              </p>
            </div>
          </div>

          <div v-if="person.fields['Description']" class="People-desc-block Dir-block _margin-top-2">
            <div class="People-description Dir-row" >
              <div class="_md-pfix" v-html="$md.render(person.fields['Description'] || '')" />
            </div>
          </div>
        </div>

        <!-- phage hosts -->

        <div v-if="hostNames && hostNames.length > 0" class="People-phage-block Dir-block">
          <div class="Dir-label">Phage Hosts</div>
          <div class="Dir-miniCard">
            <div v-for="host of hostNames" :key="host[0]+'-'+person.id" class="_organism-container">
              <nuxt-link :to="`/hosts#${host[1]}`" class="_organism">{{ host[0] }}</nuxt-link>
            </div>
          </div>
        </div>

        <div v-if="manuscripts && manuscripts.length > 0" class="People-manuscripts-block Dir-block">
          <div class="Dir-miniCard">
            <h6 class="_padding-bottom-half">Capsid & Tail</h6>
            <div v-for="item of manuscripts" :key="item.id+'-'+person.fields['Slug']" class="_manuscripts-container">
              <nuxt-link :to="`/capsid/${item.fields['Slug']}`" target="_blank" class="_manuscript --nolink _margin-bottom-half _inline-block _font-small" v-html="$md.strip($md.render(item.fields['Data:IssueName'] || ''))" />
            </div>
            <div v-if="manuscripts.length > 3" class="Dir-block _font-small Dir-disabled">Number of articles: {{ manuscripts.length }}</div>
          </div>
        </div>

        <div class="People-share _font-small _margin-top-2">
          Share: <a :href="`https://phage.directory/people#${person.fields['Slug']}`" >https://phage.directory/people#{{ person.fields['Slug'] }}</a>
        </div>
      </div>
    
    </div>
  </div>
</template>

<script>

// import { mapState } from 'vuex'

export default {
  props: {
    'person': Object,
    'manuscripts': Array, // array of a person's manuscripts (e.g. Capsid)
  },
  computed: {
    profile() {
      if(this.person.fields['ProfileImage'])
        return this.person.fields['ProfileImage'][0]
      return undefined
    },
    profileUrl() {
      return this.profile && this.profile['thumbnails'] ? this.profile['thumbnails']['large']['url'] : 'https://dl.airtable.com/.attachmentThumbnails/5f73211953262a41d993a9cd077a4ec9/370c6e95'
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
          location: this.person.fields['Orgs::Location'][i],
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
      // wrap the custom role in an array
      return this.person.fields['Roles:Custom'] ? [this.person.fields['Roles:Custom']] : this.person.fields['Roles']
    },
    jobTitle() {
      return this.person.fields['JobTitle']
    },
    isPI() {
      if (this.person.fields['Orgs:Labs:isPI'])
        return true
      return false
    },
    getTwitter() {
      let twitter = this.person.fields['Social:Twitter']
      if(twitter.substring(0,1) == '@')
        return 'https://twitter.com/' + twitter
      else if(twitter.substring(0,4) == 'http')
        return twitter
      else
        return 'https://twitter.com/' + twitter
    }

  },
  methods: {

  }
}
</script>


<style lang="scss">
  ._Stage {
    font-size: 14px; 
    margin-bottom: 16px;
    padding: 6px;
  }
</style>



