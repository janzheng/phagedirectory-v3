
<template>

  <div :class="atom.fields['Data:Status']" class="Alert _card _padding " >

    <div class="Alert-status" >
      <div class="_grid-auto-1-xs _align-vertically">
        <span :class="atom.fields['Data:Status']" class="Alert-status-tag" >{{ atom.fields['Data:Status'] }}</span>
        <span class="_right">{{ atom.fields['Data:Date'] | niceDate }}</span>
      </div>
    </div>

    <h4 v-html="$md.strip($md.render(atom.fields['Data:Title'] || ''))" />

    <div v-if="atom.fields['Data:Tags']"  class="Alert-tags" >
      <span v-for="(tag, i) of atom.fields['Data:Tags']" :key="`${i}+${tag}`" class="Alert-tag _tag" >
        {{ tag }}
      </span>
    </div>
    <div class="Alert-content " v-html="$md.render(atom.fields['Markdown'] || '')" />

  </div>

</template>


<script>

export default {

  props: {
    atom: Object,
  },

  data: function () {
    return {
    }
  },

  mounted: async function () {
  },

  methods: {
  }

}
</script>

