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
        src: ['{images,fonts,js}/**/*', 'bower_components/**/*.js', 'manifest.json'],
        dest: '<%= folders.dev %>/',
        expand: true
      },
      build: {
        cwd: '<%= folders.src %>/',
        src: ['{images,fonts,js}/**/*', 'bower_components/**/*.js', 'manifest.json'],
        dest: '<%= folders.build %>/',
        expand: true
      },
      webapp: {
        expand: true,
        src: ['manifest.json'],
        dest: '<%= folders.build %>/',
        filter: 'isFile'
      }
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
      ],
      buildCleanBower: '<%= folders.build %>/bower_components/'
    },

    useminPrepare: {
      html: '<%= folders.build %>/**/*.html',
      options: {
        dest: '<%= folders.build %>/'
      }
    },

    concat: {
      lostd20: {
        src: [
          '<%= folders.build %>/js/*.js'
        ],
        dest: '<%= folders.build %>/js/lostd20.js'
      },
      vendor: {
        src: [
          '<%= folders.build %>/bower_components/smooth-scroll/dist/js/smooth-scroll.min.js'
        ],
        dest: '<%= folders.build %>/js/vendor.min.js'
      }
    },

    uglify: {
      build: {
        src: '<%= folders.build %>/js/lostd20.js',
        dest: '<%= folders.build %>/js/lostd20.min.js'
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
          '<%= folders.dev %>/css/lostd20.css': '<%= folders.src %>/sass/lostd20.scss'
        }]
      },
      build: {
        options: {
          style: 'compact',
          compass: false
        },
        files: [{
          '<%= folders.build %>/css/vendor.css': '<%= folders.src %>/sass/vendor.scss'
        }, {
          '<%= folders.build %>/css/lostd20.css': '<%= folders.src %>/sass/lostd20.scss'
        }]
      }
    },

    autoprefixer: {
      options: {
        browsers: ['last 5 versions']
      },
      dev: {
        files: {
          '<%= folders.dev %>/css/lostd20.css': '<%= folders.dev %>/css/lostd20.css'
        }
      },
      build: {
        files: {
          '<%= folders.build %>/css/lostd20.css': '<%= folders.build %>/css/lostd20.css'
        }
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
        files: ['<%= folders.src %>/hbs/**/*.hbs'],
        tasks: ['assemble:dev'],
        options: {
          livereload: true
        }
      },
      assets: {
        files: ['<%= folders.src %>/{images,fonts,js}/**/*', '<%= folders.src %>/manifest.json'],
        tasks: ['copy:dev'],
        options: {
          livereload: true
        }
      }
    },

    connect: {
      dev: {
        options: {
          port: 9000,
          base: '<%= folders.dev %>',
          hostname: '0.0.0.0',
          livereload: 35729,
          open: {
            target: 'http://0.0.0.0:9000'
          }
        }
      },
      build: {
        options: {
          port: 9001,
          base: '<%= folders.build %>',
          hostname: 'localhost',
          livereload: 35729,
          open: {
            target: 'http://localhost:9001'
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
        layout: '<%= folders.src %>/hbs/layouts/default.hbs',
        layoutdir: '<%= folders.src %>/hbs/layouts',
        partials: '<%= folders.src %>/hbs/partials/**/*.hbs'
      },
      dev: {
        options: {
          // layout: 'default.hbs'
          layout: false
        },
        files: [{
          expand: true,
          cwd: '<%= folders.src %>/hbs/pages/',
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
          cwd: '<%= folders.src %>/hbs/pages/',
          src: '**/*.hbs',
          dest: '<%= folders.build %>/'
        }]
      }
    },

    'sw-precache': {
      options: {
        baseDir: '<%= folders.build %>/',
        stripPrefix: 'build/',
        cacheId: 'aS',
        workerFileName: 'service-worker.js',
        verbose: false,
      },
      'default': {
        staticFileGlobs: [
          '**/*.html',
          '**/*.json',
          'css/**/*.css',
          'fonts/**/*.{woff,ttf,svg,eot,woff,woff2}',
          'images/**/*.{gif,png,jpg}',
          'js/**/*.js'
        ],
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
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-sw-precache');

  grunt.registerTask('dev', [
    'clean:dev',
    'clean:tmp',
    'assemble:dev',
    'copy:dev',
    'sass:dev',
    'autoprefixer:dev',
    'connect:dev',
    'watch'
  ]);

  grunt.registerTask('aslive', [
    'connect:build',
    'watch'
  ]);

  grunt.registerTask('sw', [
    'sw-precache:default'
  ]);

  grunt.registerTask('build', [
    'clean:build',
    'clean:tmp',
    'assemble:build',
    'copy:build',
    'copy:webapp',
    'sass:build',
    'autoprefixer:build',
    'cssmin:build',
    'useminPrepare',
    'concat',
    'uglify:build',
    'usemin',
    'clean:buildCleanBower',
    'htmlmin',
    'sw-precache:default'
  ]);

};
