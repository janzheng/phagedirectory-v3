<template>
  <div class="FooterSignups _margin">

    <!-- <div class="_section-page _padding-left _padding-right _padding-top _padding-bottom-2 _margin-center"> -->
    <div>
      <div class=" _grid-2 _grid-gap-none ">
        <div class="FooterSignups-capsid _grid">
          <div class=" _padding-2 _section-footer _justify-end _align-bottom">
            <div class="" v-html="$md.render(capsid || '')" />
          </div>
        </div>
        <div class="FooterSignups-alerts _grid">
          <div class="_padding-2 _section-footer _align-bottom">
            <div class="" v-html="$md.render(alerts || '')" />
          </div>
        </div>
      </div>
    </div>

  </div>
</template>


<script>


export default {

  components: {
  },

  data () {
    return {
      capsid: this.$cytosis.findOne('footer-capsid', this.$store.state['Content'] ).fields['Markdown'],
      alerts: this.$cytosis.findOne('footer-alerts', this.$store.state['Content'] ).fields['Markdown'],
    }
  },

  computed: {
    thisYear() {
      let date = new Date
      return date.getFullYear()
    }
  },


}
</script>

<style lang="scss" scoped>
</style>
