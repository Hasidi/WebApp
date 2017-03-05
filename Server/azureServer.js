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
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
//---------------------------------------------------------------------------------------------------------------------------------
var config = {
    userName: 'qweasdzxc',
    password: '123QWEasd',
    server: 'ip2017server.database.windows.net',
    // When you connect to Azure SQL Database, you need these next options.
    options: {encrypt: true, database: 'Shop'}
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
app.post('/insertClients', function (req, res) {
    var id = req.body.ClientID;
    var fname = req.body.FirstName;
    var lname = req.body.LastName;
    var add = req.body.Address;
    var mail = req.body.Mail;
    var password = req.body.Password;
    // var objs = [id, fname, lname, add, mail, password];
    var objs = req.body;

    DButilsAzure.Insert(connection, "Customer", objs, function (insertStatus) {
        if(insertStatus){
            res.send(true);
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
app.get('/getClient', function (req, res) {
    var userId = req.param('Id');
    var userPass = req.param('pass');
    var found = false;
    DButilsAzure.Get(connection, "Customer", "*", function(result) {
        var objs = JSON.parse(result);
        for (index in objs) {
            var id = objs[index].Id;
            var pass = objs[index].Password;
            if (id == userId && pass == userPass) {
                found = true;
                break;
            }
        }
        res.send(found);
        console.log("success getting Authors");
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
