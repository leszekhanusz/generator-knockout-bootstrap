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
