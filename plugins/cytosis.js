
// 
// Used to inject $cytosis into nuxt, for use w/ the static methods
// 

// import Cytosis from 'cytosis'
import Cytosis from '~/other/cytosis.js'
// import Cytosis from '~/node_modules/cytosis/src/cytosis.js'

// export default ({ app }, inject) => {
export default ({ error }, inject) => {

  Cytosis['check'] = function(tableArray, message = 'The database is currently offline.') {
    // returns true when there's an error
    // used on a page; helper that checks if a given table exists (or is an array), if not, throw an error page
    // the data most likely fails when the data doesn't exist / hasn't been loaded
    // usage on a page:
    /*
      if (this.$cytosis.check([
        this.$store.state['Content']
      ])) return {}
    */

    let hasErrors
    tableArray.map((table) => {
      if(!table || !table.length) {
        hasErrors = true
      }
    })
    if(hasErrors) {
      error({statusCode: 'Cytosis', message})
      return true
    }
  }

  inject('cytosis', Cytosis)
  inject('cyt', Cytosis)
}
