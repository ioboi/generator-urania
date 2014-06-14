// Generated on <%= (new Date).toISOString().split('T')[0] %> using
// <%= pkg.name %> <%= pkg.version %>
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// If you want to recursively match all subfolders, use:
// 'test/spec/**/*.js'

module.exports = function(grunt) {
  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Configurable paths
  var config = {
    app: 'app',
    dist: 'dist'
  };

  // Define the configuration for all the tasks
  grunt.initConfig({
    // Project settings
    config: config,
    watch: {
      gruntfile: {
        files: ['Gruntfile.js']
      },
      jade: {
        files: ['app/jade/*jade'],
        tasks: ['jade'],
      },
      livereload: {
        options: {
          livereload: '<%%= connect.options.livereload %>'
        },
        files: [
          '<%%= config.app %>/{,*/}*.html',
          '.tmp/styles/{,*/}*.css',
          '.tmp/scripts/{,*/}*.js',
          '<%%= config.app %>/images/{,*/}*',
          '.tmp/*.html'
        ]
      },
      stylus: {
        files: [
          'app/stylus/*.styl'
        ],
        tasks: ['stylus']
      },
      coffee: {
        files: [
          'app/coffee/*coffee'
        ],
        tasks: ['coffee:compile']
      }
    },
    jade: {
      compile: {
        options: {
          data: {
            debug: false
          },
          pretty: true
        },
        files: [{
          expand: true, // Enable dynamic expansion.
          cwd: 'app/jade', // Src matches are relative to this path.
          src: ['*.jade'], // Actual pattern(s) to match.
          dest: '.tmp/', // Destination path prefix.
          ext: '.html' // Dest filepaths will have this extension.
        }]
      }
    },
    // The actual grunt server settings
    connect: {
      options: {
        port: 9000,
        open: true,
        livereload: 35729,
        // Change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost'
      },
      livereload: {
        options: {
          middleware: function(connect) {
            return [
              connect.static('.tmp'),
              connect().use('/bower_components', connect.static('./bower_components')),
              connect.static(config.app)
            ];
          }
        }
      },
      test: {
        options: {
          open: false,
          port: 9001,
          middleware: function(connect) {
            return [
              connect.static('.tmp'),
              connect.static('test'),
              connect().use('/bower_components', connect.static('./bower_components')),
              connect.static(config.app)
            ];
          }
        }
      },
      dist: {
        options: {
          base: '<%= config.dist %>',
          livereload: false
        }
      }
    },
    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%%= config.dist %>/*',
            '!<%%= config.dist %>/.git*'
          ]
        }]
      },
      server: '.tmp'
    },
    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%%= config.app %>',
          dest: '<%%= config.dist %>',
          src: [
            '*.{ico,png,txt}',
            '.htaccess',
            'images/{,*/}*.webp',
            '{,*/}*.html',
            'styles/fonts/{,*/}*.*',
          ]
        }, {
          expand: true,
          dot: true,
          cwd: '.tmp/',
          dest: '<%%= config.dist %>',
          src: [
            '*.html',
          ]
        }]
      },
      styles: {
        expand: true,
        dot: true,
        cwd: '<%%= config.app %>/styles',
        dest: '.tmp/styles/',
        src: '{,*/}*.css'
      },
    },
    uglify: {
      dist: {
        options: {
          beautify: false,
          compress: {
            drop_console: true,
            dead_code: true
          }
        },
        files: [{
          expand: true, // Enable dynamic expansion.
          cwd: '.tmp/scripts', // Src matches are relative to this path.
          src: ['*.js'], // Actual pattern(s) to match.
          dest: '<%%= config.dist %>/scripts/', // Destination path prefix.
          ext: '.js' // Dest filepaths will have this extension.
        }]
      }
    },
    // Run some tasks in parallel to speed up build process
    concurrent: {
      server: [
        'copy:styles'
      ],
      test: [
        'copy:styles'
      ],
      dist: [
        'copy:styles',
        'copy:dist'
        //'imagemin',
        //'svgmin'
      ]
    },
    stylus: {
      compile: {
        options: {
          compress: true,
          paths: [
            'node_modules/grunt-contrib-stylus/node_modules',
            "bower_components/normalize-css",
            'node_modules/jeet/stylus',
            'node_modules/rupture'
          ],
          "include css": true
        },
        files: {
          '.tmp/styles/main.css': ['app/stylus/*.styl']
        }
      }
    },
    cssmin: {
      dist: {
        files: {
          '<%%= config.dist %>/styles/main.css': [
            '.tmp/styles/{,*/}*.css',
            '<%%= config.app %>/styles/{,*/}*.css'
          ]
        }
      }
    },
    coffee: {
      compile: {
        files: {
          '.tmp/scripts/main.js': 'app/coffee/main.coffee'
        }
      },
      glob_to_multiple: {
        expand: true,
        flatten: true,
        cwd: 'app/coffee',
        src: ['*.coffee'],
        dest: '.tmp/scripts/',
        ext: '.js'
      }
    },
    htmlmin: {
      dist: {
        options: {
          collapseBooleanAttributes: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true,
          removeCommentsFromCDATA: true,
          removeEmptyAttributes: true,
          removeOptionalTags: true,
          removeRedundantAttributes: true,
          useShortDoctype: true
        },
        files: [{
          expand: true,
          cwd: '<%%= config.dist %>',
          src: '{,*/}*.html',
          dest: '<%%= config.dist %>'
        }]
      }
    },
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%%= config.app %>/images',
          src: '{,*/}*.{gif,jpeg,jpg,png}',
          dest: '<%%= config.dist %>/images'
        }]
      }
    },
    svgmin: {
      options: {
        plugins: [{
          removeViewBox: false
        }, {
          removeUselessStrokeAndFill: false
        }, {
          convertPathData: {
            straightCurves: false
          }
        }]
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%%= config.app %>/images',
          src: ['**/*.svg'],
          dest: '<%%= config.dist %>/images',
          ext: '.svg'
        }]
      }
    }
  });

  grunt.registerTask('serve', function(target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'jade',
      'coffee',
      'stylus',
      'concurrent:server',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('build', [
    'clean:dist',
    'jade',
    'stylus',
    'coffee',
    'concurrent:dist',
    'copy:dist',
    'cssmin',
    'htmlmin',
    'imagemin',
    'svgmin:dist',
    'uglify:dist'
  ]);

  grunt.registerTask('default', [
    'build'
  ]);
}