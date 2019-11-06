/*

  Creates an RSS feed for Capsid & Tail
  - uses redirect to get phage.directory/feed.xml

  Usage:

    Post to this endpoint with a string that looks like: (bibtex format)
    const source =  `
      @article{${this.issue.fields['Slug']}${date.getFullYear()},
        author = {${authorNames.join(' and ')}},
        date = {${date.getFullYear()}},
        day = {${date.getDay()}},
        month = {${date.getMonth()}},
        title = {{${this.issue.fields['Data:Title:String']}}},
        journal = {Capsid & Tail},  
        publisher = {Phage Directory},
        number = {${this.issue.fields['Data:Issue']}},
        url = {${this.issue.fields['URL']}},
      }
    `

*/

const app = require('../app')

// weird Now error prevents requiring citation-js
// need to proxy the webtask lambda

// const Cite = require('citation-js')
// const Cite = require('citation-js')
// import Cite from 'citation-js'
// import Cite from './../citation.min.js'

// const Cytosis = require('cytosis')
const cors = require('cors');
const axios = require('axios');

// const Cytosis = require('../../other/cytosis.js');
// app.use(express.static('tmp'));

app.use(require('express').json());

app.use(cors({
  origin: [
    'http://localhost:1919',
    'https://phage.directory',
    'https://www.phage.directory',
    'https://phagedirectory.yawnxyz.now.sh',
    'https://phagedirectory-spa.yawnxyz.now.sh',
  ]
}))

// example: http://localhost:2929/api/exocytosis/config/delete
// app.get('/api/cite', (req, res, next) => {
//   res.send('BANANARAMA LAMA WAMA')
// })


// parse object to string and write the respose
// const writeJSON = function(res, obj) {
//   let objJSON;
//   if (typeof obj === 'object') objJSON = JSON.stringify(obj);
//   else objJSON = '{}';

//   res.writeHead(200, { 'Content-Type': 'application/json' });
//   res.write(objJSON);
// };

// function loadCytosis(req) {
//   const table = 'capsid-feed';
//   // console.log('cytosis loading... searching for tableQuery:', table);

//   const _cytosis = new Cytosis({
//     airKey: req.webtaskContext.secrets.airtable_api,
//     airBase: req.webtaskContext.secrets.airtable_base,
//     tableQuery: table,
//   });
//   // console.log('cytosis loaded... ');
//   return _cytosis;
// }





// main entry // THIS IS THE PROXY!!
// better to get citation-js working natively 
app.post('/api/cite', async function(req, res, next) {
  try {
    console.time(`/api/cite/`)
    const request = req.body;
    const api_url = 'https://wt-ece6cabd401b68e3fc2743969a9c99f0-0.sandbox.auth0-extend.com/PDv3-cite'
    // console.log('[Cite] Building Citation ...', request)
    
    // pass it on to webtask........ :P 
    // there's a bug on Zeit Now that prevents citation-js from being added
    let citation = await axios.post(api_url, request)
    // console.log('[Cite] Citation received!', citation.config.data)
    console.timeEnd(`/api/cite/`)
    res.send(citation.data)
  } catch(err) {
    console.log('[Cite] Error:', err)
    next()
  }
  // let citation = new Cite(request.source);
  // let citation = Cite.asyncCite(request.source)
  // let citation = Cite.async('Q30000000')

  // console.log('citation:', citation)

  // Should implicitly display
  // let result = {
  //   citation: citation.format('citation'),
  //   bibtex: citation.format('bibtex', { format: 'html' }),
  //   apa: citation.format('bibliography', {
  //     format: 'html',
  //     template: 'apa',
  //     lang: 'en-US',
  //   }),
  // };
  // supported: https://citation.js.org/api/tutorial-output_formats.html
  // apa (default)
  // vancouver
  // harvard1

  // writeJSON(res, result);
  // res.end();
  // res.send(result)
});



// error handling
app.use(function (err, req, res, next) {
  // All errors are already displayed elswehere
  // console.error("[EXO:ERROR]", err.stack);
  res.end(false);
});

module.exports = app



