// likeDao.js
var BaseDao = require('./baseDao');

var LikeDao = function(){}

LikeDao.prototype.save = function(like,callback){
    var sql = "insert into `like`(articleid,userid,addtime) values(?,?,?)",
        option = [like.articleid,like.userid,like.addtime];
    BaseDao.find(sql,callback,option);
}
//根据articleid 和 userid 查询
LikeDao.prototype.findByArticleAndUser = function(articleid,userid,callback){
    var sql = "select * from `like` where articleid = ? and userid = ?",
        option = [articleid,userid];
    BaseDao.find(sql,callback,option);
}

module.exports = LikeDao;