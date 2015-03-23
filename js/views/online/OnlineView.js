define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/online/onlineTemplate.html'
], function($, _, Backbone, onlineTemplate){

  var OnlineView = Backbone.View.extend({
    el: $(".widget-section"),
    render: function(){
      $('.section-bar li').removeClass('section-bar-active');
      $('.section-bar li').addClass('section-bar-li');
      $('.section-bar li a[href="'+window.location.hash+'"]').parent().removeClass('section-bar-li');
      $('.section-bar li a[href="'+window.location.hash+'"]').parent().addClass('section-bar-active');

      this.$el.find('.section-content').html(onlineTemplate);
    }
  });

  return OnlineView;
});
