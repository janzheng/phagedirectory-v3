

<!-- 

  Component for displaying a Capsid issue 

 -->
<template>

  <div class="Capsid Capsid-Issue _section-article _margin-center">
    <div v-if="issue" class="_margin-center _card _margin-top-none-i" >

      <div v-scroll-spy class="scrollspy" >
        
        <div id="intro" class="Capsid-intro" >
          <figure v-if="issue.fields['Cover:url'] && issue.fields['Cover:showOnIssue']" class="Capsid-cover-container">
            <img class="Capsid-cover" 
                 :src="issue.fields['Cover:url']" alt="Capsid and Tail"
            >
            <figcaption v-if="issue.fields['Cover:description']" class="Capsid-cover-description _font-smaller _padding _color-disabled" v-html="$md.render(issue.fields['Cover:description'] ||'')" />
          </figure>
          <div v-if="!issue.fields['Cover:showOnIssue']" class="Capsid-masthead Capsid-section _margin-center _padding _padding-bottom-none-i " >
            <nuxt-link to="/capsid" class="_grid-auto-1-xs _align-vertically --underline-none">
              <img class="cnt _block _margin-center" src="/cnt.png" width="120px" alt="Capsid and Tail" >
              <div class="Capsid-masthead-title _left _font-serif">A weekly phage periodical</div>
            </nuxt-link>
          </div>

          <div class="Capsid-header Capsid-section _margin-center _padding">
            <div class="_section-content _margin-center _margin-top-none-i">
              <div class="Capsid-meta">
                <div>
                  <span class="Capsid-title _font-bold">{{ issue.fields['Name'] }}</span> | 
                  <span class="Capsid-date">{{ issue.fields['Data:Date'] | niceDate }}</span>
                </div>
                <div class="Capsid-readtime _font-small _padding-top-half _padding-bottom">
                  {{ readtimeContent | readtime }} min read
                </div>
              </div>

              <!-- <nuxt-link :to="`/capsid/${issue.fields['Slug']}`"> -->
              <h1 class="Capsid-title _padding-top" v-html="$md.strip($md.render(issue.fields['Data:Title'] || ''))" />
              <!-- </nuxt-link> -->
              <div class="_section-article">
                <!-- <div class="Capsid-lede _padding-bottom" v-html="$md.strip($md.render(issue.fields['Data:Lede'] || ''))" /> -->
                <h3 class="Capsid-lede _padding-bottom --normal --title" v-html="$md.strip($md.render(issue.fields['Data:Lede'] || ''))" />
                
                <div v-if="issue.fields['Data:Abstract']" 
                     class="_padding-bottom _margin-bottom _md-p_fix" 
                     v-html="$md.render(issue.fields['Data:Abstract'] || '')" />
                <!-- <div class="Capsid-skipahead _padding-bottom">
                  Scroll down to <a class="_font-bold" href="#article">read this week's Featured Article</a>.
                </div>  -->
                <!-- <div v-if="issue.fields['Data:Author']" class="Capsid-author " v-html="$md.render(issue.fields['Data:Author'] || '')" /> -->
              </div>

              <CapsidShare :link="twitterLink" message="Tweet this issue!" class="_margin-top" />
            </div>

          </div>

          

          <!-- Sponsors — resides within the intro!!-->
          <!-- <div v-if="sponsors.length > 0" class="Capsid-sponsor _section-page _margin-center _padding" >
            Sponsor
            <div v-for="item of sponsors" :key="item.id" class="_margin-bottom" >
              <CapsidSponsor :atom="item" />
            </div>
          </div> -->

          <!-- leave Sponsors ABOVE the whats new area to call it out -->
          <div v-if="sponsors.length>0" class="Capsid-sponsor _padding" >
            <!-- Don't show Sponsor title, just keep the tag<h4 class="Capsid-sponsors-title">{{'Sponsors'}}</h4> -->
            <!-- <div class="_padding-left _padding-right"> -->
            <!-- </div> -->
            <div v-for="item of sponsors" :key="item.id" class="_margin-bottom" >
              <CapsidSponsor :atom="item" />
            </div>
          </div>

          <!-- leave Alerts ABOVE the whats new area to call it out -->
          <div v-if="alerts.length>0" class="Capsid-alerts _padding" >
            <div v-for="item of alerts" :key="item.id" class="_margin-bottom" >
              <Alert :atom="item" />
            </div>
          </div>


        </div>




        <!-- What's New -->
        <div id="whats-new" class="Capsid-section Capsid-section-new" >
          <div class="Capsid-section-header">
            <h2 class="Capsid-section-heading" >What’s New</h2>
            <div class="Capsid-section-heading-description">
              <span>Have an idea for us?</span> <a href="/capsid/tips" class="_button --short CTA --outline _margin-left-half">Send us a tip!</a>
            </div>
          </div>
          <div v-if="updates.length > 0" >
            <div v-for="item of updates" :key="item.id" class="_margin-bottom" >
              <CapsidNew :atom="item" />
            </div>
          </div>
          <div v-else class="_card _color-bg-white _padding">Nothing new this week</div>
        </div>

        <!-- Jobs -->
        <div id="jobs" class="Capsid-section Capsid-section-jobs" >
          <div class="Capsid-section-header">
            <h2 class="Capsid-section-heading" >Latest Jobs</h2>
            <div class="Capsid-section-heading-description">
              <nuxt-link to="/jobs" class="_button --short CTA --outline _margin-right-half-i _margin-bottom-none">View all jobs</nuxt-link>
              <nuxt-link to="/jobs?tab=Post-a-Job" target="_blank" class="_button --short CTA --outline _margin-bottom-none">Post a job for free</nuxt-link>
            </div>
          </div>
          <div v-if="jobs.length > 0" >
            <div v-for="item of jobs" :key="item.id" class="_margin-bottom">
              <CapsidJob :atom="item" />
            </div>
          </div>
          <div v-else class="_card _color-bg-white _padding _md-pfix" v-html="$md.render(emptyJobs || '')" />
        </div>

        <!-- Community -->
        <div id="community" class="Capsid-section Capsid-section-community" >
          <div class="Capsid-section-header">
            <h2 class="Capsid-section-heading" >Community Board</h2>
            <div class="Capsid-section-heading-description">
              <nuxt-link to="/community" class="_button --short CTA --outline _margin-right-half-i">View all posts</nuxt-link>
              <nuxt-link to="/community?tab=Post-a-Message" class="_button --short CTA --outline">Post a message</nuxt-link>
            </div>
            <div v-html="$md.render(communityDesc || '')" />
          </div>
          <div v-if="community.length > 0" >
            <div v-for="item of community" :key="item.id" class="_margin-bottom">
              <CapsidCommunity :atom="item" />
            </div>
          </div>
          <div v-else class="_card _color-bg-white _padding _md-pfix" v-html="$md.render(emptyCommunity || '')" />
        </div>

        <div id="article" class="Capsid-article" >
          <!-- twitter share on top -->
          <!-- <div class="_padding-left-2 _padding-right-2">
            <CapsidShare :link="twitterLink" class="_margin-top-2 _margin-bottom" message="Tweet this issue!" />
          </div> -->

          <div class="Capsid-body Capsid-section _margin-center">
            <div class="_section-article _padding-xs">
              <!-- <h1 v-if="issue.fields['Data:Title']" id="article" class="Capsid-title" v-html="issue.fields['Data:Title']" /> -->
              <h1 class="Capsid-title --title" v-html="$md.strip($md.render(issue.fields['Data:Title'] || ''))" />
              <!-- short description / name -->

              <div v-if="authors && authors[0]" >
                <AuthorCard v-for="item of authors" :key="item.id" :person="item" class="Capsid-author-short People-only-header --compact" />
              </div>
              <div v-else-if="issue.fields['Data:Author']" class="Capsid-author _padding-bottom" v-html="$md.render(issue.fields['Data:Author'] || '')" />
              <div v-if="issue.fields['Data:Body']" class="Capsid-content" v-html="$md.render(issue.fields['Data:Body'] || '')" />
            </div>

          </div>
        </div>

        <!-- <no-ssr>
          <div id="comments" class="Capsid-disqus">
            <vue-disqus :identifier="path" shortname="capsid-tail" url="https://phage.directory" />
          </div>
        </no-ssr> -->

      </div>

    </div>

    <div class="Capsid-footer _section-content _margin-center">

      <CapsidShare :link="twitterLink" class="_margin-top-2 _margin-bottom-2 _padding-xs" message="Tweet this issue!" />

      <div v-if="issue.fields['Manuscripts:Related']" class="Capsid-related Capsid-print-hidden _margin-top-2 _margin-bottom" >
        <h6 class="_padding-bottom-none">Related Article</h6>
        <CapsidStub :issue="relatedIssue" show-lede="true" class="--related" />
      </div>

      <NodeForm v-if="form" :src="form" class="Capsid-form" />
      
      <div v-if="authors && authors[0]" id="Capsid-authors" class="Capsid-authors" >
        <AuthorCard v-for="item of authors" :key="item.id" :person="item" class="Capsid-author-full --compact" />
      </div>
      <div v-else-if="issue.fields['Data:AuthorDescription']" class="Capsid-author Capsid-author-card" v-html="$md.render(issue.fields['Data:AuthorDescription'])" />

      <div v-if="citation" id="Capsid-cite" class="Capsid-cite" >
        <!-- NOTE: no citation data should show if we can't pull in dynamic author info -->
        <h6 class="__inline">How to Cite</h6>
        <div v-if="issue.fields['Meta:Citation:Text']" >
          <span v-html="$md.strip($md.render(issue.fields['Meta:Citation:Text'] || ''))" /><span> {{ '' | today }}.</span>
        </div>
        <div class="_font-smaller _padding-bottom-half">To cite this, please use:</div>
        <div class="Capsid-apa _font-smaller _card _padding" v-html="$md.render(citation.apa || '' )" />
        <div class="_font-smaller _padding-bottom-half _margin-top-2">BibTeX citation:</div>
        <div class="Capsid-bibtex _font-smaller _card _padding" v-html="$md.render(citation.bibtex || '' )" />
      </div>


      <div id="Capsid-rss" class="_section-content _margin-center">
        <span class="_font-phage icon-rss _padding-right"/> <a href="https://phage.directory/feed.xml" target="_blank" class="">RSS Feed</a>
      </div>

      <div id="Capsid-license" class="_section-content _margin-center">
        <div class=" _margin-center _font-small">
          All diagrams and text in this issue of Capsid & Tail is licensed under <a href="https://creativecommons.org/licenses/by/4.0/">Creative Commons Attribution CC-BY 4.0, unless otherwise noted.</a>
          <div class="_padding-top-half">
            <span class="">
              <span class="_font-phage icon-cc _margin-right-half"/>
              <span class="_font-phage icon-cc-by"/>
            </span>
          </div>
        </div>
      </div>

      <div v-if="!issue || issue === 'undefined'" class="_section-content _margin-center _padding">
        <div >
          <h4>Sorry, no Capsid & Tail issue was found at this URL</h4>
          <div>
            If you think this is a bug, please email us at <a href="mailto:support@phage.directory">support@phage.directory</a>
          </div>
        </div>
      </div>

      <div class="_section-content _margin-center">
        <div class=" _margin-center _font-small" v-html="$md.render(fineprint || '')" />
      </div>

      <div class="Capsid-prompt Capsid-print-hidden _section-content _margin-center _padding">
        <div class="_section-article _margin-center _margin-bottom" v-html="$md.render(signup || '')" />
        <div class="_section-article _margin-center" v-html="$md.render(tip || '')" />
      </div>

    </div>

  </div>

