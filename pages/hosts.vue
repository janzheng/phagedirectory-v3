<template>
  <div class="Hosts Dir-category">
    <Template sidebar-classes="--sticky --top-1">

      <template #header-container>
        <h1 class="--title"><span class="_color-mono-60">Phage </span>Hosts</h1>
        <h1 v-if="search.string" class="--title" ><span class="_color-mono-60">Search: </span>{{ search.string }}</h1>
        <div class="">
          <h5 class="_padding-right"><span class="_font-normal">Number of genera: </span>{{ genusList.length }}</h5>
          <h5 class="_padding-right --title"><span class="_font-normal">Number of phage hosts: </span>{{ hosts.length }}</h5>
        </div>
      </template>

      <template #default>

        <div class="_section-article _margin-center">

          <!-- people list -->
          <!-- {{ people }} -->
          <div v-for="item of genusList" :key="item.id" class="Hosts-list" >
            <Card :genus="item" :hosts="getGenusHosts(item)" :phage-collections="phageCollections" class="Hosts-list-item" />
          </div>
        </div>

      </template>
      <template #context>
        <div>
          are you working on a phage that targets hosts that we're missing? Please join Phage Directory so we can gain a complete picture
          [ back to top]
          [ search ]
        </div>
      </template>

    </Template>

  </div>
</template>




<script>

import { mapState } from 'vuex'
import { loadQuery } from '~/other/loaders'
import Card from '~/components/dir/HostCard.vue'
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

    genusList() {
      let genuses = []
      this.hosts.map((host) => {
        const genus = host.fields['Genus']
        if(genuses.findIndex(_genus => _genus == genus ) < 0) {
          genuses.push(genus)
        }
      })
      return genuses
    }
  },

  watch: {
    $route () {
      // console.log('route changed', this.$route)
    }
  },

  // runs on generation and page route (but not on first page load)
  async asyncData({env, store, route}) {
    const slug = route.params.slug
    const data = await loadQuery({_key: env.db_api, _base: env.db_base, store, routeName: '{hosts}', query: 'Hosts-index'})

    return {
      slug,
      hosts: data.tables['Hosts'],
      phageCollections: data.tables['PhageCollections'],
    }
  },

  mounted () {
  },
  
  methods: {
    getGenusHosts(genus) {
      return this.hosts.filter((host) => host.fields['Genus'] == genus)
    }
  },

}
</script>

<style>
</style>

