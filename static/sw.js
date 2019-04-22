importScripts('/_nuxt/workbox.4c4f5ca6.js')

workbox.precaching.precacheAndRoute([
  {
    "url": "/_nuxt/043f355529f4611106a1.js",
    "revision": "db9aa01e30a5da2d0cee13d3a5b3dd49"
  },
  {
    "url": "/_nuxt/0d4ad4f5749a600abb73.js",
    "revision": "d0b7060001ff760b182f836530928767"
  },
  {
    "url": "/_nuxt/1281288fb72b0108c739.js",
    "revision": "712d2e2163108553b8c3d56e7fa24e9e"
  },
  {
    "url": "/_nuxt/2b714c5c72ae5478ffe7.js",
    "revision": "a1b00ae9f8adbbd1d059a95ec501becf"
  },
  {
    "url": "/_nuxt/3c0bebea712e5efcf8e2.js",
    "revision": "8218781bbf21777d3ed3acd82ea1984f"
  },
  {
    "url": "/_nuxt/4bcabc51425a43ea6d04.js",
    "revision": "42bb8998bcb30091502fafeca68a2039"
  },
  {
    "url": "/_nuxt/7555b73f99f1d6b870eb.js",
    "revision": "fcd8a4c82ac0b2c1e1f1fd05aa98f96b"
  },
  {
    "url": "/_nuxt/7733e33256c757a46241.js",
    "revision": "fdc3cbb85fd1482e6fb64505539b3b29"
  },
  {
    "url": "/_nuxt/7ca581c636cbd7fab768.js",
    "revision": "8bca26b97b6a2869a5473baff90a212e"
  },
  {
    "url": "/_nuxt/7d9b4d18e3061eec2e99.js",
    "revision": "60b93b9815f11d61cd175a5b8ba5cdd7"
  },
  {
    "url": "/_nuxt/8b43cdfcb261bb0cf1a7.js",
    "revision": "0fbbe811abb5ce57ca9066fd43382d96"
  },
  {
    "url": "/_nuxt/93a14c15ec1d9f81ebc8.js",
    "revision": "787694e233be261c94cf1a6fc4605a80"
  },
  {
    "url": "/_nuxt/a1324c521853e16eeaa0.js",
    "revision": "961431bcdb2d0b998cf17a1a073b6bf6"
  },
  {
    "url": "/_nuxt/aa0d8e03d18d055d1194.js",
    "revision": "61a89fd3cf32b7f43c89eaf6ca9a29aa"
  },
  {
    "url": "/_nuxt/cf63a5406839e3d2d553.js",
    "revision": "b1a9be098c2ea47da16af704d0e42aa7"
  },
  {
    "url": "/_nuxt/d65b041ea27eaf36580a.js",
    "revision": "0b91a2893e09c0988847877fd1559498"
  },
  {
    "url": "/_nuxt/db261e4ff8d6c2fc7d1a.js",
    "revision": "8dcc30ded2ddf4bb926145efed4e9e98"
  },
  {
    "url": "/_nuxt/dcb9659bb31750595f66.css",
    "revision": "288dda3c77e047c1b9476a152c17117d"
  },
  {
    "url": "/_nuxt/e806ca36f330a6175a24.js",
    "revision": "9997abe09a1155572a11a971a7518cc1"
  },
  {
    "url": "/_nuxt/eae7e2bb77fd08296ca9.js",
    "revision": "ce129b6275a91d1f517035fbab6b2189"
  },
  {
    "url": "/_nuxt/f47e1f757b036de6f8eb.js",
    "revision": "b14f25a12bb15563fe290b21761e6740"
  },
  {
    "url": "/_nuxt/f6d97ca5c10ab7f12693.js",
    "revision": "0791ff081b13282190e4a62a3d331bea"
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
