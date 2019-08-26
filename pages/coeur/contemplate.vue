<!-- 

  (dynamic)
  Content Template (generate through Content/template group)

 -->
<template>
  <no-ssr>
    <div class="Contemplate _section-page _margin-center _padding-left-2 _padding-right-2">

      <div class="_section-content">
        <div class="_section-article" v-html="$md.render(content || '')" />
        <div class="_section-article" >
          <div v-for="item of linkedContent" :key="item.id">
            <div v-if="item.fields['TemplateType'] == 'Form'">
              <NodeForm :src="content" />
            </div>
            <div v-else-if="item.fields['RenderFields']" v-html="item.fields[item.fields['RenderFields']]" />
            <div v-else v-html="$md.render(item.fields['Markdown'] || '')" />
          </div>
        </div>
      </div>

    </div>
  </no-ssr>
</template>




<script>

// import { mapState } from 'vuex'
import NodeForm from '~/components/render/NodeForm.vue'

export default {

  components: {
    NodeForm
  },

  layout: 'contentframe',
  middleware: 'pageload',
  meta: {
    // tableQuery: "_content",
    tableQueries: ["_content"],
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
      return undefined
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

  // runs on server+generation and page route (but not on first page load)
  asyncData({route}) {
    const slug = unescape(route.params.slug)
    return {
      slug,
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

