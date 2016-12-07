CREATE TABLE `site` (
    `id`     TINYINT(3)   UNSIGNED NOT NULL AUTO_INCREMENT,
    `slug`   VARCHAR(30)                    DEFAULT NULL,
    `name`   VARCHAR(70)                    DEFAULT NULL,
    `domain` VARCHAR(255)                   DEFAULT NULL,
    `gtm`    VARCHAR(255)                   DEFAULT NULL,
    `thanks` TEXT,
    PRIMARY KEY      (`id`),
    KEY     `slug`   (`slug`),
    KEY     `domain` (`domain`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;


CREATE TABLE `prize` (
    -- immutable if it has a contest date is in the past
    `id`    SMALLINT(5)  UNSIGNED NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255)                   DEFAULT NULL,
    `img1`  BINARY(16)                     DEFAULT NULL COMMENT 'JPG MD5',
    `desc1` VARCHAR(512)                   DEFAULT NULL,
    `img2`  BINARY(16)                     DEFAULT NULL COMMENT 'JPG MD5',
    `desc2` VARCHAR(512)                   DEFAULT NULL,
    `img3`  BINARY(16)                     DEFAULT NULL COMMENT 'JPG MD5',
    `desc3` VARCHAR(512)                   DEFAULT NULL,
    `award` VARCHAR(255)                   DEFAULT NULL COMMENT '$200 Giftcard',
    `value` SMALLINT(5)  UNSIGNED          DEFAULT NULL COMMENT '200',
    `type`  ENUM('giftcard', 'prize')      DEFAULT 'giftcard',
    PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;


CREATE TABLE `contest` (
    -- immutable if date is in the past
    `date`           DATE                  NOT NULL,
    `prize_id`       SMALLINT(5)  UNSIGNED NOT NULL,
    `winner_user_id` MEDIUMINT(8) UNSIGNED          DEFAULT NULL,
    `winner_site_id` TINYINT(3)   UNSIGNED          DEFAULT NULL,
    `entries`        MEDIUMINT(8) UNSIGNED NOT NULL DEFAULT  '0',
    PRIMARY KEY        (`date`),
    KEY     `prize_id` (`prize_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;


CREATE TABLE `entry` (
    `date`        DATE                  NOT NULL,
    `user_id`     MEDIUMINT(8) UNSIGNED NOT NULL,
    `user_email`  VARCHAR(70)                     DEFAULT NULL,
    `site_id`     TINYINT(3)   UNSIGNED NOT NULL,
    `time`        TIME                  NOT NULL,
    PRIMARY KEY (`date`, `user_id`, `site_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;


CREATE TABLE `user` (
    `id`              MEDIUMINT(8) UNSIGNED NOT NULL AUTO_INCREMENT,
    `role`            TINYINT(1)   UNSIGNED NOT NULL DEFAULT  '1'                               COMMENT '1=user, 2=admin',
    `verified`        TINYINT(1)   UNSIGNED NOT NULL DEFAULT  '0'                               COMMENT '1 if email address is verified',
    `ip`              INT(11)      UNSIGNED NOT NULL DEFAULT  '0'                               COMMENT 'INET_ATON() of IP address during registration',
    `optin`           TINYINT(1)   UNSIGNED NOT NULL DEFAULT  '0'                               COMMENT '1=true, 0=false',
    `site_id`         TINYINT(3)   UNSIGNED NOT NULL DEFAULT  '0'                               COMMENT 'which site the user first signed up on/for',
    `date_registered` TIMESTAMP                 NULL DEFAULT NULL                               COMMENT 'registration timestamp',
    `date_verified`   TIMESTAMP                 NULL DEFAULT NULL                               COMMENT 'latest timestamp email address verified',
    `date_updated`    TIMESTAMP                 NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP   COMMENT 'latest timestamp of update to profile fields',
    `email`           VARCHAR(70)                    DEFAULT NULL                               COMMENT 'unique key; on change remove reset/verify tokens and set verified to 0',
    `password`        BINARY(20)                     DEFAULT NULL                               COMMENT 'sha1 of password+salt (stored in SPROC)',
    `firstname`       VARCHAR(255)                   DEFAULT NULL,
    `lastname`        VARCHAR(255)                   DEFAULT NULL,
    `address`         VARCHAR(255)                   DEFAULT NULL,
    `city`            VARCHAR(255)                   DEFAULT NULL,
    `state`           CHAR(2)                        DEFAULT NULL,
    `zip`             MEDIUMINT(5) UNSIGNED ZEROFILL DEFAULT NULL,
    PRIMARY KEY        (`id`),
    UNIQUE KEY `email` (`email`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- This *could* be stored in memcache
CREATE TABLE `reset` (
    `email`      VARCHAR(70)             DEFAULT  NULL,
    `token`      CHAR(8)                 DEFAULT  NULL              COMMENT 'token hash',
    `type`       ENUM('reset', 'verify') DEFAULT 'reset',
    `timestamp`  TIMESTAMP               DEFAULT  CURRENT_TIMESTAMP COMMENT 'creation time',
    PRIMARY KEY (`email`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
