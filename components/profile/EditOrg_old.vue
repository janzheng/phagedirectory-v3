<template>
  <div class="Profile-edit-orgs">
    <Template sidebar-classes="--sticky --top-1" grid-classes="Template--Main-Sidebar _grid-4-1-sm _grid-gap ">

      <template #header>
        <div class="_card _padding">
          <div v-if="message" class="Profile-edit-message _card _padding">{{ message }}</div>

          <h6>Organization Profile</h6>
          <h1 class="--title">{{ profile.fields['Name'] }}</h1>
          <div class="Profile-edit-name">
            <FormletInputFloat
              :input="input_orgName" 
              @input="(data) => { updateProfile('Name', data) }" 
            />
          </div>
          <div class="Profile-edit-altname">
            <FormletInputFloat
              :input="input_orgShortName" 
              @input="(data) => { updateProfile('AltName', data) }" 
            />
          </div>
          <div class="Profile-edit-orgtype">
            <FormletInputFloat
              :input="input_orgType" 
              @input="(data) => { updateProfile('Org:Types', data) }" 
            />
          </div>

          <div class="Profile-edit-description _margin-top-2">
            <FormletTextArea 
              :input="input_orgDescription"
              @input="(data) => { updateProfile('Description', data) }" 
            />
          </div>

          <div class="Profile-edit-location _margin-top-2">
            <p class="_font-bold">Organization Location</p>
            <div class="_grid-3">
              <div class="Profile-edit-city">
                <FormletInputFloat
                  :input="input_orgCity" 
                  @input="(data) => { updateProfile('City', data) }" 
                />
              </div>
              <div class="Profile-edit-state">
                <FormletInputFloat
                  :input="input_orgState" 
                  @input="(data) => { updateProfile('State', data) }" 
                />
              </div>
              <div class="Profile-edit-country">
                <FormletInputFloat
                  :input="input_orgCountry" 
                  @input="(data) => { updateProfile('Country', data) }" 
                />
              </div>
            </div>
          </div>





          <div class="Profile-edit-avatar _margin-top-2">
            <div class="Profile-avatar-control _card _padding _form-control">
              <h6>Organization Logo</h6>
              <label for="Profile-avatar" class="_button --outline">
                <span v-if="!avatar">Upload Logo</span>
                <span v-else>Change Logo Image</span>
              </label> <button v-if="avatar" @click="clearAvatar">Clear Logo</button>
              <input id="Profile-avatar" ref="avatar" type="file" class="Profile-avatar" style="display:none" @change="uploadAvatar"> 
              <div v-if="avatar">
                <img :src="avatar" >
              </div>
              <div class="_font-small">Note: your image might be cropped — please save to preview your final profile</div>
              <!-- todo: add support for profile url and svgs -->
            </div>
          </div>





          <div class="Profile-edit-group-contact _margin-top-2">
            <div class="Profile-edit-contact">
              <FormletInputFloat
                :input="input_orgContact" 
                @input="(data) => { updateProfile('ContactPerson', data) }" 
              />
            </div>
            <div class="Profile-edit-email">
              <FormletInputFloat
                :input="input_orgEmail" 
                @input="(data) => { updateProfile('Email', data) }" 
              />
            </div>
            <div class="Profile-edit-website">
              <FormletInputFloat
                :input="input_orgWebsite" 
                @input="(data) => { updateProfile('URL', data) }" 
              />
            </div>
            <div class="Profile-edit-twitter">
              <FormletInputFloat
                :input="input_orgTwitter" 
                @input="(data) => { updateProfile('Social:Twitter', data) }" 
              />
            </div>
            <div class="Profile-edit-linkedin">
              <FormletInputFloat
                :input="input_orgLinkedin" 
                @input="(data) => { updateProfile('Social:Linkedin', data) }" 
              />
            </div>
          </div>


          <div class="_margin-top-2">

            <button v-if="!isSaving" class="_button --width_full" @click="saveData" >Save Organization Profile</button>
            <button v-if="isSaving" class="_button --width_full --disabled"><span class="_inine-block _margin-right-2 _spinner" /> Saving...</button>

            <div v-if="message" class="Profile-edit-message _card _padding">{{ message }}</div>
          </div>

        </div>

        <!-- <div v-if="profile && isStaging" style="word-break: break-all;">
          {{ profile }}
        </div> -->

      </template>

      <!-- <template #context>
        <button v-if="!isSaving" @click="saveData" class="_button --width_full">Save Profile</button>
        <button v-if="isSaving" class="_button --width_full --disabled"><span class="_inine-block _margin-right-2 _spinner" /> Saving...</button>
      </template> -->

    </Template>
  </div>
</template>


<script>

// import { mapState } from 'vuex'
// import Cytosis from '~/components/experiments/Cytosis.vue'
// import NodeForm from '~/components/render/NodeForm.vue'
// import Template from '~/templates/article.vue'
// import { headMatter } from '~/other/headmatter.js'
// import { loadQuery } from '~/other/loaders'
import Template from '~/templates/context.vue'
import axios from 'axios'

