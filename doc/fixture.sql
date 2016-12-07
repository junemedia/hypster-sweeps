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
    (1,  'My First Prize<sup>®</sup>',                X'00000000000000000000000000000001', 'Bacon ipsum dolor amet drumstick kevin tenderloin turkey boudin pig, shank ham. Picanha pork chop ground round pork shoulder tenderloin, andouille chuck.',                                                   NULL, 'Nullam eu eros hendrerit, pharetra magna sed, luctus nisl. Integer id luctus ligula. Maecenas commodo sem vel urna hendrerit, non venenatis tortor mollis. Etiam bibendum nulla vitae tortor porta ornare.', NULL, 'Nulla varius ligula vulputate est accumsan, nec venenatis libero facilisis. Mauris in lectus nisl. Donec metus nisi, volutpat vel leo vehicula, consectetur mattis neque.',  '$100 giftcard', 100, 'giftcard'),
    (2,  'Your Second™ Prize',                        X'00000000000000000000000000000002', 'Bacon ipsum dolor amet drumstick kevin tenderloin turkey boudin pig, shank ham. Picanha pork chop ground round pork shoulder tenderloin, andouille chuck.',                                                   NULL, 'Nullam eu eros hendrerit, pharetra magna sed, luctus nisl. Integer id luctus ligula. Maecenas commodo sem vel urna hendrerit, non venenatis tortor mollis. Etiam bibendum nulla vitae tortor porta ornare.', NULL, 'Vestibulum in ex ut tortor posuere interdum. Aenean eu tristique eros, a volutpat elit. Etiam facilisis vel nisl in consectetur. Curabitur magna turpis, sagittis quis mi.', '$100 giftcard', 100, 'giftcard'),
    (3,  'Our Lovely Third Prize',                    X'00000000000000000000000000000003', 'Bacon ipsum dolor amet drumstick kevin tenderloin turkey boudin pig, shank ham. Picanha pork chop ground round pork shoulder tenderloin, andouille chuck.',                                                   NULL, 'Nullam eu eros hendrerit, pharetra magna sed, luctus nisl. Integer id luctus ligula. Maecenas commodo sem vel urna hendrerit, non venenatis tortor mollis. Etiam bibendum nulla vitae tortor porta ornare.', NULL, 'Maecenas et turpis pretium, pellentesque massa pellentesque, volutpat lacus. Donec molestie pharetra nisi vel luctus. Quisque nec neque turpis. Quisque volutpat laoreet.',  '$100 giftcard', 100, 'giftcard'),
    (4,  'Staub Baby Wok',                            X'00000000000000000000000000000004', 'This cast iron wok will help you create extraordinary stir-fries, rice dishes and soups.',                                                                                                                    NULL, NULL,                                                                                                                                                                                                         NULL, NULL,                                                                                                                                                                         '$100 prize',    100, 'prize'),
    (5,  'Berghoff 8-Pc. Knife Block Set',            X'00000000000000000000000000000005', 'With the curvy design, this knife block makes for an elegant addition to any household.',                                                                                                                     NULL, NULL,                                                                                                                                                                                                         NULL, NULL,                                                                                                                                                                         '$100 prize',    100, 'prize'),
    (6,  'Le Creuset Skinny Griddle',                 X'00000000000000000000000000000006', 'Great for cooking up a batch of pancakes, searing steaks, toasting sandwiches and more, this griddle is a versatile addition to your cookware arsenal.',                                                      NULL, NULL,                                                                                                                                                                                                         NULL, NULL,                                                                                                                                                                         '$100 prize',    100, 'prize'),
    (7,  'Trudeau Fondue Set',                        X'00000000000000000000000000000007', 'This electric fondue set alleviates the hassle of using sterno for heating your cheeses and chocolates, and even has variable temperature control to maintain proper consistency and heat.',                  NULL, NULL,                                                                                                                                                                                                         NULL, NULL,                                                                                                                                                                         '$100 prize',    100, 'prize'),
    (8,  'Cuisinart SmartPower Deluxe Blender',       X'00000000000000000000000000000008', 'This blender is strong enough for all blending tasks, including tough jobs like crushing ice or chopping delicate herbs.',                                                                                    NULL, NULL,                                                                                                                                                                                                         NULL, NULL,                                                                                                                                                                         '$100 prize',    100, 'prize'),
    (9,  'Cuisinart 6.5-Qt. Slow Cooker',             X'00000000000000000000000000000009', 'This slow cooker features a 24-hour programmable countdown timer, three cooking modes-and it automatically shifts to warm when it’s done cooking!',                                                           NULL, NULL,                                                                                                                                                                                                         NULL, NULL,                                                                                                                                                                         '$100 prize',    100, 'prize'),
    (10, 'Guy Fieri 10-Pc. Cookware Set',             X'00000000000000000000000000000010', 'This 10-Pc. cookware set features durable construction for fast and even heat distribution and eliminates hot spots that can cause food to burn.',                                                            NULL, NULL,                                                                                                                                                                                                         NULL, NULL,                                                                                                                                                                         '$200 giftcard', 200, 'giftcard'),
    (11, 'J.K. Adams Cutting Board and Serving Tray', X'00000000000000000000000000000011', 'This wooden serve tray is fitted with a cutting board insert to go from your preparation to serving needs.',                                                                                                  NULL, NULL,                                                                                                                                                                                                         NULL, NULL,                                                                                                                                                                         '$200 giftcard', 200, 'giftcard'),
    (12, 'USA Pan 6-Pc. Bakeware Set',                X'00000000000000000000000000000012', 'This professional-grade nonstick bakeware set makes baking and cleanup remarkably simple.',                                                                                                                   NULL, NULL,                                                                                                                                                                                                         NULL, NULL,                                                                                                                                                                         '$200 giftcard', 200, 'giftcard'),
    (13, 'Le Creuset 8-Qt. Stock Pot',                X'00000000000000000000000000000013', 'The enamel-on-steel construction of Le Creuset’s stockpots provides uniform heating for slow simmering or cooking pasta.',                                                                                    NULL, NULL,                                                                                                                                                                                                         NULL, NULL,                                                                                                                                                                         '$200 giftcard', 200, 'giftcard'),
    (14, 'Cuisinart Kitchen Scale',                   X'00000000000000000000000000000014', 'This digital kitchen scale provides a simple, efficient way to weigh common food items.',                                                                                                                     NULL, NULL,                                                                                                                                                                                                         NULL, NULL,                                                                                                                                                                         '$200 giftcard', 200, 'giftcard'),
    (15, 'Serving Cart',                              X'00000000000000000000000000000015', 'Show off your bottle and cocktails in a classy manner with this marvelous serving cart.',                                                                                                                     NULL, NULL,                                                                                                                                                                                                         NULL, NULL,                                                                                                                                                                         '$200 giftcard', 200, 'giftcard'),
    (16, 'Le Creuset 2-Qt. Dutch Oven',               X'00000000000000000000000000000016', 'This Dutch oven is designed specifically to enhance slow-cooking by heating evenly and locking in moisture for more tender results.',                                                                         NULL, NULL,                                                                                                                                                                                                         NULL, NULL,                                                                                                                                                                         '$200 giftcard', 200, 'giftcard'),
    (17, 'Guy Fieri 10-Pc. Cookware Set',             X'00000000000000000000000000000017', 'This 10-Pc. cookware set features durable construction for fast and even heat distribution and eliminates hot spots that can cause food to burn.',                                                            NULL, NULL,                                                                                                                                                                                                         NULL, NULL,                                                                                                                                                                         '$200 giftcard', 200, 'giftcard'),
    (18, 'Chef’s Roasting Pan',                       X'00000000000000000000000000000018', 'Heavy-gauge, mirror-polished roasting pan conducts heat evenly from base to rim for perfectly-cooked poultry and roasts.',                                                                                    NULL, NULL,                                                                                                                                                                                                         NULL, NULL,                                                                                                                                                                         '$200 giftcard', 200, 'giftcard'),
    (19, 'Nutri Bullet Blender',                      X'00000000000000000000000000000019', 'This hi-speed blender/mixer system effortlessly pulverizes fruits, vegetables, superfoods and protein shakes into a delicious, smooth texture.',                                                              NULL, NULL,                                                                                                                                                                                                         NULL, NULL,                                                                                                                                                                         '$200 giftcard', 200, 'giftcard'),
    (20, 'Atlas Pasta Machine',                       X'00000000000000000000000000000020', 'Show off your culinary expertise and enjoy the savory taste of homemade pasta with this Italian-made pasta machine.',                                                                                         NULL, NULL,                                                                                                                                                                                                         NULL, NULL,                                                                                                                                                                         '$200 giftcard', 200, 'giftcard'),
    (21, 'Laguiole Steak Knives',                     X'00000000000000000000000000000021', 'Soft and subtle to the touch, a these colorful knife set will stay sharp and will never rust.',                                                                                                               NULL, NULL,                                                                                                                                                                                                         NULL, NULL,                                                                                                                                                                         '$200 giftcard', 200, 'giftcard'),
    (22, 'Le Creuset Teakettle',                      X'00000000000000000000000000000022', 'Heavy-gauge steel construction with a perfectly flat bottom means this teakettle heats evenly and boils water fast.',                                                                                         NULL, NULL,                                                                                                                                                                                                         NULL, NULL,                                                                                                                                                                         '$200 giftcard', 200, 'giftcard'),
    (23, 'Hamilton Beach Stand Mixer',                X'00000000000000000000000000000023', 'This 4.5-quart size electric stand mixer features 12 speed settings, so you can whip, mix or blend ingredients until they have reached perfection.',                                                          NULL, NULL,                                                                                                                                                                                                         NULL, NULL,                                                                                                                                                                         '$200 giftcard', 200, 'giftcard'),
    (24, 'Cuisinart 8-Cup Food Processor',            X'00000000000000000000000000000024', 'Powerful, quiet, lightweight and sized just right this food processor performs functions of a full-size processor, with multiple attachments and minimal footprint.',                                         NULL, NULL,                                                                                                                                                                                                         NULL, NULL,                                                                                                                                                                         '$300 giftcard', 300, 'giftcard'),
    (25, 'Staub Square Grill Pan',                    X'00000000000000000000000000000025', 'This cast iron grill pan lets you enjoy authentic grilled flavor and healthier entrees, without firing up the grill.',                                                                                        NULL, NULL,                                                                                                                                                                                                         NULL, NULL,                                                                                                                                                                         '$300 giftcard', 300, 'giftcard'),
    (26, 'Le Creuset Saucier',                        X'00000000000000000000000000000026', 'This saucier is ideal for whisking and stirring ingredients thanks to its curved sides, this pan is a versatile tool that lets you combine ingredients on your stovetop.',                                    NULL, NULL,                                                                                                                                                                                                         NULL, NULL,                                                                                                                                                                         '$300 giftcard', 300, 'giftcard'),
    (27, 'Le Creuset Tea Kettle',                     X'00000000000000000000000000000027', 'The steel core of this tea kettle heats water quickly and evenly for perfectly steeped tea of any variety.',                                                                                                  NULL, NULL,                                                                                                                                                                                                         NULL, NULL,                                                                                                                                                                         '$300 giftcard', 300, 'giftcard'),
    (28, 'Calphalon Multi-Purpose Stockpot',          X'00000000000000000000000000000028', 'This multi-pot does the job of three pots yet takes up the room in the cupboard of just one.',                                                                                                                NULL, NULL,                                                                                                                                                                                                         NULL, NULL,                                                                                                                                                                         '$300 giftcard', 300, 'giftcard'),
    (29, 'Circulon Frittata Pan Set',                 X'00000000000000000000000000000029', 'This frittata pan set makes creating a frittata effortless as there’s no need to transfer the dish into an oven or broiler.',                                                                                 NULL, NULL,                                                                                                                                                                                                         NULL, NULL,                                                                                                                                                                         '$300 giftcard', 300, 'giftcard'),
    (30, 'Le Creuset 2.75-Qt. Covered Casserole',     X'00000000000000000000000000000030', 'This covered casserole is deep and spacious to layer meats and vegetables, roast meat or bake pasta entrees and deliver the moist and nutritious flavor that elevates foods to gourmet perfection.',          NULL, NULL,                                                                                                                                                                                                         NULL, NULL,                                                                                                                                                                         '$300 giftcard', 300, 'giftcard'),
    (31, 'Escali Smart Connect Kitchen Scale',        X'00000000000000000000000000000031', 'This kitchen scale is perfect for anyone who is vested in a more healthful and healthy lifestyle by accurately monitoring their food and nutritional intake directly from their scale or smartphone device.', NULL, NULL,                                                                                                                                                                                                         NULL, NULL,                                                                                                                                                                         '$300 giftcard', 300, 'giftcard'),
    (32, 'Berhoff Covered Skillet',                   X'00000000000000000000000000000032', 'Use this versatile skillet on your cooktop, or remove the handles and use it in the oven or under the broiler.',                                                                                              NULL, NULL,                                                                                                                                                                                                         NULL, NULL,                                                                                                                                                                         '$300 giftcard', 300, 'giftcard');


