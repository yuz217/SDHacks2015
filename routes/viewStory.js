var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.render('view-story');
});

module.exports = router;
