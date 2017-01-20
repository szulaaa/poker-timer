var vendorPath = '../js/vendor/';

var gameSettings = JSON.parse(localStorage.getItem("pt-gameSettings-1"));

var lang = (gameSettings === undefined || gameSettings === null) ? 'en-en' : gameSettings.language;
require.config({

	locale: lang,
	urlArgs: PT.IN_PROD ? '' : "bust=" + (new Date()).getTime(), // TURN OFF this on PROD to allow browser caching
	shim: {

		"bootstrap": ["jquery"],
		"backbone": {
			deps: ['underscore', 'jquery'],
			exports: 'Backbone'
		},

		'underscore': {
			exports: '_',
			init: function () {
				this._.templateSettings = {
					translate: /<%_([\s\S]+?)%>/g,
					i18nVarLeftDel: '<%=',
					i18nVarRightDel: '%>'
				};
				return _;
			}
		},


		'backbone.localStorage': {
			deps: ['backbone'],
			exports: 'Backbone'
		},
		'backbone.modelBinder': {
			deps: ['backbone', 'underscore', 'jquery'],
			exports: 'Backbone'
		},

		flipclock: ["jquery"]


	},
	paths: {
		i18n: vendorPath + "require/i18n",
		text: vendorPath + "require/text",
		jquery: vendorPath + 'jquery/jquery-3.1.1.min',
		jqueryUI: vendorPath + 'jquery/jquery-ui.min.js',
		flipclock: vendorPath + 'jquery/flipclock/flipclock.min',
		underscore: vendorPath + 'underscore/underscore',
		backbone: vendorPath + 'backbone/backbone',
		bootstrap: vendorPath + 'bootstrap/bootstrap.min',
		config: '../js/config',
		'backbone.modelBinder': vendorPath + 'backbone/Backbone.ModelBinder.min',
		'backbone.localStorage': vendorPath + 'backbone/backbone.localStorage-min',
		'underi18n': vendorPath + 'underi18n/underi18n',
	}

});

require([
	'app',
], function (App) {

	App.initialize();

});
