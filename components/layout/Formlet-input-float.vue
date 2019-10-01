
<template>

  <div class="Formlet Formlet-input _form-control --float" >

    <div v-if="input.action" class="_action _flex-row-sm">
      <input :id="input.name"
             v-model.trim="data"
             :class="data ? `--data ${inputAttrs}` : inputAttrs "
             :name="input.name"
             :placeholder="input.placeholder"
             :required="input.required"
             class="_form-input --width-full" 
             type="text"
             :list="input.options ? 'input_options':undefined"
             @input="emit"
             @blur="emitOnBlur"
             @change="emit"
             @keyup.enter="keyEnterHandler"
      >
      <label  
        v-if="input.name"
        :for="input.name" 
        class="_form-label" 
        :class="data ? '--data' : '' "
        v-html="$md.render(input.label || '')" 
      />
      <input class="_button _flex-1 --outline _margin-bottom-none " type="submit" :value="input.action" style="height: auto" @click="keyEnterHandler">
    </div>
    <div v-else>
      <input :id="input.name"
             v-model.trim="data"
             :class="data ? `--data ${inputAttrs}` : inputAttrs "
             :name="input.name"
             :placeholder="input.placeholder"
             :required="input.required"
             class="_form-input --width-full" 
             type="text"
             :list="input.options ? `input_options_${input.name}`:undefined"
             @input="emit"
             @blur="emitOnBlur"
             @change="emit"
             @keyup.enter="keyEnterHandler"
      >
      <!-- @blur="emit" -->
      <label  
        v-if="input.name"
        :for="input.name" 
        class="_form-label" 
        :class="data ? '--data' : '' "
        v-html="$md.render(input.label || '')" 
      />
    </div>
    <label v-if="isFieldInvalid && errorMessage" class="_error" >{{ errorMessage }}</label>
    <datalist v-if="input.options" :id="`input_options_${input.name}`">
      <option v-for="item of input.options" :key="item.value" :value="item.value">{{ item.label }}</option>
    </datalist>
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
      data: this.input.initial || '', // note that data can't be a prop since it needs to be bound
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

      // UX update — don't show error messages until user hits submit
      if(!this.onSubmit)
        return

      // let message
      if(this.input.error && typeof(this.input.error) == 'string')
        return this.input.error

      if(this.input.type == 'EMAIL' && !this.v.email)
        return 'Please enter a valid email'

      // NOT SUPPORTED YET — if input is an object 
      // e.g. error.$email, error.$required, etc. — would match the v model
      // so you can create custom messages for different situations,
      // like email is wrong etc.
      // else if(input.error)
      // if (!message && this.$v.fieldData[input.name].$required)
      //   message = "This field is required"


      // leave required as the catchall 
      // some errors only show AFTER user clicks CTA
      if(this.onSubmit) {
        if(!this.v.required)
          return 'This field is required'
      }

      // return message
      return undefined
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
    emit: new _.debounce(function(evt) { // long initial delay
      // slows down error messages
      // console.log('!! emitting action:', (evt == 'InputEvent'), evt )
      if(evt == 'InputEvent')
        console.log('INPUT EVENT!!')
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
    emitOnBlur() {
      // trigger this only if user has tried to submit
      if(this.onSubmit) {
        // console.log('emitOnSubmit')
        this.$emit('blur', this.data)
      }
    },
    keyEnterHandler() {
      this.submitHandler()
    },
  },

  // watch: {
  //   data: function (newData, oldData) {
  //     console.log('watcher running on data change', newData)
  //     this.emit()
  //   }
  // },

}
</script>

<style lang="scss" scoped>

</style>

