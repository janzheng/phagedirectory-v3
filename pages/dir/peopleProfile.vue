<template>
  <div class="Profile">
    <!-- <Template gridClasses="_grid-1-2-sm _grid-gap" > -->
    <Template grid-classes="Template--Sidebar-Main _grid-1-2-sm _grid-gap" >

      <template #context>
        <h1>{{ person.fields['Name'] }}</h1>
      </template>


      <template #header-container>
        <!-- <div class="_section-article _margin-center"> -->
        <h1>Profile</h1>
        slug: {{ slug }}
        <!-- </div> -->

      </template>

      <template #default>

        <div class="_section-article _margin-center">
          Profile information

          {{ person }}
        </div>

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
    tableQueries: ["_content", "atoms-community"],
    refreshOnLoad: true,
  },

  data () {
    return {
      activeTab: 'Active Posts',
      intro: this.$cytosis.find('Content.community-intro', {'Content': this.$store.state['Content']} )[0]['fields']['Markdown'],
      content: this.$cytosis.find('Content.community-content', {'Content': this.$store.state['Content']} )[0]['fields']['Markdown'],
      form: this.$cytosis.find('Content.form-community', {'Content': this.$store.state['Content']} )[0],
    }
  },
  
  computed: {
    ...mapState([
      'Atoms',
      ]),
    community() {
      return this.Atoms.filter(t => t.fields['Atom:Type'] == 'Community')
    },
    expired() {
      // jobs in the past, w/ newest first
      return this.community.filter(t => {return t.fields['Data:Status'] == 'Expired'})
    },
    current() {
      // jobs in the future
      return this.community.filter(t => {return t.fields['Data:Status'] !== 'Expired'})
    },
  },

  watch: {
    $route ({}) {
      // app.$sys.log('route changed', this.$route)
    }
  },

  // runs on server+generation and page route (but not on first page load)
  async asyncData({app, env, store, route}) {
    const slug = route.params.slug
    const data = await loadQuery({
      useDataCache: true,
      _key: env.db_api, 
      _base: env.db_base, store, 
      routeName: '{people profile}', 
      query: 'People-profile',
      keyword: slug,
    })

    // fetches the relevant atoms into the store
    // const data = await loadQuery({env, store, routeName:'{capsid router}', query:'capsid-atoms', keyword: manuscript.tables.Manuscripts[0].fields['Name']})

    app.$sys.log('data: ', data)


    return {
      slug,
      person: data.tables['People'][0],
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

  methods: {
    tabClick(item, key) {
      // console.log('default tabclick', item, key)
      this.activeTab = key
    },
  },

}
</script>

<style>
</style>

