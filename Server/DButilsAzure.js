/**
 * Created by Hasidi on 02/03/2017.
 */

var Request = require('tedious').Request;

exports.Insert = function(connection, tableName, infoToInsert, insertReturnStatus) {
    var query = "INSERT into " + tableName +" VALUES " +infoToInsert;
    request = new Request(query, function(err){
        if (err) {
            console.log(err);
            insertReturnStatus(false);
            return;
        }
        else
        {
            insertReturnStatus(true);
        }
    });
    // request.addParameter('firstName', TYPES.NVarChar);
    // request.addParameter('lastName', TYPES.NVarChar);
    connection.execSql(request);
}
//------------------------------------------------------------------------------------------------------------
exports.Get = function(connection, tableName, data, callback) {
    var query = 'select '+data+' from ' +tableName;
    request = new Request(query, function(err, rowCount) {
        if (err) {
            console.log(err);
            return;
        }
    });
    var res = [];
    var fields = [];
    request.on('columnMetadata', function (columns) {
        for (i=0; i<columns.length; i++) {
            fields.push(columns[i].colName);
        }
    });
    request.on('row', function (row) {
        var item = {};
        for (i=0; i<row.length; i++) {
            item[fields[i]] = row[i].value;
        }
        res.push(item);
    });
    request.on('requestCompleted', function (aaa) {
        console.log("requestCompleted");
        console.log(res);
        callback(JSON.stringify(res));
    });
    connection.execSql(request);
}
//------------------------------------------------------------------------------------------------------------