INSERT INTO `user` (`id`, `role`, `verified`, `ip`, `optin`, `site_id`, `date_registered`, `date_verified`, `email`, `password`, `firstname`, `lastname`, `address`, `city`, `state`, `zip`)
VALUES
    (1,    2, 1, 1114994570, 1, 1, '2016-11-09 13:10:10', '2016-11-09 14:14:52', 'johns@junemedia.com',    UNHEX(SHA1(CONCAT("John123",      "4b3be7d16b2875f2d4153a67c23e0d2586585c67"))), 'John',      'Shearer',      '276 Fifth Ave, Suite 901',  'New York',         'NY', 10001),
--  (NULL, 2, 1, 1114994570, 1, 1, '2016-11-09 13:10:10', '2016-11-09 14:14:52', 'yesbelh@junemedia.com',  UNHEX(SHA1(CONCAT("Yesbel123",    "4b3be7d16b2875f2d4153a67c23e0d2586585c67"))), 'Yesbel',    'Herrera',      '276 Fifth Ave, Suite 901',  'New York',         'NY', 10001),
--  (NULL, 2, 1, 1114994570, 1, 1, '2016-11-09 13:10:10', '2016-11-09 14:14:52', 'jims@junemedia.com',     UNHEX(SHA1(CONCAT("Jims123",      "4b3be7d16b2875f2d4153a67c23e0d2586585c67"))), 'James',     'Sanger',       '276 Fifth Ave, Suite 901',  'New York',         'NY', 10001),
    (NULL, 2, 1, 168431411,  1, 1, '2016-11-09 13:10:10', '2016-11-09 14:14:52', 'andrewb@junemedia.com',  UNHEX(SHA1(CONCAT("Aburton123",   "4b3be7d16b2875f2d4153a67c23e0d2586585c67"))), 'Andrew',    'Burton',       '276 Fifth Ave, Suite 901',  'Chicago',          'IL', 60606),
    (NULL, 2, 1, 168431411,  1, 1, '2016-11-09 13:10:10', '2016-11-09 14:14:52', 'samirp@junemedia.com',   UNHEX(SHA1(CONCAT("Samir123",     "4b3be7d16b2875f2d4153a67c23e0d2586585c67"))), 'Samir',     'Patel',        '276 Fifth Ave, Suite 901',  'Chicago',          'IL', 60606),
    (NULL, 2, 1, 168431411,  1, 1, '2016-11-09 13:10:10', '2016-11-09 14:14:52', 'williamg@junemedia.com', UNHEX(SHA1(CONCAT("WilliamG123",  "4b3be7d16b2875f2d4153a67c23e0d2586585c67"))), 'Will',      'Goldman',      '276 Fifth Ave, Suite 901',  'Chicago',          'IL', 60606),
    (NULL, 2, 1, 168431411,  1, 1, '2016-11-09 13:10:10', '2016-11-09 14:14:52', 'leonz@junemedia.com',    UNHEX(SHA1(CONCAT("Leon123",      "4b3be7d16b2875f2d4153a67c23e0d2586585c67"))), 'Leon',      'Zhao',         '276 Fifth Ave, Suite 901',  'Chicago',          'IL', 60606),
    (NULL, 1, 1, 168431411,  1, 1, '2016-11-09 13:10:10', '2016-11-09 14:14:52', 'john+01@ultranaut.com',  UNHEX(SHA1(CONCAT("John123",      "4b3be7d16b2875f2d4153a67c23e0d2586585c67"))), 'Yuri',      'Testikov',     '7231 Silent Quay',          'Arkansas',         'IL', 62956),
    (NULL, 1, 1, 168431411,  1, 1, '2016-11-09 13:10:10', '2016-11-09 14:14:52', 'john+02@ultranaut.com',  UNHEX(SHA1(CONCAT("John123",      "4b3be7d16b2875f2d4153a67c23e0d2586585c67"))), 'Joel',      'Rifkin',       '4055 Noble Elk Bay',        'Cat Square',       'CT', 06162),
    (NULL, 1, 1, 168431411,  1, 1, '2016-11-09 13:10:10', '2016-11-09 14:14:52', 'john+03@ultranaut.com',  UNHEX(SHA1(CONCAT("John123",      "4b3be7d16b2875f2d4153a67c23e0d2586585c67"))), 'Justin',    'Pitt',         '8695 Shady Gate Road',      'Mike Horse',       'NH', 03879),
    (NULL, 1, 1, 168431411,  1, 1, '2016-11-09 13:10:10', '2016-11-09 14:14:52', 'john+04@ultranaut.com',  UNHEX(SHA1(CONCAT("John123",      "4b3be7d16b2875f2d4153a67c23e0d2586585c67"))), 'Art',       'Vandelay',     '6297 Quiet Park',           'Ipe',              'DC', 20018),
    (NULL, 1, 1, 168431411,  1, 1, '2016-11-09 13:10:10', '2016-11-09 14:14:52', 'john+05@ultranaut.com',  UNHEX(SHA1(CONCAT("John123",      "4b3be7d16b2875f2d4153a67c23e0d2586585c67"))), 'Cosmo',     'Kramer',       '2092 Honey Pine Woods',     'Whitebreast',      'OH', 44924),
    (NULL, 1, 1, 168431411,  1, 1, '2016-11-09 13:10:10', '2016-11-09 14:14:52', 'john+06@ultranaut.com',  UNHEX(SHA1(CONCAT("John123",      "4b3be7d16b2875f2d4153a67c23e0d2586585c67"))), 'Elaine',    'Benes',        '729 Velvet Forest',         'Tar Heel',         'OK', 74952),
    (NULL, 1, 1, 168431411,  1, 1, '2016-11-09 13:10:10', '2016-11-09 14:14:52', 'john+07@ultranaut.com',  UNHEX(SHA1(CONCAT("John123",      "4b3be7d16b2875f2d4153a67c23e0d2586585c67"))), 'Bob',       'Sacamano',     '442 Harvest Landing',       'Donerail',         'NY', 14054),
    (NULL, 1, 1, 168431411,  1, 1, '2016-11-09 13:10:10', '2016-11-09 14:14:52', 'john+08@ultranaut.com',  UNHEX(SHA1(CONCAT("John123",      "4b3be7d16b2875f2d4153a67c23e0d2586585c67"))), 'Frank',     'Costanza',     '650 Red Branch Highlands',  'Newfolden',        'WV', 26157),
    (NULL, 1, 1, 168431411,  1, 1, '2016-11-09 13:10:10', '2016-11-09 14:14:52', 'john+09@ultranaut.com',  UNHEX(SHA1(CONCAT("John123",      "4b3be7d16b2875f2d4153a67c23e0d2586585c67"))), 'David',     'Putty',        '346 Hazy Impasse',          'Oliver',           'TN', 37353),
    (NULL, 1, 1, 168431411,  1, 1, '2016-11-09 13:10:10', '2016-11-09 14:14:52', 'john+10@ultranaut.com',  UNHEX(SHA1(CONCAT("John123",      "4b3be7d16b2875f2d4153a67c23e0d2586585c67"))), 'Kenny',     'Bania',        '8951 Foggy Highway',        'Ironsides',        'NY', 10311),
    (NULL, 1, 1, 168431411,  1, 1, '2016-11-09 13:10:10', '2016-11-09 14:14:52', 'john+11@ultranaut.com',  UNHEX(SHA1(CONCAT("John123",      "4b3be7d16b2875f2d4153a67c23e0d2586585c67"))), 'Joe',       'Davola',       '4325 Pleasant Limits',      'Sesachacha',       'DC', 20090),
    (NULL, 1, 1, 168431411,  1, 1, '2016-11-09 13:10:10', '2016-11-09 14:14:52', 'john+12@ultranaut.com',  UNHEX(SHA1(CONCAT("John123",      "4b3be7d16b2875f2d4153a67c23e0d2586585c67"))), 'Jackie',    'Chiles',       '7785 Thunder Crest',        'Red Hot',          'TN', 38101),
    (NULL, 1, 1, 168431411,  1, 1, '2016-11-09 13:10:10', '2016-11-09 14:14:52', 'john+13@ultranaut.com',  UNHEX(SHA1(CONCAT("John123",      "4b3be7d16b2875f2d4153a67c23e0d2586585c67"))), 'Jack',      'Klompis',      '8248 Hidden Grove',         'Cheektowasa',      'IA', 52694),
    (NULL, 1, 1, 168431411,  1, 1, '2016-11-09 13:10:10', '2016-11-09 14:14:52', 'john+14@ultranaut.com',  UNHEX(SHA1(CONCAT("John123",      "4b3be7d16b2875f2d4153a67c23e0d2586585c67"))), 'Golden',    'Boy',          '3110 Round Butterfly Walk', 'Yell',             'NY', 11096),
    (NULL, 1, 1, 168431411,  1, 1, '2016-11-09 13:10:10', '2016-11-09 14:14:52', 'john+15@ultranaut.com',  UNHEX(SHA1(CONCAT("John123",      "4b3be7d16b2875f2d4153a67c23e0d2586585c67"))), 'Russell',   'Dalrymple',    '7382 Cotton Rabbit Pointe', 'Brown Jug Corner', 'WI', 54352),
    (NULL, 1, 1, 168431411,  1, 1, '2016-11-09 13:10:10', '2016-11-09 14:14:52', 'john+16@ultranaut.com',  UNHEX(SHA1(CONCAT("John123",      "4b3be7d16b2875f2d4153a67c23e0d2586585c67"))), 'Izzy',      'Mandelbaum',   '632 Bright Bluff Drive',    'Quackenkill',      'RI', 02835),
    (NULL, 1, 1, 168431411,  1, 1, '2016-11-09 13:10:10', '2016-11-09 14:14:52', 'john+17@ultranaut.com',  UNHEX(SHA1(CONCAT("John123",      "4b3be7d16b2875f2d4153a67c23e0d2586585c67"))), 'Martin',    'van Nostrand', '1659 Silver Passage',       'Ceylon',           'WV', 25803),
    (NULL, 1, 1, 168431411,  1, 1, '2016-11-09 13:10:10', '2016-11-09 14:14:52', 'john+18@ultranaut.com',  UNHEX(SHA1(CONCAT("John123",      "4b3be7d16b2875f2d4153a67c23e0d2586585c67"))), 'H.E.',      'Pennypacker',  '9672 Thunder Berry Acres',  'Chomontakali',     'UT', 84026),
    (NULL, 1, 1, 168431411,  1, 1, '2016-11-09 13:10:10', '2016-11-09 14:14:52', 'john+19@ultranaut.com',  UNHEX(SHA1(CONCAT("John123",      "4b3be7d16b2875f2d4153a67c23e0d2586585c67"))), 'Jerry',     'Persheck',     '2840 Stony Gate',           'Mud Mills',        'UT', 84166),
    (NULL, 1, 1, 168431411,  1, 1, '2016-11-09 13:10:10', '2016-11-09 14:14:52', 'john+20@ultranaut.com',  UNHEX(SHA1(CONCAT("John123",      "4b3be7d16b2875f2d4153a67c23e0d2586585c67"))), 'Sid',       'Farkus',       '7304 Silent Heights',       'Shoal Lake',       'NY', 14907),
    (NULL, 1, 1, 168431411,  1, 1, '2016-11-09 13:10:10', '2016-11-09 14:14:52', 'john+21@ultranaut.com',  UNHEX(SHA1(CONCAT("John123",      "4b3be7d16b2875f2d4153a67c23e0d2586585c67"))), 'Jake',      'Jarmel',       '2531 Cotton Parade',        'Humble City',      'MA', 01656),
    (NULL, 1, 1, 168431411,  1, 1, '2016-11-09 13:10:10', '2016-11-09 14:14:52', 'john+22@ultranaut.com',  UNHEX(SHA1(CONCAT("John123",      "4b3be7d16b2875f2d4153a67c23e0d2586585c67"))), 'Sue Ellen', 'Mischke',      '1469 High Bear Drive',      'Nankipoo',         'NY', 10866),
    (NULL, 1, 1, 168431411,  1, 1, '2016-11-09 13:10:10', '2016-11-09 14:14:52', 'john+23@ultranaut.com',  UNHEX(SHA1(CONCAT("John123",      "4b3be7d16b2875f2d4153a67c23e0d2586585c67"))), 'Scott',     'Drake',        '2840 Easy Hills Highway',   'Goldbadge',        'WV', 25155),
    (NULL, 1, 1, 168431411,  1, 1, '2016-11-09 13:10:10', '2016-11-09 14:14:52', 'john+24@ultranaut.com',  UNHEX(SHA1(CONCAT("John123",      "4b3be7d16b2875f2d4153a67c23e0d2586585c67"))), 'Bob',       'Cobb',         '5190 Amber Zephyr Mews',    'Pluto',            'WV', 26815),
    (NULL, 1, 1, 168431411,  1, 1, '2016-11-09 13:10:10', '2016-11-09 14:14:52', 'john+25@ultranaut.com',  UNHEX(SHA1(CONCAT("John123",      "4b3be7d16b2875f2d4153a67c23e0d2586585c67"))), 'Babu',      'Bhatt',        '704 Hazy Goose Manor',      'Woodenhawk',       'WY', 82475),
    (NULL, 1, 1, 168431411,  1, 1, '2016-11-09 13:10:10', '2016-11-09 14:14:52', 'john+26@ultranaut.com',  UNHEX(SHA1(CONCAT("John123",      "4b3be7d16b2875f2d4153a67c23e0d2586585c67"))), 'Lloyd',     'Braun',        '5902 Indian Nectar Alley',  'Sublimity City',   'ND', 58153),
    (NULL, 1, 1, 168431411,  1, 1, '2016-11-09 13:10:10', '2016-11-09 14:14:52', 'john+27@ultranaut.com',  UNHEX(SHA1(CONCAT("John123",      "4b3be7d16b2875f2d4153a67c23e0d2586585c67"))), 'Tim',       'Whatley',      '1626 Wishing Centre',       'Bowbells',         'OR', 97563),
    (NULL, 1, 1, 168431411,  1, 1, '2016-11-09 13:10:10', '2016-11-09 14:14:52', 'john+28@ultranaut.com',  UNHEX(SHA1(CONCAT("John123",      "4b3be7d16b2875f2d4153a67c23e0d2586585c67"))), 'Mickey',    'Abbott',       '583 Burning Wagon By-pass', 'Mossy Head',       'OR', 97028),
    (NULL, 1, 1, 168431411,  1, 1, '2016-11-09 13:10:10', '2016-11-09 14:14:52', 'john+29@ultranaut.com',  UNHEX(SHA1(CONCAT("John123",      "4b3be7d16b2875f2d4153a67c23e0d2586585c67"))), 'Jacopo',    'Peterman',     '6604 Bright Landing',       'Lookingglass',     'WV', 25311);


