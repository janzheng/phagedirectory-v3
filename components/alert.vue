
<!-- 

  Signup for Alerts for footer and alerts page

 -->
<template>

  <div class="Alert _card --shadow _padding _margin-bottom" >
    <!-- Atom: {{ atom }} -->
    <h4>{{ atom.fields['Name'] }}</h4>
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

