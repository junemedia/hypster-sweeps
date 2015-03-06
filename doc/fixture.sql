TRUNCATE TABLE `site`;
TRUNCATE TABLE `prize`;
TRUNCATE TABLE `user`;
TRUNCATE TABLE `contest`;
TRUNCATE TABLE `entry`;


INSERT INTO `site` (`id`, `slug`, `name`, `domain`, `gtm`)
VALUES
    (1, 'betterrecipes', 'BetterRecipes', 'win.betterrecipes.com', 'GTM-5VTT4K');


INSERT INTO `prize` (`id`, `title`, `img1`, `desc1`, `img2`, `desc2`, `img3`, `desc3`, `award`, `value`, `type`)
VALUES
    (1,  'My First Prize<sup>®</sup>', X'00000000000000000000000000000001', 'Bacon ipsum dolor amet drumstick kevin tenderloin turkey boudin pig, shank ham. Picanha pork chop ground round pork shoulder tenderloin, andouille chuck. Andouille flank swine, t-bone capicola prosciutto cow kielbasa fatback turkey chuck sirloin pork chop pancetta pork belly. Landjaeger ham corned beef, strip steak prosciutto meatloaf bacon cow kevin. Jowl meatloaf rump, frankfurter pork ribeye pancetta biltong chuck. Drumstick venison frankfurter tenderloin swine tongue shankle picanha alcatra cow tail sal', NULL, 'Chicken meatloaf brisket shoulder kielbasa. T-bone turkey alcatra boudin, porchetta bacon pork belly drumstick ball tip strip steak. Hamburger kevin beef, brisket beef ribs short loin flank picanha cupim bresaola pork belly tenderloin tri-tip. Brisket fatback ribeye chuck. Chuck jowl ham hock, salami pancetta swine doner meatloaf sausage shankle turkey capicola pastrami flank. Beef jerky ham hock, ball tip prosciutto boudin salami strip steak pork loin. Bacon t-bone alcatra corned beef andouille swine.', NULL, 'Sirloin salami swine rump ham. Pork loin t-bone spare ribs alcatra, prosciutto leberkas meatball cow tri-tip tail fatback jerky. Chicken ground round t-bone, fatback ribeye kielbasa pork chop boudin ball tip tongue. Rump prosciutto ground round beef ribs pancetta capicola swine. Ball tip beef ribs kevin flank hamburger meatball.', '100', 100, 'giftcard'),
    (2,  'Your Second™ Prize',         X'00000000000000000000000000000002', 'Bacon ipsum dolor amet drumstick kevin tenderloin turkey boudin pig, shank ham. Picanha pork chop ground round pork shoulder tenderloin, andouille chuck. Andouille flank swine, t-bone capicola prosciutto cow kielbasa fatback turkey chuck sirloin pork chop pancetta pork belly. Landjaeger ham corned beef, strip steak prosciutto meatloaf bacon cow kevin. Jowl meatloaf rump, frankfurter pork ribeye pancetta biltong chuck. Drumstick venison frankfurter tenderloin swine tongue shankle picanha alcatra cow tail sal', NULL, 'Chicken meatloaf brisket shoulder kielbasa. T-bone turkey alcatra boudin, porchetta bacon pork belly drumstick ball tip strip steak. Hamburger kevin beef, brisket beef ribs short loin flank picanha cupim bresaola pork belly tenderloin tri-tip. Brisket fatback ribeye chuck. Chuck jowl ham hock, salami pancetta swine doner meatloaf sausage shankle turkey capicola pastrami flank. Beef jerky ham hock, ball tip prosciutto boudin salami strip steak pork loin. Bacon t-bone alcatra corned beef andouille swine.', NULL, 'Sirloin salami swine rump ham. Pork loin t-bone spare ribs alcatra, prosciutto leberkas meatball cow tri-tip tail fatback jerky. Chicken ground round t-bone, fatback ribeye kielbasa pork chop boudin ball tip tongue. Rump prosciutto ground round beef ribs pancetta capicola swine. Ball tip beef ribs kevin flank hamburger meatball.', '100', 100, 'giftcard'),
    (3,  'Our Lovely Third Prize',     X'00000000000000000000000000000003', 'Bacon ipsum dolor amet drumstick kevin tenderloin turkey boudin pig, shank ham. Picanha pork chop ground round pork shoulder tenderloin, andouille chuck. Andouille flank swine, t-bone capicola prosciutto cow kielbasa fatback turkey chuck sirloin pork chop pancetta pork belly. Landjaeger ham corned beef, strip steak prosciutto meatloaf bacon cow kevin. Jowl meatloaf rump, frankfurter pork ribeye pancetta biltong chuck. Drumstick venison frankfurter tenderloin swine tongue shankle picanha alcatra cow tail sal', NULL, 'Chicken meatloaf brisket shoulder kielbasa. T-bone turkey alcatra boudin, porchetta bacon pork belly drumstick ball tip strip steak. Hamburger kevin beef, brisket beef ribs short loin flank picanha cupim bresaola pork belly tenderloin tri-tip. Brisket fatback ribeye chuck. Chuck jowl ham hock, salami pancetta swine doner meatloaf sausage shankle turkey capicola pastrami flank. Beef jerky ham hock, ball tip prosciutto boudin salami strip steak pork loin. Bacon t-bone alcatra corned beef andouille swine.', NULL, 'Sirloin salami swine rump ham. Pork loin t-bone spare ribs alcatra, prosciutto leberkas meatball cow tri-tip tail fatback jerky. Chicken ground round t-bone, fatback ribeye kielbasa pork chop boudin ball tip tongue. Rump prosciutto ground round beef ribs pancetta capicola swine. Ball tip beef ribs kevin flank hamburger meatball.', '100', 100, 'giftcard'),
    (4,  'Staub Baby Wok',     X'00000000000000000000000000000004', 'This cast iron wok will help you create extraordinary stir-fries, rice dishes and soups.', NULL, NULL, NULL, NULL, '100', 100, 'prize'),
    (5,  'Berghoff 8-Pc. Knife Block Set',     X'00000000000000000000000000000005', 'With the curvy design, this knife block makes for an elegant addition to any household.', NULL, NULL, NULL, NULL, '100', 100, 'prize'),
    (6,  'Le Creuset Skinny Griddle',     X'00000000000000000000000000000006', 'Great for cooking up a batch of pancakes, searing steaks, toasting sandwiches and more, this griddle is a versatile addition to your cookware arsenal.', NULL, NULL, NULL, NULL, '100', 100, 'prize'),
    (7,  'Trudeau Fondue Set',     X'00000000000000000000000000000007', 'This electric fondue set alleviates the hassle of using sterno for heating your cheeses and chocolates, and even has variable temperature control to maintain proper consistency and heat.', NULL, NULL, NULL, NULL, '100', 100, 'prize'),
    (8,  'Cuisinart SmartPower Deluxe Blender',     X'00000000000000000000000000000008', 'This blender is strong enough for all blending tasks, including tough jobs like crushing ice or chopping delicate herbs.', NULL, NULL, NULL, NULL, '100', 100, 'prize'),
    (9,  'Cuisinart 6.5-Qt. Slow Cooker',     X'00000000000000000000000000000009', 'This slow cooker features a 24-hour programmable countdown timer, three cooking modes-and it automatically shifts to warm when it’s done cooking!', NULL, NULL, NULL, NULL, '100', 100, 'prize'),
    (10, 'Guy Fieri 10-Pc. Cookware Set',     X'00000000000000000000000000000010', 'This 10-Pc. cookware set features durable construction for fast and even heat distribution and eliminates hot spots that can cause food to burn.', NULL, NULL, NULL, NULL, '200', 200, 'giftcard'),
    (11, 'J.K. Adams Cut ting Board and Serving Tray',     X'00000000000000000000000000000011', 'This wooden serve tray is fitted with a cutting board insert to go from your preparation to serving needs.', NULL, NULL, NULL, NULL, '200', 200, 'giftcard'),
    (12, 'USA Pan 6-Pc. Bakeware Set',     X'00000000000000000000000000000012', 'This professional-grade nonstick bakeware set makes baking and cleanup remarkably simple.', NULL, NULL, NULL, NULL, '200', 200, 'giftcard'),
    (13, 'Le Creuset 8-Qt. Stock Pot',     X'00000000000000000000000000000013', 'The enamel-on-steel construction of Le Creuset’s stockpots provides uniform heating for slow simmering or cooking pasta.', NULL, NULL, NULL, NULL, '200', 200, 'giftcard'),
    (14, 'Cuisinart Kitchen Scale',     X'00000000000000000000000000000014', 'This digital kitchen scale provides a simple, efficient way to weigh common food items.', NULL, NULL, NULL, NULL, '200', 200, 'giftcard'),
    (15, 'Serving Cart',     X'00000000000000000000000000000015', 'Show off your bottle and cocktails in a classy manner with this marvelous serving cart.', NULL, NULL, NULL, NULL, '200', 200, 'giftcard'),
    (16, 'Le Creuset 2-Qt. Dutch Oven',     X'00000000000000000000000000000016', 'This Dutch oven is designed specifically to enhance slow-cooking by heating evenly and locking in moisture for more tender results.', NULL, NULL, NULL, NULL, '200', 200, 'giftcard'),
    (17, 'Guy Fieri 10-Pc. Cookware Set',     X'00000000000000000000000000000017', 'This 10-Pc. cookware set features durable construction for fast and even heat distribution and eliminates hot spots that can cause food to burn.', NULL, NULL, NULL, NULL, '200', 200, 'giftcard'),
    (18, 'Chef’s Roasting Pan',     X'00000000000000000000000000000018', 'Heavy-gauge, mirror-polished roasting pan conducts heat evenly from base to rim for perfectly-cooked poultry and roasts.', NULL, NULL, NULL, NULL, '200', 200, 'giftcard'),
    (19, 'Nutri Bullet Blender',     X'00000000000000000000000000000019', 'This hi-speed blender/mixer system effortlessly pulverizes fruits, vegetables, superfoods and protein shakes into a delicious, smooth texture.', NULL, NULL, NULL, NULL, '200', 200, 'giftcard'),
    (20, 'Atlas Pasta Machine',     X'00000000000000000000000000000020', 'Show off your culinary expertise and enjoy the savory taste of homemade pasta with this Italian-made pasta machine.', NULL, NULL, NULL, NULL, '200', 200, 'giftcard'),
    (21, 'Laguiole Steak Knives',     X'00000000000000000000000000000021', 'Soft and subtle to the touch, a these colorful knife set will stay sharp and will never rust.', NULL, NULL, NULL, NULL, '200', 200, 'giftcard'),
    (22, 'Le Creuset Teakettle',     X'00000000000000000000000000000022', 'Heavy-gauge steel construction with a perfectly flat bottom means this teakettle heats evenly and boils water fast.', NULL, NULL, NULL, NULL, '200', 200, 'giftcard'),
    (23, 'Hamilton Beach Stand Mixer',     X'00000000000000000000000000000023', 'This 4.5-quart size electric stand mixer features 12 speed settings, so you can whip, mix or blend ingredients until they have reached perfection.', NULL, NULL, NULL, NULL, '200', 200, 'giftcard'),
    (24, 'Cuisinart 8-Cup Food Processor',     X'00000000000000000000000000000024', 'Powerful, quiet, lightweight and sized just right this food processor performs functions of a full-size processor, with multiple attachments and minimal footprint.', NULL, NULL, NULL, NULL, '300', 300, 'giftcard'),
    (25, 'Staub Square Grill Pan',     X'00000000000000000000000000000025', 'This cast iron grill pan lets you enjoy authentic grilled flavor and healthier entrees, without firing up the grill.', NULL, NULL, NULL, NULL, '300', 300, 'giftcard'),
    (26, 'Le Creuset Saucier',     X'00000000000000000000000000000026', 'This saucier is ideal for whisking and stirring ingredients thanks to its curved sides, this pan is a versatile tool that lets you combine ingredients on your stovetop.', NULL, NULL, NULL, NULL, '300', 300, 'giftcard'),
    (27, 'Le Creuset Tea Kettle',     X'00000000000000000000000000000027', 'The steel core of this tea kettle heats water quickly and evenly for perfectly steeped tea of any variety.', NULL, NULL, NULL, NULL, '300', 300, 'giftcard'),
    (28, 'Calphalon Multi-Purpose Stockpot',     X'00000000000000000000000000000028', 'This multi-pot does the job of three pots yet takes up the room in the cupboard of just one.', NULL, NULL, NULL, NULL, '300', 300, 'giftcard'),
    (29, 'Circulon Frittata Pan Set',     X'00000000000000000000000000000029', 'This frittata pan set makes creating a frittata effortless as there’s no need to transfer the dish into an oven or broiler.', NULL, NULL, NULL, NULL, '300', 300, 'giftcard'),
    (30, 'Le Creuset 2.75-Qt. Covered Casserole',     X'00000000000000000000000000000030', 'This covered casserole is deep and spacious to layer meats and vegetables, roast meat or bake pasta entrees and deliver the moist and nutritious flavor that elevates foods to gourmet perfection.', NULL, NULL, NULL, NULL, '300', 300, 'giftcard'),
    (31, 'Escali Smart Connect Kitchen Scale',     X'00000000000000000000000000000031', 'This kitchen scale is perfect for anyone who is vested in a more healthful and healthy lifestyle by accurately monitoring their food and nutritional intake directly from their scale or smartphone device.', NULL, NULL, NULL, NULL, '300', 300, 'giftcard'),
    (32, 'Berhoff Covered Skillet',     X'00000000000000000000000000000032', 'Use this versatile skillet on your cooktop, or remove the handles and use it in the oven or under the broiler.', NULL, NULL, NULL, NULL, '300', 300, 'giftcard');


