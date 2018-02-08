// dbtest.js
var pool = require('../dao/mysqlConnection.js');

pool.getConnection(function(err,connection){
	if(err){
		console.log(err);
	}else{
		connection.query("select * from test",function(err,results){
			if(err){
				console.log(err);
			}else{
				console.log(results);
			}
		});
	}
});