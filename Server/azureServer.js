/**
 * Created by Hasidi on 02/03/2017.
 */
var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var DButilsAzure = require('./DButilsAzure');
var app = express();
var iso8601 = require('iso8601');
// var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;
var Connection = require('tedious').Connection;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//---------------------------------------------------------------------------------------------------------------------------------
var config = {
    userName: 'qweasdzxc',
    password: '123QWEasd',
    server: 'ip2017server.database.windows.net',
    // When you connect to Azure SQL Database, you need these next options.
    options: {encrypt: true, database: 'shop'}
};
var connection = new Connection(config);
connection.on('connect', function(err) {
    // If no error, then good to proceed.
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log("Connected Azure");


});
//---------------------------------------------------------------------------------------------------------------------------------
app.get('/insertAuthors', function (req, res) {
    DButilsAzure.Insert(connection, "authors", "('Netanel', 'Hasidi')", function (insertStatus) {
        if(insertStatus){
            res.send('success to insert new token thing');
            console.log("success to insert new token thing");
        }
        else {
            console.log("Failed to insert new token thing");
        }
    });
});
//---------------------------------------------------------------------------------------------------------------------------------
app.post('/insertAuthors', function (req, res) {
    var fName = req.body.firstName;
    var lName = req.body.lastName;
    DButilsAzure.Insert(connection, "authors", "('" + fName + "', '" + lName +"')", function (insertStatus) {
        if(insertStatus){
            res.send('success to insert new token thing');
            console.log("success to insert new token thing");
        }
        else {
            console.log("Failed to insert new token thing");
        }
    });
});
//---------------------------------------------------------------------------------------------------------------------------------
app.get('/getAuthors', function (req, res) {
    DButilsAzure.Get(connection, "authors", "*", function(result) {
        res.send(result);
        console.log("success getting Authors");
    });
});
//---------------------------------------------------------------------------------------------------------------------------------
app.get('/getAuthors/:id', function (req, res) {
    // var id = req.param('id');
    var id = req.param.id;
    DButilsAzure.Get(connection, "authors", "*", function(result) {
        res.send(result);
        console.log("success getting Authors");
    });
});
//---------------------------------------------------------------------------------------------------------------------------------
var port = 4000;
app.listen(port, function () {
    console.log('Example app listening on port ' + port);
});

//---------------------------------------------------------------------------------------------------------------------------------
