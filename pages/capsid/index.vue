
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
      <CapsidStub :issue="latest" :show-header="true" :authors="getAuthorsOfManuscript(latest)" :is-featured="true" class="Capsid-latest" />
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
        
        <CapsidStub v-for="issue of Manuscripts" :key="issue.id" :issue="issue" :authors="getAuthorsOfManuscript(issue)" show-lede="true" class="" />
      </div>

    </div>
    
  </div>
</template>




<script>

import { mapState } from 'vuex'
import CapsidStub from '~/components/publications/CapsidStub.vue'
import CapsidSignup from '~/components/layout/FooterSignups-capsid.vue'
import { loadQuery } from '~/other/loaders'
import _ from 'lodash'

export default {

  components: {
    CapsidStub,
    CapsidSignup,
  },

  layout: 'contentframe',
  middleware: 'pageload',
  meta: {
    tableQueries: ["_content-copy", "capsid-previews"]
  },

  data () {
    // load form in on client; faster load (async) but no SEO
    const _this = this

    // loadQuery({
    //   useDataCache: true,
    //   _key: process.env.db_api, 
    //   _base: process.env.db_base, 
    //   store: this.$store, 
    //   routeName: 'capsid-index-people', 
    //   query: 'People-index'
    // }).then(data => {
    //   if(data.tables['People'])
    //     _this['People'] = data.tables['People']
    // })

    // should be faster / smaller footprint

    let authorSlugs = this.getAuthorSlugs(this.$store.state['Manuscripts'])

    loadQuery({
      // useDataCache: true, // can't data cache this b/c of filter
      _key: process.env.db_api, 
      _base: process.env.db_base, 
      store: this.$store, 
      routeName: 'Capsid-router', 
      query: process.env.pd_env == 'stage' ? 'People-profile-preview' : 'People-profile',
      options: {
        filter: this.$cytosis.filter_or(authorSlugs, "Slug")
      }
    }).then(data => {
      // console.log('Index People :::: ', data)
      if(data.tables['People'])
        _this['People'] = data.tables['People']
    })

    return {
      message: this.$cytosis.findField('capsid-intro', this.$store.state['Content'], 'Markdown' ),
      People: null,
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

  // load authors in on client to speed up paint time
  // async asyncData({env, store}) {
  //   const data = await loadQuery({
  //     useDataCache: true,
  //     _key: env.db_api, 
  //     _base: env.db_base, 
  //     store, 
  //     routeName: '{people}', 
  //     query: 'People-index'
  //   })

  //   return {
  //     People: data.tables['People'],
  //   }
  // },

  mounted () {
  },

  methods: {

    getAuthorSlugs(manuscripts) {

      // get a flat list of all authors that appear in manuscripts
      let authorSlugs = []
      manuscripts.map(manuscript => {
        if(manuscript.fields['Data:MainAuthorSlug'])
          authorSlugs.push(manuscript.fields['Data:MainAuthorSlug'])
        if(manuscript.fields['Data:AuthorSlugs'])
          authorSlugs.push(manuscript.fields['Data:AuthorSlugs'])
      })

      if(authorSlugs) {
        // console.log( ' :::: authorSlugs ', _.flattenDeep(authorSlugs))
        // authorSlugs = authorSlugs.flat(2) // .flat isn't completely supported
        authorSlugs = _.flattenDeep(authorSlugs)
        authorSlugs = this.$cytosis.deduplicate(authorSlugs)
        // console.log( ' :::: authorSlugs ', authorSlugs)
        return authorSlugs
      }
      return undefined

    },

    getAuthorsOfManuscript(manuscript) {
      if(!this['People'])
        return undefined

      // const authorSlug = manuscript.fields['Data:MainAuthorSlug']
      let authorSlugs = manuscript.fields['Data:MainAuthorSlug']

      // const authorSlugs = [... manuscript.fields['Data:MainAuthorSlug'], ... manuscript.fields['Data:AuthorSlugs']]
      if(manuscript.fields['Data:AuthorSlugs'])
        authorSlugs = [... authorSlugs, ... manuscript.fields['Data:AuthorSlugs']]

      const _this = this
      let authors = []

      authorSlugs.map((slug) => {
      // console.log('authorSlugs.map', slug, _this.$cytosis.findOne(slug, _this['People'], 'Slug'))
        authors.push(_this.$cytosis.findOne(slug, _this['People'], ['Slug'] ))
      })

      return authors
    },
  },


}
</script>

<style>
</style>

