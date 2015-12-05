'use strict';

module.exports = [

  'watch, watchify and app:log',

  function(done) {

    this.runSequence(['watch', 'watchify', 'app:log'], done);

  }

];
