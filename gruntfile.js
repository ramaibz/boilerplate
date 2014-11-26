module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    libs_files: {
      css: [
        '../libs/bootstrap/dist/css/bootstrap.css',
        '../libs/font-awesome/css/font-awesome.css'
        //'font-awesome/fonts/*'
      ],
      ext: [
        'font-awesome/fonts/*'
      ],
      js: [
        '../libs/angular/angular.js', 
        '../libs/angular-ui-router/release/angular-ui-router.js',
        '../libs/angular-resource/angular-resource.js',
        '../libs/angular-bootstrap/ui-bootstrap.js'
      ],
      app: [
        'frontend/app.js',
        'frontend/**/routes.js',
        'frontend/**/*.controller.js',
        'frontend/**/directive.js',
        'frontend/**/factory.js',
        'frontend/**/service.js'
      ]
    },
    jshint: {
      options: {
        reporter: require('jshint-stylish'),
        force: true
      },
      dev: ['gruntfile.js', '<%=libs_files.app %>'],
      dist: ['dist/js/*.js']
    },
    uglify: {
      options: {
        mangle: false
      },
      dist: {
        files: {
          'dist/js/ngapp.min.js' : 'dist/js/ngapp.js',
          'dist/js/module.min.js' : 'dist/js/module.js'
        },
      }
    },
    sass: {
      dev: {
        options: {
          style: 'expanded'
        },
        files: [{
          expand: true,
          cwd: 'frontend',
          src: '**/*.scss',
          dest: 'frontend/',
          ext: '.css'
        }]
      }
    },
    imagemin: {
      img: {
        files: [{
          expand: true,
          flatten: true,
          cwd: 'frontend',
          src: ['images/*.{png, jpg, gif}', 'images/**/*.{png, jpg, gif}'],
          dest: 'dist/imgs'
        }]
      }
    },
    autoprefixer: {
      dist: {
        files: {

        }
      }
    },
    concat: {
      libs: {
          src: '<%= libs_files.js %>',
          dest: 'dist/js/module.js'
      },
      app: {
        src: '<%= libs_files.app %>',
        dest: 'dist/js/ngapp.js'
      },
      cssFiles: {
        src: ['frontend/**/*.css'],
        dest: 'dist/css/styles.css'
      },
      vendorFiles: {
        src: '<%= libs_files.css %>',
        dest: 'dist/css/vendor.css'
      }
    },
    cssmin: {
      dist: {
        files: [{
          expand: true,
          flatten: true,
          cwd: 'dist',
          src: ['css/*.css'],
          dest: 'dist/css',
          ext: '.min.css'
        }]
      }
    },
    copy: {
      csslibs: {
        expand: true,
        flatten: true,
        cwd: '../libs',
        src: '<%= libs_files.ext %>',
        dest: 'dist/vendor'
      },
      mainhtml: {
          expand: true,
          flatten: true,
          src: 'frontend/index.html',
          dest: 'dist/'
      },
      htmlFiles: {
        expand: true,
        flatten: true,
        cwd: 'frontend',
        src: ['**/*.html', '!index.html'],
        dest: 'dist/views'
      },
      svgFiles: {
        expand: true,
        flatten: true,
        cwd: 'frontend',
        src: ['images/*.svg', 'images/**/*.svg'],
        dest: 'dist/imgs'
      }
    },
/*    browserify: {
      dist: {
          src: 'dist/js/module.js',
          dest: 'dist/js/module.js',
      }
    },*/
    clean: {
      cssFiles: 'dist/css',
      jsFiles: 'dist/js',
      vendor: 'dist/vendor',
      htmlFiles: ['dist/views', 'dist/index.html'],
      all: 'dist'
    },
    watch: {
      cssFile: {
        files: ['frontend/**/*.scss'],
        tasks: ['clean:cssFiles', 'sass:dev', 'concat:cssFiles', 'concat:vendorFiles', 'cssmin'],
        options: {
          livereload: true
        }
      },
      jsFile: {
        files: ['frontend/app.js', 'frontend/routes/routes.js', 'frontend/**/*.controller.js', 'frontend/**/directive.js', 'frontend/**/factory.js', 'frontend/**/service.js'],
        tasks: ['clean:jsFiles', 'jshint', 'concat'],
        options: {
          livereload: true
        }
      },
      htmlFile: {
        files: ['frontend/index.html', 'frontend/**/*.html'],
        tasks: ['clean:htmlFiles', 'copy:mainhtml', 'copy:htmlFiles'],
        options: {
          livereload: true
        }
      },
      imgFiles: {
        files: ['frontend/images/!*.{png, jpg, gif}', 'frontend/images/**/!*.{png, jpg, gif}'],
        tasks: ['copy:imgFiles'],
      },
      svgFiles: {
        files: ['frontend/images/*.{png, jpg, gif}', 'frontend/images/**/*.{png, jpg, gif}'],
        tasks: ['imagemin']
      }
    },
    nodemon: {
      dev: {
        script: 'server.js'
      }
    },
    concurrent: {
      options: {
        logConcurrentOutput: true
      },
      tasks: ['nodemon', 'watch']
    }
  });


// load grunt plugin from package.json
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-nodemon');

// tasks
  grunt.registerTask('default', ['jshint', 'concurrent']);
  grunt.registerTask('dist', ['clean', 'jshint', 'concat', 'sass', 'copy', 'uglify', 'cssmin', 'imagemin']);
  
};