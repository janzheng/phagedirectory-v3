<template>
  <div class="Orgs Dir-category">
    <Template>

      <template #header-container>
        <h1 class="--title"><span class="_color-mono-60">Phage </span>Organizations</h1>
        <h1 v-if="search.string" class="--title" ><span class="_color-mono-60">Search: </span>{{ search.string }}</h1>
        <div class="">
          <h5 class="_padding-right"><span class="_font-normal">Number of organizations: </span>{{ orgs.length }}</h5>
        </div>
      </template>

      <template #default>

        <div class="_section-article _margin-center">
          
          <!-- people list -->
          <!-- {{ people }} -->
          <div v-for="item of orgs" :key="item.id" class="Orgs-list" >
            <Card :org="item" :phage-collections="phageCollections" class="Hosts-list-item" />
          </div>
        </div>

      </template>
      <template #context>
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
import Card from '~/components/dir/OrgCard.vue'
// import Person from '~/components/dir/DirPeopleList.vue'

import Template from '~/templates/context.vue'
// import Template from '~/templates/article.vue'


export default {

  components: {
    Template,
    Card,
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
    $route () {
      // console.log('route changed', this.$route)
    }
  },

  // runs on generation and page route (but not on first page load)
  async asyncData({env, store, route}) {
    const slug = route.params.slug
    const data = await loadQuery({_key: env.db_api, _base: env.db_base, store, routeName: '{orgs}', query: 'Orgs-index'})
    // console.log('matched node: ', node, ' @ ', slug)

    return {
      slug,
      orgs: data.tables['Organizations'],
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

