
<!-- 

  Based on Periodical.vue, only shows some basic info for a periodical
  - requires a click to view the periodical. Necessary b/c starting to get too many

 -->
<template>

  <div class="Capsid Capsid-Stub _height-100" :data-name="`/capsid/${issue.fields.Slug}`">
    <div v-if="isFeatured" >
      <nuxt-link :key="issue.id"
                 :to="`/capsid/${issue.fields.Slug}`"
                 :class="isFeatured ? '--featured' :''"
                 class="Capsid-Stub-item _block _card">

        <!-- <h6 class="Capsid-Stub-latest">Latest Issue</h6> -->
        <!-- 
        <div class="Capsid-header _font--1 _grid-2 _grid-gap-small">
          <div class="Capsid-name">{{ issue.fields['Name'] }}</div>
          <div class="Capsid-date _right-sm">{{ issue.fields['Data:Date'] | niceDate }}</div>
        </div> -->
        <div v-if="showLogo || showHeader" class="Capsid-logo ">
          <img v-if="issue.fields['Cover:url'] && issue.fields['Cover:showOnIssue']" class="Capsid-cover --stub" 
               :src="issue.fields['Cover:url']" alt="Capsid and Tail"
          >
          <div v-if="showLogo && !issue.fields['Cover:showOnIssue']" class="     Capsid-masthead Capsid-section _margin-center _padding 
               _padding-bottom-none-i " >
            <img alt="Capsid & Tail" src="~/static/cnt.png" width="84">
          </div>
        </div>
        <div class="Capsid-header _font--1 _padding-left _padding-right _padding-top">
          <span class="Capsid-name _font-bold ">{{ issue.fields['Name'] }}</span> | 
          <span class="Capsid-date _right-sm">{{ issue.fields['Data:Date'] | niceDate }}</span>
        </div>

        <h1 class="Capsid-title _padding" v-html="$md.strip($md.render(issue.fields['Data:Title'] || ''))" />
        <div v-if="authors" class="Capsid-author-main _padding-left _padding-right">
          <div v-for="item of authors" :key="item.id" class="_inline-block _margin-right">
            <!-- <span class="_flex-row">
              <img v-if="item.fields['ProfileImage']" :src="item.fields['ProfileImage'][0].thumbnails.small.url" class="--profile">
              <img v-else :src="`https://dl.airtable.com/.attachmentThumbnails/5f73211953262a41d993a9cd077a4ec9/370c6e95`" class="--profile" height="42" width="42">
              <div class="_font-normal _padding-left-half _align-vertically">{{ item.fields['Name'] }}</div>
            </span> -->
            <span>
              <img v-if="item.fields['ProfileImage']" :src="item.fields['ProfileImage'][0].thumbnails.small.url" class="--profile _v-middle">
              <img v-else :src="`https://dl.airtable.com/.attachmentThumbnails/5f73211953262a41d993a9cd077a4ec9/370c6e95`" class="--profile _v-middle" height="42" width="42">
              <span class="_font-normal _padding-left-half _v-middle">{{ item.fields['Name'] }}</span>
            </span>
          </div>
        </div>
        <div class="Capsid-lede _padding" v-html="$md.strip($md.render(issue.fields['Data:Lede'] || ''))" />
      </nuxt-link>
    </div>

    <div v-else class="_height-100 " >
      <nuxt-link :key="issue.id"
                 :to="`/capsid/${issue.fields.Slug}`"
                 :class="isFeatured ? '--featured' :''"
                 class="Capsid-Stub-item _card _padding _height-100 _margin-none _block">
        <!-- <div class="Capsid-header _font--1 _color-mono-90 _grid-2 _grid-gap-small">
          <div class="Capsid-name">{{ issue.fields['Name'] }}</div>
          <div class="Capsid-date _right-sm">{{ issue.fields['Data:Date'] | niceDate }}</div>
        </div> -->
        <div class="Capsid-stub-meta _flex-1">
          <div class="Capsid-header _font--1 _grid-gap-small">
            <span class="Capsid-name _font-bold ">{{ issue.fields['Name'] }}</span> | 
            <span class="Capsid-date _right-sm">{{ issue.fields['Data:Date'] | niceDate }}</span>
          </div>
          <h4 class="Capsid-title" v-html="$md.strip($md.render(issue.fields['Data:Title'] || ''))" />
          <div v-if="authors" class="Capsid-author-main _margin-bottom ">
            <div v-for="item of authors" :key="item.id" class="_inline-block _margin-right">
              <span class="_flex-row">
                <img v-if="item.fields['ProfileImage']" :src="item.fields['ProfileImage'][0].thumbnails.small.url" class="--profile">
                <img v-else :src="`https://dl.airtable.com/.attachmentThumbnails/5f73211953262a41d993a9cd077a4ec9/370c6e95`" class="--profile" height="42" width="42">
                <div class="_font-normal _padding-left-half _align-vertically">{{ item.fields['Name'] }}</div>
              </span>
            </div>
          </div>
        </div>
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
    'authors': Array,
    'isFeatured': Boolean,
    'showLogo': Boolean,
    'showHeader': Boolean,
  },

  data: function () {
    return {
    }
  },

  computed: {
    mainAuthor() {
      if(!this['authors'])
        return undefined

      return this['authors'][0]
    },
  },

  methods: {
  }

}
</script>

