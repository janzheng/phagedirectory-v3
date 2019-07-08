


<script>

import axios from 'axios'

export default {

  components: {
  },

  // source is the form's json source
  props: {
    'post': Object,
    'url': String,
  },

  data: function () {
    return {
      loaded: false,
      response: null,
    }
  },

  computed: {
  },

  created() {
    // console.log('Axios fetching', this.url, ' with ', this.post)
    axios.post(this.url, this.post).then((response) => {
      this.response = response
      this.loaded = true
    })
  },

  methods: {
  },

  render() {
    if (!this.loaded) {
      return this.$scopedSlots.default({
        loading: true,
        response: null,
      }) 
    }
    
    return this.$scopedSlots.default({
      loading: false,
      response: this.response.data,
    })
  },
}
</script>

<style lang="scss" scoped>

</style>

