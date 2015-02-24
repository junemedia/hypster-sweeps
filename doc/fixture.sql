TRUNCATE TABLE `site`;
TRUNCATE TABLE `prize`;
TRUNCATE TABLE `user`;
TRUNCATE TABLE `contest`;
TRUNCATE TABLE `entry`;


INSERT INTO `site` (`id`, `slug`, `name`, `domain`, `rss`)
VALUES
    (1, 'betterrecipes', 'BetterRecipes', 'win.betterrecipes.com', 'http://www.betterrecipes.com/popular.json');


INSERT INTO `prize` (`id`, `title`, `img1`, `desc1`, `img2`, `desc2`, `img3`, `desc3`, `award`, `value`, `type`)
VALUES
    (1, 'My First Prize<sup>®</sup>', X'00000000000000000000000000000001', 'Bacon ipsum dolor amet drumstick kevin tenderloin turkey boudin pig, shank ham. Picanha pork chop ground round pork shoulder tenderloin, andouille chuck. Andouille flank swine, t-bone capicola prosciutto cow kielbasa fatback turkey chuck sirloin pork chop pancetta pork belly. Landjaeger ham corned beef, strip steak prosciutto meatloaf bacon cow kevin. Jowl meatloaf rump, frankfurter pork ribeye pancetta biltong chuck. Drumstick venison frankfurter tenderloin swine tongue shankle picanha alcatra cow tail sal', NULL, 'Chicken meatloaf brisket shoulder kielbasa. T-bone turkey alcatra boudin, porchetta bacon pork belly drumstick ball tip strip steak. Hamburger kevin beef, brisket beef ribs short loin flank picanha cupim bresaola pork belly tenderloin tri-tip. Brisket fatback ribeye chuck. Chuck jowl ham hock, salami pancetta swine doner meatloaf sausage shankle turkey capicola pastrami flank. Beef jerky ham hock, ball tip prosciutto boudin salami strip steak pork loin. Bacon t-bone alcatra corned beef andouille swine.', NULL, 'Sirloin salami swine rump ham. Pork loin t-bone spare ribs alcatra, prosciutto leberkas meatball cow tri-tip tail fatback jerky. Chicken ground round t-bone, fatback ribeye kielbasa pork chop boudin ball tip tongue. Rump prosciutto ground round beef ribs pancetta capicola swine. Ball tip beef ribs kevin flank hamburger meatball.', '100', 100, 'giftcard'),
    (2, 'Your Second™ Prize',         X'00000000000000000000000000000002', 'Bacon ipsum dolor amet drumstick kevin tenderloin turkey boudin pig, shank ham. Picanha pork chop ground round pork shoulder tenderloin, andouille chuck. Andouille flank swine, t-bone capicola prosciutto cow kielbasa fatback turkey chuck sirloin pork chop pancetta pork belly. Landjaeger ham corned beef, strip steak prosciutto meatloaf bacon cow kevin. Jowl meatloaf rump, frankfurter pork ribeye pancetta biltong chuck. Drumstick venison frankfurter tenderloin swine tongue shankle picanha alcatra cow tail sal', NULL, 'Chicken meatloaf brisket shoulder kielbasa. T-bone turkey alcatra boudin, porchetta bacon pork belly drumstick ball tip strip steak. Hamburger kevin beef, brisket beef ribs short loin flank picanha cupim bresaola pork belly tenderloin tri-tip. Brisket fatback ribeye chuck. Chuck jowl ham hock, salami pancetta swine doner meatloaf sausage shankle turkey capicola pastrami flank. Beef jerky ham hock, ball tip prosciutto boudin salami strip steak pork loin. Bacon t-bone alcatra corned beef andouille swine.', NULL, 'Sirloin salami swine rump ham. Pork loin t-bone spare ribs alcatra, prosciutto leberkas meatball cow tri-tip tail fatback jerky. Chicken ground round t-bone, fatback ribeye kielbasa pork chop boudin ball tip tongue. Rump prosciutto ground round beef ribs pancetta capicola swine. Ball tip beef ribs kevin flank hamburger meatball.', '100', 100, 'giftcard'),
    (3, 'Our Lovely Third Prize',     X'00000000000000000000000000000003', 'Bacon ipsum dolor amet drumstick kevin tenderloin turkey boudin pig, shank ham. Picanha pork chop ground round pork shoulder tenderloin, andouille chuck. Andouille flank swine, t-bone capicola prosciutto cow kielbasa fatback turkey chuck sirloin pork chop pancetta pork belly. Landjaeger ham corned beef, strip steak prosciutto meatloaf bacon cow kevin. Jowl meatloaf rump, frankfurter pork ribeye pancetta biltong chuck. Drumstick venison frankfurter tenderloin swine tongue shankle picanha alcatra cow tail sal', NULL, 'Chicken meatloaf brisket shoulder kielbasa. T-bone turkey alcatra boudin, porchetta bacon pork belly drumstick ball tip strip steak. Hamburger kevin beef, brisket beef ribs short loin flank picanha cupim bresaola pork belly tenderloin tri-tip. Brisket fatback ribeye chuck. Chuck jowl ham hock, salami pancetta swine doner meatloaf sausage shankle turkey capicola pastrami flank. Beef jerky ham hock, ball tip prosciutto boudin salami strip steak pork loin. Bacon t-bone alcatra corned beef andouille swine.', NULL, 'Sirloin salami swine rump ham. Pork loin t-bone spare ribs alcatra, prosciutto leberkas meatball cow tri-tip tail fatback jerky. Chicken ground round t-bone, fatback ribeye kielbasa pork chop boudin ball tip tongue. Rump prosciutto ground round beef ribs pancetta capicola swine. Ball tip beef ribs kevin flank hamburger meatball.', '100', 100, 'giftcard'),
    (4, 'Staub Baby Wok',     X'00000000000000000000000000000004', 'This cast iron wok will help you create extraordinary stir-fries, rice dishes and soups.', NULL, '', NULL, '', '100', 100, 'prize'),
    (5, 'Berghoff 8-Pc. Knife Block Set',     X'00000000000000000000000000000005', 'With the curvy design, this knife block makes for an elegant addition to any household.', NULL, '', NULL, '', '100', 100, 'prize'),
    (6, 'Le Creuset Skinny Griddle',     X'00000000000000000000000000000006', 'Great for cooking up a batch of pancakes, searing steaks, toasting sandwiches and more, this griddle is a versatile addition to your cookware arsenal.', NULL, '', NULL, '', '100', 100, 'prize'),
    (7, 'Trudeau Fondue Set',     X'00000000000000000000000000000007', 'This electric fondue set alleviates the hassle of using sterno for heating your cheeses and chocolates, and even has variable temperature control to maintain proper consistency and heat.', NULL, '', NULL, '', '100', 100, 'prize'),
    (8, 'Cuisinart SmartPower Deluxe Blender',     X'00000000000000000000000000000008', 'This blender is strong enough for all blending tasks, including tough jobs like crushing ice or chopping delicate herbs.', NULL, '', NULL, '', '100', 100, 'prize'),
    (9, 'Cuisinart 6.5-Qt. Slow Cooker',     X'00000000000000000000000000000009', 'This slow cooker features a 24-hour programmable countdown timer, three cooking modes-and it automatically shifts to warm when it’s done cooking!', NULL, '', NULL, '', '100', 100, 'prize');
    -- (9, '',     X'00000000000000000000000000000009', '', NULL, '', NULL, '', '100', 100, 'prize');


