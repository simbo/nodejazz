'use strict';

var path = require('path');

var mkdirp = require('mkdirp'),
    moment = require('moment'),
    winston = require('winston');

var config = require('config');

var env = process.env.NODE_ENV;

var logger, loglevels;

winston.transports.DailyRotateFile = require('winston-daily-rotate-file');
winston.transports.Couchdb = require('winston-couchdb').Couchdb;

loglevels = {
    error:   [0, 'red'],
    warn:    [1, 'yellow'],
    info:    [2, 'blue'],
    verbose: [3, 'white'],
    debug:   [4, 'green'],
    silly:   [5, 'gray']
};

mkdirp.sync(config.paths.log, {
    mode: parseInt('0755', 8) & ~process.umask() // eslint-disable-line no-bitwise
});

logger = new winston.Logger({
    levels: Object.keys(loglevels).reduce(function(levels, level) {
        levels[level] = loglevels[level][0];
        return levels;
    }, {}),
    exitOnError: env === 'production',
    transports: [
        new winston.transports.Console({
            silent: env === 'production',
            colorize: true,
            handleExceptions: false,
            timestamp: function() {
                return moment(new Date()).format('hh:mm:ss');
            },
            prettyPrint: function(meta) {
                var stack = meta.stack;
                return '\n' + (Array.isArray(stack) ? stack.join('\n') : stack);
            }
        }),
        new winston.transports.DailyRotateFile({
            silent: env === 'development',
            filename: path.join(config.paths.log, 'app'),
            datePattern: '.yyyy-MM-dd.log',
            handleExceptions: true
        }),
        new winston.transports.Couchdb({
            silent: false,
            host: config.settings.couch.host,
            port: config.settings.couch.host,
            db: 'log',
            auth: config.settings.couch.auth,
            ssl: config.settings.couch.ssl,
            handleExceptions: true
        })
    ]
});

winston.addColors(Object.keys(loglevels).reduce(function(levels, level) {
    levels[level] = loglevels[level][1];
    return levels;
}, {}));

module.exports = logger;
module.exports.loglevels = loglevels;
