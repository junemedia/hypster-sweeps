-- ENTRY INSERT
DELIMITER $$
DROP TRIGGER IF EXISTS `entry_insert` $$
CREATE TRIGGER `entry_insert` AFTER INSERT ON `entry`
FOR EACH ROW
BEGIN
    UPDATE  `contest`
    SET     `entries` = `entries`+1
    WHERE   `date`    = NEW.date;
END $$
DELIMITER ;
