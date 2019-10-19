process.env.DEBUG = 'nuxt:*'
// process.env.NUXT_ENV_DEVALUE_LOG_LIMIT = -1
process.env.NUXT_ENV_DEVALUE_LOG_LEVEL = 'silent' // default is 'warn'


/*

  Forked from CoeurV2 / WODv2 4/14/2019

*/

import Cytosis from 'cytosis'

const pkg = require('./package')
const env = require('dotenv').config()

// note: nuxt requires Node 8+ to run properly 
// these are the default social sharing items
// make sure to use the Head component for generated data
const site_policy = '1.0.4' 

const site_ga = 'UA-109657404-1';
const site_segment = 'GhV3WTeK9v27sGfmNZdlO2rw1J2XWRE1';
const site_url = 'https://phage.directory';
const site_name = 'Phage Directory';
const site_title = 'Phage Directory';
const site_twitter = '@phagedirectory';
const site_twitter_creator = '@yawnxyz';
const site_color = '#374F6A';
const site_description = 'Phage Directory curates a database of phage labs, phages, and host strains to advance research and phage therapy.';

// const site_ico = '/ico_dull.png';
const site_ico = '/icon.png';
const site_image = '/share_img.png';
const site_search = 'index,follow';
const site_author = 'Jan Zheng';
const page_name = ''; // placeholder for the copy+paste

const site_fb = '409001986635448'; // phage directory fb id

// const airtable_api = 'keyAe6M1KoPfg25aO'; // cytosisreader@zeee.co handler
// const airtable_base = 'appYvj7j9Ta5I15ks'; // PDv3 repo
const airtable_api = process.env.PD_AIRTABLE_PUBLIC_API; 
const airtable_base = process.env.PD_AIRTABLE_PUBLIC_BASE;

// const db_api = 'keyAe6M1KoPfg25aO'; // cytosisreader@zeee.co handler
// const db_base = 'appZBUJQuXSUckq4d'; // PDv3 DB repo
const db_api = process.env.PD_AIRTABLE_DB_API; 
const db_base = process.env.PD_AIRTABLE_DB_BASE;

const analyze = false; // analyzer (webpack; turn off for prod)
const offline = false;
let mode = 'universal';
// let mode = 'spa' // FOR ZEIT: universal/ssr seems broken, but spa mode seems to work like surge
// 'spa' loads airtable dynamically
// 'static' only generates once / use npm run generate
// const mode = 'universal' // loads airtable during build-time only (any changes to airtable won't be reflected live)
if (process.env.MODE == 'spa') {
  console.log('[Config] Mode: SPA')
  mode = 'spa'
} else if (process.env.MODE == 'universal') {
  console.log('[Config] Mode: SSR / Universal')
  mode = 'universal'
}

const pd_env = process.env.PD_ENV || 'prod'; // Phage Directory 'stage' or 'prod' environment — stage is used for previewing profiles etc.
console.log('[Config] Environment:', pd_env)

const site_static = false; // if set to true, the client will never pull data 
let site_routes; // used for the generate process to save on airtable pulls
const api_url = process.env.API_URL;


// set up caching data
let useCytosisConfigCache = false
let useCytosisDataCache = false
let useCytosisPageCache = false

// in full production
if(pd_env=='prod' && mode=='universal') {
  useCytosisConfigCache = true
  useCytosisDataCache = true
  useCytosisPageCache = true
}

// on zeit now staging
if(pd_env=='stage' && mode=='universal') {
// if(pd_env=='stage') {
  useCytosisConfigCache = true
  useCytosisDataCache = true
  useCytosisPageCache = true
}

// use stage / SPA to test uncached previews `yarn dev-spa`
// use this mode to generate cache data as well



