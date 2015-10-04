var express = require('express');
var mysql = require('mysql');
var router = express.Router();


 function addSentence(req,res) {
      var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : 'keyboard cat',
        database : 'SDHacks2015'
      });

      connection.connect();

      var input = '(NULL' + ',' + req.query.storyID + ',' + req.query.sentence + ',' + req.query.author + ')';
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
    add_sentence(req,res);
});

module.exports = router;
