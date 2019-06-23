<template>
  <div class="About">

    <Template grid-classes="Template--Main-Sidebar _grid-2-1-sm _grid-gap">

      <template #header>
        <div class="About-intro _section-article _margin-center" v-html="$md.render(intro || '') "/>
      </template>

      <template #default>
        <div class="About-content" v-html="$md.render(content || '') "/>

        <div class="About-people">
          <div v-for="item of people" :key="item.id" class="" >
            <Card :person="item" class="About-person" />
          </div>
        </div>

        <div class="About-opensource" v-html="$md.render(opensource || '') "/>

      </template>

      <template #context>
        <div class="About-sidebar">
          <Recently class="About-Timeline _margin-top-2" header="Timeline" :items="timeline" />
          <Recently class="About-Behin _margin-top-2" header="Behind the scenes" :items="behind" />
        </div>
      </template>

    </Template>

  </div>
</template>




<script>

import { mapState } from 'vuex'
import { loadQuery } from '~/other/loaders'
import Recently from '~/components/Recently.vue'
import Card from '~/components/dir/PeopleCard.vue'

import Template from '~/templates/context.vue'
// import Template from '~/templates/article.vue'


export default {

  components: {
    Template,
    Recently,
    Card,
  },

  layout: 'contentframe',
  middleware: 'pageload',
  meta: {
    tableQueries: ["_content","_recently"],
    refreshOnLoad: true,
  },

  data () {
    return {
      intro: this.$cytosis.findOne('about-intro', this.$store.state['Content'] ).fields['Markdown'],
      content: this.$cytosis.findOne('about-content', this.$store.state['Content'] ).fields['Markdown'],
      opensource: this.$cytosis.findOne('about-opensource', this.$store.state['Content'] ).fields['Markdown'],
    }
  },
  
  computed: {
    ...mapState([
      'Recently',
      ]),
    behind() {
      return this.Recently.filter((item) => item.fields['Type'] == 'Behind')
    },
    timeline() {
      return this.Recently.filter((item) => item.fields['Type'] == 'Timeline')
    },
  },

  watch: {
    $route () {
      // console.log('route changed', this.$route)
    }
  },

  // runs on generation and page route (but not on first page load)
  async asyncData({env, store, route}) {
    const slug = route.params.slug
    const data = await loadQuery({_key: env.db_api, _base: env.db_base, store, routeName: '{about}', query: 'People-PD'})
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
  }

}
</script>

<style>
</style>

