'use strict';

var path = require('path');

module.exports = [

    'watch, watchify and app:log',

    function(done) {

        this.runSequence(['watch', 'watchify', 'app:log'], done);

    }

];
