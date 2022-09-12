
// 
// Used to inject $cytosis into nuxt, for use w/ the static methods
// 

// import Cytosis from 'cytosis'
import Cytosis from '~/other/cytosis.js'
// import Cytosis from '~/node_modules/cytosis/src/cytosis.js'

// export default ({ app }, inject) => {
export default ({ }, inject) => {

  Cytosis['errorCheck'] = function(someObj) {
    // returns true when there's an error
    // used on a page; helper that checks if a given table exists (or is an array), if not, throw an error page
    // the data most likely fails when the data doesn't exist / hasn't been loaded
    // usage on a page:
    /*
      if (this.$cytosis.check([
        this.$store.state['Content']
      ])) return {}
    */

    if(typeof someObj === 'undefined') {
      return true
    }

    return false

    // probably bad practice to throw errors here
    // console.error('[Cytosis/check] Cytosis has errors!')
    // if(process.client) {
      // error({statusCode: 'Cytosis', message})
    // }
    // if(process.server) {
    //   throw new Error('[Cytosis/check] Cytosis has errors!')
    // }
  }

  inject('cytosis', Cytosis)
  inject('cyt', Cytosis)
}
