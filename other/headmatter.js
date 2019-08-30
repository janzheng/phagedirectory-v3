
/*

  Helps create Head meta objects for nuxt / vue-meta

*/

// export default ({ app }, inject) => {
export function headMatter({
  title, 
  description,
  imageUrl,
  url,
  author, 
  twitterCreator, // author's twitter
}) {
  let head = {
    title: title,
    meta: [],
  }

  head['title'] = title 
  head['meta'].push({ hid: 'og-title', property: 'og:title', content: `${title}` })
  head['meta'].push({ hid: 'twitter-title', property: 'twitter:title', content: `${title}` })

  // set image / card for sharing
  head['meta'].push({ hid: 'og-image', property: 'og:image', content: `${imageUrl}` })
  head['meta'].push({ hid: 'twitter-image', property: 'twitter:image', content: `${imageUrl}` })

  head['meta'].push({ hid: 'twitter-description', property: 'twitter:description', content: `${description}` })
  head['meta'].push({ hid: 'og-description', property: 'og:description', content: `${description}` })
  head['meta'].push({ hid: 'description', name: 'description', content: `${description}` })

  // set page url
  head['meta'].push({ hid: 'og-url', property: 'og:url', content: `${url}` })
  head['meta'].push({ hid: 'twitter-url', property: 'twitter:url', content: `${url}` })

  // set author
  head['meta'].push({ hid: 'article-author', property: 'article:author', content: `${author}` })

  // // set twitter author / creator
  head['meta'].push({ hid: 'twitter-creator', property: 'twitter:creator', content: `${twitterCreator}` })

  return head
}



