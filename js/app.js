
define([
	'jquery',
	'underscore',
	'backbone',
	'router',
	'config'
], function($, _, Backbone, Router, Config) {
	"use strict";
	var initialize = function() {

		var router = new Router();

		Backbone.history.start({
			pushState: false,
			root: Config.BASE_PATH
		});

		
	};

	return {
		initialize: initialize
	};
});
