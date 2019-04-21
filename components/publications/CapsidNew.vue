
<!-- 

  Capsid — What's New

 -->


<template>
  <div class="Capsid-item Capsid-new _card _flex-col _height-100 _padding _margin-none" >
    <div class="_flex-1 _md-p_fix" v-html="$md.render(atom.fields['Markdown'] || '')" />
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

