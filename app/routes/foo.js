'use strict';

var router = require('express').Router();

router.get('/', function(req, res) {

    res.render('default', {
        title: 'Home'
    });

});

module.exports = router;
