'use strict';

require.config({
  paths: {
    'bower_components': '../../bower_components',
    'jquery': '../../bower_components/jquery/dist/jquery',<% if (includeSammy) { %>
    'sammy': '../../bower_components/sammy/lib/sammy',<% } %><% if (includeSocketIO) { %>
    'socket.io-client': '../../bower_components/socket.io-client/dist/socket.io',<% } %><% if (includeValidation) { %>
    'knockout.validation': '../../bower_components/knockout.validation/Dist/knockout.validation',<% } %>
    'jquery.bootstrap': '../../bower_components/bootstrap-sass/dist/js/bootstrap'
  },
  shim: {
    'jquery.bootstrap': {
      deps: ['jquery']
    }<% if(includeValidation) { %>,
    'knockout.validation': {
      deps: ['knockout']
    }<% } %><% if(includeSocketIO) { %>,
    'socket.io-client': {
      exports: 'io'
    }<% } %>
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
if (window.knockoutBootstrapDebug) {
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
