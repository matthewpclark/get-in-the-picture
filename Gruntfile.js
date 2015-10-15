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
          "build/css/main.css": "src/less/*.less",
          //"build/css/jumbotron.css": "node_modules/bootstrap/less/jumbotron.less",
        }
      },
    },

  //   //build and lint our less
  //   recess: {
  //       build: {
  //         options: {
  //           compile: true
  //         },
  //         files: {
  //           'build/css/main.css': 'build-stage0/less/*.less',
  //           'build/css/bootstrap.min.css': 'build-stage0/less/bootstrap/*.less',
  //         },
  //       },
  //   },
  //
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

      assets: {
        expand: true,
        cwd: 'src/assets',
        src: '**',
        dest: 'build/assets',
      },

      // //move in our bootstrap
      bootstrapMin: {
        expand: true,
        cwd: 'node_modules/bootstrap/dist/',
        src: ['js/*.min.js', 'fonts/*'],
        dest: 'build/'
      },

      //move in jcarousel
      jcarouselMin: {
        expand: true,
        cwd: 'node_modules/jcarousel/dist/',
        src: 'jquery.jcarousel.min.js',
        dest: 'build/js/',
      }
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
