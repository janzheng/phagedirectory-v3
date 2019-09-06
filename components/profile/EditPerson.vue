<template>
  <div class="Profile-edit-orgs">
    <Template sidebar-classes="--sticky --top-1" grid-classes="Template--Main-Sidebar _grid-4-1-sm _grid-gap ">

      <template #header>
        <h1 class="">{{ profile.fields['Name'] }}’s Profile</h1>

        <div class="Profile-edit-preview _margin-top-2 _card _padding">
          <h6>Profile Preview</h6>
          <Card :person="profile" class="Profile-edit-preview-card" />
        </div>

        <div class="Profile-editor _divider-top ">
          <h6>Personal Profile</h6>
          
          <div class="Profile-edit-background _card _padding _color-bg-white">
            <p class="_font-bold">Background Information</p>
            <div class="_grid-4">
              <div class="Profile-edit-firstname">
                <FormletInputFloat
                  :input="input_firstName" 
                  @input="(data) => { updateProfile('FirstName', data) }" 
                />
              </div>
              <div class="Profile-edit-middlename">
                <FormletInputFloat
                  :input="input_middleName" 
                  @input="(data) => { updateProfile('MiddleName', data) }" 
                />
              </div>
              <div class="Profile-edit-familyname">
                <FormletInputFloat
                  :input="input_familyName" 
                  @input="(data) => { updateProfile('FamilyName', data) }" 
                />
              </div>
              <div class="Profile-edit-title">
                <FormletInputFloat
                  :input="input_title" 
                  @input="(data) => { updateProfile('Title', data) }" 
                />
              </div>
            </div>

            <div class="Profile-edit-expertise _margin-top-2">
              <FormletInput
                :input="input_expertise" 
                type="text"
                @input="(data) => { updateProfile('Expertise', data) }" 
              />
            </div>

            <div class="Profile-edit-description _margin-top-2">
              <FormletTextArea
                :input="input_description" 
                @input="(data) => { updateProfile('Description', data) }" 
              />
            </div>

            <div class="Profile-edit-avatar _margin-top-2">
              <div class="Profile-avatar-control _card _padding _form-control">
                <h6>Profile Image</h6>
                <label for="Profile-avatar" class="_button --outline">
                  <span v-if="!avatar">Upload Profile</span>
                  <span v-else>Change Profile</span>
                </label> <button v-if="avatar" @click="clearAvatar">Clear Profile</button>
                <input id="Profile-avatar" ref="avatar" type="file" class="Profile-avatar" style="display:none" @change="uploadAvatar"> 
                <div v-if="avatar_link || avatar">
                  <img style="max-width: 400px" :src="avatar_link || avatar" >
                </div>

                <FormletInput
                  :key="input_avatarlink"
                  :input="input_avatarlink" 
                  type="text"
                  @input="(data) => { avatar_link = data }" 
                />
                <div class="_font-small">Note: your image might be cropped — please save to preview your final profile</div>
                <!-- todo: add support for profile url and svgs -->
              </div>
            </div>

          </div>
        </div>
        <div class="Profile-edit-ctabar _margin-top">
          <div class="_grid-1-3 _align-vertically">
            <div>
              <button v-if="!isSaving" class="_button _width-full _margin-bottom-none-i" @click="saveData" >Save Profile</button>
              <button v-if="isSaving" class="_button _width-full _margin-bottom-none-i --disabled"><span class="_inine-block _margin-right-2 _spinner" /> Saving...</button>
            </div>
            <div v-if="message" class="Profile-edit-message _margin-bottom-none-i">{{ message }}</div>
          </div>
        </div>


        <div class="Profile-edit-work _divider-top ">
          <h6>Work Information</h6>

          <div class="_card _padding _color-bg-white">
            <div class="Profile-edit-orgname _margin-top-2">
              <FormletInput
                :input="input_orgname"
                type="text"
                @input="(data) => { updateProfile('Orgs:Name', data) }" 
              />
              <div class="_font-small">If your organization isn't listed on Phage Directory, <nuxt-link to="/join">please consider adding it!</nuxt-link></div>
            </div>
            <div class="_grid-2">
              <div class="Profile-edit-role _margin-top-2">
                <FormletInputFloat
                  :input="input_roles"
                  @input="(data) => { updateProfile('Roles:Custom', data) }" 
                />
              </div>
              <div class="Profile-edit-jobtitle _margin-top-2">
                <FormletInputFloat
                  :input="input_jobtitle"
                  @input="(data) => { updateProfile('JobTitle', data) }" 
                />
              </div>
            </div>
          </div>
        </div>
        <div class="Profile-edit-ctabar _margin-top">
          <div class="_grid-1-3 _align-vertically">
            <div>
              <button v-if="!isSaving" class="_button _width-full _margin-bottom-none-i" @click="saveData" >Save Profile</button>
              <button v-if="isSaving" class="_button _width-full _margin-bottom-none-i --disabled"><span class="_inine-block _margin-right-2 _spinner" /> Saving...</button>
            </div>
            <div v-if="message" class="Profile-edit-message _margin-bottom-none-i">{{ message }}</div>
          </div>
        </div>



        <div class="Profile-edit-contact _divider-top ">
          <h6 class="_font-bold">Contact Information</h6>

          <div class="_card _padding _color-bg-white">
            <div class="Profile-edit-social _grid-3">
              <div class="Profile-edit-website">
                <FormletInputFloat
                  :input="input_website" 
                  @input="(data) => { updateProfile('URL', data) }" 
                />
              </div>
              <div class="Profile-edit-email">
                <FormletInputFloat
                  :input="input_email" 
                  @input="(data) => { updateProfile('Email', data) }" 
                />
              </div>
              <div class="Profile-edit-twitter">
                <FormletInputFloat
                  :input="input_twitter" 
                  @input="(data) => { updateProfile('Social:Twitter', data) }" 
                />
              </div>
              <div class="Profile-edit-linkedin">
                <FormletInputFloat
                  :input="input_linkedin" 
                  @input="(data) => { updateProfile('Social:Linkedin', data) }" 
                />
              </div>
              <div class="Profile-edit-googlescholar">
                <FormletInputFloat
                  :input="input_googlescholar" 
                  @input="(data) => { updateProfile('Social:GoogleScholar', data) }" 
                />
              </div>
              <div class="Profile-edit-orcid">
                <FormletInputFloat
                  :input="input_orcid" 
                  @input="(data) => { updateProfile('Social:ORCID', data) }" 
                />
              </div>
              <div class="Profile-edit-github">
                <FormletInputFloat
                  :input="input_github" 
                  @input="(data) => { updateProfile('Social:Github', data) }" 
                />
              </div>
              <div class="Profile-edit-researchgate">
                <FormletInputFloat
                  :input="input_researchgate" 
                  @input="(data) => { updateProfile('Social:ResearchGate', data) }" 
                />
              </div>
              <div class="Profile-edit-researcherid">
                <FormletInputFloat
                  :input="input_researcherid" 
                  @input="(data) => { updateProfile('Social:ResearcherID', data) }" 
                />
              </div>
            </div>
            <div class="Profile-edit-other">
              <FormletInputFloat
                :input="input_socialother" 
                @input="(data) => { updateProfile('Social:Other', data) }" 
              />
            </div>
          </div>
        </div>
        <div class="Profile-edit-ctabar _margin-top">
          <div class="_grid-1-3 _align-vertically">
            <div>
              <button v-if="!isSaving" class="_button _width-full _margin-bottom-none-i" @click="saveData" >Save Profile</button>
              <button v-if="isSaving" class="_button _width-full _margin-bottom-none-i --disabled"><span class="_inine-block _margin-right-2 _spinner" /> Saving...</button>
            </div>
            <div v-if="message" class="Profile-edit-message _margin-bottom-none-i">{{ message }}</div>
          </div>
        </div>


        <div v-if="profile && isStaging" class="_divider-top" style="word-break: break-all;">
          {{ profile }}
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

