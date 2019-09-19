<template>
  <div class="Events-timeline">
    <no-ssr>
      <Template v-if="!isCorrect || statusMessage || isLoading">
        <template >
          <!-- <div v-if="isCorrect" class="Profile-unready"> -->
          <div v-if="!isCorrect" class="Profile-unready">
            <div class="_card _padding">
              <h5>Timeline Editor</h5>
              <p>Welcome to the timeline editor! This page is super beta territory. If you need access to the editor or need a new magic link, please ask Jan (support@phage.directory).
              </p><p>
                If you need to login, please go to your email and click that magic link and it should all work. If it doesn't, talk to Jan...
              </p>
            </div>
          </div>

          <div v-if="isCorrect && isLoading" class="_section-article _margin-center" >
            <div class=""> 
              <!-- <h1 class="">EditProfile</h1> -->
              <div class="_card _padding">
                <h4><span class="_inine-block _margin-right-2 _spinner" style="bottom: -3px;" />The page is loading ...</h4>
              </div>
            </div>
          </div>

          <div v-if="statusMessage" class="Profile-error">
            <div class="_card _padding">
              {{ statusMessage }}
            </div>
          </div>
        </template>
      </Template>

      <div v-if="isCorrect && !isLoading" class="">
        <TimelineEditor :eventslug="eventslug" :profileslug="slug" :passcode="passcode" :profile-prop="profile" />
      </div>  



    </no-ssr>
  </div>
</template>


<script>

// import { mapState } from 'vuex'
import TimelineEditor from '~/components/events/TimelineEditor.vue'
// import EditOrg from '~/components/profile/EditOrg_old.vue'
// import EditPerson from '~/components/profile/EditPerson.vue'

// import Template from '~/templates/context.vue'
import Template from '~/templates/article.vue'
// import { loadQuery } from '~/other/loaders'
import axios from 'axios'

// import Cytosis from '~/components/experiments/Cytosis.vue'
// import Template from '~/templates/article.vue'


export default {

  components: {
    // Cytosis,
    Template,
    TimelineEditor,
    // EditOrg,
    // EditPerson,
  },

  layout: 'contentframe',
  middleware: 'pageload',
  meta: {
    tableQueries: ["_content-copy"],
    // tableQueries: ["_content-copy","atoms-events"],
  },

  data () {

    let routeevent = this.$router.history.current.params.event
    let routeslug = this.$router.history.current.params.slug
    let routecode = this.$router.history.current.params.passcode

    let _ready = false, _loading = false
    if(routeevent && routeslug && routecode && process.client) {
      _loading = true
      this.getData({event: routeevent, slug: routeslug, passcode: routecode})
      _ready = true
    }

    return {
      isCorrect: _ready,
      isLoading: _loading,
      // routeslug: routeslug,
      // routecode: routecode, // passcode
      profile: null, // user's profile
      eventslug: routeevent,
      slug: routeslug,
      passcode: routecode,
      statusMessage: null,
    }
  },
  
  async asyncData({route}) {
    let routeevent = route.params.event
    let routeslug = route.params.slug
    let routecode = route.params.passcode
    let _ready = routeslug && routecode

    return {
      isCorrect: _ready
    }
  },

  methods: {
    async getData({event, slug, passcode}) {
      let _slug = slug || this.slug
      let _event = event || this.event
      let _passcode = passcode || this.passcode

      if(_event && _slug && _passcode) {
        this.statusMessage = "Hold on to your shoes, I'm loading!!"
        this.isLoading = true

        let payload = {
          event: _event,
          profileslug: _slug, // "test-example",
          passcode: _passcode, //  "THEIR-FEED-NOSE-into",
          type: "GET"
        }
        let response = await axios.post(process.env.api_url + '/api/timeline', payload)
        if(response.data) {
          this.profile = response.data
          this.isLoading = false
        } else {
          this.isLoading = false
          this.statusMessage = "Timeline could not be loaded."
        }
      }
    },
  },


}
</script>

<style>
</style>

