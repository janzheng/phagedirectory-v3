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
    
    if (this.$cytosis.check([
      this.$store.state['Content']
    ])) return {}

    return {
      support: this.$cytosis.findOne('footer-support', this.$store.state['Content'] ).fields['Markdown'],
    }
  },

  computed: {
  },


}
</script>

<style lang="scss" scoped>
</style>