import Card from '~/components/dir/PeopleCard.vue'

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
    slug: String, // used to get the mgr account
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
    if(profile.fields['Profile'] && profile.fields['Profile'][0]) {
      avatar = profile.fields['Profile'][0]['url']
    }

    return {
      tableType: this.profileProp.meta['table'],
      profile: profile, // user's profile
      files: [],
      avatar: avatar, // temporary placeholder for avatar preview for upload
      avatar_link: false, // external url link
      avatar_clear: false, // if user clicks 'clear' this is set to true
      isSaving: false,
      message: "",
      isStaging: process.env.pd_env,

      input_title: {
        "initial": profile.fields['Title'],
        "name":"Title",
        "label":"Title",
        "placeholder":"",
        "type":"FLOAT",
      },
      input_firstName: {
        "initial": profile.fields['FirstName'],
        "name":"FirstName",
        "label":"First Name",
        "placeholder":"",
        "type":"FLOAT",
      },
      input_middleName: {
        "initial": profile.fields['MiddleName'],
        "name":"MiddleName",
        "label":"Middle Name",
        "placeholder":"",
        "type":"FLOAT",
      },
      input_familyName: {
        "initial": profile.fields['FamilyName'],
        "name":"FamilyName",
        "label":"Last Name",
        "description":"",
        "placeholder":"",
        "type":"FLOAT",
      },
      input_expertise: {
        "initial": profile.fields['Expertise'],
        "name":"Expertise",
        "label":"Expertise",
        "description":"A short line about your expertise",
        "placeholder":"",
        "type":"TEXT",
      },
      input_description: {
        "initial": profile.fields['Description'],
        "name":"Description",
        "label":"Personal Bio",
        "description":"Please provide a short bio",
        "placeholder":"",
        "type":"TEXTAREA",
      },
      input_avatarlink: { // if user wants to upload an image
        "initial": "",
        "name":"ImageURL",
        "label":"Image URL",
        "placeholder":"",
        "type":"FLOAT",
      },


      input_orgname: {
        "initial": profile.fields['Orgs:Name'],
        "name":"Orgs:Name",
        "label":"Organization/Institutions",
        "description":"What organizations or universities do you work with?",
        "placeholder":"",
        "type":"TEXT",
      },
      input_jobtitle: {
        "initial": profile.fields['JobTitle'],
        "name":"JobTitle",
        "label":"Job Title",
        // "description":"What organizations or universities do you work with?",
        "placeholder":"",
        "type":"TEXT",
      },
      input_roles: {
        "initial": profile.fields['Roles:Custom'] || profile.fields['Roles'],
        "name":"Roles",
        "label":"Job Role(s)",
        "description":"",
        "placeholder":"",
        "type":"INPUT",
        "options": [
          {"value": "Associate Professor"},
          {"value": "Clinical Coordinator"},
          {"value": "Co-founder"},
          {"value": "Director of Sales & Marketing"},
          {"value": "Doctoral Researcher"},
          {"value": "Founder"},
          {"value": "Government Scientist"},
          {"value": "Graduate Student"},
          {"value": "Group Leader"},
          {"value": "Lab Manager"},
          {"value": "Lecturer"},
          {"value": "MSc Student"},
          {"value": "PhD Research Scholar"},
          {"value": "Postdoc"},
          {"value": "Postdoctoral Fellow"},
          {"value": "Postdoctoral Researcher"},
          {"value": "President"},
          {"value": "Principal Investigator"},
          {"value": "Product Designer"},
          {"value": "Professor"},
          {"value": "Project Director"},
          {"value": "Project Manager"},
          {"value": "Research Fellow"},
          {"value": "Research Governance Manager"},
          {"value": "Research Manager"},
          {"value": "Research Technician"},
          {"value": "Researcher"},
          {"value": "Scientist"},
          {"value": "Undergraduate Student"},
        ]
      },


      input_website: {
        "initial": profile.fields['URL'],
        "name":"URL",
        "label":"Website URL",
        "description":"",
        "placeholder":"",
        "type":"FLOAT",
      },
      input_email: {
        "initial": profile.fields['Email'],
        "name":"Email",
        "label":"Public Email Address",
        "placeholder":"",
        "type":"FLOAT",
      },
      input_twitter: {
        "initial": profile.fields['Social:Twitter'],
        "name":"Social:Twitter",
        "label":"Twitter",
        "placeholder":"",
        "type":"FLOAT",
      },
      input_linkedin: {
        "initial": profile.fields['Social:Linkedin'],
        "name":"Social:Linkedin",
        "label":"LinkedIn URL",
        "placeholder":"",
        "type":"FLOAT",
      },
      input_googlescholar: {
        "initial": profile.fields['Social:GoogleScholar'],
        "name":"Social:GoogleScholar",
        "label":"GoogleScholar URL",
        "placeholder":"",
        "type":"FLOAT",
      },

      input_github: {
        "initial": profile.fields['Social:Github'],
        "name":"Social:Github",
        "label":"Github URL",
        "placeholder":"",
        "type":"FLOAT",
      },

      input_researchgate: {
        "initial": profile.fields['Social:ResearchGate'],
        "name":"Social:ResearchGate",
        "label":"ResearchGate URL",
        "placeholder":"",
        "type":"FLOAT",
      },

      input_researcherid: {
        "initial": profile.fields['Social:ResearcherID'],
        "name":"Social:ResearcherID",
        "label":"ResearcherID URL",
        "placeholder":"",
        "type":"FLOAT",
      },

      input_socialother: {
        "initial": profile.fields['Social:Other'],
        "name":"Social:Other",
        "label":"Other Social URLs",
        "placeholder":"",
        "type":"FLOAT",
      },

      input_orcid: {
        "initial": profile.fields['Social:ORCID'],
        "name":"Social:ORCID",
        "label":"ORCID Number",
        "placeholder":"",
        "type":"FLOAT",
      },
      input_protocolsio: {
        "initial": profile.fields['Social:ProtocolsIO'],
        "name":"Social:ProtocolsIO",
        "label":"ProtocolsIO Profile URL",
        "placeholder":"",
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
    updateProfile(field, data) {
      // since profile is an obj we need to manually trigger update
      this.profile.fields[field] = data
      this.profile.__ob__.dep.notify()

      this.updateName()
    },
    updateName() {
      // required since Card preview uses name, but name is computed on Airtable
      // so we need to compute it here
      this.profile.fields['Name'] = `${ this.profile.fields['FirstName'] } ${ this.profile.fields['MiddleName'] } ${ this.profile.fields['FamilyName'] }`
    },

    async saveData() {

      // https://stackoverflow.com/questions/50774176/sending-file-and-json-in-post-multipart-form-data-request-with-axios/50774380
      let formData = new FormData()
      this.isSaving = true
      this.message = "Saving your profile..."

      let profiledata = {
        slug: this.slug, // "test-example",
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
        if(profile.fields['Profile'] && profile.fields['Profile'][0]) {
          avatar = profile.fields['Profile'][0]['url']
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

    clearAvatar() {
      this.files = undefined
      this.avatar = undefined
      this.avatar_clear = true // in case user wants to delete avatar
      this.$refs.avatar.value = '' 
    },
    
    uploadAvatar(event) {
      const _this = this
      console.log('upload avatar: ', event.target.files)
      this.files = event.target.files
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

