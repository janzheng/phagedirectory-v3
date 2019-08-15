
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
      <CapsidStub :issue="latest" :authors="getAuthorsOfManuscript(latest)" :is-featured="true" class="Capsid-latest" />
    </div>

    <div class="Capsid-insert">
      <div class="_section-article _margin-center _padding-xs">
        <!-- <div class="" v-html="$md.render(signup || '')" /> -->
        <CapsidSignup />

        <div class="_margin-center _margin-top-2 _section-article">
          <div class="" v-html="$md.render(message || '')" />
        </div>
      </div>
    </div>
    
    <div class="_section-content _margin-center">
      <div class="_grid-2 _margin-left-xs _margin-right-xs">
        
        <div v-for="issue of notLatest" :key="issue.id" >
          <CapsidStub :issue="issue" :authors="getAuthorsOfManuscript(issue)" show-lede="true" class="" />
        </div>
      </div>

    </div>
    
  </div>
</template>




<script>

import { mapState } from 'vuex'
import CapsidStub from '~/components/publications/CapsidStub.vue'
import CapsidSignup from '~/components/layout/FooterSignups-capsid.vue'
import { loadQuery } from '~/other/loaders'

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
  // async asyncData({env}) {

  //   return {
  //     postUrl: env.ext_handler,
  //   }
  // },

  async asyncData({env, store, route}) {
    const slug = route.params.slug
    const data = await loadQuery({_key: env.db_api, _base: env.db_base, store, routeName: '{people}', query: 'People-index'})

    return {
      slug,
      People: data.tables['People'],
      // search: search
    }
  },

  mounted () {
  },

  methods: {
    getAuthorsOfManuscript(manuscript) {
      if(!this['People'])
        return undefined

      const authorSlug = manuscript.fields['Data:MainAuthorSlug']
      return this['People'].reduce((total, current) => {
          if(current.fields['Slug'] == authorSlug) {
            return [...total, ...[current]]
          }
          return [...total]
        }, [])
    },
  },


}
</script>

<style>
</style>

