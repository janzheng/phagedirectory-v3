<template>
  <div class="Join-Medical">
    <Template>
      <template #container>

        <div class="_section-article" >
          <div class="_margin-bottom">
            <nuxt-link to="/join" class="_button CTA --join --short ">⬅︎ Go Back</nuxt-link>
          </div>

          <h1 class="_font-normal">Medical Professionals</h1>
          <div class="_margin-top-2" v-html="$md.render(content || '')" />
        </div>

        <NodeForm :src="form"/>

      </template>
    </Template>

  </div>
</template>




<script>

import { mapState } from 'vuex'
import Template from '~/templates/article.vue'
import NodeForm from '~/components/render/NodeForm.vue'

export default {

  components: {
    Template,
    NodeForm,
  },

  layout: 'contentframe',
  middleware: 'pageload',
  meta: {
    tableQueries: ["_content", "atoms-alerts"],
    refreshOnLoad: true,
  },

  data () {
    return {
      activeTab: 'Active',
      content: this.$cytosis.findField('join-medical-content', this.$store.state['Content'], 'Markdown' ),
      form: this.$cytosis.findOne('form-join-medical', this.$store.state['Content'] ),
    }
  },
  
  computed: {
    ...mapState([
      'Atoms',
      ]),
    alerts() {
      return this.Atoms.filter(t => t.fields['Atom:Type'] == 'Alert')
    },
    active() {
      return this.alerts.filter(t => {return t.fields['Data:Status'] !== 'Resolved'})
    },
    resolved() {
      return this.alerts.filter(t => t.fields['Data:Status'] === 'Resolved')
    }
  },

  // runs on server+generation and page route (but not on first page load)
  async asyncData({env}) {

    return {
      postUrl: env.ext_handler,
    }
  },

  mounted () {
  },

}
</script>

<style>
</style>

