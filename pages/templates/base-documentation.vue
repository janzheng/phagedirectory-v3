<template>
  <div class="Template-Documentation _margin-top-3 _margin-bottom-2 ">

    <div 
      class="_grid-1-4 _grid-gap-large _center-margin _container _padding" 
    >

      <!-- Side bar / Side menu -->
      <div>
        <nav class="Sidenav _sidebar --sticky --top-1 ">
          <div class="--max-height-90">
            <slot name="sidebar" />
          </div>
        </nav>
        <!--<nav v-if="class_sidebar" 
             ref="sidebar"
             :style="class_sidenav"
             class="Sidenav _sidebar --sticky --top-1 " 
        >
          <div class="_sidebar-content --max-height-90 
            _padding-bottom _padding-top">
            <div :class="pathMatch(source.fields['Node:AbsolutePath']) ? '--active' : ''" 
                 class="_sidebar-content-group"
            >
              <nuxt-link
                v-scroll-to="{
                  el: '#top',
                  onDone: (element) => { doneScrolling(element) }
                }"
                :to="`${source.fields['Node:AbsolutePath']}#top`" 
                class="_sidebar-item" >
                {{ source.fields['Node:Name'] }}
              </nuxt-link>
              <div v-if="pathMatch(source.fields['Node:AbsolutePath'])" class="_sidebar-submenu" >
                <div v-for="(item, index) of source.fields['Node:Nav']" 
                     :key="item" >
                  <!~~ <nuxt-link :to="`${source.fields['Node:AbsolutePath'] + source.fields['Node:Nav-Links'][index]}`" class="_sidebar-item _sidebar-subitem" >{{ item }}</nuxt-link> ~~>
                  <nuxt-link 
                    v-scroll-to="{
                      el: source.fields['Node:Nav-Links'][index],
                      onDone: (element) => { doneScrolling(element) }
                    }"
                    :to="`${source.fields['Node:Nav-Links'][index]}`" class="_sidebar-item _sidebar-subitem" 
                  >
                    {{ item }}
                  </nuxt-link>
                </div>
              </div>

            </div>

            <div 
              v-for="(item) of navSource" 
              :class="pathMatch(item.fields['Node:AbsolutePath']) ? '--active' : ''" 
              :key="item.id"
              class="_sidebar-content-group"  
            >
              <!~~ label ~~>
              <div 
                v-if="item.fields['Type'] == 'Node:Label'"
                class="_sidebar-item _sidebar-label"
              >
                <div class="_md-pfix" v-html="$md.render(item.fields['Markdown'] || '')" />
              </div>

              <!~~ link ~~>
              <nuxt-link 
                v-if="item.fields['Type'] == 'Node'"
                :to="`${item.fields['Node:AbsolutePath']}`"
                class="_sidebar-item"
              >
                {{ item.fields['Node:Name'] }}
              </nuxt-link>

              <div v-if="pathMatch(item.fields['Node:AbsolutePath'])">
                <div v-if="pathMatch(item.fields['Node:AbsolutePath'])" class="_sidebar-submenu" >
                  <div 
                    v-for="(item2, index) of item.fields['Node:Nav']" 
                    :key="item2" 
                  >
                    <nuxt-link 
                      :to="`${item.fields['Node:AbsolutePath'] + item.fields['Node:Nav-Links'][index]}`"
                      class="_sidebar-item _sidebar-subitem"
                    >
                      {{ item2 }}
                    </nuxt-link>
                  </div>
                </div>
              </div>

            </div>
          </dfiv>
        </nav>-->
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
// import Form from '~/pages/templates/node-form.vue'
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

