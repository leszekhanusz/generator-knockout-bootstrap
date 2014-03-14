'use strict';

/* global io:true*/
/* global define:true*/
define(['socket.io-client'
    ], function () {
  return function (UI) {
    var self = this;

    // saving knockout model
    self.UI = UI;

    var socket = io.connect('http://localhost');

    /* global window:true*/
    // Rewriting emit to add debugging information in console
    if (window.knockoutBootstrapDebug) {
      (function () {
        var $emit = socket.$emit;
        socket.$emit = function () {
          var args = Array.prototype.slice.call(arguments);
          $emit.apply(socket, ['*'].concat(args));
          if (!$emit.apply(socket, arguments)) {
            $emit.apply(socket, ['default'].concat(args));
          }
        };

        var emit = socket.emit;
        socket.emit = function () {
          var args = Array.prototype.slice.call(arguments);
          console.log('==> ', args);
          emit.apply(socket, arguments);
        };

        socket.on('default', function (event, data) {
          console.log('Event not trapped: ' + event + ' - data:' + JSON.stringify(data));
        });

        socket.on('*', function (event, data) {
          console.log('<== ' + event, data);
        });
      })();
    }

    // Events

    socket.on('message', function (data) {
      UI.messageReceived(UI.messageReceived() + data.message + '\n');
    });

    // Actions

    self.sendBroadcastMessage = function () {
      socket.emit('send_message', {message: self.UI.message()});
    };
  };
});
