define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/talk/talkTemplate.html'
], function($, _, Backbone, talkTemplate){

  var TalkView = Backbone.View.extend({
    el: $(".widget-section"),

    initialize:function() {

      var that = this;
    },

    render: function(){
      $('.section-bar li').removeClass('section-bar-active');
      $('.section-bar li').addClass('section-bar-li');
      $('.section-bar li a[href="'+window.location.hash+'"]').parent().removeClass('section-bar-li');
      $('.section-bar li a[href="'+window.location.hash+'"]').parent().addClass('section-bar-active');

      this.$el.find('.section-content').html(talkTemplate);
    },

    test: function() {
      return 2;
    }
  });

  return TalkView;
});
