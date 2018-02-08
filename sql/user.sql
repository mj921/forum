/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50525
Source Host           : localhost:3306
Source Database       : forum

Target Server Type    : MYSQL
Target Server Version : 50525
File Encoding         : 65001

Date: 2017-03-17 15:17:31
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `username` varchar(16) NOT NULL DEFAULT '' COMMENT '用户名',
  `password` varchar(16) NOT NULL DEFAULT '' COMMENT '密码',
  `experience` int(11) NOT NULL DEFAULT '0' COMMENT '经验',
  `level` int(4) NOT NULL DEFAULT '1' COMMENT '等级',
  `addtime` datetime NOT NULL COMMENT '添加时间',
  `headimg` varchar(200) NOT NULL COMMENT '头像图片',
  `introduction` varchar(200) NOT NULL DEFAULT '',
  `email` varchar(20) NOT NULL DEFAULT '',
  `emailstatus` bit(1) NOT NULL DEFAULT b'0' COMMENT '是否邮箱验证',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', 'mj921', 'asdf1234', '0', '1', '2017-03-06 00:00:00', 'images/uploads/headimgs/default.jpg', '与自己为敌，与自己为友，一边深挖思想，一边埋葬自己。与自己为敌，与自己为友，一边深挖思想，一边埋葬自己。', '', '');
INSERT INTO `user` VALUES ('2', 'mjmj921', 'asdf1234', '0', '1', '2017-03-06 17:37:30', 'images/uploads/headimgs/default.jpg', '', '', '');
INSERT INTO `user` VALUES ('3', 'mjmjmj921', 'asdf1234', '0', '1', '2017-03-06 17:38:36', 'images/uploads/headimgs/default.jpg', '', '', '');
INSERT INTO `user` VALUES ('4', 'mj921921', 'asdf1234', '0', '1', '2017-03-16 18:31:19', 'images/uploads/headimgs/default.jpg', '', '', '');
INSERT INTO `user` VALUES ('5', 'mj921mj921', 'asdf1234', '0', '1', '2017-03-16 18:32:33', 'images/uploads/headimgs/default.jpg', '', '', '');
INSERT INTO `user` VALUES ('6', 'mmjj', 'asdf1234', '0', '1', '2017-03-17 10:05:30', 'images/uploads/headimgs/default.jpg', '', '', '');
