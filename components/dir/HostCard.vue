
<!-- 

    Directory — Host — Listing
    *** Host Card actually lists the Genus as a top level, and all related Genus' hosts are considered sub items!
    - the DB lists them all separately, so this actually generates Genus listings

 -->

<template>
  <div :id="`${genus}-spp`" class="Host Host-Card Dir-card _padding _margin-bottom " >

    <div class="Host-container">
      <!-- <div class="Lab-profile "> -->
      <!-- <img :src="profileUrl" class="--profile --medium _margin-right"/> -->
      <!-- </div> -->
      <div class="Host-info _width-100">
        <div class="Dir-header Dir-section _flex-row _flex-vertically _margin-bottom">
          <div class="Dir-title _flex-1">
            <span class="_organism-name">{{ genus }} <span class="_organism-sp">spp.</span></span>
          </div>
        </div>

        <div class="Host-hosts">
          <div v-for="host of hosts" :id="`${host.fields['Slug']}`" :key="host.id" class="Host-species _grid-2-3 _margin-bottom-half">
            <div>
              <div class="--sticky --top-1 _padding-none">
                <span class="_organism">
                  <span>{{ host.fields['Genus'] }}</span>
                  <span>{{ host.fields['Species'] }}</span>
                </span>
              </div>
            </div>
            <div class="">
              <!-- empty state -->
              <!-- <div v-if="host.fields['PhageCollections:Owners:Orgs::Names'].length == 0 && host.fields['Species']" class=""> -->
              <div v-if="host.fields['PhageCollections:Owners:Orgs::Names'].length == 0" class="">
                <span class="Dir-disabled">(No information)</span>
              </div>

              <div v-if="host.fields['PhageCollections:Owners:Orgs::Names'].length >0" class="Host-collections _margin-bottom">
                <div><span class="Dir-label">Phage Collections</span></div>
                <div v-for="(collection, i) of host.fields['PhageCollections:Owners:Orgs::Names']" 
                     :key="collection" class="Host-collection Dir-miniCard">
                  <router-link :to="`${host.fields['PhageCollections:Owners:Orgs::SlugRoot'][i]}#${host.fields['PhageCollections:Owners:Orgs::Slugs'][i]}`" class="--url">{{ collection }}</router-link>
                  <div>{{ host.fields['PhageCollections:Owners:ParentOrgs::Names'][i] }}</div>
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

// import { mapState } from 'vuex'

export default {
  props: {
    'genus': String,
    'hosts': Array,
    'phageCollections': Array,
  },
  computed: {
    linkedPhageCollections() {
      return this.$cytosis.getLinkedRecords(this.host.fields['PhageCollections'], this.phageCollections, true).reverse()
    },

    // genusList() {

    // }
  },
  methods: {


  }
}
</script>


