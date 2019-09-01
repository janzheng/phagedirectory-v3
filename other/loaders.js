

// loads from a specific query / useful for transforming content
export async function loadQuery({ store, routeName, query, options, keyword, config, _key, _base, useDataCache, error}) {
  let data
  // todo: need some other way to keep track of what we've grabbed
  // esp. important for site generation

  // console.log('loadQuery triggered >>>>>>>>>>>>>>>>> ')
  // return error({statusCode: 500, message: "Test Error"})
  // error() doesn't work as a mechanism

  try {
    data = await store.dispatch('loadCytosis', {
      useDataCache,
      _key,
      _base,
      tableQuery: query,
      routeName,
      options,
      // grab the config / _cytosis from store if it's already been loaded
      config: store.state.config[_base || process.env.airtable_base] || undefined,
      payloads: {
        keyword: keyword
      },
    })
    return data
  } catch (err) {
    // error only works on client, which means for SSR this is never touched (will work on SPA tho)
    console.error("[loadQuery] Cytosis failed to load routeName/query/error >>>>>>>>>>> ", routeName, query, err)
    // throw new Error("[loadQuery] Database failed to load. ")
    // return Promise.resolve() // quietly fail?
    // this is the Nuxt error function — has to be passed in, and not always available
    
    // display error page (if Cytosis doesn't work, nothing's going to show on the site)
    if(error && (typeof error === "function")) {
      console.log('Redirecting to the error page ... ')
      error({statusCode: 500, message: process.env.error_cytosis})
      // throw new Error("[loadQuery] Database failed to load. ")
    } 
    // else {
    //   if(process.server) {
    //     // redirect to the homepage ('/') ?
    //     // window.location.replace('/')
    //     throw new Error("[loadQuery] Database failed to load. Shutting down app. ")
    //   }
    // }
    return undefined
  }
}

