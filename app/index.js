'use strict';

// require modules
var assign = require('lodash.assign'),
    express = require('express');

// require local modules
var config = require('config'),
    errorhandler = require('modules/errorhandler'),
    logger = require('modules/logger'),
    renderer = require('modules/renderer'),
    sessions = require('modules/sessions');

// scope vars
var app = express(),
    server;

// assign locals
assign(app.locals, config.locals);

// view engine setup
app.engine('jade', renderer.__express);
app.set('views', config.paths.views);
app.set('view engine', 'jade');

// use sessions sessions
app.use(sessions);

// serve static files
app.use(express.static(config.paths.static));

// apply routes
config.routes.forEach(function(route) {
    app.use(route[0], require('routes/' + route[1]));
});

// catch 404 and forward to error handler
app.use(errorhandler.error404);

// error handler
app.use(errorhandler);

// listen
server = app.listen(
    config.settings.app.port,
    config.settings.app.host,
    function() {
        var address = server.address();
        logger.log('info', 'server started (listening on %s:%s)', address.address, address.port);
    }
);
