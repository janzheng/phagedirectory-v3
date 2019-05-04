<template>
  <div class="Community Template-1-2 _section-page">

    <div class="_section-content _margin-center" v-html="$md.render(intro || '')" />
    <div class="_section-content _margin-center _grid-1-2 _grid-gap-large">
      <div class="Template-sidebar">
        <div class="_margin-bottom" v-html="$md.render(content || '')" />
        <!-- <div class="Alerts-form FormCard --simple" v-html="$md.render(form || '')" /> -->
        <Form :src="form"/>
      </div>
      <div class="Template-main">
        <CommunityPost v-for="item of community" :key="item.id" :atom="item" />
      </div>

    </div>

  </div>
</template>




<script>

import { mapState } from 'vuex'
// import FormContact from '~/forms/FormContact.vue'
import Form from '~/templates/node-form.vue'
import CommunityPost from '~/components/CommunityPost.vue'

export default {

  components: {
    Form,
    CommunityPost,
  },

  layout: 'contentframe',
  middleware: 'pageload',
  meta: {
    tableQueries: ["_content", "atoms-community"],
    refreshOnLoad: true,
  },

  // runs on generation and page route (but not on first page load)
  async asyncData({env}) {

    return {
      postUrl: env.ext_handler,
    }
  },

  data () {
    return {
      intro: this.$cytosis.find('Content.community-intro', {'Content': this.$store.state['Content']} )[0]['fields']['Markdown'],
      content: this.$cytosis.find('Content.community-content', {'Content': this.$store.state['Content']} )[0]['fields']['Markdown'],
      form: this.$cytosis.find('Content.form-community', {'Content': this.$store.state['Content']} )[0],
    }
  },
  
  computed: {
    ...mapState([
      'Atoms',
      ]),
    community() {
      return this.Atoms.filter(t => t.fields['Atom:Type'] == 'Community')
    }
  },

  mounted () {
  },

  methods: {
  },


}
</script>

<style>
</style>

