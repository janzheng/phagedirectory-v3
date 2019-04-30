

<!-- 

  Component for displaying a Capsid issue 

 -->
<template>

  <div class="Capsid-article Capsid ">

    <div class="Capsid-masthead ">
      <div class="  _padding-bottom">
        <router-link to="/capsid" class="_grid-auto-1-xs _align-vertically --underline-none">
          <img class="cnt _block _margin-center" src="/cnt.png" width="120px" alt="Capsid and Tail" >
          <div class="Capsid-masthead-title _left _font-serif">A weekly phage periodical</div>
        </router-link>
      </div>
    </div>

    <div class="Capsid-header _section-page _margin-center">
      <div class=" _margin-center">
        <div class="Capsid-meta">
          <span class="Capsid-title _font-bold">{{ issue.fields['Name'] }},</span>
          <span class="Capsid-date">{{ issue.fields['Data:Date'] | niceDate }}</span>
        </div>

        <router-link :to="`/capsid/${issue.fields['Slug']}`">
          <h1 class="Capsid-title _padding-top-half _padding-bottom" v-html="$md.strip($md.render(issue.fields['Data:Title']))" />
        </router-link>
        <div class="_section-article">
          <div class="Capsid-lede" v-html="$md.strip($md.render(issue.fields['Data:Lede'] || ''))" />
          
          <div class="_padding-bottom">
            <div v-if="issue.fields['Data:Abstract']" 
                 class=" _margin-bottom _md-p_fix" 
                 v-html="$md.render(issue.fields['Data:Abstract'] || '')" />
            <div class="Capsid-skipahead _padding-bottom">
              Scroll down to <a class="_font-bold" href="#article">read this week's Featured Article</a>
            </div> 
            <div v-if="issue.fields['Data:Author']" class="Capsid-author " v-html="$md.render(issue.fields['Data:Author'] || '')" />
          </div>
        </div>


        <!-- leave Sponsors ABOVE the whats new area to call it out -->
        <div v-if="getSponsors(issue).length>0" class="Capsid-sponsor" >
          <!-- Don't show Sponsor title, just keep the tag<h4 class="Capsid-sponsors-title">{{'Sponsors'}}</h4> -->
          <div v-for="sponsor of getSponsors(issue)" v-if="sponsor && sponsor.fields['isPublished']" :key="sponsor.fields['Name']" class="Capsid-sponsor-item" >
            <div class="_md-p_fix" v-html="$md.render(sponsor.fields['Markdown'] || '')" />
            <div v-if="sponsor.fields['Tags']" class="_margin-top-half" >
              <span class="Capsid-item-tag _tag --sponsor">Sponsor</span>
            </div>
          </div>
        </div>

        <CapsidShare :link="getTwitterLink(issue)" message="Tweet this issue!" />
      </div>
    </div>


    <div class="Capsid-toc _margin-center">

      <!--<div class="Capsid-toc-featured">
        <div class="Capsid-toc-section">
          <!~~ <div class="_padding-bottom">
            <h5 class="">Featured Article</h5>
          </div> ~~>
          <div class="_card _padding">
            <!~~ <a href="#article"><h4 class="Capsid-title _padding-top-none _padding-bottom-half" v-html="issue.fields['Data:Title']" /></a> ~~>
            <div v-if="issue.fields['Data:Abstract']" 
                 class=" _margin-bottom _md-p_fix" 
                 v-html="$md.render(issue.fields['Data:Abstract'] || '')" />
            <div v-if="issue.fields['Data:Author']" class="Capsid-author " v-html="$md.render(issue.fields['Data:Author'] || '')" />
          </div>
          <div class="Capsid-skipahead">
            Scroll down to <a class="_font-bold" href="#article">read this week's Featured Article</a>
          </div> 
        </div>
      </div>-->

      <!-- What's New -->
      <div class="Capsid-toc-new">
        <div class="Capsid-toc-section">
          <div class="_grid-2-xs _padding-bottom">
            <h5 class="_font-bold">What’s New</h5>
            <a href="mailto:capsid@phage.directory" class="_right-sm ">Send us a tip</a>
          </div>
          <div v-if="updates.length > 0" >
            <div v-for="item of updates" :key="item.id" class="_margin-bottom" >
              <CapsidNew :atom="item" />
            </div>
          </div>
          <div v-else>
            Nothing new this week
          </div>
        </div>
      </div>

      <!-- Jobs -->
      <div class="Capsid-toc-jobs" >
        <div class="Capsid-toc-section">
          <div class="_grid-2-xs _padding-bottom">
            <h5 class="_font-bold">Latest Jobs</h5>
            <div class="_right-sm ">
              <router-link to="/jobs" class=" _margin-right">View all jobs</router-link>
              <router-link to="/services#jobs" class="">Post a job</router-link>
            </div>
          </div>
          <div v-if="jobs.length > 0" >
            <div v-for="item of jobs" :key="item.id" class="_margin-bottom">
              <CapsidJob :atom="item" />
            </div>
          </div>
          <div v-else class="_card _padding _md-pfix" v-html="$md.render(emptyJobs || '')" />
        </div>
      </div>

      <!-- Community -->
      <div class="Capsid-toc-community" >
        <div class="Capsid-toc-section">
          <div class="_grid-2-xs _padding-bottom">
            <h5 class="_font-bold">Community Board</h5>
            <div class="_right-sm ">
              <router-link to="/community" class=" _margin-right">View all posts</router-link>
              <a href="mailto:board@phage.directory?subject=Phage%20Directory%20Community%20Board&body=Hi%20Phage%20Directory,%20I'd%20like%20to%20post%20a%20message%20to%20your%20community%20board%20..." class="">Post a message</a>
            </div>
          </div>
          <div v-html="$md.render(communityDesc || '')" />
          <div v-if="community.length > 0" >
            <div v-for="item of community" :key="item.id" class="_margin-bottom">
              <CapsidCommunity :atom="item" />
            </div>
          </div>
          <div v-else class="_card _padding _md-pfix" v-html="$md.render(emptyCommunity || '')" />
        </div>
      </div>

      <!-- Publications -->
      <!-- Alerts -->
      <!-- Events -->

    </div>


    <div class="Capsid-article">
      <!-- twitter share on top -->
      <div class="Capsid-body  _margin-center">
        <div class="Capsid-body _margin-center">

          <div class="_section-article">
            <!-- <h1 v-if="issue.fields['Data:Title']" id="article" class="Capsid-title" v-html="issue.fields['Data:Title']" /> -->
            <h1 class="Capsid-title _padding-top-half _padding-bottom" v-html="$md.strip($md.render(issue.fields['Data:Title']))" />
            <!-- short description / name -->
            <div v-if="issue.fields['Data:Author']" class="Capsid-author _padding-bottom-3" v-html="$md.render(issue.fields['Data:Author'] || '')" />
            <div v-if="issue.fields['Data:Body']" class="Capsid-content" v-html="$md.render(issue.fields['Data:Body'] || '')" />
          </div>

          <CapsidShare :link="getTwitterLink(issue)" class="_margin-top-2 _margin-bottom" message="Tweet this issue!" />

          <div v-if="issue.fields['Data:AuthorDescription']" class="Capsid-author Capsid-author-card" v-html="$md.render(issue.fields['Data:AuthorDescription'])" />

        </div>
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
    'isFeatured': Boolean,
  },
  // isFeatured: means it shows up first on the News list



  data: function () {

    return {

      communityDesc: this.$cytosis.findOne('capsid-community-desc', this.$store.state['Content'] ).fields['Markdown'],
      emptyCommunity: this.$cytosis.findOne('capsid-community-empty', this.$store.state['Content'] ).fields['Markdown'],

      emptyJobs: this.$cytosis.findOne('capsid-jobs-empty', this.$store.state['Content'] ).fields['Markdown'],


      // emptyJobs: this.$cytosis.find('Content.capsid-empty-jobs', {'Content': this.$store.state['Content']} )[0]['fields']['Markdown'],
      // communityDescription: this.$cytosis.find('Content.capsid-community-description', {'Content': this.$store.state['Content']} )[0]['fields']['Markdown'],
      // jobsMailto: "https://phage.directory/services#jobs",
      // communityMailto: this.$cytosis.find('Content.community-mailto', {'Content': this.$store.state['Content']} )[0]['fields']['Markdown'],
      // jobsMailto: this.$cytosis.find('Content.jobs-mailto', this.$store.state.cytosis.tables)[0]['fields']['Markdown'],
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
      return sponsors || undefined
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

