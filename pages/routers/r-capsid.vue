
<!--  

  Router for Capsid & Tail issues
  // basis for other manuscript routers

-->

<template>
  <div class="Router-Capsid">

    <!-- the route should match against a slug and only the first matched slug should be relevant -->

    <Template class="_section-page _margin-center">
      
      <div slot="sidebar" >
        <div class="_sidebar-content-group">
          <div v-if="manuscript" class="_sidebar-item _sidebar-heading _sidebar-label">
            {{ manuscript.fields['Name'] }}
          </div>
        </div>
        <div v-scroll-spy-active="{class: '--scrollspy-active', selector: '._sidebar-item'}" 
             v-scroll-spy-link="{selector: 'a._sidebar-item'}"
             class="scrollspy _card --silver" 
        >
          <nuxt-link to="#intro" class="_sidebar-item _block --active-disabled">
            Intro
          </nuxt-link>
          <nuxt-link to="#whats-new" class="_sidebar-item _sidebar-content-group _block --active-disabled">
            What's New
          </nuxt-link>
          <nuxt-link to="#jobs" class="_sidebar-item _block --active-disabled">
            Jobs
          </nuxt-link>
          <nuxt-link to="#community" class="_sidebar-item _sidebar-content-group _block --active-disabled">
            Community
          </nuxt-link>
          <nuxt-link to="#article" class="_sidebar-item _block --active-disabled">
            Article
          </nuxt-link>
          <!-- <nuxt-link to="#comments" class="_sidebar-item _block --active-disabled">
            Comments
          </nuxt-link> -->
        </div>
        <div clas="_sidebar-footer">
          <nuxt-link
            v-scroll-to="{
              el: '#Capsid-authors'
            }"
            to="#Capsid-authors" 
            class="_font-smaller _block _padding-left --active-disabled ">
            Author information
          </nuxt-link>
          <nuxt-link
            v-scroll-to="{
              el: '#Capsid-cite'
            }"
            to="#Capsid-cite" 
            class="_font-smaller _block _padding-left --active-disabled ">
            How to cite
          </nuxt-link>
          <nuxt-link
            v-scroll-to="{
              el: '#Capsid-license'
            }"
            to="#Capsid-license" 
            class="_font-smaller _block _padding-left --active-disabled ">
            License
          </nuxt-link>
        </div>
      </div>

      <!-- <a href="/capsid" class="--quiet _inline-block _padding-bottom">Browse all issues of Capsid &amp; Tail</a> -->

      <Capsid v-if="manuscript && atoms" :issue="manuscript" :atoms="atoms" :authors="authors" :citation="citation" class="Template-Main" />
      <!-- <Capsid :issue="manuscript" :atoms="atoms" class="Template-Main" /> -->
    </Template>

  </div>
</template>




<script>
  
// import { mapState } from 'vuex'
import { loadQuery } from '~/other/loaders'
import axios from 'axios'

import Template from '~/templates/manuscript-capsid.vue'
import Capsid from '~/components/publications/CapsidFour.vue'


const getAuthor = function(store, manuscript) {

  // ensures corr. author is first
  // REMINDER: Authors always returns as an array; if there are no attached authors
  // or if the slug is incorrect, the array will look like "[undefined]" (one item long, w/ undefined) 
  let authorSlugs = manuscript.fields['Data:MainAuthorSlug']
  let authorPromises = []

  if (manuscript.fields['Data:AuthorSlugs'])
    authorSlugs = [... manuscript.fields['Data:MainAuthorSlug'], ... manuscript.fields['Data:AuthorSlugs']]

  if(authorSlugs) {
    authorSlugs.map(async function(slug) {

      const item = loadQuery({
        useDataCache: true,
        _key: process.env.db_api, 
        _base: process.env.db_base, 
        store: store, 
        routeName: '{capsid router}', 
        query: process.env.pd_env == 'stage' ? 'People-profile-preview' : 'People-profile',
        keyword: slug,
      })
      authorPromises.push(item)
    })
  }

  return {authorPromises, authorSlugs}
}



