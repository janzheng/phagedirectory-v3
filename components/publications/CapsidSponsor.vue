
<!-- 

  Capsid — Sponsor section

 -->


<template>
  <div class="Capsid-item _padding _margin-none _shadow-1 _card" >
    <h6 class="_font-small">Sponsor</h6>
    <div class="_flex-1 _md-p_fix" v-html="$md.render(atom.fields['Markdown'] || '')" />
    <!-- <div v-if="atom.fields['Data:Tags']" class="_margin-top-half" >
      <span v-for="item of atom.fields['Data:Tags']" :key="item" :class="item == 'Sponsor' || item == 'Promotion' ? '--sponsor' : ''" class="Capsid-item-tag _tag" >{{ item }}</span>
    </div> -->
  </div>

<!-- 
          <div class="_md-p_fix" v-html="$md.render(sponsor.fields['Markdown'] || '')" />
          <div v-if="sponsor.fields['Tags']" class="_margin-top-half" >
            <span class="Capsid-item-tag _tag --sponsor">Sponsor</span>
          </div> -->
</template>

<script>

// import { mapState } from 'vuex'

export default {
  props: {
    'atom': Object
  },
}
</script>

