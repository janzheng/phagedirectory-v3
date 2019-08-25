<template>

  <div class="Recent-signups">

    <slot />

    <no-ssr>

      <Cytosis
        apikey="keyAe6M1KoPfg25aO"
        base="appEuZLle3bAy2g2g"
        route-name="{Insights:index}"
        query="evergreen-2019-signups"
      >
        <template #default="{ response }">

          <div class="Recent-signups-list">

            <div v-if="response && response.tables && response.tables['Signups'].length > 0" >
              
              <!-- insights -->
              <div class="Insights-signups _card _padding">
                <div class="_margin-bottom"><img alt="Phage Insights" src="/phageinsights.png" width="200" ></div>
                <div v-for="item of signups" :key="item.id">
                  <div v-if="item.fields['Type'] == 'Insights'">
                    <strong>{{ item.fields['Name'] }}</strong> <span v-html="item.fields['Org']" /> <span v-for="tag of item.fields['Tags']" :key="tag.id" class="_tag" >{{ tag }}</span>
                  </div>
                </div>
              </div>

              <!-- researchers -->
              <div class="Researchers-signups _card _padding">
                <h6 class="--title">Researchers</h6>
                <div v-for="item of signups" :key="item.id">

                  <div v-if="item.fields['Type'].some((e) => e=='Researchers')">
                    <strong>{{ item.fields['Name'] }}</strong> <span v-html="item.fields['Org']" /> <span v-for="role of item.fields['Roles']" :key="role.id" class="_tag" >{{ role }}</span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </template>
      </Cytosis>

    </no-ssr>
  </div>
</template>


<script>

import Cytosis from '~/components/experiments/Cytosis.vue'
import { loadQuery } from '~/other/loaders'

export default {
  head () {
    const title = "Evergreen 2019: LIVE"

    return {
      title,
    }
  },

  components: {Cytosis
  },

  data() {

    const _this = this
    const event = loadQuery({
      useDataCache: true,
      _key: 'keyAe6M1KoPfg25aO', // Live Public DB
      _base: 'appEuZLle3bAy2g2g', // Live Public DB
      store: _this.$store, 
      routeName: '{live:pfdc-2019}', 
      // query: 'pfdc-2019'
      query: 'evergreen-2019-signups'
    })
    event.then((data) => {
      if(data) {
        // console.log('data:', data)
        _this.response = data
        _this.signups = data.tables['Signups']
      }
      // _this.signups = data.tables['Signups'].reverse()
    })

    return {
      response: '',
      signups: [],
    }
  },

  computed: {
  },

  created: function () {
    
  },

  mounted: function () {
  },

  methods: {
  }

}

</script>

<style lang="scss" scoped>

</style>

