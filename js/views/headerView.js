define([
  'jquery',
  'underscore',
  'backbone',
  'config',
  'text!templates/body/header.html'
], function($, _, Backbone,   Config, headerTpl){
   "use strict"; 
  var HeaderView = Backbone.View.extend({

    el: $('header'),

    initialize: function(){
 

    },

    render: function(){

      var data = {pageName:  Config.APP_NAME};

      var tpl = _.template( headerTpl );
      this.$el.append( tpl( data) );
    }
  });

  return HeaderView;
});