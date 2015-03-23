require.config({
  paths: {
    modernizr: 'libs/modernizr/modernizr-2.8.3.min',
    jquery: 'libs/jquery/jquery-min',
    underscore: 'libs/underscore/underscore-min',
    backbone: 'libs/backbone/backbone-min',
    gssdk: 'libs/gssdk/gssdk',
    gsvideo: 'libs/gssdk/video',
    templates: '../templates'
  }
});

require([
  'app',
], function(App){
  App.initialize();
});