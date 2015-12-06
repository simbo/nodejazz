'use strict';

var async = require('async'),
    mkdirp = require('mkdirp');

var logger = require('modules/logger'),
    paths = require('config/paths');

var folders = [
  paths.log
];

function setupFolders(done) {
  async.each(folders, function(folder, cb) {
    mkdirp(folder, {
      mode: parseInt('0755', 8) & ~process.umask() // eslint-disable-line no-bitwise
    }, function(err) {
      if (err) return logger.log('error', err);
      logger.log('info', '[setup] created folder ' + folder);
      return cb();
    });
  }, function(err) {
    if (err) return logger.log('error', err);
    return done();
  });
}

module.exports = setupFolders;
