<!-- 

  (dynamic)
  Content Template (generate through Content/template group)

 -->
<template>
  <div class="Contemplate _section-page _margin-center _padding-left-2 _padding-right-2">

    <div class="_section-content">
      <div class="_section-article" v-html="$md.render(content || '')" />
      <div class="_section-article" >
        <div v-for="content of linkedContent" :key="content.id">
          <div v-if="content.fields['TemplateType'] == 'Form'">
            <FormTemplate :src="content" />
          </div>
          <div v-else-if="content.fields['RenderFields']" v-html="content.fields[content.fields['RenderFields']]" />
          <div v-else v-html="$md.render(content.fields['Markdown'] || '')" />
        </div>
      </div>
    </div>

  </div>
</template>




<script>

// import { mapState } from 'vuex'
import FormTemplate from '~/pages/templates/node-form.vue'

export default {

  components: {
    FormTemplate
  },

  layout: 'contentframe',
  middleware: 'pageload',
  meta: {
    // tableQuery: "_content",
    tableQueries: ["_content"],
  },

  // runs on generation and page route (but not on first page load)
  asyncData({route}) {
    const slug = unescape(route.params.slug)
    return {
      slug,
    }
  },

  data () {
  },
  
  computed: {
    content() {
      const content = this.$cytosis.findOne(this.slug, this.$store.state['Content'] )

      if (content.fields['isPublished'] && content.fields['Type'] == 'Content Page')
        return content.fields['Markdown']
      else
        this.$nuxt.error({ statusCode: 404, message: "Dynamic content couldn't be found" })
    },
    linkedContent() {
      const src = this.$store.state['Content']
      const linkedArray = this.$cytosis.findOne(this.slug, src).fields['LinkedContent']
      const linked = this.$cytosis.getLinkedRecords(linkedArray, src, true).reverse()
      // airtable returns the results in reverse

      // console.log('linked:', linkedArray, linked)
      return linked
    },
  },

  mounted () {
  },

  methods: {
  },


}
</script>

<style>
</style>

