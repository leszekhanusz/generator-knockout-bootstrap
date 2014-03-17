module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json')
  });

  grunt.loadNpmTasks('grunt-release');

  grunt.registerTask('message', function() {
    grunt.log.writeln("use grunt release:{patch|minor|major}");
  });

  grunt.registerTask('default', ['message']);
};
