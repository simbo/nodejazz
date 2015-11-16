'use strict';

var path = require('path');

var gulp = require('gulp'),
    Plug = require('gulpplug');

var plug = new Plug(gulp, {
    tasksDir: '.gulp/tasks'
});

plug.pkg = require('./package.json');

plug.paths = {
    cwd: __dirname,
    app: path.join(__dirname, 'app'),
    assets: path.join(__dirname, 'app', 'assets'),
    staticAssets: path.join(__dirname, 'app', 'static', 'assets')
};

plug.loadPlugins()
    .addTasks()
    .addHelpTask();
