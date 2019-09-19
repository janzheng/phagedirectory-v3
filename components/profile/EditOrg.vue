<template>
  <div class="Profile-edit-orgs">
    <Template sidebar-classes="--sticky --top-1" grid-classes="Template--Main-Sidebar _grid-4-1-sm _grid-gap ">

      <template #header>
        <h1 class="">{{ ProfileTitle }}</h1>

        <div class="Profile-edit-preview _margin-top-2 _card _padding">
          <h6>Organization Preview</h6>
          <Card :org="profile" class="Profile-edit-preview-card" />
        </div>

        <div class="Profile-editor _divider-top-half ">
          <h6>Organization Profile</h6>
          
          <div class="Profile-edit-background _card _padding _color-bg-white">
            <p class="_font-bold">Background Information</p>
            <div class="Profile-edit-name">
              <FormletInputFloat
                :input="input_name"
                input-attrs="--open"
                :submit-handler="saveData"
                @input="(data) => { updateProfile('Name', data) }" 
              />
            </div>

            <div class="_grid-2">
              <FormletInputFloat
                :input="input_altname"
                input-attrs="--open"
                :submit-handler="saveData"
                @input="(data) => { updateProfile('AltName', data) }" 
              />
              <FormletInputFloat
                :input="input_orgtype" 
                type="text"
                input-attrs="--open"
                :submit-handler="saveData"
                @input="(data) => { updateProfile('Org:Types:Custom', data) }" 
              />
            </div>

            <div class="Profile-edit-description _margin-top-2">
              <FormletTextArea
                :input="input_description" 
                :submit-handler="saveData"
                @input="(data) => { updateProfile('Description', data) }" 
              />
            </div>

            <div class="Profile-edit-location _margin-top-2">
              <div class="_grid-3">
                <div class="Profile-edit-city">
                  <FormletInputFloat
                    :input="input_city" 
                    type="text"
                    input-attrs="--open"
                    :submit-handler="saveData"
                    @input="(data) => { updateProfile('City', data) }" 
                  />
                </div>
                <div class="Profile-edit-state">
                  <FormletInputFloat
                    :input="input_state" 
                    type="text"
                    input-attrs="--open"
                    :submit-handler="saveData"
                    @input="(data) => { updateProfile('State', data) }" 
                  />
                </div>
                <div class="Profile-edit-country">
                  <FormletInputFloat
                    :input="input_country" 
                    type="text"
                    input-attrs="--open"
                    :submit-handler="saveData"
                    @input="(data) => { updateProfile('Country', data) }"  
                  />
                </div>
              </div>
            </div>

            <div class="Profile-edit-avatar-section _margin-top-2">
              <div class="_font-bold _margin-bottom-half">Organization Logo</div>

              <div class="Profile-avatar-container _card _padding _form-control">
                <div class="Profile-avatar-grid _flex-row-sm">
                  <div class="Profile-avatar-preview">
                    <div v-if="avatar" class="_padding-right">
                      <img style="max-width: 400px" :src="avatar" >
                    </div>
                  </div>
                  <div class="Profile-avatar-control _flex-1">
                    <label for="Profile-avatar" class="_button --outline">
                      <span v-if="!avatar">Upload Logo Image</span>
                      <span v-else>Change Logo Image</span>
                    </label> <button v-if="avatar" @click="clearAvatar">Clear Logo</button>
                    <FormletInputFloat
                      :key="input_avatarlink.initial"
                      :input="input_avatarlink" 
                      input-attrs="--open"
                      type="text"
                      :submit-handler="saveData"
                      @input="(data) => { setAvatar(data) }" 
                    />
                    <input id="Profile-avatar" ref="avatar" type="file" class="Profile-avatar" style="display:none" @input="uploadAvatar"> 
                  </div>
                </div>

                <div class="_font-small">Note: your image might be cropped — please save to preview your final profile</div>
                <!-- todo: add support for profile url and svgs -->
              </div>
            </div>

            <div :class="!hasChanged ? '--notChanged' : ''" class="Profile-edit-ctabar _margin-top">
              <div class="_grid-1-3 _align-vertically">
                <div>
                  <button v-if="!isSaving" class="_button _width-full _margin-bottom-none-i" @click="saveData" >Save Changes</button>
                  <button v-if="isSaving" class="_button _width-full _margin-bottom-none-i --disabled"><span class="_inine-block _margin-right-2 _spinner" /> Saving...</button>
                </div>
                <div v-if="message" class="Profile-edit-message _margin-bottom-none-i">{{ message }}</div>
              </div>
            </div>
          </div>
        </div>



        <div class="Profile-edit-contact _divider-top-half ">
          <h6 class="_font-bold">Organization Contact</h6>

          <div class="_card _padding _color-bg-white">
            <div class="Profile-edit-website">
              <FormletInputFloat
                :input="input_website" 
                input-attrs="--open"
                :submit-handler="saveData"
                @input="(data) => { updateProfile('URL', data) }" 
              />
            </div>
            <div class="Profile-edit-social _grid-2">
              <div class="Profile-edit-contactname">
                <FormletInputFloat
                  :input="input_contactperson" 
                  input-attrs="--open"
                  :submit-handler="saveData"
                  @input="(data) => { updateProfile('ContactPerson', data) }" 
                />
              </div>
              <div class="Profile-edit-email">
                <FormletInputFloat
                  :input="input_email" 
                  input-attrs="--open"
                  :submit-handler="saveData"
                  @input="(data) => { updateProfile('Email', data) }" 
                />
              </div>
              <div class="Profile-edit-twitter">
                <FormletInputFloat
                  :input="input_twitter" 
                  input-attrs="--open"
                  :submit-handler="saveData"
                  @input="(data) => { updateProfile('Social:Twitter', data) }" 
                />
              </div>
              <div class="Profile-edit-linkedin">
                <FormletInputFloat
                  :input="input_linkedin" 
                  input-attrs="--open"
                  :submit-handler="saveData"
                  @input="(data) => { updateProfile('Social:Linkedin', data) }" 
                />
              </div>
            </div>

            <div :class="!hasChanged ? '--notChanged' : ''" class="Profile-edit-ctabar _margin-top">
              <div class="_grid-1-3 _align-vertically">
                <div>
                  <button v-if="!isSaving" class="_button _width-full _margin-bottom-none-i" @click="saveData" >Save Changes</button>
                  <button v-if="isSaving" class="_button _width-full _margin-bottom-none-i --disabled"><span class="_inine-block _margin-right-2 _spinner" /> Saving...</button>
                </div>
                <div v-if="message" class="Profile-edit-message _margin-bottom-none-i">{{ message }}</div>
              </div>
            </div>
          </div>
        </div>


        <!-- <div v-if="profile && isStaging" class="_divider-top-half" style="word-break: break-all;">
          {{ profile }}
        </div> -->

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

