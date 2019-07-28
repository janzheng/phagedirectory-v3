<template>
  <footer class="Footer --antialiased">

    <div class="_section-page _padding-left _padding-right _padding-top-2 _padding-bottom-2 _margin-center">

      <div class="Footer-grid _grid-2-5">
        <div class="Footer-left">
          <nuxt-link class="_margin-bottom _inline-block" to="/" aria-label="Phage Directory Footer">
            <!-- <img class="Footer-logo-sm" src="~/static/ico_rings.png"/> -->
            <img class="Footer-logo _v-middle" src="/phagedirectory_negative.png" alt="Phage Directory footer" >
          </nuxt-link>
          <div class="_padding-top _margin-left-half-sm">
            <!-- <a target="_blank" href="mailto:hello@phage.directory">hello@phage.directory</a> -->
            <a class="_margin-right-half" target="_blank" href="mailto:hello@phage.directory">
              <!-- <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"><path d="M12 .02c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6.99 6.98l-6.99 5.666-6.991-5.666h13.981zm.01 10h-14v-8.505l7 5.673 7-5.672v8.504z"/></svg> -->
              <span class="_font-phage icon-mail"/>
            </a>
            <!-- <a target="_blank" href="https://twitter.com/phagedirectory">@phagedirectory</a> -->
            <a class="_margin-right-half" target="_blank" href="https://twitter.com/phagedirectory">
              <!-- <svg id="twitter" viewBox="0 0 24 24" width="28" height="28"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm6.066 9.645c.183 4.04-2.83 8.545-8.164 8.545-1.622 0-3.13-.477-4.402-1.29 1.524.18 3.045-.245 4.252-1.19-1.256-.023-2.317-.854-2.684-1.994.45.086.895.06 1.298-.05-1.38-.278-2.335-1.522-2.304-2.853.388.215.83.344 1.3.36-1.278-.856-1.64-2.545-.888-3.836 1.416 1.737 3.533 2.882 5.92 3-.42-1.796.944-3.526 2.8-3.526.824 0 1.57.35 2.095.91.653-.13 1.27-.37 1.823-.698-.215.67-.67 1.233-1.263 1.59.58-.07 1.135-.225 1.65-.453-.385.574-.87 1.08-1.434 1.485z"/></svg> -->
              <span class="_font-phage icon-twitter"/>
            </a>
            <a target="_blank" href="https://phage.directory/feed.xml">
              <span class="_font-phage icon-rss "/>
            </a>

            <div class="_margin-top-2 _font-small">
              <a class="_block" target="_blank" href="mailto:hello@phage.directory">hello@phage.directory</a>
            </div>
            
            <div class="_margin-top-half _font-small">
              <a class="_block" target="_blank" href="https://twitter.com/phagedirectory">@phagedirectory</a>
            </div>

            <div class="_margin-top-half _font-small">
              <a class="_block" target="_blank" href="https://phage.directory/chat">Schedule a call with us</a>
            </div>

            <div class="_margin-top-2 _font-small">
              All material on Phage Directory is licensed under <a class="--underline-i" href="https://creativecommons.org/licenses/by/4.0/">Creative Commons Attribution CC-BY 4.0, unless otherwise noted.</a>
            </div>
            <div class="_padding-top-half">
              <span class="">
                <span class="_font-phage icon-cc _margin-right-half"/>
                <span class="_font-phage icon-cc-by"/>
              </span>
            </div>
          </div>
          <!-- <div class="Footer-textlogo"> 
            <span class="phagedirectory"><span>Phage</span> Directory, </span>
            <span class="">2017-{{ thisYear }}</span>
          </div> -->
        </div>

        <!-- margin-right is for avoiding the drift box -->
        <div class="Footer-right ">
          <div class="Footer-top _padding-top-quart _padding-bottom _margin-bottom">
            <!-- <a href="#top"></a> -->

            <nuxt-link
              to="/apply"
              class="_button CTA --inverse --short ">
              Sign Up
            </nuxt-link>

            <nuxt-link
              v-scroll-to="{
                el: '#top',
                onDone: (element) => { doneScrolling(element) }
              }"
              :to="`#top`" 
              class="_button CTA --transparent --shadow-none-i --inverse --short _right ">
              Scroll back up
            </nuxt-link>

          </div>
          <div class="_grid-3 _grid-gap-small">
            <div class="Footer-column _padding-bottom-2-xs">
              <div class="Footer-title _font-bold _padding-bottom-half _color-brand-light">Phage Directory</div>
              <div>
                <nuxt-link to="/phages">Phage Host Database</nuxt-link>
              </div>
              <div>
                <nuxt-link to="/labs">Phage Research Labs</nuxt-link>
              </div>
              <div>
                <nuxt-link to="/orgs">Phage Organizations</nuxt-link>
              </div>
              <div>
                <nuxt-link to="/profiles">Phage People</nuxt-link>
              </div>

            </div>
            
            <div class="Footer-column _padding-bottom-2-xs">
              <div class="Footer-title _font-bold _padding-bottom-half _color-brand-light">Community</div>
              <div>
                <nuxt-link to="/community">Community Board</nuxt-link>
              </div>
              <div>
                <nuxt-link to="/alerts">Phage Alerts</nuxt-link>
              </div>
              <div>
                <nuxt-link to="/feed">Phage Feed</nuxt-link>
              </div>
              <div>
                <nuxt-link to="/events">Events</nuxt-link>
              </div>
              <div>
                <nuxt-link to="/jobs">Phage Jobs</nuxt-link>
              </div>
              <div>
                <nuxt-link to="/capsid">Capsid &amp; Tail</nuxt-link>
              </div>
              <div>
                <nuxt-link to="/classroom">Classroom Initiative</nuxt-link>
              </div>

            </div>
            <div class="Footer-column _padding-bottom-2-xs">
              <div class="Footer-title _font-bold _padding-bottom-half _color-brand-light">Organization</div>
              

              <div>
                <nuxt-link to="/about">About Us</nuxt-link>
              </div>
              <div>
                <nuxt-link to="/contact">Contact Us</nuxt-link>
              </div>
              <div>
                <nuxt-link to="/services">Services, Ads, Jobs</nuxt-link>
              </div>
              <div>
                <nuxt-link to="/media">Media &amp; Publications</nuxt-link>
              </div>
              <div>
                <nuxt-link to="/brand">Brand</nuxt-link>
              </div>
              <div>
                <nuxt-link to="/slack">Join our Slack</nuxt-link>
              </div>

              
              <div>
                <a href="https://github.com/phage-directory" target="_blank">Github</a>
              </div>
              <div>
                <nuxt-link to="/policies">Site Policy</nuxt-link>
              </div>
              <!-- <a class="_block" target="_blank" href="https://phage.directory/chat">Schedule a call with us</a> -->
              <!-- <a class="_block" target="_blank" href="mailto:hello@phage.directory">hello@phage.directory</a> -->
              <!-- <a class="_block" target="_blank" href="https://twitter.com/phagedirectory">@phagedirectory</a> -->

            </div>
          </div>


          <!-- <div class="_grid-3 _grid-gap-small _margin-top-2">
            <div class="Footer-column _padding-bottom-2-xs">
              <a class="_block" target="_blank" href="mailto:hello@phage.directory">hello@phage.directory</a>
            </div>
            
            <div class="Footer-column _padding-bottom-2-xs">
              <a class="_block" target="_blank" href="https://twitter.com/phagedirectory">@phagedirectory</a>
            </div>

            <div class="Footer-column _padding-bottom-2-xs">
              <a class="_block" target="_blank" href="https://phage.directory/chat">Schedule a call with us</a>
            </div>
          </div> -->

        </div>
      </div>

      

    </div>

  </footer>
</template>


<script>


export default {

  components: {
  },

  data () {
    return {
      // content: this.$cytosis.findOne('footer', this.$store.state['Content'] ).fields['Markdown']
    }
  },

  computed: {
    thisYear() {
      let date = new Date
      return date.getFullYear()
    }
  },

  methods: {
    doneScrolling(el) {
      this.$router.push({
        path: this.route.path + '#' + el.id
      })
    }
  }


}
</script>

<style lang="scss" scoped>
</style>
