'use strict';

var router = require('express').Router();

router.get('/', function(req, res) {

    res.render('page', {
        page: {
            title: 'Home'
        }
    });

});

module.exports = router;
