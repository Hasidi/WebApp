/**
 * Created by Hasidi on 02/03/2017.
 */
/**
 * Created by Hasidi on 02/03/2017.
 */
var express = require('express');
var mysql = require('mysql');
var DButils = require('./DButils');
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
    insertToDB();
    res.send("succes");
});

app.get('/getAuthors', function (req, res) {
    getAuthors(function(result) {
        res.send(result);
        console.log("success getting Authors");
    });
});

app.listen(4000, function () {
    console.log('Example app listening on port 3000!')
});

//---------------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------
function insertToDB() {
    request = new Request("INSERT authors (firstName, lastName) VALUES ('netanel', 'hasidi');", function(err) {
        if (err) {
            console.log(err);}
    });
    request.addParameter('firstName', TYPES.NVarChar);
    request.addParameter('lastName', TYPES.NVarChar);

    connection.execSql(request);
}
//---------------------------------------------------------------------------------------------------------------------------------
function getAuthors(callback) {
    var query = "select * from authors";
    console.log("aaaaaaaaaaaaa");

    request = new Request(query, function(err, rowCount) {
        if (err) {
            console.log(err);
            return;
        }
        console.log("bbbbbbbbbbbbb");

    });
    var res = [];
    var i = 1;
    var fields = [];
    request.on('columnMetadata', function (columns) {
        for (i=0; i<columns.length; i++) {
            fields.push(columns[i].colName);
        }
    });

    request.on('row', function (row) {
        // row.forEach(function (column) {
        //     res+= column.colName + " " + column.value + " ";
        // })

        var item = {};
        for (i=0; i<row.length; i++) {
            item[fields[i]] = row[i].value;
        }
        res.push(item);

        // console.log("row num. " + i);
        // console.log(res);
        // i++;
    });
    request.on('requestCompleted', function (aaa) {
        console.log("requestCompleted");
        console.log(res);
        callback(JSON.stringify(res));
        // console.log(fields);

        // res= rows;
    });
    // request.on('done', function (rowCount, more, rows) {
    //     console.log("done");
    //
    //     // res= rows;
    // });
    // request.on('doneProc', function (rowCount, more, returnStatus, rows) {
    //     //console.log(rowCount + ' rows returned');
    //     console.log("doneProc");
    //
    //     console.log(res) // this is the full array of row objects
    // });

    connection.execSql(request);
    // connection.execute(request);

    console.log("cccccccccccc");

}