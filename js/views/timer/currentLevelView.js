define([
	'jquery',
	'underscore',
	'backbone',
	'models/level',
	'collections/levels',
	'i18n!nls/main',
	'text!templates/timer/currentLevelInfo.html'

], function($, _, Backbone,   Level, Levels, 
			lang, curLevelTpl) {
	"use strict";

	var currentLevelView = Backbone.View.extend({


		className: 'current-level-info',

		model: Level,

		tpl: _.template(curLevelTpl),

		initialize: function(model, next) {
			this.model = model || new Level({ id: 1 });

			this.next = (next != undefined) ? next : new Level({smallBlind: '-', bigBlind: '-'}) ;
		},

		render: function() {
			var tplArgs = {current: this.model.toJSON(), next: this.next.toJSON(), lang: lang};

			this.$el.html(this.tpl(tplArgs));
			return this;
		},



	});

	return currentLevelView;

});

