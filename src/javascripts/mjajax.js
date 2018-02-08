// ajax.js
// 2017-03-21 mj

var MjAjax = {};
//创建xmlHttp对象
MjAjax.createXmlHttp = function(){
    if(window.XMLHttpRequest){
        return new XMLHttpRequest();
    }else{
        return new ActiveXObject("Microsoft.XMLHTTP");
    }
}
//ajax方法
MjAjax.ajax = function(option){
    var xmlHttp = MjAjax.createXmlHttp();
    xmlHttp.open(option.type,option.url,option.async === false ? false : true);
    if(option.type == "post"){
        xmlHttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        var dataStr = "";
        for(item in option.data){
            dataStr += item + "=" + option.data[item] + "&";
        }
        dataStr = dataStr.length > 0 ? dataStr.substr(0,dataStr.length - 1) : "";
        xmlHttp.send(dataStr);
    }else{
        xmlHttp.send();
    }
    xmlHttp.onreadystatechange = function(){
        if(xmlHttp.readyState == 4 && xmlHttp.status == 200){
            if(option.success){
                switch(option.dataType){
                    case "json":
                        var result = JSON.parse(xmlHttp.responseText);
                        break;
                    case "text":
                        var result = xmlHttp.responseText;
                        break;
                    default:
                        var result = xmlHttp.responseText;
                        break;
                }
                option.success(result);
            };
        }
    }
}