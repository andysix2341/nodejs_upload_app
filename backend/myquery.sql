CREATE DATABASE user_data;

USE user_data;

CREATE TABLE `user_data` (
  `user_id` VARCHAR(60) NOT NULL,
  `user_name` VARCHAR(60) NOT NULL,
  `user_password` VARCHAR(20) NOT NULL,
  `user_email` VARCHAR(90) NOT NULL,
  `Bio` VARCHAR(250),
  `image_name` VARCHAR(90),
  PRIMARY KEY (`user_id`)
);

SELECT * FROM user_data;
SELECT * FROM _prisma_migrations;

DELETE FROM user_data;

DROP TABLE user_data;