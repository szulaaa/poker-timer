define([
	'underscore',
], function(_) {
	"use strict";

	var config = {
		DEBUG: true,
		//BASE_PATH: '/dropbox/poker-timer/',
		BASE_PATH: '/',
		COOKIE_INFO: 'COOKIE INFO: Poker Timer uses Local Storage (no Cookies) to store ONLY game information data. If you continue without changing your settings, we\'ll assume that you are aware of this fact. ',
		CHIPS_COLORS: {
			"default": "default",
			"white": "white",
			"red": "red",
			"orange": "orange",
			"green": "green",
			"blue": "blue",
			"black": "black",
			"purpure": "purpure",
			"yellow": "yellow"
		}, 

		SOUNDS: {
			breakSound : 'http://www.soundjay.com/button/beep-30b.mp3',
			startSound : 'http://www.soundjay.com/button/button-46.mp3',
			stopSound : 'http://www.soundjay.com/button/button-30.mp3',
			resetSound : 'http://www.soundjay.com/button/button-50.mp3',
			timeLeftSound :'http://www.soundjay.com/button/button-42.mp3'
		}

	};


	if (!config.DEBUG) {
		if (!window.console) {
			window.console = {}
		}
		var methods = ["log", "debug", "warn", "info"];
		for (var i = 0; i < methods.length; i++) {
			console[methods[i]] = function() {};
		}
	}

	return config;

});
