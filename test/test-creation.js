/*global describe, beforeEach, it */
'use strict';
var path = require('path');
var helpers = require('yeoman-generator').test;

describe('knockout-bootstrap generator', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        return done(err);
      }

      this.app = helpers.createGenerator('knockout-bootstrap:app', [
        '../../app'
      ]);
      done();
    }.bind(this));
  });

  it('creates expected files', function (done) {
    var expected = [
      // add files you expect to exist here.
      '.jshintrc',
      '.editorconfig',
      'Gruntfile.js',
      'bower.json',
      '.bowerrc',
      'package.json',
      '.yo-rc.json',
      'README.md',
      'test/bower.json',
      'test/spec/test.js',
      'app/robots.txt',
      'app/favicon.ico',
      'app/assets/scss/main.scss',
      'app/assets/js/config.js',
      'app/assets/js/main.js',
      'app/jade/index.jade',
      'app/jade/partials/_home.jade',
      'app/jade/partials/_contact.jade',
      'app/jade/partials/_about.jade',
      'app/jade/partials/_bootstrap_layout.jade',
      'app/jade/partials/_leftmenutabs.jade',
      'app/jade/partials/_scripts.jade'
    ];

    helpers.mockPrompt(this.app, {
      'appname': 'some name',
      'appdescription': 'some description',
      'jade': true,
      'sammy': true
    });
    this.app.options['skip-install'] = true;
    this.app.run({}, function () {
      helpers.assertFile(expected);
      done();
    });
  });
});
