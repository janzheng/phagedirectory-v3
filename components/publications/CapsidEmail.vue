

<!-- 

  Component for displaying a Capsid issue on Email

  note: set all images to 564px width for Mailchimp templates

 -->

<template>

  <div class="Capsid-email-container">
    <div class="Capsid-email Capsid" id="email">

      <div class="Capsid-header Capsid-section">
        <!-- <img v-if="issue.fields['Cover:url'] && issue.fields['Cover:showOnIssue']" class="Capsid-cover" 
                 :src="issue.fields['Cover:url']" alt="Capsid and Tail"
        > -->

        <div class="">
          <div class="Capsid-meta">
            <div class="Capsid-name"><strong>{{ issue.fields['Name'] }}</strong></div>
            <div class="Capsid-date">{{ issue.fields['Data:Date'] | niceDate }}</div>
            <div class="Capsid-readtime">{{ readtimeContent | readtime }} min read</div>
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

            <div class="_padding-bottom">
              <a :href="`https://phage.directory/capsid/${issue.fields['Slug']}`">
                <img src="https://gallery.mailchimp.com/a95319e0a6f57b754b11012a8/images/abd04207-4e0b-4cac-976c-e26139ce5239.png" width="23" style="margin-right: 8px; position: relative; bottom: -5px" >Read this issue on Phage Directory
              </a>
            </div>
          </div>

          <CapsidShare :link="twitterLink" message="Tweet this issue!" class="_padding-bottom _margin-top" />

        </div>

        <div v-if="sponsors.length>0" class="Capsid-sponsor _padding" >
          <!-- Don't show Sponsor title, just keep the tag<h4 class="Capsid-sponsors-title">{{'Sponsors'}}</h4> -->
          <!-- <div class="_padding-left _padding-right"> -->
          <!-- </div> -->
          <div v-for="item of sponsors" :key="item.id" class="_margin-bottom" >
            <CapsidSponsor :atom="item" />
          </div>
        </div>

        <!-- leave Alerts ABOVE the whats new area to call it out -->
        <div v-if="alerts.length>0" class="Capsid-alerts " >
          <div v-for="item of alerts" :key="item.id" class="_margin-bottom" >
            <Alert :atom="item" />
          </div>
        </div>
      </div>





      <div class="Capsid-email-intro _margin-center">

        <!-- What's New -->
        <div id="whats-new" class="Capsid-section Capsid-email-block Capsid-section-new" style="background: #F2F8FD; padding: 16px;">
          <div class="Capsid-section-header">
            <h2 class="Capsid-section-heading" >What’s New</h2>
            <div class="Capsid-section-heading-description">
              <span style="padding-right: 16px;">Have an idea for us?</span> <a href="https://phage.directory/capsid/tips" class="_button --short CTA --outline _margin-left-half">Send us a tip!</a>
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
        <div id="jobs" class="Capsid-section Capsid-email-block Capsid-section-jobs" style="background: #FFF1F3; padding: 16px;">
          <div class="Capsid-section-header">
            <h2 class="Capsid-section-heading" >Latest Jobs</h2>
            <div class="Capsid-section-heading-description">
              <a href="https://phage.directory/jobs" class="_button --short CTA --outline _margin-right-half-i _margin-bottom-none">View all jobs</a>
              <a href="https://phage.directory/jobs?tab=Post-a-Job" target="_blank" class="_button --short CTA --outline _margin-bottom-none">Post a job for free</a>
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
        <div id="community" class="Capsid-section Capsid-email-block Capsid-section-community" style="background: #FCFAEF; padding: 16px;">
          <div class="Capsid-section-header">
            <h2 class="Capsid-section-heading" >Community Board</h2>
            <div class="Capsid-section-heading-description">
              <div class="_padding-bottom">
                <a href="https://phage.directory/community" class="_button --short CTA --outline _margin-right-half-i">View all posts</a>
                <a href="https://phage.directory/community?tab=Post-a-Message" class="_button --short CTA --outline">Post a message</a>
              </div>
              <div v-html="$md.strip($md.render(communityDesc || ''))" />
            </div>
          </div>
          <div v-if="community.length > 0" >
            <div v-for="item of community" :key="item.id" class="_margin-bottom">
              <CapsidCommunity :atom="item" />
            </div>
          </div>
          <div v-else class="_card _color-bg-white _padding _md-pfix" v-html="$md.render(emptyCommunity || '')" />
        </div>

        <div id="article" class="Capsid-article" >
          <div class="Capsid-body Capsid-section _margin-center">
            <div class="_section-article _padding-xs">
              <h1 class="Capsid-title --title" v-html="$md.strip($md.render(issue.fields['Data:Title']))" />
              <div v-if="authors && authors[0]" >
                <AuthorCard v-for="item of authors" :key="item.id" :person="item" :isCompact="true" class="Capsid-author-short People-only-header --compact" />
              </div>
              <div v-else-if="issue.fields['Data:Author']" class="Capsid-author _padding-bottom" v-html="$md.render(issue.fields['Data:Author'] || '')" />
              <div v-if="issue.fields['Data:Body']" class="Capsid-content" v-html="$md.render(issue.fields['Data:Body'] || '')" />
            </div>

          </div>
        </div>

        
      </div>



      <div class="Capsid-email-footer Capsid-section _padding-top">

        <div v-if="issue.fields['Manuscripts:Related']" class="Capsid-related Capsid-print-hidden _margin-top-2" >
          <h6 class="_padding-bottom-none">Related Article</h6>
          <div class="_card _margin-bottom _padding">
            <div class="Capsid-Stub">
              <div class="Capsid-header _font--1 _grid-gap-small">
                <span class="Capsid-name _font-bold ">{{ relatedIssue.fields['Name'] }}</span> | 
                <span class="Capsid-date _right-sm">{{ relatedIssue.fields['Data:Date'] | niceDate }}</span>
              </div>
            </div>
            <h1 style="margin-top: 8px; padding-top: 0; padding-bottom: 4px" v-html="$md.strip($md.render(relatedIssue.fields['Data:Title'] || ''))" />
            <a :href="`httsp://phage.directory/capsid/${relatedIssue.fields.Slug}`" v-html="$md.strip($md.render(relatedIssue.fields['Data:Lede'] || ''))" />
          </div>
          <!-- <CapsidStub :issue="relatedIssue" show-lede="true" class="--related" /> -->
        </div>

        <div v-if="authors && authors[0]" id="Capsid-authors" class="Capsid-authors" >
          <AuthorCard v-for="item of authors" :key="item.id" :person="item" class="Capsid-author-full --compact" />
        </div>
        <div v-else-if="issue.fields['Data:AuthorDescription']" class="Capsid-author Capsid-author-card" v-html="$md.render(issue.fields['Data:AuthorDescription'])" />

        <div id="Capsid-cite" class="Capsid-cite" v-if="citationData">
          <h6 class="--inline">How to Cite</h6>
          <div v-if="issue.fields['Meta:Citation:Text']" >
            <span v-html="$md.strip($md.render(issue.fields['Meta:Citation:Text'] || ''))" /><span> {{ '' | today }}.</span>
          </div>

          <AxiosPost 
            v-if="citationData"
            class="Capsid-citations"
            url="https://wt-ece6cabd401b68e3fc2743969a9c99f0-0.sandbox.auth0-extend.com/PDv3-cite"
            :post="citationData"
          >
            <div slot-scope="{ loading, response: data }">
              <div v-if="loading">Loading...</div>
              <div v-else>
                <div class="_font-smaller _padding-bottom-half">To cite this, please use:</div>
                <div class="Capsid-apa _font-smaller _card _padding" v-html="$md.render(data.apa )" />
                <div class="_font-smaller _padding-bottom-half _margin-top-2">BibTeX citation:</div>
                <div class="Capsid-bibtex _font-smaller _card _padding" v-html="$md.render(data.bibtex)" />
              </div>
            </div>
          </AxiosPost>
        </div>


        <div class="Capsid-Email-footer-twitter">
          <h6 style="padding:0;">Like this issue?</h6> 
          <div style="padding-top: 8px;">
            <CapsidShare :link="twitterLink" message="Tweet this issue!" />
            <img width="23" style="position: relative; bottom: -3px; margin-right: 4px;" src="https://gallery.mailchimp.com/a95319e0a6f57b754b11012a8/images/2811e7ca-2266-4877-9eef-d1b1b32a34c2.png" class=""/> <a href="https://phage.directory/feed.xml" target="_blank" class="">RSS Feed</a>
          </div>
        </div>

        <div class="Capsid-Email-footer-share" style="padding-top: 16px;">
          <h6>Share this link:</h6>
          <div class="Capsid-email-footer-share _padding-top">
            <a :href="`https://phage.directory/capsid/${issue.fields['Slug']}`" target="_blank">https://phage.directory/capsid/{{issue.fields['Slug']}}/</a>
          </div>
        </div>

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
import { loadQuery } from '~/other/loaders'
import AuthorCard from '~/components/dir/PeopleCardEmail.vue'
import Alert from '~/components/Alert.vue'

