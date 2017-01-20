define([
	'jquery',
	'underscore',
	'backbone',
	'config',
	'backbone.modelBinder',
	'models/level',
	'text!templates/timer/level.html'
], function($, _, Backbone, Config, ModelBinder, Level, levelTpl) {
	"use strict";

	var levelView = Backbone.View.extend({

		events: {
			'click .js-delete': 'removeItem'
		},

		tpl: _.template(levelTpl),
		className: 'level-row',
		tagName: 'tr',
		model: Level,

		initialize: function() {
			this.modelBinder = new Backbone.ModelBinder();

			this.listenTo(this.model, 'destroy', this.destroy);
			this.listenTo(this.model, 'change', this.save);
			this.listenTo(this.model, 'change', this.toggleActive);

			this.model.on('change:duration', this.triggerLevelChangedMsg, this);

			this.toggleActive();
			this.render();
		},

		triggerLevelChangedMsg: function() {

			if (this.model.get('duration') > 99) {
				// resets 
				this.model.set('duration', 99);
				Backbone.trigger('flashMessageEvent', {
					content: 'Sorry, maximum duration time is 99',
					status: 'danger',
					hideTime: 5000
				});
				this.render();

			} else if (this.model.get('active') === true) {

				Backbone.trigger('pt-durationOfActiveLvlChangedEvent');

			}
		},

		destroy: function() {

			this.modelBinder.unbind();
			this.undelegateEvents();
			this.unbind();
			this.remove();
		},

		removeItem: function() {
			this.model.remove();
		},


		toggleActive: function() {
			if (this.model.get('active') === true) {
				this.$el.addClass('active');
			} else {
				this.$el.removeClass('active');
			}
		},

		save: function() {
			this.model.save();
			Backbone.trigger('pt-levelChangedEvent', { 'currentLevel': this.model.get('label') });
		},

		render: function() {
			this.$el.html( this.tpl(this.model.attributes) );
			this.modelBinder.bind( this.model, this.el );

			return this;
		},



	});

	return levelView;

});
