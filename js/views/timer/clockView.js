/*jshint undef: true, esversion: 6, browser: true*/
/*globals   $, _,  console, define*/
define([
	'jquery', 'underscore', 'backbone', 'config', 'flipclock', 'backbone.modelBinder', 'underi18n', 'i18n!nls/main',
	'services/sounds', 'models/clock',
	'views/timer/currentLevelView', 'text!templates/timer/clock.html', 'text!templates/timer/pricePoolValues.html'
], function ($, _, Backbone, Config, FlipClock, ModelBinder, Underi18n, lang,
	Audio, Clock,
	CurrentLevelView, clockTpl, pricePoolValuesTpl) {
	"use strict";

	var ClockView = Backbone.View.extend({

		events: {
			'click .js-clock-start': 'start',
			'click .js-clock-stop': 'stop',
			'click .js-clock-reset': 'reset',
			'click .js-clock-next-level': 'nextLevel',
			'click .js-clock-prev-level': 'prevLevel',
		},

		tpl: _.template(clockTpl),
		className: 'clock-container',

		flipclock: {},

		clock: {},
		level: {}, //current level settings
		levels: {}, // level settings
		gameSettings: {}, // level settings

		t: {},

		initialize: function (options) {

			this.gameSettings = options.gameSettings;

			this.levels = options.levels;
			this.level = this.levels.findWhere({ 'active': true });

			this.clock = new Clock({ id: 1 });
			this.clock.fetch();

			this.modelBinder = new Backbone.ModelBinder();

			if (this.clock.get('levelTime') === 0) {
				this.clock.set('levelTime', this.level.get('duration'));
			}

			if (this.clock.get('levelElipsedTime') === 0) {
				this.clock.set('levelElipsedTime', this.level.get('duration'));
			}
			this.clock.save();
			this.autoSaveTime();

			this.listenTo(this.clock, 'change', this.renderCurrentLevelInfo);

			this.clock.on('change:level', this.togglePrevNextButtons, this);
			this.levels.on('add', this.togglePrevNextButtons, this);

			this.clock.on('change:gameIsRunning', this.toggleGameStateColor, this);
			
			this.listenTo(this.gameSettings, 'change', this.renderPricePoolRewards, this);

			Backbone.on('pt-durationOfActiveLvlChangedEvent', this.updateClockTime, this)
			Backbone.on('pt-levelChangedEvent', this.reRenderCurrentLevelInfo, this)

			this.togglePrevNextButtons();
		},

		/** update flipclock once the value of level has changed */
		updateClockTime: function () {
			if(this.level.get('duration') < 99){
				this.clock.set('levelTime', this.level.get('duration') * 60);
				this.reset();
			}
		},

		/**
		 * rerenders current level info if active or next level data has changed
		 * @param  {[type]} event - should keep information about level which changed
		 */
		reRenderCurrentLevelInfo: function(event) {
			var condition = event.currentLevel !== this.level.get('label') 
						|| event.currentLevel+1 ===  this.level.get('label') + 1;

			(condition) ? this.renderCurrentLevelInfo() : false ;		
		},

		/**
		 * saving a current level time every x seconds
		 */
		autoSaveTime: function () {

			var round = function (number, precision) {
				var factor = Math.pow(10, precision);
				var tempNumber = number * factor;
				var roundedTempNumber = Math.round(tempNumber);
				return roundedTempNumber / factor;
			};

			var time = 10 * 1000, //15 seconds
				self = this;

			setInterval(function () {
				self.clock.set('levelElipsedTime',
					round(self.flipclock.getTime().time / 60, 1)).save();
				//not very nice solution, it makes a sound when one minute remains to finish the round
				if (59 < self.flipclock.time.time && self.flipclock.time.time < 75 && self.gameSettings.get('isSoundsOn')) {
					setTimeout(function () {
						Audio.timeLeftSound.play();
						self.$el.find('[name=levelLabel], .level-info').addClass('blink-me');
					}, (self.flipclock.time.time - 60 + 1) * 1000);

				}
			}, time);
		},

		toggleGameStateColor: function () {

			var element = this.$el.find('[name="levelState"]');
			if (this.clock.get('gameIsRunning'))
				element.addClass('running')
			else
				element.removeClass('running');

		},
		/**
		 * starts Flipclock
		 */
		start: function () {
			if (this.flipclock.running) {
				Backbone.trigger('flashMessageEvent', {
					content: lang.gameAlreadyStarted_msg,
					status: 'info',
					hideTime: 5000
				});
			}

			this.flipclock.start();
			this.toggleActiveLevel();
			if (this.gameSettings.get('isSoundsOn')){
				(this.level.get('isBreak') === true) ? Audio.breakSound.play(): Audio.startSound.play();
			}
		},

		/**
		 * stop Flipclock
		 */
		stop: function () {
			if (this.gameSettings.get('isSoundsOn'))
				Audio.stopSound.play();
			this.flipclock.stop();

		},

		/**
		 * stops the clock and resets the time
		 */
		reset: function () {

			this.flipclock.setTime(this.level.get('duration') * 60);
			this.flipclock.stop(); // cannot stop flipclock before setting new time, only after
			this.$el.find('[name=levelLabel], .level-info').removeClass('blink-me');
			
			if (this.gameSettings.get('isSoundsOn')){
				Audio.resetSound.play();
			}

		},

		/**
		 * acitve/desactive next or prev button, depends on the actions
		 */
		togglePrevNextButtons: function () {
			var currentLevel = parseInt(this.clock.get('level'));

			if (currentLevel === this.levels.length) {
				this.$el.find('.js-clock-next-level').attr('disabled', 'disabled');
			} else if (currentLevel === 1) {
				this.$el.find('.js-clock-prev-level').attr('disabled', 'disabled');
			} else {
				this.$el.find('.js-clock-prev-level').removeAttr('disabled');
				this.$el.find('.js-clock-next-level').removeAttr('disabled');
			}
		},

		/**
		 * Set active level
		 */
		toggleActiveLevel: function () {

			this.levels.findWhere({ 'active': true }).set('active', false);
			this.level.set('active', true);
			this.gameSettings.set('currentLevel', this.level.get('order'));
		},

		/**
		 * Stops the clock, gets new time from previous round and set it
		 */
		prevLevel: function () {

			var prevLevel = parseInt(this.clock.get('level')) - 1;
			this.level = this.levels.findWhere({
				'order': prevLevel
			});

			this.toggleActiveLevel();

			this.reset();

			this.clock.set({
				'level': this.level.get('order'),
				'levelLabel': this.level.get('label'),
				'levelTime': this.level.get('duration'),
				'levelElipsedTime': this.level.get('duration')
			});
			this.clock.save();
		},


		/**
		 * Stops the clock, gets new time from next round and set it
		 */
		nextLevel: function () {
			var nextLevel = parseInt(this.clock.get('level')) + 1;

			if (nextLevel <= this.levels.length) {

				this.level = this.levels.findWhere({
					'order': nextLevel
				});
				this.toggleActiveLevel();
				this.reset();

				this.clock.set({
					'level': this.level.get('order'),
					'levelLabel': this.level.get('label'),
					'levelTime': this.level.get('duration'),
					'levelElipsedTime': this.level.get('duration')
				});
				this.clock.save();

			} else {

				Backbone.trigger('flashMessageEvent', {
					content: lang.noNextLevel_msg,
					status: 'info',
					hideTime: 5000
				});

			}
		},


		/**
		 * Initialize Flipclock at the first run
		 */
		initFlipClock: function () {
			var self = this; // there is no easy way to bind 'this' into  Flipclock
			this.flipclock =
				this.$el.find('.clock').FlipClock(self.clock.get('levelElipsedTime') * 60, {
					clockFace: 'MinuteCounter',
					countdown: true,
					autoStart: self.clock.get('gameIsRunning'),
					callbacks: {

						start: function () {
							self.clock.set('gameIsRunning', true);
							self.clock.save();
						},

						stop: function () {
							if (self.flipclock.getTime().time === 0) {
								self.nextLevel();
								self.start();
							} else {
								self.clock.set('gameIsRunning', false);
							}
						},
					}
				}, this);
			return this;
		},

		renderCurrentLevelInfo: function (event) {

			var next = this.levels.findWhere({
				order: parseInt(this.level.get('order')) + 1
			});

			if(next !== undefined && next.attributes.isBreak === true ) {
				next = this.levels.findWhere({
					order: parseInt(this.level.get('order')) + 2
				});	
			}

			var clv = new CurrentLevelView(this.level, next);

			this.$el.find('#js-cur-level-info').html(clv.render().$el);
		},

		renderPricePoolRewards: function () {

			var tpl = _.template(pricePoolValuesTpl);

			var pricePoolValues = _(this.gameSettings.get('pricePoolRewards')).map(function (val, indx) {
				if (indx === 0) {
					return { 'place': indx + 1, 'suffix': lang.first_suffix, 'value': val, 'color': '#5DDEFA' };
				} else if (indx === 1) {
					return { 'place': indx + 1, 'suffix': lang.second_suffix, 'value': val, 'color': '#59A9D3' };
				} else if (indx === 2) {
					return { 'place': indx + 1, 'suffix': lang.third_suffix, 'value': val, 'color': '#2582BD' };
				} else if (indx === 3) {
					return { 'place': indx + 1, 'suffix': lang.other_suffix, 'value': val, 'color': '#6083C3' };
				} else {
					return { 'place': indx + 1, 'suffix': lang.other_suffix, 'value': val, 'color': '#3188C0' };
				}

			});

			this.$el.find('#price-pool-values').html(tpl({
				'pricePoolValues': pricePoolValues
			}));
		},

		render: function () {
			this.$el.html(this.tpl({lang: lang}));

			this.modelBinder.bind(this.clock, this.el);
			this.initFlipClock();

			this.renderCurrentLevelInfo();
			this.renderPricePoolRewards();
			return this;
		},
	});

	return ClockView;

});
