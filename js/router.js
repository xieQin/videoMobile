define([
  'jquery',
  'underscore',
  'backbone',
  'views/notice/NoticeView',
  'views/talk/TalkView',
  'views/calendar/CalendarView',
  'views/online/OnlineView',
], function($, _, Backbone, NoticeView, TalkView, CalendarView,OnlineView) {
  
  var AppRouter = Backbone.Router.extend({
    routes: {
      'notice': 'showNotice',
      'talk': 'showTalk',
      'calendar': 'showCalendar',
      'online': 'showOnline',
      '*actions': 'showNotice'
    }
  });
  
  var initialize = function(){

    var app_router = new AppRouter;
    
    app_router.on('route:showNotice', function(){
        var noticeView = new NoticeView();
        noticeView.render();
    });

    app_router.on('route:showTalk', function(){
        var talkView = new TalkView();
        talkView.render();
    });

    app_router.on('route:showCalendar', function(){
        var calendarView = new CalendarView();
        calendarView.render();
    });

    app_router.on('route:showOnline', function(){
        var onlineView = new OnlineView();
        onlineView.render();
    });

    Backbone.history.start();
  };
  return { 
    initialize: initialize
  };
});
