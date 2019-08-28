<template>
  <div class="Join-Orgs">
    <Template>
      <template #container>

        <div class="_section-article" >

          <h1 class="_font-normal --title">Organizations</h1>

          <div class="_margin-bottom">
            <nuxt-link to="/join" class="_button CTA --join --short ">⬅︎ Go Back</nuxt-link>
          </div>
          <div class="" v-html="$md.render(content || '')" />
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
      content: this.$cytosis.findField('join-organization-content', this.$store.state['Content'], 'Markdown' ),
      form: this.$cytosis.findOne('form-join-organization', this.$store.state['Content'] ),
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

}
</script>

<style>
</style>

