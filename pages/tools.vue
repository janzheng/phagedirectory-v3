<template>
  <div class="Tools">

    <Template >

      <template #container>

        <div class="_section-article _margin-center">
          <div class="_padding-bottom-2" v-html="$md.render(intro || '')" />
          <NodeForm :src="form"/>

          <!-- 

            Tools:
            New:
              - islander p204 evergreen abstract
              - comparator p204 evergreen abstract

          -->

          <div class="Tools-list">
            <div v-for="item of tools" :key="item.id" class="Tools-item _card _padding">
              <h5 class="Tools-name">{{ item.fields['Name'] }}</h5>
              <div v-if="item.fields['Data:Subtitle']" class="Tools-subtitle">{{ item.fields['Data:Subtitle'] }}</div>
              <div class="_margin-top">
                <div v-if="item.fields['URL']" class="Tools-url">URL: <a :href="item.fields['URL']" target="_blank">{{ item.fields['URL'] }}</a></div>
                <div v-if="item.fields['Data:Content']" class="Tools-creator">Organization: {{ item.fields['Data:Content'] }}</div>
                <div v-if="item.fields['Markdown']" class="Tools-creator _margin-top" >
                  <div>Description:</div>
                  <div v-html="$md.render( item.fields['Markdown'] ||'')" />
                </div>
                <div class="Tools-tags _margin-bottom-half">
                  <span v-for="tag of item.fields['Data:Tags']" :key="tag" class="_tag">{{ tag }}</span>
                </div> 
              </div>
            </div>
          </div>

        </div>

      </template>
      
    </Template>

  </div>
</template>




<script>

import { mapState } from 'vuex'
// import Event from '~/components/Event.vue'
// import Tabbed from '~/components/layout/Tabbed.vue'
import NodeForm from '~/components/render/NodeForm.vue'
import Template from '~/templates/article.vue'

export default {

  components: {
    // Event,
    Template,
    // Tabbed,
    NodeForm,
  },

  layout: 'contentframe',
  middleware: 'pageload',
  meta: {
    tableQueries: ["_content", "atoms-tools"],
    refreshOnLoad: true,
  },

  data () {
    return {
      intro: this.$cytosis.find('Content.tools-intro', {'Content': this.$store.state['Content']} )[0]['fields']['Markdown'],
      form: this.$cytosis.find('Content.form-tools', {'Content': this.$store.state['Content']} )[0],
    }
  },
  
  computed: {
    ...mapState([
      'Atoms',
      ]),
    tools() {
      return this.Atoms.filter(t => t.fields['Atom:Type'] == 'Tool')
    },

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

