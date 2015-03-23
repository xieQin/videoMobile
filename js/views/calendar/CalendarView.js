define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/calendar/calendarTemplate.html'
], function($, _, Backbone, calendarTemplate){

  var CalendarView = Backbone.View.extend({
    el: $(".widget-section"),
    render: function(){
      $('.section-bar li').removeClass('section-bar-active');
      $('.section-bar li').addClass('section-bar-li');
      $('.section-bar li a[href="'+window.location.hash+'"]').parent().removeClass('section-bar-li');
      $('.section-bar li a[href="'+window.location.hash+'"]').parent().addClass('section-bar-active');

      this.$el.find('.section-content').html(calendarTemplate);
    }
  });

  return CalendarView;
});

