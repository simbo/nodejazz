'use strict';

var cradle = require('cradle');

var settings = require('config/settings');

var couch = new cradle.Connection(
  settings.couch.host,
  settings.couch.port,
  settings.couch.connectionOptions
);

module.exports = couch;