-- RANDOM_CONTESTS
DROP PROCEDURE IF EXISTS `RANDOM_CONTESTS`;
DELIMITER $$
CREATE PROCEDURE `RANDOM_CONTESTS` ()
BEGIN
    DECLARE n INT DEFAULT 100;
    DECLARE x INT DEFAULT 1;
    DECLARE START_DATE DATE DEFAULT DATE(DATE_SUB(NOW(), INTERVAL ROUND(n/2) day));
    WHILE x  <= n DO
        INSERT INTO `contest` (`date`, `prize_id`)
        VALUES
            (DATE(DATE_ADD(START_DATE, INTERVAL x day)), CEIL(RAND()*(SELECT COUNT(1) FROM `prize`)));
       SET  x = x + 1;
    END WHILE;
END $$
DELIMITER ;
CALL RANDOM_CONTESTS();
DROP PROCEDURE IF EXISTS `RANDOM_CONTESTS`;
ALTER TABLE `contest` ORDER BY `date` ASC;


-- RANDOM_ENTRIES
DROP PROCEDURE IF EXISTS `RANDOM_ENTRIES`;
DELIMITER $$
CREATE PROCEDURE `RANDOM_ENTRIES` ()
BEGIN
    DECLARE x INT DEFAULT 1;
    DECLARE y DATE;
    DECLARE ui INT;
    DECLARE ue VARCHAR(70);
    WHILE x  <= 1000 DO
        SELECT `date` INTO y FROM `contest` WHERE `date` <= DATE(NOW()) ORDER BY RAND() LIMIT 1;
        SELECT `id` into ui FROM `user` WHERE `id` = CEIL(RAND()*(SELECT COUNT(1) FROM `user`)) LIMIT 1;
        SELECT `email` into ue FROM `user` WHERE `id` = ui LIMIT 1;
        INSERT IGNORE INTO `entry` (`date`, `user_id`, `user_email`, `site_id`, `time`)
        VALUES (
            y,
            ui,
            ue,
            1,
            DATE_ADD(DATE_ADD(DATE_ADD(y, INTERVAL (23*RAND()) HOUR), INTERVAL 59*RAND() MINUTE), INTERVAL 60*RAND() SECOND)
        );
       SET  x = x + 1;
    END WHILE;
