define([

'jquery','underscore','backbone',
'config','underi18n','i18n!nls/main',
'views/timer/levelView','collections/levels','models/level','text!templates/timer/levelTable.html'

], function(
		$, _, Backbone, 
		Config, Underi18n,lang,  
		LevelView, Levels, Level, levelTableTpl
) {
"use strict";

var LevelsTableView = Backbone.View.extend({

	events: {
		'click .js-add': 'addDefaultLevel',
		'click .js-remove': 'removeLastLevel',
		'click .js-hide': 'toggleTable',
		'click .js-addBreakLevel': 'addBreakLevel',
	},

	tagName: 'table',
	className: 'level-table',

	t: {}, //Underi18n


	collection: new Levels(),

	initialize: function(options) {

		this.collection = options.collection;
		if (this.collection.length === 0) {

			this.collection.create({});

		}
		this.$el.addClass('pt-panel').attr('data-panel-title', lang.levelTablePanelName);
		this.listenTo(this.collection, 'destroy', this.reorderItems);
		this.listenTo(this.collection, 'add', this.addItem);

		this.t = Underi18n.MessageFactory(lang);

		if (this.collection.findWhere({ 'active': true }) === undefined) {

			this.collection
				.findWhere({ 'order': 1 })
				.set('active', true)
				.save();
		}
	},


	toggleTable: function() {

		this.$el.toggle();

	},


	addDefaultLevel: function() {

		var levels = this.collection.where({'isBreak': false});

		var last = levels.pop();

		this.collection.create(new Level({
			label: last.get('label') + 1,
			order: this.collection.length + 1,
			smallBlind: last.get('bigBlind'),
			bigBlind: last.get('bigBlind') * 2
		}));

		$('html,body').animate({ scrollTop: 9999 }, 'slow');

	},	

	addBreakLevel: function() {	

		var last = this.collection.where({'isBreak': false}).pop();	

		this.collection.create(new Level({
			label: 'break',
			order: this.collection.length + 1,
			smallBlind: 0,
			bigBlind: 0, 
			duration: 5, 
			isBreak: true
		}));

	},

	/**
	 * Adds the item into Level HTML table
	 * @param {Model} Level 
	 */
	addItem: function(Level) {

		var view = this.renderItem(Level);
		this.$el.find('tbody').append(view.$el);

	},

	/**
	 * Removes last level
	 */
	removeLastLevel: function() {
		
		this.collection.last().remove();
		
	},

	/**
	 * Reorder the models giving new number order  if one of 
	 * level is removed from the middle thus we avoid having gap in numbering
	 * @param  {Backbone Model} child   
	 */
	reorderItems: function(model) {

		var removedLevel = model.attributes.order,
			collectionLen = this.collection.length,
			item, breaks = 0;

		for (var i = removedLevel + 1; i <= collectionLen+1; i++) {

			item = this.collection.findWhere({ order: i });
			item.set('order', i - 1);

			if(item.attributes.isBreak=== false && model.attributes.isBreak === false){
				
				item.set('label', item.attributes.label - 1);
				
			} else {
				breaks++;
			}

		}

		this.collection
	},


	renderItem: function(Level) {

		var levelView = new LevelView({ model: Level });
		return levelView.render();

	},

	refreshItems: function() {

		var tempHtml = [];

		this.collection.each(function(Level) {

			tempHtml.push(this.renderItem(Level).$el);

		}, this);

		this.$el.html(_.template(Underi18n.template(levelTableTpl, this.t)));
		this.$el.find('tbody').append(tempHtml);

		return this;
	},

	render: function() {

		this.refreshItems();
		return this;
	}

});

return LevelsTableView;

});
