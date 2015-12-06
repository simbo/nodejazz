'use strict';

var async = require('async');

var couch = require('modules/couch'),
    logger = require('modules/logger'),
    settings = require('config/settings');

function setupDatabases(done) {
  async.each(Object.keys(settings.couch.dbNames).map(function(dbID) {
    return settings.couch.dbNames[dbID];
  }), function(dbName, cb) {
    var db = couch.database(dbName);
    db.exists(function(err, exists) {
      if (err) return logger.log('error', err);
      if (exists) return cb();
      db.create(function(err) {
        if (err) return logger.log('error', err);
        logger.log('info', '[setup] created database ' + dbName);
        return cb();
      });
    });
  }, function(err) {
    if (err) return logger.log('error', err);
    return done();
  });
}

module.exports = setupDatabases;
