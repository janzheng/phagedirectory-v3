<template>
  <div class="Template-Documentation _margin-top-3 _margin-bottom-2 ">

    <div 
      :class="class_sidebar ? '_grid-1-4 _grid-gap-large': '' "
      class="_center-margin _container _padding" >

      <!-- Side bar / Side menu -->
      <div>
        <nav v-if="class_sidebar" 
             ref="sidebar"
             :style="class_sidenav"
             class="Sidenav _sidebar --sticky --top-1 " 
        >
          <div class="_sidebar-content --max-height-90 
            _padding-bottom _padding-top">
            <!-- <a href="#top"> -->
            <!-- <h6 v-if="source">{{ source.fields['Node:Name'] }}</h6> -->
            <!-- </a> -->

            <div :class="pathMatch(source.fields['Node:AbsolutePath']) ? '--active' : ''" 
                 class="_sidebar-content-group"
            >
              <router-link
                v-scroll-to="{
                  el: '#top',
                  onDone: (element) => { doneScrolling(element) }
                }"
                :to="`${source.fields['Node:AbsolutePath']}#top`" 
                class="_sidebar-item" >
                {{ source.fields['Node:Name'] }}
              </router-link>
              <div v-if="pathMatch(source.fields['Node:AbsolutePath'])" class="_sidebar-submenu" >
                <div v-for="(item, index) of source.fields['Node:Nav']" 
                     :key="item" >
                  <!-- <router-link :to="`${source.fields['Node:AbsolutePath'] + source.fields['Node:Nav-Links'][index]}`" class="_sidebar-item _sidebar-subitem" >{{ item }}</router-link> -->
                  <router-link 
                    v-scroll-to="{
                      el: source.fields['Node:Nav-Links'][index],
                      onDone: (element) => { doneScrolling(element) }
                    }"
                    :to="`${source.fields['Node:Nav-Links'][index]}`" class="_sidebar-item _sidebar-subitem" 
                  >
                    {{ item }}
                  </router-link>
                </div>
              </div>

            </div>

            <!-- if node has a source, use the source for nav -->
            <div 
              v-for="(item) of sourceChildren" 
              :class="pathMatch(item.fields['Node:AbsolutePath']) ? '--active' : ''" 
              :key="item.id"
              class="_sidebar-content-group"  
            >
              <!-- label -->
              <div 
                v-if="item.fields['Type'] == 'Node:Label'"
                class="_sidebar-item _sidebar-label"
              >
                <div class="_md-pfix" v-html="$md.render(item.fields['Markdown'] || '')" />
              </div>

              <!-- link -->
              <router-link 
                v-if="item.fields['Type'] == 'Node'"
                :to="`${item.fields['Node:AbsolutePath']}`"
                class="_sidebar-item"
              >
                {{ item.fields['Node:Name'] }}
              </router-link>

              <div v-if="pathMatch(item.fields['Node:AbsolutePath'])">
                <div v-if="pathMatch(item.fields['Node:AbsolutePath'])" class="_sidebar-submenu" >
                  <div 
                    v-for="(item2, index) of item.fields['Node:Nav']" 
                    :key="item2" 
                  >
                    <router-link 
                      :to="`${item.fields['Node:AbsolutePath'] + item.fields['Node:Nav-Links'][index]}`"
                      class="_sidebar-item _sidebar-subitem"
                    >
                      {{ item2 }}
                    </router-link>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </nav>
      </div>


      <div class="_section-article _margin-bottom ">

        <slot name="intro" />

        <!-- Native Contents -->
        <div v-html="$md.render(node.fields['Markdown'] || '')" />

        <slot />

        <!-- Linked Contents  -->
        <div v-for="item of contents" :key="item.id">
          <div v-if="item.fields['Render:Template'] == 'Form'" >
            <Form :src="item"/>
          </div>
          <div v-else v-html="$md.render(item.fields['Markdown'] || '')" />
        </div>

        <slot name="footer" />

      </div>
    </div>


  </div>
</template>




<script>
  
import { mapState } from 'vuex'
import Form from '~/templates/t-form.vue'
// import { loadQuery } from '~/other/loaders'

export default {

  components: {
    Form
  },

  props: {
    'node': Object,
    'route': Object,
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
    this.$store.dispatch("updateCreate", {
      pageName: this.node.fields['Node:Name']
    })

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

    nodeSource() {
      if(this.node && this.node.fields['Node:Source']) {
        let source = this.$cytosis.getLinkedRecords(this.node.fields['Node:Source'], this.Content , true )
        return source.reverse()[0]
      }
    },

    source() {
      // source is either the node's source, or itself!
      return this.nodeSource || this.node
    },

    children() {
      if(this.node.fields['Node:Children']) {
        let children = this.$cytosis.getLinkedRecords(this.node.fields['Node:Children'], this.Content , true )
        // airtable always returns lists in reverse order
        return children.reverse()
      }
    },

    sourceChildren() {
      if(this.source) {
        let children = this.$cytosis.getLinkedRecords(this.source.fields['Node:Children'], this.Content , true )
        // airtable always returns lists in reverse order
        return children.reverse()
      }
    },

    class_sidebar() {
      // check linked content if sidebar is warranted
      if(this.source)
        return true
    },

    class_sidenav() {
      if (!this.isMounted) return

      const windowHeight = window.innerHeight
      const sidebarHeight = this.$refs.sidebar.clientHeight
      if(windowHeight < sidebarHeight) {
        console.log('Sidenav too short:', windowHeight, sidebarHeight)
        return {
          position: 'unset !important',
        }
      }
    }
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
      console.log('done scrolling', el.id)
      this.$router.push({
        path: this.route.path + '#' + el.id
      })
    }
  },


}
</script>

<style>
</style>

