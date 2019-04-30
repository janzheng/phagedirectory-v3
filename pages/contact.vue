<template>
  <div class="Contact _section-page _section-page--min _margin-center _margin-bottom-2 _margin-top-2">

    <div class=" _margin-center">
      <div class=" _section-article" v-html="$md.render(intro || '')" />
      <div class="_grid-2-1 _grid-gap-large">
        <div class=" _section-article" v-html="$md.render(content || '')" />
        <div class="_section-article">
          <Form :src="form"/>
        </div>
      </div>
    </div>

  </div>
</template>




<script>

// import FormContact from '~/forms/FormContact.vue'
import Form from '~/pages/templates/node-form.vue'

export default {

  components: {
    Form,
  },

  layout: 'contentframe',
  middleware: 'pageload',
  meta: {
    tableQuery: "_content"
  },

  // runs on generation and page route (but not on first page load)
  async asyncData({env}) {

    return {
      postUrl: env.ext_handler,
    }
  },

  data () {
    return {
      intro: this.$cytosis.findOne('contact-intro', this.$store.state['Content'] ).fields['Markdown'],
      content: this.$cytosis.findOne('contact-content', this.$store.state['Content'] ).fields['Markdown'],
      form: this.$cytosis.findOne('form-contact', this.$store.state['Content'] ),

      // content: this.$cytosis.find('Content.contact-page', {'Content': this.$store.state['Content']} )[0]['fields']['Markdown'],
      // form: this.$cytosis.find('Content.form-contact', {'Content': this.$store.state['Content']} )[0],
      // images: this.$cytosis.find('Content.contact-page', {'Content': this.$store.state['Content']} )[0]['fields']['Attachments'],
    }
  },
  
  computed: {

  },

  mounted () {
  },

  methods: {
  },


}
</script>

<style>
</style>

