var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.render('read', {title: 'read'});
});

module.exports = router;
