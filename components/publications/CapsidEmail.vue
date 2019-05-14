

<!-- 

  Component for displaying a Capsid issue 

 -->
<template>

  <div class="Capsid-email-container">
    <div class="Capsid-email Capsid" id="email">

      <div class="Capsid-header">
        <div class="">
          <div class="Capsid-meta">
            <div class="Capsid-name"><strong>{{ issue.fields['Name'] }}</strong></div>
            <div class="Capsid-date">{{ issue.fields['Data:Date'] | niceDate }}</div>
            <div class="_padding-bottom">
              <a :href="`https://phage.directory/capsid/${issue.fields['Slug']}`">
                Read this issue on Phage Directory
              </a>
            </div>
          </div>

          <!-- <a :href="`https://phage.directory/capsid/${issue.fields['Slug']}`"> -->
          <h1 class="Capsid-title" v-html="$md.strip($md.render(issue.fields['Data:Title']))" />
          <!-- </a> -->
          <div class="_section-article">
            <h4 class="Capsid-lede" v-html="$md.strip($md.render(issue.fields['Data:Lede'] || ''))" />
            
            <div class="_padding-bottom"  v-if="issue.fields['Data:Abstract']">
              <div class=" _margin-bottom _md-p_fix" 
                   v-html="$md.render(issue.fields['Data:Abstract'] || '')" />
            </div>
          </div>

          <CapsidShare :link="getTwitterLink(issue)" message="Tweet this issue!" />

          <!-- leave Sponsors ABOVE the whats new area to call it out -->
          <div v-if="sponsors.length>0" class="Capsid-sponsor _padding-top _margin-bottom-2" >
            <div v-for="item of sponsors" :key="item.id" class="_margin-bottom" >
              <CapsidSponsor :atom="item" />
            </div>
          </div>

        </div>
      </div>


      <div class="Capsid-toc _margin-center">

        <!-- What's New -->
        <div class="Capsid-toc-new">
          <div class="Capsid-toc-section">
            <div class="Capsid-toc-title _padding-bottom">
              <h2 class=" _font-bold">What’s New</h2>
              Have an idea for us? 
              <div class="">
                <a href="/capsid/tips" class="_button --short CTA --outline ">Send us a tip!</a>
              </div>
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
            <div class="Capsid-toc-title _padding-bottom">
              <h2 class="_font-bold">Latest Jobs</h2>
              <!-- <div class="_right-sm ">
                <nuxt-link to="/jobs" class=" _margin-right">View all jobs</nuxt-link>
                <nuxt-link to="/services#jobs" class="">Post a job</nuxt-link>
              </div> -->
              <div class="">
                <nuxt-link to="/jobs" class="_button --short CTA --outline _margin-right-half-i _margin-bottom-none">View all jobs</nuxt-link>
                <nuxt-link to="/jobs?tab=Post-a-Job" target="_blank" class="_button --short CTA --outline _margin-bottom-none">Post a job for free</nuxt-link>
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
            <div class="Capsid-toc-title _padding-bottom">
              <h2 class="_font-bold">Community Board</h2>
                <div class="">
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
            <div v-else class="_card _padding _md-pfix" v-html="$md.render(emptyCommunity || '')" />
          </div>
        </div>
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


            <div v-if="issue.fields['Data:AuthorDescription']" class="Capsid-author Capsid-author-card _card _padding" v-html="$md.render(issue.fields['Data:AuthorDescription'])" />

          </div>
        </div>
      </div>



      <div class="Capsid-email-footer _padding-top">
        <div class="Capsid-Email-footer-twitter">
          Like this issue? 
          <!-- Share the link below, or <a :href="getTwitterLink()" target="_blank">Share on twitter ➞</a> -->
        </div>
        <div class="">
          <CapsidShare :link="getTwitterLink(issue)" class="_padding-top" message="Tweet this issue!" />
        </div>
        <p>Or share this link:</p>
        <div class="Capsid-email-footer-share">
          <a href="https://phage.directory/capsid/first-engineered-phage-therapy/" target="_blank">https://phage.directory/capsid/first-engineered-phage-therapy/</a>
        </div>
      </div>

    </div>


    <div class="Capsid-generated _padding-2 _card --fyi _section-article _margin-center _margin-bottom-2">
      {{ html }}
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

