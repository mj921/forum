// login.js
(function(){
    var loginForm = angular.module("loginForm",[]);
    loginForm.controller("loginFormCtrl",function($scope){
        $scope.username = "";
        $scope.password = "";
        $scope.usernameFocus = false;
        $scope.passwordFocus = false;
        $scope.usernameError = false;
        $scope.passwordError = false;
        $scope.usernameInfo = "";
        $scope.passwordInfo = "";
        $scope.submitForm = function(){
            if($scope.username == ""){
                $scope.usernameInfo = "我的账号不能为空";
                $scope.usernameError = true;
            }
            if($scope.password == ""){
                $scope.passwordInfo = "登录密码不能为空";
                $scope.passwordError = true;
            }
            if(!$scope.usernameError && !$scope.passwordError){
                document.getElementById("loginForm").submit();
            }
        }
        $scope.usFocus = function(){
            $scope.usernameFocus = true;
            $scope.usernameError = false;
        }
        $scope.usBlur = function(){
            $scope.usernameFocus = false;
            if($scope.username == ""){
                $scope.usernameInfo = "我的账号不能为空";
                $scope.usernameError = true;
            }
        };
        $scope.psdFocus = function(){
            $scope.passwordFocus = true;
            $scope.passwordError = false;
        };
        $scope.psdBlur = function(){
            $scope.passwordFocus = false;
            if($scope.password == ""){
                $scope.passwordInfo = "登录密码不能为空";
                $scope.passwordError = true;
            }
        };
        $scope.usKeydown = function($event){
            if($event.keyCode == 13){
                document.getElementById("username").blur();
                $scope.submitForm();
            }
        };
        $scope.psdKeydown = function($event){
            if($event.keyCode == 13){
                document.getElementById("password").blur();
                $scope.submitForm();
            }
        }
    });
})()