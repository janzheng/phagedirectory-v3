

// const search = function(_this) {
// 	const fn = _.debounce(function() {
// 	  // const url = `/search/${this.searchString}`

// 	  // const slug = this.$router.params.slug
// 	  const route = _this.$router.currentRoute
// 	  let base = 'hosts'

// 	  if(route.path == '/orgs' || route.path == '/people' || route.path == '/labs')
// 	    base = route.path

// 	  const url = `${base}?search=${_this.searchString}`

// 	  if(_this.searchString == "") { // empty string = clearing the search! can't ignore 
// 	    _this.$router.replace(base)
// 	    return true
// 	  }

// 	  _this.$router.replace(url)
// 	  _this.$store.dispatch("updateCreate", {
// 	    search: {
// 	      string: _this.searchString,
// 	      url: url,
// 	    }
// 	  })
// 	}, 300, {
// 	  trailing: true
// 	})

// 	return fn()
// }



export const dirSearch = function(_this) {
  // const url = `/search/${this.searchString}`

  // const slug = this.$router.params.slug
  const route = _this.$router.currentRoute
  let base = 'hosts'

  if(route.path == '/orgs' || route.path == '/people' || route.path == '/labs')
    base = route.path

  const url = `${base}?search=${_this.searchString}`

  if(_this.searchString == "") { // empty string = clearing the search! can't ignore 
    _this.$router.replace(base)
    return true
  }

  _this.$router.replace(url)
  _this.$store.dispatch("updateCreate", {
    search: {
      string: _this.searchString,
      url: url,
    }
  })
}