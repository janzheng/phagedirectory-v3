export default function() {
  return { 

    // searchSource: '',
    // searchString: '',
    // searchUrl: '',
    search: {},

    cytosisStore: {},
    config: {
      // 'airtable base key': {cytosis config object}
    },

    pageName: '',
    diffTopHeader: false, // auto to true
    navHeight: 100, // height of nav header, calculated in Header and used for better ux
    windowHeight: 100, // height of window inner height
    navOpen: false,

    // policy 
    policy: undefined, // client's policy
    latestPolicy: undefined, // latest official policy set by server
  }
}