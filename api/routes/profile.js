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
















// tmp/public/0YyNcoB0cQ0-R1QbrVpliuVA.png


// loads both org and people profiles
function loadProfile(capsId) {
  try {
    // console.log('ONE:', process.env.PD_AIRTABLE_PRIVATE_MGR_API, 'TWO:', process.env.PD_AIRTABLE_DB_BASE)
    const _cytosis = new Cytosis({
      airKey: process.env.PD_AIRTABLE_DB_API,
      airBase: process.env.PD_AIRTABLE_DB_BASE,
      tableQuery: 'Profile-editor',
      routeName: '[loadProfile]',
      payloads: {
        keyword: capsId,
      },
    });
    return _cytosis;
  } catch(err) {
    console.error('[Profile/loadProfile] Error:', err)
    return new Promise.reject()
  }
}

function loadProfileForSaving(capsId) {
  try {
    const _cytosis = new Cytosis({
      airKey: process.env.PD_AIRTABLE_PRIVATE_MGR_API,
      airBase: process.env.PD_AIRTABLE_DB_BASE,
      tableQuery: 'Profile-editor',
      routeName: '[loadProfile]',
      payloads: {
        keyword: capsId,
      },
    });
    return _cytosis;
  } catch(err) {
    console.error('[Profile/loadProfile] Error:', err)
    return new Promise.reject()
  }
}

function loadManager(slug) {
  try {
    const _cytosis = new Cytosis({
      airKey: process.env.PD_AIRTABLE_PRIVATE_MGR_API,
      airBase: process.env.PD_AIRTABLE_PRIVATE_MGR_BASE,
      tableQuery: 'profile-readwrite',
      payloads: {
        keyword: slug,
      },
    });
    return _cytosis;
  } catch(err) {
    console.error('[Profile/loadManager] Error:', err)
    return new Promise.reject()
  }
}

















// 
//    API ENTRY POINTS
// 



