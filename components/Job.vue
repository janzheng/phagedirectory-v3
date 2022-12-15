
<template>

  <div :class="atom.fields['Data:Status']" class="Job _card _padding " >

    <div v-if="atom.fields['Data:Date'] || atom.fields['Data:Categories'] || atom.fields['Data:Type'] || atom.fields['Data:Tags']" class="Job-header">

      <div class="_grid-1-auto _align-vertically _margin-bottom _grid-gap-small">
        <div>
          <div v-if="atom.fields['Data:Type']" >
            <span class="Job-type _tag --highlight --nowrap _margin-bottom-none-i">{{ atom.fields['Data:Type'] }}</span><span v-if="atom.fields['Data:Categories']" class="Job-type _tag --nowrap _margin-bottom-none-i">
              {{ atom.fields['Data:Categories'][0] }}
            </span>
          </div>
          <div v-if="atom.fields['Data:Tags']" class="Job-tags">
            <span v-for="item of atom.fields['Data:Tags']" :key="atom.id + item" class="Job-tag _tag --nowrap">{{ item }}</span>
          </div>
        </div>
        <div class="Job-date _right-sm _font-small">
          <span>Posted {{ atom.fields['Data:Date'] | dateTo }}</span>
        </div>
      </div>

      <!-- <div v-if="atom.fields['Data:Title']" class="Job-title _font-bold _margin-top-half ">
        <h5 class="_inline _md-p_fix _padding-bottom-half" v-html="$md.strip($md.render( atom.fields['Data:Title'] || ''))" />
      </div> -->


      <div class="Job-info _margin-bottom _margin-top">

        <div v-if="getCover" class="Job-logo _margin-top-2 _margin-bottom-2" >
          <img :src="getCover" alt="Job logo" style="max-width: 240px">
        </div>
        
        <div v-if="atom.fields['Data:Source']">
          <strong>{{ atom.fields['Data:Source'] }}</strong>
        </div>
        <div v-if="atom.fields['Data:Subtitle']" v-html="$md.render(atom.fields['Data:Subtitle'] || '')" />
      </div>
    </div>

    <div class="Job-content">
      <!-- 2019 style w/ lots of metadata-->
      <div v-if="atom.fields['Data:Categories']" v-html="$md.render(atom.fields['Markdown'] || '')" />
      <!-- no metadata -->
      <div v-if="!atom.fields['Data:Categories']" v-html="$md.strip($md.render(atom.fields['Markdown'] || ''))" />
    </div>

    <div v-if="!isExpired && atom.fields['URL']" class="Job-action _margin-top">
      <a v-if="atom.fields['URL']" :href="atom.fields['URL']" class="Job-action-apply CTA --short --outline _margin-bottom-none-i _margin-right-half" target="_blank">Apply Here</a>
      <!-- <a v-else-if="atom.fields['Slug']" :href="`/jobs/${atom.fields['Slug']}`" class="Job-action-apply _button --short --outline _margin-bottom-none-i _margin-right-half" >Read more about the job</a> -->
      <!-- <span v-if="atom.fields['Data:DateEnd']" class="Job-expiry _font-small --nowrap">
        Last day to apply: <span class="_font-bold">{{ atom.fields['Data:DateEnd'] | niceDate }} </span>
      </span> -->
    </div>
    <div v-else>
      <span v-if="atom.fields['URL']" class="Job-action-apply _button --short --disabled --outline _margin-bottom-none _margin-right-half" >Job expired</span>
    </div>

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
    isExpired() {
      if( this.atom.fields['Data:Status'] == 'Expired' ) return true
      return undefined
    },

    getCover() {
      // currently only works for the first attachment
      if(this.atom.fields['Cover'])
        return this.atom.fields['Cover'][0]['url']
      return undefined
    },
  },

  mounted: async function () {
  },


  methods: {
  }

}
</script>

