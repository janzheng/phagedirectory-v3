/*

  This writes content to airtable public pdv3 by way of the manager
  -- HAS to match the manager's status in order to grant edit access to Pdv3!
  
  Test with:
  {
    "slug": "test-person",
    "passcode": "TEST-person-PASS-code",
    "type": "GET" // if authorized, returns the data in the response 
            "UPDATE" // if authorized, writes on top of the airtable object
    "data": field data used to update Airtable
    "table": 'People', 'Organization', or wherever it should overwrite AT
  }

  - has to POST with the above data object
  - GET: if "authenticated" will return all the data from the (public) db to fill the form
  - UPDATE: if "authenticated" writes to Airtable w/ the included Data


  Todo:
  - add a rate limiter
  - add bcrypt alternative / a way to supply a new passcode or generate passcode,
    then hash them with bcrypt — https://www.npmjs.com/package/xkpasswd
*/


// const _ = require('lodash');
// const url = require('url');
// const http = require('http');
// const https = require('https');
const Mailgun = require('mailgun.js');

// https://github.com/auth0/webtask-tools
const Express = require('express');
const Cytosis = require('cytosis');
const uuid = require('uuid-by-string');
const cors = require('cors');
const bcrypt = require('bcrypt');
const fs = require('fs');
const util = require('util');
const sharp = require('sharp');
const axios = require('axios');
const http = require('http');
const async_readFile = util.promisify(fs.readFile);

const exo = require('./exo.js')

// https://stackoverflow.com/questions/13696148/node-js-create-folder-or-use-existing
function ensureDirSync (dirpath) {
  try {
    fs.mkdirSync(dirpath, { recursive: true })
  } catch (err) {
    if (err.code !== 'EEXIST') throw err
  }
}

try {
  ensureDirSync('/tmp/public')
  // console.log('[Profile] "tmp/public" directory created / existed')
} catch (err) {
  console.error(err)
}




const formData = require("express-form-data");

const app = new Express();
app.use(Express.json());

app.use(cors({
  origin: [
    'http://localhost:1919',
    'https://phage.directory',
    'https://www.phage.directory',
    'https://phagedirectory.yawnxyz.now.sh',
    'https://phagedirectory-spa.yawnxyz.now.sh',
  ]
}))


// express-form-data
// app.use(Express.static('tmp/public/'));
app.use(require('express').json());

const options = {
  uploadDir: '/tmp/public', //os.tmpdir(),
  // autoClean: true
};

// parse data with connect-multiparty. 
app.use(formData.parse(options));
// delete from the request all empty files (size == 0)
app.use(formData.format());
// change the file objects to fs.ReadStream 
app.use(formData.stream());
// union the body and the files
app.use(formData.union());













function loadProfile(capsId) {
  try {
    // console.log('ONE:', process.env.PD_AIRTABLE_PRIVATE_MGR_API, 'TWO:', process.env.PD_AIRTABLE_DB_BASE)
    const _cytosis = new Cytosis({
      airKey: process.env.PD_AIRTABLE_DB_API,
      airBase: process.env.PD_AIRTABLE_DB_BASE,
      tableQuery: 'Profile-editor',
      routeName: '[Timeline/loadProfile]',
      payloads: {
        keyword: capsId,
      },
    });
    return _cytosis;
  } catch(err) {
    console.error('[Timeline/loadProfile] Error:', err)
    return Promise.reject()
  }
}



function loadEvent(eventName) {
  try {
    // console.log('ONE:', process.env.PD_AIRTABLE_PRIVATE_MGR_API, 'TWO:', process.env.PD_AIRTABLE_DB_BASE)
    const _cytosis = new Cytosis({
      airKey: process.env.PD_AIRTABLE_DB_API,
      airBase: 'appEuZLle3bAy2g2g', // Live Public DB — hard coded to remain flexible
      tableQuery: 'event-single',
      routeName: '[Timeline/loadEvent]',
      payloads: {
        keyword: eventName,
      },
    });
    return _cytosis;
  } catch(err) {
    console.error('[Timeline/loadProfile] Error:', err)
    return Promise.reject()
  }
}

async function loadTimelineBase(event) {
  try {
    const _cytosis = await new Cytosis({
      airKey: process.env.PD_AIRTABLE_PRIVATE_MGR_API,
      airBase: 'appEuZLle3bAy2g2g', // Live Public DB — hard coded to remain flexible
      routeName: '[timeline.js/loadtimelineBase]',
    });
    return _cytosis;
  } catch(err) {
    console.error('[Timeline/loadTimelineBase] Error:', err)
    return Promise.reject()
  }
}

async function loadTimelineAuthor(authorslug, config) {
  try {
    const _cytosis = await new Cytosis({
      airKey: process.env.PD_AIRTABLE_DB_API,
      airBase: 'appEuZLle3bAy2g2g', // Live Public DB — hard coded to remain flexible
      routeName: '[timeline.js/loadTimelineAuthor]',
      tableQuery: 'author-single',
      config,
      payloads: {
        keyword: authorslug,
      },
    });
    return _cytosis;
  } catch(err) {
    console.error('[Timeline/loadTimelineAuthor] Error:', err)
    return Promise.reject()
  }
}

