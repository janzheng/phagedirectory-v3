<template>
  <div class="Profile-edit">
    <no-ssr>
      <Template v-if="!isCorrect || statusMessage || isLoading">
        <template >
          <!-- <div v-if="isCorrect" class="Profile-unready"> -->
          <div v-if="!isCorrect" class="Profile-unready">
            <div class="_card _padding">
              <h5>Profile Page</h5>
              <p>Welcome to the profile page! To find your profile page, please follow the personalized link we sent to your academic or organization email address.
              </p>
              <p>If you would like an account, please join Phage Directory by <nuxt-link to="/join">visiting the Sign Up page</nuxt-link>.
              </p>
              <p>If you clicked a personalized link and are still seeing this message, please get in touch with <a href="mailto:support@phage.directory">support@phage.directory</a>.
              </p>
              <p>Thanks so much!<br>— The Phage Directory team
              </p>
            </div>
          </div>

          <div v-if="isCorrect && isLoading" class="_section-article _margin-center" >
            <div class=""> 
              <!-- <h1 class="">EditProfile</h1> -->
              <div class="_card _padding">
                <h4><span class="_inine-block _margin-right-2 _spinner" style="bottom: -3px;" />Your profile is loading ...</h4>
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
        <div v-if="tableType == 'Organizations'">
          <EditOrg :slug="slug" :passcode="passcode" :profile-prop="profile" />
        </div>
        <div v-else>
          <EditPerson :slug="slug" :passcode="passcode" :profile-prop="profile" />
        </div>
      </div>  



    </no-ssr>
  </div>
</template>


<script>

// import { mapState } from 'vuex'
import EditOrg from '~/components/profile/EditOrg.vue'
import EditPerson from '~/components/profile/EditPerson.vue'

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
    EditOrg,
    EditPerson,
  },

  layout: 'contentframe',
  middleware: 'pageload',
  meta: {
    tableQueries: ["_content-copy"],
    // tableQueries: ["_content-copy","atoms-events"],
  },

  data () {

    let routeslug = this.$router.history.current.params.slug
    let routecode = this.$router.history.current.params.passcode

    let _ready = false, _loading = false
    if(routeslug && routecode && process.client) {
      _loading = true
      this.getData({slug: routeslug, passcode: routecode})
      _ready = true
    }

    return {
      isCorrect: _ready,
      isLoading: _loading,
      // routeslug: routeslug,
      // routecode: routecode, // passcode
      profile: null, // user's profile
      slug: routeslug,
      passcode: routecode,
      tableType: null,
      statusMessage: null,
    }
  },
  
  async asyncData({route}) {
    let routeslug = route.params.slug
    let routecode = route.params.passcode
    let _ready = routeslug && routecode

    return {
      isCorrect: _ready
    }
  },

  methods: {
    async getData({slug, passcode}) {
      let _slug = slug || this.slug

      let _passcode = passcode || this.passcode

      if(_slug && _passcode) {
        this.statusMessage = "Hold on to your shoes, I'm loading!!"
        this.isLoading = true

        let profiledata = {
          slug: _slug, // "test-example",
          passcode: _passcode, //  "THEIR-FEED-NOSE-into",
          type: "GET"
        }
        let response = await axios.post(process.env.api_url + '/api/profile', profiledata)
        if(response.data && response.data.meta) {
          this.profile = response.data
          this.tableType = response.data.meta.table
          this.isLoading = false
        } else {
          this.isLoading = false
          this.statusMessage = "Profile could not be loaded."
        }
      }
    },
  },


}
</script>

<style>
</style>

