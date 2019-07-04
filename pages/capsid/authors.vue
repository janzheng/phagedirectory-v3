<template>
  <div class="CapsidAuthors">

    <Template :template-classes="'_margin-center'">

      <template #sidebar>
        Sidebar
      </template>

      <template>
        Author Guide
      </template>

      
    </Template>

  </div>
</template>




<script>

import { mapState } from 'vuex'
// import NodeForm from '~/components/render/NodeForm.vue'
import Template from '~/templates/documentation.vue'

export default {

  components: {
    Template,
    // NodeForm,
  },

  layout: 'contentframe',
  middleware: 'pageload',
  meta: {
    tableQueries: ["_content"]
  },

  data () {
    return {
      content: this.$cytosis.findOne('tips-intro', this.$store.state['Content'] ).fields['Markdown'],
      form: this.$cytosis.findOne('form-tips', this.$store.state['Content'] )
    }
  },
  
  computed: {
    ...mapState([
      'Content',
      ]),
    events() {
      return this.Atoms.filter(t => t.fields['Atom:Type'] == 'Event')
    },

    featured() {
      // events in the past, w/ newest first
      return this.events.filter(item => {
        return item.fields['Data:Date']
      }).reverse()
    },
    past() {
      // events in the past, w/ newest first
      return this.events.filter(item => {
        const date = item.fields['Data:Date']
        return !this.$dayjs().isBefore(this.$dayjs(String(date)))
      }).reverse()
    },
    upcoming() {
      // events in the future
      return this.events.filter(item => {
        const date = item.fields['Data:Date']
        return this.$dayjs().isBefore(this.$dayjs(String(date)))
      })
    }
  },

  // runs on generation and page route (but not on first page load)
  async asyncData({env}) {

    return {
      postUrl: env.ext_handler,
    }
  },

  mounted () {
    // if(this.$router.currentRoute.hash) {
    if(this.$router.currentRoute.query && this.$router.currentRoute.query.tab) {
      // const tab = this.$router.currentRoute.hash.substring(1).replace(/[-]/g, ' ') // replace all '-' in the slugified hash with spaces
      // use query instead
      this.activeTab = this.$router.currentRoute.query.tab.replace(/[-]/g, ' ')
    }
  },

  methods: {
    tabClick(item, key) {
      this.activeTab = key
    },
  },


}
</script>

<style>
</style>

