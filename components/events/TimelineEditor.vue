<template>
  <div class="Timeline-edit-person">
    <Template sidebar-classes="--sticky --top-1" grid-classes="Template--Main-Sidebar _grid-4-1-sm _grid-gap ">

      <template #header>
        <div class="Timeline-edit-preview _margin-top _card _padding">
          <h6>Timeline Post Preview</h6>
          <Card :author="profile" :post="post" class="Timeline-edit-preview-card" />
        </div>


        <div class="Timeline-editor _divider-top-half ">

          <div class="Timeline-edit-background _card _padding _color-bg-white">
            <!-- <p class="_font-bold">Post to Timeline</p> -->
            
            <div class="_margin-bottom">
              <div>
                <span class="_font-bold">Event:</span> {{ eventslug }}
              </div>
              <div>
                <span class="_font-bold">User:</span> {{ profileslug }}
              </div>
              <!-- <div>Post: {{ post }}</div> -->
            </div>

            <FormletTextArea
              :key="`${clearCtr}_textarea`" 
              :input="input_markdown" 
              :submit-handler="saveData"
              class="_margin-top-2"
              @input="(data) => { updateData('Data:Markdown', data) }" 
            />

            <FormletInput
              :key="`${clearCtr}_twitter`" 
              :input="input_twitterlink" 
              type="text"
              input-attrs="--open"
              :submit-handler="saveData"
              @input="(data) => { updateData('Data:Twitter', data) }" 
            />
            <div class="_font-small">Example: https://twitter.com/phagedirectory/status/1154539172826234880?s=20</div>

            <div class="Timeline-edit-postImage-section _margin-top-2">
              <div class="_font-bold _margin-bottom-half">Add a Post Image</div>

              <div class="Timeline-postImage-container _card _padding _form-control">
                <div class="Timeline-postImage-grid">
                  <div class="Timeline-postImage-preview">
                    <div v-if="postImage" class="_padding-right">
                      <img style="max-width: 400px" :src="postImage" >
                    </div>
                  </div>
                  <div class="Timeline-postImage-control">
                    <label for="Timeline-postImage" class="_button --outline">
                      <span v-if="!postImage"><strong>Take a Picture</strong> or Upload an Image</span>
                      <span v-else>Change Post Image</span>
                    </label> <button v-if="postImage" @click="clearPostImage">Clear Post Image</button>
                    <FormletInputFloat
                      :key="input_postImagelink.initial"
                      :input="input_postImagelink" 
                      input-attrs="--open"
                      type="text"
                      :submit-handler="saveData"
                      @input="(data) => { setPostImage(data) }" 
                    />
                    <input id="Timeline-postImage" ref="postImage" type="file" class="Timeline-postImage" style="display:none" @input="uploadPostImage"> 
                    <div class="_font-small">Example: https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2017/11/12231413/Labrador-Retriever-MP.jpg</div>
                  </div>
                </div>
              </div>
            </div>

            <div :class="!hasChanged ? '--notChanged' : ''" class="Timeline-edit-ctabar _margin-top">
              <div class="_grid-1-3 _align-vertically">
                <div>
                  <button v-if="!isSaving" class="_button _width-full _margin-bottom-none-i" @click="saveData" >Post to Timeline!</button>
                  <button v-if="isSaving" class="_button _width-full _margin-bottom-none-i --disabled"><span class="_inine-block _margin-right-2 _spinner" /> Posting...</button>
                </div>
                <div v-if="message" class="Timeline-edit-message _margin-bottom-none-i">{{ message }}</div>
              </div>
            </div>
          </div>
        </div>

      </template>

    </Template>
  </div>
</template>


<script>

// import { mapState } from 'vuex'
// import Cytosis from '~/components/experiments/Cytosis.vue'
// import Template from '~/templates/article.vue'

import Template from '~/templates/context.vue'
import axios from 'axios'

import FormletInput from '~/components/layout/Formlet-input'
import FormletInputFloat from '~/components/layout/Formlet-input-float'
import FormletTextArea from '~/components/layout/Formlet-textarea'

import Card from '~/components/events/TimelineCard.vue'
// import Card from '~/components/dir/PeopleCard.vue'

