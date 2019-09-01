
<!-- 

  Takes a node object from cytosis and turns it into a usable form object

 -->

<template>
  <div :class="src.fields['Data:Attrs'] || 'Node-Form FormCard'" class="">


    <SimpleForm v-if="src.fields['Data:List'] == 'SimpleForm'"
                :payload="payload"
                :target-table="src.fields['Data:Select']"
                :send-email="true"
                :validate="true"
                :form-name="src.fields['Name']"
                class=""
    />
    <Form v-else
          :payload="payload"
          :target-table="src.fields['Data:Select']"
          :send-email="true"
          :validate="true"
          :form-name="src.fields['Name']"
          class=""
    />
  </div>
</template>

<script>

import SimpleForm from '~/components/layout/SimpleForm.vue'
import Form from '~/components/layout/Form.vue'
import { mapState } from 'vuex'

export default {

  components: {
    Form,
    SimpleForm,
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
        // isPublished: this.src.fields['isPublished'], // commenting this out; removing might crash forms
    
        handler:  this.src.fields['Data:URL'] || undefined,
        error:    this.src.fields['Data:Error'] || this.$cytosis.findField('form-default:error', this['Content'], 'Markdown' ),
        thanks:   this.src.fields['Data:Success'] || this.$cytosis.findField('form-default:thanks', this['Content'], 'Markdown' ),
        cta:      this.src.fields['Data:String'] || this.$cytosis.findField('form-default:cta', this['Content'], 'Markdown' ),
        privacy:  this.$cytosis.findField('form-default:privacy', this['Content'], 'Markdown' ),
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

