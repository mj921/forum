var express = require('express');
var multer = require('multer');

var EmailUtil = require('../util/emailUtil');

var User = require('../model/user');
var UserService = require('../service/userService');

var router = express.Router();
var userService = new UserService();
var storage = multer.diskStorage({
	destination:function(req,file,cb){
		cb(null,"/images/uploads/headimgs/");
	},
	filename:function(req,file,cb){
		now = new Date();
		cb(null,req.body.id + ".jpg");
	}
});
var upload = multer({storage:storage});

//登录页面
router.get('/login.html', function(req, res, next) {
	if(req.session.user){
		res.redirect('/');
	}else{
		req.session.redirection = req.query.redirection;
		res.render('user/login',{pageId:""});
	}
});
//登录页面
router.get('/loginNG.html', function(req, res, next) {
	if(req.session.user){
		res.redirect('/');
	}else{
		req.session.redirection = req.query.redirection;
		res.render('user/loginNG',{pageId:""});
	}
});
//登录操作
router.post('/doLogin.html',function(req,res,next){
	var u = new User({username:req.body.username,password:req.body.password}),
		backUrl = '/user/login.html';
	userService.findUserByUserName(u.username,function(err,user){
		if(err){
			res.render('error',{message:err,backUrl:backUrl});
		}else{
			if(user){
				if(u.username == user.username && u.password == user.password){
					console.log("登录：登陆成功");
					req.session.user = user;
					if(req.session.redirection){
						var redirection = req.session.redirection;
						req.session.redirection = null;
						res.redirect(redirection);
					}else{
						res.redirect('/');
					}
				}else{
					console.log("登录：密码错误");
					res.render('error',{message:"密码错误",backUrl:backUrl});
				}
			}else{
				res.render('error',{message:"用户名不存在",backUrl:backUrl});
			}
		}
	});
})
//登录操作
router.get('/doLogin.html',function(req,res,next){
	var u = new User({username:req.query.username,password:req.query.password}),
		backUrl = '/user/login.html';
	userService.findUserByUserName(u.username,function(err,user){
		if(err){
			res.render('error',{message:err,backUrl:backUrl});
		}else{
			if(user){
				if(u.username == user.username && u.password == user.password){
					console.log("登录：登陆成功");
					req.session.user = user;
					if(req.session.redirection){
						var redirection = req.session.redirection;
						req.session.redirection = null;
						res.redirect(redirection);
					}else{
						res.redirect('/');
					}
				}else{
					console.log("登录：密码错误");
					res.render('error',{message:"密码错误",backUrl:backUrl});
				}
			}else{
				res.render('error',{message:"用户名不存在",backUrl:backUrl});
			}
		}
	});
})
//注册页面
router.get('/register.html',function(req,res,next){
	if(req.session.user){
		res.redirect('/');
	}else{
		res.render('user/register',{pageId:""});
	}
})
//注册操作
router.post('/doRegister.html',function(req,res,next){
	var u = new User({
		username:req.body.username,
		password:req.body.password,
		experience:0,
		level:0,
		addtime:new Date(),
		headimg:"/images/uploads/headimgs/default.jpg"
	}),
		backUrl = "/user/register.html";
	userService.findUserByUserName(u.username,function(err,user){
		if(err){
			res.render('error',{message:err,backUrl:backUrl});
		}else{
			if(user){
				res.render('error',{message:"用户名已存在",backUrl:backUrl});
			}else{
				if(req.body.password == req.body.confirmPwd){
					userService.doRegister(u,function(err,result){
						if(err){
							res.render('error',{message:err,backUrl:backUrl});
						}else if(result == 1){
							res.redirect('/user/login.html');
						}else{
							console.error("注册失败");
							res.render('error',{message:"注册失败",backUrl:backUrl});
						}
					})
				}else{
					console.error("两次密码不一致");
					res.render('error',{message:"两次密码不一致",backUrl:backUrl});
				}
			}
		}
	});
})
router.get('/logout.html',function(req,res,next){
	req.session.user = null;
	res.render('user/login',{pageId:""});
})

module.exports = router;
