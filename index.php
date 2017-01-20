<?php 
include_once 'config.php'
?>
<!doctype html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7" lang=""> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8" lang=""> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9" lang=""> <![endif]-->
<!--[if gt IE 8]><!-->
<html class="no-js">
<!--<![endif]-->

<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<title> <?=TITLE . ' - ' .  SUBTITLE?> </title>
	<meta name="keywords" content="" />
	<meta name="description" content="<?=TITLE . strip_tags(DESCRIPTION)?>">
	<meta name="robots" content="index, follow" />
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="apple-touch-icon" href="assets/img/ico.png">
	<link rel="stylesheet" href="assets/css/vendor/bootstrap/bootstrap.min.css">
	<link rel="stylesheet" href="assets/css/vendor/bootstrap/bootstrap-theme.min.css">
	<link rel="stylesheet" href="assets/css/vendor/font-awesome.min.css">
	<link rel="stylesheet" href="assets/css/common.css">
	<link rel="stylesheet" href="assets/css/main.css">
	<link rel="stylesheet" href="js/vendor/jquery/flipclock/flipclock.css">

	<script> 
		var PT = {};
		PT.IN_PROD = <?=(int)IN_PROD?>;
	</script>
	<script data-main="js/main" src="js/vendor/require/require.js"></script>
	<script src="js/vendor/modernizr-2.8.3-respond-1.4.2.min.js"></script>
	<link rel="<?=TITLE?>" href="assets/img/ico.png" />
	<link href='https://fonts.googleapis.com/css?family=Open+Sans:400,500,600,700&subset=latin,latin-ext' rel='stylesheet' type='text/css'>
</head>

<body>
<!--[if lt IE 9]>
<p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
<![endif]-->
		<div id="background-image">
				<div id="background-overlay">
				</div>
		</div>
		<header class="container">
		</header>

		<section class="container">
			<div class="row">
				<div class="col-md-5 col-sm-5 col-xs-12 col-md-push-3 text-center " id="js-middle-column">
				</div>
				<div class="clearfix visible-xs-block "></div>
				<div class="col-md-3 col-sm-3 col-xs-12 col-md-pull-5" id="js-left-column">
					<div id="timer-description" class="pt-panel">
						<h1><a href="http://www.poker-timer.dsweb.pl/"><?=TITLE?></a></h1>
						<?=DESCRIPTION?>
					</div>
				
				</div>
				<div class="clearfix visible-xs-block"></div>
				<div class="col-md-4 col-sm-4 col-xs-12 text-center" id="js-right-column">
				</div>
			</div>
		</section>
		<!-- /container -->
		<footer>
		</footer>

		<script>
		if (PT.IN_PROD) {

			(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
			(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
			m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
			})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

			ga('create', 'UA-69653470-4', 'auto');
			ga('send', 'pageview');

		}
		</script>
</body>

</html>
