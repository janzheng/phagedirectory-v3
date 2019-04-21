
<!-- 

  /capsid/ — displays a list of capsid and tail issues

 -->


<template>
  <div class="Capsid ">

    <div class="_section-page _margin-center">
      <div class="_section-content _margin-center">
        <div class="Capsid-masthead _section-article _margin-center _padding-bottom-3">
          <router-link to="/capsid" class="_grid-auto-1-xs _align-vertically --underline-none">
            <img class="cnt _block _margin-center" src="/cnt.png" width="120px" alt="Capsid and Tail" >
            <div class="Capsid-masthead-title _left _font-serif">A weekly phage periodical</div>
          </router-link>
        </div>

        <div class="_margin-center _section-article">
          <div class="_margin-bottom" v-html="$md.render(intro || '')" />
          <div class="" v-html="$md.render(signup || '')" />
        </div>
      </div>
    </div>



    <div class="_section-content _margin-center-sm _margin-left-xs _margin-right-xs">
      <CapsidStub :issue="latest" :is-featured="true" class="" />
    </div>
    
    <div class="_section-content _margin-center">
      <div class="_grid-2 _margin-left-xs _margin-right-xs">
        <CapsidStub v-for="issue of notLatest" :key="issue.id" :issue="issue" show-lede="true" class="" />
      </div>

      <!-- latest manuscript -->
      <!-- {{ Manuscripts }} -->

    </div>
    
  </div>
</template>




<script>

import { mapState } from 'vuex'
// import FormContact from '~/forms/FormContact.vue'
import Form from '~/pages/templates/t-form.vue'
import CommunityPost from '~/components/CommunityPost.vue'
import CapsidStub from '~/components/publications/CapsidStub.vue'

export default {

  components: {
    Form,
    CommunityPost,
    CapsidStub,
  },

  layout: 'contentframe',
  middleware: 'pageload',
  meta: {
    tableQueries: ["_content", "capsid-previews"]
  },

  // runs on generation and page route (but not on first page load)
  async asyncData({env}) {

    return {
      postUrl: env.ext_handler,
    }
  },

  data () {
    return {
      intro: this.$cytosis.find('Content.capsid-intro', {'Content': this.$store.state['Content']} )[0]['fields']['Markdown'],
      signup: this.$cytosis.find('Content.capsid-signup-micro', {'Content': this.$store.state['Content']} )[0]['fields']['Markdown'],
    }
  },
  
  computed: {
    ...mapState([
      'Manuscripts',
      ]),

    latest() {
      // NOTE: this always pulls the TOP item from airtable. Make sure it's the right one!
      return this['Manuscripts'][0]
    },

    notLatest() {
      return this['Manuscripts'].slice(1)
    },

    issues() {
      return this['Manuscripts']
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

