var express = require('express');
var router = express.Router();

var ClassificationService = require('../service/classificationService');
var ArticleService = require('../service/articleService');
var Classification = require('../model/classification');
var Article = require('../model/article');

var classificationService = new ClassificationService();
var articleService = new ArticleService();

/* GET home page. */
router.get('/', function(req, res, next) {
    var option = {pageId:"index"},
        backUrl = '/';
	//获取所有类别
	classificationService.findAll(function(err,classifications){
        if(err){
            res.render('error',{message:err,backUrl:backUrl});
        }else{
            option.classifications = classifications;
            //获取最新十篇笔记
            articleService.getTopTen(function(err,articles){
                if(err){
                    res.render('error',{message:err,backUrl:backUrl});
                }else{
                    option.topTenArticles = articles;
                    //获取最新十篇推荐笔记
                    articleService.getTopTenForRecommend(function(err,articles){
                        if(err){
                            res.render('error',{message:err,backUrl:backUrl});
                        }else{
                            option.tenRecommendArticles = articles;
                            //获取最新十篇值得收藏的笔记
                            articleService.getTopTenForCollection(function(err,articles){
                                if(err){
                                    res.render('error',{message:err,backUrl:backUrl});
                                }else{
                                    option.tenCollectionArticles = articles;
                                    res.render('index',option);
                                }
                            })
                        }
                    })
                }
            })
        }
	});
});
router.get('/first',function(req, res, next){
    res.json({name:"aaa",pwd:"123"});
});
router.get('/test.html',function(req, res, next){
    res.render('test',{pageId:"test"});
});

module.exports = router;
