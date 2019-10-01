<template>
  <div class="Coeur">
    <Template>


      <h1>Test Room!</h1>

      <button class="_button" @click="analyzethis">Analytics Test</button>

      <!-- <h2>Map of Events</h2> -->
<!-- 
      <div class="Leaflet" id="map-wrap" style="height: 40vh">
        <no-ssr>
          <l-map :zoom=1 :center="[47.413220, -1.219482]" class="Leaflet-map" >
            <l-tile-layer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
              attribution="Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a>" 
            />
            <l-marker v-for="item of events" 
                     :key="item.id" 
                     :lat-lng="item.fields['Meta:LatLng'][0].split(',')" 
                     class="Leaflet-marker"
            >
              <l-tooltip class="Leaflet-tooltip">
                {{ item.fields['Name'] }}</h5>
              </l-tooltip>
            </l-marker>
            <l-tile-layer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />
          </l-map>
        </no-ssr>
      </div> -->

      <!-- <NodeForm :src="form"/> -->


      <!-- <h2>Cytosis</h2> -->
      <!--<Cytosis
        :tableQueries="['atoms-alerts']"
        :refreshOnLoad="true"
        :env="env"
      >
        <template #default="{ response }">
          [Uncomment for response] 
          <!~~ Response: {{ response }} ~~>
        </template>
      </Cytosis>-->


  
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

  head () {

    let head = headMatter({
      title: "My little kitty page.",
      description: "This is a page for kitties!! Descibe all kitties!!",
      author: "I am a kitty!",
      imageUrl: "https://cdn.pixabay.com/photo/2017/02/20/18/03/cat-2083492__340.jpg", 
      url: "https://phagedirectory-osht38v01.now.sh/coeur/tester",
      twitterCreator: "@kittiesonly"
    })

    return head

    // return {
    //   title: "my little title",
    //   meta: [
    //     // hid is used as unique identifier. Do not use `vmid` for it as it will not work
    //     { hid: 'description', 
    //       name: 'description', 
    //       content: 'My custom description' 
    //     }
    //   ]
    // }

    // this.$head.setTitle("ZZZitty Title!!")
    // this.$head.setDescription("ZZZitty Description!!")

    // this.$head.setAuthor("ZZZitty author")
    // this.$head.setTwitterCreator("@zzzittyAuthor")
    // this.$head.setUrl("https://zzzittykittyrama.com")

    // const cover_img = "https://cdn.pixabay.com/photo/2017/02/20/18/03/cat-2083492__340.jpg"

    // // if(this.issue.fields['Cover'])
    // this.$head.setImage(cover_img)

    // console.log('head:', this.$head.get())
    
    // return this.$head.get()

  },

  async asyncData({env, store, route, app, error}) {
    // error({statusCode: 500, message: "I AM A BANANA"})
  },

  data () {

    console.log('Testing Testing!')

    // let base = this.$cytosis.getBase('appZBUJQuXSUckq4d')

    // this.testLoader().then((base) => {
    //   console.log('base:', base)
    //   base.find()
    // })

    // if(process.client)
      // this.getData()


    // loadQuery({
    //   _key: process.env.airtable_api, 
    //   _base: process.env.airtable_base, 
    //   store: this.$store, 
    //   routeName: 'test/archive', 
    //   query: '_archive',
    // }).then(data => {
    //   data = this.$cytosis.strip(data) // clean the data
    //   console.log('tester archive:', data)
    // })


    return {
      profiledata: null,
      slug: "",
      passcode: "",
    }

    // let item = await this.$cytosis.getRecord({
    //   recordId: 'recnY61HrxiBaB27h',
    //   tableName: '_cache',
    //   airKey: process.env.airtable_api,
    //   baseId: process.env.airtable_base,
    // })
    // item = this.$cytosis.cleanRecord(item)

    // console.log(' ::: GET ITEM ::: ', item)
    // console.log(' ::: GET ITEM ::: ', JSON.parse(item.fields['Payload']))

    // let people = await loadQuery({
    //   _key: process.env.db_api, 
    //   _base: process.env.db_base, 
    //   store: this.$store, 
    //   routeName: 'Test router [People]', 
    //   query: 'People-profile',
    //   options: {
    //     filter: this.$cytosis.filter_or(['jan-zheng', 'jessica-sacher'], "Slug")
    //   }
    //   // keyword: 'adel-abouhmad',
    // })
    // people = this.$cytosis.strip(people)

    // console.log('TESTER PEOPLE:', people)

    // const data = {
    //   routeName: '[nuxtServerInit]',
    //   airKey: process.env.airtable_api, 
    //   airBase: process.env.airtable_base, 
    //   tableQuery: '_content-copy',
    //   config: this.$store.state.config[process.env.airtable_base],
    // }

    // let test = await new this.$cytosis(data)
    // console.log(' ::::: TEST START :::::', test)
    // test = this.$cytosis.strip(test)
    // console.log(' ::::: TEST END :::::', test )


    // console.log('Citing:', this.cite())
    return {
      hello: "banana"
      // form: this.$cytosis.findOne('form-tester', this.$store.state['Content'] ),
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

    analyzethis() {
      console.log('analyze!', this.$segment)
      this.$segment.track('Test Event', { fruit: 'banana' })
    },

    async testLoader() {
      try {
        const _cytosis = await new this.$cytosis ({
          airKey: process.env.PD_AIRTABLE_PUBLIC_API,
          airBase: process.env.PD_AIRTABLE_PUBLIC_BASE, // Live Public DB — hard coded to remain flexible
          routeName: '[tester]',
        });

        // console.log('getting record: ', _cytosis.base)
        // let record = await this.$cytosis.getRecord ({
        //   recordId: 'recALa8HZpWexWlMJ', 
        //   base: _cytosis.base,
        //   tableName: 'Content',
        // })

        // console.log('record:', record)

        return _cytosis;
      } catch(err) {
        console.error('[tester] Error:', err)
        return Promise.reject()
      }
    },
  },


}
</script>

<style>
</style>

