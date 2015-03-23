# June Media Daily Sweeps

## Running on your virtual machine (VM)

*Execute all of these commands from **YOUR VM ONLY**!*

1. Clone to your VM

        git clone git@github.com:resolute/dailysweeps.git /srv/sites/dailysweeps

2. Pull last night’s database dump to your VM

        mysql -e 'CREATE DATABASE IF NOT EXISTS `dailysweeps`'
        ssh prod-mfs "cat /srv/mysql/`date '+%A'`/dailysweeps.sql.gz" | gzip -dc | mysql dailysweeps

3. Your local copy should now be accessible at http://betterrecipes.dailysweeps.YOURNAME.resolute.com/


## URLS

| Production                                                     | Staging (white)                                                                                        |
|:---------------------------------------------------------------|-------------------------------------------------------------------------------------------------------:|
| [win.**betterrecipes**.com](http://win.betterrecipes.com/)     | [**betterrecipes**.dailysweeps.white.resolute.com](http://betterrecipes.dailysweeps.white.resolute.com/) |


## Crontab Entries

##### Daily Winner Selection

    # dailysweeps: Generate reports every night at midnight PRECISELY
    0    0 * * * root cd /srv/sites/dailysweeps && ./bin/cron daily

##### Reports

    # dailysweeps: Generate reports every night at 04:37am
    37   4 * * * root cd /srv/sites/dailysweeps && ./bin/reports

