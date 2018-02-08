// typeService.js
var TypeDao = require('../dao/typeDao');
var Type = require('../model/type');

var typeDao = new TypeDao();

var TypeService = function(){}

TypeService.prototype.findAll = function(callback){
    typeDao.findAll(function(err,results){
        if(err){
            console.log(err);
            callback(err);
        }else{
            var types = [];
            for(var i = 0;i < results.length;i++){
                var type = new Type({
                    id:results[i].id,
                    name:results[i].name
                });
                types.push(type);
            }
            callback(err,types);
        }
    });
}

module.exports = TypeService;