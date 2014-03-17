module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    changelog: {
      options: {
        dest: 'CHANGELOG.md'
      }
    },
    release: {
      options: {
        tagName: 'v<%= version %>'
      }
    }
  });

  grunt.registerTask('message', function() {
    grunt.log.writeln("use grunt release:{patch|minor|major}");
  });

  grunt.registerTask('default', ['message']);
};
