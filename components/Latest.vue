
<template>

  <div class="Latest" >
    <div class="Latest-container ">
      <div v-for="item of atoms" :key="item.id" class="Latest-atom --img">
        <!-- {{ item.fields }} -->
        <div v-if="item.fields['Atom:Type'] == 'Alert'" class="Latest-alert">
          <Alert class="_padding" :atom="item" />
        </div>
        <div v-if="item.fields['Atom:Type'] == 'Update'" class="Latest-update">
          <CapsidNew class="_padding" :atom="item" />
        </div>
        <div v-else-if="item.fields['Atom:Type'] == 'Job'" class="Latest-job">
          <CapsidJob class="_padding" :atom="item" />
        </div>
        <div v-else-if="item.fields['Atom:Type'] == 'Community'" class="Latest-community">
          <CapsidCommunity class="_padding" :atom="item" />
        </div>
      </div>

    </div>
  </div>

</template>


<script>

// import { mapState } from 'vuex'
import Alert from '~/components/Alert'
// import CapsidAlert from '~/components/publications/CapsidAlert'
import CapsidNew from '~/components/publications/CapsidNew'
import CapsidJob from '~/components/publications/CapsidJob'
import CapsidCommunity from '~/components/publications/CapsidCommunity'

export default {

  components: {
    Alert,
    // CapsidAlert,
    CapsidNew,
    CapsidJob,
    CapsidCommunity,
  },

  props: {
    atoms: Array,
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

