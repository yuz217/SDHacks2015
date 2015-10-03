var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

/* GET write page. */
router.get('/write', function(req, res) {
    res.render('write', { });
});

module.exports = router;
