var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.render('write-select');
})

router.get('/story', function(req, res) {
    res.render('write-story');
})

module.exports = router;