INSERT INTO `user` (`id`, `email`, `role`, `verified`, `password`, `salt`, `ip`, `date_registered`, `date_verified`, `firstname`, `lastname`, `address`, `city`, `state`, `zip`)
VALUES
    (1,    'achalemian@resolute.com', 2, 1, '8048bf4ca29ed27f536f7363efe1c4af3ab7c883', '9fbd24255928757a7dd970cbd33c3145286aef9b', 168431411, '2015-01-23 13:10:10', '2015-01-23 14:14:52', 'Adam', 'Chalemian', '123 Fake St', 'Schenectady', 'NY', 12345),
    (NULL, 'achalemian+1@resolute.com', 1, 1, '8048bf4ca29ed27f536f7363efe1c4af3ab7c883', '9fbd24255928757a7dd970cbd33c3145286aef9b', 168431411, '2015-01-23 13:10:10', '2015-01-23 14:14:52', 'John', 'Doe', '123 Fake St', 'Wayne', 'PA', 19087),
    (NULL, 'achalemian+2@resolute.com', 1, 1, '8048bf4ca29ed27f536f7363efe1c4af3ab7c883', '9fbd24255928757a7dd970cbd33c3145286aef9b', 168431411, '2015-01-23 13:10:10', '2015-01-23 14:14:52', 'George', 'Washington', '123 Fake St', 'Franklin Lakes', 'NJ', 07417),
    (NULL, 'achalemian+3@resolute.com', 1, 1, '8048bf4ca29ed27f536f7363efe1c4af3ab7c883', '9fbd24255928757a7dd970cbd33c3145286aef9b', 168431411, '2015-01-23 13:10:10', '2015-01-23 14:14:52', 'Homer', 'Simpson', '123 Fake St', 'Springfield', 'OH', 45501),
    (NULL, 'achalemian+4@resolute.com', 1, 1, '8048bf4ca29ed27f536f7363efe1c4af3ab7c883', '9fbd24255928757a7dd970cbd33c3145286aef9b', 168431411, '2015-01-23 13:10:10', '2015-01-23 14:14:52', 'Bart', 'Simpson', '123 Fake St', 'Springfield', 'OH', 45501),
    (NULL, 'achalemian+5@resolute.com', 1, 1, '8048bf4ca29ed27f536f7363efe1c4af3ab7c883', '9fbd24255928757a7dd970cbd33c3145286aef9b', 168431411, '2015-01-23 13:10:10', '2015-01-23 14:14:52', 'Cosmo', 'Kramer', '123 Fake St', 'New York', 'NY', 10024),
    (NULL, 'achalemian+6@resolute.com', 1, 1, '8048bf4ca29ed27f536f7363efe1c4af3ab7c883', '9fbd24255928757a7dd970cbd33c3145286aef9b', 168431411, '2015-01-23 13:10:10', '2015-01-23 14:14:52', 'Elaine', 'Benes', '123 Fake St', 'New York', 'NY', 10024),
    (NULL, 'achalemian+7@resolute.com', 1, 1, '8048bf4ca29ed27f536f7363efe1c4af3ab7c883', '9fbd24255928757a7dd970cbd33c3145286aef9b', 168431411, '2015-01-23 13:10:10', '2015-01-23 14:14:52', 'Bob', 'Sacamano', '123 Fake St', 'New York', 'NY', 10024),
    (NULL, 'achalemian+8@resolute.com', 1, 1, '8048bf4ca29ed27f536f7363efe1c4af3ab7c883', '9fbd24255928757a7dd970cbd33c3145286aef9b', 168431411, '2015-01-23 13:10:10', '2015-01-23 14:14:52', 'Frank', 'Costanza', '123 Fake St', 'New York', 'NY', 10024),
    (NULL, 'achalemian+9@resolute.com', 1, 1, '8048bf4ca29ed27f536f7363efe1c4af3ab7c883', '9fbd24255928757a7dd970cbd33c3145286aef9b', 168431411, '2015-01-23 13:10:10', '2015-01-23 14:14:52', 'David', 'Putty', '123 Fake St', 'New York', 'NY', 10024),
    (NULL, 'achalemian+10@resolute.com', 1, 1, '8048bf4ca29ed27f536f7363efe1c4af3ab7c883', '9fbd24255928757a7dd970cbd33c3145286aef9b', 168431411, '2015-01-23 13:10:10', '2015-01-23 14:14:52', 'Kenny', 'Bania', '123 Fake St', 'New York', 'NY', 10024),
    (NULL, 'achalemian+11@resolute.com', 1, 1, '8048bf4ca29ed27f536f7363efe1c4af3ab7c883', '9fbd24255928757a7dd970cbd33c3145286aef9b', 168431411, '2015-01-23 13:10:10', '2015-01-23 14:14:52', 'Joe', 'Davola', '123 Fake St', 'New York', 'NY', 10024),
    (NULL, 'achalemian+12@resolute.com', 1, 1, '8048bf4ca29ed27f536f7363efe1c4af3ab7c883', '9fbd24255928757a7dd970cbd33c3145286aef9b', 168431411, '2015-01-23 13:10:10', '2015-01-23 14:14:52', 'Jackie', 'Chiles', '123 Fake St', 'New York', 'NY', 10024),
    (NULL, 'achalemian+13@resolute.com', 1, 1, '8048bf4ca29ed27f536f7363efe1c4af3ab7c883', '9fbd24255928757a7dd970cbd33c3145286aef9b', 168431411, '2015-01-23 13:10:10', '2015-01-23 14:14:52', 'Jack', 'Klompis', '123 Fake St', 'New York', 'NY', 10024);


