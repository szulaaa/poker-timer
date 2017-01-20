define([
	'underscore',
	'backbone',
], function(_, Backbone) {
	"use strict";
	var Chip = Backbone.Model.extend({

		defaults: {
			id: null,
			value: 0,
			colorClass: 'default',
			amount: 0

		}

	});



	return Chip;
});
