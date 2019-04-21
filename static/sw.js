importScripts('/_nuxt/workbox.4c4f5ca6.js')

workbox.precaching.precacheAndRoute([
  {
    "url": "/_nuxt/0933b89072dfdcd451df.js",
    "revision": "e35e28bfe68d5d6d4aff58ac261a3f5d"
  },
  {
    "url": "/_nuxt/1b41d5e060769d31504f.js",
    "revision": "461d4f801c84261f94b20348a5c6fe04"
  },
  {
    "url": "/_nuxt/26abef4fc5b9a9ebcb93.js",
    "revision": "6973237649829a3b107d02950c531568"
  },
  {
    "url": "/_nuxt/2937810f20c29bea92ae.js",
    "revision": "405ae4fc40985a634f413a93b406530d"
  },
  {
    "url": "/_nuxt/32ac2e8f7a2906e1aeb2.js",
    "revision": "45391c2faa501cd77a43d4c0c5a048a2"
  },
  {
    "url": "/_nuxt/611105748a579f8952ea.js",
    "revision": "a7cc7dd3f7d9d7d80a51d4087f3e0ba4"
  },
  {
    "url": "/_nuxt/78691ce72ae6961b8272.js",
    "revision": "21807ab4b23b56265a006b0ea6abceb2"
  },
  {
    "url": "/_nuxt/bfc64a8860f36b26f8e0.js",
    "revision": "e0e839daf6531f6c2a05d3234024a27d"
  },
  {
    "url": "/_nuxt/c02374158b986a1aa044.js",
    "revision": "44709a686a8a0a187beda98c225880b4"
  },
  {
    "url": "/_nuxt/c05d05cae6b4ff490ccb.js",
    "revision": "faebfe060d4c4c0746596a1f8ffb027c"
  },
  {
    "url": "/_nuxt/c241ce30a5046d1c8e3b.css",
    "revision": "79e96c151b7e2c913e7c7090fc949053"
  },
  {
    "url": "/_nuxt/ce7e518ca483dac3fd45.js",
    "revision": "5d2201009efbd3985a41a93ca8139ea0"
  },
  {
    "url": "/_nuxt/dc9e3844eea64b59cca1.js",
    "revision": "9b9084e18e7e669ac4540fa25eb57154"
  },
  {
    "url": "/_nuxt/e6525fc53036d4d5b673.js",
    "revision": "1631d17fde2221ef8390b69e30db0688"
  },
  {
    "url": "/_nuxt/faa69a27fc020d6f4813.js",
    "revision": "f3d8c0849757565176c4e2d78486831b"
  },
  {
    "url": "/_nuxt/img/2d8ffac.png",
    "revision": "2d8ffacc8bf31ab23c86a0e25f6b8b44"
  }
], {
  "cacheId": "PhageDirectory3",
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
