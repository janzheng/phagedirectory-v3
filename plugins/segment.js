
import Vue from 'vue'
// import Segment from 'analytics-node' // segment
import VueSegmentAnalytics from 'vue-segment-analytics'


/*
  note that segment doesn't track anything automatically

  mounted () {
    this.$analytics.identify('f4ca124298', {
      name: 'Michael Bolton',
      email: 'mbolton@initech.com'
    })
    this.$analytics.track('Signed Up', { plan: 'Enterprise' })
    this.$analytics.page('Pricing');
  }

*/

export default ({env, router}, inject) => {

  // console.log('segg key: ', env.site_segment)
  // const segment = new Segment(env.site_segment);

  const initSegment = function() {
    // docs: https://github.com/segmentio/analytics-vue
    Vue.use(VueSegmentAnalytics, {
      id: env.site_segment,
      router // Optional`
    })

    console.log('[Using Segment]')
    // inject('segment', segment)
    // seems goofy, but this lets us standardize segment calls
    // also note segment is sent here b/c it can't exist on server
    let segment = function({segment, type, event, data, log}) {
      console.log('[Segmentizing]', event, log? log:'')
      // console.log('segmentizing!', type, segment)
      if(data && data['path']) {
        data['url'] = 'https://phage.directory' + data['path']
      }
      segment[type](event, data)
    }

    inject('segmentize', segment)
  }

  inject('initSegment', initSegment)
  inject('segmentize', ()=>{})
}