INSERT INTO `contest` (`date`, `prize_id`, `winner_user_id`, `winner_site_id`)
VALUES
    (DATE(DATE_ADD(NOW(), INTERVAL -29 day)), CEIL(RAND()*(SELECT COUNT(1) FROM `prize`)), CEIL(RAND()*(SELECT COUNT(1) FROM `user`)), 1),
    (DATE(DATE_ADD(NOW(), INTERVAL -28 day)), CEIL(RAND()*(SELECT COUNT(1) FROM `prize`)), CEIL(RAND()*(SELECT COUNT(1) FROM `user`)), 1),
    (DATE(DATE_ADD(NOW(), INTERVAL -27 day)), CEIL(RAND()*(SELECT COUNT(1) FROM `prize`)), CEIL(RAND()*(SELECT COUNT(1) FROM `user`)), 1),
    (DATE(DATE_ADD(NOW(), INTERVAL -26 day)), CEIL(RAND()*(SELECT COUNT(1) FROM `prize`)), CEIL(RAND()*(SELECT COUNT(1) FROM `user`)), 1),
    (DATE(DATE_ADD(NOW(), INTERVAL -25 day)), CEIL(RAND()*(SELECT COUNT(1) FROM `prize`)), CEIL(RAND()*(SELECT COUNT(1) FROM `user`)), 1),
    (DATE(DATE_ADD(NOW(), INTERVAL -24 day)), CEIL(RAND()*(SELECT COUNT(1) FROM `prize`)), CEIL(RAND()*(SELECT COUNT(1) FROM `user`)), 1),
    (DATE(DATE_ADD(NOW(), INTERVAL -23 day)), CEIL(RAND()*(SELECT COUNT(1) FROM `prize`)), CEIL(RAND()*(SELECT COUNT(1) FROM `user`)), 1),
    (DATE(DATE_ADD(NOW(), INTERVAL -22 day)), CEIL(RAND()*(SELECT COUNT(1) FROM `prize`)), CEIL(RAND()*(SELECT COUNT(1) FROM `user`)), 1),
    (DATE(DATE_ADD(NOW(), INTERVAL -21 day)), CEIL(RAND()*(SELECT COUNT(1) FROM `prize`)), CEIL(RAND()*(SELECT COUNT(1) FROM `user`)), 1),
    (DATE(DATE_ADD(NOW(), INTERVAL -20 day)), CEIL(RAND()*(SELECT COUNT(1) FROM `prize`)), CEIL(RAND()*(SELECT COUNT(1) FROM `user`)), 1),
    (DATE(DATE_ADD(NOW(), INTERVAL -19 day)), CEIL(RAND()*(SELECT COUNT(1) FROM `prize`)), CEIL(RAND()*(SELECT COUNT(1) FROM `user`)), 1),
    (DATE(DATE_ADD(NOW(), INTERVAL -18 day)), CEIL(RAND()*(SELECT COUNT(1) FROM `prize`)), CEIL(RAND()*(SELECT COUNT(1) FROM `user`)), 1),
    (DATE(DATE_ADD(NOW(), INTERVAL -17 day)), CEIL(RAND()*(SELECT COUNT(1) FROM `prize`)), CEIL(RAND()*(SELECT COUNT(1) FROM `user`)), 1),
    (DATE(DATE_ADD(NOW(), INTERVAL -16 day)), CEIL(RAND()*(SELECT COUNT(1) FROM `prize`)), CEIL(RAND()*(SELECT COUNT(1) FROM `user`)), 1),
    (DATE(DATE_ADD(NOW(), INTERVAL -15 day)), CEIL(RAND()*(SELECT COUNT(1) FROM `prize`)), CEIL(RAND()*(SELECT COUNT(1) FROM `user`)), 1),
    (DATE(DATE_ADD(NOW(), INTERVAL -14 day)), CEIL(RAND()*(SELECT COUNT(1) FROM `prize`)), CEIL(RAND()*(SELECT COUNT(1) FROM `user`)), 1),
    (DATE(DATE_ADD(NOW(), INTERVAL -13 day)), CEIL(RAND()*(SELECT COUNT(1) FROM `prize`)), CEIL(RAND()*(SELECT COUNT(1) FROM `user`)), 1),
    (DATE(DATE_ADD(NOW(), INTERVAL -12 day)), CEIL(RAND()*(SELECT COUNT(1) FROM `prize`)), CEIL(RAND()*(SELECT COUNT(1) FROM `user`)), 1),
    (DATE(DATE_ADD(NOW(), INTERVAL -11 day)), CEIL(RAND()*(SELECT COUNT(1) FROM `prize`)), CEIL(RAND()*(SELECT COUNT(1) FROM `user`)), 1),
    (DATE(DATE_ADD(NOW(), INTERVAL -10 day)), CEIL(RAND()*(SELECT COUNT(1) FROM `prize`)), CEIL(RAND()*(SELECT COUNT(1) FROM `user`)), 1),
    (DATE(DATE_ADD(NOW(), INTERVAL -9 day)), CEIL(RAND()*(SELECT COUNT(1) FROM `prize`)), CEIL(RAND()*(SELECT COUNT(1) FROM `user`)), 1),
    (DATE(DATE_ADD(NOW(), INTERVAL -8 day)), CEIL(RAND()*(SELECT COUNT(1) FROM `prize`)), CEIL(RAND()*(SELECT COUNT(1) FROM `user`)), 1),
    (DATE(DATE_ADD(NOW(), INTERVAL -7 day)), CEIL(RAND()*(SELECT COUNT(1) FROM `prize`)), CEIL(RAND()*(SELECT COUNT(1) FROM `user`)), 1),
    (DATE(DATE_ADD(NOW(), INTERVAL -6 day)), CEIL(RAND()*(SELECT COUNT(1) FROM `prize`)), CEIL(RAND()*(SELECT COUNT(1) FROM `user`)), 1),
    (DATE(DATE_ADD(NOW(), INTERVAL -5 day)), CEIL(RAND()*(SELECT COUNT(1) FROM `prize`)), CEIL(RAND()*(SELECT COUNT(1) FROM `user`)), 1),
    (DATE(DATE_ADD(NOW(), INTERVAL -4 day)), CEIL(RAND()*(SELECT COUNT(1) FROM `prize`)), CEIL(RAND()*(SELECT COUNT(1) FROM `user`)), 1),
    (DATE(DATE_ADD(NOW(), INTERVAL -3 day)), CEIL(RAND()*(SELECT COUNT(1) FROM `prize`)), CEIL(RAND()*(SELECT COUNT(1) FROM `user`)), 1),
    (DATE(DATE_ADD(NOW(), INTERVAL -2 day)), CEIL(RAND()*(SELECT COUNT(1) FROM `prize`)), CEIL(RAND()*(SELECT COUNT(1) FROM `user`)), 1),
    (DATE(DATE_ADD(NOW(), INTERVAL -1 day)), CEIL(RAND()*(SELECT COUNT(1) FROM `prize`)), CEIL(RAND()*(SELECT COUNT(1) FROM `user`)), 1),
    (DATE(NOW()), CEIL(RAND()*(SELECT COUNT(1) FROM `prize`)), NULL, 1),
    (DATE(DATE_ADD(NOW(), INTERVAL 1 day)), CEIL(RAND()*(SELECT COUNT(1) FROM `prize`)), NULL, 1),
    (DATE(DATE_ADD(NOW(), INTERVAL 2 day)), CEIL(RAND()*(SELECT COUNT(1) FROM `prize`)), NULL, 1),
    (DATE(DATE_ADD(NOW(), INTERVAL 3 day)), CEIL(RAND()*(SELECT COUNT(1) FROM `prize`)), NULL, 1),
    (DATE(DATE_ADD(NOW(), INTERVAL 4 day)), CEIL(RAND()*(SELECT COUNT(1) FROM `prize`)), NULL, 1),
    (DATE(DATE_ADD(NOW(), INTERVAL 5 day)), CEIL(RAND()*(SELECT COUNT(1) FROM `prize`)), NULL, 1),
    (DATE(DATE_ADD(NOW(), INTERVAL 6 day)), CEIL(RAND()*(SELECT COUNT(1) FROM `prize`)), NULL, 1),
    (DATE(DATE_ADD(NOW(), INTERVAL 7 day)), CEIL(RAND()*(SELECT COUNT(1) FROM `prize`)), NULL, 1),
    (DATE(DATE_ADD(NOW(), INTERVAL 8 day)), CEIL(RAND()*(SELECT COUNT(1) FROM `prize`)), NULL, 1),
    (DATE(DATE_ADD(NOW(), INTERVAL 9 day)), CEIL(RAND()*(SELECT COUNT(1) FROM `prize`)), NULL, 1),
    (DATE(DATE_ADD(NOW(), INTERVAL 10 day)), CEIL(RAND()*(SELECT COUNT(1) FROM `prize`)), NULL, 1),
    (DATE(DATE_ADD(NOW(), INTERVAL 11 day)), CEIL(RAND()*(SELECT COUNT(1) FROM `prize`)), NULL, 1),
    (DATE(DATE_ADD(NOW(), INTERVAL 12 day)), CEIL(RAND()*(SELECT COUNT(1) FROM `prize`)), NULL, 1),
    (DATE(DATE_ADD(NOW(), INTERVAL 13 day)), CEIL(RAND()*(SELECT COUNT(1) FROM `prize`)), NULL, 1),
    (DATE(DATE_ADD(NOW(), INTERVAL 14 day)), CEIL(RAND()*(SELECT COUNT(1) FROM `prize`)), NULL, 1),
    (DATE(DATE_ADD(NOW(), INTERVAL 15 day)), CEIL(RAND()*(SELECT COUNT(1) FROM `prize`)), NULL, 1),
    (DATE(DATE_ADD(NOW(), INTERVAL 16 day)), CEIL(RAND()*(SELECT COUNT(1) FROM `prize`)), NULL, 1),
    (DATE(DATE_ADD(NOW(), INTERVAL 17 day)), CEIL(RAND()*(SELECT COUNT(1) FROM `prize`)), NULL, 1),
    (DATE(DATE_ADD(NOW(), INTERVAL 18 day)), CEIL(RAND()*(SELECT COUNT(1) FROM `prize`)), NULL, 1),
    (DATE(DATE_ADD(NOW(), INTERVAL 19 day)), CEIL(RAND()*(SELECT COUNT(1) FROM `prize`)), NULL, 1),
    (DATE(DATE_ADD(NOW(), INTERVAL 20 day)), CEIL(RAND()*(SELECT COUNT(1) FROM `prize`)), NULL, 1),
    (DATE(DATE_ADD(NOW(), INTERVAL 21 day)), CEIL(RAND()*(SELECT COUNT(1) FROM `prize`)), NULL, 1),
    (DATE(DATE_ADD(NOW(), INTERVAL 22 day)), CEIL(RAND()*(SELECT COUNT(1) FROM `prize`)), NULL, 1),
    (DATE(DATE_ADD(NOW(), INTERVAL 23 day)), CEIL(RAND()*(SELECT COUNT(1) FROM `prize`)), NULL, 1),
    (DATE(DATE_ADD(NOW(), INTERVAL 24 day)), CEIL(RAND()*(SELECT COUNT(1) FROM `prize`)), NULL, 1),
    (DATE(DATE_ADD(NOW(), INTERVAL 25 day)), CEIL(RAND()*(SELECT COUNT(1) FROM `prize`)), NULL, 1),
    (DATE(DATE_ADD(NOW(), INTERVAL 26 day)), CEIL(RAND()*(SELECT COUNT(1) FROM `prize`)), NULL, 1),
    (DATE(DATE_ADD(NOW(), INTERVAL 27 day)), CEIL(RAND()*(SELECT COUNT(1) FROM `prize`)), NULL, 1),
    (DATE(DATE_ADD(NOW(), INTERVAL 28 day)), CEIL(RAND()*(SELECT COUNT(1) FROM `prize`)), NULL, 1),
    (DATE(DATE_ADD(NOW(), INTERVAL 29 day)), CEIL(RAND()*(SELECT COUNT(1) FROM `prize`)), NULL, 1),
    (DATE(DATE_ADD(NOW(), INTERVAL 30 day)), CEIL(RAND()*(SELECT COUNT(1) FROM `prize`)), NULL, 1);



-- RANDOM_ENTRIES
DROP PROCEDURE IF EXISTS `RANDOM_ENTRIES`;
DELIMITER $$
CREATE PROCEDURE `RANDOM_ENTRIES` ()
BEGIN
    DECLARE x INT DEFAULT 1;
    WHILE x  <= 1000 DO
        INSERT IGNORE INTO `entry` (`date`, `user_id`, `site_id`)
        VALUES (
            (SELECT `date` FROM `contest` WHERE `date` <= DATE(NOW()) ORDER BY RAND() LIMIT 1),
            CEIL(RAND()*(SELECT COUNT(1) FROM `user`)),
            1
        );
       SET  x = x + 1;
   END WHILE;
END $$
DELIMITER ;
CALL RANDOM_ENTRIES();
DROP PROCEDURE IF EXISTS `RANDOM_ENTRIES`;
ALTER TABLE `entry` ORDER BY `date` ASC, `time` ASC;