define([
	'jquery',
	'underscore',
	'backbone',
	'config',
	'backbone.modelBinder',
	'models/chip',
	'text!templates/timer/chip.html'
], function($, _, Backbone, Config, ModelBinder, Chip, chipTpl) {
	"use strict";

	var ChipView = Backbone.View.extend({

		events: {
			'click .js-remove-chip': 'removeItem',
			'click': 'activeEditing', // !NOTE: clicking on itself
			//'chipFocusEvent': 'deactiveEditing',
			//'blur': 'deactiveEditing'
		},

		tpl: _.template(chipTpl),
		className: 'chip-token',
		model: Chip,

		initialize: function() {

			this.modelBinder = new Backbone.ModelBinder();
			
			this.listenTo(this.model, 'change:colorClass', this.render);
			this.listenTo(this.model, 'change', this.save);

		},

		removeItem: function() {
			var self = this;
			this.$el.fadeOut(300, function(){self.remove()});
			this.model.destroy();
			this.modelBinder.unbind();
			this.undelegateEvents();
			
			this.unbind();
	
		},

		activeEditing: function() {

			if (this.$el.hasClass('zoom') === false) {

				this.$el.addClass('zoom');
				this.$el.find('input').addClass('js-focus');
				this.$el.find('.js-show-on-focus').removeClass('hidden');
			}
		},

		deactiveEditing: function() {

			this.$el.removeClass('zoom');
			this.$el.find('input').removeClass('js-focus');
			this.$el.find('.js-show-on-focus').addClass('hidden');
		},

		save: function() {

			this.model.save();
		},

		render: function() {

			this.changeColor();

			var intConverter = function(direction, value){
			 	if(direction === 'ViewToModel'){
			 		return parseInt(value)
			 	}
			 	else{
			 		return value
			 	}
			};

			var bindings = {
					value: {selector: '[name=value]', converter: intConverter} ,
					colorClass: {selector: '[name=colorClass]'},
					amount: {selector: '[name=amount]', converter: intConverter}
				}; // bindings definition is needed because of intConverter callback

			this.$el.html(this.tpl({'chips_colors': Config.CHIPS_COLORS}));
			this.modelBinder.bind(this.model, this.el, bindings);

			this.$el.removeClass('zoom');

			return this;
		},

		changeColor: function() {

			var previousColor = this.model.previousAttributes().colorClass,
				nextColor = this.model.attributes.colorClass;
			this.$el.removeClass(previousColor);
			this.$el.addClass(nextColor);
		}

	});

	return ChipView;

});
