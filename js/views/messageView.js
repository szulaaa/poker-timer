define([
	'backbone',
	'text!templates/common/message.html'
], function(Backbone,messageTpl) {
	"use strict";

	var MessageView = Backbone.View.extend({

		events: {
		},

		tpl: _.template(messageTpl),

		className: 'msg',

		message: {
			content: '', 
			state: 'success',
			hideTime: 8000
		},

		initialize: function() {

			Backbone.on('flashMessageEvent', this.render, this);
			this.$el.appendTo('body');
		},


		render: function(msg){
			this.message = msg || this.message; 

			var self = this;
			this.$el.html( this.tpl(this.message) ).show(300);
			setTimeout( function() {
				self.$el.hide(1000);
			}, this.message.hideTime)
		}

	});

	return MessageView;

});
