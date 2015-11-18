'use strict';

// require modules
var _ = require('lodash'),
    jade = require('jade'),
    express = require('express');

// require local modules
var config = require('config');

// scope vars
var app = express(),
    server;

// assign locals
_.assign(app.locals, config.locals);

// view engine setup
app.engine('jade', jade.__express);
app.set('views', config.paths.views);
app.set('view engine', 'jade');

// serve static files
app.use(express.static(config.paths.static));

// apply routes
config.routes.forEach(function(route) {
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
    config.settings.server.port,
    config.settings.server.host,
    function() {
        var address = server.address();
        console.log('Ready. (listening on ' + address.address + ':' + address.port + ')');
    }
);
