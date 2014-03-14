'use strict';

/* global define:true*/
define(['jquery',
    'knockout'<% if (includeSammy) { %>,
    '../../../assets/js/models/sammyViewModel.js'<% } %><% if (includeValidation) { %>,
    'knockout.validation'<% } %>
    ], function ($, ko<% if(includeSammy) { %>, SammyViewModel<% } %>) {
  return function () {
    var self = this;
<% if (includeValidation) { %>
    // Configure knockout validation plugin
    // To decorate form-group elements, use the validationElement binding
    ko.validation.configure({
      decorateElement: true,
      errorElementClass: 'has-error',
      errorMessageClass: 'help-block',
      errorsAsTitle: false
    });<% } %>

    // Example observable
    self.status = ko.observable('active');
<% if(includeSammy) { %>
    // Add submodels here
    // Sammy view model for local navigation
    self.sammy = new SammyViewModel();<% } %>
<% if(includeSocketIO) { %> 
    // Socket IO example observables
    self.message = ko.observable('')<% if (includeValidation) { %>.extend({
      required: true,
      minLength: 3
    })<% } %>;
    self.messageReceived = ko.observable('');
    <% } %>
  };
});
