/**
 * Created by Hasidi on 02/03/2017.
 */
var express = require('express');
var mysql = require('mysql');
var DButils = require('./DButilsAzure');
var app = express();
var iso8601 = require('iso8601');

var bodyParser = require('body-parser');
var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;


var Connection = require('tedious').Connection;
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

app.get('/insertAzure', function (req, res) {
    insertToAuthors();
    res.send("succes");
});

app.get('/getAuthors', function (req, res) {
    console.log("sadfdafsadsfa");
    DButilsAzure.Get(connection, 'Categories', '*', function(result) {
        res.send(result);
        console.log("success getting Authors");
    });
});

var portNum = 4000;
app.listen(portNum, function () {
    console.log('Example app listening on port ' + portNum);
});

//------------------------------------------------------------------------------------------------------------


