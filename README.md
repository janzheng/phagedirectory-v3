

# Phage Directory v3.0

This is the Phage Directory core project as of 7/12/2019

Transition from Vue/Nuxt/Airtable to... well more of the same, but this one makes some extensive uses of Airtable as a CMS as an experimental platform for building MVPs.


#### Mini Log

- [7/12/19] Building in the open: as this project gets more open, there'll be more work documenting the code and making it readable. It's still mostly a "full-time side project". Created a new github org "phage-directory" and forked over the v3 branch over, and moving main dev into the org branch instead.



## Running Locally

Check out `package.json` for commands. This is a basic mirror of how Nuxt works.
Don't forget to use a newer npm: `nvm use 8.10.0` or `nvm use 10.x` — Zeit only supports 8.10 and there's a now/nuxt-builder bug

``` bash
# install dependencies
$ npm install # Or yarn install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, checkout the [Nuxt.js docs](https://github.com/nuxt/nuxt.js).


#### Zeit Now / Lambda / Production mixup

- Hydrate the config: 
	- https://phage.directory/api/exocytosis/cacheconfig?appYvj7j9Ta5I15ks&tableQuery=_content
	- Setup on EasyCron
	- use `/api/exocytosis/delete/all` to clear the cache
- Standard production (now --prod):
	- now.json
		- SSR / Universal mode
		- [now-ssr-staging] should be moved under here; use package.json for node envs instead
	- now-spa.json
		- SPA mode; as backup in case SSR fails


