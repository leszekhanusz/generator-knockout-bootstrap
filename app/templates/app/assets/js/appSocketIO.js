'use strict';

/* global io:true*/
/* global alert:true*/
/* global define:true*/
define(['socket.io-client'
    ], function () {
  return function (UI) {
    var self = this;

    // saving knockout model
    self.UI = UI;

    var socket = io.connect('http://localhost');

    console.log('connection');

    socket.on('pong', function () {
      console.log('pong');
      alert('pong');
    });
  };
});
