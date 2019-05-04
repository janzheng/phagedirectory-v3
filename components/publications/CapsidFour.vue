

<!-- 

  Component for displaying a Capsid issue 

 -->
<template>

  <div class="Capsid Capsid-Issue Template-Capsid ">
    <div class="_section-content _margin-center _card _margin-top-none-i" v-if="issue">

      <div class="scrollspy" v-scroll-spy>
        
        <div id="intro" class="Capsid-intro" >
          <div class="Capsid-masthead _section-page _margin-center _padding _padding-bottom-none-i " >
            <div class=" _section-content _margin-center">
              <nuxt-link to="/capsid" class="_grid-auto-1-xs _align-vertically --underline-none">
                <img class="cnt _block _margin-center" src="/cnt.png" width="120px" alt="Capsid and Tail" >
                <div class="Capsid-masthead-title _left _font-serif">A weekly phage periodical</div>
              </nuxt-link>
            </div>
          </div>

          <div class="Capsid-header _section-page _margin-center _padding">
            <div class="_section-content _margin-center">
              <div class="Capsid-meta">
                <span class="Capsid-title _font-bold">{{ issue.fields['Name'] }},</span>
                <span class="Capsid-date">{{ issue.fields['Data:Date'] | niceDate }}</span>
              </div>

              <nuxt-link :to="`/capsid/${issue.fields['Slug']}`">
                <h1 class="Capsid-title _padding-top" v-html="$md.strip($md.render(issue.fields['Data:Title']))" />
              </nuxt-link>
              <div class="_section-article">
                <div class="Capsid-lede _padding-bottom" v-html="$md.strip($md.render(issue.fields['Data:Lede'] || ''))" />
                
                <div class="_padding-bottom">
                  <div v-if="issue.fields['Data:Abstract']" 
                       class=" _margin-bottom _md-p_fix" 
                       v-html="$md.render(issue.fields['Data:Abstract'] || '')" />
                  <!-- <div class="Capsid-skipahead _padding-bottom">
                    Scroll down to <a class="_font-bold" href="#article">read this week's Featured Article</a>.
                  </div>  -->
                  <!-- <div v-if="issue.fields['Data:Author']" class="Capsid-author " v-html="$md.render(issue.fields['Data:Author'] || '')" /> -->
                </div>
              </div>


              <!-- leave Sponsors ABOVE the whats new area to call it out -->
              <div v-if="getSponsors(issue).length>0" class="Capsid-sponsor" >
                <!-- Don't show Sponsor title, just keep the tag<h4 class="Capsid-sponsors-title">{{'Sponsors'}}</h4> -->
                <div v-for="sponsor of getSponsors(issue)" :key="sponsor.fields['Name']" class="Capsid-sponsor-item" >
                  <div class="_md-p_fix" v-html="$md.render(sponsor.fields['Markdown'] || '')" />
                  <div v-if="sponsor.fields['Tags']" class="_margin-top-half" >
                    <span class="Capsid-item-tag _tag --sponsor">Sponsor</span>
                  </div>
                </div>
              </div>

              <CapsidShare :link="getTwitterLink(issue)" message="Tweet this issue!" />
            </div>
          </div>
        </div>

        <!-- What's New -->
        <div id="whats-new" class="Capsid-section Capsid-section-new" >
          <div class="Capsid-section-header">
            <h2 class="Capsid-section-heading" >What’s New</h2>
            <a href="mailto:capsid@phage.directory" class="_button --short --compact --outline">Send us a tip</a>
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
            <div class="">
              <nuxt-link to="/jobs" class="_button --short --compact --outline _margin-right-half-i _margin-bottom-none">View all jobs</nuxt-link>
              <nuxt-link to="/services#jobs" class="_button --short --compact --outline _margin-bottom-none">Post a job</nuxt-link>
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
            <div class="">
              <nuxt-link to="/community" class="_button --short --compact --outline _margin-right-half-i">View all posts</nuxt-link>
              <a href="mailto:board@phage.directory?subject=Phage%20Directory%20Community%20Board&body=Hi%20Phage%20Directory,%20I'd%20like%20to%20post%20a%20message%20to%20your%20community%20board%20..." class="_button --short --compact --outline">Post a message</a>
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

        <!-- Publications -->
        <!-- Alerts -->
        <!-- Events -->

        <div id="article" class="Capsid-article" >
          <!-- twitter share on top -->
          <!-- <div class="_padding-left-2 _padding-right-2">
            <CapsidShare :link="getTwitterLink(issue)" class="_margin-top-2 _margin-bottom" message="Tweet this issue!" />
          </div> -->

          <div class="Capsid-body _section-page _margin-center">
            <div class="Capsid-body _section-content _margin-center">

              <div class="_section-article">
                <!-- <h1 v-if="issue.fields['Data:Title']" id="article" class="Capsid-title" v-html="issue.fields['Data:Title']" /> -->
                <h1 class="Capsid-title" v-html="$md.strip($md.render(issue.fields['Data:Title']))" />
                <!-- short description / name -->
                <div v-if="issue.fields['Data:Author']" class="Capsid-author _padding-bottom-3" v-html="$md.render(issue.fields['Data:Author'] || '')" />
                <div v-if="issue.fields['Data:Body']" class="Capsid-content" v-html="$md.render(issue.fields['Data:Body'] || '')" />
              </div>

              <CapsidShare :link="getTwitterLink(issue)" class="_margin-top-2 _margin-bottom" message="Tweet this issue!" />

              <div v-if="issue.fields['Data:AuthorDescription']" class="Capsid-author Capsid-author-card" v-html="$md.render(issue.fields['Data:AuthorDescription'])" />

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

    <div class="_section-content _margin-center">

      <div v-if="!issue || issue === 'undefined'" class="_section-content _margin-center _padding">
        <div >
          <h4>Sorry, no Capsid & Tail issue was found at this URL</h4>
          <div>
            If you think this is a bug, please email us at <a href="mailto:support@phage.directory">support@phage.directory</a>
          </div>
        </div>
      </div>

      <div class="Capsid-footer _section-content _margin-center _padding">
        <div class="_section-article _margin-center _margin-bottom" v-html="$md.render(signup)" />

        <div class="_section-article _margin-center" v-html="$md.render(highlight)" />
      </div>

      <div class="_section-content _margin-center">
        <div class=" _margin-center _font-small" v-html="$md.render(fineprint || '')" />
      </div>

    </div>
  </div>