INSERT INTO `user` (`id`, `email`, `role`, `verified`, `password`, `ip`, `date_registered`, `date_verified`, `firstname`, `lastname`, `address`, `city`, `state`, `zip`)
VALUES
    -- 1: Adam123
    -- 2: Aconforti123
    -- 3: Wgrant123
    (1,    'achalemian@resolute.com', 2, 1, X'D26C0C1998E3CEA784EF8F8835E3970BE2B05D54', 168431411, '2015-01-23 13:10:10', '2015-01-23 14:14:52', 'Adam', 'Chalemian', '137 W 25th St', 'New York', 'NY', 10001),
    (2,    'aconforti@resolute.com', 2, 1, X'95B798497FA6C7752EED3E16EED8CC9904BC5BD2', 168431411, '2015-01-23 13:10:10', '2015-01-23 14:14:52', 'Angela', 'Conforti','137 W 25th St', 'New York', 'NY', 10001),
    (3,    'williamg@junemedia.com', 2, 1, X'B903229CD2B55EF123A40230340682684EFE2F24', 168431411, '2015-01-23 13:10:10', '2015-01-23 14:14:52', 'William', 'Grant','137 W 25th St', 'New York', 'NY', 10001),
    (NULL, 'achalemian+1@resolute.com', 1, 1, X'D26C0C1998E3CEA784EF8F8835E3970BE2B05D54', 168431411, '2015-01-23 13:10:10', '2015-01-23 14:14:52', 'Yuri', 'Testikov','7231 Silent Quay', 'Arkansas', 'IL', 62956),
    (NULL, 'achalemian+2@resolute.com', 1, 1, X'D26C0C1998E3CEA784EF8F8835E3970BE2B05D54', 168431411, '2015-01-23 13:10:10', '2015-01-23 14:14:52', 'Joel', 'Rifkin', '4055 Noble Elk Bay', 'Cat Square', 'CT', 06162),
    (NULL, 'achalemian+3@resolute.com', 1, 1, X'D26C0C1998E3CEA784EF8F8835E3970BE2B05D54', 168431411, '2015-01-23 13:10:10', '2015-01-23 14:14:52', 'Justin', 'Pitt','8695 Shady Gate Road', 'Mike Horse', 'NH', 03879),
    (NULL, 'achalemian+4@resolute.com', 1, 1, X'D26C0C1998E3CEA784EF8F8835E3970BE2B05D54', 168431411, '2015-01-23 13:10:10', '2015-01-23 14:14:52', 'Art', 'Vandelay','6297 Quiet Park', 'Ipe', 'DC', 20018),
    (NULL, 'achalemian+5@resolute.com', 1, 1, X'D26C0C1998E3CEA784EF8F8835E3970BE2B05D54', 168431411, '2015-01-23 13:10:10', '2015-01-23 14:14:52', 'Cosmo', 'Kramer', '2092 Honey Pine Woods', 'Whitebreast', 'OH', 44924),
    (NULL, 'achalemian+6@resolute.com', 1, 1, X'D26C0C1998E3CEA784EF8F8835E3970BE2B05D54', 168431411, '2015-01-23 13:10:10', '2015-01-23 14:14:52', 'Elaine', 'Benes', '729 Velvet Forest', 'Tar Heel', 'OK', 74952),
    (NULL, 'achalemian+7@resolute.com', 1, 1, X'D26C0C1998E3CEA784EF8F8835E3970BE2B05D54', 168431411, '2015-01-23 13:10:10', '2015-01-23 14:14:52', 'Bob', 'Sacamano', '442 Harvest Landing', 'Donerail', 'NY', 14054),
    (NULL, 'achalemian+8@resolute.com', 1, 1, X'D26C0C1998E3CEA784EF8F8835E3970BE2B05D54', 168431411, '2015-01-23 13:10:10', '2015-01-23 14:14:52', 'Frank', 'Costanza', '650 Red Branch Highlands', 'Newfolden', 'WV', 26157),
    (NULL, 'achalemian+9@resolute.com', 1, 1, X'D26C0C1998E3CEA784EF8F8835E3970BE2B05D54', 168431411, '2015-01-23 13:10:10', '2015-01-23 14:14:52', 'David', 'Putty', '346 Hazy Impasse', 'Oliver', 'TN', 37353),
    (NULL, 'achalemian+10@resolute.com', 1, 1, X'D26C0C1998E3CEA784EF8F8835E3970BE2B05D54', 168431411, '2015-01-23 13:10:10', '2015-01-23 14:14:52', 'Kenny', 'Bania', '8951 Foggy Highway', 'Ironsides', 'NY', 10311),
    (NULL, 'achalemian+11@resolute.com', 1, 1, X'D26C0C1998E3CEA784EF8F8835E3970BE2B05D54', 168431411, '2015-01-23 13:10:10', '2015-01-23 14:14:52', 'Joe', 'Davola', '4325 Pleasant Limits', 'Sesachacha', 'DC', 20090),
    (NULL, 'achalemian+12@resolute.com', 1, 1, X'D26C0C1998E3CEA784EF8F8835E3970BE2B05D54', 168431411, '2015-01-23 13:10:10', '2015-01-23 14:14:52', 'Jackie', 'Chiles', '7785 Thunder Crest', 'Red Hot', 'TN', 38101),
    (NULL, 'achalemian+13@resolute.com', 1, 1, X'D26C0C1998E3CEA784EF8F8835E3970BE2B05D54', 168431411, '2015-01-23 13:10:10', '2015-01-23 14:14:52', 'Jack', 'Klompis', '8248 Hidden Grove', 'Cheektowasa', 'IA', 52694),
    (NULL, 'achalemian+14@resolute.com', 1, 1, X'D26C0C1998E3CEA784EF8F8835E3970BE2B05D54', 168431411, '2015-01-23 13:10:10', '2015-01-23 14:14:52', 'Golden', 'Boy', '3110 Round Butterfly Walk', 'Yell', 'NY', 11096),
    (NULL, 'achalemian+15@resolute.com', 1, 1, X'D26C0C1998E3CEA784EF8F8835E3970BE2B05D54', 168431411, '2015-01-23 13:10:10', '2015-01-23 14:14:52', 'Russell', 'Dalrymple', '7382 Cotton Rabbit Pointe', 'Brown Jug Corner', 'WI', 54352),
    (NULL, 'achalemian+16@resolute.com', 1, 1, X'D26C0C1998E3CEA784EF8F8835E3970BE2B05D54', 168431411, '2015-01-23 13:10:10', '2015-01-23 14:14:52', 'Izzy', 'Mandelbaum', '632 Bright Bluff Drive', 'Quackenkill', 'RI', 02835),
    (NULL, 'achalemian+17@resolute.com', 1, 1, X'D26C0C1998E3CEA784EF8F8835E3970BE2B05D54', 168431411, '2015-01-23 13:10:10', '2015-01-23 14:14:52', 'Martin', 'van Nostrand', '1659 Silver Passage', 'Ceylon', 'WV', 25803),
    (NULL, 'achalemian+18@resolute.com', 1, 1, X'D26C0C1998E3CEA784EF8F8835E3970BE2B05D54', 168431411, '2015-01-23 13:10:10', '2015-01-23 14:14:52', 'H.E.', 'Pennypacker', '9672 Thunder Berry Acres', 'Chomontakali', 'UT', 84026),
    (NULL, 'achalemian+19@resolute.com', 1, 1, X'D26C0C1998E3CEA784EF8F8835E3970BE2B05D54', 168431411, '2015-01-23 13:10:10', '2015-01-23 14:14:52', 'Jerry', 'Persheck', '2840 Stony Gate', 'Mud Mills', 'UT', 84166),
    (NULL, 'achalemian+20@resolute.com', 1, 1, X'D26C0C1998E3CEA784EF8F8835E3970BE2B05D54', 168431411, '2015-01-23 13:10:10', '2015-01-23 14:14:52', 'Sid', 'Farkus', '7304 Silent Heights', 'Shoal Lake', 'NY', 14907),
    (NULL, 'achalemian+21@resolute.com', 1, 1, X'D26C0C1998E3CEA784EF8F8835E3970BE2B05D54', 168431411, '2015-01-23 13:10:10', '2015-01-23 14:14:52', 'Jake', 'Jarmel', '2531 Cotton Parade', 'Humble City', 'MA', 01656),
    (NULL, 'achalemian+22@resolute.com', 1, 1, X'D26C0C1998E3CEA784EF8F8835E3970BE2B05D54', 168431411, '2015-01-23 13:10:10', '2015-01-23 14:14:52', 'Sue Ellen', 'Mischke', '1469 High Bear Drive', 'Nankipoo', 'NY', 10866),
    (NULL, 'achalemian+23@resolute.com', 1, 1, X'D26C0C1998E3CEA784EF8F8835E3970BE2B05D54', 168431411, '2015-01-23 13:10:10', '2015-01-23 14:14:52', 'Scott', 'Drake', '2840 Easy Hills Highway', 'Goldbadge', 'WV', 25155),
    (NULL, 'achalemian+24@resolute.com', 1, 1, X'D26C0C1998E3CEA784EF8F8835E3970BE2B05D54', 168431411, '2015-01-23 13:10:10', '2015-01-23 14:14:52', 'Bob', 'Cobb', '5190 Amber Zephyr Mews', 'Pluto', 'WV', 26815),
    (NULL, 'achalemian+25@resolute.com', 1, 1, X'D26C0C1998E3CEA784EF8F8835E3970BE2B05D54', 168431411, '2015-01-23 13:10:10', '2015-01-23 14:14:52', 'Babu', 'Bhatt', '704 Hazy Goose Manor', 'Woodenhawk', 'WY', 82475),
    (NULL, 'achalemian+26@resolute.com', 1, 1, X'D26C0C1998E3CEA784EF8F8835E3970BE2B05D54', 168431411, '2015-01-23 13:10:10', '2015-01-23 14:14:52', 'Lloyd', 'Braun', '5902 Indian Nectar Alley', 'Sublimity City', 'ND', 58153),
    (NULL, 'achalemian+27@resolute.com', 1, 1, X'D26C0C1998E3CEA784EF8F8835E3970BE2B05D54', 168431411, '2015-01-23 13:10:10', '2015-01-23 14:14:52', 'Tim', 'Whatley', '1626 Wishing Centre', 'Bowbells', 'OR', 97563),
    (NULL, 'achalemian+28@resolute.com', 1, 1, X'D26C0C1998E3CEA784EF8F8835E3970BE2B05D54', 168431411, '2015-01-23 13:10:10', '2015-01-23 14:14:52', 'Mickey', 'Abbott', '583 Burning Wagon By-pass', 'Mossy Head', 'OR', 97028),
    (NULL, 'achalemian+29@resolute.com', 1, 1, X'D26C0C1998E3CEA784EF8F8835E3970BE2B05D54', 168431411, '2015-01-23 13:10:10', '2015-01-23 14:14:52', 'Jacopo', 'Peterman', '6604 Bright Landing', 'Lookingglass', 'WV', 25311);


-- RANDOM_CONTESTS
DROP PROCEDURE IF EXISTS `RANDOM_CONTESTS`;
DELIMITER $$
CREATE PROCEDURE `RANDOM_CONTESTS` ()
BEGIN
    DECLARE n INT DEFAULT 1000;
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
    WHILE x  <= 10000 DO
        SELECT `date` INTO y FROM `contest` WHERE `date` <= DATE(NOW()) ORDER BY RAND() LIMIT 1;
        INSERT IGNORE INTO `entry` (`date`, `user_id`, `site_id`, `time`)
        VALUES (
            y,
            CEIL(RAND()*(SELECT COUNT(1) FROM `user`)),
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