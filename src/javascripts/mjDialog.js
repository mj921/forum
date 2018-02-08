// mjDialog.js
var MjDialog = {};
MjDialog.dialogs = {};
MjDialog.index = 0;
//点赞
MjDialog.like = function(time1,time2){
    var like = document.createElement("div");
    like.className = "mjDialog-like W3CfunsIcons-font";
    document.body.appendChild(like);
    setTimeout(function(){
        MjDialog.animate(like,{
            fontSize:"250px",
            width:"1000px",
            height:"1000px",
            marginLeft:"-500px",
            marginTop:"-500px",
            opacity:"0"
        },time1 || 600);
    },time1 || 600);
    setTimeout(function(){
        document.body.removeChild(like);
    },(time1 || 600) + (time2 || 600));
}
MjDialog.dialog = function(option){
    option = option || {};

    var mask = document.createElement("div");
    mask.className = "mjDialog-mask";

    var dialog = document.createElement("div");
    dialog.className = "mjDialog-dialog"; 
    index = ++MjDialog.index;
    MjDialog.dialogs["dialog" + MjDialog.index] = [dialog,mask];

    var title = document.createElement("div");
    title.className = "mjDialog-dialog-title";
    title.innerText = option.title || "标题";
    dialog.appendChild(title);

    var close = document.createElement("b");
    close.className = "mjDialog-dialog-close";
    title.appendChild(close);
    close.innerText = "×";

    var content = document.createElement("div");
    content.className = "mjDialog-dialog-content";
    dialog.appendChild(content);
    content.innerHTML = option.content || "<p></p>";

    var btnBg = document.createElement("div");
    btnBg.className = "mjDialog-dialog-btns";
    var btns = [];
    var btnClassNames = "default-primary-danger";
    for(var i = 0;option.btns && i < option.btns.length;i++){
        if(btnClassNames.length != btnClassNames.replace(option.btns[i].name,"").length){
            var btn = document.createElement("a");
            btn.className = "mjDialog-dialog-btn mjDialog-btn-" + option.btns[i].name;
            btn.innerText = option.btns[i].text;
            btn.onclick = function(i){
                return function(){
                    option.methods[i](index);
                }
            }(i);
            btns.push(btn);
            btnBg.appendChild(btn);
        }
    }
    if(btns.length > 1){
        btns[0].style.float = "left";
    }
    dialog.appendChild(btnBg);
    document.body.appendChild(mask);
    document.body.appendChild(dialog);
    close.onclick = function(){
        document.body.removeChild(mask);
        document.body.removeChild(dialog);
    }
};
MjDialog.msg = function(option){
    option = option || {};

    var msg = document.createElement("div");
    switch(option.type){
        case "success":
            msg.className = "mjDialog-msg-success W3CfunsIcons-font";
            break;
        case "error":
            msg.className = "mjDialog-msg-error W3CfunsIcons-font";
            break;
        case "warn":
            msg.className = "mjDialog-msg-warn W3CfunsIcons-font";
            break;
        default:
            msg.className = "mjDialog-msg W3CfunsIcons-font";
            break;
    }
    var p = document.createElement("p");
    p.innerText = option.message;
    msg.appendChild(p);

    setTimeout(function(){
        document.body.removeChild(msg);
    },option.time || 3000);
    document.body.appendChild(msg);
}
MjDialog.close = function(index){
    for(var i = 0,len = MjDialog.dialogs["dialog" + index].length;i < len;i++){
        document.body.removeChild(MjDialog.dialogs["dialog" + index][i]);
    }
}
//动画
MjDialog.animate = function(dom,option,time){
    var cOption = {},
        t = ~~(time / 1000 * 60),
        i = 0,
        style = window.getComputedStyle(dom,null),
        cStyle = {};
    for(key in option){
        cOption[key] = (parseFloat(option[key].replace(/[^0-9.-]/g,"")) - parseFloat(style[key].replace(/[^0-9.-]/g,"") || 0)) / t;
        cStyle[key] = style[key];
    }
    function _animate(){
        if(i < t){
            setTimeout(_animate,1000 / 60);
            for(key in option){
                cStyle[key] = parseFloat(cStyle[key].replace(/[^0-9.-]/g,"") || 0) + cOption[key] + option[key].replace(/\d|\.|-/g,"");
                dom.style[key] = cStyle[key];
            }
        }else{
            for(key in option){
                dom.style[key] = option[key];
            }
        }
        i++;
    }
    _animate();
};