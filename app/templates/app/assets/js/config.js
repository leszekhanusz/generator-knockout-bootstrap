'use strict';

require.config({
  // make bower_components more sensible
  // expose jquery 
  paths: {
    'bower_components': '../../bower_components',
    'jquery': '../../bower_components/jquery/dist/jquery',<% if(includeSammy) { %>
    'sammy': '../../bower_components/sammy/lib/sammy',<% } %>
    'jquery.bootstrap': '../../bower_components/bootstrap-sass/dist/js/bootstrap'
  },
  shim: {
    'jquery.bootstrap': {
      deps: ['jquery']
    }
  },
  map: {
    '*': {
      'knockout': '../../bower_components/knockout.js/knockout',
      'ko': '../../bower_components/knockout.js/knockout'
    }
  }
});

// Use the debug version of knockout in development only
/* global window:true*/
if (window.knockoutDebug) {
  require.config({
    map: {
      '*': {
        'knockout': '../../bower_components/knockout.js/knockout.debug.js',
        'ko': '../../bower_components/knockout.js/knockout.debug.js'
      }
    }
  });
}

if (!window.requireTestMode) {
  require(['main'], function () { });
}
