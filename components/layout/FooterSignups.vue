<template>
  <div class="FooterSignups _padding-top _padding-bottom _margin-left-xs _margin-right-xs ">

    <div class="_width-content-max _margin-center _padding-none-xs">
      <!-- <div> -->
      <div class=" _grid-2 _grid-gap-small ">

        <Capsid />

        <!-- <div class="FooterSignups-capsid _grid">
          <div class=" _padding-2 _section-footer _justify-end _align-bottom">
            <div class="" v-html="$md.render(capsid || '')" />
          </div>
        </div> -->
        
        <Alerts />

      </div>
    </div>

  </div>
</template>


<script>

import Capsid from '~/components/layout/FooterSignups-capsid.vue'
import Alerts from '~/components/layout/FooterSignups-alerts.vue'

export default {

  components: {
    Alerts,
    Capsid,
  },

  data () {
    return {
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
