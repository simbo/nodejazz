'use strict';

var childProcess = require('child_process'),
    readline = require('readline');

module.exports = [

  'show app process live log',

  function(done) {

    var pm2 = childProcess.spawn('pm2-dev', ['log'], {
      cwd: process.cwd()
    });

    readline.createInterface({
      input: pm2.stdout,
      terminal: false
    }).on('line', function(line) {
      if (line.trim().length > 0) {
        this.util.log(this.util.colors.gray('LOG') + ' ' + line);
      }
    }.bind(this));

    pm2.on('close', function() {
      done();
    });

  }

];

