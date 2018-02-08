// login.js
import '../../stylesheets/base.css';
import '../../stylesheets/include/header.css';
import '../../stylesheets/user/login.css';
import Vue from '../vue';
var loginForm = new Vue({
    el:"#loginForm",
    data:{
        username:"",
        password:"",
        usernameFocus:false,
        passwordFocus:false,
        usernameError:false,
        passwordError:false,
        usernameInfo:"",
        passwordInfo:""
    }
});
var username = document.getElementById("username"),
    password = document.getElementById("password"),
    loginBtn = document.getElementById("loginBtn");
username.onfocus = function(){
    loginForm.usernameFocus = true;
    loginForm.usernameError = false;
}
username.onblur = function(){
    loginForm.usernameFocus = false;
    if(loginForm.username == ""){
        loginForm.usernameInfo = "我的账号不能为空";
        loginForm.usernameError = true;
    }
}
password.onfocus = function(){
    loginForm.passwordFocus = true;
    loginForm.passwordError = false;
}
password.onblur = function(){
    loginForm.passwordFocus = false;
    if(loginForm.password == ""){
        loginForm.passwordInfo = "登录密码不能为空";
        loginForm.passwordError = true;
    }
}
//提交表单
function submitForm(){
    if(loginForm.username == ""){
        loginForm.usernameInfo = "我的账号不能为空";
        loginForm.usernameError = true;
    }
    if(loginForm.password == ""){
        loginForm.passwordInfo = "登录密码不能为空";
        loginForm.passwordError = true;
    }
    if(!loginForm.usernameError && !loginForm.passwordError){
        loginForm.$el.submit();
    }
}
username.onkeydown = function(e){
    if(e.keyCode == 13){
        username.blur();
        submitForm();
    }
}
password.onkeydown = function(e){
    if(e.keyCode == 13){
        password.blur();
        submitForm();
    }
}
loginBtn.onclick = submitForm;
