// register.js
import '../../stylesheets/base.css';
import '../../stylesheets/include/header.css';
import '../../stylesheets/user/register.css';
import Vue from '../vue';
var registerForm = new Vue({
    el:"#registerForm",
    data:{
        username:"",
        password:"",
        confirmPwd:"",
        usernameInfo:"",
        passwordInfo:"",
        confirmPwdInfo:"",
        isUsername:false,
        isPassword:false,
        isConfirmPwd:false,
        usernameClass:false,
        passwordClass:false,
        confirmPwdClass:false
    }
});
var registerBtn = document.getElementById("registerBtn"),
    username = document.getElementById("username"),
    password = document.getElementById("password"),
    confirmPwd = document.getElementById("confirmPwd");
username.onblur = function(){
    registerForm.usernameClass = false;
    if(registerForm.username == ""){
        registerForm.usernameInfo = "用户名不能为空";
        registerForm.isUsername = true;
    }else if(!/[0-9a-zA-Z]{4,8}/.test(registerForm.username)){
        registerForm.usernameInfo = "请输入4-8位的数字字母";
        registerForm.isUsername = true;
    }
}
username.onfocus = function(){
    registerForm.isUsername = false;
    registerForm.usernameClass = true;
}
password.onblur = function(){
    registerForm.passwordClass = false;
    if(registerForm.password == ""){
        registerForm.passwordInfo = "密码不能为空";
        registerForm.isPassword = true;
    }else if(!/[0-9a-zA-Z]{4,8}/.test(registerForm.password)){
        registerForm.passwordInfo = "请输入8-16位的数字字母";
        registerForm.isPassword = true;
    }
}
password.onfocus = function(){
    registerForm.isPassword = false;
    registerForm.passwordClass = true;
}
confirmPwd.onblur = function(){
    registerForm.confirmPwdClass = false;
    if(registerForm.password != registerForm.confirmPwd){
        registerForm.confirmPwdInfo = "两次密码输入不一致";
        registerForm.isConfirmPwd = true;
    }
}
confirmPwd.onfocus = function(){
    registerForm.isConfirmPwd = false;
    registerForm.confirmPwdClass = true;
}
//注册
registerBtn.onclick = function(){
    if(registerForm.username == ""){
        registerForm.usernameInfo = "用户名不能为空";
        registerForm.isUsername = true;
    }else if(!/[0-9a-zA-Z]{4,8}/.test(registerForm.username)){
        registerForm.usernameInfo = "请输入4-8位的数字字母";
        registerForm.isUsername = true;
    }
    if(registerForm.password == ""){
        registerForm.passwordInfo = "密码不能为空";
        registerForm.isPassword = true;
    }else if(!/[0-9a-zA-Z]{4,8}/.test(registerForm.password)){
        registerForm.passwordInfo = "请输入8-16位的数字字母";
        registerForm.isPassword = true;
    }
    if(registerForm.password != registerForm.confirmPwd){
        registerForm.confirmPwdInfo = "两次密码输入不一致";
        registerForm.isConfirmPwd = true;
    }
    if(!registerForm.isUsername && !registerForm.isPassword && !registerForm.isConfirmPwd){
        registerForm.$el.submit();
    }
};
