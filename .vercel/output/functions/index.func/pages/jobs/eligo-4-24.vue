<template>
  <div class="Jobs">
    <Template>

      <template #container>

        <div class="_section-article _margin-center">
          
          <div :class="atom.fields['Data:Status']" class="Job _card _padding " >

            <div v-if="atom.fields['Data:Categories']" class="Job-header ">

              <div class="_grid-1-auto _align-vertically _margin-bottom _grid-gap-small">
                <div>
                  <span v-if="atom.fields['Data:Type']" class="Job-type _tag --highlight --nowrap _margin-bottom-none-i">{{ atom.fields['Data:Type'] }}</span><span v-if="atom.fields['Data:Categories']" class="Job-type _tag --nowrap _margin-bottom-none-i">
                    {{ atom.fields['Data:Categories'][0] }}
                  </span>
                </div>
                <div class="Job-date _right-sm _font-small">
                  <span>Posted {{ atom.fields['Data:Date'] | dateTo }}</span>
                </div>
              </div>


              <div v-if="getCover" class="Job-logo _margin-bottom-2" >
                <img :src="getCover" alt="Job logo" style="max-width: 240px">
              </div>

              <div class="Job-title _font-bold _margin-top-half ">
                <h5 v-if="atom.fields['Data:Title']" class="_inline _md-p_fix _padding-bottom-half" v-html="$md.strip($md.render( atom.fields['Data:Title'] || ''))" />
              </div>

              <div class="Job-tags _margin-bottom-half">
                <span v-for="item of atom.fields['Data:Tags']" :key="atom.id + item" class="Job-tag _tag --nowrap">{{ item }}</span>
              </div>

              <div class="Job-info _margin-bottom _margin-top">
                <div v-if="atom.fields['Data:Source']">
                  <strong>{{ atom.fields['Data:Source'] }}</strong>
                </div>
                <div v-if="atom.fields['Data:Subtitle']" v-html="$md.render(atom.fields['Data:Subtitle'] || '')" />
              </div>

              <div class="Job-info _margin-bottom _margin-top">
                <div v-if="atom.fields['URL']">
                  <span>Website:</span> <a target="_blank" :href="`${atom.fields['URL']}?utm_source=phage-directory`" class="_wordbreak --url --none">{{ atom.fields['URL'] }}</a>
                </div>
              </div>

              <div class="Job-apply-cta _margin-top-2 _margin-bottom">
                <a target="_blank" :href="`${atom.fields['URL']}?utm_source=phage-directory`" class="CTA --bright --outline">Apply here</a>
              </div>

            </div>

            <div class="Job-content">
              <!-- 2019 style w/ lots of metadata-->
              <div v-if="atom.fields['Data:Categories']" v-html="$md.render(atom.fields['Data:Content'] || '')" />
              <!-- no metadata -->
              <div v-if="!atom.fields['Data:Categories']" v-html="$md.strip($md.render(atom.fields['Data:Content'] || ''))" />
            </div>

            <div v-if="!isExpired && atom.fields['URL']" class="Job-action _margin-top">
              <a v-if="atom.fields['URL']" :href="`${atom.fields['URL']}?utm_source=phage-directory-jobs`" class="Job-action-apply _button CTA --bright --outline _margin-top _margin-bottom-none-i _margin-right-half" target="_blank">Apply here</a>

              <span v-if="atom.fields['Data:DateEnd']" class="Job-expiry _font-small --nowrap">
                Last day to apply: <span class="_font-bold">{{ atom.fields['Data:DateEnd'] | niceDate }} </span>
              </span>
            </div>
            <div v-else>
              <span v-if="atom.fields['URL']" class="Job-action-apply _button --short --disabled --outline _margin-bottom-none _margin-right-half" >Job expired</span>
            </div>

          </div>


          <!-- <div v-if="job" class="_card _padding">
            <div class="_margin-bottom">
              <img :src="`${job.fields['Attachments'][0]['url']}`" :alt="job.fields['Data:Source']" >
            </div>
            <h2>{{ job.fields['Data:Title'] }}</h2>

            <div class=" _margin-top-2">
              <div class="Dir-row-half _grid-1-4-xs _align-vertically">
                <span class="_font-bold">Posted Date:</span><span>{{ job.fields['Data:Date'] }}</span>
                <span class="_font-bold">Location:</span><span class="_wordbreak --url --none">{{ job.fields['Data:Subtitle'] }}</span>
                <span class="_font-bold">Apply here:</span><a :href="`${job.fields['URL']}`" class="_wordbreak --url --none">{{ job.fields['URL'] }}</a>
              </div>
            </div>

            {{ job.fields['Attachments'][0]['url'] }}
            <hr >
            {{ job }}


          </div > -->

        </div>

      </template>
      
    </Template>

  </div>
</template>




<script>

import { mapState } from 'vuex'
// import { loadQuery } from '~/other/loaders'
// import Job from '~/components/Job.vue'
// import Template from '~/templates/context.vue'
import Template from '~/templates/article.vue'
// import Tabbed from '~/components/layout/Tabbed.vue'
// import NodeForm from '~/components/render/NodeForm.vue'

export default {

  components: {
    // Job,
    Template,
    // Tabbed,
    // NodeForm,
  },

  layout: 'contentframe',
  middleware: 'pageload',
  meta: {
    tableQueries: ["_content-copy", "atoms-jobs-preview"],
    refreshOnLoad: true,
  },

  data () {

    return {
      atom: this.$cytosis.findOne('Eligo Bacteriophage Formulation Scientist', this.$store.state['Atoms'] ),

    }
  },
  
  computed: {
    ...mapState([
      'Atoms',
      ]),
    isExpired() {
      if( this.atom.fields['Data:Status'] == 'Expired' ) return true
      return undefined
    },

    getCover() {
      // currently only works for the first attachment
      if(this.atom.fields['Cover'])
        return this.atom.fields['Cover'][0]['url']
      return undefined
    },
  },


  mounted () {
  },

  methods: {
    tabClick(item, key) {
      this.activeTab = key
    },
  },


}
</script>

<style>
</style>

