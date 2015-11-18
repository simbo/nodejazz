'use strict';

var pkg = require('../../package.json');

var locals = {

    app: {
        name: pkg.name,
        description: pkg.description,
        version: pkg.version,
        bugs: pkg.bugs,
        homepage: pkg.homepage
    }

};

module.exports = locals;
