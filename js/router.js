define([
	'jquery','underscore','backbone','config','vendor/marked',
	'models/gameSettings','collections/levels','underi18n','i18n!nls/main', 'text!../about.md',
	'views/headerView','views/footerView', 'views/messageView', 'views/timer/chipView','views/timer/chipListView',
	'views/timer/gameSettingsView','views/timer/clockView','views/timer/levelTableView', 'views/cookieView',
	'bootstrap', 'vendor/jquery/jquery-toggle-panel',

], function(
	$, _, Backbone, Config, Marked,
	GameSettings, Levels,Underi18n, lang, AboutText,
	HeaderView, FooterView, MessageView, ChipView, ChipListView, 
	GameSettingsView, ClockView, LevelTableView, CookieView
	) {
	"use strict"; 
	var AppRouter = Backbone.Router.extend({

		routes: {
			'about': 'about',
			'*actions': 'pokerTimer',
		},

		initialize: function() {

			var headerView = new HeaderView();
			var footerView = new FooterView();
			var messageView = new MessageView();
			headerView.render();
			footerView.render();

		},
 
		pokerTimer: function() {

			var levels = new Levels();
				levels.fetch();
			var levelTableView = new LevelTableView({collection: levels});

			var gameSettings = new GameSettings({id: 1});
				gameSettings.fetch();
			var gameSettingsView = new GameSettingsView({model: gameSettings});
			
			var chipListView = new ChipListView({gameSettings: gameSettings});

			var clockView = new ClockView({gameSettings: gameSettings, levels: levels});

			var desc  = $('#timer-description').attr('data-panel-title', lang.applicationPanelName);
		
			if(lang.pokerTimerDescription !== '' && lang.pokerTimerDescription !== undefined){
				desc.html(lang.pokerTimerDescription)

			}

			var cookieInfo = new CookieView(lang.cookieInfo);

			$('#js-left-column')
				.html('')
				.append( chipListView.render().$el )
				.append( desc )
				.append(  cookieInfo.$el  );

			$('#js-middle-column')
				.html('') 
				.append( clockView.render().$el )
				.append( levelTableView.render().$el );

			$('#js-right-column')
				.html( gameSettingsView.render().$el );


			var closeElement = '<i class="fa toggle-panel-button" data-placement="bottom" \
								 data-toggle="tooltip" title="Show/hide panel"></i>';
			$('.pt-panel').togglePanel({
				closeElement: closeElement,
				iconShow: 'fa-plus',
				iconHide: 'fa-times'
			});

			$('[data-toggle="tooltip"]').tooltip();

		},

		about: function() {

			  $( "#js-middle-column" ).html('<div class="about-desc">' + Marked(AboutText) + '</div>' );
	
		}



	});

	return AppRouter;

});
