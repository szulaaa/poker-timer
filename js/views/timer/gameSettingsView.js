define([

	'jquery', 'underscore','backbone','config','backbone.modelBinder','underi18n',
	'i18n!nls/main','models/gameSettings','text!templates/timer/gameSettings.html'

], function($, _, Backbone, Config, ModelBinder, Underi18n, 
			lang, GameSettings, gameSettingTpl) {
	"use strict";

	var GameSettingsView = Backbone.View.extend({

		className: 'gameSettings',

		t: {}, //Underi18n

		model: {},

		initialize: function(options) {
			this.modelBinder = new Backbone.ModelBinder();
			this.model = options.model;

			this.listenTo(this.model, 'change', this.save);
			
			this.t = Underi18n.MessageFactory(lang);

			this.setBackground();

			this.model.on('change:backgroundGradient',  this.setBackground, this);
			this.model.on('change:language',  this.languageRestartInfo, this);
			this.model.on('change:evaluateChips',  this.evaluateChipsInfo, this);
		}, 

		evaluateChipsInfo: function(){
			Backbone.trigger('flashMessageEvent', 
				{
					content: lang.evaluateChips_msg, 
					status: 'info', 
					hideTime: 5000
				}
			);
		}, 

		removeSettings: function() {
			this.remove();
		},

		save: function() {
			this.model.save();
		},

		languageRestartInfo: function(){
			Backbone.trigger('flashMessageEvent', 
				{
					content: lang.languageChangeInfo_msg, 
					status: 'info', 
					hideTime: 5000
				}
			);
		},

		setBackground:function(){
		
			$('#background-image')
				.css('background-image', 'url('+this.model.get('backgroundOnline')+')')
				.find('#background-overlay')
				.attr('class', this.model.get('backgroundGradient'));

		},

		render: function() {

			this.$el.html(_.template(Underi18n.template(gameSettingTpl, this.t)));
			this.modelBinder.bind(this.model, this.el);

			// hiding other settnigs at init time
			this.$('[data-pt-toggle="#js-other-settings"]').click();
		
			return this;
		}

	});

	return GameSettingsView;

});