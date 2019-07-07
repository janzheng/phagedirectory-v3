
<!-- 

  /capsid/ — displays a list of capsid and tail issues

 -->


<template>
  <div class="Capsid Capsid-List">

    <div class="_section-page _margin-center">
      <div class="_section-content _margin-center">
        <div class="Capsid-masthead _margin-center">
          <nuxt-link to="/capsid" class="_grid-auto-1-xs _align-vertically --underline-none">
            <img class="cnt _block _margin-center" src="/cnt.png" width="120px" alt="Capsid and Tail">
            <div class="Capsid-masthead-title _left _font-serif">
              A weekly phage periodical
            </div>
          </nuxt-link>
        </div>
        <!-- 
          <div class="_margin-center _section-article">
            <div class="_margin-bottom" v-html="$md.render(writeforus || '')" />
          </div> 
        -->
      </div>
    </div>



    <div class="_section-content _margin-center-sm _margin-left-xs _margin-right-xs">
      <CapsidStub :issue="latest" :is-featured="true" class="Capsid-latest" />
    </div>

    <div class="_section-article _margin-center ">
      <!-- <div class="" v-html="$md.render(signup || '')" /> -->
      <CapsidSignup />

      <div class="_margin-center _margin-top-2 _section-article">
        <div class="_margin-bottom" v-html="$md.render(message || '')" />
      </div>
    </div>
    
    <div class="_section-content _margin-center">
      <div class="_grid-2 _margin-left-xs _margin-right-xs">
        <CapsidStub v-for="issue of notLatest" :key="issue.id" :issue="issue" show-lede="true" class="" />
      </div>

    </div>
    
  </div>
</template>




<script>

import { mapState } from 'vuex'
import CapsidStub from '~/components/publications/CapsidStub.vue'
import CapsidSignup from '~/components/layout/FooterSignups-capsid.vue'

export default {

  components: {
    CapsidStub,
    CapsidSignup,
  },

  layout: 'contentframe',
  middleware: 'pageload',
  meta: {
    tableQueries: ["_content", "capsid-previews"]
  },

  data () {
    return {
      message: this.$cytosis.find('Content.capsid-intro', {'Content': this.$store.state['Content']} )[0]['fields']['Markdown'],
      // signup: this.$cytosis.find('Content.capsid-signup-micro', {'Content': this.$store.state['Content']} )[0]['fields']['Markdown'],
    }
  },
  
  computed: {
    ...mapState([
      'Manuscripts',
      ]),

    issues() {
      return this['Manuscripts'].filter(t => t.fields['Status'] == 'Published')
    },

    latest() {
      // NOTE: this always pulls the TOP item from airtable. Make sure it's the right one!
      return this.issues[0]
    },

    notLatest() {
      return this.issues.slice(1)
    },

  },

  // runs on generation and page route (but not on first page load)
  async asyncData({env}) {

    return {
      postUrl: env.ext_handler,
    }
  },

  mounted () {
  },

  methods: {
  },


}
</script>

<style>
</style>

