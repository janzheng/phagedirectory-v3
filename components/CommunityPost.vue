
<template>

  <div :class="atom.fields['Data:Status']" class="CommunityPost _card _padding " >

    <div class="CommunityPost-header ">

      <div class="_grid-1-auto _align-vertically _margin-bottom-half _grid-gap-small">
        <div>
          <span v-if="atom.fields['Data:Categories']" class="CommunityPost-type _tag --nowrap --highlight">
            {{ atom.fields['Data:Categories'][0] }}
          </span>
          <span v-for="item of atom.fields['Data:Tags']" :key="atom.id + item" class="CommunityPost-tag _tag --nowrap">{{ item }}</span>
        </div>
        <div class="CommunityPost-date _right-sm _font-small">
          <span>Posted {{ atom.fields['Data:Date'] | dateTo }}</span>
        </div>
      </div>

      <div class="CommunityPost-title _font-bold _margin-top-2 _margin-bottom">
        <h3 v-if="atom.fields['Data:Title']" class="_inline _md-p_fix _padding-bottom-half" v-html="$md.strip($md.render( atom.fields['Data:Title'] || ''))" />
      </div>

      <!-- <div class="CommunityPost-tags _margin-bottom-half">
        <span v-for="item of atom.fields['Data:Tags']" :key="atom.id + item" class="CommunityPost-tag _tag">{{ item }}</span>
      </div> -->

      <div class="CommunityPost-info _margin-bottom ">
        <div v-if="atom.fields['Data:Source']"><strong>{{ atom.fields['Data:Source'] }}</strong></div>
        <div v-if="atom.fields['Data:Subtitle']" v-html="$md.render(atom.fields['Data:Subtitle'] || '')" />
        <!-- <div v-if="atom.fields['Location']">Location: <strong>{{ atom.fields['Location'] }}</strong></div> -->
        <!-- <div v-if="atom.fields['Org']" class="CommunityPost-org">Organization: 
          <strong><a v-if="atom.fields['OrgUrl']" :href="atom.fields['OrgUrl']">{{ atom.fields['Org'] }}</a> <span v-else>{{ atom.fields['Org'] }}</span></strong>
        </div> -->
        <!-- <div v-if="atom.fields['URL']" class="_wordbreak">Website: <a :href="atom.fields['URL']"><strong>{{ atom.fields['URL'] }}</strong></a></div> -->
      </div>
    </div>

    <div class="CommunityPost-content">
      <div v-html="$md.render(atom.fields['Markdown'] || '')" />
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

  mounted: async function () {
  },

  methods: {
  }

}
</script>