// export default (async function() {
export default {
  // let site_data
  // if (mode == 'universal') 
  //   site_data = await initData()

  // console.log('site_data:', site_data)

  // let obj = {api_url
  // export default {
  // mode: 'universal', // use this for deployment; need to rebuild the site every time airtable content changes
  mode: mode, // for development, or for real-time airtable changes
  env: {
    mode: mode,
    pd_env: pd_env, // 'stage' or 'prod'
    site_fb: site_fb,
    api_url: api_url,
    airtable_api: airtable_api,  
    airtable_base: airtable_base,
    db_api: db_api,  
    db_base: db_base,

    useCytosisConfigCache: useCytosisConfigCache,  // pulls a cached version off lambda if config exists; pushes a cached version if it doesn't
    useCytosisDataCache: useCytosisDataCache,    // works like config caching but for airtable requests
    useCytosisPageCache: useCytosisPageCache,
    cache_timeout: pd_env == 'prod' ? 3000 : 20000, // dev now takes a long time to spin up sometimes 

    site_policy: site_policy,
    site_segment: site_segment,
    // ext_handler: 'https://wt-ece6cabd401b68e3fc2743969a9c99f0-0.sandbox.auth0-extend.com/PDv3-basic',
    // site_data: site_data,
    site_static: site_static,
  
    error_cytosis: 'The database is currently unavailable',
    error_unknown: 'A system error occurred. Please try refreshing. If this continues to happen, please contact us at support@phage.directory',
  },

  server: {
    port: 1919, // default: 3000
    // host: '0.0.0.0', // default: localhost
  },

  render: {
    // https://nuxtjs.org/api/configuration-render#resourcehints
    // disable prefetch of all the pages; saves bg download data
    // resourceHints: false,

    // Content-Security-Policy
    // https://nuxtjs.org/api/configuration-render#csp
    // csp: {
    //   hashAlgorithm: 'sha256',
    //   allowedSources: undefined,
    //   policies: undefined
    // }
  },


  /*
      Headers of the page
      'hid' is a 'head identifier' and used as a unique key
  */
  head: {
    title: site_title,
    htmlAttrs: {
      lang: 'en-US',
    },
    meta: [

      { charset: 'utf-8' },
      // { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1' }, // max-scale prevents auto-zoom on mobile, may prevent zoom
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },

      { hid: 'description', name: 'description', content: site_description },
      { hid: 'theme-color', name: 'theme-color', content: site_color },

      { hid: 'search-google', name: 'robots', content: site_search },
      { hid: 'search-robots', name: 'googlebot', content: site_search },
      // { hid: 'nositelinkssearchbox', name: 'google', content: 'nositelinkssearchbox' },
      // { hid: 'notranslate', name: 'google', content: 'notranslate' },

      // Page-Specific

      // Facebook
      // In SSR, FB screws up when you prepopulate like this
      // Also, headmatter plugin doesn't run properly on SSR either
      // <meta property="fb:app_id" content="123456789">
      { hid: 'fb-app_id', property: 'fb:app_id', content: site_fb },
      // <meta property="og:url" content="http://example.com/page.html">
      { hid: 'og-url', property: 'og:url', content: site_url + '/' + page_name },
      // <meta property="og:type" content="website">
      { hid: 'og-type', property: 'og:type', content: 'website' },
      // <meta property="og:title" content="Content Title">
      { hid: 'og-title', property: 'og:title', content: site_title },
      // <meta property="og:image" content="http://example.com/image.jpg"> 
      // FB & Twitter work best with: 1200 X 675 
      { hid: 'og-image', property: 'og:image', content: site_url + site_image },
      // <meta property="og:description" content="Description Here">
      { hid: 'og-description', property: 'og:description', content: site_description },
      // <meta property="og:site_name" content="Site Name">
      { hid: 'og-site_name', property: 'og:site_name', content: site_name },
      // <meta property="og:locale" content="en_US">
      { hid: 'og-locale', property: 'og:locale', content: 'en_US' },
      // <meta property="article:author" content="">
      { hid: 'article-author', property: 'article:author', content: site_author },

      // Twitter Card
      // <meta name="twitter:card" content="summary"> > summary or summary_large_image
      { hid: 'twitter-card', property: 'twitter:card', content: 'summary' },
      // <meta name="twitter:site" content="@site_account">
      { hid: 'twitter-site', property: 'twitter:site', content: site_twitter },
      // <meta name="twitter:creator" content="@individual_account">
      { hid: 'twitter-creator', property: 'twitter:creator', content: site_twitter_creator },
      // <meta name="twitter:url" content="http://example.com/page.html">
      { hid: 'twitter-url', property: 'twitter:url', content: site_url + '/' + page_name },
      // <meta name="twitter:title" content="Content Title">
      { hid: 'twitter-title', property: 'twitter:title', content: site_title },
      // <meta name="twitter:description" content="Content description less than 200 characters">
      { hid: 'twitter-description', property: 'twitter:description', content: site_description },
      // <meta name="twitter:image" content="http://example.com/image.jpg">
      { hid: 'twitter-image', property: 'twitter:image', content: site_url + site_image },

    ],
    link: [

      // <!-- Helps prevent duplicate content issues -->
      // <link rel="canonical" href="http://example.com/">
      { hid: 'canonical', rel: 'canonical', href: site_url+'/' },

      { rel: 'icon', type: 'image/png', href: site_ico }, // <link rel="icon" sizes="192x192" href="/path/to/icon.png">
      { rel: 'apple-touch-icon', href: site_ico }, // default resolution is 192x192 <link rel="apple-touch-icon" href="/path/to/apple-touch-icon.png">
      { rel: 'mask-icon',  href: site_ico, color: site_color}, // <link rel="mask-icon" href="/path/to/icon.svg" color="blue"> <!-- Safari Pinned Tab Icon -->
      // { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Work+Sans:400,600,700' }
    ],
  },

  /*
  ** Customize the progress bar color
  */
  loading: { 
    color: site_color,
    continuous: true, 
  },

  /*
  ** Build configuration
  */

  plugins: [
    { src: '~/plugins/syslog.js' },
    { src: '~/plugins/sizeup.js' },
    // { src: '~/plugins/cite.js' },
    // '~plugins/filters.js',nuxtjs/google-tag-manager
    // { src: '~/plugins/plugintest.js', ssr: false }
    // { src: '~/plugins/lazyload.js', ssr: false },
    // { src: '~/plugins/pictureswipe.js', ssr: false },
    // { src: '~/plugins/paypal.js', ssr: false },
    // { src: '~/plugins/disqus.js', ssr: false },
    // { src: '~/plugins/twitter.js', ssr: false }, // very heavy
    { src: '~/plugins/markdownit.js' },
    { src: '~/plugins/cytosis.js' },
    { src: '~/plugins/date.js' },
    { src: '~/plugins/readtime.js' },
    { src: '~/plugins/headmatter.js' },
    { src: '~/plugins/slugify.js' },
    { src: '~plugins/vue-scrollto.js' },
    // https://github.com/Developmint/nuxt-purgecss
    // { src: '~/plugins/dynamicData.js' } // done as middleware instead

    { src: '~/plugins/drift.js', mode: 'client' }, // ssr: false is deprecated
    { src: '~/plugins/scrollspy.js', mode: 'client' },
    { src: '~/plugins/segment.js', mode: 'client' },

    // needs to be loaded last (after all the other analytics etc.)
    { src: '~/plugins/policy.js', mode: 'client' },
  ],

  modules: [
    // '@nuxtjs/font-awesome',
    // ['@nuxtjs/google-analytics', {
    //   id: site_ga,
    //   // disabled: true // gdpr, policy.js enables it: https://medium.com/dailyjs/google-analytics-gdpr-and-vuejs-e1bd6affd2b4
    // }],
    // ['@nuxtjs/google-tag-manager', { 
    //   id: 'GTM-WCR3X43' 
    // }],
    '@nuxtjs/robots',
    '@nuxtjs/dotenv',
    // ['@nuxtjs/pwa'],
    ['nuxt-leaflet', { /* module options */ }],

    // segment handles all analytics — use the plugin instead!!
    // ['nuxt-segment-analytics', { id: site_segment, useRouter: true }],
    // 'nuxt-purgecss', // purges markdown-based css... womp
  ],

  serverMiddleware: [
    // these won't work unless running nuxt as a server
    // Will register file from project api directory to handle /api/* requires
    // { path: '/feed.xml', handler: '~/api/rss.js' },
    // { path: '/capsid.xml', handler: '~/api/rss.js' },
    // '~serverMiddleware/override404.js' // https://medium.com/finn-no/hacking-nuxts-404-logic-for-maximum-awesome-and-easy-proxying-e4efaeb03d66
  ],

  // @nuxtjs/robots
  robots: {
    UserAgent: pd_env =='stage' ? '*' : '',
    Disallow: pd_env =='stage' ? '/' : '',
  },

  manifest: {
    name: 'Phage Directory',
    short_name: 'phagedirectory',
    display: 'standalone',
    // start_url: 'https://phage.directory',
    theme_color: site_color,
    background_color: '#FFFFFF',
    lang: 'en',
    // icons: PWAIcons
  },

  // workbox: {
  //   globPatterns: ['**/*.{js,css}', '**/img/*'],
  //   // offlinePage: '/404.html',
  //   generate: {
  //     fallback: true
  //   },
  //   // this breaks SPA mode, and is super aggressive, but makes offline mode work really well
  //   // runtimeCaching: [
  //   //   {
  //   //     urlPattern: 'https://api.airtable.com/v0/appSCAap8SWbFRtu0/.*',
  //   //     handler: 'cacheFirst',
  //   //     method: 'GET',
  //   //     strategyOptions: {cacheableResponse: {statuses: [0, 200]}}
  //   //   },
  //   //   // {
  //   //   //     urlPattern: 'https://fonts.googleapis.com/.*',
  //   //   //     handler: 'cacheFirst',
  //   //   //     method: 'GET',
  //   //   //     strategyOptions: {cacheableResponse: {statuses: [0, 200]}}
  //   //   // },
  //   //   // {
  //   //   //     urlPattern: 'https://fonts.gstatic.com/.*',
  //   //   //     handler: 'cacheFirst',
  //   //   //     method: 'GET',
  //   //   //     strategyOptions: {cacheableResponse: {statuses: [0, 200]}}
  //   //   // },
  //   // ]
  // },

  build: {
    // helps cache busting
    // filenames: {
    //   app: ({ isDev }) => isDev ? '[name].js' : '[chunkhash].js',
    //   // chunk: ({ isDev }) => isDev ? '[name].js' : '[chunkhash].js',
    //   css: ({ isDev }) => isDev ? '[name].css' : '[contenthash].css'
    // },

    // https://willbrowning.me/reducing-the-vendor-bundle-size-in-nuxt-js/
    analyze: analyze, // use --analyze instead for visualizer
    minimize: true,
    // cache: true,
    extractCSS: true, // moves css out to its own file in gen
    optimizeCSS: true,

    // splitChunks: {
    //   layouts: true
    // },

    babel: {
      sourceType: "unambiguous",
      presets: [
        ['@babel/preset-env', {
          // debug: true,
          // useBuiltIns: 'usage',
          targets: {
            "browsers": ["> 1%", "ie >= 11", "not ie <= 8"]
            // "browsers": ["> 1%", "last 2 versions", "ie >= 11", "not ie <= 8"]
          }
        }]
      ],
      plugins: ['@babel/plugin-transform-arrow-functions', '@babel/plugin-syntax-dynamic-import', '@babel/plugin-transform-typeof-symbol', '@babel/plugin-transform-runtime'],
    },
    // explicitly transpile these
    transpile: ['cytosis', 'markdownit', 'markdown-it-attrs'],
    // transpile: ['cytosis', 'vuex-cache', 'markdownit'],

    // extend(config, ctx) {
    //   // Run ESLint on save
    //   if (ctx.isDev && ctx.isClient) {
    //     config.module.rules.push({
    //       enforce: "pre",
    //       test: /\.(js|vue)$/,
    //       loader: "eslint-loader",
    //       exclude: /(node_modules)/
    //     })
    //   }
    // }
  },


  // error messages for the Nuxt error page
  // note: Zeit Now replaces with its own error page
  // messages: {
  //   loading: 'Loading...',
  //   error_404: 'This page could not be found',
  //   server_error: 'Server error',
  //   nuxtjs: 'Nuxt.js',
  //   back_to_home: 'Back to the home page',
  //   server_error_details:
  //     'An error occurred in the application and your page could not be served. If you are the application owner, check your logs for details.',
  //   client_error: 'Error',
  //   client_error_details:
  //     'An error occurred while rendering the page. Check developer tools console for details.',

  //   server_error: 'Oh no! Server error',
  //   nuxtjs: 'Is this Nuxt.js?',
  //   back_to_home: 'Cmon, back home!',
  //   server_error_details: 'Uh uh :| Server errorrrrr',
  // },

  css: [
    // coeur style guide
    // '@/assets/css/settings.scss',
    // '@/node_modules/coeur/styles/index.scss', // this imports EVERYTHING; is going to be huge; overrides 'settings'

    // main project styles
    '@/assets/css/main.scss'
  ],

  router: {
    // middleware: 'pageload', // middleware added on the template
    extendRoutes (routes, resolve) {
      // capsid should resolve anything from phages
      // to people and orgs; easier w/ a uniform id resolver

      routes.push(


        // phage futures temporary
        {
          name: 'phage futures temporary',
          path: '/phagefutures',
          component: resolve(__dirname, 'pages/events/phagefutureseu.vue')
        },
          {
            name: 'phage futures feedback',
            path: '/phagefutures/feedback',
            component: resolve(__dirname, 'pages/phagefutureseu-questions.vue')
          },


        {
          name: 'join / signup',
          path: '/signup',
          component: resolve(__dirname, 'pages/apply/index.vue')
        },
          {
            name: 'join', // same form as researchers / combined
            path: '/join',
            component: resolve(__dirname, 'pages/apply/index.vue')
          },
          // {
          //   name: 'join / professionals', // same form as researchers / combined
          //   path: '/apply/professional',
          //   component: resolve(__dirname, 'pages/apply/person.vue')
          // },
          // {
          //   name: 'join / researcher', // same form as researchers / combined
          //   path: '/apply/researcher',
          //   component: resolve(__dirname, 'pages/apply/person.vue')
          // },
          // {
          //   name: 'join / research', // same form as researchers / combined
          //   path: '/apply/research',
          //   component: resolve(__dirname, 'pages/apply/person.vue')
          // },


        {
          name: 'hosts / phages',
          path: '/phages',
          component: resolve(__dirname, 'pages/hosts.vue')
        },

        {
          name: 'orgs list short',
          path: '/orgs',
          component: resolve(__dirname, 'pages/dir/orgs.vue')
        },
          {
            name: 'orgs list',
            path: '/organizations',
            component: resolve(__dirname, 'pages/dir/orgs.vue')
          },

        {
          name: 'people list',
          path: '/people',
          component: resolve(__dirname, 'pages/dir/people.vue')
        },
          {
            name: 'people profiles',
            path: '/people/:slug*',
            component: resolve(__dirname, 'pages/dir/peopleProfile.vue')
          },

        {
          name: 'labs list',
          path: '/labs',
          component: resolve(__dirname, 'pages/dir/labs.vue')
        },

        {
          name: 'events timeline tool slug+passcode',
          path: '/events/:event/:slug/:passcode',
          component: resolve(__dirname, 'pages/events/posttimeline.vue')
        },

        {
          name: 'alerts / misspelling',
          path: '/alert',
          component: resolve(__dirname, 'pages/alerts.vue')
        },

        {
          name: 'capsid & tail tips/ideas',
          path: '/capsid/tips',
          component: resolve(__dirname, 'pages/capsid/ideas.vue')
        },
        {
          // Dynamic Template Router
          // catches all routes and attempts to find a template
          // throws error if it can't
          name: 'capsid & tail router',
          path: '/capsid/:slug*',
          component: resolve(__dirname, 'pages/routers/r-capsid.vue')
        },
        {
          // Dynamic Template Router
          // catches all routes and attempts to find a template
          // throws error if it can't
          name: 'capsid & tail router',
          path: '/capsidnew/:slug*',
          component: resolve(__dirname, 'pages/routers/r-capsid-new.vue')
        },
        {
          name: 'capsid & tail email generator',
          path: '/capsidemail/:slug*',
          component: resolve(__dirname, 'pages/routers/r-capsid-email.vue')
        },
        {
          name: 'community router',
          path: '/community/:slug*',
          component: resolve(__dirname, 'pages/routers/r-atom.vue')
        },
        {
          name: 'jobs router',
          path: '/jobs/:slug*',
          component: resolve(__dirname, 'pages/routers/r-atom.vue')
        },

        {
          // Insights publication router
          name: 'insights router',
          path: '/insights/:slug',
          component: resolve(__dirname, 'pages/routers/r-insights.vue')
        },

        {
          // Profile Editor / Magic Links + password protection
          name: 'profile editor slug+passcode',
          path: '/profile/edit/:slug/:passcode',
          component: resolve(__dirname, 'pages/profile/edit.vue')
        },
          {
            // Profile Editor / Magic Links + password protection
            // just a :slug could be typo, capsid, or idk
            // future: use auth to handle these
            name: 'profile editor slug',
            path: '/profile/edit/:slug',
            component: resolve(__dirname, 'pages/profile/edit.vue')
          },

        {
          // Dynamic Template Router
          // catches all routes and attempts to find a template
          // throws error if it can't
          name: 'node router',
          path: '/:slug*',
          component: resolve(__dirname, 'pages/routers/r-node.vue')
        },
      )
    },

  },
  generate: {
    // 250 / 4 = ~5min deploy
    interval: 50, // slow down api calls // https://nuxtjs.org/api/configuration-generate/
    fallback: true, // true if you want to use '404.html' — for surge, use false if you want to use 200 spa fallback
    concurrency: 8, // reduce server strain
    routes: async function (callback) {

      const airKey = airtable_api
      const airBase = airtable_base

    //   // generate template routes
      console.log('[generator]: fetch pages/templates cytosis')
      let _cytosis = await new Cytosis({
        airKey, 
        airBase, 
        tableQuery: 'everything-published',
        caller: 'Generator',
      })

      let routeList = []

      // routes for C&T article pages
      let manuscripts = _cytosis.tables['Manuscripts'].sort((a,b) => new Date(b.fields['Data:Date']) - new Date(a.fields['Data:Date']))
      const latestManuscripts = manuscripts.slice(0,7)
      // const latestManuscripts = manuscripts // everything
      // console.log('latest Manu:', latestManuscripts.length)

      for (let item of latestManuscripts) {
        // console.log('manu loop', item.fields['Data:Date'], ' - ', item.fields['Slug'])
        if(item.fields['Slug'])
          routeList.push(`/capsid/${item.fields['Slug']}`)
      }
      // only process the last few to save time

      // build Jobs detail pages
      // for (let jobs of site_routes.tables['Jobs']) {
      //   if(jobs.fields['Slug'])
      //     routeList.push(`/jobs/${jobs.fields['Slug']}`)
      // }

      console.log('[generator] routes: ', routeList)
      callback(null, routeList)
    }
  }

}

//   return obj
// })()



