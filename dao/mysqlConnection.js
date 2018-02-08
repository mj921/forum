// mysqlConnection.js
var mysql = require('mysql');

var pool = mysql.createPool({
	host:"localhost",
	user:"root",
	password:"root",
	database:"forum"
});
module.exports = pool;