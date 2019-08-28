
<!-- 
  
  Add in places about us in Evergreen; NOT A REUSABLE COMPONENT!!

 -->
<template>

  <div class="EvergreenPromo _card _padding">
    <div class="_md-pfix" v-html="$md.render( content || '')" />

    <!-- <div class="AgendaCard-header _grid-3-2 _grid-gap-small _align-vertically _margin-bottom-half-xs _padding-bottom-half " >
      <h6 class="_padding-none"><slot name="type" /></h6>
      <div class="_right-sm"><slot name="date" /></div>
    </div>
    <div class="AgendaCard-main">
      <slot name="main" />
    </div> -->
  </div>
</template>


<script>


export default {

  components: {
  },

  data: function () {
    return {
      content: this.$cytosis.findField('evergreen-promo', this.$store.state['Content'], 'Markdown' ),
    }
  },

  methods: {
    handleSubmit() {
      // todo: use axios w/ the mailchimp API instead of default mailchimp
      return false
    }
  }

}
</script>

