<template>
  <div class="Home">

    <div class="Home-hero _section-page _margin-center _margin-top-2 _margin-bottom-2">
      <!-- <div class="Home-img-container _section-content _padding-top-2 "> -->
      <div class="Home-img-container _padding-top-2  ">
        <img class="Home-img" alt="Phage Directory logo" width="250px" src="~/static/phagedirectory_home.png">
        <div class="Home-hero-txt --title _font-normal" v-html="$md.render(mission || '')" />
      </div>
    </div>
    
    <!-- <no-ssr>
      <div class="Home-promo _margin-top-2 _padding-top-2 _padding-bottom-2 _margin-bottom-2 _color-bg-white">
        <div class="_section-page _margin-center">
          <PhageFuturesHome>
            <div slot="default" class="" v-html="$md.render(promo || '') "/>
            <div slot="footer" class="" v-html="$md.render(promofooter || '') "/>
          </PhageFuturesHome>
        </div>
      </div>
    </no-ssr> -->
    
    <no-ssr>
      <Template class="Home-grid _divider-bottom" 
                grid-classes="Template--Main-Sidebar-xs "
                sidebar-classes="_sidebar _height-100">
        <template #default>
          <div class="Home-grid-main">
            <div v-if="featured" class="Home-featured _margin-bottom-2">
              <div class="" v-html="$md.render(featured || '') "/>
            </div>

            <div v-if="latestCapsid" class="Home-capsid-container _divider-bottom _margin-center _margin-bottom-2 _padding-left-xs _padding-right-xs">
              <div class="Home-capsid">
                <div>
                  <CapsidStub :authors="authors" :show-logo="true" :issue="latestCapsid" :is-featured="true" class="" />
                </div>
              </div>
            </div>

            <!-- <div class="Home-latest _margin-center _padding _margin-top-2 _margin-bottom-2 _card ">
              <iframe title="Instill Science" src="https://instill.xyz/spaces/instill-science" width="100%" height="100vh" style="height: 100vh; border:0; margin: 0 auto;"></iframe>
            </div> -->


            <div class="Home-latest _margin-center _padding _card | _grid-3-1 _grid-gap">
              
              <div>
                <h6 class="_padding-bottom-half"><span class="phagey _padding-right">⬢-{</span> Phage Pheed <span class="phagey  _padding-left">}-⬢</span></h6>
                <!-- featured has been rolled into Latest — add FeedFeature tag and it should show up here -->
                <!-- <Latest v-if="featuredAtoms" :atoms="featuredAtoms" /> -->
                <NodeForm v-if="form" :src="form"/>
                <!-- <Latest v-if="nonFeaturedAtoms" class="_margin-top-2 --tight" :atoms="nonFeaturedAtoms" /> -->
                <Latest class="_margin-top-2 --tight" :atoms="latestAtoms" />
                <button class="_button --width-full _center CTA --brand _font-bold _margin-top-2-i _margin-bottom-none-i" @click="getLatestAtoms(numLatest)">
                  <span v-if="!isLoadingMore" class="">Load More</span> 
                  <!-- <div v-else class="_spinner"> </div> -->
                  <div v-else >Loading <span class="_margin-left _spinner" /> </div>
                </button>
              </div>

              <no-ssr>
                <Twitter class=" _center-xs" />
              </no-ssr>
            </div>
          </div>
        </template>

      </Template>
    </no-ssr>
      
  </div>
</template>




<script>


import { mapState } from 'vuex'
import Latest from '~/components/Latest.vue'
import Twitter from '~/components/Twitter.vue'
import Template from '~/templates/context.vue'
import CapsidStub from '~/components/publications/CapsidStub.vue'
import { loadQuery } from '~/other/loaders'
import NodeForm from '~/components/render/NodeForm.vue'

// import PhageFuturesHome from '~/components/events/PhageFuturesHome.vue'


const _numLatest = 8 // latest number of Atoms to show in the feed


