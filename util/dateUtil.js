// dateUtil.js
var DateUtil = {};

DateUtil.dateFormat = function(date,fmt){
    var opt = {
        "M+":date.getMonth() + 1,
        "d+":date.getDate(),
        "H+":date.getHours(),
        "h+":date.getHours() > 12 ? date.getHours() - 12 : date.getHours(),
        "m+":date.getMinutes(),
        "s+":date.getSeconds(),
        "S+":date.getMilliseconds()
    }
    if(/(y+)/.test(fmt)){
        fmt = fmt.replace(RegExp.$1,(date.getFullYear() + "").substr(-RegExp.$1.length));
    }
    for(var k in opt){
        if(new RegExp("(" + k + ")").test(fmt)){
            fmt = fmt.replace(RegExp.$1,((opt[k] < 10 ? "0" : "") + opt[k]).substr(-RegExp.$1));
        }
    }
    return fmt;
}

module.exports = DateUtil;