</template>


<script>

import { mapState } from 'vuex'
import CapsidShare from '~/components/publications/CapsidShare'
import CapsidSponsor from '~/components/publications/CapsidSponsor'
import CapsidNew from '~/components/publications/CapsidNew'
import CapsidJob from '~/components/publications/CapsidJob'
import CapsidCommunity from '~/components/publications/CapsidCommunity'
import CapsidStub from '~/components/publications/CapsidStub'
// import { loadQuery } from '~/other/loaders'
import AuthorCard from '~/components/dir/PeopleCard'
import Alert from '~/components/Alert'

// import AxiosPost from '~/components/AxiosPost.vue'
import NodeForm from '~/components/render/NodeForm'
import { headMatter } from '~/other/headmatter.js'

export default {

  components: {
    Alert,
    CapsidSponsor,
    CapsidShare,
    CapsidNew,
    CapsidJob,
    CapsidCommunity,
    CapsidStub,
    NodeForm,
    AuthorCard,
  },

  props: {
    'issue': Object,
    'atoms': Array,
    'authors': Array,
    'citation': Object,
  },

  head () {

    let author
    if(this.authors && this.authors.length > 0 && this.authors[0]) {
      author = this.authors[0]
    }

    let head = headMatter({
      title: this.issue.fields['Data:Title:String'],
      description: this.issue.fields['Data:Lede'] || "Capsid & Tail is a micro-publication about all things phages",
      author: author ? author.fields['Name'] : undefined,
      twitterCreator: author ? author.fields['Social:Twitter'] : undefined,
      imageUrl: this.issue.fields['Cover:url'] || 'https://phage.directory/cnt_twitter_card.png', 
      url: this.issue.fields['URL'],
    })

    return head
  },

  data: function () {

    // if(process.server && process.pd_env == 'stage') {
    // console.log('capsid data:', process.env.pd_env)
    if(process.env.pd_env == 'stage') {
      console.log('[Capsid] Cached data conversion:')
      // console.log('[Capsid] Cached data conversion:', this.$store.state['cytosisStore'][this.issue.fields['Slug']])
      console.log(JSON.stringify(this.$store.state['cytosisStore'][this.issue.fields['Slug']]))
    }

    return {
      path: this.$route.path,
      
      intro: this.$cytosis.findField('capsid-intro', this.$store.state['Content'], 'Markdown' ),
      signup: this.$cytosis.findField('capsid-signup-micro', this.$store.state['Content'], 'Markdown' ),
      tip: this.$cytosis.findField('capsid-tip', this.$store.state['Content'], 'Markdown' ),
      fineprint: this.$cytosis.findField('capsid-fineprint', this.$store.state['Content'], 'Markdown' ),

      communityDesc: this.$cytosis.findField('capsid-community-desc', this.$store.state['Content'], 'Markdown' ),
      emptyCommunity: this.$cytosis.findField('capsid-community-empty', this.$store.state['Content'], 'Markdown' ),
      emptyJobs: this.$cytosis.findField('capsid-jobs-empty', this.$store.state['Content'], 'Markdown' ),
    }
  },

  computed: {
    ...mapState([
      'Content',
      ]),

    form() {
      if(this.issue.fields['Node:Form'])
        return this.$cytosis.getLinkedRecords(this.issue.fields['Node:Form'], this['Content'], true).reverse()[0]
      return undefined
    },

    sponsors() {
      return this.$cytosis.getLinkedRecords(this.issue.fields['Atoms:Sponsors'], this.atoms, true).reverse()
    },

    alerts() {
      return this.$cytosis.getLinkedRecords(this.issue.fields['Atoms:Alerts'], this.atoms, true).reverse()
      // return this.atoms.filter(atom => atom.fields['Atom:Type'] == 'Job')
    },

    jobs() {
      return this.$cytosis.getLinkedRecords(this.issue.fields['Atoms:Jobs'], this.atoms, true).reverse()
      // return this.atoms.filter(atom => atom.fields['Atom:Type'] == 'Job')
    },

    relatedIssue() {
      return {
        fields: {
          'Name': this.issue.fields['Manuscripts:Related:Name'][0],
          'Data:Title': this.issue.fields['Manuscripts:Related:Title'][0],
          'Data:Date': this.issue.fields['Manuscripts:Related:Date'][0],
          'Data:Lede': this.issue.fields['Manuscripts:Related:Lede'][0],
          'Slug': this.issue.fields['Manuscripts:Related:Slug'][0],
        }
      }
    },

    readtimeContent() {
      // add up all the lengthy content for read time
      let content = this.issue.fields['Data:Body']

      this.updates.map((item) => {
        content += ' ' + item.fields['Markdown']
      })

      this.community.map((item) => {
        content += ' ' + item.fields['Markdown']
      })

      this.jobs.map((item) => {
        content += ' ' + item.fields['Markdown']
      })

      return content
    },

    updates() {
      // console.log(this.issue.fields['Atoms:Updates'])
      // reverse() is called b/c airtable returns them in reverse order w/r to how they're sorted
      // in a cell
      return this.$cytosis.getLinkedRecords(this.issue.fields['Atoms:Updates'], this.atoms, true).reverse()
      // these end up being unsorted
      // return this.atoms.filter(atom => atom.fields['Atom:Type'] == 'Update')
    },

    community() {
      return this.$cytosis.getLinkedRecords(this.issue.fields['Atoms:Community'], this.atoms, true).reverse()
      // return this.atoms.filter(atom => atom.fields['Atom:Type'] == 'Community')
    },

    twitterLink() {
      /*
        https://www.thesocialmediahat.com/article/how-attach-images-tweet-buttons

        https://stackoverflow.com/questions/9127808/how-do-you-include-hashtags-within-fitter-share-link-text
        
        https://twitter.com/intent/tweet?
        url=<url to tweet>
        text=<text to tweet>
        hashtags=<comma separated list of hashtags, with no # on them>

        https://twitter.com/intent/tweet?url=http://www.example.com&text=I+am+eating+branston+pickel+right+now&hashtags=bransonpickel,pickles

        Image example
        - must already have shared on twitter somewhere
        https://twitter.com/intent/tweet?&text=Phage+Therapy+Crowdsourcing+Infographic+by+@phagedirectory+pic.twitter.com/JMJfiertE1&hashtags=phagetherapy,phage,crowdsourcing,phagedirectory
      */
       
       // issue.fields['TwitterText']

       // generated from janistanian
       // https://pbs.twimg.com/media/DtRXxsOUwAAo-Iz.jpg:large
      const text = this.issue.fields['Social:Twitter'] || this.issue.fields['Data:Lede'] || 'Capsid & Tail'
      const url = this.issue.fields['URL']
      const tags = this.issue.fields['Social:Twitter:Tags']

      return `https://twitter.com/intent/tweet?url=${url}&text=${text}&hashtags=${tags}`
    },



  },

  methods: {

  }

}
</script>