import AxiosPost from '~/components/AxiosPost.vue'

export default {

  components: {
    Alert,
    CapsidSponsor,
    CapsidShare,
    CapsidNew,
    CapsidJob,
    CapsidCommunity,
    CapsidStub,
    AuthorCard,
    AxiosPost,
  },

  props: {
    'issue': Object,
    'atoms': Array,
  },

  head () {

    // strip html from title
    // let div = document.createElement("div")
    // div.innerHTML = this.$md.strip(this.$md.render(this.issue.fields['Data:Title']))
    // const title = div.textContent || div.innerText || ""
    const title = this.issue.fields['Data:Title']

    this.$head.setTitle(title || "Capsid & Tail")
    this.$head.setDescription(this.issue.fields['Data:Lede'] || "Capsid & Tail is a micro-publication about all things phages")

    if(this.authors && this.authors.length > 0 && this.authors[0]) {
      console.log('autho:',this.authors)
      this.$head.setAuthor(this.authors[0].fields['Name'] || "")
      this.$head.setTwitterCreator(this.authors[0].fields['Social:Twitter'] || "")
    }

    if(this.issue.fields['Cover'])
      this.$head.setImage(this.issue.fields['Cover'][0]['url'] || 'https://phage.directory/cnt_twitter_card.png')
    
    return this.$head.get()
  },



  data: function () {

    // if we're grabbing author info from DB:People
    const _this = this
    let authors = []
    let authorPromises = []
    let authorSlugs = []
    let authorObj = {} // need to use an obj instead of array, since authors don't return in order from server; need to track order w/ obj

    const getAuthor = function() {
      // console.log('fetching authors:')

      // ensures corr. author is first
      // REMINDER: Authors always returns as an array; if there are no attached authors
      // or if the slug is incorrect, the array will look like "[undefined]" (one item long, w/ undefined) 
      authorSlugs = _this.issue.fields['Data:MainAuthorSlug']

      if (_this.issue.fields['Data:AuthorSlugs'])
        authorSlugs = [... _this.issue.fields['Data:MainAuthorSlug'], ... _this.issue.fields['Data:AuthorSlugs']]

      if(authorSlugs) {
        authorSlugs.map(function(slug) {
          const item = loadQuery({
            _key: process.env.db_api, 
            _base: process.env.db_base, 
            store: _this.$store, 
            routeName: 'Capsid-email', 
            query: process.env.pd_env == 'stage' ? 'People-profile-preview' : 'People-profile',
            keyword: slug,
          })
          authorPromises.push(item)
        })
      }

    }
    
    if(this.issue.fields['Data:MainAuthorSlug'] || this.issue.fields['Data:AuthorSlugs']) {
      getAuthor() // async; populates this.authors directly when loaded

      Promise.all(authorPromises).then(function(data) {
        data.map((cytosis) => {
          const author = cytosis.tables['People'][0]
          authorObj[author.fields['Slug']] = author
        })


        // add them in order
        authorSlugs.map((slug) => {
          authors.push(authorObj[slug])
        })
      })
    }

    return {
      path: this.$route.path,
      authors: authors,
      
      intro: this.$cytosis.findField('Content.capsid-intro', this.$store.state['Content'], 'Markdown' ),
      signup: this.$cytosis.findField('Content.capsid-signup-micro', this.$store.state['Content'], 'Markdown' ),
      tip: this.$cytosis.findField('Content.capsid-tip', this.$store.state['Content'], 'Markdown' ),
      fineprint: this.$cytosis.findField('Content.capsid-fineprint', this.$store.state['Content'], 'Markdown' ),

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

    citationData() {
      // all author data loaded in async, so need to verify data is complete by using array len
      // every article will have one corr. author, plus a variable # of authors
      const authorCount = this.issue.fields['Data:AuthorSlugs'] ? this.issue.fields['Data:AuthorSlugs'].length : 0
      if(this.authors && this.authors[0] && this.authors.length == authorCount + 1) {
        const date = new Date(this.issue.fields['Data:Date'])

        let authorNames = []
        this.authors.map((item) => authorNames.push(item.fields['Name']))
        // console.log('author names:', authorNames.join(' and '))

        return {
          source: `
            @article{${this.issue.fields['Slug']}${date.getFullYear()},
              author = {${authorNames.join(' and ')}},
              date = {${date.getFullYear()}},
              day = {${date.getDay()}},
              month = {${date.getMonth()}},
              title = {{${this.issue.fields['Data:Title:String']}}},
              journal = {Capsid & Tail},  
              publisher = {Phage Directory},
              number = {${this.issue.fields['Data:Issue']}},
              url = {${this.issue.fields['URL']}},
            }
          `
        }
      }
      return undefined
    }
  },

  methods: {

  }

}
</script>



































<style>

img {
  max-width: 100% !important;
} 


.Capsid-cover {
  max-height: 300px;
  object-fit: cover;
  padding-bottom: 16px;
}

.Capsid-content {
  width: 100%;
}
  .Capsid-content img {
    max-width: 600px;
    /*max-width: 100%;*/
  }

.Capsid-title {
  padding-top: 16px;
  padding-bottom: 16px;
  font-weight: bold;
}
.Capsid-lede {
  padding-top: 16px;
  padding-bottom: 32px;
}
.Capsid-twitter {
  font-weight: bold;
}
h1 {
  margin-top: 32px;
}
h2 {
  font-size: 21px;
  line-height: 48px;
}
h3 {
  padding-top: 32px;
}
h4 {
  padding-top: 32px;
  padding-bottom: 8px;
}
h5 {
  font-size: 21px;
  line-height: 26px;
  padding-top: 24px;
  padding-bottom: 8px;
}
h6 {
  font-weight: 700;
  font-size: 14px;
  line-height: 35px;
  text-transform: uppercase;
  letter-spacing: 1.2px;
}

a {
  font-weight: bold;
}

._block {
  display: block;
}

.Dir-title {
  /*white-space: pre-line;*/
}

@media only screen and (max-width: 480px) {
  .People-card-email td {
    display: block !important;
  }

  .People-profile {
    padding-bottom: 0 !important;
    /*margin-bottom: 16px;*/
  }

  .People-info {
    /*
    padding-top: 0 !important;
    margin-top: 16px;
    */
  }

  .Dir-social.Dir-title {
    text-align: left !important;
    padding-top: 16px;
    padding-bottom: 16px;
  }
}

.Capsid-item {
  padding: 16px;

  border-radius: 4px;
  background: white;
  margin-bottom: 16px;

  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
}

img {
  max-width: 100% !important;
} 

  .Capsid-item img {
    width: 100%;
  }




.Capsid-email-block {
  padding: 8px;
  padding-left: 4px;
  padding-right: 4px;
}
  .Capsid-section-heading {
    padding-left: 8px;
    padding-right: 8px;
  }
  .Capsid-section-heading-description {
    padding-left: 8px;
    padding-right: 8px;
    padding-bottom: 16px;
  }
  .Capsid-section-new {
    background: #F2F8FD;
    padding: 16px;
  }
  .Capsid-section-jobs {
    background: #FFF1F3;
    padding: 16px;
  }
  .Capsid-section-community {
    background: #FCFAEF;
    padding: 16px;
  }

  @media only screen and (max-width: 480px){
    .Capsid-section-title {
      padding: 16px;
    }
  } 

.Capsid-email-footer-share {
  background-color: #4C6882;
  padding: 16px;
}
  .Capsid-email-footer-share a { 
    font-size: 18px !important;
    color: white !important;
    font-weight: normal !important;
  }

.Capsid-cite {
  font-size: 14px;
  padding-top: 32px;
  padding-bottom: 32px;
}

.Capsid-bibtex, .Capsid-bibtex .csl-entry, .Capsid-bibtex li {
  font-family: monospace;
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

  margin-top: 8px;
  margin-bottom: 8px;
  font-weight: bold !important;
  text-decoration: none !important;

}
._button.--short:hover {
  border-color: #71EFF5 !important;
  background-color: #FFF !important;
}

table.Capsid-author-header td {
  vertical-align: middle;
  padding: 8px;
}


ul {
  padding-inline-start: 18px;
}
li {
  padding-bottom: 8px;
}


.Alert.Urgent {
  margin-top: 16px;
  border-top: 2px solid #D43615;
  border-radius: 4px;
  padding: 16px;
}
  .Alert.Urgent .Alert-status-tag {
    display: block !important;
    padding: 4px 8px;
    border-radius: 4px;
    background-color: #D43615;
    color: #FAFAFA;
    margin-top: 8px;
    margin-bottom: 8px;
  }


._publons img {
  width: 0.9em;
}

._googlescholar img {
  width: 1em;
}


._font-small {
  margin-bottom: 8px;
  font-size: 14px;
}
._margin-top-half {
  margin-top: 8px;
}
._margin-right {
  margin-right: 16px;
}
._margin-bottom {
  margin-bottom: 8px;
}
._padding {
  padding: 16px;
}
._padding-left {
  padding-left: 16px;
}
._padding-top {
  padding-top: 16px;
}
._padding-top-2 {
  padding-top: 32px;
}
._padding-bottom {
  padding-bottom: 16px;
}
._padding-bottom-2 {
  padding-bottom: 32px;
}

._color-bg-brand-5 {
  background-color: #F1FBFF;
}


.Capsid-table {
  margin-top: 16px;
  margin-bottom: 16px;
}
.Capsid-table th, .Capsid-table td {
  padding: 4px;
  vertical-align: baseline;
}

.Capsid-table tbody tr:nth-child(odd) td {
  background-color: #EEEEEE;
}

.--featured {
  border-width: 2px;
  border-color: #71EFF5;
}


</style>
















