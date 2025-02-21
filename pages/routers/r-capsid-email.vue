<!--  

  Router for Capsid & Tail issues
  // basis for other manuscript routers

-->

<template>
  <div class="Router-Capsid-email">

    <!-- the route should match against a slug and only the first matched slug should be relevant -->
    <Capsid :issue="manuscript" :atoms="atoms" />

  </div>
</template>




<script>
  
// import { mapState } from 'vuex'
import { loadQuery } from '~/other/loaders'

// import CapsidTemplate from '~/templates/node-capsid-email'
import Capsid from '~/components/publications/CapsidEmail.vue'

export default {

  components: {
    Capsid,
  },

  // layout: 'contentframe',
  middleware: 'pageload',
  meta: {
    tableQueries: ["_content-copy"]
  },

  data () {
    return {
      manuscript: undefined,
      atoms: undefined
    }
  },

  computed: {
    // ...mapState([
    //   'Content',
    //   'Manuscripts',
    //   ]),

    // contents() {
    //   let contents = this.$cytosis.getLinkedRecords(this.node.fields['Node:Contents'], this.Content , true )
    //   return contents.reverse()
    // },
  },

  // runs on server+generation and page route (but not on first page load)
  // async asyncData({env, store, route}) {
  //   const slug = unescape(route.params.slug)
  //   // const node = await loadQuery({env, store, '{capsid router}', 'Node-AbsolutePath', slug})
  //   // console.log('matched node: ', node, ' @ ', slug)

  //   const manuscript = await loadQuery({env, store, routeName:'{capsid-router-email}', query:'capsid-single', keyword: slug})
  //   // console.log('matched manuscript: ', manuscript, ' @ ', slug)

  //   // fetches the relevant atoms into the store
  //   const atoms = await loadQuery({env, store, routeName:'{capsid-router-email}', query:'capsid-atoms', keyword: manuscript.tables.Manuscripts[0].fields['Name']})
  //   // console.log('matched atoms: ', atoms, ' @ ', manuscript.tables.Manuscripts[0].fields['Name'])

  //   return {
  //     slug,
  //     route,
  //     manuscript: manuscript.tables.Manuscripts[0],
  //     atoms: atoms.tables.Atoms,
  //   }
  // },


  // runs on server+generation and page route (but not on first page load)
  async asyncData({env, store, route }) {
    const slug = unescape(route.params.slug)

    // Fetch manuscript from coverflow
    const response = await fetch(`https://coverflow.deno.dev/phage/capsid-single?slug=${slug}&noCache=${process.env.pd_env == 'stage'}`)
    const data = await response.json()
    let manuscript = data?.[0] ? {fields: data[0]} : undefined

    if(manuscript) {
      // Fetch atoms from coverflow
      const atomsResponse = await fetch(`https://coverflow.deno.dev/phage/atoms-capsid?slug=${manuscript.fields['Slug']}&noCache=${process.env.pd_env == 'stage'}`)
      const atomsData = await atomsResponse.json()
      const atoms = {
        tables: {
          Atoms: atomsData.map(item => item && ({fields: item, id: item.id}))
        }
      }

      return {
        manuscript: manuscript,
        atoms: atoms.tables.Atoms,
      }
    }
  },

  beforeCreate () {
  },
  mounted () {
    console.log('[Router] Capsid Email')
  },
  beforeDestroy() {
  },

  methods: {
    pathMatch(path) {
      // console.log('pathMatch',this.route.path)
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

