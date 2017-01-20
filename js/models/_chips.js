define([
	'underscore',
	'backbone',
	'backbone.localStorage'
], function(_, Backbone) {
	"use strict";
	var Chip = Backbone.Model.extend({

		defaults:  {
				value: 0,
				colorClass: 'default'
			
		}

	});



	var Chips = Backbone.Collection.extend({
		model: Chip,

		localStorage: new Backbone.LocalStorage("chips"),

	});


	return {
		Model: Chip,
		Collection: Chips
	};
});
