
<!-- 

  Capsid — Community

 -->

<template>
  <div class="Capsid-item Capsid-new _card _color-bg-white _padding _margin-none" >
    <div v-if="atom.fields['Data:Date']" class="Capsid-item-header" >
      <div class="_md-p_fix _font-small _margin-bottom-half" >{{ atom.fields['Data:Date'] | niceDate }}</div>
    </div>
    <div class="_flex-1">
      <h4 class="" v-html="$md.strip($md.render(atom.fields['Data:Title'] || ''))" />
      <div class="" v-html="$md.render(atom.fields['Data:Source'] || '')" />
      <div v-html="$md.render(atom.fields['Data:Subtitle'] || '')" />
      <div v-html="$md.render(atom.fields['Markdown'] || '')" />
    </div>
    <div v-if="atom.fields['Data:Tags']" class="_margin-top-half" >
      <span v-for="item of atom.fields['Data:Tags']" :key="item" :class="item == 'Sponsor' || item == 'Promotion' ? '--sponsor' : ''" class="Capsid-item-tag _tag" >{{ item }}</span>
    </div>
  </div>
</template>

<script>

// import { mapState } from 'vuex'

export default {
  props: {
    'atom': Object
  },
}
</script>



<!-- 

<div v-for="post of getCommunity(issue)" v-if="post && post.fields['isPublished']" :key="post.fields['Title']" class="Capsid-community-item" >
  <div v-if="post.fields['PostedDate']" class="Capsid-community-itemheader" >
    <span v-if="post.fields['PostedDate']" class="_md-p_fix _font-small _margin-bottom-half" >{{ post.fields['PostedDate'] | niceDate }}</span>
  </div>

  <div v-if="getPostStatus(post) != 'Expired' && post.fields['Title']">
    <h5 class="Capsid-community-title _padding-top-half _inline-block" v-html="$md.strip($md.render( post.fields['Title'] || ''))" />
  </div>
  <div v-if="post.fields['URL'] || post.fields['Location'] || post.fields['PersonName'] || post.fields['Org'] " class="CommunityPost-info _margin-bottom">
    <div v-if="post.fields['PersonName']">Name: <strong>{{ post.fields['PersonName'] }}</strong></div>
    <div v-if="post.fields['Location']">Location: <strong>{{ post.fields['Location'] }}</strong></div>
    <div v-if="post.fields['Org']" class="CommunityPost-org">Organization:
      <strong><a v-if="post.fields['OrgUrl']" :href="post.fields['OrgUrl']">{{ post.fields['Org'] }}</a><span v-else>{{ post.fields['Org'] }}</span></strong>
    </div>
    <div v-if="post.fields['URL']" class="_wordbreak">Website: <a :href="post.fields['URL']"><strong>{{ post.fields['URL'] }}</strong></a></div>
  </div>

  <div class="_md-p_fix" v-html="$md.render(post.fields['Markdown'] || '')" />
  <div v-if="post.fields['Tags'] || post.fields['Type']" class="_margin-top-half" >
    <span v-if="post.fields['Type']" class="CommunityPost-type _tag --highlight ">{{ post.fields['Type'] }}</span>
    <span v-for="tag of post.fields.Tags" :key="tag" :class="tag == 'Sponsor' || tag == 'Promotion' ? '--sponsor' : ''" class="Capsid-item-tag _tag" >{{ tag }}</span>
  </div>
</div>
 -->




