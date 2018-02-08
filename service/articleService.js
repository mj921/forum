// articleService.js
var ArticleDao = require('../dao/articleDao');
var Article = require('../model/article');
var DateUtil = require('../util/dateUtil');
var StringUtil = require('../util/stringUtil');

var articleDao = new ArticleDao();

var ArticleService = function(){}

//根据id获取笔记
ArticleService.prototype.findById = function(id,callback){
    articleDao.findById(id,function(err,results){
        if(err){
            console.log(err);
            callback(err);
        }else{
            if(results.length != 1){
                console.log("该笔记id不存在");
                callback("该笔记id不存在");
            }
            var addtime = DateUtil.dateFormat(new Date(results[0].addtime),"yyyy-MM-dd HH:mm:ss");
            var article = new Article({
                id:results[0].id,
                title:results[0].title,
                content:results[0].content,
                addtime:addtime,
                reply:results[0].reply,
                pageviews:results[0].pageviews,
                collections:results[0].collections,
                likes:results[0].likes
            });
            article.username = results[0].username;
            article.userid = results[0].userid;
            article.class = results[0].class;
            article.classid = results[0].classid;
            article.headimg = results[0].headimg;
            article.userid = results[0].userid;
            article.introduction = results[0].introduction;
            callback(err,article);
        }
    });
}
//根据id和userid获取该作者的上一篇
ArticleService.prototype.findPrevByIdAndUserid = function(id,userid,callback){
    articleDao.findPrevsByIdAndUserid(id,userid,function(err,results){
        if(err){
            console.log(err);
            callback(err);
        }else{
            if(results.length > 0){
                var article = new Article({
                    id:results[0].id,
                    title:results[0].title
                })
                callback(err,article);
            }else{
                console.log("没有上一篇");
                callback(err,{});
            }
        }
    })
}
//根据id和userid获取该作者的下一篇
ArticleService.prototype.findNextByIdAndUserid = function(id,userid,callback){
    articleDao.findNextsByIdAndUserid(id,userid,function(err,results){
        if(err){
            console.log(err);
            callback(err);
        }else{
            if(results.length > 0){
                var article = new Article({
                    id:results[0].id,
                    title:results[0].title
                })
                callback(err,article);
            }else{
                console.log("没有下一篇");
                callback(err,{});
            }
        }
    })
}
//笔记评论数加1
ArticleService.prototype.plusReply = function(id,callback){
    articleDao.plusReply(id,function(err,results){
        if(err){
            console.log(err);
            callback(err);
        }else{
            if(results.affectedRows == 1){
                console.log("id:" + id + " 笔记评论数加1");
                callback(err,1);
            }else{
                console.log("id:" + id + " 笔记评论数加1失败");
                callback("id:" + id + " 笔记评论数加1失败");
            }
        }
    })
}
//根据id获取笔记回复量
ArticleService.prototype.findReplyById = function(id,callback){
    articleDao.findReplyById(id,function(err,results){
        if(err){
            console.log(err);
            callback(err);
        }else{
            if(results.length != 1){
                callback("该笔记id不存在");
            }else{
                console.log("回复量查询成功 id：" + id + " reply：" + results[0].reply);
                callback(err,results[0].reply);
            }
        }
    });
}
//统计作者笔记数和阅读量
ArticleService.prototype.authorCount = function(userid,callback){
    articleDao.authorCount(userid,function(err,results){
        if(err){
            console.log(err);
            callback(err);
        }else{
            if(results.length > 0){
                console.log("作者 id：" + userid + "笔记数和阅读量查询成功");
                callback(err,results[0]);
            }else{
                console.log("作者 id：" + userid + "笔记数和阅读量查询失败");
                callback("作者 id：" + userid + "笔记数和阅读量查询失败");
            }
        }
    });
}
//查询作者最新的15篇笔记列表
ArticleService.prototype.findNewByUserid = function(userid,id,callback){
    articleDao.findNewByUserid(userid,id,15,function(err,results){
        if(err){
            console.log(err);
            callback(err);
        }else{
            var articles = [];
            for(var i = 0;i < results.length;i++){
                var article = new Article({
                    id:results[i].id,
                    title:results[i].title
                });
                article.no = i;
                articles.push(article);
            }
            console.log("查询作者最新的15篇笔记列表成功");
            callback(err,articles);
        }
    });
}
//获取最新十篇笔记
ArticleService.prototype.getTopTen = function (callback){
    articleDao.findTopList(10,function(err,results){
        if(err){
            console.log(err);
            callback(err);
        }else{
            var articles = [];
            for(var i = 0;i < results.length;i++){
                var article = new Article({
                    id:results[i].id,
                    title:results[i].title
                });
                article.no = i;
                articles.push(article);
            }
            callback(err,articles);
        }
    });
}

