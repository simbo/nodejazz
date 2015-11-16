'use strict';

// require code modules
var path = require('path');

// require modules
var express = require('express'),
    jade = require('jade');

// require configs
var settings = require('config/settings'),
    routes = require('config/routes');

// scope vars
var app = express(),
    server;

// app locals
app.locals = {
    pkg: require('../package.json')
};

// view engine setup
app.engine('jade', jade.__express);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// serve static files
app.use(express.static(path.join(__dirname, 'static')));

// apply routes
routes.forEach(function(route) {
    app.use(route[0], require('routes/' + route[1]));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: err
    });
});

// listen
server = app.listen(
    settings.server.port,
    settings.server.host,
    function() {
        var address = server.address();
        console.log('Ready. (listening on ' + address.address + ':' + address.port + ')');
    }
);
