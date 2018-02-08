// collectionDao.js
var BaseDao = require('./baseDao');

var CollectionDao = function(){}

CollectionDao.prototype.save = function(collection,callback){
    var sql = "insert into collection(articleid,userid,addtime) values(?,?,?)",
        option = [collection.articleid,collection.userid,collection.addtime];
    BaseDao.find(sql,callback,option);
}
//根据articleid 和 userid 查询
CollectionDao.prototype.findByArticleAndUser = function(articleid,userid,callback){
    var sql = "select * from collection where articleid = ? and userid = ?",
        option = [articleid,userid];
    BaseDao.find(sql,callback,option);
}

module.exports = CollectionDao;