var express = require('express');
var mysql = require('mysql');
var router = express.Router();

var pool = mysql.createPool({
     connectionLimit : 100,
     host     : '45.55.30.181',
     user     : 'root',
     password : 'keyboard cat',
     database : 'SDHacks2015',
     debug    :  true
 });

 function handle_database(req,res) {
     pool.getConnection(function(err,connection){
         if (err) {
           //connection.release();
           res.json({"code" : 100, "status" : "Error in connection database"});
           return;
         }

         console.log('connected as id ' + connection.threadId);

         //print all stories
         connection.query("select * from stories",function(err,rows){
             connection.release();
             if(!err) {
                 res.json(rows);
                 return rows;
             }
         });

         connection.on('error', function(err) {
               //res.json({"code" : 100, "status" : "Error in connection database"});
               res.json(err);
               return;
         });
   });
 }

router.get('/', function(req, res) {
    handle_database(req,res);
});

module.exports = router;
