// detail.js
(function(){
    var hideArticle = document.getElementById("hideArticle"),
        articleObj = document.createElement("article"),
        contentInfo = document.getElementById("contentInfo");
    articleObj.innerHTML = hideArticle.value;
    var articlePres = articleObj.getElementsByTagName("pre");
    for(var i = 0,len = articlePres.length;i < len;i++){
        var text = document.createTextNode(articlePres[i].innerHTML);
        articlePres[i].innerHTML = "";
        articlePres[i].appendChild(text);
    }
    contentInfo.getElementsByTagName("article")[0].innerHTML = articleObj.innerHTML;
    contentInfo.removeChild(hideArticle);
    var articleId = $("#articleId"),
        userId = $("#userId");
   
    var likes = new Vue({
        el:"#likes",
        data:{
            isActive:false,
            likes:0
        },
        methods:{
            click:function(){
                if(userId.val()){
                    if(!likes.isActive){
                        MjAjax.ajax({
                            url:"/article/likeArticle.html",
                            type:"post",
                            data:{articleid:articleId.val(),userid:userId.val()},
                            dataType:"json",
                            success:function(json){
                                if(json.result == 1){
                                    likes.isActive = true;
                                    likes.likes++;
                                    MjDialog.like();
                                }else{
                                    alert(json.message);
                                }
                            }
                        });
                    }
                }else{
                    window.location.href = "/user/login.html?redirection=" + (window.location.href.replace(/\?/g,"%3F").replace(/&/g,"%26"));
                }
            }
        }
    });

    //收藏
    var collections = new Vue({
        el:"#collections",
        data:{
            isActive:false,
            collections:0
        },
        methods:{
            click:function(){
                if(userId.val()){
                    if(!collections.isActive){
                        MjAjax.ajax({
                            url:"/article/collectionArticle.html",
                            type:"post",
                            data:{articleid:articleId.val(),userid:userId.val()},
                            dataType:"json",
                            success:function(json){
                                if(json.result == 1){
                                    alert(json.message);
                                    collections.isActive = true;
                                    collections.collections++;
                                }else{
                                    alert(json.message);
                                }
                            }
                        });
                    }
                }else{
                    window.location.href = "/user/login.html?redirection=" + (window.location.href.replace(/\?/g,"%3F").replace(/&/g,"%26"));
                }
            }
        }
    });

    //评论
    var commentBtn = $("#commentBtn"),
        commandContent = $("#commandContent"),
        replyNum = $("#articleCom").find("b");
    //评论
    commentBtn.click(function(){
        if(commandContent.val() == ""){
            alert("你没写内容呐，怎么发布呢？赶紧说两句儿吧～");
        }else{
            $.ajax({
                url:"/comment/commentArticle.html",
                type:"post",
                data:{userid:userId.val(),articleid:articleId.val(),content:commandContent.val(),replyid:0},
                dataType:"json",
                success:function(json){
                    if(json.result == 1){
                        loadCommentList(1);
                        replyNum.text(parseInt(replyNum.text()) + 1);
                    }
                }
            });
        }
    });
    if($("#loginCom").length > 0){
        var loginComVue = new Vue({
            el:"#loginCom",
            data:{
                content:""
            },
            methods:{
                comment:function(){
                    if(this.content == ""){
                        alert("你没写内容呐，怎么发布呢？赶紧说两句儿吧～");
                    }else{
                        $.ajax({
                            url:"/comment/commentArticle.html",
                            type:"post",
                            data:{userid:userId.val(),articleid:articleId.val(),content:this.content,replyid:0},
                            dataType:"json",
                            success:function(json){
                                if(json.result == 1){
                                    loadCommentList(1);
                                    replyNum.text(parseInt(replyNum.text()) + 1);
                                    alert("评论成功");
                                }
                            }
                        });
                    }
                }
            }
        });
    }
    var replyHtml = $("#replyHtml"),
        replyid = 0,
        replyHtmlVue;
    // 回复按钮点击事件
    function replyClick(){
        $("#mainLeft").find(".reply-html").remove();
        var self = $(this),
            replyObj = $(replyHtml.html()),
            replyid = self.attr("data-replyid");
        self.parent().parent().parent().after(replyObj);
        replyHtmlVue = new Vue({
            el:".reply-html",
            data:{message:""}
        });
        $(".btn-canel").click(function(){
             $(this).parent().remove();
        });
        $(".btn-yes").click(function(){
            var parentObj = $(this).parent();
            var textareaObj = parentObj.find("textarea");
            if(textareaObj.val() == ""){
                alert("你没写内容呐，怎么发布呢？赶紧说两句儿吧～");
            }else{
                $.ajax({
                    url:"/comment/commentArticle.html",
                    type:"post",
                    data:{userid:userId.val(),articleid:articleId.val(),content:textareaObj.val(),replyid:replyid},
                    dataType:"json",
                    success:function(json){
                        if(json.result == 1){
                            parentObj.remove();
                            loadCommentList(1);
                            self.next().text("(" + (parseInt(self.next().text().replace(/[^0-9]/g,"")) + 1) + ")");
                            replyNum.text(parseInt(replyNum.text()) + 1);
                        }
                    }
                });
            }
        });
    }
    //绑定回复按钮点击事件
    function showReply(){
        if(replyHtml.html()){
            var replyBtns = $(".reply-btn");
            replyBtns.unbind("click",replyClick);
            replyBtns.bind("click",replyClick);
        }
    }
    showReply();
    //支持按钮点击事件
    function supportClick(){
         var self = $(this);
            console.log(self[0])
            $.ajax({
                url:"/comment/supportComment.html",
                type:"post",
                data:{id:self.attr("data-replyid")},
                dataType:"json",
                success:function(json){
                    if(json.result == 1){
                        self.next().text("(" + (parseInt(self.next().text().replace(/[^0-9]/g,"")) + 1) + ")");
                    }
                }
            });
    }
    // 绑定支持按钮点击事件
    function bindSupport(){
        var supportBtns =  $(".support-btn");
        supportBtns.unbind("click",supportClick);
        supportBtns.bind("click",supportClick);
    }
    bindSupport();
    var commentList = $("#commentList"),
        pageObj = $("#page"),
        pages = $("#pages"),
        currentPageObj = $("#currentPage"),
        pagesNum = $("#pagesNum"),
        firstPage = $("#firstPage"),
        prevPage = $("#prevPage"),
        nextPage = $("#nextPage"),
        lastPage = $("#lastPage");

    //加载评论
    function loadCommentList(currentPage){
        $.ajax({
            url:"/comment/commentList.html",
            type:"post",
            data:{articleid:articleId.val(),currentPage:currentPage},
            dataType:"json",
            success:function(json){
                if(json.result == 1 && json.list.length > 0){
                    var list = json.list,
                        page = json.page,
                        resultStr = "";
                    for(var i = 0;i < list.length;i++){
                        resultStr += '<dl class="comment-li">' + 
                                        '<a href="" class="headimg"><img src="../' + list[i].headimg + '" alt="' + list[i].username + '"></a>' + 
                                        '<h1><a href="">' + list[i].username + '</a>' + list[i].addtime + '</h1>' + 
                                        '<p>' + list[i].content + '</p>' + 
                                        '<h2><a href="javascript:void(0)" class="support-btn" data-replyid="' + list[i].id + '">支持</a><i>(' + list[i].supports + ')</i><span><a href="javascript:void(0)" class="reply-btn" data-replyid="' + list[i].id + '">回复</a><i>(' + list[i].replys + ')</i></span></h2>' + 
                                    '</dl>';
                    }
                    commentList.html(resultStr);
                    showReply();
                    bindSupport();
                    if(page.pages > 1){
                        var pageStr = '';
                        pageObj.show();
                        for(var i = 1;i <= page.pages;i++){
                            if(page.currentPage == i){
                                pageStr += '<li class="current"><a href="javascript:void(0)">' + i + '</a></li>';
                            }else{
                                pageStr += '<li><a href="javascript:void(0)">' + i + '</a></li>';
                            }
                        }
                        pages.html(pageStr);
                        pageObj.attr("data-current",page.currentPage);
                        currentPageObj.val(page.currentPage);
                        pagesNum.text(page.pages);
                        pageByNum();
                    }else{
                        pageObj.hide();
                    }
                }else{

                }
            }
        });
    }
    loadCommentList(1);
    //首页
    firstPage.click(function(){
        loadCommentList(1);
    });
    // 上一页
    prevPage.click(function(){
        if(parseInt(pageObj.attr("currentPage")) > 1){
            loadCommentList(parseInt(pageObj.attr("currentPage")) - 1);
        }
    });
    // 下一页
   nextPage.click(function(){
        if(parseInt(pageObj.attr("currentPage")) < parseInt(pagesNum.text())){
            loadCommentList(parseInt(pageObj.attr("currentPage")) + 1);
        }
    });
    //尾页
    lastPage.click(function(){
        loadCommentList(parseInt(pagesNum.text()));
    });
    //根据页码翻页
    function pageByNum(){
        var numBtn = pages.find("li a");
        numBtn.click(function(){
            loadCommentList($(this).text());
        });
    }
    currentPageObj.bind("input",function(){
        currentPageObj.val((currentPageObj.val().replace(/[^0-9]/g,"")));
        if(parseInt(currentPageObj.val()) > parseInt(pagesNum.text())){
            currentPageObj.val(pagesNum.text());
        }else if(parseInt(currentPageObj.val()) < 1){
            currentPageObj.val(1);
        }
    });
    currentPageObj.blur(function(){
        if(currentPageObj.val() == ""){
            currentPageObj.val(pageObj.attr("currentPage"));
        }
    });
    currentPageObj.keydown(function(e){
        if(e.keyCode == 13 && currentPageObj.val() != ""){
            loadCommentList(parseInt(currentPageObj.val()));
        }
    });

})();