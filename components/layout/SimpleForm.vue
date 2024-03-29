<template>

  <div :id="`Form--${formName}`" class="Form --simple" > 
    <div v-if="payload.intro" class="Form-intro" v-html="$md.render(payload.intro || '')" />

    <div class="Form-body">
      <div v-if="!success && !error">
        <Formlet ref="form" 
                 :inputs="formJson.inputs"
                 :submit-handler="submitHandler"
                 :on-submit="onSubmit"
                 @onValid="formHandler"
                 @onValidating="validationHandler"
        />

        <div>
          <div v-if="formJson.action" class="Form-cta _margin-top" >
            <button v-if="!isSending" 
                    class="Form-btn _button _margin-none _center _padding-left _padding-right"
                    @click="submitHandler" 
            >{{ formJson.action }}</button>
          </div>
          <button v-if="isSending" class="Form-btn _button --outline _margin-top _center --loading " >
            <span class="_font-bold _relative">
              <span class="_loader --circle" /> <span class="_margin-left-2">Sending...</span>
            </span>
          </button>

          <div v-if="formJson.privacy" class="Form-privacy _margin-top-half">
            <span class="_md-pfix" v-html="$md.render(formJson.privacy || '')" />
          </div>

          <div v-if="onSubmit && !isFormValid" class="Form-error _card --alert _padding _margin-top">
            We found a mistake — please scroll back up and check.
          </div>
        </div>
      </div>

      <!-- thanks! -->
      <div v-if="success" id="Form--thanks" class="_card _padding --brand _padding-top _padding-tbottom _md-pfix _margin-bottom-none" v-html="$md.render(formJson.thanks || thanksMessage || '')">
        <h4>Thank you for sending us feedback!</h4>
      </div>

      <!-- submit error -->
      <div v-if="error" class="_card _padding --brand _md-pfix" v-html="$md.render(formJson.error || payload.error || '')">
        Something went wrong, please refresh and try again, or contact us if it happens again.
      </div>
    </div>

  </div>
</template>

<script>

// import _ from '~/other/lodash.custom.min.js'
import Formlet from '~/components/layout/Formlet.vue'
import axios from 'axios'

export default {

  components: {
    Formlet,
  },

  // source is the form's json source
  props: {
    'payload': Object,
    'sendEmail': Boolean,     // if true, pings the handler to send an email (NOT IMPLEMENTED)
    'validate': Boolean,      // if true, run through vuelidate, otherwise skip (NOT IMPLEMENTED)
    'targetTable': String,    // name of the target table 
    'formName': String,       // optional; what's the source of this form input (for debugging, mostly)
  },

  data: function () {
    return {
      isSending: false,
      isFormValid: false,
      isValidating: false,
      onSubmit: false,
      success: false,
      error: false            // submit / axios error
    }
  },

  computed: {
    formJson() {
      return JSON.parse(this.payload.JSON)
    },
    thanksMessage() {
      if (this.formJson.meta)
          return this.formJson.meta.thanks
      return this.payload.thanks
    },
    privacyMessage() {
      return this.payload.privacy || ''
    }
  },

  methods: {

    getForm(formStr) {
      // console.log('getform:', formStr)
      const form = JSON.parse(formStr) || undefined
      return form.inputs
    },
    validationHandler(isValidating) {
      this.isValidating = isValidating
    },
    formHandler(data) { // _.debounce(function (data) {
      // listens on formlet changes; figures out if data is valid or not whenever data is updated
      // should switch to a promise-based system at some point

      // console.log('formhandler — data:', data, ' isvalidating:', this.isValidating)
      if(data) {
        this.form = data
        this.isFormValid = true
      } else {
        this.isFormValid = false // required if validator is dirty
      }
      // console.log('formhandler:end — data:', data, ' isvalidating:', this.isValidating)
     // }, 300),
    },
    submitHandler() {
      const _this = this
      console.log('Simple Form Handler triggered — valid:', this.isFormValid, 'isSending:', this.isSending )
      this.onSubmit = true

      if(this.isFormValid && !this.isSending) {
        const data = {
          type: this.type || 'cytosis-form-request',
          targetTable: this.targetTable,
          sendEmail: this.sendEmail,
          formName: this.formName,
          form: this.form.$model,
          payload: this.payload,
        }

        this.isSending = true

        console.log('Submitting data: ', data, this.payload)

        let form_post_api = process.env.form_post_api || this.payload.handler // used to be webtask but it's gone

        // console.log('submitting form to', form_post_api)


        axios.post(form_post_api, data)
        .then(function (response) {
          console.log('Message sent! Status:', response.status)
          // if(status.status == 200) {
            _this.success = true
            _this.isSending = false
            _this.$scrollTo(`#Form--${_this.formName}`)
            // _this.$scrollTo(`#Form--thanks`)
          // }
        })
        .catch(function (error) {
          console.log('error', error)
          _this.error = error
          _this.isSending = false
        })
      }
    }
  }

}
</script>

<style lang="scss" scoped>

</style>

