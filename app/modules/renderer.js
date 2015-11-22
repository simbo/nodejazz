'use strict';

var assign = require('lodash.assign'),
    jade = require('jade'),
    uglify = require('uglify-js');

var env = process.env.NODE_ENV;

var renderOptions = {
    compileDebug: !(env === 'production'),
    pretty: false,
    debug: false,
    cache: false
};

jade.filters.uglify = function(data) {
    return env === 'production' ?
        uglify.minify(data, {fromString: true}).code : data;
};

function renderer(path, options, fn) {
    options = assign(renderOptions, options);
    jade.renderFile(path, options, fn);
}

module.exports = jade;
module.exports.__express = renderer;
