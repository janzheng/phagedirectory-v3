
<!-- 

    Directory — People — Listing
    -- rewritten for email / Capsid & Tail

 -->

<template>
  <div :id="person.fields['Slug']" class="People People-card People-card-email " >
    <div class="People-container _card ">
      <table class="" style="width: 100%;">
        <tr>
          <td class="People-profile _padding " style="" :style="isCompact == false ? 'vertical-align: top; padding-right: 16px; width: 64px;' : 'vertical-align: baseline; padding-right: 16px; width: 64px;'">
            <img alt="Profile" style="width: 64px; height: 64px; min-width: 64px; border-radius:100%; border: 3px solid #f0f0f0;" :src="profileUrl" class="--profile --medium" >
          </td>
          <!-- <div class="People-info _width-100"> -->
          <td class="People-info _padding" style="padding-left: 0;">

            <!-- basic info -->
            <div class="">

              <div class="People-name People-header-block ">

                <!-- <nuxt-link :to="`/people/${person.fields['Slug']}`">{{ person.fields['Name'] }}</nuxt-link> -->
                <div class="People-name-social">
                  <div class="People-name-social--name" style="">
                    <h3 style="padding: 0 !important; padding-right: 8px !important; margin-right: 8px; display: inline-block">{{ person.fields['Name'] }} <span v-if="person.fields['Title']" class="Dir-personTitle" style="font-size:14px;">{{ person.fields['Title'] }}</span></h3>

                    <div v-if="isCompact == false " class="People-orgs Dir-row _font-small">
                      <div v-if="roles || jobTitle" class="People-roles _margin-top-half">
                        <span v-for="role of roles" :key="role"><span class="_tag" v-if="role && role.trim().length > 0">{{ role }}</span></span>
                        <span v-if="jobTitle && jobTitle.trim().length > 0" class="_tag">{{ jobTitle }}</span>
                      </div>

                      <!-- <span v-if="person.fields['Orgs:Labs::Name'] || person.fields['Orgs:SupervisorOf::Name']">
                        <a v-if="labSlugs" :href="`https://phage.directory/labs#${ labSlugs }`" class="People-orgs-labs --url">{{ labs }}</a><span v-else>{{ labs }}</span><span v-if="isPI" class="People-orgs-PI _margin-left-half _tag">PI</span>
                      </span>
                      <span v-if="(person.fields['Orgs:Labs::Name'] || person.fields['Orgs:SupervisorOf::Name']) && orgs">, </span>
                      <span v-for="item of orgs" :key="item.name" :to="`/orgs/${person.fields['Orgs::Slugs'][0]}`" class="People-orgs-name">
                        {{ item.name +'' }}
                      </span> -->
                      <span v-if="person.fields['Orgs:Labs::Name'] || person.fields['Orgs:SupervisorOf::Name']" class="_margin-bottom-half"><nuxt-link v-if="labSlugs" :to="`/labs#${labSlugs}`" class="People-orgs-labs --url">{{ labs }}</nuxt-link><span v-else>{{ labs }}</span><span v-if="isPI" class="People-orgs-PI"> (PI)</span></span><span v-if="(person.fields['Orgs:Labs::Name'] || person.fields['Orgs:SupervisorOf::Name']) && orgs">, </span>
                      <span v-if="orgs" class="_margin-bottom-half">
                        <span v-for="(item, i) of orgs" :key="item.name" class="People-orgs-name _margin-bottom-half _margin-top-half"><!-- <span v-if="i > 0"><br> </span> --><span v-if="i > 0">, </span><nuxt-link v-if="person.fields['Orgs::Slugs'][i]" :to="`/orgs#${person.fields['Orgs::Slugs'][i]}`"> {{ item.name + '' }}</nuxt-link><span v-else> {{ item.name + '' }}</span><span v-if="item.location">, {{ item.location }}</span>
                        </span>
                        <!-- <span v-if="orgs && person.fields['Orgs:Custom']">, </span> -->
                        <span v-if="person.fields['Orgs:Custom']" class="People-orgs-custom">
                          {{ person.fields['Orgs:Custom'] }}
                        </span>
                      </span>
                    </div>
                  </div>
                  
                  <div v-if="hasSocial && isCompact == false" class="People-name-social--social" >
                    <div v-if="hasSocial" class="Dir-social Dir-title">
                      <a v-if="person.fields['Email']" :href="`mailto:${person.fields['Email']}`" class="Dir-icon --url"><img alt="Email Logo" width="23" style="position: relative; bottom: -3px; margin-right: 4px;" src="https://gallery.mailchimp.com/a95319e0a6f57b754b11012a8/images/e3602ac6-ebb1-46f6-9e7f-bdf9162a496a.png"></a>
                      <a v-if="person.fields['Social:Linkedin']" :href="`${person.fields['Social:Linkedin']}`" class="Dir-icon _linkedin --url"><img alt="Linkedin Logo" width="23" style="position: relative; bottom: -3px; margin-right: 4px;" src="https://gallery.mailchimp.com/a95319e0a6f57b754b11012a8/images/f72e244f-f5c8-40f1-b91a-4cca385411d7.png"></a>
                      <a v-if="person.fields['Social:GoogleScholar']" :href="`${person.fields['Social:GoogleScholar']}`" class="Dir-icon _googlescholar --url"><img alt="Google Scholar Logo" width="23" style="position: relative; bottom: -3px; margin-right: 4px;" src="https://gallery.mailchimp.com/a95319e0a6f57b754b11012a8/images/9cc74a05-860e-481f-8cab-6cac012dd0d2.png"></a>
                      <a v-if="person.fields['Social:ResearchGate']" :href="`${person.fields['Social:ResearchGate']}`" class="Dir-icon _researchgate --url"><img alt="ResearchGate Logo" width="23" style="position: relative; bottom: -3px; margin-right: 4px;" src="https://gallery.mailchimp.com/a95319e0a6f57b754b11012a8/images/19d367ed-ddce-4bb4-ad41-a53439520ae1.png"></a>
                      <a v-if="person.fields['Social:ORCID']" :href="`${person.fields['Social:ORCID']}`" class="Dir-icon _orcid --url"><img alt="ORCID Logo" width="23" style="position: relative; bottom: -3px; margin-right: 4px;" src="https://gallery.mailchimp.com/a95319e0a6f57b754b11012a8/images/6c0c221a-b8da-4357-8036-f35f85d39c79.png"></a>
                      <a v-if="person.fields['Social:Publons']" :href="`${person.fields['Social:Publons']}`" class="Dir-icon _publons --url"><img alt="Publons Logo" width="23" style="position: relative; bottom: -3px; margin-right: 4px;" src="https://gallery.mailchimp.com/a95319e0a6f57b754b11012a8/images/7e230d1b-4bc0-46c1-8c17-24e30ab03be9.png"></a>
                      <a v-if="person.fields['Social:Twitter']" :href="`https://twitter.com/${person.fields['Social:Twitter']}`" class="Dir-icon _twitter  --url"><img alt="Twitter Logo" width="23" style="position: relative; bottom: -3px; margin-right: 4px;" src="https://gallery.mailchimp.com/a95319e0a6f57b754b11012a8/images/e3408eaf-acf6-4250-b6fd-594e7ce23907.png"></a>
                      <a v-if="person.fields['Social:Github']" :href="`${person.fields['Social:Github']}`" class="Dir-icon _github --url"><img alt="Github Logo" width="23" style="position: relative; bottom: -3px; margin-right: 4px;" src="https://gallery.mailchimp.com/a95319e0a6f57b754b11012a8/images/70af7d76-2104-4326-8e48-f9a915a42557.png"></a>
                    </div>
                  </div>
                </div>

              </div>

            </div>

          </td>

        </tr>
      </table>

      <div v-if="isCompact == false ">
        <hr style="border-top: 2px #f0f0f0 solid; margin-top: 16px; margin-top: 16px;"> 

        <!--<div v-if="person.fields['Social:Twitter'] || url" class="People-info-block Dir-block">
          <!~~ <div><span class="Dir-label">Website</span></div> ~~>
          <!~~ <div v-if="person.fields['Expertise']" class="People-short Dir-row" >
            <span class="_md-pfix" v-html="$md.render( person.fields['Expertise'] || '')" />
          </div> ~~>
          <div v-if="person.fields['Social:Twitter']" class="Dir-row _grid-1-7-xs _align-vertically">
            <span class="Dir-label">Twitter </span><a :href="`https://twitter.com/${person.fields['Social:Twitter']}`" class="_wordbreak --url --none">@{{ person.fields['Social:Twitter'] }}</a>
          </div>
          <div v-if="url" class="Dir-row _grid-1-7-xs _align-vertically">
            <span class="Dir-label">Website </span><a :href="url" class="_wordbreak --url --none">{{ url }}</a>
          </div>
        </div>-->

        <div class="People-desc-block Dir-block">
          <div v-if="person.fields['Description']" class="People-description Dir-row" >
            <div class="_md-pfix" v-html="$md.render(person.fields['Description'] || '')" />
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
    'person': Object,
    'isCompact': Boolean,
  },
  computed: {
    hasSocial() {
      return (this.person.fields['Social:Linkedin'] || 
              this.person.fields['Social:GoogleScholar'] ||
              this.person.fields['Social:ResearchGate'] ||
              this.person.fields['Social:ORCID'] ||
              this.person.fields['Social:Twitter'] ||
              this.person.fields['Social:Twitter'] ||
              this.person.fields['Social:Github']
              )
    },
    profile() {
      if(this.person.fields['ProfileImage:URL:thumb'])
        return {
          url: this.person.fields['ProfileImage:URL:thumb']
        }
      if(this.person.fields['ProfileImage'])
        return this.person.fields['ProfileImage'][0]
      return undefined
    },
    profileUrl() {
      return this.profile ? this.profile['url'] : 'https://dl.phage.directory/.attachmentThumbnails/5f73211953262a41d993a9cd077a4ec9/370c6e95'
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

  },
  methods: {
  }
}
</script>

<style lang="scss">
  .People-name-social--name {

  }

  .People-name-social--social {

  }

</style> 





