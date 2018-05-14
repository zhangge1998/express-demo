SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for userInformation
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(20) NOT NULL,
  `userpass` varchar(20) NOT NULL,
  `useremail` varchar(100) NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8 COMMENT='用户表';

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', '阿一', '123456', '111@163.com');
INSERT INTO `user` VALUES ('2', '阿二', '123456', '222@21cn.com');
INSERT INTO `user` VALUES ('3', '阿三', '123456', '333@yeah.net');
INSERT INTO `user` VALUES ('4', '阿四', '123456', '444@sina.com.cn');






