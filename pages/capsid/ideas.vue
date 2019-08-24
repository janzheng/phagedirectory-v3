<template>
  <div class="Events">

    <Template :template-classes="'_margin-center'">

      <template #container>

        <div class="Capsid">
          <div class="Capsid-masthead _section-article _margin-center _padding-bottom-3">
            <nuxt-link to="/capsid" class="_grid-auto-1-xs _align-vertically --underline-none">
              <img class="cnt _block _margin-center" src="/cnt.png" width="120px" alt="Capsid and Tail">
              <div class="Capsid-masthead-title _left _font-serif">
                A weekly phage periodical
              </div>
            </nuxt-link>
          </div>
        </div>

        <div class="_section-article _margin-center">
          <div class="_padding-bottom-2" v-html="$md.render(intro || '')" />
          <NodeForm :src="form"/>
        </div>

      </template>
      
    </Template>

  </div>
</template>




<script>

import { mapState } from 'vuex'
import NodeForm from '~/components/render/NodeForm.vue'
import Template from '~/templates/article.vue'

export default {

  components: {
    Template,
    NodeForm,
  },

  layout: 'contentframe',
  middleware: 'pageload',
  meta: {
    tableQueries: ["_content"]
  },

  data () {
    return {
      intro: this.$cytosis.findOne('tips-intro', this.$store.state['Content'] ).fields['Markdown'],
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

  mounted () {
    // if(this.$router.currentRoute.hash) {
    if(this.$router.currentRoute.query && this.$router.currentRoute.query.tab) {
      // const tab = this.$router.currentRoute.hash.substring(1).replace(/[-]/g, ' ') // replace all '-' in the slugified hash with spaces
      // use query instead
      this.activeTab = this.$router.currentRoute.query.tab.replace(/[-]/g, ' ')
    }
  },

}
</script>

<style>
</style>

