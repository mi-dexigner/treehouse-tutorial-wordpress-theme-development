module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['src/**/*.js'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    curl: {
    'google-fonts-source': {
        src: 'https://www.googleapis.com/webfonts/v1/webfonts?key=*******',
        dest: 'assets/vendor/google-fonts-source.json'
    }
},
devUpdate: {
        main: {
            options: {
                updateType: 'report', //just report outdated packages
                reportUpdated: false, //don't report up-to-date packages
                semver: true, //stay within semver when updating
                packages: {
                    devDependencies: true, //only check for devDependencies
                    dependencies: false
                },
                packageJson: null, //use matchdep default findup to locate package.json
                reportOnlyPkgs: [] //use updateType action on all packages
            }
        }
    },
    uglify: {
    dist: {
        options: {
            banner: '/*! <%= pkg.name %> <%= pkg.version %> filename.min.js <%= grunt.template.today("yyyy-mm-dd h:MM:ss TT") %> */\n',
            report: 'gzip'
        },
        files: {
            'assets/js/filename.min.js' : [
                'assets/path/to/file.js',
                'assets/path/to/another/file.js',
                'assets/dynamic/paths/**/*.js'
            ]
        }
    },
    dev: {
        options: {
            banner: '/*! <%= pkg.name %> <%= pkg.version %> filename.js <%= grunt.template.today("yyyy-mm-dd h:MM:ss TT") %> */\n',
            beautify: true,
            compress: false,
            mangle: false
        },
        files: {
            'assets/js/filename.js' : [
                'assets/path/to/file.js',
                'assets/path/to/another/file.js',
                'assets/dynamic/paths/**/*.js'
            ]
        }
    }
},
sass: {
    dist: {
        options: {
            banner: '/*! <%= pkg.name %> <%= pkg.version %> filename.min.css <%= grunt.template.today("yyyy-mm-dd h:MM:ss TT") %> */\n',
            style: 'compressed'
        },
        files: [{
            expand: true,
            cwd: 'assets/scss',
            src: [
                '*.scss'
            ],
            dest: 'assets/css',
            ext: '.min.css'
        }]
    },
    dev: {
        options: {
            banner: '/*! <%= pkg.name %> <%= pkg.version %> filename.css <%= grunt.template.today("yyyy-mm-dd h:MM:ss TT") %> */\n',
            style: 'expanded'
        },
        files: [{
            expand: true,
            cwd: 'assets/scss',
            src: [
                '*.scss'
            ],
            dest: 'assets/css',
            ext: '.css'
        }]
    }
},
    qunit: {
      files: ['test/**/*.html']
    },
    jshint: {
    files: [
        'Gruntfile.js',
        'assets/js/filename.js',
        'assets/dynamic/paths/**/*.js'
    ],
    options: {
        expr: true,
        globals: {
            jQuery: true,
            console: true,
            module: true,
            document: true
        }
    }
},
copy: {
    dist: {
        src: 'readme.txt',
        dest: 'README.md'
    }
},
    makepot: {
    target: {
        options: {
            include: [
                'path/to/some/file.php'
            ],
            type: 'wp-theme' // or `wp-plugin`
        }
    }
},
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint', 'qunit']
    },
zip: {
    // We accept short syntax
    // 'destinationZip': ['firstFileToZip', 'secondFileToZip', ...]
    'acme.zip': ['index.html', 'rocket.js'],

    // As well as standard grunt sytax
    widgets: {
      // Files to zip together
      src: ['corkscrew.js', 'sillyStraw.js'],

      // Destination of zip file
      dest: 'widgets.zip'
    },

    // Specify working directory to zip from via `cwd`
    'more-widgets': {
      cwd: 'nested/'
      // Files will zip to 'corkscrew.js' and 'sillyStraw.js'
      src: ['nested/corkscrew.js', 'nested/sillyStraw.js'],
      dest: 'moreWidgets.zip'
    },

    // Adjust file paths via `router` for complex cases
    site: {
      // `router` receives the path from grunt (e.g. js/main.js)
      // The path it returns is what the file contents are saved as (e.g. all/main.js)
      // This CANNOT be used with `cwd` since there are potential ordering issues.
      router: function (filepath) {
        // Route each file to all/{{filename}}
        var filename = path.basename(filepath);
        return 'all/' + filename;
      }

      // Files will zip to 'main.js' and 'main.css'
      src: ['js/main.js', 'css/main.css'],
      dest: 'site.zip'
    },

    // If you want to use the 'DEFLATE' compression algorithm, encode data in base64, or include dotfiles, you must opt-in to it
    'even-more-widgets': {
      src: ['corkscrew.js', 'sillyStraw.js'],
      dest: 'evenMoreWidgets.zip',

      // Setting for DEFLATE compression
      compression: 'DEFLATE',

      // Setting for base64 encoding
      base64: true,

      // Setting to include dotfiles (e.g. .travis.yml)
      dot: true
    },

    // Skip/exclude files via `router`
    zipJsOnly: {
      // If router returns a falsy varaible, the file will be skipped
      router: function (filepath) {
        // Grab the extension
        var extname = path.extname(filepath);

        // If the file is a .js, add it to the zip
        if (extname === '.js') {
          return filepath;
        } else {
        // Otherwise, skip it
          return null;
        }
      }

      src: ['js/main.js', 'css/main.css'],
      dest: 'jsOnly.zip'
    }
  },
'unzip': {
    // Short syntax
    // 'folderToExtractFilesTo': 'zipFileToExtract'
    gallery: 'photos.zip',

    // Long syntax
    catalog: {
      src: 'electronics.zip',
      dest: 'catalog'
    }

    // Note: If you provide multiple src files, they will all be extracted to the same folder.
    // This is not well-tested behavior so use at your own risk.

    // Adjust file paths of zipped files via `router`
    site: {
      // `router` receives the path that was used during zipping (e.g. css/bootstrap.css)
      // The path it returns is where the file contents will be written to (e.g. dist/bootstrap.css)
      router: function (filepath) {
        // Route each file to dist/{{filename}}
        var filename = path.basename(filepath);
        return 'dist/' + filename;
      }

      // Collects all nested files in same directory
      // css/bootstrap.css -> bootstrap.css, js/bootstrap.js -> bootstrap.js
      src: 'bootstrap.zip',
      dest: 'bootstrap/'
    },

    // If you want to disable the CRC32 check or decode data from base64, you must opt-in to it
    'unzip-more': {
      src: 'bootstrap.zip',
      dest: 'public',

      // Setting for disabling the CRC32 check
      checkCRC32: false,

      // Setting for decoding from base64
      base64: true
    },

    // Skip/exclude files via `router`
    unzipCssOnly: {
      // If router returns a falsy varaible, the file will be skipped
      router: function (filepath) {
        // Grab the extension
        var extname = path.extname(filepath);

        // If the file is a .css, extract it
        if (extname === '.css') {
          return filepath;
        } else {
        // Otherwise, skip it
          return null;
        }
      }

      src: ['bootstrap.css'],
      dest: 'bootstrap-css/'
    }
  }

  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks( 'grunt-wp-i18n' );
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-curl');
  grunt.loadNpmTasks('grunt-zip');

  grunt.registerTask('test', ['jshint', 'qunit']);

  grunt.registerTask('default', ['jshint', 'qunit', 'concat', 'uglify']);

};

