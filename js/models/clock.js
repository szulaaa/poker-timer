define([
	'underscore',
	'backbone',
	'backbone.localStorage',
	'i18n!nls/main'

], function(_, Backbone, BLS, lang ) {
	"use strict";
	var Clock = Backbone.Model.extend({

		localStorage: new Backbone.LocalStorage("pt-clock"),
		defaults: {

			level            : 1,
			levelLabel       : 1,
			levelTime        : 0,//twenty minutes
			levelElipsedTime : 0,//twenty minutes
			gameIsRunning    : false,
			levelState       : lang.clockStopped,
		},

		initialize: function () {
			this.on(
				'change:gameIsRunning',
				this.changeLevelState
			);
		},

		changeLevelState: function(){

			(this.get('gameIsRunning')) 
				? this.set('levelState', lang.clockRunning)
				: this.set('levelState', lang.clockStopped);
			
		}

	});



	return Clock;
});
