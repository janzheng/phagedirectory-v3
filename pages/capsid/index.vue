
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
      <div class="_margin-left-xs _margin-right-xs">
        <CapsidStub v-for="issue of notLatest" :key="issue.id" :issue="issue" :authors="getAuthorsOfManuscript(issue)" show-lede="true" class="_margin-bottom-2" />
      </div>

    </div>
    
  </div>
</template>




<script>

import { mapState } from 'vuex'
import CapsidStub from '~/components/publications/CapsidStub.vue'
import CapsidSignup from '~/components/layout/FooterSignups-capsid.vue'
// import { loadQuery } from '~/other/loaders'
import _ from '~/other/lodash.custom.min.js'

export default {

  components: {
    CapsidStub,
    CapsidSignup,
  },

  layout: 'contentframe',
  middleware: 'pageload',
  meta: {
    tableQueries: process.env.pd_env == 'stage' ? ["_content-copy", "capsid-previews-prev"] : ["_content-copy", "capsid-previews"],
  },

  async asyncData({ store }) {
    let people = []
    try {
      const response = await fetch(`https://coverflow.deno.dev/phage/people?noCache=${process.env.pd_env == 'stage'}`)
      people = await response.json()
      people = people.map(person => ({ fields: person }))
      console.log(' >>>> people', people)
    } catch (err) {
      console.error('Error fetching people:', err)
    }

    return {
      People: people,
    }
  },

  data () {
    // load form in on client; faster load (async) but no SEO
    const _this = this

    // let authorSlugs = this.getAuthorSlugs(this.$store.state['Manuscripts'])

    // console.log('authorSlugs', authorSlugs)

    // Fetch people from Coverflow
    // (async () => {
    //   try {
    //     const response = await fetch('https://coverflow.deno.dev/phage/people')
    //     const peopleData = await response.json()
    //     _this['People'] = peopleData.map(person => ({ fields: person }))
    //   } catch (err) {
    //     console.error('Error fetching people:', err)
    //   }
    // })()

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
      return this['Manuscripts']
    },

    latest() {
      // NOTE: this always pulls the TOP item from airtable. Make sure it's the right one!

      let arr = [...this.issues]
      arr.sort((a,b) => new Date(b.fields['Data:Date']) - new Date(a.fields['Data:Date']))
      return arr[0]
    },

    notLatest() {
      let arr = [...this.issues.slice(1)]
      arr.sort((a,b) => new Date(b.fields['Data:Date']) - new Date(a.fields['Data:Date']))
      return arr
    },


  },

  mounted () {
    if(this.$segmentize) {
      this.$segmentize({
        segment: this.$segment,
        type: 'page',
        event: 'Capsid Home',
        data: {
          path: this.$route.path,
        }
      })
    }
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

      if(authorSlugs && authorSlugs.length > 0) {
        authorSlugs.map((slug) => {
        // console.log('authorSlugs.map', slug, _this.$cytosis.findOne(slug, _this['People'], 'Slug'))
          authors.push(_this.$cytosis.findOne(slug, _this['People'], ['Slug'] ))
        })
      }

      return authors
    },
  },


}
</script>

<style>
</style>

