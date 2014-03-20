'use strict';

/* global define:true*/
define(['jquery',
    'knockout'
    ], function ($, ko) {
  return function () {
    var self = this;

    self.state = ko.observable('loading');

    self.connectionMethod = ko.observable('...');

    self.reconnectionDelay = ko.observable(0);

    self.iconCSS = ko.computed(function () {
      switch (self.state()) {
        case 'connect':
          return 'connected';
        case 'reconnecting':
        case 'disconnect':
          return 'reconnecting';
        case 'loading':
          return 'loading';
        default:
          return '';
      }
    });

    self.toString = ko.computed(function () {
      switch (self.state()) {
        case 'connect':
          return '';
        case 'reconnecting':
          return 'reconnecting in ' + self.reconnectionDelay() + ' seconds.';
        case 'disconnect':
          return 'disconnected';
        case 'loading':
          return 'loading...';
        default:
          return '';
      }
    });

    self.title = ko.computed(function () {
      if (self.state() === 'connect') {
        return 'connected with ' + self.connectionMethod();
      } else {
        return self.toString();
      }
    });

    self.setReconnectDelay = function (delay) {
      self.reconnectionDelay(delay);
      if (self.reconnectionInterval) {
        clearInterval(self.reconnectionInterval);
      }
      self.reconnectionInterval = setInterval(function () {
        self.reconnectionDelay(self.reconnectionDelay() - 1);
      }, 1000);
    };
  };
});
