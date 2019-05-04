<template>
  <div class="Template-Base-Documentation _margin-top-2 _margin-bottom-2   _section-page _margin-center">

    <div class="_grid-1-4 _grid-gap _center-margin">
      <!-- Side bar / Side menu -->
      <div>
        <nav class="Sidenav _sidebar --sticky --top-1 ">
          <div class="--max-height-90">
            <slot name="sidebar" />
          </div>
        </nav>
      </div>


      <div class="_section-article _margin-bottom ">

        <slot name="intro" />

        <slot />

        <slot name="footer" />

      </div>
    </div>
  </div>


</template>




<script>
  
import { mapState } from 'vuex'
// import Form from '~/templates/node-form.vue'
// import { loadQuery } from '~/other/loaders'

export default {

  components: {
    // Form
  },

  props: {
    'sidebar': Object,
  },

  layout: 'contentframe',
  middleware: 'pageload',
  meta: {
    tableQueries: ["_content"]
  },

  // runs on generation and page route (but not on first page load)
  // async asyncData({env, store, route}) {
  // },

  data () {

    return {
      isMounted: false,
    }
  },
  
  computed: {
    ...mapState([
      'Content'
      ]),

    contents() {
      let contents = this.$cytosis.getLinkedRecords(this.node.fields['Node:Contents'], this.Content , true )
      return contents.reverse()
    },
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

    doneScrolling(el) {
      this.$router.push({
        path: this.route.path + '#' + el.id
      })
    }
  },


}
</script>

<style>
</style>

