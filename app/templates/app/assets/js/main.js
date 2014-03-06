'use strict';

// to depend on a bower installed component:
// define(['bower_component/componentName/file'])

/* global define:true*/
define(['jquery',
    'knockout',<% if(includeSammy) { %>
    'sammy',<% } %>
    'jquery.bootstrap'
    ], function ($, ko<% if(includeSammy) { %>, Sammy<% } %>) {
  function AppViewModel() {
    var self = this;

    self.status = ko.observable('active');

    <% if(includeSammy) { %>
    self.chosenFolderId = ko.observable();

    self.goToFolder = function (folder) { self.chosenFolderId(folder); };

    self.sammy = new Sammy(function () {
      this.get('#:folder', function () {
        self.chosenFolderId(this.params.folder);
      });

      this.get('', function () {
        this.app.runRoute('get', '#home');
      });
    });

    self.sammy.run();
    <% } %>

  }

  var UI = new AppViewModel();
  ko.applyBindings(UI);

});
