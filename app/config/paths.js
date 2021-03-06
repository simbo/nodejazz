'use strict';

var path = require('path');

var app = path.dirname(__dirname);

var paths = {

  app: app,
  views: path.join(app, 'views'),
  static: path.join(app, 'static'),
  log: path.join(app, 'log')

};

module.exports = paths;
