<template>
  <div class="Footer --antialiased">

    <div class="_section-page _padding-left _padding-right _padding-top-2 _padding-bottom-2 _margin-center">

      <div class="_grid-2-5">
        <div class="Footer-left">
          <router-link to="/" aria-label="Phage Directory Footer">
            <!-- <img class="Footer-logo-sm" src="~/static/ico_rings.png"/> -->
            <img class="Footer-logo _v-middle" src="/phagedirectory_negative.png" alt="Phage Directory footer" >
          </router-link>
          <div class="_padding-top _padding-bottom _font-small">
            <div class="_padding-bottom"> 
              <span class="phagedirectory"><span>Phage</span> Directory, </span>
              <span class="">2017-{{ thisYear }}</span>
            </div>
            <div class="">
              <a target="_blank" href="mailto:hello@phage.directory">hello@phage.directory</a>
            </div>
            <div class="">
              <a target="_blank" href="https://twitter.com/phagedirectory">@phagedirectory</a>
            </div>
          </div>
          <!-- </router-link> -->
        </div>

        <!-- margin-right is for avoiding the drift box -->
        <div class="Footer-right">
          <div class="_grid-3 _grid-gap-none">
            <div class="Footer-column _padding-bottom-2-xs">
              <div class="Footer-title _font-bold _padding-bottom-half _color-brand-light">Phage Directory</div>
              <div>
                <router-link to="/phages">Phage Host Database</router-link>
              </div>
              <div>
                <router-link to="/labs">Phage Research Labs</router-link>
              </div>
              <div>
                <router-link to="/profiles">Phage Researchers</router-link>
              </div>
              <div>
                <router-link to="/companies">Phage Companies</router-link>
              </div>

            </div>
            
            <div class="Footer-column _padding-bottom-2-xs">
              <div class="Footer-title _font-bold _padding-bottom-half _color-brand-light">Community</div>
              <div>
                <router-link to="/capsid">Capsid &amp; Tail</router-link>
              </div>
              <div>
                <router-link to="/alerts">Phage Alerts</router-link>
              </div>
              <div>
                <router-link to="/community">Community Board</router-link>
              </div>
              <div>
                <router-link to="/jobs">Phage Jobs</router-link>
              </div>
              <div>
                <router-link to="/classroom">Classroom Initiative</router-link>
              </div>

            </div>
            <div class="Footer-column _padding-bottom-2-xs">
              <div class="Footer-title _font-bold _padding-bottom-half _color-brand-light">Organization</div>
              

              <div>
                <router-link to="/about">About Us</router-link>
              </div>
              <div>
                <router-link to="/contact">Contact Us</router-link>
              </div>
              <div>
                <router-link to="/services">Services, Ads, Jobs</router-link>
              </div>
              <div>
                <router-link to="/brand">Brand</router-link>
              </div>
              <div>
                <router-link to="/policies">Site Policy</router-link>
              </div>
              <div>
                <a target="_blank" href="mailto:hello@phage.directory">Email</a> / <a target="_blank" href="https://twitter.com/phagedirectory">Twitter</a>
              </div>

            </div>
          </div>

          <!-- <div class="_right">
            <span class="_margin-right _block-xs _margin-bottom-half-xs">
              Email: <a target="_blank" href="mailto:hello@phage.directory">hello@phage.directory</a>
            </span>
            <span class=" _block-xs ">
              Twitter: <a target="_blank" href="https://twitter.com/phagedirectory">@phagedirectory</a>
            </span>
          </div> -->

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
      content: this.$cytosis.findOne('footer', this.$store.state['Content'] ).fields['Markdown']
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
