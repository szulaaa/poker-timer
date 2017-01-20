define([
	'jquery','underscore','backbone','config',
	'underi18n','i18n!nls/main',
	'views/timer/chipView','collections/chips','models/chip','text!templates/timer/chipList.html'
], function($, _, Backbone, Config, 
	Underi18n, lang, 
	ChipView, Chips, Chip, chipListTpl) {
	"use strict";

	var ChipsListView = Backbone.View.extend({

		events: {
			'click #js-add-chip': 'addDefaultChip',
			'click #js-chips-refresh': 'refreshItems'
		},

		preChips: [
			{ colorClass: 'white', value: 10, amount: 10  },
			{ colorClass: 'red', value: 20, amount: 10 },
			{ colorClass: 'green', value: 40 ,amount: 10},
			{ colorClass: 'blue', value: 100 ,amount: 6},
			{ colorClass: 'black', value: 200 ,amount: 6},
		], 

		//el: $('#js-left-column'),

		tagName: 'div',
		className: 'chips',

		collection: new Chips(),

		
		initialize: function(options) {

			this.initChips();
			
			this.gameSettings = options.gameSettings;

			this.t = Underi18n.MessageFactory(lang);

			this.$el.addClass('pt-panel').attr('data-panel-title', lang.chipListPanelName);
			
			this.listenTo(this.collection, 'add', this.addItem);
			this.listenTo(this.collection, 'reset', this.refreshItems);
			this.listenTo(this.collection, 'destroy change', this.calculateAllChipsValue );

		},

		/**
		 * initializae chips if there is none in local storage
		 */
		initChips: function() {

			this.collection.fetch();

			if (this.collection.length === 0) {
				this.collection = new Chips(this.preChips);
				this.collection.each(function(chip) {
					chip.save();
				}, this);
			}
		},

		/**
		 * Add chip to collection
		 */
		addDefaultChip: function() {

			this.collection.create(new Chip());
		},

		/**
		 * Add chip to the view
		 * @param {model} chip 
		 */
		addItem: function(chip) {

			var view = this.renderItem(chip);
			this.$el.find('#js-chip-list').append(view.$el);
		},


		renderItem: function(chip) {
			
			var chipView = new ChipView({model:chip});
			return chipView.render();

		},

		/**
		 * Calculates value of all chips to set it later in the settings
		 */
		calculateAllChipsValue: function(){

			if(this.gameSettings.get('evaluateChips')) {

				var sumOfChips = null;
				this.collection.each(function(chip) {
					sumOfChips += chip.get('value') * chip.get('amount');
				}, this);
				this.gameSettings.set('chipsPerPlayer', sumOfChips) ;

			}

		},

		/**
		 * Refresh all items in the view, needed fo reorder chips
		 */
		refreshItems: function() {
			var tempHtml = [],
				chipView = {};

			this.collection.sort();
			this.collection.each(function(chip) {
				tempHtml.push( this.renderItem(chip).$el );
			}, this);
	
			this.$el.find('#js-chip-list').html(tempHtml);

			return this;
		},

		render: function() {

			this.$el.html(_.template(Underi18n.template(chipListTpl, this.t)));
			this.refreshItems();
			return this;

		}

	});

	return ChipsListView;

});
