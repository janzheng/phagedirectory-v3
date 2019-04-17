importScripts('/_nuxt/workbox.4c4f5ca6.js')

workbox.precaching.precacheAndRoute([
  {
    "url": "/_nuxt/0f926257ee943a4fe5f4.js",
    "revision": "4cb27301dd006a4db2978ce5e050545a"
  },
  {
    "url": "/_nuxt/10ec927c238604a8d62a.js",
    "revision": "0c5b882e6ebfec6c7df73e474376461e"
  },
  {
    "url": "/_nuxt/2b721d5fe38e6e5acb75.js",
    "revision": "89f938f56a4ba7b6fe438e847c18ddeb"
  },
  {
    "url": "/_nuxt/37896bcefec92c57328a.js",
    "revision": "0054e6fcdeabc1518c6961e86371379a"
  },
  {
    "url": "/_nuxt/4f1094c706901d8110f1.js",
    "revision": "509cd5c80082f43605e96e523efdb684"
  },
  {
    "url": "/_nuxt/7df8e4f1114b1eeced30.js",
    "revision": "2c6bf5166eff8e6d24dd85d5d038557e"
  },
  {
    "url": "/_nuxt/a70b0aab2d7060421d65.js",
    "revision": "fc008d0b9835436421897a27f1f3b044"
  },
  {
    "url": "/_nuxt/c4676b1db6765c398e78.css",
    "revision": "f32e7bc186780d117fc5d5ad60ebfbd5"
  },
  {
    "url": "/_nuxt/ddbbd781d1a770cf69d1.js",
    "revision": "049bc9c4346dc7c3fee6b8a7cd8dec0b"
  },
  {
    "url": "/_nuxt/e1eb14262a5172f3a682.js",
    "revision": "fc1e7d5570dab64048314e3337dcdc6d"
  },
  {
    "url": "/_nuxt/eda2842aa5bc5a3067f0.js",
    "revision": "0da77671f4cc4b04e6a10f9d273db947"
  },
  {
    "url": "/_nuxt/f809f8cc1cb0cd3f3061.js",
    "revision": "cf25fec84a58326fa17b21670984bb2e"
  },
  {
    "url": "/_nuxt/img/2d8ffac.png",
    "revision": "2d8ffacc8bf31ab23c86a0e25f6b8b44"
  }
], {
  "cacheId": "wod2",
  "directoryIndex": "/",
  "cleanUrls": false
})

workbox.precaching.precacheAndRoute(['/404.html'])

workbox.clientsClaim()
workbox.skipWaiting()

workbox.routing.registerRoute(new RegExp('/_nuxt/.*'), workbox.strategies.cacheFirst({}), 'GET')

// offlinePage support
const strategy = workbox.strategies.networkOnly()
workbox.routing.registerRoute(new RegExp('/.*'), ({event}) => {
  return strategy.handle({event})
    .catch(() => caches.match('/404.html'))
})