// import FormletInput from '~/components/layout/Formlet-input'
import FormletInputFloat from '~/components/layout/Formlet-input-float'
import FormletTextArea from '~/components/layout/Formlet-textarea'

// import Card from '~/components/dir/PeopleCard.vue'
import Card from '~/components/dir/OrgCard.vue'

export default {

  components: {
    // Cytosis,
    // NodeForm,
    Template,
    Card,
    // FormletInput,
    FormletInputFloat,
    FormletTextArea,
    // FormletInputDatalist,
  },

  props: {
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
    let avatar
    if(profile.fields['ProfileImage'] && profile.fields['ProfileImage'][0]) {
      avatar = profile.fields['ProfileImage'][0]['url']
    }

    return {
      tableType: this.profileProp.meta['table'],
      profile: profile, // user's profile
      files: [],
      avatar: avatar, // temporary placeholder for avatar preview for upload
      avatar_link: false, // external url link
      avatar_clear: false, // if user clicks 'clear' this is set to true
      isSaving: false,
      hasChanged: false,
      message: "",
      isStaging: process.env.pd_env,


      input_name: {
        "initial": profile.fields['Name'],
        "name":"Name",
        "label":"Organization Name",
        "description":"",
        "placeholder":"Full Organization Name",
        "type":"FLOAT",
      },

      input_altname: {
        "initial": profile.fields['AltName'],
        "name":"AltName",
        "label":"Alt Org Name",
        "description":"",
        "placeholder":"e.g. NCTC",
        "type":"FLOAT",
      },

      input_orgtype: {
        "initial": profile.fields['Org:Types:Custom'] || profile.fields['Org:Types'],
        "name":"Org:Types:Custom",
        "label":"Organization Type",
        "description":"",
        "placeholder":"",
        "type":"INPUT",
        "options": [
          {"value": "Biotech"},
          {"value": "Pharma"},
          {"value": "Non-profit"},
          {"value": "Phage Bank"},
          {"value": "Government"},
          {"value": "Regulatory"},
          {"value": "Funding Agency"},
          {"value": "Tech (ML, AI, Bioinformatics)"},
          {"value": "Consultancy"},
          {"value": "CRO"},
          {"value": "CRMO"},
          {"value": "Phage Manufacturer"}
        ]
      },

      input_description: {
        "initial": profile.fields['Description'],
        "rows": 6,
        "name":"Description",
        // "label":"Personal Bio",
        "description":"__Organization Description__",
        "placeholder":"My phage organization does this really well.",
        "type":"TEXTAREA",
      },

      input_avatarlink: { // if user wants to upload an image
        "initial": "",
        "name":"ImageURL",
        "label":"Upload Image from URL",
        "placeholder":"https://phage.directory/icon.png",
        "type":"FLOAT",
      },

      input_city: {
        "initial": profile.fields['City'],
        "name":"City",
        "label":"City",
        "placeholder":"Atlanta",
        "type":"FLOAT",
      },
      input_state: {
        "initial": profile.fields['State'],
        "name":"State",
        "label":"US State",
        "placeholder":"GA",
        "type":"FLOAT",
      },

      input_country: {
        "initial": profile.fields['Country'],
        "name":"Country",
        "label":"Country",
        "placeholder":"United States",
        "type":"FLOAT",
      },


      input_website: {
        "initial": profile.fields['URL'],
        "name":"URL",
        "label":"Website URL",
        "description":"",
        "placeholder":"http://organization.com",
        "type":"FLOAT",
      },
      input_contactperson: {
        "initial": profile.fields['ContactPerson'],
        "name":"ContactPerson",
        "label":"Organization Contact Person",
        "placeholder":"John D. Smith",
        "type":"FLOAT",
      },
      input_email: {
        "initial": profile.fields['Email'],
        "name":"Email",
        "label":"Organization Contact Email",
        "placeholder":"marketing@organization.com",
        "type":"FLOAT",
      },
      input_twitter: {
        "initial": profile.fields['Social:Twitter'],
        "name":"Social:Twitter",
        "label":"Twitter",
        "placeholder":"@organization_twitter",
        "type":"FLOAT",
      },
      input_linkedin: {
        "initial": profile.fields['Social:Linkedin'],
        "name":"Social:Linkedin",
        "label":"LinkedIn URL",
        "placeholder":"https://linkedin.com/in/organization",
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

    ProfileTitle() {
      // calculated names includes spaces
      if(!this.profile.fields['Name'] || this.profile.fields['Name'].trim() == '')
        return `New Organization Profile`
      
      return `${this.profile.fields['Name']} Profile`
    }
  },

  methods: {
    updateProfile(field, data) {
      // if(field == 'Org:Types') {
      //   console.log('updating Org:Types:', field, data)
      //   this.profile.fields[field] = [data] // multiple select
      // } else {
      //   // since profile is an obj we need to manually trigger update
      //   this.profile.fields[field] = data
      // }
      this.profile.fields[field] = data
      this.profile.__ob__.dep.notify()
      this.hasChanged = true
    },

    async saveData() {

      // https://stackoverflow.com/questions/50774176/sending-file-and-json-in-post-multipart-form-data-request-with-axios/50774380
      let formData = new FormData()
      this.isSaving = true
      this.message = "Saving your profile..."

      let profiledata = {
        profileslug: this.profileslug, // "test-example",
        passcode: this.passcode, //  "THEIR-FEED-NOSE-into",
        type: "UPDATE",
        table: this.tableType,
        avatar_link: this.avatar_link,
        avatar_clear: this.avatar_clear,
        data: this.profile.fields
      }

      if(this.files && this.files[0]) {
        console.log('adding avatar ::: ', this.files[0])
        formData.append("avatar", this.files[0])
      }

      formData.append("type", "UPDATE")
      formData.append("profile", JSON.stringify(profiledata))

      // let response = await axios.post(process.env.api_url + '/api/profile', profiledata)

      console.log(' >>>> submitting >>>>', profiledata)

      let response = await axios({
        method: 'post',
        url: process.env.api_url + '/api/profile',
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' },
      })

      // console.log('response:', response)
      if(response.data && response.data.meta) {
        let avatar, profile = response.data.payload
        this.profile = profile
        this.isSaving = false
        this.message = "Profile successfully saved!"

        // reset local state images
        if(profile.fields['ProfileImage'] && profile.fields['ProfileImage'][0]) {
          avatar = profile.fields['ProfileImage'][0]['url']
          // clear the avatar field
          this.input_avatarlink = {
            "initial": "",
            "name":"ImageURL",
            "label":"Image URL",
            "placeholder":"",
            "type":"FLOAT",
          }
        }
        this.files = undefined
        this.avatar = avatar // temporary placeholder for avatar preview for upload
        this.avatar_link = false // external url link
        this.avatar_clear = false // if user clicks 'clear' this is set to true

      } else {
        this.isSaving = false
        this.message = "Profile could not be saved."
      }
    },


    setAvatar(data) {
      console.log(' >>>>> SET AVATAR ', data)
      if(data == '') {
        this.avatar = undefined 
        this.profile.fields['ProfileImage'] = undefined
        this.hasChanged = true
      } else {
        this.avatar = data
        this.avatar_link = data
        this.profile.fields['ProfileImage'] = [{url: data}]
        this.hasChanged = true
      }
    },

    clearAvatar() {
      this.files = undefined
      this.avatar = undefined
      this.profile.fields['ProfileImage'] = []
      this.avatar_clear = true // in case user wants to delete avatar
      this.$refs.avatar.value = '' 
      this.hasChanged = true
    },

    uploadAvatar(event) {
      const _this = this
      console.log('upload avatar: ', event.target.files)
      this.files = event.target.files
      this.hasChanged = true
      if(this.files && this.files[0]) {
        console.log("File: " , this.files[0])
        const reader = new FileReader()
        reader.onload = (e) => {
          _this.avatar = e.target.result
        }
        reader.readAsDataURL(this.files[0])
      }
    }
  },


}
</script>

<style>
</style>

