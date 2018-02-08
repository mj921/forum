// comment.js
var Comment = function(comment){
    this.id = comment.id;
    this.userid = comment.userid;
    this.articleid = comment.articleid;
    this.content = comment.content;
    this.addtime = comment.addtime;
    this.replyid = comment.replyid;
    this.supports = comment.supports;
    this.replys = comment.replys;
}

module.exports = Comment;


// `id` int(11) NOT NULL COMMENT 'id',
// `userid` int(11) NOT NULL DEFAULT '0' COMMENT '评论人id',
// `articleid` int(11) NOT NULL DEFAULT '0',
// `content` text NOT NULL COMMENT '评论内容',
// `addtime` datetime NOT NULL COMMENT '评论时间',
// `replyid` int(11) NOT NULL COMMENT '回复评论的id',