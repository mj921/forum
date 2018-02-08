// commentAction.js
var express = require('express');
var router = express.Router();

var ArticleService = require('../service/articleService');
var Article = require('../model/article');
var CommentService = require('../service/commentService');
var Comment = require('../model/comment');

var articleService = new ArticleService();
var commentService = new CommentService();

//评论
router.post('/commentArticle.html',function(req,res,next){
    var backUrl = '/article/detail/html?id=' + req.body.articleid;
    var comment = new Comment({
        userid:req.body.userid,
        articleid:req.body.articleid,
        content:req.body.content,
        addtime:new Date(),
        replyid:req.body.replyid
    }) 
    commentService.save(comment,function(err,result){
        if(err){
            console.log(err);
            res.render('error',{error:err,backUrl:backUrl});
        }else{
            articleService.plusReply(comment.articleid,function(err,result){
                if(err){
                    console.log(err);
                    res.render('error',{error:err,backUrl:backUrl});
                }else{
                    if(comment.replyid == 0){
                        res.send({result:result});
                    }else{
                        commentService.plusReply(comment.replyid,function(err,result){
                            if(err){
                                console.log(err);
                                res.render('error',{error:err,backUrl:backUrl});
                            }else{
                                res.send({result:result});
                            }
                        });
                    }
                }
            });
        }
    });
});

//支持
router.post('/supportComment.html',function(req,res,next){
    var backUrl = '/';
    commentService.plusSupport(req.body.id,function(err,result){
        if(err){
            console.log(err);
            res.render('error',{message:err,backUrl:backUrl});
        }else{
            res.send({result:1});
        }
    });
});

//分页获取评论列表
router.post('/commentList.html',function(req,res,next){
    var page = {currentPage:req.body.currentPage || 1,num:10};
    commentService.findCommentsByPage(req.body.articleid,parseInt(page.currentPage),function(err,comments){
        if(err){
            console.log(err);
            res.send({result:0,message:err});
        }else{
            articleService.findReplyById(req.body.articleid,function(err,reply){
                page.total = reply;
                page.pages = ~~((reply + 9) / 10)
                res.send({result:1,list:comments,page:page})
            })
        }
    });
});

module.exports = router;