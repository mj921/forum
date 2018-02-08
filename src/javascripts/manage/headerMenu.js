// headerMenu.js
var mainLeft = new Vue({
    el:"#mainLeft",
    data:{
        isSmall:false,
        textShow:true,
        sto:null
    },
    methods:{
        back:function(){
            if(this.isSmall){
                this.$el.parentNode.style.paddingLeft = "200px";
                this.sto = setTimeout(function(){
                    mainLeft.textShow = true;
                },200)
            }else{
                clearTimeout(this.sto);
                this.$el.parentNode.style.paddingLeft = "70px";
                this.textShow = false;
            }
            this.isSmall = !this.isSmall;
        }
    }
});