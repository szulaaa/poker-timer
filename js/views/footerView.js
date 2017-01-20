define([
	'jquery',
	'underscore',
	'backbone',
	'config',
	'text!templates/body/footer.html'
], function ($, _, Backbone, Config, headerTpl) {
	"use strict";
	var FooterView = Backbone.View.extend({

		el: $('footer'),

		initialize: function () {


		},

		render: function () {
			// Using Underscore we can compile our template with data
			var data = { stopka: 'www.poker-timer.dsweb.pl' };


			var tpl = _.template(headerTpl);
			// Append our compiled template to this Views "el"
			this.$el.append(tpl(data));
		}
	});

	return FooterView;
});
