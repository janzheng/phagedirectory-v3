
<!--  

  Router for Capsid & Tail issues
  // basis for other manuscript routers

-->

<template>
  <div class="Router-Capsid">

    <!-- the route should match against a slug and only the first matched slug should be relevant -->

    <div class="_section-page _margin-center">

      <!-- <a href="/capsid" class="--quiet _inline-block _padding-bottom">Browse all issues of Capsid &amp; Tail</a> -->

      <!-- <Capsid v-if="manuscript && atoms && authors && citation" :issue="manuscript" :atoms="atoms" :authors="authors" :citation="citation" class="Template-Main"> -->
        
      <!-- <Capsid :issue="manuscript" :atoms="atoms" class="Template-Main" /> -->

      <!-- <Capsid :issue="manuscript" :atoms="atoms" :authors="authors" :citation="citation" class="Template-Main"> -->
      <Capsid :issue="manuscript" :atoms="atoms" :authors="authors" :citation="citation" class="Template-Main">
        
        <template v-slot:sidebar>
          <nav class="">
            <div class="">
              <!-- <div class="_sidebar-content-group">
                <div v-if="manuscript" class="_sidebar-item _sidebar-heading _sidebar-label">
                  {{ manuscript.fields['Name'] }}
                </div>
              </div> -->
              <div v-scroll-spy-active="{class: '--scrollspy-active', selector: '._sidebar-item'}" 
                   v-scroll-spy-link="{selector: 'a._sidebar-item'}"
                   class="scrollspy _card --silver" 
              >
                <!-- <nuxt-link to="#intro" class="_sidebar-item _block --active-disabled">
                  Intro
                </nuxt-link> -->
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
                  Feature Article
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
          </nav>
        </template>

      </Capsid>


    </div>

  </div>
</template>




<script>
  
// import { mapState } from 'vuex'
import { loadQuery } from '~/other/loaders'
// import { cite } from '~/other/cite'
import axios from 'axios'

// import Template from '~/templates/manuscript-capsid.vue'
// import Capsid from '~/components/publications/CapsidFour.vue'
import Capsid from '~/components/publications/CapsidFive.vue'


// on the server side
const getAuthors = async function(store, manuscript, app) {
  // ensures corr. author is first
  let authorSlugs = manuscript.fields['Data:MainAuthorSlug']

  if (manuscript.fields['Data:AuthorSlugs']) {
    authorSlugs = [...manuscript.fields['Data:MainAuthorSlug'], ...manuscript.fields['Data:AuthorSlugs']]
  }

  let authors = []
  if (authorSlugs && authorSlugs.length > 0) {
    try {
      const slugsParam = authorSlugs.join(',')
      console.log('slugsParam:', `https://coverflow.deno.dev/phage/people-profiles?slugs=${slugsParam}&noCache=${process.env.pd_env == 'stage'}`)
      const response = await fetch(`https://coverflow.deno.dev/phage/people-profiles?slugs=${slugsParam}&noCache=${process.env.pd_env == 'stage'}`)
      const people = await response.json()
      authors = people.map(person => person && ({fields: person}))
    } catch (err) {
      console.error('Error fetching authors:', err)
    }
  }
  
  return {authors, authorSlugs}
}







