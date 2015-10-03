var express = require('express');
var mysql = require('mysql');
var router = express.Router();


 function handle_sentence_table(req,res) {
      var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : 'keyboard cat',
        database : 'SDHacks2015'
      });

      connection.connect();

      var postInput = req.body.storyID;
      connection.query('SELECT * FROM sentences WHERE storyID=?', [postInput], function(err, rows, fields) {
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
    handle_sentence_table(req,res);
});

module.exports = router;
