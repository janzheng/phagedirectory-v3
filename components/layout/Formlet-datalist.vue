
<template>

  <!-- TODO: https://css-tricks.com/datalist-is-for-suggesting-values-without-enforcing-values/ -->
  
  <div class="Formlet Formlet-datalist  _form-control" >

    <label 
      v-if="input.name" 
      :for="input.name" 
      class="_form-label" 
      v-html="$md.render(input.label || '')" 
    />
    <label 
      v-if="input.description" 
      :for="input.name" 
      class="_form-label _form-desc" 
      v-html="$md.render(input.description || '')" 
    />

    <!-- <label v-if="isFieldInvalid(input)" class="_error" >{{ errorMessage(input) }}</label> -->

    <!-- 

      <label for="color">What's the name of your favorite color?</label>
      <input type="text" id="color" list="colors_data">
      <datalist id="colors_data">
        <option value="red"></option>
        <option value="orange"></option>
        <option value="green"></option>
        <option value="blue">The color of the sky</option>
      </datalist>

     -->

    <!-- <input type="text" :id="input.name" list="datalist"> -->

    
    <input :id="input.name"
           v-model.trim="data" 
           :class="inputAttrs" 
           :name="input.name"
           :placeholder="input.placeholder"
           :required="input.required"
           class="_form-input --width-full" 
           list="datalist"

           type="text" 
           @input="emit"
           @blur="emit"
           @change="emit"
           @keyup.enter="keyEnterHandler"
    >
    <datalist id="datalist">
      <option v-for="item of input.options" :key="item.value" :value="item.value">{{ item.label }}</option>
    </datalist>
    <!-- <div v-for="option in input.options" :key="option.value" class="_form-radio --inline" >
      <label :for="option.value" class="_form-radio-label"> 
        <input :id="option.value"
               v-model.trim="data" 
               :name="option.value" 
               :value="option.value"
               type="radio" 
               @change="$emit('change', data)"
        >
        <span :for="option.value">{{ option.label }}</span>
      </label>
    </div> -->

    <label v-if="isFieldInvalid && errorMessage" class="_error" >{{ errorMessage }}</label>
  </div>

</template>

<script>

import _ from '~/other/lodash.custom.min.js'

let _delay = 100

export default {

  props: {
    input: Object,
    type: String,
    inputAttrs: String, // classes that might be applied to every input
    v: Object, // validation object, for errors and messages
    onSubmit: Boolean, // fires when submit cta is clicked
  },

  data: function () {
    return {
      data: '' // note that data can't be a prop since it needs to be bound
      // we're emitting the data back as a @input
    }
  },

  computed: {
    isFieldInvalid() {
      // remember to pass down the correct v model — the object that shares 
      // this object's name!
      if (this.v)
        return this.v.$invalid
      return undefined
    },
    errorMessage () {
      // some errors only show AFTER user clicks CTA
      if(this.onSubmit) {
        // only error for these types is if you've clicked or not clicked
        if(this.input.error && typeof(this.input.error) == 'string')
          return this.input.error

        // if(!this.v.required)
          // return 'This field is required'
      }
      return undefined

      // NOT SUPPORTED YET — if input is an object 
      // e.g. error.$email, error.$required, etc. — would match the v model
      // so you can create custom messages for different situations,
      // like email is wrong etc.
      // else if(input.error)
      // if (!message && this.$v.fieldData[input.name].$required)
      //   message = "This field is required"

      // leave required as the catchall 
      // some errors only show AFTER user clicks CTA
      // if(this.onSubmit) {
      //   if(!this.v.required)
      //     return 'This field is required'
      // }

      // return message
    },
  },


  methods: {
    // emit(delay = 800) { // long initial delay

    //   // slows down error messages
    //   const _this = this
    //   _.debounce(() => {
    //     _this.$emit('input', _this.data)
    //     delay = 300
    //   }, delay, {
    //     'trailing': true
    //   })()
    // }
    emit: new _.debounce(function() { // long initial delay
      // slows down error messages
      // console.log('emitting formlet-input', _delay)
      this.$emit('input', this.data)
      _delay = 100
    }, _delay, {
      trailing: true
    }),
    emitOnSubmit() {
      // trigger this only if user has tried to submit
      if(this.onSubmit) {
        // console.log('emitOnSubmit')
        this.$emit('input', this.data)
      }
    },
    keyEnterHandler() {
      // console.log('key enter pressed')
      this.submitHandler()
    },
  },

}
</script>

<style lang="scss" scoped>

</style>

