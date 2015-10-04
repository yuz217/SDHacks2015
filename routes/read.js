var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.render('read-select', {title: 'read'});
});

router.get('/story', function(req, res) {
    res.render('read-story', {title: 'read'});
})

module.exports = router;
