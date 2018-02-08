// userDao.js
var BaseDao = require('./baseDao');
var UserDao = function(){}
UserDao.prototype.save = function(user,callback){
	var sql = "insert into user(username,password,experience,level,headimg,addtime) values(?,?,?,?,?,?)",
		option = [user.username,user.password,user.experience,user.level,user.headimg,user.addtime];
	BaseDao.find(sql,callback,option);
}
UserDao.prototype.findUserByUserName = function(username,callback){
	var sql = "select * from user where username = ?",
		option = [username];
	BaseDao.find(sql,callback,option);
}
module.exports = UserDao;