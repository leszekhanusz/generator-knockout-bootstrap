'use strict';

/* global define:true*/
define(['jquery',
    'knockout',
    'sammy'
    ], function ($, ko, Sammy) {
  return function () {
    var self = this;

    self.chosenFolderId = ko.observable();

    self.goToFolder = function (folder) { self.chosenFolderId(folder); };

    self._sammy = new Sammy(function () {
      this.get('#:folder', function () {
        self.chosenFolderId(this.params.folder);
      });

      this.get('', function () {
        this.app.runRoute('get', '#home');
      });
    });

    self._sammy.run();
  };
});
