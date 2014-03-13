'use strict';
var SERVER_PORT = 9000;
var TEST_PORT = 9000;
var LIVERELOAD_PORT = 35729;<% if (includeSocketIO) { %>
// the livereload script is not inserted when running grunt test
// if the TEST_PORT is not 9000. You win a cookie if you find why<% } else { %>
var liveReloadSnippet = require('connect-livereload')({port: LIVERELOAD_PORT});
var mountFolder = function (connect, dir) {
  return connect.static(require('path').resolve(dir));
};<% } %>

module.exports = function (grunt) {

  // load all grunt tasks
  require('load-grunt-tasks')(grunt);

  // configurable paths
  var yeomanConfig = {
    app: '<%= env.options.appPath %>',
    dist: 'dist'
  };

  grunt.initConfig({
    yeoman: yeomanConfig,

    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%%= pkg.name %> - v<%%= pkg.version %> - ' +
      '<%%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%%= grunt.template.today("yyyy") %> <%%= pkg.author.name %>;' +
      ' Licensed <%%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',

    // Task configuration.
    clean: {
      dist: ['dist/*']
    },
    wait: {
      longtime: {
        options: {
          delay: 1000000
        }
      }
    },
    replace: {
      dist: {
        src: '<%%= yeoman.app %>/assets/scss/main.scss',
        overwrite: true,
        replacements: [{
          from: /\$icon\-font\-path:.*/g,
          to: '$icon-font-path: \'../fonts\';'<% if (includeFontAwesome) { %>
        }, {
          from: /\$fa\-font\-path:.*/g,
          to: '$fa-font-path: \'../fonts\';'<% } %>
        }]
      },
      server: {
        src: '<%%= yeoman.app %>/assets/scss/main.scss',
        overwrite: true,
        replacements: [{
          from: /\$icon\-font\-path:.*/g,
          to: '$icon-font-path: \'../../bower_components/bootstrap-sass/fonts\';'<% if (includeFontAwesome) { %>
        }, {
          from: /\$fa\-font\-path:.*/g,
          to: '$fa-font-path: \'../../bower_components/font-awesome/fonts\';'<% } %>
        }]
      }
    },
    copy: {
      html: {
        files: [{
          expand: true,
          cwd: '<%%= yeoman.app %>',
          dest: 'dist',
          src: [
            '*.html'
          ]
        }],
    
        options: {
          process: function (content) {
            // Modify html for production
            return content.replace(
              //change location of require.js in production
              /data-main=\"assets\/js\/config\" src=\"bower_components\/requirejs\/require\.js\"/g,
              'src="assets/js/require.min.js"'
              ).replace(
              //Don't use debug version of knockout.js
              /<script>window\.knockoutDebug = true;<\/script>/g,
              ''
              );
          }
        }
      },
      bootstrap: {
        files: [
          {
            expand: true,
            cwd: '<%%= yeoman.app %>/bower_components/bootstrap-sass/dist/fonts',
            dest: 'dist/assets/fonts',
            src: [
              '*'
            ]
          }
        ]
      },<% if (includeFontAwesome) { %>
      fontawesome: {
        files: [
          {
            expand: true,
            cwd: '<%%= yeoman.app %>/bower_components/font-awesome/fonts',
            dest: 'dist/assets/fonts',
            src: [
              '*'
            ]
          }
        ]
      },<% } %>
      projectfiles: {
        files: [
          {
            expand: true,
            cwd: '<%%= yeoman.app %>',
            dest: 'dist',
            src: [
              'robots.txt',
              'favicon.ico'
            ]
          }
        ]
      }
    },
    compass: {
      options: {
        sassDir: '<%%= yeoman.app %>/assets/scss',
        imagesDir: '<%%= yeoman.app %>/assets/images',
        javascriptDir: '<%%= yeoman.app %>/assets/js',
        fontsDir: '<%%= yeoman.app %>/assets/fonts',
        importPath: '<%%= yeoman.app %>/bower_components',
        relativeAssets: true,
        debugInfo: false
      },
      dist: {
        options: {
          cssDir: 'dist/assets/css',
          noLineComments: true,
          outputStyle: 'compressed'
        }
      },
      server: {
        options: {
          cssDir: '<%%= yeoman.app %>/assets/css'
        }
      }
    },
    concat: {
      options: {
        banner: '<%%= banner %>',
        stripBanners: true
      },
      dist: {
        src: ['<%%= yeoman.app %>/bower_components/requirejs/require.js',
                'dist/assets/js/require.js'],
        dest: 'dist/assets/js/require.js'
      }
    },
    uglify: {
      options: {
        banner: '<%%= banner %>'
      },
      dist: {
        src: 'dist/assets/js/require.js',
        dest: 'dist/assets/js/require.min.js'
      }
    },
    jshint: {
      gruntfile: {
        options: {
          jshintrc: '.jshintrc'
        },
        src: 'Gruntfile.js'
      },
      js: {
        options: {
          jshintrc: '.jshintrc'
        },
        src: ['<%%= yeoman.app %>/assets/js/**/*.js']
      }
    },
    mocha: {
      all: {
        options: {
          run: true,
          urls: ['http://localhost:' + TEST_PORT + '/index.html']
        }
      }
    },
    focus: {
      dev: {
        exclude: ['test']
      },
      test: {
        include: ['test']
      }
    },
    watch: {
      options: {
        livereload: LIVERELOAD_PORT
      },
      gruntfile: {
        files: '<%%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      js: {
        files: '<%%= jshint.js.src %>',
        tasks: ['jshint:js']
      },
      css: {
        files: '<%%= yeoman.app %>/assets/css/*.css'
      },
      html: {
        files: '<%%= yeoman.app %>/*.html'
      },<% if (includeJade) { %>
      jade: {
        files: '<%%= yeoman.app %>/jade/**/*.jade',
        tasks: ['jade']
      },<% } %>
      compass: {
        files: '<%%= yeoman.app %>/assets/scss/*.scss',
        tasks: ['compass:server']
      },
      test: {
        options: {
          livereload: LIVERELOAD_PORT
        },
        files: ['<%%= yeoman.app %>/assets/js/{,*/}/*.js', 'test/spec/{,*/}/*.js'],
        tasks: ['test:true']
      }
    },<% if (includeJade) { %>
    jade: {
      html: {
        files: [{
          expand: true,
          cwd: '<%%= yeoman.app %>/jade',
          src: ['{,*/}*.jade', '!**/_*'],
          dest: '<%%= yeoman.app %>',
          ext: '.html'
        }],
        options: {
          client: false,
          pretty: true,
          basedir: '<%%= yeoman.app %>/jade'
        }
      }
    },<% } %>
    requirejs: {
      compile: {
        options: {
          name: 'config',
          mainConfigFile: '<%%= yeoman.app %>/assets/js/config.js',
          out: 'dist/assets/js/require.js',
          optimize: 'none'
        }
      }
    },<% if(!includeSocketIO) { %>
    connect: {
      options: {
        port: SERVER_PORT,
        // change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost'
      },
      livereload: {
        options: {
          middleware: function (connect) {
            return [
              liveReloadSnippet,
              mountFolder(connect, yeomanConfig.app)
            ];
          },
          livereload: true
        }
      },
      production: {
        options: {
          base: 'dist'
        }
      },
      test: {
        options: {
          port: TEST_PORT,
          middleware: function (connect) {
            return [
              liveReloadSnippet,
              mountFolder(connect, 'test'),
              mountFolder(connect, yeomanConfig.app)
            ];
          }
        }
      }
    },<% } %>
    open: {
      server: {
        path: 'http://localhost:' + SERVER_PORT
      },
      test: {
        path: 'http://localhost:' + TEST_PORT
      }
    }<% if (includeSocketIO) { %>,
    express: {
      /* jshint camelcase: false */
      options: {
        port: SERVER_PORT,
        script: 'server/server.js'
      },
      server: {
        options: {
          debug: true,
          node_env: 'development'
        }
      },
      dist: {
        options: {
          debug: false,
          node_env: 'production'
        }
      },
      test: {
        options: {
          port: TEST_PORT,
          debug: true,
          node_env: 'test'
        }
      }
    }<% } %>
  });

  grunt.registerTask('build', [
    'clean:dist',
    'replace:dist',
    'compass:dist',<% if (includeJade) { %>
    'jade:html',<% } %>
    'requirejs',
    'concat',
    'copy',
    'uglify'
  ]);
  
  grunt.registerTask('default', [
    'jshint',
    'build'
  ]);

  grunt.registerTask('serve', function (target) {
    if (target === 'dist') {
      return grunt.task.run([
        'jshint',
        'build',<% if (includeSocketIO) { %>
        'express:dist',<% } else { %>
        'connect:production',<% } %>
        'open:server',
        'wait:longtime'
      ]);
    }

    grunt.task.run([
      'replace:server',
      'compass:server',<% if (includeSocketIO) { %>
      'express:server',<% } else { %>
      'connect:livereload',<% } %>
      'open:server',
      'focus:dev'
    ]);
  });

  grunt.registerTask('test', function (isConnected) {
    // isConnected is true when started from watch
    isConnected = Boolean(isConnected);
    var testTasks = [
      'clean',
      'replace:server',
      'compass',<% if (includeSocketIO) { %>
      'express:test',<% } else { %>
      'connect:test',<% } %>
      'mocha',
      'open:test',
      'focus:test'
    ];

    if (isConnected) {
      // already connected so not going to connect again, remove the connect:test task
      testTasks.splice(testTasks.indexOf('open:test'), 1);<% if (includeSocketIO) { %>
      testTasks.splice(testTasks.indexOf('express:test'), 1);<% } else { %>
      testTasks.splice(testTasks.indexOf('connect:test'), 1);<% } %>
    }

    return grunt.task.run(testTasks);
  });
};
