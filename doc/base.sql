-- Regex to space out this file:
-- (?:[\d]+|X?'.*?'|NULL),

TRUNCATE TABLE `site`;
TRUNCATE TABLE `prize`;
TRUNCATE TABLE `user`;
TRUNCATE TABLE `contest`;
TRUNCATE TABLE `entry`;


INSERT INTO `site` (`id`, `slug`, `name`, `domain`, `gtm`, `thanks`)
VALUES
    (1, 'hypster', 'Hypster', 'win.hypster.com', 'GTM-123XYZ', '<div>Thanks from the database</div>');


INSERT INTO `prize` (`id`, `title`, `img1`, `desc1`, `img2`, `desc2`, `img3`, `desc3`, `award`, `value`, `type`)
VALUES
    (1,  'BASE PRIZE',                                 X'00000000000000000000000000000001', 'Bacon ipsum dolor amet drumstick kevin tenderloin turkey boudin pig, shank ham. Picanha pork chop ground round pork shoulder tenderloin, andouille chuck.', NULL, 'Description 2', NULL, NULL, '$100 giftcard', 100, 'giftcard');


INSERT INTO `user` (`id`, `role`, `verified`, `ip`, `optin`, `site_id`, `date_registered`, `date_verified`, `email`, `password`, `firstname`, `lastname`, `address`, `city`, `state`, `zip`)
VALUES
    (1,    2, 1, 168431411, 1, 1, '2015-01-23 13:10:10', '2015-01-23 14:14:52', 'achalemian@resolute.com',    UNHEX(SHA1(CONCAT("Adam123",      "4b3be7d16b2875f2d4153a67c23e0d2586585c67"))), 'Adam',      'Chalemian',    '137 W 25th St',                 'New York',         'NY', 10001),
    (2,    2, 1, 168431411, 1, 1, '2015-01-23 13:10:10', '2015-01-23 14:14:52', 'aconforti@resolute.com',     UNHEX(SHA1(CONCAT("Aconforti123", "4b3be7d16b2875f2d4153a67c23e0d2586585c67"))), 'Angela',    'Conforti',     '137 W 25th St',                 'New York',         'NY', 10001),
    (3,    2, 1, 168431411, 1, 1, '2015-01-23 13:10:10', '2015-01-23 14:14:52', 'williamg@junemedia.com',     UNHEX(SHA1(CONCAT("Wgrant123",    "4b3be7d16b2875f2d4153a67c23e0d2586585c67"))), 'William',   'Grant',        '209 W Jackson Blvd, Suite 702', 'Chicago',          'IL', 60606),
    (4,    2, 1, 168431411, 1, 1, '2015-01-23 13:10:10', '2015-01-23 14:14:52', 'andrewb@junemedia.com',      UNHEX(SHA1(CONCAT("Aburton123",   "4b3be7d16b2875f2d4153a67c23e0d2586585c67"))), 'Andrew',    'Burton',       '209 W Jackson Blvd, Suite 702', 'Chicago',          'IL', 60606),
    (5,    2, 1, 168431411, 1, 1, '2015-01-23 13:10:10', '2015-01-23 14:14:52', 'trishd@junemedia.com',       UNHEX(SHA1(CONCAT("Tdonoghue123", "4b3be7d16b2875f2d4153a67c23e0d2586585c67"))), 'Trish',     'Donoghue',     '209 W Jackson Blvd, Suite 702', 'Chicago',          'IL', 60606),
    (6,    2, 1, 168431411, 1, 1, '2015-01-23 13:10:10', '2015-01-23 14:14:52', 'yesbelh@junemedia.com',      UNHEX(SHA1(CONCAT("Yherrera123",  "4b3be7d16b2875f2d4153a67c23e0d2586585c67"))), 'Yesbel',    'Herrera',      '209 W Jackson Blvd, Suite 702', 'Chicago',          'IL', 60606),
    (7,    2, 1, 168431411, 1, 1, '2015-01-23 13:10:10', '2015-01-23 14:14:52', 'jorgev@junemedia.com',       UNHEX(SHA1(CONCAT("Jvalle123",    "4b3be7d16b2875f2d4153a67c23e0d2586585c67"))), 'Jorge',     'Valle',        '209 W Jackson Blvd, Suite 702', 'Chicago',          'IL', 60606);


INSERT INTO `contest` (`date`, `prize_id`) VALUES (DATE(NOW()), 1), (DATE_ADD(NOW(), INTERVAL 1 day), 1);
