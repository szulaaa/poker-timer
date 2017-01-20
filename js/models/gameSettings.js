define([
	'underscore',
	'backbone',
	'backbone.localStorage'
], function(_, Backbone) {
	"use strict";
	var GameSettings = Backbone.Model.extend({

		defaults: {
			id: 1,
			totalPlayers: 6,
			remainPlayers: 6,
			totalChips: 15000,
			avarageStack: 2500,
			chipsPerPlayer: 2500,
			buyInValue: 30,
			reBuy: 0,
			addOn: 0,
			pricePool: 180,
			pricePoolProportions: "60:30:10",
			pricePoolRewards: [130, 60, 20],
			gameStartedAt: null,
			currentLevel: 1,
			evaluateChipsPerPlayer: true,
			isSoundsOn: true,
			backgroundOnline: 'http://images.huffingtonpost.com/2016-11-13-1478999415-5685205-poker.jpg',
			backgroundGradient: 'gradient-red-blue', 
			language: 'en-en'
		},


		localStorage: new Backbone.LocalStorage("pt-gameSettings"),

		initialize: function() {

			this.on(
				'change:remainPlayers change:totalPlayers change:chipsPerPlayer change:reBuy change:addOn',
				this.setAvarageStack
			);

			this.on(
				'change:totalPlayers  change:chipsPerPlayer change:reBuy change:addOn',
				this.setTotalChips
			);

			this.on(
				'change:totalPlayers  change:chipsPerPlayer change:reBuy change:addOn change:buyInValue',
				this.setPricePool
			);

			this.on(
				'change:pricePoolProportions change:pricePool',
				this.estimatePricePool
			);

		},


		_sumOfAllBuyIns: function() {
			return (this.get('totalPlayers') * 1 + this.get('reBuy') * 1 + this.get('addOn') * 1);
		},

		setTotalChips: function() {

			var value = this._sumOfAllBuyIns() * this.get('chipsPerPlayer');
			this.set('totalChips', value);
			return this;
		},

		setPricePool: function() {

			var value = this._sumOfAllBuyIns() * this.get('buyInValue');
			this.set('pricePool', value);
			return this;
		},

		setAvarageStack: function() {

			var value = Math.round(
				this._sumOfAllBuyIns() *
				this.get('chipsPerPlayer') /
				this.get('remainPlayers')
			);
			this.set('avarageStack', value);
			return this;
		},



		getPricePoolProportion: function() {
			var egDelimeters = [';', ','];
			var proportions = this.get('pricePoolProportions');
			proportions = proportions.replace(/[&;,]/g, ':').replace(/[:;,]$/, '');
			if (proportions) {
				return proportions.split(':').map(Number);
			} else {
				return null;
			}
		},

		estimatePricePool: function() {
			var price = this.get('pricePool'),
				proportions = this.getPricePoolProportion();

			var values = [],
				rests = [],
				checkSum = null,
				newPrice = null,
				missingProportion = null, // sum of proportions should equal 100, if not the difference is assign to this variable 
				modulo = 5;

			_.each(proportions, function(div, indx) {
				values[indx] = price * div / 100;
				rests[indx] = values[indx] % modulo;
				checkSum += div;
			});

			if (checkSum !== 100) {
				missingProportion = checkSum - 100;
			}

			_.each(values, function(value, indx) {
				_.each(rests, function(rest) {
					if (rest !== 0) {
						if ((value - rest) % modulo === 0) {
							values[indx] = (value - rest);
						} else if ((value + rest) % modulo === 0) {
							values[indx] = (value + rest);
						}

					}
				});
			});
			_.each(values, function(val) {
				newPrice += val;
			});

			values[0] += price - newPrice;
			this.set('pricePoolRewards', values);
		},


	});




	return GameSettings;
});
