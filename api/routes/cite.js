// get JSON citation from [url]/[doi]

const app = require('../app')
const cors = require('cors');
const Cite = require("citation-js");

app.use(require('express').json());

app.use(cors({
  origin: [
    'http://localhost:1919',
    'http://localhost:1919/capsid/',
    'https://phage.directory',
    'https://www.phage.directory',
    'https://phagedirectory.yawnxyz.now.sh',
    'https://phagedirectory-spa.yawnxyz.now.sh',
    'https://phagedirectory-staging.yawnxyz.now.sh',
  ]
}))



async function getCite(lookup) {
	// return await Cite.inputAsync(lookup);
	return await Cite.async(lookup);
}


// [url]/api/cite/[doi, etc.] — merely for fetching full citation
app.get("/api/cite/*", async (req, res, next) => {
  let input = req.params[0];
  // console.log('citation input:', input)
  let citation = await getCite(input);

  let result = {
    _source: input,
    _data: citation,
    citation: citation.format('citation'),
    bibtex: citation.format('bibtex', { format: 'html' }),
    apa: citation.format('bibliography', {
      format: 'html',
      template: 'apa',
      lang: 'en-US',
    }),
  };

	res.json(result);
});



// [url]/api/cite/[doi, etc.] — post data for citation, meant for C&T
app.post('/api/cite', async (req, res, next) => {
  try {
    // return res.json({'banana':true});
    

    const request = req.body;
    // const api_url = 'https://wt-ece6cabd401b68e3fc2743969a9c99f0-0.sandbox.auth0-extend.com/PDv3-cite'
    // console.log('[Cite] Building Citation (req) ...', request)
    

    // // pass it on to webtask........ :P 
    // // there's a bug on Zeit Now that prevents citation-js from being added
    // let citation = await axios.post(api_url, request)
    // // console.log('[Cite] Citation received!', citation.config.data)
    // console.timeEnd(`/api/cite/`)

  	let citation = await getCite(request.source);

	  let result = {
	    _source: request,
	    _data: citation,
	    citation: citation.format('citation'),
	    bibtex: citation.format('bibtex', { format: 'html' }),
	    apa: citation.format('bibliography', {
	      format: 'html',
	      template: 'apa',
	      lang: 'en-US',
	    }),
	  };


		return res.json(result);

  } catch(err) {
    console.error('[Cite] Error:', err)
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



module.exports = app
