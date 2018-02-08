// classificationDao.js
var pool = require('./mysqlConnection');
var Classification = require('../model/classification');

var ClassificationDao = function(){};

ClassificationDao.prototype.findAll = function(callback){
	pool.getConnection(function(err,connection){
		if(err){
			callback(err);
		}else{
			var sql = "select * from classification";
			connection.query(sql,function(err,results){
				if(err){
					callback(err);
				}else{
					callback(err,results);
				}
				connection.release();
			})
		}
	});
}
module.exports = ClassificationDao;