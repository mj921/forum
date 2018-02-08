// article.js
var Article = function(article){
	this.id = article.id;
	this.title = article.title;
	this.content = article.content;
	this.userid = article.userid;
	this.addtime = article.addtime;
	this.classificationid = article.classificationid;
	this.pageviews = article.pageviews;
	this.reply = article.reply;
	this.typeid = article.typeid;
	this.likes = article.likes;
	this.collections = article.collections;
}
module.exports = Article;
// `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id',
//   `title` varchar(20) NOT NULL COMMENT '标题',
//   `content` varchar(400) NOT NULL COMMENT '内容',
//   `userid` int(11) NOT NULL COMMENT '作者id',
//   `addtime` datetime NOT NULL COMMENT '添加时间',
//   `classificationid` int(11) NOT NULL COMMENT '笔记类别id',
//   `pageviews` int(11) NOT NULL DEFAULT '0' COMMENT '浏览量',
//   `reply` int(11) NOT NULL COMMENT '回复量',
//   `typeid` int(11) NOT NULL COMMENT '笔记类型id',
//   `likes` int(11) NOT NULL DEFAULT '0' COMMENT '点赞数',
//   `collections` int(11) NOT NULL DEFAULT '0' COMMENT '收藏数',