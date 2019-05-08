import Vue from 'vue'
import VueSegmentAnalytics from 'vue-segment-analytics'



export default ({env}, inject) => {

  const initSegment = function() {
    Vue.use(VueSegmentAnalytics, {
      id: env.site_segment,
      // router // Optional`
    })
    inject('segment', VueSegmentAnalytics)
  }

  inject('initSegment', initSegment)
}
