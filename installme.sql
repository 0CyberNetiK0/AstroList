CREATE TABLE `user_data` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `username` varchar(255) NOT NULL,
    `discordId` varchar(255) NOT NULL,
    PRIMARY KEY (`id`) USING BTREE
);