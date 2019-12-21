

<!-- 

  Component for displaying a Capsid issue 

  CapsidFive 
    [based on medium and the hustle]
    - ex: https://mail.google.com/mail/u/0/#search/thehustle/FMfcgxwDrlcXXffxMKgwHRrlQpvFwvzq
    - ex: https://blog.superhuman.com/how-to-design-delightful-dark-themes-7b3da644ff1f

  Layout
    - Title
    - Issue # | Date | ## minute read 
    - Cover Image
    - Menu (desktop: to the right of content, otherwise full width)
    - Atoms
      - Shorter headers / slivers for each, and no bg color — only the title should have bg color, and headers are sticky — mobile gets a "next ->" header
    - Rename Article to "Feature"
    - Author(s) profile images and names — simplify this bit like medium
    - Feature copy
    - Full author bio should be streamlined somehow
    - Add editor bio as well (e.g. the hustle — in future we'll have other editors)
    - DOI submission online?

 -->
<template>

  <div class="Capsid Capsid-Issue _section-article-wide _margin-center">
    <!-- <h2> Capsid Five Prototype </h2> -->
    <!-- #2c4a54 -->
    <div v-if="issue" class="" >

      <div>
        
        <div id="intro" class="Capsid-intro" >
          <div class="Capsid-header _padding _padding-top-2 ">
            <div class="Capsid-masthead _margin-center" >
              <nuxt-link to="/capsid" class="_grid-auto-1-xs _align-vertically --underline-none">
                <img class="cnt _block _margin-center" src="/cnt.png" width="80px" alt="Capsid and Tail" >
                <div class="Capsid-masthead-title _left _font-serif">A weekly phage periodical</div>
              </nuxt-link>
            </div>

            <div class="_padding-top _margin-center _margin-top-none-i _margin-bottom-none-i">

              <!-- <nuxt-link :to="`/capsid/${issue.fields['Slug']}`"> -->
              <h1 class="Capsid-title _padding-top" v-html="$md.strip($md.render(issue.fields['Data:Title'] || ''))" />
              <!-- </nuxt-link> -->


              <div class="Capsid-meta">
                <div>
                  <span class="Capsid-title _font-bold">{{ issue.fields['Name'] }}</span> | 
                  <span class="Capsid-date">{{ issue.fields['Data:Date'] | niceDate }}</span>
                </div>
                <div class="Capsid-readtime _font-small _padding-top-half _padding-bottom">
                  {{ readtimeContent | readtime }} min read
                </div>
              </div>

            </div>

          </div>

          <figure v-if="issue.fields['Cover:url'] && issue.fields['Cover:showOnIssue']" class="Capsid-cover-container">
            <img class="Capsid-cover" 
                 :class="issue.fields['Cover:attrs'] || '_img-fit-cover'"
                 :style="issue.fields['Cover:style']"
                 :src="issue.fields['Cover:url']" alt="Capsid and Tail"
            >
            <figcaption v-if="issue.fields['Cover:description']" class="Capsid-cover-description _font-smaller _padding _color-disabled" v-html="$md.render(issue.fields['Cover:description'] ||'')" />
          </figure>

        </div>


        <Template class="Capsid-main ">

          <!-- handing slot into child template -->
          <template v-slot:sidebar >
            <slot name="sidebar" />
          </template>
        
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

            <CapsidShare :link="twitterLink" message="Tweet this issue!" class="_margin-top _margin-bottom-2" />

            <!-- leave Sponsors ABOVE the whats new area to call it out -->
            <div v-if="sponsors.length>0" class="Capsid-sponsor _padding" >
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

            <!-- Meta / intro -->
            <div v-if="issue.fields['Data:Meta']" id="whats-meta" class="Capsid-section Capsid-section-meta" >
              <div class="Capsid-section-header _grid-1-auto-xs _align-vertically">
                <div class="Capsid-section-heading Capsid-section-heading-lite" v-html="$md.strip($md.render(issue.fields['Data:Meta'] || ''))" />
              </div>
            </div>
            
            <div v-scroll-spy class="scrollspy">

              <!-- What's New -->
              <div id="whats-new" class="Capsid-section Capsid-section-new" >
                <div class="Capsid-section-header _grid-1-auto-xs _align-vertically">
                  <h2 class="Capsid-section-heading" >What’s New</h2>
                  <div class="Capsid-section-heading-description _padding-half ">
                    <a href="/capsid/tips" class="_padding-right">Suggest an article</a>
                  </div>
                </div>

                <div class="Capsid-section-content" >
                  <div v-if="updates.length > 0" >
                    <div v-for="item of updates" :key="item.id" class="_margin-top" >
                      <CapsidNew :atom="item" />
                    </div>
                  </div>
                  <div v-else class="_card _color-bg-white _padding">Nothing new this week</div>
                </div>
              </div>

              <!-- Jobs -->
              <div id="jobs" class="Capsid-section Capsid-section-jobs" >
                <div class="Capsid-section-header _grid-1-auto-xs _align-vertically">
                  <h2 class="Capsid-section-heading" >Latest Jobs</h2>
                  <div class="Capsid-section-heading-description">
                    <nuxt-link to="/jobs" class="_padding-right">All Jobs</nuxt-link>
                    <nuxt-link to="/jobs?tab=Post-a-Job" target="_blank" class="_padding-right">Post a job</nuxt-link>
                  </div>
                </div>

                <div class="Capsid-section-content" >
                  <div v-if="jobs.length > 0" >
                    <div v-for="item of jobs" :key="item.id" class="_margin-top">
                      <CapsidJob :atom="item" />
                    </div>
                  </div>
                  <div v-else class="_card _color-bg-white _padding _md-pfix" v-html="$md.render(emptyJobs || '')" />
                </div>

              </div>

              <!-- Community -->
              <div id="community" class="Capsid-section Capsid-section-community" >
                <div class="Capsid-section-header _grid-1-auto-xs _align-vertically">
                  <h2 class="Capsid-section-heading" >Community Board</h2>
                  <div class="Capsid-section-heading-description">
                    <nuxt-link to="/community" class="_padding-right">All posts</nuxt-link>
                    <nuxt-link to="/community?tab=Post-a-Message" class="_padding-right">Post a message</nuxt-link>
                  </div>
                </div>

                <div class="Capsid-section-content" >
                  <div v-html="$md.render(communityDesc || '')" />

                  <div v-if="community.length > 0" >
                    <div v-for="item of community" :key="item.id" class="_margin-bottom">
                      <CapsidCommunity :atom="item" />
                    </div>
                  </div>
                  <div v-else class="_card _color-bg-white _padding _md-pfix" v-html="$md.render(emptyCommunity || '')" />
                </div>
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

              <CapsidShare :link="twitterLink" class="_margin-top-2 _margin-bottom-2 _padding-xs" message="Tweet this issue!" />
            </div>

          </div>


        </Template>


      </div>

    </div>

    <div class="Capsid-footer Capsid-section _padding _margin-center">

      <div v-if="issue.fields['Manuscripts:Related']" class="Capsid-related Capsid-print-hidden _divider-top _margin-bottom" >
        <h6 class="_padding-bottom-none">Related Article<span v-if="relatedIssues.length>0">s</span></h6>
        <CapsidStub v-for="item of relatedIssues" :key="item.fields['Name']" :issue="item" show-lede="true" class="--related _margin-top" />
      </div>

      <!-- <NodeForm v-if="form" :src="form" class="Capsid-form" /> -->
      
      <div v-if="authors && authors[0]" id="Capsid-authors" class="Capsid-authors " >
        <AuthorCard v-for="item of authors" :key="item.id" :person="item" class="Capsid-author-full --compact" />
      </div>
      <div v-else-if="issue.fields['Data:AuthorDescription']" class="Capsid-author Capsid-author-card" v-html="$md.render(issue.fields['Data:AuthorDescription'])" />

      <div v-if="authors && authors[0] && citation" id="Capsid-cite" class="Capsid-cite _divider-top " >
        <!-- NOTE: no citation data should show if we can't pull in dynamic author info -->
        <h6 class="--inline">How to Cite</h6>
        <div v-if="issue.fields['Meta:Citation:Text']" >
          <span v-html="$md.strip($md.render(issue.fields['Meta:Citation:Text'] || ''))" /><span> {{ '' | today }}.</span>
        </div>
        <div class="_font-smaller _padding-bottom-half">To cite this, please use:</div>
        <div class="Capsid-apa _font-smaller _card _padding" v-html="$md.render(citation.apa || '' )" />
        <div class="_font-smaller _padding-bottom-half _margin-top-2">BibTeX citation:</div>
        <div class="Capsid-bibtex _font-smaller _card _padding" v-html="$md.render(citation.bibtex || '' )" />
      </div>


      <div class="_divider-top">
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

      <div class="Capsid-prompt Capsid-print-hidden _section-content _margin-center _padding _divider-top _divider-bottom ">
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
import CapsidStub from '~/components/publications/CapsidStub.vue'
// import { loadQuery } from '~/other/loaders'
import AuthorCard from '~/components/dir/PeopleCard.vue'
import Alert from '~/components/Alert.vue'

import Template from '~/templates/manuscript-capsid.vue'

// import AxiosPost from '~/components/AxiosPost.vue'
// import NodeForm from '~/components/render/NodeForm.vue'
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
    // NodeForm,
    AuthorCard,

    Template,
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
      twitterCard: "summary_large_image",
      title: this.$md.removeHTML(this.$md.render(this.issue.fields['Data:Title'] || '')),
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
      console.log(JSON.stringify(this.$store.state['cytosisStore'][this.issue.fields['Slug']]))


      
      // console.log('[Capsid] Cached data conversion:', this.$store.state['cytosisStore'][this.issue.fields['Slug']])
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

    relatedIssues() {

      let issues = []

      if(!this.issue.fields['Manuscripts:Related'])
        return undefined

      this.issue.fields['Manuscripts:Related'].map((item, i) => {
        let fields = {
          'Name': this.issue.fields['Manuscripts:Related:Name'][i],
          'Data:Title': this.issue.fields['Manuscripts:Related:Title'][i],
          'Data:Date': this.issue.fields['Manuscripts:Related:Date'][i],
          'Data:Lede': this.issue.fields['Manuscripts:Related:Lede'][i],
          'Slug': this.issue.fields['Manuscripts:Related:Slug'][i],
        }
        // wrap the object in a 'fields' root to mimic airtable's format
        issues.push({'fields': fields})
      })
      return issues

      // return {
      //   fields: {
      //     'Name': this.issue.fields['Manuscripts:Related:Name'][0],
      //     'Data:Title': this.issue.fields['Manuscripts:Related:Title'][0],
      //     'Data:Date': this.issue.fields['Manuscripts:Related:Date'][0],
      //     'Data:Lede': this.issue.fields['Manuscripts:Related:Lede'][0],
      //     'Slug': this.issue.fields['Manuscripts:Related:Slug'][0],
      //   }
      // }
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

