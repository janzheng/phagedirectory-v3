

// loads from a specific query / useful for transforming content
export async function loadQuery({ store, routeName, query, options, keyword, config, _key, _base, useDataCache, error}) {
  let data
  // todo: need some other way to keep track of what we've grabbed
  // esp. important for site generation
  // if(store.state && !store.state.Content) {
  // throw new Error("[loadQuery] TEST ERROR ")

  // console.log('loadQuery triggered >>>>>>>>>>>>>>>>> ', error)
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
    if(error && (typeof error === "function")) {
      error({statusCode: 500, message: process.env.error_cytosis})
    }
    if(process.server) {
      throw new Error("[loadQuery] Cytosis failed to load >>>>>>>>>>>>>>>>> ")
    }
    console.error("Cytosis error:", routeName, err)
    return undefined
  }
}

