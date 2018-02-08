// userService.js
var User = require('../model/user');
var UserDao = require('../dao/userDao');

var userDao = new UserDao();

var UserService = function(){}

//根据用户名查找用户
UserService.prototype.findUserByUserName = function(username,callback){
    userDao.findUserByUserName(username,function(err,results){
        if(err){
            console.log(err);
            callback(err);
        }else{
            if(results.length > 0){
                console.log("用户名存在");
                callback(err,results[0]);
            }else{
                console.log("用户名不存在");
                callback(err,null);
            }
        }
    });
}
//注册
UserService.prototype.doRegister = function(user,callback){
    userDao.save(user,function(err,results){
        if(err){
            console.log(err);
            callback(err);
        }else{
            if(results.affectedRows == 1){
                console.log("注册成功");
                callback(err,1);
            }else{
                callback("注册失败");
            }
        }
    });
}
module.exports = UserService;