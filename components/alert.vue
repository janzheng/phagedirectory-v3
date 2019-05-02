
<template>

  <div :class="atom.fields['Data:Status'][0]" class="Alert _card _padding " >

    <div class="Alert-status" >
      <div class="_grid-auto-1-xs _align-vertically">
        <span :class="atom.fields['Data:Status'][0]" class="Alert-status-tag" >{{ atom.fields['Data:Status'][0] }}</span>
        <span class="_right">{{ atom.fields['Data:Date'] | niceDate }}</span>
      </div>
    </div>

    <!-- {{ atom }} -->
    <h4 v-html="$md.render(atom.fields['Data:Title'] || '')" />

    <div class="Alert-tags">
      <span v-for="tag of atom.fields['Tags']" :key="tag" class="Alert-tag _tag" >
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

