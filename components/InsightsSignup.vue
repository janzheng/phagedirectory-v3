
<template>

  <div class="Insights-cta _card _padding " >

    <div class="Insights-intro" v-html="$md.render(intro || '')" />

    <!-- Sign up flow -->
    <div class="Insights-signup">
      <div class="_flex-row">
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
      </div>
      <!-- <div v-if="formBeta" class="Insights-beta _margin-top">
        <NodeForm :src="formBeta"/>
      </div> -->
    </div>

  </div>

</template>


<script>

import NodeForm from '~/components/render/NodeForm.vue'

export default {

  components: {
    NodeForm
  },

  props: {
    intro: String,
    formBeta: Object,
    formOne: Object,
    formTwo: Object,
    formThree: Object,
  },

  data: function () {
    return {
      form: 0,
    }
  },

  computed: {
  },

  mounted: async function () {
  },


  methods: {
    toggleForm(num) {
      if(this.form == num)
        this.form = 0
      else
        this.form = num
    }
  }

}
</script>

