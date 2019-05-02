<template>
  <div class="Home">

    <div class="Home-hero">
      
      <div class="_section-page _padding-top-2 _padding-bottom">
        <div class=" _padding-bottom">
          <!-- <img width="40" class="logo _v-middle" src="~/static/icon.png" > -->
          <h6 class="title _inline _v-middle">
            Phage Directory
          </h6>
        </div>
        <div class="Home-hero-text _font-larger _layout-header-narrow _font-normal">
          Phage Directory is a resource of phage experts and phage banks to support the safe and effective use of phages in medicine and industry around the world.
        </div>
      </div>
     
      <div class="_section _grid-3-2 _grid-gap-large">

        <!-- <div class="">
          <div class="_padding-bottom-2" v-html="$md.render( content || '')" />

          <h6>Workout Series</h6>
          <nuxt-link to="/intro-workout" class="Home-button-tall _button --widest">
            <div class="_font-bold">Introductory Workout</div>
            Classic introductory workout series
          </nuxt-link>
          <nuxt-link to="/style" class="Home-button-tall _button --widest">
            <div class="_font-bold">Style System</div>
            Style guide, design tokens, and screen components 
          </nuxt-link>
          
          <div class="_padding-top-2 _padding-bottom-2">
            <h6>Generators</h6>
            <nuxt-link to="#" class="Home-button _button --disabled --outline --widest _margin-bottom-none-xs">General Workout Generator [work in progress]</nuxt-link>
            <nuxt-link to="/resources" class="Home-button _button --outline --widest _margin-bottom-none-xs">Design Resources</nuxt-link>
          </div>
        </div> -->

        <!-- <div class="Feed">
          <div v-for="item of Recently" :key="item.id" class="Feed-item _padding-bottom">
            <h6> {{ item.fields['Date'] }}</h6>
            <h5> {{ item.fields['Name'] }}</h5>
            <p> {{ item.fields['Message'] }}</p>
          </div>
        </div> -->

      </div>
    </div>

  </div>
</template>




<script>


import { mapState } from 'vuex'

export default {

  components: {
  },

  layout: 'contentframe',
  middleware: 'pageload',
  meta: {
    // tableQuery: "_content"
    tableQueries: ['_content', '_recently', ]
  },

  data () {
    return {
      content: this.$cytosis.findOne('home-intro', this.$store.state['Content'] ).fields['Markdown'],
    }
  },
  
  computed: {
    ...mapState([
      'Content',
      'Recently',
      ]),

  },

  async asyncData({env}) {

    return {
      postUrl: env.ext_handler,
    }
  },

  methods: {
  },


}
</script>

<style>
</style>

