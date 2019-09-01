
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

      <Capsid v-if="manuscript && atoms && authors && citation" :issue="manuscript" :atoms="atoms" :authors="authors" :citation="citation" class="Template-Main" />


      <!-- <Capsid :issue="manuscript" :atoms="atoms" class="Template-Main" /> -->
    </Template>

  </div>
</template>




<script>
  
// import { mapState } from 'vuex'
import { loadQuery } from '~/other/loaders'
// import { cite } from '~/other/cite'
import axios from 'axios'

import Template from '~/templates/manuscript-capsid.vue'
import Capsid from '~/components/publications/CapsidFour.vue'


const getAuthors = function(store, manuscript, app) {

  // ensures corr. author is first
  // REMINDER: Authors always returns as an array; if there are no attached authors
  // or if the slug is incorrect, the array will look like "[undefined]" (one item long, w/ undefined) 
  let authorSlugs = manuscript.fields['Data:MainAuthorSlug']
  let authorPromises

  if (manuscript.fields['Data:AuthorSlugs'])
    authorSlugs = [... manuscript.fields['Data:MainAuthorSlug'], ... manuscript.fields['Data:AuthorSlugs']]

  if(authorSlugs) {
    authorPromises = loadQuery({
      _key: process.env.db_api, 
      _base: process.env.db_base, 
      store: store, 
      routeName: 'Capsid-router', 
      query: process.env.pd_env == 'stage' ? 'People-profile-preview' : 'People-profile',
      // keyword: slug,
      options: {
        // create a custom filter that looks like
        // IF(OR({Slug}="jan-zheng", {Slug}="jessica-sacher"), TRUE())
        filter: app.$cytosis.filter_or(authorSlugs, "Slug")
      }
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
      authors: undefined,
      citation: undefined,
    }
  },

  computed: {

  },

  // runs on server+generation and page route (but not on first page load)
  async asyncData({env, store, route, app, error}) {


    const slug = unescape(route.params.slug)
    // const node = await loadQuery(env, store, '{capsid router}', 'Node-AbsolutePath', slug)
    // console.log('matched node: ', node, ' @ ', slug)

    const cytosis = await loadQuery({
      // useDataCache: true, can't cache this since this uses a slug
      env, 
      store, 
      routeName:'Capsid-router-article', 
      query:'capsid-single', 
      keyword: slug
    })

    let manuscript = cytosis.tables['Manuscripts'][0]
    let atoms, cache, cachedata

    // if(!manuscript)
    //   error({statusCode: 'Cytosis', message: 'The Capsid issue could not be loaded'})

    // otherwise load it from scratch
    if(manuscript) {

      // if cache exist on the record, load manuscript data from cache
      try {
        if(manuscript.fields['_cache:recordId']) {
          cache = await store.dispatch('loadPageCache', {
            pagekey: manuscript.fields['Slug'],
            recordId: manuscript.fields['_cache:recordId'],
          })

          if(cache && cache.fields['Payload']) {
            cache = app.$cytosis.cleanRecord(cache)
            cachedata = JSON.parse(cache.fields['Payload'])
            console.log('Capsid cache found; sending the Cytosis cached page data.')
            // store the cache data into the store's page cache
            store.dispatch('storePageCache', {
              key: manuscript.fields['Slug'],
              data: cachedata
            })

            // exit asyncData and send the cached payload into the site
            return cachedata
          }
        }
      } catch(err) {
        // caching strategy failed
        console.error('Capsid caching strategy failed:', err)
      }


      try {

        // fetches the relevant atoms into the store
        atoms = await loadQuery({
          // useDataCache: true, // data cache doesn't support keywords
          env, 
          store, 
          routeName:'Capsid-router-atoms', 
          query:'capsid-atoms', 
          keyword: manuscript.fields['Name']
        })
      } catch(err) {
        // caching strategy failed
        console.error('Capsid atoms failed to load:', err)
      }


      try {

        // Get some authors
        // if we're grabbing author info from DB:People
        let authors = [] // final authors array, where authors are in order of appearance
        let authorObj = {} // need to use an obj instead of array, since authors don't return in order from server; need to track order w/ obj
        
        // get author list — fairly important for bots to crawl
        if(manuscript.fields['Data:MainAuthorSlug'] || manuscript.fields['Data:AuthorSlugs']) {
          // async; populates this.authors directly when loaded
          let {authorPromises, authorSlugs} = await getAuthors(store, manuscript, app) 

          // get the cytosis author tale
          let authorData = app.$cytosis.strip(await authorPromises).tables['People']

          // pushes the authors in order of slugs
          authorData.map((author) => { authorObj[author.fields['Slug']] = author })

          // add the authors in order
          authorSlugs.map((_slug) => { authors.push(authorObj[_slug]) })
        }



        // Citations

        // for some reason, citation-js crashes Zeit Now, even when included here.
        // so you have to use a proxy into webtask
        // this is slow (5-10s), but SUPER important for bots to crawl
        // cache it in Airtable (under Manuscript>Data:Citation) if you can
        // let api_url =  'https://wt-ece6cabd401b68e3fc2743969a9c99f0-0.sandbox.auth0-extend.com/PDv3-cite'
        let cite_url = 'https://wt-ece6cabd401b68e3fc2743969a9c99f0-0.sandbox.auth0-extend.com/PDv3-cite'
        if(process.env.api_url) // if the API is down (temp. fix)
          process.env.api_url + '/api/cite'

        let citation = {}
        if(manuscript.fields['Data:Citation']) {
          // this is added to airtable manually, after generation
          citation = manuscript.fields['Data:Citation']
        } else {
          let cite_data = await axios.post(cite_url, citationData(manuscript, authors))
          citation = cite_data.data // JSON.parse(cite_data.data)
          // console.log('Citation Object ::::', citation)
        }

        store.dispatch('storePageCache', {
          key: slug,
          data: {
            manuscript: manuscript,
            atoms: atoms.tables.Atoms,
            authors: authors,
            citation: citation,
          }
        })

        return {
          manuscript: manuscript,
          atoms: atoms.tables.Atoms,
          authors: authors,
          citation: citation,
        }
      } catch(err) {
        console.error('Capsid loading Cytosis from scratch failed:', err)
      }
    } else {
      console.error('[Capsid Router] Capsid not found for slug:', slug)
      error({ statusCode: 404, message: "Page not Found" })
    }

    return {

    }
  },

  beforeCreate () {
  },
  mounted () {
  },
  beforeDestroy() {
  },

  methods: {
  },


}
</script>

<style>
</style>

