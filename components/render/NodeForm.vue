
<!-- 

  Takes a node object from cytosis and turns it into a usable form object

 -->

<template>
  <div :class="src.fields['Data:Attrs']" class="Template-Form FormCard">
    <Form :payload="payload"
          :target-table="src.fields['Data:Select']"
          :send-email="false"
          :validate="true"
          :form-name="src.fields['Name']"
          class=""
    />
  </div>
</template>

<script>

import Form from '~/components/layout/Form.vue'
import { mapState } from 'vuex'

export default {

  components: {
    Form,
  },

  props: {
    src: Object
  },

  data: function () {
    return {

    }
  },

  computed: {
    ...mapState([
      'Content',
      ]),

    payload() {
      // console.log('payload src:', this.src)
      return {
        intro: this.src.fields['Markdown'],
        JSON: this.src.fields['Data:JSON'],
        isPublished: this.src.fields['isPublished'],
    
        handler: this.src.fields['Data:URL'] || this.$store.state.ext_handler,
        error: this.$cytosis.findOne('form-default:error', this.$store.state['Content'] ).fields['Markdown'],
        thanks: this.$cytosis.findOne('form-default:thanks', this.$store.state['Content'] ).fields['Markdown'],
        cta: this.src.fields['Data:String'] || this.$cytosis.findOne('form-default:cta', this.$store.state['Content'] ).fields['Markdown'],
        privacy: this.$cytosis.findOne('form-default:privacy', this.$store.state['Content'] ).fields['Markdown'],
      }
    }
  },


  methods: {
    // rawContent(findStr) {
    //   return this.cytosis.find(findStr)[0] ? this.cytosis.find(findStr)[0].fields.Markdown : ''
    // },
    // content(findStr) {
    //   return this.$md.render( this.cytosis.find(findStr)[0] && this.cytosis.find(findStr)[0].fields.Markdown ? this.cytosis.find(findStr)[0].fields.Markdown : '')
    // },

  }

}
</script>

<style lang="scss" scoped></style>

