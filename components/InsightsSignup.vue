
<template>

  <div class="Insights-cta _card _padding --brand " >

    <slot />

    <!-- List of signed up people — they're in the PD Live DB -->
    <!-- <Cytosis
      apikey="keyAe6M1KoPfg25aO"
      base="appEuZLle3bAy2g2g"
      route-name="{Insights:index}"
      query="evergreen-2019-signups"
    >
      <template #default="{ response }">
        <div v-if="response && response.tables && response.tables['Signups'].length > 0" >
          <div class="Insights-commits _card --white _padding">
            <h3 class="--title">Signups</h3>
            <div v-for="item of response.tables['Signups']" :key="item.id">
              <span>{{ item.fields['Name'] }}</span> <span v-for="tag of item.fields['Tags']" :key="tag.id" class="_tag" >{{ tag }}</span>
            </div>
          </div>
        </div>
      </template>
    </Cytosis> -->

    <!-- Sign up flow -->
    <div class="Insights-signup">
      <NodeForm :src="form"/>
      <!-- <div class="_flex-row">
        <button class="_button CTA --multiline _padding-i _flex-1" @click="toggleForm(1)">I can publish now</button>
        <button class="_button CTA --multiline _padding-i _flex-1" @click="toggleForm(2)">I can publish <br>within two months</button>
        <button class="_button CTA --multiline _padding-i _flex-1 _margin-right-none" @click="toggleForm(3)">I can publish <br>within six months</button>
      </div>

      <div v-if="form==1" class="Insights-beta _margin-top">
        <NodeForm :src="formOne"/>
      </div>
      <div v-if="form==2" class="Insights-beta _margin-top">
        <NodeForm :src="formTwo"/>
      </div>
      <div v-if="form==3" class="Insights-beta _margin-top">
        <NodeForm :src="formThree"/>
      </div> -->
    </div>

  </div>

</template>


<script>

import NodeForm from '~/components/render/NodeForm.vue'
// import Cytosis from '~/components/experiments/Cytosis.vue'

export default {

  components: {
    NodeForm,
    // Cytosis
  },

  props: {
    form: Object,
    // formOne: Object,
    // formTwo: Object,
    // formThree: Object,
  },

  data: function () {
    return {
      // form: 0,
    }
  },

  computed: {
  },

  mounted: async function () {
  },


  methods: {
    // toggleForm(num) {
    //   if(this.form == num)
    //     this.form = 0
    //   else
    //     this.form = num
    // }
  }

}
</script>

