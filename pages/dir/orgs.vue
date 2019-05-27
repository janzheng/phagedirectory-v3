<template>
  <div class="Orgs">
    <Template>

      <template #header-container>
        <h1 class="--title"><span class="_color-mono-60">Phage </span>Organizations</h1>
        <h1 v-if="search.string" class="--title" ><span class="_color-mono-60">Search: </span>{{ search.string }}</h1>
      </template>

      <template #default>

        <div class="_section-article _margin-center">
          
          <!-- people list -->
          <!-- {{ people }} -->
          <div v-for="item of orgs" :key="item.id" class="Orgs-list" >
            {{ item.fields['Name'] }}
          </div>
        </div>

      </template>
      <template #context>
        Context here
      </template>

    </Template>

  </div>
</template>




<script>

import { mapState } from 'vuex'
import { loadQuery } from '~/other/loaders'
// import PeopleCard from '~/components/dir/PeopleCard.vue'
// import Person from '~/components/dir/DirPeopleList.vue'

import Template from '~/templates/context.vue'
// import Template from '~/templates/article.vue'


export default {

  components: {
    // PeopleCard,
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

