// typeDao.js
var BaseDao = require('./baseDao');

var TypeDao = function(){}

TypeDao.prototype.findAll = function(callback){
    var sql = "select * from type";
    BaseDao.find(sql,callback,[]);
}

module.exports = TypeDao;