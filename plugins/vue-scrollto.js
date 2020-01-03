import Vue from 'vue'
import VueScrollTo from 'vue-scrollto'

Vue.use(VueScrollTo)

Vue.component('vue-scrollto', VueScrollTo)

// this seems to crash, but if it's not injected
// it still works? #bug

// export default ({ app }, inject) => {
// export default ({ }, inject) => {
//   inject('scrollTo', VueScrollTo)
// }

