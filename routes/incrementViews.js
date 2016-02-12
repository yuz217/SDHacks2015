var express = require('express');
var mysql = require('mysql');
var router = express.Router();


 function incrementViews(req,res) {
      var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : 'finishhim',
        database : 'SDHacks2015'
      });

      connection.connect();

      var input = {storyID : req.query.storyID};
      connection.query('UPDATE stories SET views=views+1 WHERE ?', input, function(err, rows, fields) {
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
    incrementViews(req,res);
});

module.exports = router;
