-- CreateTable
CREATE TABLE `user_data` (
    `user_id` VARCHAR(60) NOT NULL,
    `user_name` VARCHAR(60) NOT NULL,
    `user_password` VARCHAR(20) NOT NULL,
    `user_email` VARCHAR(90) NOT NULL,
    `Bio` VARCHAR(250) NULL,
    `image_name` VARCHAR(90) NULL,

    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

