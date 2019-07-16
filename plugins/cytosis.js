
// 
// Used to inject $cytosis into nuxt, for use w/ the static methods
// 

import Cytosis from 'cytosis'
// import Cytosis from '~/other/cytosis.js'
// import Cytosis from '~/node_modules/cytosis/src/cytosis.js'

// export default ({ app }, inject) => {
export default ({ }, inject) => {
  inject('cytosis', Cytosis)
}
