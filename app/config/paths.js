'use strict';

var path = require('path');

var app = path.dirname(__dirname);

var paths = {

    views: path.join(app, 'views'),
    static: path.join(app, 'static')

};

module.exports = paths;
