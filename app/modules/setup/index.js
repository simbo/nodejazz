'use strict';

var async = require('async');

var logger = require('modules/logger');

function setup(done) {
  async.parallel({

    databases: require('modules/setup/databases'),
    folders: require('modules/setup/folders')

  }, function(err, results) {
    if (err) logger.log('error', err, results);
    return done();
  });
}

module.exports = setup;
