'use strict';

module.exports = function(grunt) {

  require('time-grunt')(grunt);

  grunt.initConfig({

    folders: {
      src: ['src'],
      dev: ['dev'],
      build: ['build']
    },

    copy: {
      dev: {
        cwd: '<%= folders.src %>/',
        src: ['{images,fonts,js}/**/*', 'bower_components/**/*.js'],
        dest: '<%= folders.dev %>/',
        expand: true
      },
      build: {
        cwd: '<%= folders.src %>/',
        src: ['{images,fonts,js}/**/*'],
        dest: '<%= folders.build %>/',
        expand: true
      },
    },

    clean: {
      dev: '<%= folders.dev %>/*',
      build: '<%= folders.build %>/*',
      tmp: '.tmp/*',
      sass: '.sass-cache/*',
      all: [
        '<%= folders.dev %>/*',
        '<%= folders.build %>/*',
        '.tmp/*',
        '.sass-cache/*'
      ]
    },

    useminPrepare: {
      html: '<%= folders.build %>/**/*.html',
      options: {
        dest: '<%= folders.build %>/'
      }
    },

    concat: {
      scripts: {
        src: '<%= folders.build %>/js/**/*.js',
        dest: '<%= folders.build %>/js/scripts.min.js'
      }
    },

    uglify: {
      build: {
        src: '<%= folders.build %>/js/scripts.min.js',
        dest: '<%= folders.build %>/js/scripts.min.js'
      }
    },

    usemin: {
      html: '<%= folders.build %>/**/*.html'
    },

    sass: {
      dev: {
        options: {
          style: 'compact',
          compass: false
        },
        files: [{
          '<%= folders.dev %>/css/vendor.css': '<%= folders.src %>/sass/vendor.scss'
        }, {
          '<%= folders.dev %>/css/styles.css': '<%= folders.src %>/sass/main.scss'
        }]
      },
      build: {
        options: {
          style: 'expanded',
          compass: false
        },
        files: [{
          '<%= folders.build %>/css/vendor.css': '<%= folders.src %>/sass/vendor.scss'
        }, {
          '<%= folders.build %>/css/styles.css': '<%= folders.src %>/sass/main.scss'
        }]

      }
    },

    cssmin: {
      build: {
        options: {
          sourceMap: true
        },
        files: [{
          expand: true,
          cwd: '<%= folders.build %>/',
          src: ['css/**/*.css'],
          dest: '<%= folders.build %>/',
          ext: '.min.css'
        }]
      }
    },

    watch: {
      sass: {
        files: ['<%= folders.src %>/sass/**/*.{scss,sass}'],
        tasks: ['sass:dev'],
        options: {
          livereload: true
        }
      },
      hbs: {
        files: ['<%= folders.src %>/templates/**/*.hbs'],
        tasks: ['assemble:dev'],
        options: {
          livereload: true
        }
      },
      assets: {
        files: '<%= folders.src %>/{images,fonts,js}/**/*',
        tasks: ['copy:dev'],
        options: {
          livereload: true
        }
      }
    },

    connect: {
      server: {
        options: {
          port: 9999,
          base: '<%= folders.dev %>',
          hostname: '0.0.0.0',
          livereload: 35729,
          open: {
            target: 'http://localhost:9999'
          }
        }
      }
    },

    htmlmin: {
      build: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: {
          '<%= folders.build %>/index.html': '<%= folders.build %>/index.html'
        }
      }
    },

    assemble: {
      options: {
        flatten: false,
        layout: '<%= folders.src %>/templates/layouts/default.hbs',
        layoutdir: '<%= folders.src %>/templates/layouts',
        partials: '<%= folders.src %>/templates/partials/*.hbs'
      },
      dev: {
        options: {
          // layout: 'default.hbs'
          layout: false
        },
        files: [{
          expand: true,
          cwd: '<%= folders.src %>/templates/pages/',
          src: '**/*.hbs',
          dest: '<%= folders.dev %>/'
        }]
      },
      build: {
        options: {
          // layout: 'default.hbs'
          layout: false
        },
        files: [{
          expand: true,
          cwd: '<%= folders.src %>/templates/pages/',
          src: '**/*.hbs',
          dest: '<%= folders.build %>/'
        }]
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-usemin');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-assemble');

  grunt.registerTask('dev', [
    'clean:dev',
    'clean:tmp',
    'assemble:dev',
    'copy:dev',
    'sass:dev',
    'connect',
    'watch'
  ]);

  grunt.registerTask('build', [
    'clean:build',
    'assemble:build',
    'copy:build',
    'sass:build',
    'useminPrepare',
    'cssmin:build',
    'concat',
    'uglify',
    'usemin',
    'htmlmin'
  ]);

};
