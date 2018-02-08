// user.js
var User = function(user){
	this.id = user.id;
	this.username = user.username;
	this.password = user.password;
	this.experience = user.experience;
	this.level = user.level;
	this.addtime = user.addtime;
	this.headimg = user.headimg;
    this.introduction = user.introduction;
}
module.exports = User;
