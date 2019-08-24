

// loads from a specific query / useful for selective content
export async function loadQuery({ store, routeName, query, options, keyword, config, _key, _base}) {
  let data
  // todo: need some other way to keep track of what we've grabbed
  // esp. important for site generation
  // if(store.state && !store.state.Content) {
    
  data = await store.dispatch('loadCytosis', {
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
}

