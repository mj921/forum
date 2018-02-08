// baseDao.js
var pool = require('./mysqlConnection');
var BaseDao = {};
BaseDao.find = function(sql,callback,option){
    pool.getConnection(function(err,connection){
        if(err){
            callback(err);
        }else{
            connection.query(sql,option || [],callback);
        }
        connection.release();
    })
}

module.exports = BaseDao;