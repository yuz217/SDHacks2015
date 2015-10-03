var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});

router.get('/read', function(req, res) {
  res.render('read');
});

router.get('/write', function(req, res) {
  res.render('write');
})

router.get('/story', function(req, res) {
    res.render('story');
})

module.exports = router;
