<template>
  <div class="Labs Dir-category">


    <Template grid-classes="Template--Main-Sidebar _grid-3-1-sm _grid-gap">
      <template #header-container>
        <h1 class="--title"><span class="_color-mono-60">Phage </span>Labs</h1>
        <h1 v-if="search.string" class="--title" ><span class="_color-mono-60">Search: </span>{{ search.string }}</h1>
        <div class="">
          <h5 class="_padding-right"><span class="_font-normal">Number of labs: </span>{{ labs.length }}</h5>
        </div>
      </template>

      <template #default>
        <!-- <div class="_section-article _margin-center"> -->
        <div>
          <!-- people list -->
          <!-- {{ people }} -->

          <div v-for="item of labs" :key="item.id" class="Labs-list" >
            <Card :lab="item" :phage-collections="phageCollections" class="Labs-list-item" />
          </div>
        </div>

      </template>
      <template #context >
        [join button]
        [ back to top]
        [ search ]
      </template>
    </Template>

  </div>
</template>




<script>

import { mapState } from 'vuex'
import { loadQuery } from '~/other/loaders'
import Card from '~/components/dir/LabCard.vue'
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
  },

  // runs on generation and page route (but not on first page load)
  async asyncData({env, store, route}) {
    const slug = route.params.slug
    const data = await loadQuery({_key: env.db_api, _base: env.db_base, store, routeName: '{labs}', query: 'Labs-index'})

    return {
      slug,
      labs: data.tables['Organizations'],
      phageCollections: data.tables['PhageCollections'],
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

