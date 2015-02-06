INSERT INTO `site` (`id`, `slug`, `name`, `domain`, `rss`)
VALUES
    (1, 'betterrecipes', 'BR', 'win.betterrecipes.com', 'http://www.betterrecipes.com/popular.json');


INSERT INTO `prize` (`id`, `title`, `img1`, `desc1`, `img2`, `desc2`, `img3`, `desc3`, `award`, `value`, `type`)
VALUES
    (1, 'My First Prize<sup>®</sup>', X'00000000000000000000000000000001', 'Bacon ipsum dolor amet drumstick kevin tenderloin turkey boudin pig, shank ham. Picanha pork chop ground round pork shoulder tenderloin, andouille chuck. Andouille flank swine, t-bone capicola prosciutto cow kielbasa fatback turkey chuck sirloin pork chop pancetta pork belly. Landjaeger ham corned beef, strip steak prosciutto meatloaf bacon cow kevin. Jowl meatloaf rump, frankfurter pork ribeye pancetta biltong chuck. Drumstick venison frankfurter tenderloin swine tongue shankle picanha alcatra cow tail sal', NULL, 'Chicken meatloaf brisket shoulder kielbasa. T-bone turkey alcatra boudin, porchetta bacon pork belly drumstick ball tip strip steak. Hamburger kevin beef, brisket beef ribs short loin flank picanha cupim bresaola pork belly tenderloin tri-tip. Brisket fatback ribeye chuck. Chuck jowl ham hock, salami pancetta swine doner meatloaf sausage shankle turkey capicola pastrami flank. Beef jerky ham hock, ball tip prosciutto boudin salami strip steak pork loin. Bacon t-bone alcatra corned beef andouille swine.', NULL, 'Sirloin salami swine rump ham. Pork loin t-bone spare ribs alcatra, prosciutto leberkas meatball cow tri-tip tail fatback jerky. Chicken ground round t-bone, fatback ribeye kielbasa pork chop boudin ball tip tongue. Rump prosciutto ground round beef ribs pancetta capicola swine. Ball tip beef ribs kevin flank hamburger meatball.', '100', 100, 'giftcard'),
    (2, 'Your Second™ Prize',         X'00000000000000000000000000000002', 'Bacon ipsum dolor amet drumstick kevin tenderloin turkey boudin pig, shank ham. Picanha pork chop ground round pork shoulder tenderloin, andouille chuck. Andouille flank swine, t-bone capicola prosciutto cow kielbasa fatback turkey chuck sirloin pork chop pancetta pork belly. Landjaeger ham corned beef, strip steak prosciutto meatloaf bacon cow kevin. Jowl meatloaf rump, frankfurter pork ribeye pancetta biltong chuck. Drumstick venison frankfurter tenderloin swine tongue shankle picanha alcatra cow tail sal', NULL, 'Chicken meatloaf brisket shoulder kielbasa. T-bone turkey alcatra boudin, porchetta bacon pork belly drumstick ball tip strip steak. Hamburger kevin beef, brisket beef ribs short loin flank picanha cupim bresaola pork belly tenderloin tri-tip. Brisket fatback ribeye chuck. Chuck jowl ham hock, salami pancetta swine doner meatloaf sausage shankle turkey capicola pastrami flank. Beef jerky ham hock, ball tip prosciutto boudin salami strip steak pork loin. Bacon t-bone alcatra corned beef andouille swine.', NULL, 'Sirloin salami swine rump ham. Pork loin t-bone spare ribs alcatra, prosciutto leberkas meatball cow tri-tip tail fatback jerky. Chicken ground round t-bone, fatback ribeye kielbasa pork chop boudin ball tip tongue. Rump prosciutto ground round beef ribs pancetta capicola swine. Ball tip beef ribs kevin flank hamburger meatball.', '100', 100, 'giftcard'),
    (3, 'Our Lovely Third Prize',     X'00000000000000000000000000000003', 'Bacon ipsum dolor amet drumstick kevin tenderloin turkey boudin pig, shank ham. Picanha pork chop ground round pork shoulder tenderloin, andouille chuck. Andouille flank swine, t-bone capicola prosciutto cow kielbasa fatback turkey chuck sirloin pork chop pancetta pork belly. Landjaeger ham corned beef, strip steak prosciutto meatloaf bacon cow kevin. Jowl meatloaf rump, frankfurter pork ribeye pancetta biltong chuck. Drumstick venison frankfurter tenderloin swine tongue shankle picanha alcatra cow tail sal', NULL, 'Chicken meatloaf brisket shoulder kielbasa. T-bone turkey alcatra boudin, porchetta bacon pork belly drumstick ball tip strip steak. Hamburger kevin beef, brisket beef ribs short loin flank picanha cupim bresaola pork belly tenderloin tri-tip. Brisket fatback ribeye chuck. Chuck jowl ham hock, salami pancetta swine doner meatloaf sausage shankle turkey capicola pastrami flank. Beef jerky ham hock, ball tip prosciutto boudin salami strip steak pork loin. Bacon t-bone alcatra corned beef andouille swine.', NULL, 'Sirloin salami swine rump ham. Pork loin t-bone spare ribs alcatra, prosciutto leberkas meatball cow tri-tip tail fatback jerky. Chicken ground round t-bone, fatback ribeye kielbasa pork chop boudin ball tip tongue. Rump prosciutto ground round beef ribs pancetta capicola swine. Ball tip beef ribs kevin flank hamburger meatball.', '100', 100, 'giftcard');


