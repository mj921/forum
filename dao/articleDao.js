// articleDao.js
var pool = require('./mysqlConnection');
var BaseDao = require('./baseDao');
var Article = require('../model/article');

var ArticleDao = function(){}

//获取前几条数据
ArticleDao.prototype.findTopList = function(num,callback){
    var sql = "select * from article order by addtime desc limit 0,?",
        option = [num];
    BaseDao.find(sql,callback,option);
}
//获取推荐的前几条数据(点赞数大于5)
ArticleDao.prototype.findRecommendList = function(num,callback){
    var sql = "select a.id id,a.title title,a.content content,a.pageviews pageviews,a.reply reply,a.classificationid classificationid,u.username username," + 
            "u.headimg headimg,c.name class from article a,user u,classification c " + 
            "where a.userid = u.id and a.classificationid = c.id and a.likes > 5 order by a.addtime desc limit 0,?",
        option = [num];
    BaseDao.find(sql,callback,option);
}
//获取收藏大于10的前几条数据
ArticleDao.prototype.findCollectionList = function(num,callback){
    var sql = "select * from article where collections > 10 order by addtime desc limit 0,?",
        option = [num];
    BaseDao.find(sql,callback,option);
}
//根据id获取笔记和作者信息
ArticleDao.prototype.findById = function(id,callback){
    var sql = "select a.id id,a.title title,a.content content,a.addtime addtime,a.reply reply,a.pageviews pageviews,a.likes likes," + 
            "a.collections collections,u.id userid,u.id userid,u.username username,u.headimg headimg,u.introduction introduction,c.id classid,c.name class " + 
            "from article a,user u,classification c where a.id = ? and a.userid = u.id and a.classificationid = c.id",
        option = [id];
    BaseDao.find(sql,callback,option);
}
//根据id获取笔记回复量
ArticleDao.prototype.findReplyById = function(id,callback){
    var sql = "select reply from article where id = ?",
        option = [id];
    BaseDao.find(sql,callback,option);
}
//获取userid的作者id之前的笔记
ArticleDao.prototype.findPrevsByIdAndUserid = function(id,userid,callback){
    var sql = "select * from article where id < ? and userid = ? order by id desc",
        option = [id,userid];
    BaseDao.find(sql,callback,option);
}
//获取userid的作者id之后的笔记
ArticleDao.prototype.findNextsByIdAndUserid = function(id,userid,callback){
    var sql = "select * from article where id > ? and userid = ?",
        option = [id,userid];
    BaseDao.find(sql,callback,option);
}
//笔记评论数加1
ArticleDao.prototype.plusReply = function(id,callback){
    var sql = "update article set reply = reply + 1 where id = ?",
        option = [id];
    BaseDao.find(sql,callback,option);
}
//统计作者笔记数和阅读量
ArticleDao.prototype.authorCount = function(userid,callback){
    var sql = "select count(id) articleNum,sum(reply) replyNum from article where userid = ?",
        option = [userid];
    BaseDao.find(sql,callback,option);
}
//查询作者最新的笔记列表
ArticleDao.prototype.findNewByUserid = function(userid,id,num,callback){
    var sql = "select * from article where userid = ? and id != ? limit 0,?",
        option = [userid,id,num];
    BaseDao.find(sql,callback,option);
}
//筛选分页
ArticleDao.prototype.findListByFilter = function(classificationid,typeid,sortStr,first,num,callback){
    var sql = "select a.id id,a.title title,a.content content,a.pageviews pageviews,a.reply reply,a.classificationid classificationid,u.username username," + 
            "u.headimg headimg,c.name class from article a,user u,classification c " + 
            "where a.userid = u.id and a.classificationid = c.id and (a.classificationid = ? or 0 = ?) and (a.typeid = ? or 0 = ?) order by " + sortStr + " desc limit ?,?",
        option = [classificationid,classificationid,typeid,typeid,first,num];
    BaseDao.find(sql,callback,option);
}
//获取笔记总数
ArticleDao.prototype.countArticle = function(callback){
    var sql = "select count(id) count from article";
    BaseDao.find(sql,callback);
}
//笔记点赞数加1
ArticleDao.prototype.plusLikes = function(id,callback){
    var sql = "update article set likes = likes + 1 where id = ?",
        option = [id];
    BaseDao.find(sql,callback,option);
}
//笔记收藏数加1
ArticleDao.prototype.plusCollections = function(id,callback){
    var sql = "update article set collections = collections + 1 where id = ?",
        option = [id];
    BaseDao.find(sql,callback,option);
}
//笔记浏览量加1
ArticleDao.prototype.plusPageviews = function(id,callback){
    var sql = "update article set pageviews = pageviews + 1 where id = ?",
        option = [id];
    BaseDao.find(sql,callback,option);
}
//保存笔记
ArticleDao.prototype.save = function(article,callback){
    var sql = "insert into article(title,content,userid,addtime,classificationid,pageviews,reply,typeid,likes,collections) values(?,?,?,?,?,?,?,?,?,?)",
        option = [article.title,article.content,article.userid,article.addtime,article.classificationid,article.pageviews,article.reply,article.typeid,article.likes,article.collections];
    BaseDao.find(sql,callback,option);
}

module.exports = ArticleDao;