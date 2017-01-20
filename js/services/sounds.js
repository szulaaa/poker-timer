define([
	'underscore',
	'config',
], function(_, Config, gameSettings) {
	"use strict";

	var AudioService = function() {

		var audio = {};
		try {
			_.forEach(Config.SOUNDS, function(val, idx) {
				audio[idx] = new Audio(val);
			})

		} catch (err) {
			console.log(err)
		}

		return audio;
	};

	return new AudioService(); // return single instance

});
