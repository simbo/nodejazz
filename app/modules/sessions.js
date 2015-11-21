'use strict';

var uuid = require('uuid'),
    session = require('express-session'),
    sessionstore = require('sessionstore');

var settings = require('config/settings');

var store = sessionstore.createSessionStore({
    type: 'couchdb',
    host: 'http://' + settings.couch.host,
    port: settings.couch.port,
    dbName: settings.couch.dbNames.sessions,
    collectionName: settings.sessions.collection,
    timeout: 10000
});

module.exports = session({
    secret: settings.sessions.secret,
    genid: function() {
        return uuid.v4();
    },
    name: settings.sessions.sid,
    cookie: {
        path: settings.sessions.cookie.path,
        httpOnly: settings.sessions.cookie.httpOnly,
        secure: settings.sessions.cookie.secure,
        maxAge: parseInt(settings.sessions.cookie.maxAge, 2) * 60000
    },
    store: store,
    resave: false,
    saveUninitialized: false
});

module.exports.store = store;