export default {

  components: {
    CapsidShare,
    CapsidNew,
    CapsidJob,
    CapsidCommunity,
    CapsidSponsor,
  },

  props: {
    'issue': Object,
    'atoms': Array,
    'isFeatured': Boolean,
  },
  // isFeatured: means it shows up first on the News list



  data: function () {

    return {

      html: '',
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

  mounted() {
    this.html = document.getElementById('email').innerHTML
  },

  computed: {
    ...mapState([
      'Content',
      ]),


    sponsors() {
      console.log('--sponsors?', this.atoms)
      return this.$cytosis.getLinkedRecords(this.issue.fields['Atoms:Sponsors'], this.atoms, true).reverse()
    },

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








    getTwitterLink() {
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

  }

}
</script>


<style lang="scss">

$size: 16px;

.Capsid-title {
  padding-top: $size;
  padding-bottom: $size;
  font-weight: bold;
}
.Capsid-lede {
  padding-top: $size;
  padding-bottom: $size*2;
}
.Capsid-twitter {
  font-weight: bold;
  padding-bottom: $size;
}
h2 { // used for section headers
  font-size: 21px;
  margin-bottom: 8px;
  line-height: 48px;
}
h3 {
  padding-top: $size * 2;
}
h4 {
  padding-top: $size * 2;
}
h5 {
  font-size: 21px;
  line-height: 26px;
  padding-top: $size / 2;
  padding-bottom: $size / 2;
}
h6 {
  font-weight: 700;
  font-size: 14px;
  line-height: 35px;
  text-transform: uppercase;
  letter-spacing: 1.2px;
}

.Capsid-item {
  padding: $size;

  border-radius: 4px;
  background: white;
  margin-bottom: 16px;

  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
}
  .Capsid-item {
    img {
      width: 100%;
    } 
  }


.Capsid-toc {
}
  .Capsid-toc-new {
    background-color: #F2F8FD;
    margin-top: $size;
    padding: $size;
    @media only screen and (max-width: 680px){
      padding: $size 0 !important;
    }
  }
  .Capsid-toc-jobs {
    background-color: #FFF1F3;
    margin-top: $size;
    padding: $size;
    @media only screen and (max-width: 680px){
      padding: $size 0 !important;
    }
  }
  .Capsid-toc-community {
    background-color: #FCFAEF;
    margin-top: $size;
    padding: $size;
    @media only screen and (max-width: 680px){
      padding: $size 0 !important;
    }
  }

  .Capsid-toc-title {
    @media only screen and (max-width: 680px){
      padding: $size;
    }
  } 

.Capsid-email-footer-share {
  background-color: #4C6882;
  padding: $size;
  // font-weight: bold;
  a { 
    font-size: 18px !important;
    color: white !important;
  }
}

._tag {
  background-color: #eeeeee;
  border-radius: 4px;
  border: 1px solid #eeeeee;
  color: #000000;
  display: inline-block;
  font-size: 14px;
  outline: none!important;
  padding: 1px 8px;
  text-decoration: none;
  margin-bottom: 8px !important;
  margin-right: 4px !important;
}
  .--highlight {
    background-color: #D6F9FF;
  }

._card {
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.08);
  border: 1px solid #EEEEEE;
  overflow: auto;
  border-radius: 4px;
  margin-bottom: 16px;
  background-color: #FAFAFA;
}

._button.--short {
  padding-left: 8px;
  padding-right: 8px;
  font-size: 16px;
  line-height: 8px;
  border-width: 2px;
  border-style: solid;
  background-color: #F1FBFF;
  padding-top: 9.5px;
  padding-bottom: 9.5px;
  display: inline-block;
  cursor: pointer;
  outline: none;
  border-radius: 4px;

  text-decoration: none;
  margin-right: 8px;
  border-color: #2E81AA;
  color: #2E81AA !important;

  // height: 32px;
  // height: 7px;
  margin-top: $size / 2;
  margin-bottom: $size / 2;
  font-weight: bold !important;
  text-decoration: none !important;

  &:hover {
    // color: #71EFF5 !important;
    border-color: #71EFF5 !important;
    background-color: #FFF !important;
  }
}

table.Capsid-author-header {
  td {
    vertical-align: middle;
    padding: $size / 2;
  }
}


ul {
  padding-inline-start: 18px;
}
li {
  padding-bottom: $size / 2;
}




._font-small {
  margin-bottom: $size / 2;
  font-size: 14px;
}
._margin-top-half {
  margin-top: $size / 2;
}
._padding {
  padding: $size;
}
._padding-left {
  padding-left: $size;
}
._padding-top {
  padding-top: $size;
}
._padding-top-2 {
  padding-top: $size * 2;
}
._padding-bottom {
  padding-bottom: $size;
}
._padding-bottom-2 {
  padding-bottom: $size * 2;
}

._color-bg-brand-5 {
  background-color: #F1FBFF;
}
</style>


