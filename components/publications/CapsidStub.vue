
<!-- 

  Based on Periodical.vue, only shows some basic info for a periodical
  - requires a click to view the periodical. Necessary b/c starting to get too many

 -->
<template>

  <div class="Capsid Capsid-Stub ">
    <div v-if="isFeatured" >

      <nuxt-link :key="issue.id"
                 :to="`/capsid/${issue.fields.Slug}`"
                 :class="isFeatured ? '--featured' :''"
                 class="Capsid-Stub-item _block _card _padding">

        <!-- <h6 class="Capsid-Stub-latest">Latest Issue</h6> -->
        <!-- 
        <div class="Capsid-header _font--1 _grid-2 _grid-gap-small">
          <div class="Capsid-name">{{ issue.fields['Name'] }}</div>
          <div class="Capsid-date _right-sm">{{ issue.fields['Data:Date'] | niceDate }}</div>
        </div> -->
        <div v-if="showLogo" class="Capsid-logo _margin-bottom">
          <img src="~/static/cnt.png" width="84">
        </div>
        <div class="Capsid-header _font--1 _grid-gap-small">
          <span class="Capsid-name _font-bold ">{{ issue.fields['Name'] }}</span> | 
          <span class="Capsid-date _right-sm">{{ issue.fields['Data:Date'] | niceDate }}</span>
        </div>

        <h1 class="Capsid-title" v-html="$md.strip($md.render(issue.fields['Data:Title'] || ''))" />
        <div class="Capsid-lede" v-html="$md.strip($md.render(issue.fields['Data:Lede'] || ''))" />
      </nuxt-link>
    </div>

    <div v-else class="_height-100 " >
      <nuxt-link :key="issue.id"
                 :to="`/capsid/${issue.fields.Slug}`"
                 :class="isFeatured ? '--featured' :''"
                 class="Capsid-Stub-item _block _card _padding _height-100 _margin-none">
        <!-- <div class="Capsid-header _font--1 _color-mono-90 _grid-2 _grid-gap-small">
          <div class="Capsid-name">{{ issue.fields['Name'] }}</div>
          <div class="Capsid-date _right-sm">{{ issue.fields['Data:Date'] | niceDate }}</div>
        </div> -->
        <div class="Capsid-header _font--1 _grid-gap-small">
          <span class="Capsid-name _font-bold ">{{ issue.fields['Name'] }}</span> | 
          <span class="Capsid-date _right-sm">{{ issue.fields['Data:Date'] | niceDate }}</span>
        </div>
        <h4 class="Capsid-title" v-html="$md.strip($md.render(issue.fields['Data:Title'] || ''))" />
        <div class="Capsid-lede" v-html="$md.strip($md.render(issue.fields['Data:Lede'] || ''))" />
      </nuxt-link>
    </div>
  </div>
</template>

<script>

// import { mapState } from 'vuex'

export default {
  props: {
    'issue': Object,
    'isFeatured': Boolean,
    'showLogo': Boolean,
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

