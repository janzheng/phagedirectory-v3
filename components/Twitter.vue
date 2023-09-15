

<template>

  <no-ssr>
    <div class="Twitter" >
      <!-- twitter-test? forced max seems to break mobile -->
      <!-- <a class="twitter-timeline" data-width="100%" data-height="100%" href="https://twitter.com/phagedirectory?ref_src=twsrc%5Etfw">Tweets by phagedirectory</a>  -->
      <a class="twitter-timeline" data-width="339px" data-height="1700px" href="https://twitter.com/phagedirectory?ref_src=twsrc%5Etfw">Tweets by phagedirectory</a> 
      <!-- <script async defer src="https://platform.twitter.com/widgets.js" charset="utf-8" /> -->
    </div>
  </no-ssr>

</template>

<script>

// import { cytosis } from '~/assets/helpers.js'

export default {

  components: {
  },

  data: function () {
    
    // if(twttr)
      // twttr.widgets.load()
    return {
    }
  },

  created() {
    let tag = document.createElement('script'); tag.setAttribute('src', "//platform.twitter.com/widgets.js")
    document.head.appendChild(tag)
  },

  computed: {
  },

  mounted: async function () {
    let twitterScript = document.createElement('script')
    twitterScript.setAttribute('src', 'https://platform.twitter.com/widgets.js')
    document.head.appendChild(twitterScript)
  },

  methods: {
  }
}
</script>

