define([
	'backbone',
], function(Backbone, messageTpl) {
	"use strict";

	var CookieView = Backbone.View.extend({

		events: {
			'click a ': 'close'
		},

		tpl: _.template('<%=info%> <a>Close this information</a>'),

		tagName: 'div',
		id: 'cookie-info',
		info: "",

		initialize: function(option) {
			this.info = option;
			var alreadyShown = localStorage.getItem("pt-cookieInfoAlreadyShown");
			if (alreadyShown === null && alreadyShown !== true) {
				return this.render();
			} else {

				this.$el.hide();
			}
		},

		close: function() {
			localStorage.setItem("pt-cookieInfoAlreadyShown", true);
			this.undelegateEvents();
			this.remove();
		},


		render: function() {

			this.$el.html(this.tpl({ info: this.info }));
			return this;
		}

	});

	return CookieView;

});
