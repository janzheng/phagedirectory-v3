<template>
  <div class="People">

    <Template grid-classes="Template--Main-Sidebar _grid-3-1-sm _grid-gap">

      <template #header-container>
        <h1 class="--title"><span class="_color-mono-60">Phage </span>People</h1>
        <h1 v-if="search.string" class="--title" ><span class="_color-mono-60">Search: </span>{{ search.string }}</h1>
      </template>

      <template #default>
        <!-- <div class="_section-article _margin-center"> -->
        <div>
          <!-- people list -->
          <!-- {{ people }} -->
          <div v-for="item of people" :key="item.id" class="People-list" >
            <Card :item="item" class="People-list-item" />
          </div>
        </div>

      </template>
      <template #context />

    </Template>

  </div>
</template>




<script>

import { mapState } from 'vuex'
import { loadQuery } from '~/other/loaders'
import Card from '~/components/dir/PeopleCard.vue'
// import Person from '~/components/dir/DirPeopleList.vue'

import Template from '~/templates/context.vue'
// import Template from '~/templates/article.vue'


export default {

  components: {
    Card,
    Template,
  },

  layout: 'contentframe',
  middleware: 'pageload',
  meta: {
    tableQueries: ["_content"],
    refreshOnLoad: true,
  },

  data () {
    return {
    }
  },
  
  computed: {
    ...mapState([
      'search',
      ]),
  },

  watch: {
    // $route () {
    //   this.search = this.$router.currentRoute.query.search
    // }
  },

  // runs on generation and page route (but not on first page load)
  async asyncData({env, store, route}) {
    const slug = route.params.slug
    const data = await loadQuery({_key: env.db_api, _base: env.db_base, store, routeName: '{people}', query: 'People-test'})
    // const search = store.state.search.string //route.query.search ? route.query.search : undefined
    // const search = store.state.search ? store.state.search.string : route.query.search
    // console.log('matched node: ', node, ' @ ', slug)

    return {
      slug,
      people: data.tables['People'],
      // search: search
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

