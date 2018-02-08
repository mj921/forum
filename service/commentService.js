// commentService.js
var CommentDao = require('../dao/commentDao');
var Comment = require('../model/comment');
var DateUtil = require('../util/dateUtil');

var commentDao = new CommentDao();
var CommentService = function(){};

//插入一条评论
CommentService.prototype.save = function(comment,callback){
    commentDao.save(comment,function(err,results){
        if(err){
            callback(err);
        }else{
            if(results && results.affectedRows == 1){
                console.log('评论成功');
                callback(err,1);
            }else{
                console.log('评论失败');
                callback("评论失败");
            }
        }
    });
}

//获取笔记评论最热的5条数据
CommentService.prototype.findHotComment = function(articleid,callback){
    commentDao.findHotComment(articleid,5,function(err,results){
        if(err){
            callback(err);
        }else{
            var comments = [];
            for(var i = 0;i < results.length;i++){
                var comment = new Comment({
                    id:results[i].id,
                    addtime:DateUtil.dateFormat(new Date(results[i].addtime),"yyyy-MM-dd HH:mm:ss"),
                    supports:results[i].supports,
                    content:results[i].content,
                    replys:results[i].replys,
                    replyid:results[i].replyid
                });
                comment.userid = results[i].userid;
                comment.username = results[i].username;
                comment.headimg = results[i].headimg;
                // comment.content = getContentByIteration(comment,callback);
                comments.push(comment);
            }
            callback(err,comments);
        }
    })
}
//分页获取评论
CommentService.prototype.findCommentsByPage = function(articleid,current,callback){
    commentDao.findCommentsByPage(articleid,(current - 1) * 10,10,function(err,results){
        if(err){
            callback(err);
        }else{
            var comments = [];
            for(var i = 0;i < results.length;i++){
                var comment = new Comment({
                    id:results[i].id,
                    addtime:DateUtil.dateFormat(new Date(results[i].addtime),"yyyy-MM-dd HH:mm:ss"),
                    supports:results[i].supports,
                    content:results[i].content,
                    replys:results[i].replys,
                    replyid:results[i].replyid
                });
                comment.userid = results[i].userid;
                comment.username = results[i].username;
                comment.headimg = results[i].headimg;
                comments.push(comment);
            }
            callback(err,comments);
        }
    })
}
//回复数+1
CommentService.prototype.plusReply = function(id,callback){
    commentDao.plusReply(id,function(err,results){
        if(err){
            callback(err);
        }else{
            if(results.affectedRows == 1){
                callback(err,1)
            }else{
                callback("评论回复数加1失败");
            }
        }
    });
}
//支持数+1
CommentService.prototype.plusSupport = function(id,callback){
    commentDao.plusSupport(id,function(err,results){
        if(err){
            callback(err);
        }else{
            if(results.affectedRows == 1){
                callback(err,1)
            }else{
                callback("评论支持数加1失败");
            }
        }
    });
}

// function setComment(results,i,len,callback,comments,err){
//     if(i < len){
//         var comment = new Comment({
//             id:results[i].id,
//             addtime:results[i].addtime,
//             supports:results[i].supports,
//             content:results[i].content,
//             replys:results[i].replys,
//             replyid:results[i].replyid
//         });
//         comment.userid = results[i].userid;
//         comment.username = results[i].username;
//         comment.headimg = results[i].headimg;
//         i++;
//         comment.content = getContentByIteration(comment,callback,function(){
//             setComment(results,i,len,callback,comments,err);
//         });
//     }else{
//         console.log(comments);
//         callback(comments);
//     }
// }

//迭代获取所有评论内容
function getContentByIteration(comment,callback){
    if(comment.replyid && comment.replyid != 0){
        commentDao.findContentById(comment.replyid,function(err,results){
            if(err){
                callback(err);
            }else{
                return comment.content + " @" + comment.username + ":" + getContentByIteration(results[0],callback);
            }
        });
    }else{
        return comment.content;
    }
}

module.exports = CommentService;