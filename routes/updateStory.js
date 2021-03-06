var express = require('express');
var mysql = require('mysql');
var router = express.Router();


 function handle_database(req,res) {
      var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : 'finishhim',
        database : 'SDHacks2015'
      });

      connection.connect();

      var input = '(' + req.query.sentenceID + ',' + req.query.storyID + ',' + req.query.sentence + ',' + req.query.author + ')';
      connection.query('INSERT INTO sentences (sentenceID, storyID, sentence, author) VALUES ?', input, function(err, rows, fields) {
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
