'use strict';

var path = require('path');

var mkdirp = require('mkdirp'),
    moment = require('moment'),
    winston = require('winston');

var config = require('config');

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
    exitOnError: false,
    transports: [
        new winston.transports.Console({
            colorize: true,
            handleExceptions: true,
            timestamp: function() {
                return moment(new Date()).format('hh:mm:ss');
            },
            prettyPrint: function(meta) {
                return '\n' + meta.stack;
            }
        }),
        new winston.transports.DailyRotateFile({
            filename: path.join(config.paths.log, 'app'),
            datePattern: '.yyyy-MM-dd.log',
            handleExceptions: true
        }),
        new winston.transports.Couchdb({
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
