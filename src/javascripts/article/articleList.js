// articleList.js
(function(){

    var filterData = {
            classificationid:document.getElementById("classificationid").value,
            typeid:document.getElementById("typeid").value,
            sortNum:document.getElementById("sortNum").value
        }
    // 筛选
    var filter = new Vue({
        el:"#filter",
        methods:{
            liClick:function(e,key){
                var self = e.target,
                    lis = self.parentNode.getElementsByTagName("li");
                for(var i = 0;i < lis.length;i++){
                    if(lis[i] == self){
                        filterData[key] = i;
                        lis[i].className = "current";
                    }else{
                        lis[i].className = "";
                    }
                }
                loadArticleList(1);
            }
        }
    });


    var articleList = new Vue({
        el:"#articleList",
        data:{
            items:[],
            page:{currentPage:1,pages:0,total:0},
            nums:[],
            pageShow:false
        },
        methods:{
            loadArticleList:loadArticleList,
            //上一页
            prevPage:function(){
                if(this.page.currentPage > 1){
                    loadArticleList(page.currentPage - 1);
                }
            },
            //下一页
            nextPage:function(){
                if(this.page.currentPage < page.pages){
                    loadArticleList(page.currentPage + 1);
                }
            }
        }
    })
    //加载文章列表
    function loadArticleList(currentPage){
        console.log(filterData)
        filterData.currentPage = currentPage;
        MjAjax.ajax({
            url:"/article/getArticleList.html",
            type:"post",
            data:filterData,
            dataType:"json",
            success:function(json){
                if(json.result == 1){
                    var nums = [],
                        page = json.page;
                    if(page.pages < 6){
                        for(var i = 1;i < page.pages + 1;i++){
                            nums.push({index:i,current:i == page.currentPage ? "current" : ""});
                        }
                    }else if(page.currentPage + 1 < page.pages){
                        for(var i = page.currentPage - 2;i < page.currentPage + 3;i++){
                            nums.push({index:i,current:i == page.currentPage ? "current" : ""});
                        }
                    }else{
                        for(var i = page.pages - 4;i < page.pages + 1;i++){
                            nums.push({index:i,current:i == page.currentPage ? "current" : ""});
                        }
                    }
                    console.log(json)
                    articleList.items = json.list;
                    articleList.page = page;
                    articleList.nums = nums;
                    if(page.pages > 1){
                        articleList.pageShow = true;
                    }else{
                        articleList.pageShow = false;
                    }
                }
            }
        }); 
    }
    loadArticleList(1);
})();