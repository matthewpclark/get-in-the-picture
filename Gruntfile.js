module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    uglify: {
      options: {
        banner: '/*1 <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'src/js/<%= pkg.name %>.js',
        dest: 'build/js/<%= pkg.name %>.min.js'
      }
    },

    //build our less files
    less: {
      dev: {
        options: {
          paths: ['build/css'],
        },
        files: {
          "build/css/test.css": "src/less/test.less",
          //"build/css/jumbotron.css": "node_modules/bootstrap/less/jumbotron.less",
        }
      },
    },

    //Lint our source code
    jshint: {
      all: ['Gruntfile.js', 'src/**/*.js']
    },

    lesslint: {
      src: ['src/less/*.less'],
    },

    bootlint: {
      options: {
        stoponerror: true,
      },
      files: ['src/html/*.htm'],
    },

    //move in our html
    copy: {
      html: {
        expand: true,
        cwd: 'src/html',
        src: '*.htm',
        dest: 'build/'
      },

      //move in our bootstrap
      bootstrapMin: {
        expand: true,
        cwd: 'node_modules/bootstrap/dist/',
        src: ['js/*.min.js', 'css/*.min.css', 'fonts/*'],
        dest: 'build/'
      },
    },
  });

  //load uglify
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-lesslint');
  grunt.loadNpmTasks('grunt-bootlint');

  //default task(s)
  grunt.registerTask(
    'default', [
      'jshint',
      'lesslint',
      'bootlint',
      'uglify',
      'less',
      'copy',
    ]);

};
