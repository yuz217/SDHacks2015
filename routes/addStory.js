var express = require('express');
var mysql = require('mysql');
var router = express.Router();


 function handle_database(req,res) {
      var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : 'keyboard cat',
        database : 'SDHacks2015'
      });

      connection.connect();

      var input = '(' + req.query.storyID + ',' + req.query.isComplete + ',' + req.query.time + ',' + req.query.views + ',' + req.query.firstSentence + ',' + req.query.numUsers + ')';
      connection.query('INSERT INTO stories (storyID, isComplete, time, views, firstSentence, numUsers) VALUES ?', input, function(err, rows, fields) {
        if (!err)
        {
          console.log('The solution is: ', rows);
          res.json(rows)
        }
        else
        {
          console.log('Error while performing Query.');
          res.json(err)
        }
      });

      connection.end();
}

router.get('/', function(req, res) {
    handle_database(req,res);
});

module.exports = router;