
<!-- error page / 404 etc. — keep this separate from any CMS. As basic as you can -->

<template>

  <!-- <ContentFrame class="About"> -->
  <div class="Error _section-page _margin-center">
    <div class="_section-content _margin-center">
      <h6>{{ error.statusCode }} Error</h6>
      <h1 class="Error-title title">
        We apologize... we couldn’t find what you were looking for, or something went wrong.
      </h1>
      <h3>
        If you keep getting to this page but suspect you shouldn't be, please reach out to us by emailing <a href="mailto:support@phage.directory">support@phage.directory</a> or tweeting us <a href="https://twitter.com/phagedirectory">@phagedirectory</a>. 
        <br><br>
        We really appreciate your help!
      </h3>

      <div v-if="error.message" class="_card _padding">
        <h6>Error message</h6>
        <p>{{ error.message }}</p>
      </div>

    </div>
  </div>
</template>

<script>

export default {

  props: {
    'error': Object
  },
  
  created() {
    // if(this.$segment) {
    //   this.$segment.track('Error Hit', { error: this.error.statusCode, message: this.error.message })
    //   console.log('Error logged...')
    //   // this.$segment.page('Error Page')
    // }
  },

  // contentframe can NOT rely on Cytosis, or at least have fallbacks
  layout: 'contentframe',

}
</script>

<style lang="scss" scoped>

</style>