function loadManager(profileslug) {
  try {
    const _cytosis = new Cytosis({
      airKey: process.env.PD_AIRTABLE_PRIVATE_MGR_API,
      airBase: process.env.PD_AIRTABLE_PRIVATE_MGR_BASE,
      tableQuery: 'profile-readwrite',
      payloads: {
        keyword: profileslug,
      },
    });
    return _cytosis;
  } catch(err) {
    console.error('[Timeline/loadManager] Error:', err)
    return Promise.reject()
  }
}

















// 
//    API ENTRY POINTS
// 



// main entry
app.post('/api/timeline', async function(req, res, next) {

  try {
    const body = req.body; // object that contains the form and payload data
    // console.log('Incoming request:', body, body.type);
    console.log('Timeline request:', body.type);

    // Request: For the request to be processed, have to get the right Slug / Passcode combination
    //  Slug
    //  Passcode
    //  Type: GET || UPDATE
    //  Data: Field data to update Airtable

    // Retrieve data from Airtable DB
    if (body.type && body.type === 'GET') {
      // console.log('GETTING >>>>>>> ')

      try {
        let cytmgr = await loadManager(body.profileslug)
        cytmgr = Cytosis.strip(cytmgr)
        let mgrprofile = cytmgr.tables['ProfileManager'][0]

        if (
          mgrprofile &&
          mgrprofile.fields['LiveAccess'].includes(body.event) && 
          mgrprofile.fields['Passcode'] === body.passcode && 
          (mgrprofile.fields['Access'] === "Read" ||
            mgrprofile.fields['Access'] === "ReadWrite"
          )
        ) {
          try {
            const cytprofile = await loadProfile(mgrprofile.fields['capsID'])
            let profile = cytprofile.tables['People'][0]// || cytprofile.tables['Organizations'][0]
            profile = Cytosis.cleanRecord(profile)

            const eventcytosis = await loadEvent(body.event)
            let event = eventcytosis.tables['Events'][0]// || cytprofile.tables['Organizations'][0]
            event = Cytosis.cleanRecord(event)

            const authorcytosis = await loadTimelineAuthor(body.profileslug, eventcytosis.config)
            let author = authorcytosis.tables['Authors'][0]// || cytprofile.tables['Organizations'][0]
            author = Cytosis.cleanRecord(author)


            let result = {
              author: author,
              event: event,
              payload: profile,
            }
            res.send(result);
          } catch(err) {
            console.error('[Timeline] Error getting Profile information:', err)
            next(err)
          }
        } else {
          console.error('[Timeline] Profile not found')
          res.send(undefined);
        }
      } catch(err) {
        console.error('[Timeline] Error getting Manager table:', err)
        next(err)
      }

    } 







    // update an existing record
    else if (body.type && body.type === 'UPDATE') {
      try {

        let timeline = JSON.parse(body.timeline)
        // console.log('UPDATING >>>>>>> postImage files ? ', profile, profile.slug, profile.passcode)

        console.log('Posting to Timeline >>>>>> :', timeline)

        let cytmgr = await loadManager(timeline.profileslug)
        cytmgr = Cytosis.strip(cytmgr)
        let mgrprofile = cytmgr.tables['ProfileManager'][0]
        let postImage, postImageUrl, writeStr

        if (
          mgrprofile &&
          mgrprofile.fields['LiveAccess'].includes(timeline.eventslug) && 
          mgrprofile.fields['ProfileSlug'] === timeline.profileslug && 
          mgrprofile.fields['Passcode'] === timeline.passcode && 
          mgrprofile.fields['Access'] === "ReadWrite"
        ) {

          // set the custom link as precedent
          if(timeline.postImage_link) {
            postImageUrl = timeline.postImage_link
          }

          if(!postImageUrl && req.files && req.files.postImage) {

            postImage = req.files.postImage.path.substring(12) // remove the tmp/public part of the path
            postImageUrl = req.protocol + '://' + req.get('host') + '/api/timeline/' + postImage
            // console.log('AVATAR LINK >>>>>>> ', req.files.postImage.path , ' // ' , postImageUrl)

            // let image, newimage
            try {
              // writeStr = fs.createWriteStream(req.files.avatar); // req.files.avatar.pipe()
              // image = sharp(req.files.avatar);
              const pipeline = sharp();

              pipeline.metadata().then(metadata => {

                if(timeline.postImage == "square") {
                  let length = metadata.width < metadata.height ? metadata.width : metadata.height
                  if (length > 900)
                    length = 900

                  console.log(`[Profile] Resizing image to ${length}x${length}`)
                  return pipeline.resize({
                    width: length,
                    // height: length, // actually square is pretty ugly; can use object-fit
                    withoutEnlargement: true,
                    fit: sharp.fit.inside,
                    // position: sharp.strategy.entropy
                  })
                  .png()
                  .toBuffer();
                } else {
                  let width = metadata.width
                  let density = 120

                  if(width > 900)
                    width = 900

                  if(metadata.format == 'svg') {
                    // improve density for svg // https://github.com/lovell/sharp/issues/729
                    // density = 72*width/16
                    return pipeline; // do nothing for svg
                  }

                  console.log('[Timeline] metadata:', metadata)
                  return pipeline.resize({
                    width: width,
                    // height: length, // actually square is pretty ugly; can use object-fit
                    withoutEnlargement: true,
                    // density: density
                    // fit: sharp.fit.inside,
                    // position: sharp.strategy.entropy
                  })
                  // .png()
                  .toFile(req.files.postImage.path, (err, info) => {  
                    if(err) {
                      console.error('[Timeline] Could not write image to file', err, info)
                      return
                    }
                    console.error('[Timeline] Wrote image to file', req.files.postImage.path, ' errors:' , err, 'info:',  info)
                    // avatarUrl = avatarUrl// + '.png'
                  });
                  // slap .png to any file name... airtable doesn't support webp, svg, etc.
                  // .toBuffer();
                }

                // }
              }).then(function(data) {
                // fs.writeFileSync(req.files.avatar.path, data)
              });

              req.files.postImage.pipe(pipeline)
            } catch(err) {
              console.error('[Timeline] Error processing the image:', err)
              // next(err)
            }
          }

          try {
            console.log('Going to Save ::: ', timeline.data)
            console.log('Image ::: ', postImageUrl)

            let fields = {}

            fields['Status'] = ['Published']
            fields['Data:Type'] = 'Timeline'
            fields['Data:Twitter'] = timeline.data['Data:Twitter']
            fields['Data:Markdown'] = timeline.data['Data:Markdown']
            fields['Author'] = [timeline.authorId]
            fields['Event'] = [timeline.eventId]
            fields['Status'] = ['Published']

            if(postImageUrl) { 
              // add a Profile attachment image; please ref the Airtable API for Qs
              // the img is uploaded + written to /tmp/ then served dynamically
              fields['Data:Attachments'] = [ {
                'url': postImageUrl
              }]
            }

            // if no avatars are set and triggered to clear, we clear the profile
            if(!postImageUrl && timeline.postImage_clear) {
              fields['Data:Attachments'] = []
            }

            let sendpayload = [{
              // id: dbprofile.id,
              fields: fields,
            }]


            console.log(' >>>>>> final sendpayload :::::', sendpayload)

            // let response = await cytprofilesave.save(whiteprofile, profile.table, dbprofile.id, true)
            // let response = await Cytosis.saveArray(sendpayload, profile.table, cytprofilesave, false, true)
            // let base = cytosis.base
            let save = async function() {
              return new Promise(async function(resolve, reject) {
                let timelinebase = await loadTimelineBase()
                resolve(timelinebase.base('Timeline').create(sendpayload))
              })
            }
            let response = await save()
            console.log(' >>>>>> final response :::::', response)
            // console.log('[Timeline] Update saved:', response[0])
            response = Cytosis.cleanRecord(response[0])

            let result = {
              payload: response
            }

            // clear cache
            // http.get(req.protocol + '://' + req.get('host') + '/api/exocytosis/cache/clear');
            res.send(result);
          } catch(err) {
            console.error('[Timeline] Error Posting to timeline:', err)
            next(err)
          }
        } else {
          console.error('[Timeline] No profile found:', mgrprofile.fields)
          res.end('Couldn\'t find profile.');
        }
      } catch(err) {
        console.error('[Timeline] Error getting Manager table:', err)
        next(err)
      }

    }









    else {
      res.end('Jack Daniels tastes like bananas :(');
    }
  } catch(err) {
    console.error('[Timeline] General Error:', err)
    next(err)
  }

});



// example: http://localhost:2929/api/profile/0YyNcoB0cQ0-R1QbrVpliuVA.png
app.get('/api/timeline/:filename', async (req, res, next) => {
  console.log('[Timeline] Loading image ...')
  let filename = req.params.filename

  try {
    let path = '/tmp/public/'+filename

    // check for existence first
    if (fs.existsSync(path)) {
      let data = await async_readFile(path)
      res.writeHead(200, {'Content-Type': 'image'});
      console.log('[Timeline] Image loaded!')
      res.end(data); // Send the file data to the browser.
      // res.download(data)
    } else {
      console.error('[Timeline] No file found :')
      next()
    }

  } catch(err) {
    console.error('[Timeline] File could not be downloaded :', err)
    next()
  }
})





// error handling
app.use(function (err, req, res, next) {
  // All errors are already displayed elswehere
  console.error("[Timeline] General error:", err.stack);
  res.end(false);
});


module.exports = app








