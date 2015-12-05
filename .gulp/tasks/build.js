'use strict';

module.exports = [

  'build everything',

  function(done) {
    this.runSequence(
      ['clean'],
      ['build:js', 'build:css'],
      done
    );
  }

];
