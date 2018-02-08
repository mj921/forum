// StringUtil.js
var StringUtil = {};

//获取指定长度的字符串 中文占一个 其他1/3个
StringUtil.getStrLength = function(str,num){
    var s = "",
        n = 0;
    for(var i = 0;n < num * 2 && i < str.length;i++){
        if(/^[\u4e00-\u9fa5]$/.test(str[i])){
            n += 2;
            s += str[i];
        }else if(!/^\s$/.test(str[i])){
            n++;
            s += str[i];
        }
    }
    return s + "...";
}

module.exports = StringUtil;