<template>
  <div class="FooterSignups-alerts _radius">
    <div class="_padding _flex-col _height-100">
      <div class="_flex-1" v-html="$md.render('We send [Phage Alerts](/alerts) to the community when doctors require phages to treat their patient’s infections. If you need phages, [please email us](mailto:staff@phage.directory).')" />
      <!-- <form class="" 
            action="https://tinyletter.com/phagedirectory" 
            method="post" target="popupwindow" 
            onsubmit="window.open('https://tinyletter.com/phagedirectory', 'popupwindow', 'scrollbars=yes,width=800,height=600');return true"
      >
        <div class="_flex-row-sm">
          <input id="tlemail" name="email" type="email" 
                 class="_width-100 _form-input _radius _margin-bottom-half-xs"
                 placeholder="Your email" required>
          <input type="hidden" value="1" name="embed" >
          <input class="_button _flex-1 --outline _margin-bottom-none " type="submit" value="Alert me" >
        </div>
      </form> -->
      <a target="_blank" href="https://phage.beehiiv.com/subscribe" class="_button _flex-1 --outline _margin-bottom-none " >Sign up for Phage Alerts</a>
    </div>
  </div>
</template>


<script>


export default {

  components: {
  },

  data () {
    return {
    }
  },

  computed: {
  },


}
</script>

<style lang="scss" scoped>
</style>
