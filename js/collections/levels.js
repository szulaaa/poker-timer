
define([
  'jquery',
  'underscore',
  'backbone',
  'backbone.localStorage',
  'config',
  'models/level'

], function($, _, Backbone, LocalStorage,  Config, Level){
   "use strict"; 

  var Levels = Backbone.Collection.extend({
    model: Level,

    localStorage: new LocalStorage("pt-levels"),

  });

  return Levels;
});