</template>


<script>

import { mapState } from 'vuex'
import CapsidShare from '~/components/publications/CapsidShare'
import CapsidNew from '~/components/publications/CapsidNew'
import CapsidJob from '~/components/publications/CapsidJob'
import CapsidCommunity from '~/components/publications/CapsidCommunity'

export default {

  components: {
    CapsidShare,
    CapsidNew,
    CapsidJob,
    CapsidCommunity,
  },

  props: {
    'issue': Object,
    'atoms': Array,
  },

  head () {

    this.$head.setTitle(this.issue.fields['Data:Title'] || "Capsid & Tail")
    this.$head.setDescription(this.issue.fields['Data:Lede'] || "Capsid & Tail is a micro-publication about all things phages")

    if(this.issue.fields['Cover'])
      this.$head.setImage(this.issue.fields['Cover'][0]['url'] || 'https://phage.directory/cnt_twitter_card.png')
    
    return this.$head.get()
  },

  data: function () {

    return {
      path: this.$route.path,

      intro: this.$cytosis.find('Content.capsid-intro', {'Content': this.$store.state['Content']} )[0]['fields']['Markdown'],
      signup: this.$cytosis.find('Content.capsid-signup-micro', {'Content': this.$store.state['Content']} )[0]['fields']['Markdown'],
      highlight: this.$cytosis.find('Content.capsid-highlight', {'Content': this.$store.state['Content']} )[0]['fields']['Markdown'],
      fineprint: this.$cytosis.find('Content.capsid-fineprint', {'Content': this.$store.state['Content']} )[0]['fields']['Markdown'],

      communityDesc: this.$cytosis.findOne('capsid-community-desc', this.$store.state['Content'] ).fields['Markdown'],
      emptyCommunity: this.$cytosis.findOne('capsid-community-empty', this.$store.state['Content'] ).fields['Markdown'],
      emptyJobs: this.$cytosis.findOne('capsid-jobs-empty', this.$store.state['Content'] ).fields['Markdown'],

    }
  },

  computed: {
    ...mapState([
      'Content',
      ]),

    jobs() {
      return this.$cytosis.getLinkedRecords(this.issue.fields['Atoms:Jobs'], this.atoms, true).reverse()
      // return this.atoms.filter(atom => atom.fields['Atom:Type'] == 'Job')
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
  },

  methods: {

    getSponsors(issue) {
      const sponsors = this.$cytosis.getLinkedRecords(issue.fields['Sponsors'], this['Updates'], true)

      // console.log('Sponsors:', sponsors)
      return sponsors.filter(t => t.fields['isPublished']) || undefined
    },

    getUpdates(issue) {
      const updates = this.$cytosis.getLinkedRecords(issue.fields['Updates'], this['Updates'], true)
      // console.log('Updates:', updates)
      return updates || undefined
    },

    getTwitterLink(issue) {
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
      const text = issue.fields['TwitterText'] || issue.fields['Lede'] || 'Capsid & Tail'
      const url = issue.fields['URL']
      const tags = issue.fields['TwitterTags']

      return `https://twitter.com/intent/tweet?url=${url}&text=${text}&hashtags=${tags}`
    },

  }

}
</script>

