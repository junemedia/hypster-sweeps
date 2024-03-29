DROP VIEW IF EXISTS `report_user`;
CREATE VIEW `report_user` AS
SELECT
    `u`.`id` AS `User ID`,
    `u`.`email` AS `Email Address`,
    `u`.`firstname` AS `First Name`,
    `u`.`lastname` AS `Last Name`,
    `u`.`address` AS `Address`,
    `u`.`city` AS `City`,
    `u`.`state` AS `State`,
    CONCAT(`u`.`zip`, '') AS `Zip`,
    IF(`u`.`optin` = 1, 'Yes', 'No') AS `Opt In`,
    `s`.`name` AS `Site`,
    `u`.`date_registered` AS `Registration Date`,
    `u`.`date_verified` AS `Date Email Verified`,
    `u`.`date_updated` AS `Date Last Updated`
FROM
    `user` `u`
LEFT JOIN
    `site` `s` ON (`s`.`id` = `u`.`site_id`);
