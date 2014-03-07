'use strict';

/* global define:true*/
define(['jquery',
    'knockout',
    'assets/js/models/appViewModel.js',
    'jquery.bootstrap'
    ], function ($, ko, AppViewModel) {

  var UI = new AppViewModel();

  ko.applyBindings(UI);
});
