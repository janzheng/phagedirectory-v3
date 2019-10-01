<template>
  <div class="Coeur">
    <Template>

      <h1>Backup Room</h1>
  
    </Template>

  </div>
</template>


<script>

import { mapState } from 'vuex'
import Cytosis from '~/components/experiments/Cytosis.vue'
import NodeForm from '~/components/render/NodeForm.vue'
import Template from '~/templates/article.vue'
import { headMatter } from '~/other/headmatter.js'
import { loadQuery } from '~/other/loaders'
import axios from 'axios'

export default {

  components: {
    Cytosis,
    // NodeForm,
    Template,
  },

  layout: 'contentframe',
  middleware: 'pageload',
  meta: {
    tableQueries: ["_content-copy"],
    // tableQueries: ["_content-copy","atoms-events"],
  },

  async asyncData({env, store, route, app, error}) {
    // error({statusCode: 500, message: "I AM A BANANA"})
  },

  data () {

    console.log('Creating a backup')

    // public site
    loadQuery({
      _key: process.env.airtable_api, 
      _base: process.env.airtable_base, 
      store: this.$store, 
      routeName: 'backup/site', 
      query: '_archive',
    }).then(data => {
      data = this.$cytosis.strip(data) // clean the data
      console.log('>>>>>>>')
      console.log('>>>>>>> site string:', JSON.stringify(data))
      console.log('>>>>>>>')
    })

    // public DB
    loadQuery({
      _key: process.env.PD_AIRTABLE_DB_API, 
      _base: process.env.PD_AIRTABLE_DB_BASE, 
      store: this.$store, 
      routeName: 'backup/publicDB', 
      query: '_archive',
    }).then(data => {
      data = this.$cytosis.strip(data) // clean the data
      console.log('>>>>>>>')
      console.log('>>>>>>> public db string:', JSON.stringify(data))
      console.log('>>>>>>>')
    })

    // pd live
    loadQuery({
      _key: 'keyAe6M1KoPfg25aO', 
      _base: 'appEuZLle3bAy2g2g', 
      store: this.$store, 
      routeName: 'test/archive', 
      query: '_archive',
    }).then(data => {
      data = this.$cytosis.strip(data) // clean the data
      console.log('>>>>>>>')
      console.log('>>>>>>> pd live string:', JSON.stringify(data))
      console.log('>>>>>>>')
    })


    // // mgr db
    // loadQuery({
    //   _key: process.env.PD_AIRTABLE_PRIVATE_MGR_API, 
    //   _base: process.env.PD_AIRTABLE_PRIVATE_MGR_BASE, 
    //   store: this.$store, 
    //   routeName: 'test/archive', 
    //   query: '_archive',
    // }).then(data => {
    //   data = this.$cytosis.strip(data) // clean the data
    //   console.log('public db: tester archive string:', JSON.stringify(data))
    // })


    return {
      profiledata: null,
      slug: "",
      passcode: "",
    }

    return {
      hello: "banana"
    }
  },
  
  computed: {
    // ...mapState([
    //   'Atoms',
    //   ]),
    // events() {
    //   return this.Atoms.filter(t => t.fields['Atom:Type'] == 'Event')
    // },
  },

  methods: {
    // async cite() {
    //   let answer = await Cite.async('Q30000000')
    //   console.log('answer:', answer, answer.format('bibliography', {
    //     format: 'html',
    //     template: 'apa',
    //     lang: 'en-US'
    //   }))
    //   return answer
    // }
    // async testLoader() {
    //   try {
    //     const _cytosis = await new this.$cytosis ({
    //       airKey: process.env.PD_AIRTABLE_PUBLIC_API,
    //       airBase: process.env.PD_AIRTABLE_PUBLIC_BASE, // Live Public DB — hard coded to remain flexible
    //       routeName: '[tester]',
    //     });

    //     // console.log('getting record: ', _cytosis.base)
    //     // let record = await this.$cytosis.getRecord ({
    //     //   recordId: 'recALa8HZpWexWlMJ', 
    //     //   base: _cytosis.base,
    //     //   tableName: 'Content',
    //     // })

    //     // console.log('record:', record)

    //     return _cytosis;
    //   } catch(err) {
    //     console.error('[tester] Error:', err)
    //     return Promise.reject()
    //   }
    // },
  },


}
</script>

<style>
</style>