// import FormletInput from '~/components/layout/Formlet-input'
import FormletInputFloat from '~/components/layout/Formlet-input-float'
import FormletTextArea from '~/components/layout/Formlet-textarea'


export default {

  components: {
    // Cytosis,
    // NodeForm,
    Template,

    // FormletInput,
    FormletInputFloat,
    FormletTextArea
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
      isSaving: false,
      message: "",
      isStaging: process.env.pd_env,

      input_orgName: {
        "initial": profile.fields['Name'],
        "name":"Name",
        "label":"Organization Name",
        "description":"",
        "placeholder":"",
        "type":"FLOAT",
      },

      input_orgShortName: {
        "initial": profile.fields['AltName'],
        "name":"AltName",
        "label":"Alternate Organization Name",
        "description":"Shorter names, e.g. 'ATCC'",
        "placeholder":"",
        "type":"FLOAT",
      },

      input_orgType: {
        "initial": profile.fields['Org:Types'],
        "name":"Org:Types",
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

      input_orgDescription: {
        "initial": profile.fields['Description'],
        "name":"Description",
        "label":"Mission/activities",
        "description":"What is your organization's mission, or what does your organization do?",
        "placeholder":"",
        "type":"TEXTAREA",
      },


      input_orgContact: {
        "initial": profile.fields['ContactPerson'],
        "name":"ContactPerson",
        "label":"Contact Person",
        "placeholder":"",
        "type":"FLOAT",
      },
      input_orgEmail: {
        "initial": profile.fields['Email'],
        "name":"Name",
        "label":"Public Email Address",
        "placeholder":"",
        "type":"FLOAT",
      },
      input_orgWebsite: {
        "initial": profile.fields['URL'],
        "name":"URL",
        "label":"Org Website Link",
        "description":"",
        "placeholder":"",
        "type":"FLOAT",
      },
      input_orgTwitter: {
        "initial": profile.fields['Social:Twitter'],
        "name":"Social:Twitter",
        "label":"Twitter",
        "placeholder":"",
        "type":"FLOAT",
      },
      input_orgLinkedin: {
        "initial": profile.fields['Social:Linkedin'],
        "name":"Social:Linkedin",
        "label":"LinkedIn URL",
        "placeholder":"",
        "type":"FLOAT",
      },

      input_orgCity: {
        "initial": profile.fields['City'],
        "name":"City",
        "label":"City",
        "placeholder":"",
        "type":"FLOAT",
      },
      input_orgState: {
        "initial": profile.fields['State'],
        "name":"State",
        "label":"US State",
        "placeholder":"",
        "type":"FLOAT",
      },
      input_orgCountry: {
        "initial": profile.fields['Country'],
        "name":"Country",
        "label":"Country",
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
    },


    // async getData({slug, passcode}) {
    //   let _slug = slug || this.slug
    //   let _passcode = passcode || this.passcode

    //   if(_slug && _passcode) {
    //     this.statusMessage = "Hold on to your shoes, I'm loading!!"
    //     this.isLoading = true

    //     let profiledata = {
    //       slug: _slug, // "test-example",
    //       passcode: _passcode, //  "THEIR-FEED-NOSE-into",
    //       type: "GET"
    //     }
    //     let response = await axios.post(process.env.api_url + '/api/profile', profiledata)
    //     if(response.data && response.data.meta) {
    //       this.profile = response.data
    //       this.table = response.data.meta.table
    //       this.isLoading = false
    //     } else {
    //       this.isLoading = false
    //       this.statusMessage = "Profile could not be loaded."
    //     }
    //   }
    // },

    async saveData() {

      // https://stackoverflow.com/questions/50774176/sending-file-and-json-in-post-multipart-form-data-request-with-axios/50774380
      let formData = new FormData()
      this.isSaving = true
      this.message = "Saving your profile..."

      let profiledata = {
        slug: this.profileslug, // "test-example",
        passcode: this.passcode, //  "THEIR-FEED-NOSE-into",
        type: "UPDATE",
        table: this.tableType,
        avatar: "keep", // "test-example",
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

      console.log('response:', response)
      if(response.data && response.data.meta) {
        this.profile = response.data.payload
        this.isSaving = false
        this.message = "Profile successfully saved!"
      } else {
        this.isSaving = false
        this.message = "Profile could not be saved."
      }
    },

    clearAvatar() {
      this.files = undefined
      this.avatar = undefined
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


<!-- 
{
  "inputs": [
    {
      "name": "TextareaContent",
      "label": "Feedback",
      "placeholder": "Text Area!",
      "required": "true",
      "type": "TEXTAREA"
    },
    {
       "name":"Floaty Name",
       "label":"Floaty Name",
       "description":"",
       "placeholder":"",
       "type":"FLOAT"
    },
    {
      "type": "MARKDOWN",
      "markdown": "# This is some markdown comment! \n \n --- \n \n hello there"
    },
    {
      "name": "EmailContent",
      "label": "Optional Email",
      "required": "true",
      "placeholder": "address@gmail.com",
      "type": "EMAIL"
    },
    {
      "name": "ActionEmailContent",
      "label": "Action Email",
      "action":"Send Now!!",
      "required": "true",
      "placeholder": "address@gmail.com",
      "type": "EMAIL"
    },
    {
      "name": "InlineCTA",
      "label": "Inline CTA",
      "required": "true",
      "action":"Press Me!",
      "placeholder": "Something not sane",
      "error": "Please enter something more sane!",
      "type": "CTA"
    },
    {
      "name": "RadioContent",
      "label": "Shirt Size",
      "type": "RADIO",
      "required": "true",
      "error": "Please choose a shirt!",
      "options": [
        {
          "value": "ExtraSmall",
          "label": "Extra Small Shirt"
        },
        {
          "value": "Small",
          "label": "Small Shirt"
        },
        {
          "value": "Medium",
          "label": "Medium Shirt"
        },
        {
          "value": "Large",
          "label": "Large Shirt"
        },
        {
          "value": "ExtraLarge",
          "label": "Extra Large Shirt"
        },
        {
          "value": "ExtraExtraLarge",
          "label": "Extra-extra Large Shirt"
        }
      ]
    },
    {
      "name": "CheckboxContent",
      "label": "Check Options",
      "type": "CHECKBOX",
      "required": "true",
      "error": "Please choose an option!",
      "options": [
        {
          "value": "Gin",
          "label": "Gin!"
        },
        {
          "value": "Tequila",
          "label": "Tequila!!"
        },
        {
          "value": "Tacos",
          "label": "Tacos!!!!!!!"
        }
      ]
    },
    {
      "name": "DatalistContent",
      "label": "Dinosaurs",
      "type": "DATALIST",
      "required": "true",
      "error": "Please choose a dino!",
      "options": [
        {
          "value": "Pterodactyl",
          "label": "Pterodactyl"
        },
        {
          "value": "TyrannosaurusRex",
          "label": "Tyrannosaurus Rex"
        },
        {
          "value": "Triceratops",
          "label": "Triceratops"
        },
        {
          "value": "Brontosaurus",
          "label": "Brontosaurus"
        }
      ]
    }
  ]
}
   "type":"simple",
   "privacy":"We keep your information private, and we will not spam you. Please review our [site policies](/policies).{._font-small}",
   "thanks":"#### Thank you for signing up!{.--title}",
   "error":"We found a mistake, please scroll back up and take a look.",
  "inputs": [
    {
      "name": "TextareaContent",
      "label": "Feedback",
      "placeholder": "Text Area!",
      "required": "true",
      "type": "TEXTAREA"
    },
    {
       "name":"Floaty Name",
       "label":"Floaty Name",
       "description":"",
       "placeholder":"",
       "type":"FLOAT"
    },
    {
      "type": "MARKDOWN",
      "markdown": "# This is some markdown comment! \n \n --- \n \n hello there"
    },
    {
      "name": "EmailContent",
      "label": "Optional Email",
      "required": "true",
      "placeholder": "address@gmail.com",
      "type": "EMAIL"
    },
    {
      "name": "ActionEmailContent",
      "label": "Action Email",
      "action":"Send Now!!",
      "required": "true",
      "placeholder": "address@gmail.com",
      "type": "EMAIL"
    },
    {
      "name": "InlineCTA",
      "label": "Inline CTA",
      "required": "true",
      "action":"Press Me!",
      "placeholder": "Something not sane",
      "error": "Please enter something more sane!",
      "type": "CTA"
    },
    {
      "name": "RadioContent",
      "label": "Shirt Size",
      "type": "RADIO",
      "required": "true",
      "error": "Please choose a shirt!",
      "options": [
        {
          "value": "ExtraSmall",
          "label": "Extra Small Shirt"
        },
        {
          "value": "Small",
          "label": "Small Shirt"
        },
        {
          "value": "Medium",
          "label": "Medium Shirt"
        },
        {
          "value": "Large",
          "label": "Large Shirt"
        },
        {
          "value": "ExtraLarge",
          "label": "Extra Large Shirt"
        },
        {
          "value": "ExtraExtraLarge",
          "label": "Extra-extra Large Shirt"
        }
      ]
    },
    {
      "name": "CheckboxContent",
      "label": "Check Options",
      "type": "CHECKBOX",
      "required": "true",
      "error": "Please choose an option!",
      "options": [
        {
          "value": "Gin",
          "label": "Gin!"
        },
        {
          "value": "Tequila",
          "label": "Tequila!!"
        },
        {
          "value": "Tacos",
          "label": "Tacos!!!!!!!"
        }
      ]
    },
    {
      "name": "DatalistContent",
      "label": "Dinosaurs",
      "type": "DATALIST",
      "required": "true",
      "error": "Please choose a dino!",
      "options": [
        {
          "value": "Pterodactyl",
          "label": "Pterodactyl"
        },
        {
          "value": "TyrannosaurusRex",
          "label": "Tyrannosaurus Rex"
        },
        {
          "value": "Triceratops",
          "label": "Triceratops"
        },
        {
          "value": "Brontosaurus",
          "label": "Brontosaurus"
        }
      ]
    }
  ]
}





 -->