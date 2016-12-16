var express = require('express');
var router = express.Router();
// var about_dal = require('../model/about_dal');

router.get('/', function(req, res) {
    res.render('about/aboutAll', { image: "../images/ERP2.png"
    });
});

router.get('/ER', function(req, res) {
    res.render('about/aboutER', {
    });
});

router.get('/RS', function(req, res) {
    res.render('about/aboutRS', {
    });
});

router.get('/FDD', function(req, res) {
    res.render('about/aboutFDD', {
    });
});

module.exports = router;