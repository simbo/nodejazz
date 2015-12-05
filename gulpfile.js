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
  paths.app = path.join(__dirname, 'app');
  paths.assets = path.join(__dirname, 'app', 'assets');
  paths.staticAssets = path.join(__dirname, 'app', 'static', 'assets');
})({});

plug.loadPlugins()
  .addTasks()
  .addHelpTask();
