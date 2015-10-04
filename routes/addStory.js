var express = require('express');
var mysql = require('mysql');
var router = express.Router();


 function addStory(req,res) {
      var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : 'keyboard cat',
        database : 'SDHacks2015'
      });

      connection.connect();

        var input = {storyID: 'NULL', isComplete: False, time: req.query.time, views: 0, firstSentence: req.query.firstSentence, numUsers: 1};
        connection.query('INSERT INTO stories SET ?', input, function(err, rows, fields) {
        if (!err)
        {
          console.log(input);
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
    addStory(req,res);
});

module.exports = router;
