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
import { loadQuery } from '~/other/loaders'
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

  // runs on generation and page route (but not on first page load)
  async asyncData({env, store, route}) {
    const slug = route.params.slug
    const data = await loadQuery({_key: env.db_api, _base: env.db_base, store, routeName: '{about}', query: 'People-PD'})
    // const search = store.state.search.string //route.query.search ? route.query.search : undefined
    // const search = store.state.search ? store.state.search.string : route.query.search

    return {
      slug,
      people: data.tables['People'],
      // search: search
    }
  },

  mounted () {
  },

  methods: {
  }

}
</script>

<style>
</style>

