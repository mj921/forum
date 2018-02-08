// collectionService.js
var CollectionDao = require('../dao/collectionDao');

var collectionDao = new CollectionDao();

var CollectionService = function(){}

CollectionService.prototype.save = function(collection,callback){
    collectionDao.save(collection,function(err,results){
        if(err){
            console.log(err);
            callback(err);
        }else{
            if(results.affectedRows == 1){
                console.log("收藏成功");
                callback(err,{results:1,id:results.id});
            }else{
                console.log("收藏失败");
                callback("收藏失败");
            }
        }
    });
}
//判断用户是否收藏过该笔记
CollectionService.prototype.isCollection = function(articleid,userid,callback){
    collectionDao.findByArticleAndUser(articleid,userid,function(err,results){
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

module.exports = CollectionService;