//获取最新十篇推荐笔记
ArticleService.prototype.getTopTenForRecommend = function(callback){
    articleDao.findRecommendList(10,function(err,results){
        if(err){
            console.log(err);
        }else{
            var articles = [];
            for(var i = 0;i < results.length;i++){
                var article = new Article({
                    id:results[i].id,
                    title:results[i].title,
                    content:StringUtil.getStrLength(results[i].content,90),
                    pageviews:results[i].pageviews,
                    reply:results[i].reply,
                    classificationid:results[i].classificationid
                });
                article.username = results[i].username;
                article.headimg = results[i].headimg;
                article.class = results[i].class;
                articles.push(article);
            }
            callback(err,articles);
        }
    });
}

//获取最新十篇值得收藏的笔记
ArticleService.prototype.getTopTenForCollection = function(callback){
    articleDao.findCollectionList(10,function(err,results){
        if(err){
            console.log(err);
        }else{
            var articles = [];
            for(var i = 0;i < results.length;i++){
                var article = new Article({
                    id:results[i].id,
                    title:results[i].title
                });
                article.no = i;
                articles.push(article);
            }
            callback(err,articles);
        }
    });
}
//筛选分页
ArticleService.prototype.findListByFilter = function(classificationid,typeid,sortNum,currentPage,callback){
    var sortStr = "";
    switch(parseInt(sortNum)){
        case 0:
            sortStr = "a.addtime";
            break;
        case 1:
            sortStr = "a.pageviews";
            break;
        case 2:
            sortStr = "a.reply";
            break;
        case 3:
            sortStr = "a.likes";
            break;
        case 4:
            sortStr = "a.collections";
            break;
        default:
            sortStr = "a.addtime";
            break;
    }
    articleDao.findListByFilter(classificationid,typeid,sortStr,(currentPage - 1) * 20,20,function(err,results){
        if(err){
            console.log(err);
            callback(err);
        }else{
            var articles = [];
            for(var i = 0;i < results.length;i++){
                var article = new Article({
                    id:results[i].id,
                    title:results[i].title,
                    content:StringUtil.getStrLength(results[i].content,160),
                    pageviews:results[i].pageviews,
                    reply:results[i].reply,
                    classificationid:results[i].classificationid
                });
                article.username = results[i].username;
                article.headimg = results[i].headimg;
                article.classification = results[i].class;
                articles.push(article);
            }
            callback(err,articles);
        }
    });
}
//获取笔记总数
ArticleService.prototype.countArticle = function(callback){
    articleDao.countArticle(function(err,results){
        if(err){
            console.log(err);
            callback(err);
        }else{
            if(results.length == 1){
                console.log("笔记数统计成功");
                callback(err,results[0].count);
            }else{
                console.log("笔记数统计失败");
                callback("笔记数统计失败");
            }
        }
    })
}

//笔记点赞数加1
ArticleService.prototype.plusLikes = function(id,callback){
    articleDao.plusLikes(id,function(err,results){
        if(err){
            console.log(err);
            callback(err);
        }else{
            if(results.affectedRows == 1){
                console.log("id:" + id + " 笔记点赞数加1");
                callback(err,1);
            }else{
                console.log("id:" + id + " 笔记点赞数加1失败");
                callback("id:" + id + " 笔记点赞数加1失败");
            }
        }
    })
}
//笔记收藏数加1
ArticleService.prototype.plusCollections = function(id,callback){
    articleDao.plusCollections(id,function(err,results){
        if(err){
            console.log(err);
            callback(err);
        }else{
            if(results.affectedRows == 1){
                console.log("id:" + id + " 笔记收藏数加1");
                callback(err,1);
            }else{
                console.log("id:" + id + " 笔记收藏数加1失败");
                callback("id:" + id + " 笔记收藏数加1失败");
            }
        }
    })
}
//笔记浏览量加1
ArticleService.prototype.plusPageviews = function(id,callback){
    articleDao.plusPageviews(id,function(err,results){
        if(err){
            console.log(err);
            callback(err);
        }else{
            if(results.affectedRows == 1){
                console.log("id:" + id + " 笔记点赞数加1");
                callback(err,1);
            }else{
                console.log("id:" + id + " 笔记点赞数加1失败");
                callback("id:" + id + " 笔记点赞数加1失败");
            }
        }
    })
}

//新增笔记
ArticleService.prototype.addArticle = function(article,callback){
    articleDao.save(article,function(err,results){
        if(err){
            console.log(err);
            callback(err);
        }else{
            if(results.affectedRows == 1){
                console.log("新增笔记成功");
                callback(err,1);
            }else{
                console.log("新增笔记失败");
                callback("新增笔记失败");
            }
        }
    })
}

module.exports = ArticleService;
