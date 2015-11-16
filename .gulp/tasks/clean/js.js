'use strict';

var path = require('path');

var clean = require('../../modules/clean');

module.exports = [
    'delete generated js',
    function(done) {
        clean.apply(this, [path.join(this.paths.staticAssets, 'js'), done]);
    }
];
