
<!-- 

  Based on Periodical.vue, only shows some basic info for a periodical
  - requires a click to view the periodical. Necessary b/c starting to get too many

 -->
<template>

  <div class="Capsid Capsid-Stub ">
    <div v-if="isFeatured" >
      <router-link :key="issue.id"
                   :to="`/capsid/${issue.fields.Slug}`"
                   :class="isFeatured ? '--featured' :''"
                   class="Capsid-Stub-item _block _card _padding-2">

        <h6 class="Capsid-Stub-latest">Latest Issue</h6>
        <div class="Capsid-header _grid-2 _grid-gap-small">
          <div class="Capsid-title">{{ issue.fields['Name'] }}</div>
          <div class="Capsid-date _right-sm">{{ issue.fields['Data:Date'] | niceDate }}</div>
        </div>
        <h3 class="Capsid-title" v-html="issue.fields['Data:Title']" />
        <div class="Capsid-lede" v-html="issue.fields['Data:Lede']" />
      </router-link>
    </div>
    <div v-else class="_height-100 " >
      <router-link :key="issue.id"
                   :to="`/capsid/${issue.fields.Slug}`"
                   :class="isFeatured ? '--featured' :''"
                   class="Capsid-Stub-item _block _card _padding _height-100 _margin-none">

        <div class="Capsid-header _grid-2 _grid-gap-small">
          <div class="Capsid-title">{{ issue.fields['Name'] }}</div>
          <div class="Capsid-date _right-sm">{{ issue.fields['Data:Date'] | niceDate }}</div>
        </div>
        <h5 class="Capsid-title" v-html="issue.fields['Data:Title']" />
        <div class="Capsid-lede" v-html="issue.fields['Data:Lede']" />
      </router-link>
    </div>
  </div>
</template>

<script>

// import { mapState } from 'vuex'

export default {
  props: {
    'issue': Object,
    'isFeatured': Boolean
  },

  data: function () {
    return {
    }
  },

  computed: {
  },

  methods: {
  }

}
</script>

