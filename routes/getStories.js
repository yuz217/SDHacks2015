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

      connection.query('SELECT * from stories ORDER BY storyID DESC', function(err, rows, fields) {
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