// main entry
app.post('/api/profile', async function(req, res, next) {

  try {
    const body = req.body; // object that contains the form and payload data
    // console.log('Incoming request:', body, body.type);
    console.log('Incoming request:', body.type);

    // Request: For the request to be processed, have to get the right Slug / Passcode combination
    //  Slug
    //  Passcode
    //  Type: GET || UPDATE
    //  Data: Field data to update Airtable

    // Retrieve data from Airtable DB
    if (body.type && body.type === 'GET') {
      // console.log('GETTING >>>>>>> ')

      try {
        let cytmgr = await loadManager(body.slug)
        cytmgr = Cytosis.strip(cytmgr)
        let mgrprofile = cytmgr.tables['ProfileManager'][0]

        if (
          mgrprofile &&
          mgrprofile.fields['Passcode'] === body.passcode && 
          (mgrprofile.fields['Access'] === "Read" ||
            mgrprofile.fields['Access'] === "ReadWrite"
          )
        ) {
          try {
            let cytprofile = await loadProfile(mgrprofile.fields['capsID'])
            // console.log('PDv3 Public DB:', cytprofile.tables)
            // return the cytosis info
            // res.end(cyt.fields);
            // console.log('Fields:', cytprofile.tables['People'][0].fields);
            // res.send(true);
            let profile = cytprofile.tables['People'][0] || cytprofile.tables['Organizations'][0]
            profile = Cytosis.cleanRecord(profile)

            let result = {
              meta: {
                table: cytprofile.tables['People'][0]? 'People' : 'Organizations'
              },
              payload: profile
            }
            res.send(result);
          } catch(err) {
            console.error('[Profile] Error getting Profile information:', err)
            next(err)
          }
        } else {
          console.error('[Profile] Profile not found')
          res.send(undefined);
        }
      } catch(err) {
        console.error('[Profile] Error getting Manager table:', err)
        next(err)
      }

    } 







    // update an existing record
    else if (body.type && body.type === 'UPDATE') {
      try {

        let profile = JSON.parse(body.profile)
        // console.log('UPDATING >>>>>>> avatar files ? ', profile, profile.slug, profile.passcode)

        // console.log(' >>>>>> loading:', profile.slug)
        let cytmgr = await loadManager(profile.slug)
        cytmgr = Cytosis.strip(cytmgr)
        let mgrprofile = cytmgr.tables['ProfileManager'][0]
        let avatar, avatarUrl, writeStr

        if (
          mgrprofile &&
          mgrprofile.fields['Slug'] === profile.slug && 
          mgrprofile.fields['Passcode'] === profile.passcode && 
          mgrprofile.fields['Access'] === "ReadWrite"
        ) {

          if(req.files && req.files.avatar) {

            avatar = req.files.avatar.path.substring(12) // remove the tmp/public part of the path
            avatarUrl = req.protocol + '://' + req.get('host') + '/api/profile/' + avatar
            // console.log('AVATAR LINK >>>>>>> ', req.files.avatar.path , ' // ' , avatarUrl)

            // let image, newimage
            try {
              // writeStr = fs.createWriteStream(req.files.avatar); // req.files.avatar.pipe()
              // image = sharp(req.files.avatar);
              const pipeline = sharp();

              pipeline.metadata().then(metadata => {
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
                .webp()
                .toBuffer();
                // }
              }).then(function(data) {
                fs.writeFile(req.files.avatar.path, data)
              });

              req.files.avatar.pipe(pipeline)
            } catch(err) {
              console.error('[Profile] Error processing the image:', err)
              // next(err)
            }
          }

          try {
            let cytprofilesave = await loadProfileForSaving(mgrprofile.fields['capsID'])
            let dbprofile = cytprofilesave.tables['People'][0] || cytprofilesave.tables['Organizations'][0]
            
            if(avatarUrl) { 
              // add a Profile attachment image; please ref the Airtable API for Qs
              // the img is uploaded + written to /tmp/ then served dynamically
              profile.data['Profile'] = [ {
                'url': avatarUrl
              }]
            }
            console.log(' >>>>>> final data :::::', profile.data)

            let response = await cytprofilesave.save(profile.data, profile.table, dbprofile.id)
            response = Cytosis.cleanRecord(response)

            let result = {
              meta: {
                table: profile.table
              },
              payload: response
            }

            // console.log('[Profile] Saving worked!')
            res.send(result);
          } catch(err) {
            console.error('[Profile] Error saving profile:', err)
            next(err)
          }
        } else {
          console.error('[Profile] No profile found')
          res.end('Couldn\'t find profile.');
        }
      } catch(err) {
        console.error('[Profile] Error getting Manager table:', err)
        next(err)
      }

    }









    // reset the password
    // strat: supply a magic link, they create a new password, it gets bcrypted and stored,
    // remove the magic link passcode, so the magic link stops working, and their new link
    // uses email and user id

    // TODO: work on this later, not sure if this is a good strategy — ppl generally want a
    // persisting magic link
    
    // else if (body.type && body.type === 'PASSWORD') {
    //   try {

    //     let avatar, avatarUrl, writeStr
    //     let profile = JSON.parse(body.profile)
    //     console.log('RESETTING >>>>>>> avatar files ? ', profile, profile.slug, profile.passcode)

    //     if(req.files && req.files.avatar) {

    //       avatar = req.files.avatar.path.substring(12) // remove the tmp/public part of the path
    //       avatarUrl = req.protocol + '://' + req.get('host') + '/api/profile/' + avatar
    //       // console.log('AVATAR LINK >>>>>>> ', req.files.avatar.path , ' // ' , avatarUrl)

    //       // let image, newimage
    //       try {
    //         // writeStr = fs.createWriteStream(req.files.avatar); // req.files.avatar.pipe()
    //         // image = sharp(req.files.avatar);
    //         const pipeline = sharp();

    //         pipeline.metadata().then(metadata => {
    //           let length = metadata.width < metadata.height ? metadata.width : metadata.height
    //           if (length > 900)
    //             length = 900
    //           console.log(`[Profile] Resizing image to ${length}x${length}`)
    //           return pipeline.resize({
    //             width: length,
    //             // height: length, // actually square is pretty ugly; can use object-fit
    //             withoutEnlargement: true,
    //             fit: sharp.fit.inside,
    //             // position: sharp.strategy.entropy
    //           })
    //           .webp()
    //           .toBuffer();
    //           // }
    //         }).then(function(data) {
    //           fs.writeFile(req.files.avatar.path, data)
    //         });

    //         req.files.avatar.pipe(pipeline)

    //         // req.files.avatar.pipe(sharp)
    //         // let metadata = await image.metadata()
    //         // console.log('Metadata of image :::', metadata)

    //         // await fs.writeFile(req.files.avatar.path, newimage)
    //         // console.error('[Profile] Error saving the processed image:', err)
    //         // next(err)
    //       } catch(err) {
    //         console.error('[Profile] Error processing the image:', err)
    //         // next(err)
    //       }

    //     }

    //     // console.log(' >>>>>> loading:', profile.slug)
    //     let cytmgr = await loadManager(profile.slug)
    //     cytmgr = Cytosis.strip(cytmgr)
    //     let mgrprofile = cytmgr.tables['ProfileManager'][0]

    //     if (
    //       mgrprofile &&
    //       mgrprofile.fields['Slug'] === profile.slug && 
    //       mgrprofile.fields['Passcode'] === profile.passcode && 
    //       mgrprofile.fields['Access'] === "ReadWrite"
    //     ) {
    //       try {
    //         let cytprofilesave = await loadProfileForSaving(mgrprofile.fields['capsID'])
    //         let dbprofile = cytprofilesave.tables['People'][0] || cytprofilesave.tables['Organizations'][0]
            
    //         if(avatarUrl) { 
    //           // add a Profile attachment image; please ref the Airtable API for Qs
    //           // the img is uploaded + written to /tmp/ then served dynamically
    //           profile.data['Profile'] = [ {
    //             'url': avatarUrl
    //           }]
    //         }
    //         console.log(' >>>>>> final data :::::', profile.data)

    //         let response = await cytprofilesave.save(profile.data, profile.table, dbprofile.id)
    //         response = Cytosis.cleanRecord(response)

    //         let result = {
    //           meta: {
    //             table: profile.table
    //           },
    //           payload: response
    //         }

    //         // console.log('[Profile] Saving worked!')
    //         res.send(result);
    //       } catch(err) {
    //         console.error('[Profile] Error saving profile:', err)
    //         next(err)
    //       }
    //     } else {
    //       console.error('[Profile] No profile found')
    //       res.end('Couldn\'t find profile.');
    //     }
    //   } catch(err) {
    //     console.error('[Profile] Error getting Manager table:', err)
    //     next(err)
    //   }

    // }
















    else {
      res.end('Jack Daniels tastes like bananas :(');
    }
  } catch(err) {
    console.error('[Profile] General Error:', err)
    next(err)
  }

});






















































