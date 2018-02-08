// articleAction.js
var express = require('express');
var router = express.Router();

var ArticleService = require('../service/articleService');
var Article = require('../model/article');
var CommentService = require('../service/commentService');
var Comment = require('../model/comment');
var ClassificationService = require('../service/classificationService');
var Classification = require('../model/classification');
var TypeService = require('../service/typeService');
var Type = require('../model/type');
var CollectionService = require('../service/collectionService');
var Collection = require('../model/collection');
var LikeService = require('../service/likeService');
var Like = require('../model/like');

var articleService = new ArticleService();
var commentService = new CommentService();
var classificationService = new ClassificationService();
var typeService = new TypeService();
var collectionService = new CollectionService();
var likeService = new LikeService();

//笔记详情页
router.get('/detail.html',function(req,res,next){
    var backUrl = "/";
    var option = {pageId:"article",newCommentList:[]};
    //笔记信息
    articleService.findById(req.query.id,function(err,article){
        if(err){
            res.render('error',{message:err,backUrl:backUrl});
        }else{
            option.article = article;
            if(req.session.user){
                userid = req.session.user.id;
            }else{
                userid = 0;
            }

            articleService.plusPageviews(req.query.id,function(err,results){
                 if(err){
                    res.render('error',{message:err,backUrl:backUrl});
                }
            })
            //用户是否点赞该笔记
            likeService.isLike(req.query.id,userid,function(err,status){
                if(err){
                    res.render('error',{message:err,backUrl:backUrl});
                }else{
                    option.likeStatus = status;
                    //用户是否收藏该笔记
                    collectionService.isCollection(req.query.id,userid,function(err,status){
                        if(err){
                            res.render('error',{message:err,backUrl:backUrl});
                        }else{
                            option.collectionStatus = status;
                            //上一篇笔记
                            articleService.findPrevByIdAndUserid(option.article.id,option.article.userid,function(err,article){
                                if(err){
                                    res.render('error',{message:err,backUrl:backUrl});
                                }else{
                                    option.prevArticle = article;
                                    //下一篇笔记
                                    articleService.findNextByIdAndUserid(option.article.id,option.article.userid,function(err,article){
                                        if(err){
                                            res.render('error',{message:err,backUrl:backUrl});
                                        }else{
                                            option.nextArticle = article;
                                            //最热评论
                                            commentService.findHotComment(option.article.id,function(err,comments){
                                                if(err){
                                                    res.render('error',{message:err,backUrl:backUrl});
                                                }else{
                                                    option.hotCommentList = comments;
                                                    //统计作者笔记数和阅读量
                                                    articleService.authorCount(option.article.userid,function(err,authorCount){
                                                        if(err){
                                                            res.render('error',{message:err,backUrl:backUrl});
                                                        }else{
                                                            option.authorCount = authorCount;
                                                            //查询作者最新的15篇笔记列表
                                                            articleService.findNewByUserid(option.article.userid,option.article.id,function(err,articles){
                                                                if(err){
                                                                    res.render('error',{message:err,backUrl:backUrl});
                                                                }else{
                                                                    option.newArticles = articles;
                                                                    res.render('article/detail',option);
                                                                }
                                                            });
                                                        }
                                                    });
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    });
});

//笔记列表页
router.get('/articleList.html',function(req,res,next){
    var option = {pageId:"article",classificationid:req.query.classificationid || 0,typeid:req.query.typeid || 0,sortNum:req.query.sortNum || 0},
        backUrl = '/';
    //获取所有的分类
    classificationService.findAll(function(err,classifications){
        if(err){
            res.render('error',{message:err,backUrl:backUrl});
        }else{
            option.classifications = classifications;
            //获取所有的类型
            typeService.findAll(function(err,types){
                if(err){
                    res.render('error',{message:err,backUrl:backUrl});
                }else{
                    option.types = types;
                    res.render('article/articleList',option);
                }
            });
        }
    });
});
//笔记列表数据
router.post('/getArticleList.html',function(req,res,next){
    var option = {page:{currentPage:req.body.currentPage,num:20}}
    //获取笔记列表
    articleService.findListByFilter(req.body.classificationid,req.body.typeid,req.body.sortNum,option.page.currentPage,function(err,articles){
        if(err){
            res.send({message:err,result:0});
        }else{
            option.list = articles;
            //统计笔记总数
            articleService.countArticle(function(err,count){
                if(err){
                    res.send({message:err,result:0});
                }else{
                    option.page.total = count;
                    option.page.pages = ~~((count + option.page.num - 1) / option.page.num);
                    option.result = 1;
                    res.send(option);
                }
            });
        }
    });
});
//点赞文章
router.post('/likeArticle.html',function(req,res,next){
    var like = new Like({articleid:req.body.articleid,userid:req.body.userid,addtime:new Date()});
    likeService.save(like,function(err,result){
        if(err){
            res.send({result:0,message:err});
        }else{
            ArticleService.prototype.plusLikes(like.articleid,function(err,result){
                if(err){
                    res.send({result:0,message:err});
                }else{
                    res.send({result:1,message:"点赞成功"});
                }
            })
        }
    });
});
//收藏文章
router.post('/collectionArticle.html',function(req,res,next){
    var collection = new Collection({articleid:req.body.articleid,userid:req.body.userid,addtime:new Date()});
    collectionService.save(collection,function(err,result){
        if(err){
            res.send({result:0,message:err});
        }else{
            ArticleService.prototype.plusCollections(collection.articleid,function(err,result){
                if(err){
                    res.send({result:0,message:err});
                }else{
                    res.send({result:1,message:"收藏成功"});
                }
            })
        }
    });
});

module.exports = router;