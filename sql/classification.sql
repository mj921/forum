/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50525
Source Host           : localhost:3306
Source Database       : forum

Target Server Type    : MYSQL
Target Server Version : 50525
File Encoding         : 65001

Date: 2017-03-17 15:17:06
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `classification`
-- ----------------------------
DROP TABLE IF EXISTS `classification`;
CREATE TABLE `classification` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `name` varchar(20) NOT NULL DEFAULT '' COMMENT '类别名称',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of classification
-- ----------------------------
INSERT INTO `classification` VALUES ('1', 'HTML/CSS');
INSERT INTO `classification` VALUES ('2', 'JavaScript');
INSERT INTO `classification` VALUES ('3', 'Node.js');
INSERT INTO `classification` VALUES ('4', '手机移动');
INSERT INTO `classification` VALUES ('5', '前端安全');
INSERT INTO `classification` VALUES ('6', '性能优化');
INSERT INTO `classification` VALUES ('7', '类库框架');
INSERT INTO `classification` VALUES ('8', '开发调试');
INSERT INTO `classification` VALUES ('9', '浏览器');
INSERT INTO `classification` VALUES ('10', '面试经验');
