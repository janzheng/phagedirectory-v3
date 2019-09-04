<template>
  <div class="Profile-edit-orgs">
    <Template>

      <template>
        <h6>Organization Details</h6>
        <div class="_card _padding">
          <div>
            <FormletInputFloat
              class="input.classes"
              :input="input_orgName" 
              @input="(data) => { this.profile['Name'] = data }" 
            />
          </div>
          <div>
            <FormletInputFloat
              class="input.classes"
              :input="input_orgShortName" 
              @input="(data) => { this.profile['Name'] = data }" 
            />
          </div>
          <div>
            <FormletInputDatalist
              class="input.classes"
              :input="input_orgType" 
              @input="(data) => { this.profile['Name'] = data }" 
            />
          </div>

          <label for="color">What's the name of your favorite color?</label>
          <input type="text" id="color" list="colors_data">
          <datalist id="colors_data">
            <option value="red"></option>
            <option value="orange"></option>
            <option value="green"></option>
            <option value="blue">The color of the sky</option>
          </datalist>




          <div>
            <div class="Profile-avatar-control _form-control">
              <!-- <label class="_form-label">File Upload Button</label> -->
              <label for="Profile-avatar" class="_button --outline">Upload Profile Image</label>
              <input type="file" id="Profile-avatar" class="Profile-avatar" style="display:none" @change="uploadAvatar">
              <img :src="avatar" />
              <button @click="clearAvatar">Clear avatar</button>
              Note: your image might be cropped — please save and preview your profile picture!
            </div>

            <!-- <div v-if="isLoading">Hold on to your shoes, I'm loading!!</div> -->
            <div v-if="profile" class="_card _padding _margin-top">
              <!-- <div v-if="tableType" class="_tag">{{tableType}}</div> -->
              {{ profileProp }}
            </div>
          </div>
        </div>
      </template>

      <template #context>
        <button @click="saveData" class="_button">Save the data!</button>
      </template>

    </Template>
  </div>
</template>


<script>

import { mapState } from 'vuex'
// import Cytosis from '~/components/experiments/Cytosis.vue'
import NodeForm from '~/components/render/NodeForm.vue'
// import Template from '~/templates/article.vue'
import Template from '~/templates/context.vue'
import { headMatter } from '~/other/headmatter.js'
import { loadQuery } from '~/other/loaders'
import axios from 'axios'

import FormletInputFloat from '~/components/layout/Formlet-input-float'
import FormletInputDatalist from '~/components/layout/Formlet-input-datalist'


export default {

  props: {
    profileProp: Object
  },

  components: {
    // Cytosis,
    // NodeForm,
    Template,

    FormletInputFloat,
    FormletInputDatalist,
  },

  layout: 'contentframe',
  middleware: 'pageload',
  meta: {
    tableQueries: ["_content-core"],
    // tableQueries: ["_content-copy","atoms-events"],
  },

  async asyncData({env, store, route, app, error}) {
  },

  data () {

    let profile = this.profileProp.payload
    return {
      tableType: this.profileProp.meta['table'],
      profile: profile, // user's profile
      files: [],
      avatar: null, // temporary placeholder for avatar preview for upload

      input_orgName: {
        "initial": profile.fields['Name'],
        "name":"Name",
        "label":"Full Organization Name",
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
        "type":"DATALIST",
        "options": [
          {
            "value": "One",
          },
          {
            "value": "Two",
          },
          {
            "value": "Three",
          }
        ]
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

      this.profiledata = "Hey buddy, I'm saving this thing ... wait plz."
      let profiledata = {
        slug: this.slug, // "test-example",
        passcode: this.passcode, //  "THEIR-FEED-NOSE-into",
        type: "UPDATE",
        table: this.tableType,
        data: {
          Name: this.testname
        }
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
        this.profile = response.data
        this.tableType = response.data.meta.table
        this.isLoading = false
      } else {
        this.isLoading = false
        this.statusMessage = "Profile could not be saved."
      }
    },

    clearAvatar(event) {
      this.files = null
      this.avatar = null
    },
    uploadAvatar(event) {
      const _this = this
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