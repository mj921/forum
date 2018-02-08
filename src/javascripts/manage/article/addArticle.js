var replaceText = function(first,last){
    var ec = document.getElementById("editorContent");
    if (window.getSelection) { 
        editor.content = editor.content.substring(0,ec.selectionStart) + first + editor.content.substring(ec.selectionStart,ec.selectionEnd) + last + editor.content.substring(ec.selectionEnd,ec.value.length);
    // } else {
    //     //IE浏览器
    //     return document.selection.createRange().text;
    }
}
var editor = new Vue({
    el:"#editor",
    data:{
        title:'',
        colorStr:'#ff0000',
        styleStr:'background-color:#ff0000;',
        content:'',
        tid:0,
        cid:0
    },
    methods:{
        bold:function(){
            replaceText("[b]","[/b]");
        },
        color:function(color){
            replaceText("[color=" + color + "]","[/color]");
            this.colorStr = color;
            this.styleStr = 'background-color:' + color + ';'
        },
        textLeft:function(){
            replaceText("[align=left]","[/align]");
        },
        textCenter:function(){
            replaceText("[align=center]","[/align]");
        },
        textRight:function(){
            replaceText("[align=right]","[/align]");
        },
        paragraph:function(){
            replaceText("[p]","[/p]");
        },
        submit:function(){
            MjAjax.ajax({
                url:"/manage/article/saveArticle.html",
                type:"post",
                data:{userid:document.getElementById('userid').value,title:this.title,content:document.getElementById("editorContent").value,typeid:this.tid,classificationid:this.cid},
                dataType:"json",
                success:function(json){
                    console.log(json);
                }
            });
        }
    }
});
