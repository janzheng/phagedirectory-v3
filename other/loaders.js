

// loads from a specific query / useful for selective content
export async function loadQuery({env, store, routeName, query, options, keyword, _key, _base}) {
  let data
  // todo: need some other way to keep track of what we've grabbed
  // esp. important for site generation
  // if(store.state && !store.state.Content) {

  data = await store.dispatch('loadCytosis', {
    env,
    _key,
    _base,
    tableQuery: query,
    caller: routeName,
    options,
    payloads: {
      keyword: keyword
    },
  })
  // }
  return data
}

