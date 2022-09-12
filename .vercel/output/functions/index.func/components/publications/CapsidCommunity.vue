
<!-- 

  Capsid — Community

 -->

<template>
  <div class="Capsid-item Capsid-new _card _color-bg-white _padding _margin-none" >
    <!-- <div v-if="atom.fields['Data:Date']" class="Capsid-item-header" >
      <div class="_md-p_fix _font-small _margin-bottom-half" >{{ atom.fields['Data:Date'] | niceDate }}</div>
    </div> -->
    <div class="_flex-1">
      <h4 v-if="atom.fields['Data:Title']" class="" v-html="$md.strip($md.render(atom.fields['Data:Title'] || ''))" />
      <div v-if="atom.fields['Data:Source']" class="" v-html="$md.render(atom.fields['Data:Source'] || '')" />
      <div v-if="atom.fields['Data:Subtitle']" v-html="$md.render(atom.fields['Data:Subtitle'] || '')" />
      <div v-if="atom.fields['Markdown']" v-html="$md.render(atom.fields['Markdown'] || '')" />
    </div>
    <div v-if="atom.fields['Data:Tags']" class="Capsid-item-taglist _margin-top-half" >
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