const citationData = function(manuscript, authors) {
  // all author data loaded in async, so need to verify data is complete by using array len
  // every article will have one corr. author, plus a variable # of authors
  const mainAuthorCount = manuscript.fields['Data:MainAuthorSlug'] ? manuscript.fields['Data:MainAuthorSlug'].length : 0
  const authorCount = manuscript.fields['Data:AuthorSlugs'] ? manuscript.fields['Data:AuthorSlugs'].length : 0
  
  // console.log('citationDta authCount', this.authors.length, mainAuthorCount, authorCount)
  if(authors && authors[0] && authors.length == mainAuthorCount + authorCount) {
  // const authorCount = this.issue.fields['Data:AuthorSlugs'] ? this.issue.fields['Data:AuthorSlugs'].length : 0
  // if(this.authors && this.authors.length > 0) {
    const date = new Date(manuscript.fields['Data:Date'])

    let authorNames = []
    authors.map((item) => authorNames.push(`${item.fields['FamilyName']}, ${item.fields['FirstName']}`))
    // console.log('author names:', authorNames.join(' and '))

    // const source =  `
    //   @article{${this.authors[0].fields['FamilyName']}${date.getFullYear()},
    //     author = {${authorNames.join(' and ')}},
    //     date = {${date.getFullYear()}},
    //     day = {${date.getDay()}},
    //     month = {${date.getMonth()}},
    //     title = {{${this.issue.fields['Data:Title:String']}}},
    //     journal = {Capsid & Tail},  
    //     publisher = {Phage Directory},
    //     number = {${this.issue.fields['Data:Issue']}},
    //     url = {${this.issue.fields['URL']}},
    //   }
    // `
    const source =  `
      @article{${manuscript.fields['Slug']}${date.getFullYear()},
        author = {${authorNames.join(' and ')}},
        date = {${date.getFullYear()}},
        day = {${date.getDay()}},
        month = {${date.getMonth()}},
        title = {{${manuscript.fields['Data:Title:String']}}},
        journal = {Capsid & Tail},  
        publisher = {Phage Directory},
        number = {${manuscript.fields['Data:Issue']}},
        url = {${manuscript.fields['URL']}},
      }
    `

    return {
      source
    }
  }
  return undefined
}



export default {

  components: {
    Capsid,
    Template,
  },

  layout: 'contentframe',
  middleware: 'pageload',
  meta: {
    tableQueries: ["_content-copy"]
  },

  data () {
    return {
      manuscript: undefined,
      atoms: undefined,
      authors: undefined
    }
  },

  computed: {

  },

  // runs on server+generation and page route (but not on first page load)
  async asyncData({env, store, route }) {
    const slug = unescape(route.params.slug)
    // const node = await loadQuery(env, store, '{capsid router}', 'Node-AbsolutePath', slug)
    // console.log('matched node: ', node, ' @ ', slug)

    const cytosis = await loadQuery({
      useDataCache: true,
      env, 
      store, 
      routeName:'{capsid router}', 
      query:'capsid-single', 
      keyword: slug
    })

    let manuscript = cytosis.tables['Manuscripts'][0]

    // if(!manuscript)
    //   error({statusCode: 'Cytosis', message: 'The Capsid issue could not be loaded'})

    if(manuscript) {
      // fetches the relevant atoms into the store
      const atoms = await loadQuery({
        useDataCache: true,
        env, 
        store, 
        routeName:'{capsid router}', 
        query:'capsid-atoms', 
        keyword: manuscript.fields['Name']
      })


      // Get some authors
      // if we're grabbing author info from DB:People
      let authors = []
      let authorPromises = []
      let authorSlugs = []
      let authorObj = {} // need to use an obj instead of array, since authors don't return in order from server; need to track order w/ obj
      
      if(manuscript.fields['Data:MainAuthorSlug'] || manuscript.fields['Data:AuthorSlugs']) {
        let res = await getAuthor(store, manuscript, authorSlugs) // async; populates this.authors directly when loaded
        authorPromises = res.authorPromises
        authorSlugs = res.authorSlugs

        // Promise.all(authorPromises).then(function(data) {
        let data = await Promise.all(authorPromises)

        data.map((cytosis) => {
          const author = cytosis.tables['People'][0]
          authorObj[author.fields['Slug']] = author
        })

        // add them in order
        authorSlugs.map((slug) => {
          authors.push(authorObj[slug])
        })
      // })
      }

      // let api_url =  'https://wt-ece6cabd401b68e3fc2743969a9c99f0-0.sandbox.auth0-extend.com/PDv3-cite'
      let api_url = process.env.api_url + '/api/cite'
      let citation = await axios.post(api_url, citationData(manuscript, authors))

      return {
        manuscript: manuscript,
        atoms: atoms.tables.Atoms,
        authors: authors,
        citation: citation.data,
      }
    }
  },

  beforeCreate () {
  },
  mounted () {
  },
  beforeDestroy() {
  },

  methods: {
    pathMatch(path) {
      // console.log('pathMatch',this.route.path)
      if(!this.route.path)
        return false

      if(this.route.path == path)
        return true

      // const pathstrs = this.route.path.substring(1).split('/')
      // const secstrs = section.route.substring(1).split('/')

      // if (pathstrs.length == 1) {
      //   return this.route.path.includes(section.route) // partial matches for sub strs
      // }

      // if (pathstrs.length == 2) {
      //   return this.route.path == section.route
      // }

      // // this happens when a subsection like /code/css/variables
      // // matches /code/css — we still want this highlighted
      // if (pathstrs.length > secstrs.length && secstrs.length > 1) {
      //   return this.route.path.includes(section.route)
      // }

      // return this.route.path.includes(section.route) // partial matches for sub strs
      // return section && section.sections && this.route.path == section.route
    },
  },


}
</script>

<style>
</style>

