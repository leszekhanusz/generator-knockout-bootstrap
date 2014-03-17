module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    changelog: {
      options: {
        dest: 'CHANGELOG.md'
      }
    },
    bump: {
      options: {
        commitFiles: ['package.json', 'CHANGELOG.md'],
        pushTo: 'origin'
      }
    }
  });

  grunt.registerTask('howtouse', function() {
    grunt.log.error("use grunt bump-only:{patch|minor} then grunt changelog then grunt bump-commit");
  });

  grunt.registerTask('release', 'Release new version', function (type) {
    if(!type) type = 'patch';
    if (!(type === 'minor' || type === 'patch')) {
      grunt.log.writeln('Use grunt release:patch or grunt release:minor');
      grunt.task.run('howtouse');
      return;
    }

    // The following code does not work because bump-only is async
    //grunt.task.run('bump-only:' + type);
    //grunt.config.set('pkg', grunt.file.readJSON('package.json'));
    //var pkg = grunt.config.get('pkg');
    //grunt.log.writeln('version is ' + pkg.version);
    //grunt.task.run('changelog');
    //grunt.task.run('bump-commit');
  });

  grunt.registerTask('default', ['howtouse']);
};
