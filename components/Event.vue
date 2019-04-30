
<template>

  <div class="Event _card --shadow _padding " >

    <div class="Event-header ">

      <div class="Event-date _font-small">
        <span>{{ atom.fields['Data:Date'] | niceDate }}</span>
        <span v-if="atom.fields['Data:DateEnd']" > – {{ atom.fields['Data:DateEnd'] | niceDate }}</span>
      </div>

      <div class="Event-title _font-bold _margin-top-half ">
        <a v-if="atom.fields['URL']" :href="atom.fields['URL']" target="_blank">
          <h5 v-if="atom.fields['Data:Title']" class="_inline _md-p_fix _padding-bottom-half" v-html="$md.strip($md.render( atom.fields['Data:Title'] || ''))" />
        </a>
        <h5 v-else class="_inline _md-p_fix _padding-bottom-half" v-html="$md.strip($md.render( atom.fields['Data:Title'] || ''))" />
      </div>
      <!-- 
        <div class="Event-tags _margin-bottom-half">
          <span v-for="item of atom.fields['Data:Tags']" :key="atom.id + item" class="Event-tag _tag">{{ item }}</span>
        </div> 
      -->

      <div class="Event-info _margin-bottom _margin-top">
        <div v-if="atom.fields['Data:Subtitle']" class="_font-bold _md-pfix" v-html="$md.render(atom.fields['Data:Subtitle'] || '')" />
        <div v-if="atom.fields['Data:Source']">
          {{ atom.fields['Data:Source'] }}
        </div>
      </div>
    </div>

    <div class="Event-content">
      <div v-html="$md.render(atom.fields['Markdown'] || '')" />
    </div>

    <!-- <div v-if="atom.fields['URL']" class="Event-action ">
      <a v-if="atom.fields['URL']" :href="atom.fields['URL']" class="Event-action-apply _button --short --outline _margin-bottom-none _margin-right-half" target="_blank">More Details</a>
      </span>
    </div> -->

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

  computed: {
  },

  mounted: async function () {
  },


  methods: {
  }

}
</script>

