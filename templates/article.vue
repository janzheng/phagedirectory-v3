<template>
  <!-- <div :class="
    templateClasses" class="Template-Article _section-page _margin-center _margin-top-2 _margin-bottom-2 _padding-top-2 _padding-bottom-2 "> -->
  <div :class="templateClasses">

    <!-- <div 
      :class="mainClasses" 
      class="Template--Main _section-content _margin-bottom _margin-center _margin-top-none-i"> -->
    <div :class="mainClasses">
      <slot name="container" >
        <div :class="articleClasses">
          <slot name="header" />
          <slot name="default" />
          <slot name="footer" />
        </div>
      </slot>
    </div>

  </div>
</template>




<script>
  
// import { mapState } from 'vuex'
// import Template from '~/templates/article.vue'

export default {

  components: {
    // Template
  },

  props: {
    'templateClasses': {
      type: String,
      default: 'Template-Article _section-page _margin-center _margin-top-2 _margin-bottom-2 _padding-top-2 _padding-bottom-2  ',
    },
    'mainClasses': {
      type: String,
      default: 'Template--Main _section-content _margin-bottom _margin-center ',
    },
    'articleClasses': {
      type: String,
      default: '_section-article ',
    },
    
  },

  // layout: 'contentframe',
  // middleware: 'pageload',
  // meta: {
    // tableQueries: ["_content"]
  // },

  // runs on server+generation and page route (but not on first page load)
  // async asyncData({env, store, route}) {
  // },

  data () {
    // this.$store.dispatch("updateCreate", {
    //   pageName: this.node.fields['Node:Name']
    // })

    return {
      isMounted: false,
    }
  },
  
  computed: {
    // ...mapState([
    //   'Content'
    //   ]),

    // contents() {
    //   let contents = this.$cytosis.getLinkedRecords(this.node.fields['Node:Contents'], this.Content , true )
    //   return contents.reverse()
    // },
  },

  beforeCreate () {
  },
  mounted () {
    this.isMounted = true
  },
  beforeDestroy() {
  },

  methods: {
    pathMatch(path) {
      if(!this.route.path)
        return false

      if(this.route.path == path)
        return true
    },
  },


}
</script>

<style>
</style>

