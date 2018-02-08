// likeService.js
var LikeDao = require('../dao/likeDao');

var likeDao = new LikeDao();

var LikeService = function(){}

LikeService.prototype.save = function(collection,callback){
    likeDao.save(collection,function(err,results){
        if(err){
            console.log(err);
            callback(err);
        }else{
            if(results.affectedRows == 1){
                console.log("点赞成功");
                callback(err,{results:1,id:results.id});
            }else{
                console.log("点赞失败");
                callback("点赞失败");
            }
        }
    });
}
//判断用户是否点赞过该笔记
LikeService.prototype.isLike = function(articleid,userid,callback){
    likeDao.findByArticleAndUser(articleid,userid,function(err,results){
        if(err){
            console.log(err);
            callback(err);
        }else{
            if(results.length > 0){
                callback(err,1);
            }else{
                callback(err,0);
            }
        }
    });
}

module.exports = LikeService;