DROP VIEW IF EXISTS `view_prize`;
CREATE VIEW `view_prize` AS
SELECT
    `c`.`date`,
    `p`.`id`,
    `p`.`title`,
    IF(`p`.`img1` IS NULL, NULL, CONCAT('/pimg/', LOWER(HEX(`p`.`img1`)), '.jpg')) `img1`,
    `p`.`desc1`,
    IF(`p`.`img2` IS NULL, NULL, CONCAT('/pimg/', LOWER(HEX(`p`.`img2`)), '.jpg')) `img2`,
    `p`.`desc2`,
    IF(`p`.`img3` IS NULL, NULL, CONCAT('/pimg/', LOWER(HEX(`p`.`img3`)), '.jpg')) `img3`,
    `p`.`desc3`,
    `p`.`award`,
    `p`.`value`,
    `p`.`type`,
    `c`.`winner_user_id`,
    `c`.`winner_site_id`
FROM
    `contest` `c`
LEFT JOIN
    `prize` `p` ON (`c`.`prize_id` = `p`.`id`);


DROP VIEW IF EXISTS`view_winner`;
CREATE VIEW `view_winner` AS
SELECT
    `vp`.`date`,
    `vp`.`id`         AS `prize_id`,
    `vp`.`title`      AS `prize_title`,
    `vp`.`img1`       AS `prize_img1`,
    `vp`.`desc1`      AS `prize_desc1`,
    `vp`.`img2`       AS `prize_img2`,
    `vp`.`desc2`      AS `prize_desc2`,
    `vp`.`img3`       AS `prize_img3`,
    `vp`.`desc3`      AS `prize_desc3`,
    `vp`.`award`      AS `prize_award`,
    `vp`.`value`      AS `prize_value`,
    `vp`.`type`       AS `prize_type`,
    `u`.`id`          AS `user_id`,
    `u`.`email`       AS `user_email`,
    `u`.`firstname`   AS `user_firstname`,
    `u`.`lastname`    AS `user_lastname`,
    `u`.`address`     AS `user_address`,
    `u`.`city`        AS `user_city`,
    `u`.`state`       AS `user_state`,
    `u`.`zip`         AS `user_zip`,
    `s`.`id`          AS `site_id`,
    `s`.`name`        AS `site_name`,
    `s`.`slug`        AS `site_slug`,
    `s`.`domain`      AS `site_domain`
FROM
    `view_prize` `vp`
LEFT JOIN
    `user`   `u` ON (`vp`.`winner_user_id` = `u`.`id`)
LEFT JOIN
    `site`   `s` ON (`vp`.`winner_site_id` = `s`.`id`)
WHERE `vp`.`winner_user_id` IS NOT NULL;