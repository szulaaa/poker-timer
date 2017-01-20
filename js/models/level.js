define([
	'underscore',
	'backbone', 
	'i18n!nls/main'
], function(_, Backbone, lang) {
	"use strict";
	var Level = Backbone.Model.extend({

		defaults: {
			id          : null,
			order       : 1,
			label       : 1,
			smallBlind  : 1,
			bigBlind    : 2,
			ante        : '-',
			duration    : 20,
			elipsedTime : 0,
			state       : '',
			active      : false,
			isBreak     : false
		}, 

		remove: function(){
			if(this.get('active') !== true) {
				this.destroy();
			} else {
				Backbone.trigger('flashMessageEvent', 
					{
						content: lang.cannotRemoveActiveLevel_msg, 
						status: 'danger', 
						hideTime: 5000
					}
				);
			}
		}

	});



	return Level;
});
