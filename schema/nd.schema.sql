CREATE TABLE IF NOT EXISTS `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(128) NOT NULL,
  `isDeleted` BOOLEAN NOT NULL DEFAULT FALSE,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `journal` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `table` varchar(255) NOT NULL,
  `timestamp` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `operation` char(6) NOT NULL,
  `tableId` int(10) NOT NULL,
  `userId` int(10) NOT NULL,
  `entryKey` varchar(255) NOT NULL,
  `entryOldValue` varchar(255) NOT NULL,
  `entryNewValue` varchar(1024) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `authentries` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `token` varchar(255) NOT NULL,
  `validUntil` timestamp NOT NULL,
  `id_user` int(10) unsigned NOT NULL,
  `isDeleted` BOOLEAN NOT NULL DEFAULT FALSE,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS 'businesses' (
'id' int(10) unsigned NOT NULL AUTO_INCREMENT,
'name' varchar(255) NOT NULL,
'socialName' varchar(255) NOT NULL,
'branch' varchar(255) NOT NULL,
'commit' varchar(255) NOT NULL, 
'isDeleted' BOOLEAN NOT NULL DEFAULT FALSE,
PRIMARY KEY ('id')
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


