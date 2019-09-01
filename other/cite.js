

import Cite from 'citation-js'


export function cite(source) {
  let citation = new Cite(source);
  // let citation = Cite.asyncCite(source)

  let result = {
    _source: source,
    _data: citation,
    citation: citation.format('citation'),
    bibtex: citation.format('bibtex', { format: 'html' }),
    apa: citation.format('bibliography', {
      format: 'html',
      template: 'apa',
      lang: 'en-US',
    }),
  };

  return result
  // supported: https://citation.js.org/api/tutorial-output_formats.html
  // apa (default)
  // vancouver
  // harvard1

  // writeJSON(res, result);
  // res.end();
  // res.send(result)
}