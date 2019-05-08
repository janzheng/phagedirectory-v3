<template>
  <div class="Jobs">
    <Template>

      <template #header>
        <div class="" v-html="$md.render(intro || '')" />
      </template>

      <template #context>
        <div class="_margin-bottom" v-html="$md.render(content || '')" />
      </template>

      <Job v-for="item of jobs" :key="item.id" :atom="item" />

    </Template>

  </div>
</template>




<script>

import { mapState } from 'vuex'
import Job from '~/components/Job.vue'
import Template from '~/templates/context.vue'

export default {

  components: {
    Job,
    Template,
  },

  layout: 'contentframe',
  middleware: 'pageload',
  meta: {
    tableQueries: ["_content", "atoms-jobs"],
    refreshOnLoad: true,
  },

  data () {
    return {
      intro: this.$cytosis.find('Content.jobs-intro', {'Content': this.$store.state['Content']} )[0]['fields']['Markdown'],
      content: this.$cytosis.find('Content.jobs-content', {'Content': this.$store.state['Content']} )[0]['fields']['Markdown'],
    }
  },
  
  computed: {
    ...mapState([
      'Atoms',
      ]),
    jobs() {
      return this.Atoms.filter(t => t.fields['Atom:Type'] == 'Job')
    }
  },

  // runs on generation and page route (but not on first page load)
  async asyncData({env}) {

    return {
      postUrl: env.ext_handler,
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

