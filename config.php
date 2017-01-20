<?php

if($_SERVER['HTTP_HOST'] === 'poker-timer.dsweb.pl' or $_SERVER['HTTP_HOST'] === 'www.poker-timer.dsweb.pl')
	define('IN_PROD', true);
else
	define('IN_PROD', false);	

error_reporting(E_ALL & ~E_STRICT & ~E_NOTICE & ~E_WARNING );  

if(IN_PROD)
	ini_set('display_errors', FALSE);
else
	ini_set('display_errors', TRUE); 

define('TITLE', 'Poker-Timer');
define('SUBTITLE', 'Web Application');
define('DESCRIPTION', ' is a web-based application designed for playing <strong>poker tournament</strong> games. Its main goal is to provide players with a ready-to-use, compact interface and simple configuration. Read more about <a href="#about" title="Poker-timer - Web application" style="color: #C1C1C1">poker-timer</a>.');
define('KEYWORDS', 'poker, timer, holdem, texas, web, application, online');