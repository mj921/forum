/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50525
Source Host           : localhost:3306
Source Database       : forum

Target Server Type    : MYSQL
Target Server Version : 50525
File Encoding         : 65001

Date: 2017-03-21 16:33:17
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `like`
-- ----------------------------
DROP TABLE IF EXISTS `like`;
CREATE TABLE `like` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `articleid` int(11) NOT NULL COMMENT '笔记id',
  `userid` int(11) NOT NULL COMMENT '用户id',
  `addtime` datetime NOT NULL COMMENT '添加时间',
  PRIMARY KEY (`id`),
  KEY `like_articleid` (`articleid`),
  KEY `like_userid` (`userid`),
  CONSTRAINT `like_userid` FOREIGN KEY (`userid`) REFERENCES `user` (`id`),
  CONSTRAINT `like_articleid` FOREIGN KEY (`articleid`) REFERENCES `article` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of like
-- ----------------------------