INSERT INTO `contest` (`date`, `prize_id`, `winner_user_id`, `winner_site_id`)
VALUES
    (DATE(DATE_ADD(NOW(), INTERVAL -29 day)), CEIL(RAND()*(SELECT COUNT(1) FROM `prize`)), 1, 1),
    (DATE(DATE_ADD(NOW(), INTERVAL -28 day)), CEIL(RAND()*(SELECT COUNT(1) FROM `prize`)), 1, 1),
    (DATE(DATE_ADD(NOW(), INTERVAL -27 day)), CEIL(RAND()*(SELECT COUNT(1) FROM `prize`)), 1, 1),
    (DATE(DATE_ADD(NOW(), INTERVAL -26 day)), CEIL(RAND()*(SELECT COUNT(1) FROM `prize`)), 1, 1),
    (DATE(DATE_ADD(NOW(), INTERVAL -25 day)), CEIL(RAND()*(SELECT COUNT(1) FROM `prize`)), 1, 1),
    (DATE(DATE_ADD(NOW(), INTERVAL -24 day)), CEIL(RAND()*(SELECT COUNT(1) FROM `prize`)), 1, 1),
    (DATE(DATE_ADD(NOW(), INTERVAL -23 day)), CEIL(RAND()*(SELECT COUNT(1) FROM `prize`)), 1, 1),
    (DATE(DATE_ADD(NOW(), INTERVAL -22 day)), CEIL(RAND()*(SELECT COUNT(1) FROM `prize`)), 1, 1),
    (DATE(DATE_ADD(NOW(), INTERVAL -21 day)), CEIL(RAND()*(SELECT COUNT(1) FROM `prize`)), 1, 1),
    (DATE(DATE_ADD(NOW(), INTERVAL -20 day)), CEIL(RAND()*(SELECT COUNT(1) FROM `prize`)), 1, 1),
    (DATE(DATE_ADD(NOW(), INTERVAL -19 day)), CEIL(RAND()*(SELECT COUNT(1) FROM `prize`)), 1, 1),
    (DATE(DATE_ADD(NOW(), INTERVAL -18 day)), CEIL(RAND()*(SELECT COUNT(1) FROM `prize`)), 1, 1),
    (DATE(DATE_ADD(NOW(), INTERVAL -17 day)), CEIL(RAND()*(SELECT COUNT(1) FROM `prize`)), 1, 1),
    (DATE(DATE_ADD(NOW(), INTERVAL -16 day)), CEIL(RAND()*(SELECT COUNT(1) FROM `prize`)), 1, 1),
    (DATE(DATE_ADD(NOW(), INTERVAL -15 day)), CEIL(RAND()*(SELECT COUNT(1) FROM `prize`)), 1, 1),
    (DATE(DATE_ADD(NOW(), INTERVAL -14 day)), CEIL(RAND()*(SELECT COUNT(1) FROM `prize`)), 1, 1),
    (DATE(DATE_ADD(NOW(), INTERVAL -13 day)), CEIL(RAND()*(SELECT COUNT(1) FROM `prize`)), 1, 1),
    (DATE(DATE_ADD(NOW(), INTERVAL -12 day)), CEIL(RAND()*(SELECT COUNT(1) FROM `prize`)), 1, 1),
    (DATE(DATE_ADD(NOW(), INTERVAL -11 day)), CEIL(RAND()*(SELECT COUNT(1) FROM `prize`)), 1, 1),
    (DATE(DATE_ADD(NOW(), INTERVAL -10 day)), CEIL(RAND()*(SELECT COUNT(1) FROM `prize`)), 1, 1),
    (DATE(DATE_ADD(NOW(), INTERVAL -9 day)), CEIL(RAND()*(SELECT COUNT(1) FROM `prize`)), 1, 1),
    (DATE(DATE_ADD(NOW(), INTERVAL -8 day)), CEIL(RAND()*(SELECT COUNT(1) FROM `prize`)), 1, 1),
    (DATE(DATE_ADD(NOW(), INTERVAL -7 day)), CEIL(RAND()*(SELECT COUNT(1) FROM `prize`)), 1, 1),
    (DATE(DATE_ADD(NOW(), INTERVAL -6 day)), CEIL(RAND()*(SELECT COUNT(1) FROM `prize`)), 1, 1),
    (DATE(DATE_ADD(NOW(), INTERVAL -5 day)), CEIL(RAND()*(SELECT COUNT(1) FROM `prize`)), 1, 1),
    (DATE(DATE_ADD(NOW(), INTERVAL -4 day)), CEIL(RAND()*(SELECT COUNT(1) FROM `prize`)), 1, 1),
    (DATE(DATE_ADD(NOW(), INTERVAL -3 day)), CEIL(RAND()*(SELECT COUNT(1) FROM `prize`)), 1, 1),
    (DATE(DATE_ADD(NOW(), INTERVAL -2 day)), CEIL(RAND()*(SELECT COUNT(1) FROM `prize`)), 1, 1),
    (DATE(DATE_ADD(NOW(), INTERVAL -1 day)), CEIL(RAND()*(SELECT COUNT(1) FROM `prize`)), 1, 1),
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

INSERT INTO `user` (`id`, `email`, `role`, `verified`, `password`, `salt`, `ip`, `date_registered`, `date_verified`, `first_name`, `last_name`, `address`, `city`, `state`, `zip`)
VALUES
    (1, 'achalemian@resolute.com', 2, 1, '8048bf4ca29ed27f536f7363efe1c4af3ab7c883', '9fbd24255928757a7dd970cbd33c3145286aef9b', 168431411, '2015-01-23 13:10:10', '2015-01-23 14:14:52', 'Adam', 'Chalemian', '123 Fake St', 'Schenectady', 'NY', 12345);
