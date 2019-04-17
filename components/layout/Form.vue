<template>

  <!-- 

    JSON mode means JSON-ONLY!! all content will be saved into the JSON column
    - normally form data is saved into Airtable columns. Sometimes there's a mismatch, and airtable won't save correctly
    - this also means that your forms will quietly drop user form data
    - with JSON-mode, all data is purely saved into the JSON column, meaning you'll get all your data, but it'll be fugly 

   -->

  <div class="Form"> 
    <div v-if="payload.intro" class="Form-intro " v-html="$md.render(payload.intro || '')" />
    <div class="Form-body">
      <div v-if="!success && !error">
        <Formlet ref="form" :inputs="getForm(payload.JSON)" @handler="formHandler" />
        <!-- <div class=" _grid-3-2 _align-vertically" > -->
        <div>
          <div class="">
            <span class="Form-privacy " v-html="$md.render(payload.privacy || '')" />
          </div>
          <button v-if="!sending" class="Form-btn _button _margin-none _center _padding-left _padding-right" @click="submit" >{{ payload.cta }}</button>
          <button v-if="sending" :class="'--loading'" class="Form-btn _button --outline _margin-none _center" >Sending...</button>
        </div>
      </div>

      <div v-if="success" class="" v-html="$md.render(payload.thanks || '')">
        <h4>Thank you for sending us feedback!</h4>
      </div>

      <div v-if="error" class="" v-html="$md.render(payload.error || '')">
        Something went wrong, please try again
      </div>
    </div>

  </div>
</template>

<script>

import Formlet from '~/components/layout/Formlet.vue'
import axios from 'axios'

export default {

  components: {
    Formlet,
  },

  // source is the form's json source
  // set :json='true' to dump the payload into a table named JSON, to prevent throwing errors
  // alert: sends us an email alert (this is through the server)
  props: {
    'payload': Object,
    'sendEmail': Boolean, // if true, pings the handler to send an email (NOT IMPLEMENTED)
    'validate': Boolean, // if true, run through vuelidate, otherwise skip (NOT IMPLEMENTED)
    'target': String, // name of the target table
    'source': String, // optional; what's the source of this form input (for debugging, mostly)
  },

  data: function () {
    return {
      sending: false,
      isFormValid: false,
      success: false,
      error: false
    }
  },

  computed: {
  },

  methods: {

    getForm(formStr) {
      // console.log('getform:', formStr)
      const form = JSON.parse(formStr) || undefined
      return form.inputs
    },
    formHandler(data) {
      if(data) {
        this.form = data
        this.isFormValid = true
      } else {
        this.isFormValid = false // required if validator is dirty
      }
    },
    submit() {
      const _this = this
      this.$refs.form.touch()

      if(this.isFormValid && !this.sending) {
        const data = {
          type: 'cytosis',
          target: this.target,
          sendEmail: this.sendEmail,
          source: this.source,
          form: this.form.$model,
          payload: this.payload,
        }

        this.sending = true

        console.log('Submitting data: ', data)
        axios.post(this.payload.handler, data)
        .then(function (response) {
          console.log('Message sent! Status:', response.status)
          // if(status.status == 200) {
            _this.success = true
            _this.sending = false
          // }
        })
        .catch(function (error) {
          console.log('error', error)
          _this.error = error
          _this.sending = false
        })
      }
    }
  }

}
</script>

<style lang="scss" scoped>

</style>

