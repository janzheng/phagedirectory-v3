<template>
  <div class="Media">

    <Template 
      grid-classes="Template--Main-Sidebar _grid-2-1-sm _grid-gap"
      header-classes="Template--Header _section-page _margin-bottom _margin-center _margin-top-none-i _padding-none-i" 
    >
      <template #header>
        <div class="_section-article _margin-center">
          <h1>Media &amp; Publications</h1>
          <Recently v-if="publications" class="Media-publicaations _margin-top-2" header="Phage Directory publications" :items="publications" />
          <Recently v-if="media" class="Media-publicaations _margin-top-2" header="Phage Directory in the media" :items="media" />
        </div>
      </template>
    </Template>

  </div>
</template>




<script>

import { mapState } from 'vuex'
// import { loadQuery } from '~/other/loaders'
import Recently from '~/components/Recently.vue'

import Template from '~/templates/context.vue'
// import Template from '~/templates/article.vue'


export default {

  components: {
    Template,
    Recently,
  },

  layout: 'contentframe',
  middleware: 'pageload',
  meta: {
    tableQueries: ["_content","_media"],
    refreshOnLoad: true,
  },

  data () {
    // this.$twitter() // load twitter async for the embedded twitter in our story

    return {
    }
  },
  
  computed: {
    ...mapState([
      'Internal',
      ]),
    media() {
      return this.Internal.filter((item) => item.fields['Type'] == 'Media')
    },
    publications() {
      return this.Internal.filter((item) => item.fields['Type'] == 'Publication')
    },
  },

  watch: {
    $route () {
    }
  },

  mounted () {
    if(this.$segmentize) {
      this.$segmentize({
        segment: this.$segment,
        type: 'page',
        event: 'Media',
        data: {
          path: this.$route.path,
        }
      })
    }
  },

  methods: {
  }

}
</script>

<style>
</style>