export default {

  components: {
    Latest,
    Template,
    Twitter,
    CapsidStub,
    NodeForm,

    // PhageFuturesHome,
  },

  layout: 'contentframe',
  middleware: 'pageload',
  meta: {
    // tableQuery: "_content"
    // tableQueries: ['_content']
    tableQueries: ['_content-copy']
  },

  data () {
    return {
      isStaging: process.env.pd_env == 'stage' ? true : false,
      promo: this.$cytosis.findField('pf-promo', this.$store.state['Content'], 'Markdown' ),
      promofooter: this.$cytosis.findField('pf-promofooter', this.$store.state['Content'], 'Markdown' ),
      mission: this.$cytosis.findField('home-mission', this.$store.state['Content'], 'Markdown' ),
      featured: this.$cytosis.findField('home-featured', this.$store.state['Content'], 'Markdown' ),
      form: this.$cytosis.findOne('form-feed', this.$store.state['Content'] ),
      latestCapsid: null,
      latestAtoms: null,
      featuredAtoms: null,
      numLatest: _numLatest,
      isLoadingMore: false,
      People: null,
      authors: [],
      isCapsidLoaded: false, // Flag to check if capsid data is already loaded
      isAtomsLoaded: false, // Flag to check if atoms data is already loaded
    }
  },
  
  computed: {
    ...mapState([
      'Content',
      'Manuscripts',
      'Atoms', 
      ]),

    // this method doesn't retain old featured atoms
    // featuredAtoms() {
    //   return this.Atoms.filter(e => {
    //   // return this.latestAtoms.filter(e => {
    //     return e.fields['Status'] == 'FeedFeature'
    //   })
    // },

    nonFeaturedAtoms() {
      if(this.latestAtoms) {
        return this.latestAtoms.filter(e => {
          return e.fields['Status'] != 'FeedFeature'
        })
      }
      return undefined
    }

  },

  async asyncData({env, store}) {
    // Loads in the latest Capsid from the server
    let latestCapsid = null
    let isCapsidLoaded = false
    try {
      console.log('[[asyncData]] fetching capsid from coverflow')
      const response = await fetch('https://coverflow.deno.dev/phage/capsid?max=1')
      const data = await response.json()
      const manuscript = {fields: data[0]}
      if (manuscript) {
        latestCapsid = manuscript
        isCapsidLoaded = true
        console.log('[[asyncData]] capsid fetched:', manuscript)
      }
    } catch (err) {
      console.error('Error fetching latest capsid in asyncData:', err)
    }

    // Loads in the latest Atoms from the server
    let latestAtoms = null
    let isAtomsLoaded = false
    try {
      console.log('[[asyncData]] fetching atoms from coverflow')
      const response = await fetch(`https://coverflow.deno.dev/phage/atoms?max=${_numLatest}&sort=Data:PubDate:desc`)
      const data = await response.json()
      if (data && data.length > 0) {
        latestAtoms = data.map(atom => ({fields: atom}))
        isAtomsLoaded = true
        console.log('[[asyncData]] atoms fetched:', latestAtoms)
      }
    } catch (err) {
      console.error('Error fetching latest atoms in asyncData:', err)
    }

    return {
      latestCapsid,
      isCapsidLoaded,
      latestAtoms,
      isAtomsLoaded,
    }
  },
  
  created() {
    if (this.latestCapsid) {
      this.getAuthorsOfManuscript(this.latestCapsid)
    }
  },

  mounted() {
    if(this.$segmentize) {
      this.$segmentize({
        segment: this.$segment,
        type: 'page',
        event: 'Home',
        data: {
          path: this.$route.path,
        }
      })
    }

    if (!this.latestCapsid && !this.isCapsidLoaded) {
      this.getLatestCapsid()
    }

    if (!this.latestAtoms && !this.isAtomsLoaded) {
      this.getLatestAtoms(this.numLatest)
    }
  },

  methods: {
    async getLatestCapsid() {
      if (this.isCapsidLoaded) return // Exit if capsid data is already loaded

      try {
        console.log('[[getLatestCapsid]] fetching capsid from coverflow')
        const response = await fetch('https://coverflow.deno.dev/phage/capsid?max=1')
        const data = await response.json()
        const manuscript = {fields: data[0]}
        if (manuscript) {
          this.latestCapsid = manuscript
          this.getAuthorsOfManuscript(manuscript)
          console.log('[[getLatestCapsid]] capsid fetched:', this.latestCapsid)
          this.isCapsidLoaded = true // Set the flag to true after loading capsid data
        }
      } catch (err) {
        console.error('Error fetching latest capsid:', err)
      }
      return undefined
    },

    getLatestAtoms(numLatest) {
      const _this = this
      this.isLoadingMore = true
      fetch(`https://coverflow.deno.dev/phage/atoms?max=${numLatest}&sort=Data:PubDate:desc`)
        .then(response => response.json())
        .then(data => {
          if (data && data.length > 0) {
            _this.isLoadingMore = false
            data = data.map(atom => ({fields: atom}))
            _this.latestAtoms = data
            _this.numLatest = _this.numLatest + 5
          }
        })
        .catch(err => {
          console.error('Error fetching latest atoms:', err)
          _this.isLoadingMore = false
        })
      return undefined
    },

    async getAuthorsOfManuscript(manuscript) {
      if(!manuscript)
        return undefined
    
      let authorSlugs = manuscript.fields['Data:MainAuthorSlug']
      if(manuscript.fields['Data:AuthorSlugs'])
        authorSlugs = [... authorSlugs, ... manuscript.fields['Data:AuthorSlugs']]
  
      let people = []
      try {
        people = await (await fetch('https://coverflow.deno.dev/phage/people')).json()
        people = people.map(person => ({fields: person}))
      } catch (err) {console.error('Error fetching people:', err)}

      this['People'] = people
      this['authors'] = people

      let matchingAuthors = [];
      authorSlugs.forEach(slug => {
        let author = this['authors'].find(author => author.fields['Slug'] === slug);
        if(author) {
          matchingAuthors.push(author);
        }
      });
      this['authors'] = matchingAuthors;
      
      return people
    },
  },



}
</script>

<style>
</style>

