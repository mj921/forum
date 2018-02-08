/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50525
Source Host           : localhost:3306
Source Database       : forum

Target Server Type    : MYSQL
Target Server Version : 50525
File Encoding         : 65001

Date: 2017-03-17 15:17:15
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `comment`
-- ----------------------------
DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `userid` int(11) NOT NULL DEFAULT '0' COMMENT '评论人id',
  `articleid` int(11) NOT NULL DEFAULT '0' COMMENT '评论笔记id',
  `content` varchar(2000) NOT NULL COMMENT '评论内容',
  `addtime` datetime NOT NULL COMMENT '评论时间',
  `replyid` int(11) NOT NULL COMMENT '回复评论的id',
  `replys` int(8) NOT NULL DEFAULT '0' COMMENT '回复数',
  `supports` int(8) NOT NULL DEFAULT '0' COMMENT '支持数',
  PRIMARY KEY (`id`),
  KEY `com_userid` (`userid`),
  KEY `com_articleid` (`articleid`),
  CONSTRAINT `com_articleid` FOREIGN KEY (`articleid`) REFERENCES `article` (`id`),
  CONSTRAINT `com_userid` FOREIGN KEY (`userid`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of comment
-- ----------------------------
INSERT INTO `comment` VALUES ('1', '1', '5', '第一次评论', '2017-03-14 09:33:49', '0', '0', '0');
INSERT INTO `comment` VALUES ('2', '1', '5', '第二次评论', '2017-03-14 09:58:37', '0', '13', '3');
INSERT INTO `comment` VALUES ('3', '1', '5', '回复评论', '2017-03-15 14:34:36', '2', '0', '0');
INSERT INTO `comment` VALUES ('4', '1', '5', '第四次评论', '2017-03-15 14:40:20', '0', '0', '0');
INSERT INTO `comment` VALUES ('5', '1', '5', '第五次评论', '2017-03-15 14:40:58', '0', '0', '0');
INSERT INTO `comment` VALUES ('6', '1', '5', '第六次评论', '2017-03-15 14:41:32', '0', '0', '0');
INSERT INTO `comment` VALUES ('7', '1', '5', '第七次评论', '2017-03-15 14:45:37', '0', '0', '0');
INSERT INTO `comment` VALUES ('8', '1', '5', '第八次评论', '2017-03-15 14:45:46', '0', '0', '0');
INSERT INTO `comment` VALUES ('9', '1', '5', '第9次评论', '2017-03-15 14:45:52', '0', '0', '0');
INSERT INTO `comment` VALUES ('10', '1', '5', '第10次评论', '2017-03-15 14:45:56', '0', '0', '0');
INSERT INTO `comment` VALUES ('11', '1', '5', '第11次评论', '2017-03-15 14:45:59', '0', '0', '0');
INSERT INTO `comment` VALUES ('12', '1', '5', '第12次评论', '2017-03-15 15:37:51', '0', '0', '0');
INSERT INTO `comment` VALUES ('13', '1', '5', '第二次评论 的 第2次评论', '2017-03-15 15:38:37', '2', '0', '0');
INSERT INTO `comment` VALUES ('14', '1', '5', '第二次评论 的 第3次评论', '2017-03-15 15:39:52', '2', '0', '0');
INSERT INTO `comment` VALUES ('15', '1', '5', '第二次评论 的 第3次评论', '2017-03-15 15:40:53', '2', '0', '0');
INSERT INTO `comment` VALUES ('16', '1', '5', '第二次评论 的 第3次评论', '2017-03-15 15:40:55', '2', '0', '0');
INSERT INTO `comment` VALUES ('17', '1', '5', '第二次评论 的 第6次评论', '2017-03-15 15:42:45', '2', '0', '0');
INSERT INTO `comment` VALUES ('18', '1', '5', '第二次评论 的 第7次评论', '2017-03-15 15:43:28', '2', '0', '0');
INSERT INTO `comment` VALUES ('19', '1', '5', '第二次评论 的 第8次评论\n', '2017-03-15 15:44:44', '2', '0', '0');
INSERT INTO `comment` VALUES ('20', '1', '5', '第二次评论 的 第8次评论\n', '2017-03-15 15:44:47', '2', '0', '0');
INSERT INTO `comment` VALUES ('21', '1', '5', '第二次评论 的 第10次评论', '2017-03-15 15:45:23', '2', '0', '0');
INSERT INTO `comment` VALUES ('22', '1', '5', '第二次评论 的 第11次评论', '2017-03-15 15:54:38', '2', '0', '0');
INSERT INTO `comment` VALUES ('23', '1', '5', '第二次评论 的 第12次评论', '2017-03-15 15:57:27', '2', '0', '0');
INSERT INTO `comment` VALUES ('24', '1', '5', '第二次评论 的 第13次评论', '2017-03-15 15:58:24', '2', '1', '4');
INSERT INTO `comment` VALUES ('25', '1', '5', '第二次评论 的 第13次评论 的 第1次评论', '2017-03-15 16:03:50', '24', '0', '1');
