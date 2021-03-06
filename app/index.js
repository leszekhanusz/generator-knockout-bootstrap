'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var rimraf = require('rimraf');

var KnockoutBootstrapSammyGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = yeoman.file.readJSON(path.join(__dirname, '../package.json'));

    this.env.options.appPath = this.options.appPath || 'app';
    this.config.set('appPath', this.env.options.appPath);

    this.config.defaults({
      includeJade: this.includeJade,
      includeSammy: this.includeSammy,
      includeFontAwesome: this.includeFontAwesome
    });
  
    this.on('end', function () {
      if(typeof this.endDone === 'undefined') {
        this.installDependencies({
          skipInstall: this.options['skip-install'],
          callback: function () {
            this.emit('dependenciesInstalled');
          }.bind(this)
        });
      }
      this.endDone = true;
    });

    this.on('dependenciesInstalled', function() {
      // generate html from jade
      this.spawnCommand('grunt', ['jade'])
        .on('exit', function () {
          this._bowerTestInstall();
          if(this.removeJadeAfterInstall) {
            // Now setting includeJade as false
            // deleting jade files and regenerating
            // Gruntfile.js and package.json
            this.includeJade = false;
            console.log('\nNow deleting jade files and regenerating Gruntfile.js and package.json\n');
            this._rm('Gruntfile.js');
            this._rm('package.json');
            this._rm('app/jade');
            this._rm('node_modules/grunt-contrib-jade');
            this.template('Gruntfile.js');
            this.template('_package.json', 'package.json');
          }
      }.bind(this));
    });
  },

  _rm: function(path) {
    var done = this.async();
    var self = this;

    rimraf(path, function () {
      self.log.info('Removing ' + path);
      done();
    });
  },

  _bowerTestInstall: function() {
    console.log('bower test install');
    //process.chdir('./test/');
    this.spawnCommand('bower', ['install', '--config.cwd=test', '--config.directory=bower_components'])
      .on('exit', function () {
        this._endMessage();
    }.bind(this));
  },

  _endMessage: function () {
    console.log(''); //empty line
    console.log("run " + chalk.blue.bold("'grunt serve'") + " to serve development version with live-reload");
    console.log("run " + chalk.blue("'grunt serve:dist'") + " to serve production version (uglified -- no live-reload)");
    console.log("run " + chalk.blue("'grunt'") + " to build the app");
    console.log("run " + chalk.blue("'grunt test'") + " to test the app");
  },

  askFor: function () {
    var done = this.async();

    // have Yeoman greet the user
    console.log(this.yeoman);
    console.log(chalk.magenta('Knockout + Bootstrap Yeoman generator.'));

    var prompts = [{
      name: 'appname',
      message: 'What is the name of your app?',
      default: this.appname
    }, {
      type: 'confirm',
      name: 'jade',
      message: 'Would you like to use the jade templating engine (http://jade-lang.com) ?',
      default: true
    }, {
      type: 'confirm',
      name: 'sammy',
      message: 'Would you like to use sammy.js for local routing (http://sammyjs.org) ?',
      default: true
    }, {
      type: 'confirm',
      name: 'fontAwesome',
      message: 'Would you like to use the font-awesome icons (http://fortawesome.github.io/Font-Awesome) ?',
      default: true
    }, {
      type: 'confirm',
      name: 'socketIO',
      message: 'Would you like to use the socket.io library (http://socket.io) ?',
      default: true
    }, {
      type: 'confirm',
      name: 'validation',
      message: 'Would you like to use the knockout.validation library ?',
      default: true
    }, {
      type: 'confirm',
      name: 'bootbox',
      message: 'Would you like to use the bootbox library (http://bootboxjs.com) ?',
      default: true
    }, {
      type: 'confirm',
      name: 'notify',
      message: 'Would you like to use the notify.js library (http://notifyjs.com) ?',
      default: true
    }];

    this.prompt(prompts, function (answers) {
      this.appname = answers.appname;
      
      // Include jade in all case (needed to generate the html
      // with all the necessary options).
      // Jade is removed after install if not requested
      this.includeJade = true;
      this.removeJadeAfterInstall = !answers.jade

      this.includeSammy = answers.sammy;
      this.includeFontAwesome = answers.fontAwesome;
      this.includeSocketIO = answers.socketIO;
      this.includeValidation = answers.validation;
      this.includeBootbox = answers.bootbox;
      this.includeNotify = answers.notify;

      if (!this.options.includeJade) {
        // See comment above, here the real includeJade is saved
        this.options.includeJade = answers.jade;
        this.config.set('includeJade', answers.jade);
      }

      if (!this.options.includeSammy) {
        this.options.includeSammy = this.includeSammy;
        this.config.set('includeSammy', this.includeSammy);
      }

      if (!this.options.includeFontAwesome) {
        this.options.includeFontAwesome = this.includeFontAwesome;
        this.config.set('includeFontAwesome', this.includeFontAwesome);
      }

      if (!this.options.includeSocketIO) {
        this.options.includeSocketIO = this.includeSocketIO;
        this.config.set('includeSocketIO', this.includeSocketIO);
      }

      if (!this.options.includeValidation) {
        this.options.includeValidation = this.includeValidation;
        this.config.set('includeValidation', this.includeValidation);
      }

      if (!this.options.includeBootbox) {
        this.options.includeBootbox = this.includeBootbox;
        this.config.set('includeBootbox', this.includeBootbox);
      }

      if (!this.options.includeNotify) {
        this.options.includeNotify = this.includeNotify;
        this.config.set('includeNotify', this.includeNotify);
      }

      done();
    }.bind(this));
  },

  askForWidget: function () {
    if(this.includeSocketIO) {
      var done = this.async();

      var prompts = [{
        type: 'confirm',
        name: 'connectionWidget',
        message: 'Do you want a widget indicating the status of the socket.io connection in the menu bar?',
        default: true
      }];

      this.prompt(prompts, function (answers) {
        this.includeConnectionWidget = answers.connectionWidget;

        if (!this.options.includeConnectionWidget) {
          this.options.includeConnectionWidget = this.includeConnectionWidget;
          this.config.set('includeConnectionWidget', this.includeConnectionWidget);
        }

        done();
      }.bind(this));
    } else {
      this.includeConnectionWidget = false;
      if (!this.options.includeConnectionWidget) {
        this.options.includeConnectionWidget = false;
        this.config.set('includeConnectionWidget', false);
      }
    }
  },

  app: function () {
    this.mkdir(this.env.options.appPath);
    this.mkdir(this.env.options.appPath + '/assets');
    this.mkdir(this.env.options.appPath + '/assets/js');
    this.mkdir(this.env.options.appPath + '/assets/js/models');
    this.mkdir(this.env.options.appPath + '/assets/css');
    this.mkdir(this.env.options.appPath + '/assets/scss');
    this.mkdir(this.env.options.appPath + '/assets/images');
    this.mkdir(this.env.options.appPath + '/assets/fonts');
    this.mkdir(this.env.options.appPath + '/jade');
    this.mkdir(this.env.options.appPath + '/jade/partials');
    this.mkdir('test');
    this.mkdir('test/spec');

    this.copy('app/favicon.ico', this.env.options.appPath + '/favicon.ico');
    this.copy('app/robots.txt', this.env.options.appPath + '/robots.txt');
    this.template('app/assets/scss/main.scss', this.env.options.appPath + '/assets/scss/main.scss');
    this.template('app/assets/scss/_app.scss', this.env.options.appPath + '/assets/scss/_app.scss');
    this.copy('app/assets/js/config.js', this.env.options.appPath + '/assets/js/config.js');
    this.template('app/assets/js/main.js', this.env.options.appPath + '/assets/js/main.js');
    this.template('app/assets/js/models/appViewModel.js', this.env.options.appPath + '/assets/js/models/appViewModel.js');
    this.template('app/jade/index.jade', this.env.options.appPath + '/jade/index.jade');
    this.template('app/jade/partials/_bootstrap_layout.jade', this.env.options.appPath + '/jade/partials/_bootstrap_layout.jade');
    this.template('app/jade/partials/_home.jade', this.env.options.appPath + '/jade/partials/_home.jade');
    this.copy('app/jade/partials/_scripts.jade', this.env.options.appPath + '/jade/partials/_scripts.jade');
    this.template('app/jade/partials/_leftmenutabs.jade', this.env.options.appPath + '/jade/partials/_leftmenutabs.jade');

    if (this.includeSocketIO) {
      this.template('app/assets/js/appSocketIO.js', this.env.options.appPath + '/assets/js/appSocketIO.js');
      this.mkdir('server');
      this.template('server/server.js');
      this.template('app/jade/partials/_socketio_example.jade', this.env.options.appPath + '/jade/partials/_socketio_example.jade');
    }

    if(this.includeConnectionWidget) {
      this.template('app/jade/partials/_rightmenutabs.jade', this.env.options.appPath + '/jade/partials/_rightmenutabs.jade');
      this.template('app/assets/js/models/connectionViewModel.js', this.env.options.appPath + '/assets/js/models/connectionViewModel.js');
      this.copy('app/assets/scss/_connection.scss', this.env.options.appPath + '/assets/scss/_connection.scss');
    }

    this.copy('test/index.html');
    this.copy('test/bower.json');
    this.copy('test/bowerrc', 'test/.bowerrc');
    this.copy('test/spec/test.js');

    if (this.includeSammy) {
      this.template('app/assets/js/models/sammyViewModel.js', this.env.options.appPath + '/assets/js/models/sammyViewModel.js');
      this.copy('app/jade/partials/_about.jade', this.env.options.appPath + '/jade/partials/_about.jade');
      this.copy('app/jade/partials/_contact.jade', this.env.options.appPath + '/jade/partials/_contact.jade');
    }
  },

  projectfiles: function () {
    this.template('Gruntfile.js', 'Gruntfile.js');
    this.template('_package.json', 'package.json');
    this.template('README.md', 'README.md');
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
  },

  bower: function() {
    this.template('bowerrc', '.bowerrc');
    this.template('_bower.json', 'bower.json');
  }
});

module.exports = KnockoutBootstrapSammyGenerator;
