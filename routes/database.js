var express = require('express');
var mysql = require('mysql');
var router = express.Router();


 function handle_database(req,res) {
      var connection = mysql.createConnection({
        host     : 'kawaiikrew.net',
        user     : 'root',
        password : 'J^mpStrt',
        database : 'takeyout'
      });

      connection.connect();

      connection.query('SELECT * from user', function(err, rows, fields) {
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
