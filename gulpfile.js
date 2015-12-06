'use strict';

var path = require('path');

var gulp = require('gulp'),
    Plug = require('gulpplug');

var plug = new Plug(gulp, {
  tasksDir: '.gulp/tasks'
});

plug.pkg = require('./package.json');

plug.paths = (function(paths) {
  paths.cwd = __dirname;
  paths.app = path.join(paths.cwd, 'app');
  paths.assets = path.join(paths.app, 'assets');
  paths.staticAssets = path.join(paths.app, 'static', 'assets');
  return paths;
})({});

plug.loadPlugins()
  .addTasks()
  .addHelpTask();
