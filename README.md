# June Media Daily Sweeps

## Running on your virtual machine (VM)

*Execute all of these commands from **YOUR VM ONLY**!*

1. Clone to your VM

        git clone git@github.com:resolute/junesweeps.git /srv/sites/junesweeps

2. Pull last night’s database dump to your VM

        mysql -e 'CREATE DATABASE IF NOT EXISTS `junesweeps`'
        ssh prod-mfs "cat /srv/mysql/`date '+%A'`/junesweeps.sql.gz" | gzip -dc | mysql junesweeps

3. Your local copy should now be accessible at http://betterrecipes.junesweeps.YOURNAME.resolute.com/


## URLS

| Production                                                     | Staging (white)                                                                                        |
|:---------------------------------------------------------------|-------------------------------------------------------------------------------------------------------:|
| [win.**betterrecipes**.com](http://win.betterrecipes.com/)     | [**betterrecipes**.junesweeps.white.resolute.com](http://betterrecipes.junesweeps.white.resolute.com/) |


## Crontab Entries

##### Daily Winner Selection

    # junesweeps: Generate reports every night at midnight PRECISELY
    0    0 * * * root cd /srv/sites/junesweeps && ./bin/cron daily

##### Reports

    # junesweeps: Generate reports every night at 04:37am
    37   4 * * * root cd /srv/sites/junesweeps && ./bin/reports