const citationData = function(manuscript, authors, app) {

  if(!manuscript || !manuscript.fields) {
    return undefined
  }

  // console.log('---- citation:', authors)

  // all author data loaded in async, so need to verify data is complete by using array len
  // every article will have one corr. author, plus a variable # of authors
  const mainAuthorCount = manuscript.fields['Data:MainAuthorSlug'] ? manuscript.fields['Data:MainAuthorSlug'].length : 0
  const authorCount = manuscript.fields['Data:AuthorSlugs'] ? manuscript.fields['Data:AuthorSlugs'].length : 0
  
  // console.log('citationDta authCount', this.authors.length, mainAuthorCount, authorCount)
  if(authors && authors[0] && authors.length == mainAuthorCount + authorCount) {
    // const authorCount = this.issue.fields['Data:AuthorSlugs'] ? this.issue.fields['Data:AuthorSlugs'].length : 0
    // if(this.authors && this.authors.length > 0) {
    // const date = new Date(manuscript.fields['Data:Date'])
    const date = manuscript.fields['Data:Date'] // using new Date creates localization issues
    const year = app.$dayjs(String(date)).format('YYYY') 
    const month = app.$dayjs(String(date)).format('MMMM') 
    const day = app.$dayjs(String(date)).format('D') 

    let authorNames = []
    authors.map((item) => {
      if(item && item.fields)
        authorNames.push(`${item.fields['FamilyName']}, ${item.fields['FirstName']}`)
    })
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
      @article{${manuscript.fields['Slug']}${year},
        author = {${authorNames.join(' and ')}},
        date = {${year}},
        day = {${day}},
        month = {${month}},
        title = {${manuscript.fields['Data:Title:String']}},
        journal = {Capsid & Tail},  
        publisher = {Phage Directory},
        number = {${manuscript.fields['Data:Issue']}},
        url = {${manuscript.fields['URL']}},
      }
    `

    console.log('[citationData]:', source )
    return source
  }
  return undefined
}



export default {

  components: {
    Capsid,
    // Template,
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
    // const cytosis = await loadQuery({
    //   // useDataCache: true, can't cache this since this uses a slug
    //   noCommit: true,
    //   env, 
    //   store, 
    //   _base: env.airtable_base,
    //   routeName:'Capsid-router-article', 
    //   query:'capsid-single', 
    //   keyword: slug,
    // })

    // let manuscript = cytosis.tables['Manuscripts'][0]
    const response = await fetch(`https://coverflow.deno.dev/phage/capsid-single?slug=${slug}&noCache=${process.env.pd_env == 'stage'}`)
    const data = await response.json()
    let manuscript = data?.[0] ? {fields: data[0]} : undefined
    
    
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
        // atoms = await loadQuery({
        //   // useDataCache: true, // data cache doesn't support keywords
        //   env, 
        //   store, 
        //   routeName:'Capsid-router-atoms', 
        //   query:'capsid-atoms', 
        //   keyword: manuscript.fields['Name']
        // })

        const response = await fetch(`https://coverflow.deno.dev/phage/atoms-capsid?slug=${manuscript.fields['Slug']}&noCache=${process.env.pd_env == 'stage'}`)
        const data = await response.json()
        atoms = {
          tables: {
            Atoms: data.map(item => item && ({fields: item, id: item.id}))
          }
        }

        // console.log('>>> atoms:', atoms, atoms0)
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
          let {authors: _authors, authorSlugs} = await getAuthors(store, manuscript, app) 
          if(authorSlugs && authorSlugs.length > 0) {
            // add the authors in order
            authorSlugs.map((slug) => {
              authors.push(_authors.find(author => author.fields['Slug'] == slug))
            })
          }

        }

      // } catch(err) {
      //   console.error('Capsid loading Cytosis from scratch failed:', err)
      // }


      // try {
        // Citations

        // for some reason, citation-js crashes Zeit Now, even when included here.
        // so you have to use a proxy into webtask
        // this is slow (5-10s), but SUPER important for bots to crawl
        // cache it in Airtable (under Manuscript>Data:Citation) if you can
        // let api_url =  'https://wt-ece6cabd401b68e3fc2743969a9c99f0-0.sandbox.auth0-extend.com/PDv3-cite'
        // let cite_url = 'https://wt-ece6cabd401b68e3fc2743969a9c99f0-0.sandbox.auth0-extend.com/PDv3-cite'
        // webtask is sunsetting

        let cite_url = null
        if(process.env.utility_url)
          cite_url = process.env.utility_url + '/api/citation'
        else
          cite_url = 'https://utility.phage.directory/api/citation'

        // local testing
        // cite_url = 'http://localhost:2022/api/citation'

        let citation = undefined
        if(manuscript.fields['Data:Citation']) {
          // this is added to airtable manually, after generation
          citation = JSON.parse(manuscript.fields['Data:Citation'])
        } else {
          let citDataSource = citationData(manuscript, authors, app)
          
          // if(cite_url && citDataSource && process.env.pd_env == 'stage' && process.env.locality == 'Local') {
          if(cite_url && citDataSource && process.env.pd_env == 'stage') {
            // console.log('---> getting citation from:', cite_url, {source: citDataSource, isData: true, style: 'mla', output: 'html'})
            // let cite_data = await axios.post(cite_url, citDataSource)
            let cite_data = await axios.post(cite_url, {source: citDataSource, isData: true, style: 'mla', output: 'html'})

            if(cite_data && cite_data.data) {
              citation = cite_data.data // JSON.parse(cite_data.data)

              if(citation['citation'])
                citation['apa'] = citation['citation'] // schema adapt

              console.log('---> citation:', citation)
              // console.log('---> citation:', JSON.parse(citation))
            }
          }

          // console.log('WT Citation URL:', citation )
          // if(!process.env.api_url) {
            // console.log('WT Citation Object:', cite_data.data )
            // citation = JSON.parse(cite_data.data) // webtask returns a stringified obj
          // }
          // console.log('>>> Citation Object ::::', citation)
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

        console.log('authors:', authors)

        // filter undefined from authors
        authors = authors.filter((item) => item)


        return {
          // manuscripts: cytosis.tables['Manuscripts'],
          manuscript: manuscript,
          atoms: atoms.tables.Atoms,
          authors: authors,
          citation: citation,
        }
      } catch(err) {
        console.error('Citation error:', err)
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
    this.$segmentize({
      segment: this.$segment,
      type: 'page',
      event: 'Router/Capsid',
      data: {
        path: this.$route.path,
      }
    })
  },
  
  beforeDestroy() {
  },

  methods: {
  },


}
</script>

<style>
</style>

