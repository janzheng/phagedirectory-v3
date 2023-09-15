<template>
  <div class="Contact">

    <Context>
      <template>

        <div class="_padding-bottom-2 _margin-bottom-2" v-html="$md.render(betatext || '') "/>

        <iframe id="betasignup" class="airtable-embed" src="https://airtable.com/embed/shr0Zo4PlvLYkEtTM?backgroundColor=blue" frameborder="0" onmousewheel="" width="100%" height="2220" style="background: transparent; border: 1px solid #ccc;" />

        <!-- <NodeForm v-if="form" :src="form"/> -->
      </template>
    </Context>

  </div>
</template>




<script>

import Context from '~/templates/article.vue'
// import NodeForm from '~/components/render/NodeForm.vue'

export default {

  components: {
    // NodeForm,
    Context,
  },

  layout: 'contentframe',
  middleware: 'pageload',
  meta: {
    tableQuery: "_content-forms"
  },

  head () {

    this.$head.setTitle("Phage Atlas: Collect, Share, Discover a world of phages")
    this.$head.setImage('https://phage.directory//atlas_share_img.jpg')

    return this.$head.get()
  },

  data () {

    return {
      // form: this.$cytosis.findOne('form-pfeu', this.$store.state['Content'] ),
      betatext: this.$cytosis.findOne('phagedex-beta', this.$store.state['Content'] ).fields.Markdown,


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

@media (min-width: 65ch) {
  ._section-article {
    min-width: 65ch;
  }
}

@media (max-width: 500px) {
	#betasignup {
		height: 2900px;
	}
}

</style>

