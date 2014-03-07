'use strict';

/* global define:true*/
define(['jquery',
    'knockout'<% if(includeSammy) { %>,
    'assets/js/models/sammyViewModel.js'<% } %>
    ], function ($, ko<% if(includeSammy) { %>, SammyViewModel<% } %>) {
  return function () {
    var self = this;

    // Example observable
    self.status = ko.observable('active');
    <% if(includeSammy) { %>
    // Add submodels here
    // Sammy view model for local navigation
    self.sammy = new SammyViewModel();
    <% } %>
  };
});