END $$
DELIMITER ;
CALL RANDOM_ENTRIES();
DROP PROCEDURE IF EXISTS `RANDOM_ENTRIES`;
ALTER TABLE `entry` ORDER BY `date` ASC, `time` ASC;


-- RANDOM_WINNERS
DROP PROCEDURE IF EXISTS `RANDOM_WINNERS`;
DELIMITER $$
CREATE PROCEDURE `RANDOM_WINNERS` ()
BEGIN
    DECLARE THIS_WINNER_USER_ID MEDIUMINT(8);
    DECLARE THIS_WINNER_SITE_ID TINYINT(3);
    DECLARE THIS_DATE DATE;
    DECLARE LAST_DATE DATE DEFAULT DATE('2000-01-01 00:00:00');
    SELECT `date` INTO THIS_DATE FROM `contest` WHERE `date` < DATE(NOW()) AND `winner_user_id` IS NULL LIMIT 1;
    WHILE THIS_DATE <> LAST_DATE DO
        SELECT `user_id`, `site_id`
        INTO THIS_WINNER_USER_ID, THIS_WINNER_SITE_ID
        FROM `entry`
        WHERE `date` = THIS_DATE
        ORDER BY RAND()
        LIMIT 1;

        UPDATE `contest`
        SET `winner_user_id` = THIS_WINNER_USER_ID,
            `winner_site_id` = THIS_WINNER_SITE_ID
        WHERE `date` = THIS_DATE;

        -- loop control
        SET LAST_DATE = THIS_DATE;

        SELECT `date` INTO THIS_DATE FROM `contest` WHERE `date` < DATE(NOW()) AND `winner_user_id` IS NULL LIMIT 1;
    END WHILE;
END $$
DELIMITER ;
CALL RANDOM_WINNERS();
DROP PROCEDURE IF EXISTS `RANDOM_WINNERS`;
ALTER TABLE `entry` ORDER BY `date` ASC, `time` ASC;
