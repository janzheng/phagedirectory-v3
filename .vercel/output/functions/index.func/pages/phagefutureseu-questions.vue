<template>
  <div class="Contact">

    <Context>
      <template>
        <NodeForm v-if="form" :src="form"/>
      </template>
    </Context>

  </div>
</template>




<script>

import Context from '~/templates/article.vue'
import NodeForm from '~/components/render/NodeForm.vue'

export default {

  components: {
    NodeForm,
    Context,
  },

  layout: 'contentframe',
  middleware: 'pageload',
  meta: {
    tableQuery: "_content-forms"
  },

  data () {
    return {
      form: this.$cytosis.findOne('form-pfeu', this.$store.state['Content'] ),

      // content: this.$cytosis.find('Content.contact-page', {'Content': this.$store.state['Content']} )[0]['fields']['Markdown'],
      // form: this.$cytosis.find('Content.form-contact', {'Content': this.$store.state['Content']} )[0],
      // images: this.$cytosis.find('Content.contact-page', {'Content': this.$store.state['Content']} )[0]['fields']['Attachments'],
    }
  },

  mounted () {

    if(this.$segmentize) {
      this.$segmentize({
        segment: this.$segment,
        type: 'page',
        event: 'PFEU Questionnaire',
        data: {
          path: this.$route.path,
        }
      })
    }

  },
  
}
</script>

<style>
</style>

