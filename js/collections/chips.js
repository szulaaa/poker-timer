define([
	'jquery',
	'underscore',
	'backbone',
	'backbone.localStorage',
	'config',
	'models/chip'

], function($, _, Backbone, LocalStorage, Config, Chip) {
	"use strict";

	var Chips = Backbone.Collection.extend({
		model: Chip,
		sort_key: 'value', // default sort key 
		localStorage: new LocalStorage("pt-chips"),

		comparator: function(a, b) {
			// Assuming that the sort_key values can be compared with '>' and '<',
			// modifying this to account for extra processing on the sort_key model
			// attributes is fairly straight forward.
			a = a.get(this.sort_key);
			b = b.get(this.sort_key);
			return a > b ? 1 : a < b ? -1 : 0;
		}
	});

	return Chips;
});
