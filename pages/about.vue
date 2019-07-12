<template>
  <div class="About">

    <Template 
      grid-classes="Template--Main-Sidebar _grid-2-1-sm _grid-gap"
      header-classes="Template--Header _section-page _margin-bottom _margin-center _margin-top-none-i _padding-none-i" 
    >

      <template #header>
        <div class="About-intro _section-article _margin-center" v-html="$md.render(intro || '') "/>
        <div class="About-features _divider-top _divider-bottom" v-html="$md.render(features || '') "/>
        <div class="_section-article _margin-center">
          <h2>Our Story</h2>

          <div class="About-story-container">

            <div class="About-story" v-html="$md.render(story || '') "/>

            <div v-if="!readMore" class="About-more" >
              <div class="About-story-lead" v-html="$md.render(storylead || '') "/>
              <button class="_button CTA --short _margin-top-2" @click="readMore = true">Read more</button>
            </div>

            <div v-if="readMore" class="About-story-more " v-html="$md.render(storymore || '') "/>
          </div>

          <!-- <div class="About-story-end" v-html="$md.render(storyend || '') "/> -->
          <Recently v-if="timeline" class="About-Timeline _margin-top-2" header="Timeline" :items="timeline" />

          <div class="About-people _divider-top">
            <h3>Who we are</h3>
            <div v-for="item of people" :key="item.id" class="" >
              <Card :person="item" class="About-person" />
            </div>
          </div>

          <div class="About-opensource _divider-top _divider-bottom" v-html="$md.render(opensource || '') "/>
        </div>

      </template>

      <template #default>

        <!-- <Recently v-if="behind" class="About-Behind _margin-top-2" header="Behind the scenes" :items="behind" /> -->

      </template>

    </Template>

    <script async src="https://platform.twitter.com/widgets.js" charset="utf-8" />

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

    // this.$twitter() // load twitter async for the embedded twitter in our story

    return {
      readMore: false,
      intro: this.$cytosis.findOne('about-intro', this.$store.state['Content'] ).fields['Markdown'],
      features: this.$cytosis.findOne('about-features', this.$store.state['Content'] ).fields['Markdown'],
      introend: this.$cytosis.findOne('about-intro-end', this.$store.state['Content'] ).fields['Markdown'],
      story: this.$cytosis.findOne('about-story', this.$store.state['Content'] ).fields['Markdown'],
      storylead: this.$cytosis.findOne('about-story-lead', this.$store.state['Content'] ).fields['Markdown'],
      storymore: this.$cytosis.findOne('about-story-more', this.$store.state['Content'] ).fields['Markdown'],
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

