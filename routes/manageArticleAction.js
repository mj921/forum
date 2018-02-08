// manageArticleAction.js
var express = require('express');
var router = express.Router();

var ClassificationService = require('../service/classificationService');
var ArticleService = require('../service/articleService');
var TypeService = require('../service/typeService');
var Classification = require('../model/classification');
var Article = require('../model/article');
var Type = require('../model/type');

var classificationService = new ClassificationService();
var articleService = new ArticleService();
var typeService = new TypeService();

router.use(function(req,res,next){
    if(req.session.user){
        next();
    }else{
        res.redirect("/user/login.html?redirection=" + req.originalUrl);
    }
})

//我的笔记
router.get('/myArticles.html',function(req,res,next){
    res.render('manage/article/myArticles',{pageId:"article"});
});

//写笔记
router.get('/addArticle.html',function(req,res,next){
    var option = {pageId:"article"},
        backUrl = '/manage/article/myArticles.html';
    //获取所有类别
    classificationService.findAll(function(err,classifications){
        if(err){
            res.render('error',{message:err,backUrl:backUrl});
        }else{
            option.classifications = classifications;
            typeService.findAll(function(err,types){
                if(err){
                    res.render('error',{message:err,backUrl:backUrl});
                }else{
                    option.types = types;
                    res.render('manage/article/addArticle',option);
                }
            });
        }
    });
});
router.post('/saveArticle.html',function(req,res,next){
    var backUrl = '/manage/article/addArticle.html',
        article = new Article({
            title:req.body.title,
            content:req.body.content,
            userid:parseInt(req.body.userid),
            classificationid:parseInt(req.body.classificationid),
            typeid:parseInt(req.body.typeid),
            reply:0,
            collections:0,
            likes:0,
            pageviews:0,
            addtime:new Date()
        }),
        message = checkArticle(article);
        article.content = article.content.replace(/\[(\/?[b|p])\]/g,"<$1>")
                            .replace(/\[align=([^\]]+)\]/g,"<span style='text-align:$1;'>")
                            .replace(/\[\/align\]/g,"</span>")
                            .replace(/\[color=([^\]]+)\]/g,"<span style='color:$1;'>")
                            .replace(/\[\/color\]/g,"</span>")
                            .replace(/\n/g,"<br>");
        console.log(article.content);
    if(message.length > 0){
        res.send({result:0,message:message});
        return;
    }
    articleService.addArticle(article,function(err,result){
        if(err){
            res.send({result:0,message:err});
        }else{
            res.send({result:0,message:"保存成功"});
        }
    });
})

//检验笔记是否能保存
function checkArticle(article){
    var message = "",
        content = article.content
                    .replace(/\[(\/?[b|p])\]/g,"")
                    .replace(/\[align=([^\]]+)\]/g,"")
                    .replace(/\[\/align\]/g,"")
                    .replace(/\[color=([^\]]+)\]/g,"")
                    .replace(/\[\/color\]/g,"");
    if(article.title.length < 5){
        message = "笔记标题不能少于5个字符";
    }else if(content.length < 50){
        message = "笔记内容不能少于50个字符";
    }else if(article.userid <= 0){
        message = "笔记作者不能为空";
    }else if(article.classificationid <= 0){
        message = "请选择一个系统分类";
    }else if(article.typeid <= 0){
        message = "请选择一个笔记类型";
    }
    return message;
}

module.exports = router;