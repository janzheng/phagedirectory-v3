
/*

  Helps create Head meta objects for nuxt / vue-meta
  > note: this doesn't run properly on server-side, maybe b/c of inject?
  > plz refer to the other/headmatter version for now

*/

// export default ({ app }, inject) => {
export default ({ }, inject) => {
  let head = {
    title: '',
    meta: [],
  }

  // set meta title
  head['setTitle'] = function (payload) {
    head['title'] = payload 
    head['meta'].push({ hid: 'og-title', property: 'og:title', content: `${payload}` })
    head['meta'].push({ hid: 'twitter-title', property: 'twitter:title', content: `${payload}` })
  }

  // set image / card for sharing
  head['setImage'] = function (payload) {
    head['meta'].push({ hid: 'og-image', property: 'og:image', content: `${payload}` })
    head['meta'].push({ hid: 'twitter-image', property: 'twitter:image', content: `${payload}` })
  }

  // set site description
  head['setDescription'] = function (payload) {
    head['meta'].push({ hid: 'twitter-description', property: 'twitter:description', content: `${payload}` })
    head['meta'].push({ hid: 'og-description', property: 'og:description', content: `${payload}` })
    head['meta'].push({ hid: 'description', name: 'description', content: `${payload}` })
  }

  // set page url
  head['setUrl'] = function (payload) {
    head['meta'].push({ hid: 'og-url', property: 'og:url', content: `${payload}` })
    head['meta'].push({ hid: 'twitter-url', property: 'twitter:url', content: `${payload}` })
  }

  // set author
  head['setAuthor'] = function (payload) {
    head['meta'].push({ hid: 'article-author', property: 'article:author', content: `${payload}` })
  }

  // set twitter author / creator
  head['setTwitterCreator'] = function (payload) {
    head['meta'].push({ hid: 'twitter-creator', property: 'twitter:creator', content: `${payload}` })
  }

  head['reset'] = function () {
    head['title'] = ''
    head['meta'] = []
  }

  head['get'] = function () {
    return {
      title: head.title,
      meta: head.meta
    }
  }

  inject('head', head)
}



