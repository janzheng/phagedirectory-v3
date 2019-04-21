
<!-- 

  Twitter share widget for C&T

 -->
<template>
  <div class="Capsid-share" >
    <div class="Capsid-twitter">
      <img src="https://abs.twimg.com/errors/logo23x19@2x.png" width="23px" height="19px" >
      <a :href="link" >{{ message }}</a>
    </div>
  </div>
</template>

<script>

// import { mapState } from 'vuex'

export default {
  props: {
    'link': String,
    'message': String
  },
}
</script>

