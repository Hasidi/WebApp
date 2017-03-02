
/*
insert function:
tableName - the name of the table you wish to insert the data to.
infoToInsert - an object with Columns and Values like that: {column1: value1, column2: value2,...}
insertReturnStatys - a function that send back if the insertion was successful or not.
*/
exports.insert = function (dbConnection, tableName, infoToInsert, insertReturnStatus) {
	var query = dbConnection.query('insert into ' +tableName+ ' set ?', infoToInsert, function(err, result){
		if(err){
			console.error("insertion failed "+err);
			insertReturnStatus(false);
			return;
		} else {
			insertReturnStatus(true);
		}
	});
};


exports.select = function (dbConnection, tableName, data, callback) {
	var query = dbConnection.query('select '+data+' from ' +tableName, function(err, result){
		if(err){
			console.error("insertion failed "+err);
			
			return;
		} else {
			
			console.log("hello " + result);
			callback(result);
		}
	});
};