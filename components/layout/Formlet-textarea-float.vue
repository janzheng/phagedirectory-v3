<!--

  not implemented 
  
<template>

  <div class="Formlet Formlet-textarea _form-control --float" >
    <!~~ <input :id="input.name"
           v-model.trim="data"
           :class="data ? `--data ${inputAttrs}` : inputAttrs "
           :name="input.name"
           :placeholder="input.placeholder"
           :required="input.required"
           class="_form-input --width-full" 
           :type="type"
           @input="emit"
           @blur="emit"
           @change="emit"
           @keyup.enter="keyEnterHandler"
    > ~~>
    <textarea :id="input.name"
              v-model.trim="data" 
              :name="input.name"
              :class="inputAttrs" 
              :placeholder="input.placeholder"
              :required="input.required" 
              :rows="input.rows || 4"
              class="_form-input _block" 
              type="text" 
              @input="emit"
              @blur="emit"
              @change="emit"
    />
    <label  
      v-if="input.name"
      :for="input.name" 
      class="_form-label" 
      :class="data ? '--data' : '' "
      v-html="$md.render(input.label || '')" 
    />
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
    submitHandler: Function, // submit handler to process @keyup handling
  },

  data: function () {
    return {
      data: '', // note that data can't be a prop since it needs to be bound
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

      // show char error before submit
      if(this.input.maxLength && !this.v.maxLength)
        return 'Please stay under the character limit'

      // UX update — don't show error messages until user hits submit
      if(!this.onSubmit)
        return

      // let message
      if(this.input.error && typeof(this.input.error) == 'string')
        return this.input.error

      // some errors only show AFTER user clicks CTA
      if(this.onSubmit) {
        if(!this.v.required)
          return 'This field is required'
      }
      return undefined

    },
  },


  methods: {
    // emit(delay = 4500) { // long initial delay
    //   // slows down error messages
    //   const _this = this
    //   _.debounce(() => {
    //     _this.$emit('input', _this.data)
    //     delay = 300
    //   }, delay, {
    //     'trailing': true
    //   })()
    // }
    emit: _.debounce(function() { // long initial delay
      // slows down error messages
      // console.log('emit')
      this.$emit('input', this.data)
      // this.delay = 200
    }, 100, {
      trailing: true
    }),
    emitOnSubmit() {
      // DEPRECATED but keep around
      // trigger this only if user has tried to submit
      if(this.onSubmit) {
        // console.log('emitOnSubmit')
        this.$emit('input', this.data)
      }
    },
  }

}
</script>

<style lang="scss" scoped>

</style>

-->