// example: http://localhost:2929/api/profile/list
app.get('/api/profile/list', (req, res, next) => {
  console.log('[Profile] Listing ...')
  const directory = '/tmp/public'
  fs.readdir(directory, (err, files) => {
    try {
      if (err) {
        next(err)
      } else {
        for (const file of files) {
          console.log('file:', file)
        }
        res.status(200).send({files})
      }
    } catch(err) {
      console.error('[profile] Couldn\'t list files:', err)
      next(err) // send to error handler
    }
  });
})

// example: http://localhost:2929/api/profile/list
app.get('/api/profile/clear', async (req, res, next) => {
  try {
    await exo.deleteAll('/tmp/public')
    console.log('Cached profiles cleared!')
    res.end('Cached profiles cleared!')
  } catch(err) {
    console.error('[profile] Could not clear folder:', err)
    next(err) // send to error handler
  }
})

// example: http://localhost:2929/api/profile/0YyNcoB0cQ0-R1QbrVpliuVA.png
app.get('/api/profile/:filename', async (req, res, next) => {
  console.log('[Profile] Generating file ...')
  let filename = req.params.filename

  try {
    let path = '/tmp/public/'+filename

    // check for existence first
    if (fs.existsSync(path)) {
      let data = await async_readFile(path)
      res.writeHead(200, {'Content-Type': 'image'});
      res.end(data); // Send the file data to the browser.
      // res.download(data)
    } else {
      console.error('[Profile] No file found :')
      next()
    }

  } catch(err) {
    console.error('[Profile] File could not be downloaded :', err)
    next()
  }
})

// error handling
app.use(function (err, req, res, next) {
  // All errors are already displayed elswehere
  console.error("[Profile] General error:", err.stack);
  res.end(false);
});


module.exports = app
