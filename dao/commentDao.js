// commentDao.js
var BaseDao = require('./baseDao');
var Comment = require('../model/comment');

var CommentDao = function(){}

//插入一条评论
CommentDao.prototype.save = function(comment,callback){
    var sql = "insert into comment(userid,articleid,content,addtime,replyid) values(?,?,?,?,?)",
        option = [comment.userid,comment.articleid,comment.content,comment.addtime,comment.replyid];
    BaseDao.find(sql,callback,option);
}
//获取笔记评论最热的数据（支持数大于0 或回复数大于0）（先按照支持数排序 再按回复数）
CommentDao.prototype.findHotComment = function(articleid,num,callback){
    var sql = "select c.id id,c.addtime addtime,c.content content,c.supports supports,c.replys replys,c.replyid replyid," + 
            "u.id userid,u.username username,u.headimg headimg from comment c,user u where c.userid = u.id and c.articleid = ? and (c.supports > 0 or c.replys > 0) order by c.supports desc,c.replys desc,addtime desc limit 0,?",
        option = [articleid,num];
    BaseDao.find(sql,callback,option);
}
//根据id获取评论内容、replyid、评论者用户名、评论者id
CommentDao.prototype.findContentById = function(id,callback){
    var sql = "select c.content content,c.replyid replyid,u.username username,u.id userid from comment c,user u where c.id = ? and c.userid = u.id",
        option = [id];
    BaseDao.find(sql,callback,option);
}
//分页获取评论
CommentDao.prototype.findCommentsByPage = function(articleid,first,num,callback){
    var sql = "select c.id id,c.addtime addtime,c.content content,c.supports supports,c.replys replys,c.replyid replyid," + 
            "u.id userid,u.username username,u.headimg headimg from comment c,user u where c.userid = u.id and c.articleid = ? order by addtime desc limit ?,?",
        option = [articleid,first,num];
    BaseDao.find(sql,callback,option);
}
//回复数+1
CommentDao.prototype.plusReply = function(id,callback){
    var sql = "update comment set replys = replys + 1 where id = ?",
        option = [id];
    BaseDao.find(sql,callback,option);
}
//支持数+1
CommentDao.prototype.plusSupport = function(id,callback){
    var sql = "update comment set supports = supports + 1 where id = ?",
        option = [id];
    BaseDao.find(sql,callback,option);
}

module.exports = CommentDao;