const express = require('express');
const router = express.Router();
var request = require('request');


router.get('/', function (req, res, next) {
    res.render('index.pug');
});

module.exports = router;
