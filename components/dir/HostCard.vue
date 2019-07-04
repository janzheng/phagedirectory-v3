
<!-- 

    Directory — Host — Listing
    *** Host Card actually lists the Genus as a top level, and all related Genus' hosts are considered sub items!
    - the DB lists them all separately, so this actually generates Genus listings

 -->

<template>
  <div :id="`${genus}-spp`" class="Host Host-Card Dir-card _padding-none" >

    <div class="Host-container">
      <!-- <div class="Lab-profile "> -->
      <!-- <img :src="profileUrl" class="--profile --medium _margin-right"/> -->
      <!-- </div> -->
      <div class="Host-info _width-100">
        <div class="Dir-section _flex-row _flex-vertically _margin-bottom">
          <div class="Dir-title _flex-1">
            <span class="_organism-name">{{ genus }} <span class="_organism-sp">spp.</span></span>
          </div>
        </div>

        <div class="Host-hosts">
          <div v-for="host of hosts" :id="`${host.fields['Slug']}`" :key="host.id" class=" Host-species _grid-2-3 _padding-bottom">

            <div>
              <div class="--sticky --top-1 _padding-none">
                <span class="_organism --large">
                  <span>{{ host.fields['Genus'] }}</span>
                  <span>{{ host.fields['Species'] }}</span>
                </span>
              </div>
            </div>
            <div class="">
              <!-- empty state -->
              <!-- <div v-if="host.fields['PhageCollections:Owners:Orgs::Names'].length == 0 && host.fields['Species']" class=""> -->
              <div v-if="hostCollections(host) && hostCollections(host).length == 0" class="">
                <span class="Dir-disabled">(If you work with this organism, please <br><a href="#" class="--url">help us by adding your lab!</a>)</span>
              </div> 

              <div v-if="hostCollections(host) && hostCollections(host).length >0" class="Host-collections _margin-bottom">
                <!-- <div><span class="Dir-label">Phage Collections</span></div> -->
                <div v-for="(collection) of hostCollections(host)" 
                     :key="`${host.fields['Genus']}-${host.fields['Species']}-${collection.id}`" class="Host-collection Dir-miniCard">

                  <div class="Dir-row">
                    {{ collection.name }}
                  </div>

                  <div class="Dir-row">
                    <nuxt-link :to="`/people#${ collection.peopleSlug }`" class="--url">{{ collection.people }}</nuxt-link><span>, {{ collection.peopleRole }}</span>
                  </div>

                  <div class="Dir-row">
                    <nuxt-link :to="`${collection.orgSlugRoot}#${collection.orgSlug}`" class="--url">{{ collection.orgName }}</nuxt-link><span v-if="collection.parent">, {{ collection.parent }}</span>
                  </div>

                </div>

              </div>
            </div>
            
          </div>
        </div>
        <!-- {{ linkedPhageCollections }} -->
      </div>
    
    </div>
  </div>
</template>

<script>

import { mapState } from 'vuex'

export default {
  props: {
    'genus': String,
    'hosts': Array,
    'phageCollections': Array,
  },
  computed: {
    ...mapState([
      'search',
      ]),
    linkedPhageCollections() {
      return this.$cytosis.getLinkedRecords(this.host.fields['PhageCollections'], this.phageCollections, true).reverse()
    },

    // genusList() {

    // }
  },
  methods: {
    hostCollections(host) {
      let collections = []
      if(host && host.fields['PhageCollections']) {
        const ids = host.fields['PhageCollections:_id'].split(',')
        const names = host.fields['PhageCollections:Names'].split(',')
        const orgs = host.fields['PhageCollections:Owners:Orgs::Names'].split(',')
        const orgsslugroots = host.fields['PhageCollections:Owners:Orgs::SlugRoot'].split(',')
        const orgsslugs = host.fields['PhageCollections:Owners:Orgs::Slugs'].split(',')
        const people = host.fields['PhageCollections:Owners:People::Names'].split(',')
        const peopleslugs = host.fields['PhageCollections:Owners:People::Slugs'].split(',')
        const peopleroles = host.fields['PhageCollections:Owners:People::Roles'].split(',')
        const parents = host.fields['PhageCollections:Owners:ParentOrgs::Names'].split(',')

        ids.map((_id,i) => {
          collections.push({
            id: ids[i],
            name: names[i],
            orgName: orgs[i],
            orgSlugRoot: orgsslugroots[i],
            orgSlug: orgsslugs[i],
            parent: parents[i],
            people: people[i],
            peopleSlug: peopleslugs[i],
            peopleRole: peopleroles[i],
            search: `${ids[i]} ${names[i]} ${orgs[i]} ${parents[i]} ${people[i]}`
          })
        })

        collections.sort((a,b) => a.name < b.name ? -1 : 1)

        // check if the term exists in the collections:
        if(this.search.string) {
          let filtered = []
          const str = this.search.string.toLowerCase()
          collections.map((coll) => {
            if(coll.search.toLowerCase().includes(str)) {
              filtered.push(coll)
            }
          })
          if(filtered.length > 0)
            return filtered
            // filter host collections through search term to only include labs that contain the term
            // only return filtered if there's at least one hit, otherwise return the rest
            // if searching for "baumanii" you want to return all collections, BUT if you saerch for "APT" it should only return 
            // collections that contain "APT"
        }

        return collections
      }
      return undefined
    },
  }
}
</script>


