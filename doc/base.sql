-- Regex to space out this file:
-- (?:[\d]+|X?'.*?'|NULL),

TRUNCATE TABLE `site`;
TRUNCATE TABLE `prize`;
TRUNCATE TABLE `user`;
TRUNCATE TABLE `contest`;
TRUNCATE TABLE `entry`;


INSERT INTO `site` (`id`, `slug`, `name`, `domain`, `gtm`, `thanks`)
VALUES
    (1, 'betterrecipes', 'BetterRecipes', 'win.betterrecipes.com', 'GTM-5VTT4K', '<style>\n#thanks h3 {\n    margin: 3em 0 1em 0;\n}\n#thanks a {\n    width: 48%;\n    margin: 0 2% 1em 0;\n    float: left;\n    text-align: center;\n    text-transform: uppercase;\n    font-weight: bold;\n}\n#thanks a:after {\n    content: \" \";\n    visibility: hidden;\n    display: block;\n    height: 0;\n    clear: both;\n}\n</style>\n<h3>See the latest articles from Better Recipes</h3>\n<a href=\"http://crockpot.betterrecipes.com/slideshows/9-hot-new-slow-cooker-stews\">\n    <img src=\"http://crockpot.betterrecipes.com/uploads/photo/400x300/1/9/19a7796b337ca5cb669ec8be0eed0f06.jpg\"/>\n    9 Hot New Slow-Cooker Stews\n</a>\n<a href=\"http://easy.betterrecipes.com/slideshows/15-fluffy-foods-to-bake-this-spring\">\n    <img src=\"http://easy.betterrecipes.com/uploads/photo/400x300/f/7/f7786d1ac9ab47f9f19f981275028e49.jpg\"/>\n    15 Fluffy Foods to Bake this Spring\n</a>\n<a href=\"http://lowfat.betterrecipes.com/slideshows/8-surprisingly-low-fat-things-to-eat-this-week\">\n    <img src=\"http://lowfat.betterrecipes.com/uploads/photo/400x300/6/e/6efce2b78c2b1926e983f0059963b65d.jpg\"/>\n    8 Surprisingly Low Fat Things To Eat This Week\n</a>\n<a href=\"http://crockpot.betterrecipes.com/slideshows/10-juicy-and-filling-reasons-to-love-your-crockpot-this-spring\">\n    <img src=\"http://crockpot.betterrecipes.com/uploads/photo/400x300/9/3/9337c2ccc6b62a79e8533ced8ca07032.jpg\"/>\n    10 Juicy and Filling Reasons To Love Your Crockpot This Spring\n</a>'),
    (2, 'recipe4living', 'Recipe4Living', 'win.recipe4living.com', 'GTM-PPMDBL', '<style>\n#thanks h3 {\n    margin: 3em 0 1em 0;\n}\n#thanks a {\n    width: 48%;\n    margin: 0 2% 1em 0;\n    float: left;\n    text-align: center;\n    text-transform: uppercase;\n    font-weight: bold;\n}\n#thanks a:after {\n    content: \" \";\n    visibility: hidden;\n    display: block;\n    height: 0;\n    clear: both;\n}\n</style>\n<h3>See the latest articles from Better Recipes</h3>\n<a href=\"http://crockpot.betterrecipes.com/slideshows/9-hot-new-slow-cooker-stews\">\n    <img src=\"http://crockpot.betterrecipes.com/uploads/photo/400x300/1/9/19a7796b337ca5cb669ec8be0eed0f06.jpg\"/>\n    9 Hot New Slow-Cooker Stews\n</a>\n<a href=\"http://easy.betterrecipes.com/slideshows/15-fluffy-foods-to-bake-this-spring\">\n    <img src=\"http://easy.betterrecipes.com/uploads/photo/400x300/f/7/f7786d1ac9ab47f9f19f981275028e49.jpg\"/>\n    15 Fluffy Foods to Bake this Spring\n</a>\n<a href=\"http://lowfat.betterrecipes.com/slideshows/8-surprisingly-low-fat-things-to-eat-this-week\">\n    <img src=\"http://lowfat.betterrecipes.com/uploads/photo/400x300/6/e/6efce2b78c2b1926e983f0059963b65d.jpg\"/>\n    8 Surprisingly Low Fat Things To Eat This Week\n</a>\n<a href=\"http://crockpot.betterrecipes.com/slideshows/10-juicy-and-filling-reasons-to-love-your-crockpot-this-spring\">\n    <img src=\"http://crockpot.betterrecipes.com/uploads/photo/400x300/9/3/9337c2ccc6b62a79e8533ced8ca07032.jpg\"/>\n    10 Juicy and Filling Reasons To Love Your Crockpot This Spring\n</a>');


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