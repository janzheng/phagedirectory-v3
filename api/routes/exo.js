


const fs = require('fs');
const util = require('util');
const path = require('path');
const Cytosis = require('cytosis');

const oibackoff = require('oibackoff');
const async_readFile = util.promisify(fs.readFile);


// 1: 1, 2, 4, 8, 16, 32 seconds... though by then the user's probably left
// 0.2: 0.2, 0.4, 0.8, 1.6, 3.2, 6.4 seconds
let backoff = oibackoff.backoff({
  algorithm  : 'exponential',
  delayRatio : 0.2,
  maxTries   : 6,
})







const exo = {

	test: function() {
		console.log("beep boop!")
		this.testtwo()
	},
	testtwo: function() {
		console.log("arr two dee twoo!")
	},

	// uses query to make a coherent file name.json
	makeDataName: function(req) {
	  // current strategy is to use [airtable_basekey]-[tableQuery]-[keyword]
	  // this helps create multiple tiny files, rather than a mega file 
	  let name = `${req.query.airBase}-${req.query.tableQuery}`
	  // console.log('keyword ??? :', req.query.payloads)
	  if(req.query.payloads) {
		  let keyword = JSON.parse(req.query.payloads)['keyword']
		  if(keyword) {
		    // console.log('keyword:', keyword)
		    name += `-${keyword}`
		  }
	  }
	  return name + '.json'
	},









	/*

		Cytosis Functions

	*/


	// loads a single _cytosis object from airtable
	// returns a promise
	loadCytosis: async function({routeName, tableQuery, options, payloads, config, _key, _base}) {
	  const airKey = _key || process.env.PD_AIRTABLE_PUBLIC_API
	  const airBase = _base || process.env.PD_AIRTABLE_PUBLIC_BASE

	  console.log('[exo/loadCytosis] loading Cytosis w/ ', airKey, ' / ', airBase, ' / ', tableQuery )
	  try {
	    const _cytosis = await new Cytosis({
	      airKey: airKey,
	      airBase: airBase,
	      tableQuery,
	      options,
	      config,
	      payloads,
	      routeName,
	    });

	  	// console.log('[exo/loadCytosis] Cytosis loaded: ', _cytosis )
	    return Promise.resolve(_cytosis);
	  } catch(err) {
	    console.error('[exo/loadCytosis][EXO:ERROR] Failed to load Cytosis! Failing silently', err)
	    return Promise.reject(undefined)
	  }
	},



	// CONFIG STUFF

	// loads a single config object from airtable
	// returns a promise
	loadCytosisConfig: function({routeName, _key, _base}) {
	  const airKey = _key || process.env.PD_AIRTABLE_PUBLIC_API
	  const airBase = _base || process.env.PD_AIRTABLE_PUBLIC_BASE

	  console.log('[exo/loadCytosisConfig] loading Config w/ ', airKey, ' /// ', airBase )
	  try {
	    const _config = Cytosis.getConfig({
	      airKey: airKey,
	      airBase: airBase,
	      routeName: routeName,
	    });

	    return _config;
	  } catch(err) {
	    console.error('[exo/loadCytosisConfig][EXO:ERROR] Failed to load Config! Failing silently', err)
	    return Promise.reject(undefined)
	  }
	},

	updateConfigCache: function({cytosis}) {
	  return new Promise(function(resolve, reject) {
	    try {
	      // cache current cytosis request to /tmp
	      console.log('[exo/updateConfigCache] caching config w/ key:', cytosis.airBase.id)
	      updateData({
	        filename: 'config.json',
	        key: cytosis.airBase.id, 
	        payload: cytosis.config
	      }).then((data) => {
	        resolve(data)
	      }, (err) => {
	        reject(err)
	      })
	      // console.log('[exocytosis/cacheCytosis] config:', config)
	    } catch(err) {
	      console.log("[exo/updateConfigCache][EXO:ERROR] failed to update config cache ");
	      reject(undefined)
	    }
	  })
	},











	// 
	//  Filesystem / Data styff
	// 



	// updates data by loading the data and appending the key
	// used to update config.json which looks like { airtable_key: _config, key2: _config2 }
	// returns a promise
	updateFile: function({filename, key, payload}) {
	  return new Promise(function(resolve, reject) {
	    fs.readFile('/tmp/'+filename, 'utf8', function(err, contents) {
	      try {

	        // ignore this error, since we're reading the file to see if there's anything in there
	        // if (err) {
	        //   console.log("[exo/updateData] failed to save data to: ", filename);
	        //   // throw(new Error("Failed to save data"))
	        //   reject(err)
	        // }

	        let outdata, fdata
	        if(contents) {
	          fdata = JSON.parse(contents)
	          fdata[key] = payload // could overwrite whatever's already there, which is ok
	          outdata = fdata
	        } else {
	          let data = {}
	          data[key] = payload
	          outdata = data
	        }

	        fs.writeFile('/tmp/'+filename, JSON.stringify(outdata), (err) => {
	          if (err) {
	            console.log("[exo/updateData] failed to save data to: ", filename);
	            // throw(new Error("Failed to save data"))
	            reject(err)
	          } else {
	            resolve(outdata)
	            // console.log('[exo/updateData] successfully saved data to: ', filename);                                
	          }
	        });

	      } catch(err) {
	        console.log("[exo/updateData] failed to update ", filename, err);
	        reject(undefined)
	      }

	    });
	  })
	},


	// reads data async
	readFile: function(filename) {
		// console.log('[exo/readFile] Reading file:', filename)
	  return new Promise(async function(resolve, reject) {
			try {
				let path = '/tmp/'+filename

				// check for existence first
			  if (fs.existsSync(path)) {
			  	let data = await async_readFile(path, 'utf8')
			  	// console.log('[exo/readFile] Data read for: ', filename)
			  	resolve(data)
			  } else {
			  	reject()
			  }

			} catch(err) {
			  reject(err)
			}
	  })
	},

	// forcefully overwrites data
	writeFile: function({filename, payload}) {
	  return new Promise(function(resolve, reject) {
			try {
				// check for existence and check for time diff to see if you should write
				// create another function for that
			  // if (fs.existsSync(path)) {
			  //   //file exists
			  // }
        // console.log('[exo/writeFile] Saving file:', filename)

		    fs.writeFile('/tmp/'+filename, JSON.stringify(payload), (err) => {
		      if (err) {
		        console.log("[exo/writeFile] Failed to save data to:", filename);
		        reject(err)
		      } else {
		        // console.log('[exocytosis/writeFile] saving data to: ', filename); 
		        // console.log('[exo/writeFile] Successfully saved data to: ', filename);  
		        resolve(payload)
		      }
		    });

			} catch(err) {
			  reject(err)
			}
	  })
	},


	// does what it says
	deleteFile: function(fname) {
	  return new Promise(function(resolve, reject) {
	    try {
	      fs.unlink(`/tmp/${fname}`, (err) => {
	        if (err) {
	          console.log("[exo/deleteFile] failed to delete ", fname, err);
	          reject(err)
	        } else {
	          console.log('[exo/deleteFile] successfully deleted', fname);    
	          resolve(true)                            
	        }
	      });
	    } catch(err) {
	      console.error("[exo/deleteFile][EXO:ERROR] failed to delete ", fname, err);
	      reject(undefined)
	    }
	  })
	},


	// TODO: this is not really async, but it's not used in production
	deleteAll: function(directory = '/tmp', ext='.json', extlen=5, deleteAll=false) {
	  return new Promise(function(resolve, reject) {
	    // deletes all json files
	    // const directory = '/tmp'
	    fs.readdir(directory, (err, files) => {
	      try {
	        if (err) {
	          console.log("[exo/deleteAll] failed to delete /tmp/ files ", err);
	          reject(err);
	        }

	        for (const file of files) {
	          // console.log('[exocytosis/deleteAll] File >>> ', file.substring(file.length-extlen), ext)
	          if(file.substring(file.length-extlen) === ext) {
	            console.log(`[exo/deleteAll] Deleting ${ext} file ::::`, file, file.substring(file.length-extlen))
	            const filename = file
	            fs.unlink(path.join(directory, file), err => {
	              if (err) {
	                // don't exit on error (e.g. file system), just keep looping
	                // throw err;
	              } else {
	                console.log('[exo/deleteAll] All ${ext} files successfully deleted');    
	                // resolve(fname)                            
	              }
	            });
	          }
	          else if(deleteAll) {
	            console.log(`[exo/deleteAll] Deleting ${ext} file ????:`, file)
	            const filename = file
	          	fs.unlink(path.join(directory, file), err => {
	              if (err) {
	                // don't exit on error (e.g. file system), just keep looping
	                // throw err;
	              } else {
	                console.log('[exo/deleteAll] All files successfully deleted');    
	                // resolve(fname)                            
	              }
	            })
	          }
	        }
	        console.log('[exo/deleteAll] All files processed');
	        resolve(true)
	      } catch(err) {
	        console.error('[exo/deleteAll][EXO:ERROR] Files not deleted', err);
	        reject()
	      }
	    });
	  })
	},






}

module.exports = exo
