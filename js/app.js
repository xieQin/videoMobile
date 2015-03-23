define([
  'jquery', 
  'underscore', 
  'backbone',
  'router',
  'gssdk',
  'gsvideo'
], function($, _, Backbone, Router){
  var initialize = function(){
    Router.initialize();
  };

  return { 
    initialize: initialize
  };
});
