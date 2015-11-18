'use strict';

function error404(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
}

function error(err, req, res) {
    res.status(err.status || 500);
    res.render('error', {
        page: {
            title: err.message
        },
        error: err
    });
}

module.exports = {
    error404: error404,
    error: error
};
