'use strict';

function error404(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
}

function errorhandler(err, req, res, next) {
    err.status = err.status || 500;
    console.log(err.stack);
    res.status(err.status);
    if (req.accepts('html')) {
        res.render('error', {
            page: {
                title: err.message
            },
            error: err
        });
        return;
    }
    if (req.accepts('json')) {
        res.send({
            error: err.message
        });
        return;
    }
    res.type('txt').send('ERROR: ' + err.message);
}

module.exports = errorhandler;
module.exports.error404 = error404;
