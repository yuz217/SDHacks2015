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

      //var input = [req.query.storyID, req.query.sentence, req.query.author];
      connection.query('INSERT INTO sentences (sentenceID, storyID, sentence, author) VALUES (NULL, 100, "bacon and cheese", "u");', function(err, rows, fields) {
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

router.post('/', function(req, res) {
    addSentence(req,res);
});

module.exports = router;
