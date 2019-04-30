importScripts('/_nuxt/workbox.4c4f5ca6.js')

workbox.precaching.precacheAndRoute([
  {
    "url": "/_nuxt/003371b3f0d909e01ac0.js",
    "revision": "5f5d1f44e05c9db1a011ab92af0e4113"
  },
  {
    "url": "/_nuxt/0c4a695e14a371df1edd.js",
    "revision": "d816bb40599bc721ab8abd6a7b51d844"
  },
  {
    "url": "/_nuxt/1cca19dc34466132e890.js",
    "revision": "a55c358df623a538a5b735125e732ceb"
  },
  {
    "url": "/_nuxt/36d9a189a23f2a046543.js",
    "revision": "1a05bb6bb876457bab156248c83301dc"
  },
  {
    "url": "/_nuxt/5987244f1322bcabeb2b.js",
    "revision": "550c07d7181f78c66e09e19939701e75"
  },
  {
    "url": "/_nuxt/5a9f8dfbb3ee22c6d3ce.js",
    "revision": "8506376fdab92f3b63596b6fe52ee631"
  },
  {
    "url": "/_nuxt/6a6303a2a89c66a985b2.js",
    "revision": "c1f8ef6172e8989104e444d224078beb"
  },
  {
    "url": "/_nuxt/70702d0b7d21606c0e05.js",
    "revision": "147d568ef69566b92b5450768d7eb5e9"
  },
  {
    "url": "/_nuxt/7beb25b6068fa86b057d.js",
    "revision": "2c6acf722d0cc40649d3dec0a7c06cdb"
  },
  {
    "url": "/_nuxt/8929719fdccd2bce8d3c.js",
    "revision": "b460d450171db3502a425f34e8661252"
  },
  {
    "url": "/_nuxt/899ab5b3f981739877c9.css",
    "revision": "a70c465da40b40a7a441bddea77f8447"
  },
  {
    "url": "/_nuxt/8ee3ddf0e3eaf03b65b4.js",
    "revision": "9f66ea712c20f135a6ea7bda6535ec8e"
  },
  {
    "url": "/_nuxt/907816768b7f9f084f40.js",
    "revision": "05e01b83d8d89751d0baad173dbb787f"
  },
  {
    "url": "/_nuxt/a839c42b8dff9d6cfe12.js",
    "revision": "7e3dec5069d5b38d58c9570866d80d27"
  },
  {
    "url": "/_nuxt/ad02f9f1d45869ed628e.js",
    "revision": "7e742b469b22a647d5dc3a626dd0c215"
  },
  {
    "url": "/_nuxt/b1bff0c77709cb1ba850.js",
    "revision": "9c019beb9b89b42976c594b2d50a0fcb"
  },
  {
    "url": "/_nuxt/b29d2b0a5d323677e82d.js",
    "revision": "9a095996d3029df703bac45762809c40"
  },
  {
    "url": "/_nuxt/b616fc11b9448db20f1d.js",
    "revision": "00004f9cb784d99a05f46930b918b882"
  },
  {
    "url": "/_nuxt/c3d4429528eb6f1dd146.js",
    "revision": "db31f4b0140b11ee242fb3f678287667"
  },
  {
    "url": "/_nuxt/d53ff123c00543a9ef69.js",
    "revision": "a654c22aaac60f95d9eeef1297889443"
  },
  {
    "url": "/_nuxt/dc00d842719bbd58a2da.js",
    "revision": "7cee039996893d51020a128bf42829d6"
  },
  {
    "url": "/_nuxt/f6bc65d6b465b1a3a9f6.js",
    "revision": "6dafc5e717477875f1417c45ebd9baf5"
  },
  {
    "url": "/_nuxt/ff5347d3563adad88756.js",
    "revision": "c40914b49924d698a994262959c9d256"
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
