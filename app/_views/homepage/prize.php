<div id="prize" class="frame"><? if (@$today): ?><h3 class="prize_today"><?= date( "F j", strtotime($today['date'])); ?>&nbsp;|&nbsp;<span>Win today’s prize</span></h3><form id="prize_form" class="prize col3" action="/api/enter" method="post"><img src="<?= $today['img1'] ?>"/><div class="info"><h1><?= $today['title'] ?></h1><p><input id="enterme" type="checkbox" checked="checked" value="1"/><label for="enterme"><strong>YES!</strong>&nbsp;Enter me to WIN!</label></p><p class="directives"><a href="/rules" target="_blank">Official Rules</a><a class="logout">Logout</a></p></div><div class="newsletters"><div id="offers_newsletters"></div></div><div class="alert"></div><div class="submit"><input type="submit" value="Enter Now"/><span class="ajax-loader"></span></div></form><? else: ?><h3>No prize for this date.</h3><? endif; ?></div>