'use strict';

module.exports = [

    'watch javascripts via watchify',

    function(done) {
        this.watchify = true;
        this.runSequence('build:js', done);
    }

];
