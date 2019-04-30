<template>
  <div class="FooterSignups _margin ">

    <div class="_section-page _padding-left _padding-right _margin-center">
      <!-- <div> -->
      <div class=" _grid-2 _grid-gap-small ">


        <div class="FooterSignups-capsid">
          <div class="_padding _justify-end _align-bottom">
            <div class="_grid-auto-1-sm">
              <img alt="Capsid & Tail" src="https://dl.airtable.com/.attachmentThumbnails/b739c7b74b17c1c96a1d8b0d327aee47/2a5a0691" height="48" width="auto" >
              <div v-html="$md.render('Follow [Capsid & Tail](/capsid), the only periodical that reports the latest news in phage therapy and the phage community.')" />
            </div>

            <div id="mc_embed_signup_footer">
              <form id="mc-embedded-subscribe-form" action="https://directory.us19.list-manage.com/subscribe/post?u=a95319e0a6f57b754b11012a8&amp;id=98ef5d6bca" method="post" name="mc-embedded-subscribe-form" class="validate" target="_blank">
                <div id="mc_embed_signup_scroll">
                  <div id="mce-responses" class="clear hhoney">
                    <div id="mce-error-response" style="display:none" class="response" />
                    <div id="mce-success-response" style="display:none" class="response" />
                  </div>
                  <div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="b_a95319e0a6f57b754b11012a8_98ef5d6bca" tabindex="-1" value=""></div>
                  <div class="mc-field-group _flex-row">
                    <input id="mce-EMAIL" placeholder="Your email" type="email" name="EMAIL" class="required email _form-input _flex-1 _radius" required>
                    <input id="mc-embedded-subscribe" class=" _button" type="submit" value="Get Capsid &amp; Tail" name="subscribe">
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <!-- <div class="FooterSignups-capsid _grid">
          <div class=" _padding-2 _section-footer _justify-end _align-bottom">
            <div class="" v-html="$md.render(capsid || '')" />
          </div>
        </div> -->
        <div class="FooterSignups-alerts">
          <div class="_padding">
            <div class="" v-html="$md.render('We send [Phage Alerts](/alerts) to the community when doctors require phages to treat their patient’s infections. If you need phages, [please email us](staff@phage.directory).')" />
            <form class="" 
                  action="https://tinyletter.com/phagedirectory" 
                  method="post" target="popupwindow" 
                  onsubmit="window.open('https://tinyletter.com/phagedirectory', 'popupwindow', 'scrollbars=yes,width=800,height=600');return true"
            >
              <div class="_flex-row">
                <input id="tlemail" name="email" type="email" 
                       class="_flex-1 _form-input _radius"
                       placeholder="Your email" required>
                <input type="hidden" value="1" name="embed" >
                <input class="_button --outline _margin-bottom-none " type="submit" value="Receive Alerts" >
              </div>
            </form>
            <!-- <div class="_padding-2 _section-footer _align-bottom">
              <div class="" v-html="$md.render(alerts || '')" />
            </div> -->
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
