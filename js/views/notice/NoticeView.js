define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/notice/noticeTemplate.html'
], function($, _, Backbone, noticeTemplate){

  var NoticeView = Backbone.View.extend({
    el: $(".widget-section"),
    render: function(){
      $('.section-bar li').removeClass('section-bar-active');
      $('.section-bar li').addClass('section-bar-li');
      if(window.location.hash === "") {
      	$('.section-bar li a').eq(0).parent().removeClass('section-bar-li');
        $('.section-bar li a').eq(0).parent().addClass('section-bar-active');
      }
      $('.section-bar li a[href="'+window.location.hash+'"]').parent().removeClass('section-bar-li');
      $('.section-bar li a[href="'+window.location.hash+'"]').parent().addClass('section-bar-active');

      this.$el.find('.section-content').html(noticeTemplate);
    }
  });

  return NoticeView;
});
