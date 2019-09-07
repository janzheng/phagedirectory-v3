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
                  input-attrs="--open"
                  :submit-handler="saveData"
                  @input="(data) => { updateProfile('FirstName', data) }" 
                />
              </div>
              <div class="Profile-edit-middlename">
                <FormletInputFloat
                  :input="input_middleName" 
                  input-attrs="--open"
                  :submit-handler="saveData"
                  @input="(data) => { updateProfile('MiddleName', data) }" 
                />
              </div>
              <div class="Profile-edit-familyname">
                <FormletInputFloat
                  :input="input_familyName"
                  input-attrs="--open"
                  :submit-handler="saveData"
                  @input="(data) => { updateProfile('FamilyName', data) }" 
                />
              </div>
              <div class="Profile-edit-title">
                <FormletInputFloat
                  :input="input_title" 
                  input-attrs="--open"
                  :submit-handler="saveData"
                  @input="(data) => { updateProfile('Title', data) }" 
                />
              </div>
            </div>

            <div class="Profile-edit-short _grid-3-2 _margin-top-2">
              <FormletInput
                :input="input_short" 
                type="text"
                :submit-handler="saveData"
                @input="(data) => { updateProfile('Short', data) }" 
              />
              <div class="Profile-edit-role ">
                <FormletInput
                  :input="input_roles"
                  type="text"
                  :submit-handler="saveData"
                  @input="(data) => { updateProfile('Roles:Custom', data) }" 
                />
              </div>
            </div>

            <div class="Profile-edit-description _margin-top-2">
              <FormletTextArea
                :input="input_description" 
                :submit-handler="saveData"
                @input="(data) => { updateProfile('Description', data) }" 
              />
            </div>

            <div class="Profile-edit-avatar-section _margin-top-2">
              <div class="_font-bold _margin-bottom-half">Profile Image</div>

              <div class="Profile-avatar-container _card _padding _form-control">
                <div class="Profile-avatar-grid _flex-row-sm">
                  <div class="Profile-avatar-preview">
                    <div v-if="avatar" class="_padding-right">
                      <img style="max-width: 400px" :src="avatar" >
                    </div>
                  </div>
                  <div class="Profile-avatar-control _flex-1">
                    <label for="Profile-avatar" class="_button --outline">
                      <span v-if="!avatar">Upload Profile Image</span>
                      <span v-else>Change Profile Image</span>
                    </label> <button v-if="avatar" @click="clearAvatar">Clear Profile</button>
                    <FormletInputFloat
                      :key="input_avatarlink.initial"
                      :input="input_avatarlink" 
                      inputAttrs="--open"
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


        <div class="Profile-edit-work _divider-top ">
          <h6>Lab or Organization Information</h6>

          <div class="_card _padding _color-bg-white">

            <div class="_font-small _margin-top _margin-bottom-2">Note: We’re still working on this part of the website! Below are the organizations connected to your profile. If you need to link or unlink a lab or organization, or if you need to update your organization information, please email us at <a href="mailto:support@phage.directory">support@phage.directory</a>. If your organization isn't listed on Phage Directory <nuxt-link to="/join">please consider adding it!</nuxt-link></div>

            <div class="Profile-edit-labs">
              <div class="Profile-edit-labs-linked _margin-bottom">
                <div class="">
                  <span class="_font-bold">Connected Labs: </span><span v-if="profile.fields['Orgs:Labs::Name']" >{{ profile.fields['Orgs:Labs::Name'].join(', ') }}</span> <span v-else>(No labs currently connected to your profile)</span>
                  <!-- <div class="_font-bold">Labs</div>
                  <div class="_card _padding _margin-top _margin-bottom">
                    <span v-if="profile.fields['Orgs:Labs::Name']" >{{ profile.fields['Orgs:Labs::Name'].join(', ') }}</span> <span v-else>(No labs listed)</span>
                  </div>  -->
                  <!-- <span v-for="item of profile.fields['Orgs::Names']" class="" >
                    {{ item }}
                  </span> -->
                </div>
              </div>
            </div>

            <div class="Profile-edit-orgs">
              <div class="Profile-edit-orgs-linked _margin-bottom">
                <div class="">
                  <span class="_font-bold">Connected Organizations: </span><span v-if="profile.fields['Orgs::Names']" >{{ profile.fields['Orgs::Names'].join(', ') }}</span> <span v-else>(No organizations currently connected to your profile)</span>
                  <!-- <div class="_card _padding _margin-top _margin-bottom">
                    <span v-if="profile.fields['Orgs::Names']" >{{ profile.fields['Orgs::Names'].join(', ') }}</span> <span v-else>(No organizations listed)</span>
                  </div>  -->
                  <!-- <span v-for="item of profile.fields['Orgs::Names']" class="" >
                    {{ item }}
                  </span> -->
                </div>
                <!-- <div class="_margin-top-2">
                  <FormletInput
                    :input="input_otherorgname"
                    type="text"
                    @input="(data) => { updateProfile('Orgs:Other', data) }" 
                  />
                </div> -->
              </div>

              <div class="Profile-edit-titlesroles _grid-3-2 _margin-top">
                <div class="Profile-edit-short ">
                  <FormletInput
                    :input="input_short"
                    type="text"
                    :submit-handler="saveData"
                    @input="(data) => { updateProfile('Short', data) }" 
                  />
                </div>
                <div class="Profile-edit-role ">
                  <FormletInput
                    :input="input_roles"
                    type="text"
                    :submit-handler="saveData"
                    @input="(data) => { updateProfile('Roles:Custom', data) }" 
                  />
                </div>
                <!-- <div class="Profile-edit-jobtitle _margin-top">
                  <FormletInputFloat
                    :input="input_jobtitle"
                    input-attrs="--open"
                    @input="(data) => { updateProfile('JobTitle', data) }" 
                  />
                </div> -->
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


        <div class="Profile-edit-contact _divider-top ">
          <h6 class="_font-bold">Contact Information</h6>

          <div class="_card _padding _color-bg-white">
            <div class="Profile-edit-social _grid-3">
              <div class="Profile-edit-website">
                <FormletInputFloat
                  :input="input_website" 
                  input-attrs="--open"
                  :submit-handler="saveData"
                  @input="(data) => { updateProfile('URL', data) }" 
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
              <div class="Profile-edit-googlescholar">
                <FormletInputFloat
                  :input="input_googlescholar" 
                  input-attrs="--open"
                  :submit-handler="saveData"
                  @input="(data) => { updateProfile('Social:GoogleScholar', data) }" 
                />
              </div>
              <div class="Profile-edit-orcid">
                <FormletInputFloat
                  :input="input_orcid" 
                  input-attrs="--open"
                  :submit-handler="saveData"
                  @input="(data) => { updateProfile('Social:ORCID', data) }" 
                />
              </div>
              <div class="Profile-edit-github">
                <FormletInputFloat
                  :input="input_github" 
                  input-attrs="--open"
                  :submit-handler="saveData"
                  @input="(data) => { updateProfile('Social:Github', data) }" 
                />
              </div>
              <div class="Profile-edit-researchgate">
                <FormletInputFloat
                  :input="input_researchgate" 
                  input-attrs="--open"
                  :submit-handler="saveData"
                  @input="(data) => { updateProfile('Social:ResearchGate', data) }" 
                />
              </div>
              <div class="Profile-edit-publons">
                <FormletInputFloat
                  :input="input_publons" 
                  input-attrs="--open"
                  :submit-handler="saveData"
                  @input="(data) => { updateProfile('Social:Publons', data) }" 
                />
              </div>
            </div>
            <div class="Profile-edit-other">
              <FormletInputFloat
                :input="input_socialother" 
                :submit-handler="saveData"
                @input="(data) => { updateProfile('Social:Other', data) }" 
              />
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


        <!-- <div v-if="profile && isStaging" class="_divider-top" style="word-break: break-all;">
          {{ profile }}
        </div>
 -->
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
      hasChanged: false,
      message: "",
      isStaging: process.env.pd_env,

      input_title: {
        "initial": profile.fields['Title'],
        "name":"Title",
        "label":"Title",
        "placeholder":"PhD",
        "type":"FLOAT",
      },
      input_firstName: {
        "initial": profile.fields['FirstName'],
        "name":"FirstName",
        "label":"First Name",
        "placeholder":"John",
        "type":"FLOAT",
      },
      input_middleName: {
        "initial": profile.fields['MiddleName'],
        "name":"MiddleName",
        "label":"Middle Name",
        "placeholder":"D.",
        "type":"FLOAT",
      },
      input_familyName: {
        "initial": profile.fields['FamilyName'],
        "name":"FamilyName",
        "label":"Last Name",
        "description":"",
        "placeholder":"Smith",
        "type":"FLOAT",
      },
      input_short: {
        "initial": profile.fields['Short'],
        "name":"Short",
        // "label":"Headline",
        "description":"__Headline__",
        "placeholder":"I'm an Assistant Professor at ABC University",
        "type":"TEXT",
      },
      input_description: {
        "initial": profile.fields['Description'],
        "rows": 6,
        "name":"Description",
        // "label":"Personal Bio",
        "description":"__Personal Bio__",
        "placeholder":"I work on phage research at ABC University",
        "type":"TEXTAREA",
      },
      input_avatarlink: { // if user wants to upload an image
        "initial": "",
        "name":"ImageURL",
        "label":"Upload Image from URL",
        "placeholder":"https://phage.directory/icon.png",
        "type":"FLOAT",
      },
      // input_otherorgname: {
      //   "initial": profile.fields['Orgs:Other'],
      //   "name":"Orgs:Other",
      //   "label":"",
      //   "description":"What other labs, organizations or universities are you affiliated with?",
      //   "placeholder":"",
      //   "type":"TEXT",
      // },
      // input_jobtitle: {
      //   "initial": profile.fields['JobTitle'],
      //   "name":"JobTitle",
      //   "label":"Job Title(s)",
      //   // "description":"What organizations or universities do you work with?",
      //   "placeholder":"",
      //   "type":"TEXT",
      // },
      input_roles: {
        "initial": profile.fields['Roles:Custom'] || profile.fields['Roles'],
        "name":"Roles",
        "label":"",
        "description":"__Role__",
        "placeholder":"Assistant Professor",
        "type":"INPUT",
        "options": [
          {"value": "Assistant Professor"},
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
        "placeholder":"http://abc.edu/johnsmith",
        "type":"FLOAT",
      },
      input_email: {
        "initial": profile.fields['Email'],
        "name":"Email",
        "label":"Public Email Address",
        "placeholder":"johnsmith@abc.edu",
        "type":"FLOAT",
      },
      input_twitter: {
        "initial": profile.fields['Social:Twitter'],
        "name":"Social:Twitter",
        "label":"Twitter",
        "placeholder":"@johnsmithphage",
        "type":"FLOAT",
      },
      input_linkedin: {
        "initial": profile.fields['Social:Linkedin'],
        "name":"Social:Linkedin",
        "label":"LinkedIn URL",
        "placeholder":"https://linkedin.com/in/john-smith",
        "type":"FLOAT",
      },
      input_googlescholar: {
        "initial": profile.fields['Social:GoogleScholar'],
        "name":"Social:GoogleScholar",
        "label":"GoogleScholar URL",
        "placeholder":"https://scholar.google.ca/citations?user=r3PIVU8AAAAJ&hl=en&oi=sra",
        "type":"FLOAT",
      },

      input_github: {
        "initial": profile.fields['Social:Github'],
        "name":"Social:Github",
        "label":"Github URL",
        "placeholder":"https://github.com/janzheng/",
        "type":"FLOAT",
      },

      input_researchgate: {
        "initial": profile.fields['Social:ResearchGate'],
        "name":"Social:ResearchGate",
        "label":"ResearchGate URL",
        "placeholder":"https://www.researchgate.net/profile/John_Smith4",
        "type":"FLOAT",
      },

      input_publons: {
        "initial": profile.fields['Social:Publons'],
        "name":"Social:Publons",
        "label":"Publons URL",
        "placeholder":"https://publons.com/researcher/1669531/jessica-sacher/",
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
        "placeholder":"https://orcid.org/0000-0002-5306-1902",
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
      this.hasChanged = true

      this.updateName()
    },
    updateName() {
      // required since Card preview uses name, but name is computed on Airtable
      // so we need to compute it here
      let firstName = this.profile.fields['FirstName'] || ''
      let middleName = this.profile.fields['MiddleName'] || ''
      let familyName = this.profile.fields['FamilyName'] || ''

      this.profile.fields['Name'] = `${ firstName } ${ middleName } ${ familyName }`
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


    setAvatar(data) {
      console.log(' >>>>> SET AVATAR ', data)
      if(data == '') {
        this.avatar = undefined 
        this.profile.fields['Profile'] = undefined
        this.hasChanged = true
      } else {
        this.avatar = data
        this.profile.fields['Profile'] = [{url: data}]
        this.hasChanged = true
      }
    },

    clearAvatar() {
      this.files = undefined
      this.avatar = undefined
      this.profile.fields['Profile'] = []
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

