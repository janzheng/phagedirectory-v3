<template>
  <div class="FooterSupport _padding">

    <div class="_width-content-max _margin-center _padding-none-xs">
      <!-- <div> -->

      <div class="FooterSupport-content" v-html="$md.render( support || '')" />
      
    </div>

  </div>
</template>


<script>

export default {

  components: {
  },

  data () {
    return {
      support: this.$cytosis.findField('footer-support', this.$store.state['Content'], 'Markdown' ),
    }
  },

  computed: {
  },


}
</script>

<style lang="scss" scoped>
</style>
