// classificationService.js
var ClassificationDao = require('../dao/classificationDao');
var Classification = require('../model/classification');

var classificationDao = new ClassificationDao();

var ClassificationService = function(){};

//获取所有类别
ClassificationService.prototype.findAll = function(callback){
    classificationDao.findAll(function(err,results){
        if(err){
            console.log(err);
        }else{
            var classifications = [];
            for(var i = 0;i < results.length;i++){
                var classification = new Classification({
                    id:results[i].id,
                    name:results[i].name
                });
                classifications.push(classification);
            }
            callback(err,classifications);
        }
    });
}

module.exports = ClassificationService;