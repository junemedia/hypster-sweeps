# Meredith Daily Sweeps

## Running on your virtual machine (VM)

*Execute all of these commands from **YOUR VM ONLY**!*

1. Clone to your VM

        git clone git@github.com:resolute/sweeps.git /srv/sites/sweeps

2. Pull last night’s database dump to your VM

        mysql -e 'CREATE DATABASE IF NOT EXISTS `sweeps`'
        ssh prod-mfs "cat /srv/mysql/`date '+%A'`/sweeps.sql.gz" | gzip -dc | mysql sweeps

3. Your local copy should now be accessible at http://parents.sweeps.YOURNAME.resolute.com/


## URLS

| Production                                                     | Staging (red)                                                                                  |
|:---------------------------------------------------------------|-----------------------------------------------------------------------------------------------:|
| [win.**betterrecipes**.com](http://win.betterrecipes.com/)     | [**betterrecipes**.sweeps.red.resolute.com](http://betterrecipes.sweeps.red.resolute.com/)     |
| [win.**bhg**.com](http://win.bhg.com/)                         | [**bhg**.sweeps.red.resolute.com](http://bhg.sweeps.red.resolute.com/)                         |
| [win.**divinecaroline**.com](http://win.divinecaroline.com/)   | [**divinecaroline**.sweeps.red.resolute.com](http://divinecaroline.sweeps.red.resolute.com/)   |
| [win.**familycircle**.com](http://win.familycircle.com/)       | [**familycircle**.sweeps.red.resolute.com](http://familycircle.sweeps.red.resolute.com/)       |
| [win.**fitnessmagazine**.com](http://win.fitnessmagazine.com/) | [**fitnessmagazine**.sweeps.red.resolute.com](http://fitnessmagazine.sweeps.red.resolute.com/) |
| [win.**more**.com](http://win.more.com/)                       | [**more**.sweeps.red.resolute.com](http://more.sweeps.red.resolute.com/)                       |
| [win.**parents**.com](http://win.parents.com/)                 | [**parents**.sweeps.red.resolute.com](http://parents.sweeps.red.resolute.com/)                 |
| [win.**recipe**.com](http://win.recipe.com/)                   | [**recipe**.sweeps.red.resolute.com](http://recipe.sweeps.red.resolute.com/)                   |
| ~~[win.better.tv](http://win.better.tv/)~~ (offline)           |                                                                                                |
| ~~[win.lhj.com](http://win.lhj.com/)~~ (offline)               |                                                                                                |


## Business Rules

The main concept of the sweeps project involves prizes that are connected to daily contests (daily rules). The user sees the prize on the front end and enters into the daily contest where one winner for each daily rule is selected nightly. However the user does not win the advertised prize. Instead they win a prize specified in the daily rule.

Winners are selected nightly through the cron and emails are sent out to both winners and admins. If an alternate winner is needed to be selected, a tool can be run to choose one by providing the date and daily rule id.

The sites involved in this project are listed above through their URLs and also can contain channels. Channels are essentially subsection of the main page which is known as the General channel. The General channel is the primary one which can not be removed and remains as the homepage. An unlimited number of channels can be added for each site, but only 5 additional ones (excluding General) can be active at one time. All channels contain the same functionality and can each host one prize (and therefore one daily rule) per day.

A prize has a single date and can be associated with many different channels. A prize is also associated directly with a daily rule. This indirectly associates a daily rule with many channels, and can spread it across multiple channels and multiple sites. However, only one winner is per night per daily rule regardless of how many channels it spans across.

A user may enter into a daily rule once per day. Therefore if a daily rule were to span 3 different channels for example, a user may enter that daily rule on any of those 3 channels one time. Once a user enters into a daily rule when they login on other channels connected to that daily rule they are told they have already entered into that contest. This changes from old sweeps to this version of sweeps in that originally users could enter once per day per site for each daily rule.  Because of the high traffic volume of entries into daily rules, contestant entries are moved into an archive table monthly, there by freeing up the contestant table.

Meredith also has grand prizes which are usually for 3-6 months at a time. These are directly associated with channels and at the end of the grand prize contest (grand prize rule) one winner is selected through a manual task (CI Tool).

## Statistics

Entries - The number of entries (daily rule contestant entries) in the daily_rule_contestant table
Entrants - The unique number of users who entered into daily rules per month

Example - 2 Daily rules on Better Recipes for 30 days (60 possible total entries for one user)
1 User - enters into both daily rules everyday
This results in a total of 60 entries and 2 entrants

Entries - Total number of times user entered
Entrants - Counts for 1 for each daily rule they entered into per month.


## Sweeps Tools

### Create Admin

    php symfony sweeps:create-admin :username :password


## Crontab Entries

1. Daily Winner Selection (every night at midnight on the dot)

        0    0 * * * root /srv/sites/sweeps/bin/cron daily > /dev/null

2. RSS Offer Update (every 3 hours on the 12th minute)

        12 */4 * * * root /srv/sites/sweeps/bin/rss > /dev/null

3. Update the `stats_monthly` with proper entrants (02:38 on the first of the month -- before mysql backup)

        38   2 1 * * root /srv/sites/sweeps/bin/cron entrants

4. CSV Report Generation (every night at 6:21am)

        21   6 * * * root /srv/sites/sweeps/bin/reports