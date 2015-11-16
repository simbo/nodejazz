nodejazz
========

  > My node-couchdb-nginx playground…

**WORK IN PROGRESS**


## Development


### Setup

`git clone` and `vagrant up`.


### VM

Within `/vagrant`…

  - `gulp dev` ➜ watch, watchify and app live log
  - `gulp app:reload` ➜ reload app process
  - `gulp app:log` ➜ realtime app process log (`pm2-dev log`)
  - `gulp build` ➜ build everything
  - `gulp build:css` ➜ parse stylus to css, pipe through postcss
  - `gulp build:js` ➜ browserify javascripts
  - `gulp clean` ➜ delete all generated files
  - `gulp clean:css` ➜ delete generated css
  - `gulp clean:js` ➜ delete generated jacascripts
  - `gulp watch` ➜ watch everything (except javascripts) and react on changes
  - `gulp watchify` ➜ watch javascripts and react on changes


### Browser

  - **App** – [10.0.0.5](http://10.0.0.5/) or [localhost:8080](http://localhost:8080/)
  - **CouchDB** – [10.0.0.5/couchdb](http://10.0.0.5/couchdb)
  - **Futon** – [10.0.0.5/couchdb/_utils](http://10.0.0.5/couchdb/_utils)


## License

[MIT &copy; Simon Lepel 2015](http://simbo.mit-license.org/)
