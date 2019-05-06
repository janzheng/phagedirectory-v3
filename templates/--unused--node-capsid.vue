

<!-- 

  Template for each Capsid & Tail issue

  DEPRECATED — use CapsidFour directly; this adds to a lot of confusion

 -->


<!--
<template>

  <div class="Capsid Capsid-Issue ">

    <CapsidFour :issue="issue" :atoms="atoms" />

    <div class="_section-content _margin-center">
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

  </div>
</template>

<script>

// import { mapState } from 'vuex'
import CapsidFour from '~/components/publications/CapsidFour.vue'
// import TemplateDocs from '~/templates/node-documentation'

export default {

  components: {
    CapsidFour,
    // TemplateDocs,
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

  data() {
    return {
      path: this.$route.path, 
      intro: this.$cytosis.find('Content.capsid-intro', {'Content': this.$store.state['Content']} )[0]['fields']['Markdown'],

      signup: this.$cytosis.find('Content.capsid-signup-micro', {'Content': this.$store.state['Content']} )[0]['fields']['Markdown'],
      highlight: this.$cytosis.find('Content.capsid-highlight', {'Content': this.$store.state['Content']} )[0]['fields']['Markdown'],

      fineprint: this.$cytosis.find('Content.capsid-fineprint', {'Content': this.$store.state['Content']} )[0]['fields']['Markdown'],
    }
  },

  computed: {
  },

  methods: {
  }

}
</script>
-->
