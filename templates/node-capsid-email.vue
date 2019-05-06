
<!-- 

  Template for each Capsid & Tail issue

 -->

<template>

  <div class="Capsid Capsid-Email ">

    <CapsidEmail :issue="issue" :atoms="atoms" />

  </div>
</template>

<script>

// import { mapState } from 'vuex'
import CapsidEmail from '~/components/publications/CapsidEmail.vue'
export default {

  components: {
    CapsidEmail,
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
    }
  },

  computed: {
  },

  methods: {
  }

}
</script>