export default {

  components: {
    // Cytosis,
    // NodeForm,
    Template,
    Card,
    FormletInput,
    FormletInputFloat,
    FormletTextArea,
    // FormletInputDatalist,
  },

  props: {
    eventslug: String, //
    profileslug: String, // used to get the mgr account
    passcode: String, // used to get the mgr account
    profileProp: Object
  },

  layout: 'contentframe',
  middleware: 'pageload',
  meta: {
    tableQueries: ["_content-copy"],
    // tableQueries: ["_content-copy","atoms-events"],
  },

  // async asyncData({env, store, route, app, error}) {
  // },

  data () {

    let profile = this.profileProp.payload
    let event = this.profileProp.event
    let author = this.profileProp.author
    let postImage
    let post = { fields: { 'Data:Markdown': '' } }
    let clearCtr = 0 // updates every time we save, used as key

    return {
      profile: profile, // user's profile
      event: event,
      author: author,
      post: post,
      files: [],
      postImage: postImage, // temporary placeholder for postImage preview for upload
      postImage_link: false, // external url link
      postImage_clear: false, // if user clicks 'clear' this is set to true
      isSaving: false,
      hasChanged: false,
      message: "",
      isStaging: process.env.pd_env,
      clearCtr, 

      input_twitterlink: {
        "initial": "",
        "name":"TwitterLink",
        "label":"Embed a Tweet",
        "placeholder":"Tweet > Share > Copy link to Tweet",
        "type":"FLOAT",
      },
      input_markdown: {
        "initial": "",
        "rows": 2,
        "name":"TimelinePost",
        // "label":"Personal Bio",
        "description":"__Timeline Post__ (takes Markdown!)",
        "placeholder":"This talk is great!",
        "type":"TEXTAREA",
      },
      input_postImagelink: { // if user wants to upload an postImage
        "initial": "",
        "name":"postImageURL",
        "label":"Upload postImage from URL",
        "placeholder":"https://phage.directory/icon.png",
        "type":"FLOAT",
      },

    }

  },
  
  computed: {
    // ...mapState([
    //   'Atoms',
    //   ]),
    // events() {
    //   return this.Atoms.filter(t => t.fields['Atom:Type'] == 'Event')
    // },

  },

  methods: {
    updateData(field, data) {
      // since profile is an obj we need to manually trigger update
      this.post.fields[field] = data
      this.post.__ob__.dep.notify()
      this.hasChanged = true
    },

    async saveData() {

      // https://stackoverflow.com/questions/50774176/sending-file-and-json-in-post-multipart-form-data-request-with-axios/50774380
      let formData = new FormData()
      this.isSaving = true
      this.message = "Posting to Timeline..."

      // scrub the post image 
      this.post.fields['Data:Attachments'] = undefined

      let timelinedata = {
        eventslug: this.eventslug, // "PhageFuturesEU2019",
        profileslug: this.profileslug, // "person-example",
        passcode: this.passcode, //  "THEIR-FEED-NOSE-into",
        type: "UPDATE",
        postImage_link: this.postImage_link,
        data: this.post.fields,
        eventId: this.event.id,
        authorId: this.author.id,
      }

      if(this.files && this.files[0]) {
        console.log('adding postImage ::: ', this.files[0])
        formData.append("postImage", this.files[0])
      }

      formData.append("type", "UPDATE")
      formData.append("timeline", JSON.stringify(timelinedata))

      // let response = await axios.post(process.env.api_url + '/api/profile', profiledata)

      let response = await axios({
        method: 'post',
        url: process.env.api_url + '/api/timeline',
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' },
      })

      // console.log('response:', response)
      if(response.data) {
        // let postImage, profile = response.data.payload
        // this.profile = profile
        this.isSaving = false
        this.message = "Successfully posted to Timeline!"

        // reset local state postImages
        this.input_postImagelink = {
          "initial": "",
          "name":"postImageURL",
          "label":"postImage URL",
          "placeholder":"",
          "type":"FLOAT",
        }

        this.clearCtr = this.clearCtr + 1
        this.post = { fields: { 'Data:Markdown': '' } }
        this.post.__ob__.dep.notify()

        this.files = undefined
        this.postImage = undefined // temporary placeholder for postImage preview for upload
        this.postImage_link = false // external url link
        this.postImage_clear = false // if user clicks 'clear' this is set to true

      } else {
        this.isSaving = false
        this.message = "Could not post to Timeline."
      }
    },


    setPostImage(data) {
      if(data == '') {
        this.postImage = undefined 
        this.post.fields['Data:Attachments'] = undefined
        this.hasChanged = true
      } else {
        this.hasChanged = true
        this.postImage_link = data
        this.post.fields['Data:Attachments'] = [{url: data}]
        this.hasChanged = true
      }
      this.post.__ob__.dep.notify()
    },

    clearPostImage() {
      this.files = undefined
      this.postImage = undefined
      this.post.fields['Data:Attachments'] = []
      this.postImage_clear = true // in case user wants to delete postImage
      this.$refs.postImage.value = '' 
      this.hasChanged = true
      this.post.__ob__.dep.notify()
    },

    uploadPostImage(event) {
      const _this = this
      console.log('upload postImage: ', event.target.files)
      this.files = event.target.files
      this.hasChanged = true
      if(this.files && this.files[0]) {
        console.log("File: " , this.files[0])
        const reader = new FileReader()
        reader.onload = (e) => {
          _this.postImage = e.target.result
          // this is only used for preview card! need to scrub it from Data:Attachments on submit
          this.post.fields['Data:Attachments'] = [{url: _this.postImage}]
          this.post.__ob__.dep.notify()
          this.hasChanged = true
        }
        reader.readAsDataURL(this.files[0])
      }

      
    }
  },


}
</script>

<style>
</style>

