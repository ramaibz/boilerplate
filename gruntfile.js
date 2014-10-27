module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
<<<<<<< HEAD
    libs_files: {
      css: [
        'bootstrap/dist/css/bootstrap.min.css',
        'font-awesome/css/font-awesome.min.css',
        'font-awesome/fonts/*'
      ],
      js: [
        '../libs/angular/angular.js', 
        '../libs/angular-ui-router/release/angular-ui-router.js',
        '../libs/angular-resource/angular-resource.js',
        '../libs/jquery/dist/jquery.js',
        '../libs/bootstrap/dist/js/bootstrap.js'
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
=======
    jshint: {
      options: {
        reporter: require('jshint-stylish')
      },
      dev: ['gruntfile.js', 'frontend/app.js', 'frontend/**/*.js', 'backend/**/*.js'],
      build: ['dist/js/*.js']
>>>>>>> 1b1616cddd305a048d98e9c834535e1a96f72375
    },
    uglify: {
      options: {
        mangle: false
      },
<<<<<<< HEAD
      dist: {
        files: {
          'dist/js/ngapp.min.js' : 'dist/js/ngapp.js',
          'dist/js/module.min.js' : 'dist/js/module.js'
        },
=======
      build: {
        files: {
          'dist/js/ngapp.min.js' : ['frontend/app.js', 'frontend/**/controller.js', 'frontend/**/directive.js', 'frontend/**/factory.js', 'frontend/**/service.js']
        }
>>>>>>> 1b1616cddd305a048d98e9c834535e1a96f72375
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
    autoprefixer: {
<<<<<<< HEAD
      dist: {
=======
      build: {
>>>>>>> 1b1616cddd305a048d98e9c834535e1a96f72375
        files: {

        }
      }
    },
<<<<<<< HEAD
    concat: {
      libs: {
          src: '<%= libs_files.js %>',
          dest: 'dist/js/module.js'
      },
      app: {
        src: '<%= libs_files.app %>',
        dest: 'dist/js/ngapp.js'
      },
      css: {
        src: ['frontend/**/*.css'],
        dest: 'dist/css/styles.css'
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
=======
    cssmin: {
      build: {
        files: [{
          expand: true,
          cwd: 'dist',
          src: ['css/**/*.css'],
          dest: 'dist/',
>>>>>>> 1b1616cddd305a048d98e9c834535e1a96f72375
          ext: '.min.css'
        }]
      }
    },
    copy: {
<<<<<<< HEAD
      csslibs: {
        expand: true,
        cwd: '../libs',
        src: '<%= libs_files.css %>',
        dest: 'dist/vendor'
      },
      mainhtml: {
          expand: true,
          flatten: true,
          src: 'frontend/index.html',
          dest: 'dist/'
      },
      html: {
        expand: true,
        flatten: true,
        cwd: 'frontend',
        src: ['**/*.html', '!index.html'],
        dest: 'dist/views'
      }
    },
/*    browserify: {
      dist: {
          src: 'dist/js/module.js',
          dest: 'dist/js/module.js',
      }
    },*/
    clean: {
      css: 'dist/css',
      js: 'dist/js',
      vendor: 'dist/vendor',
      html: ['dist/views', 'dist/index.html'],
      all: 'dist'
=======
      srcfile: [{

      }]
    },
    browserify: {
      build: {
        files: {
          'dist/js/libs.js' : [
            '../libs/angular/angular.min.js', 
            '../libs/angular-ui-router/release/angular-ui-router.min.js',
            '../libs/jquery/dist/jquery.min.js'
          ]
        }
      }
    },
    clean: {
      dist: 'dist'
>>>>>>> 1b1616cddd305a048d98e9c834535e1a96f72375
    },
    watch: {
      css: {
        files: ['frontend/**/*.scss'],
<<<<<<< HEAD
        tasks: ['clean:css', 'sass', 'concat:css', 'cssmin'],
        options: {
          livereload: true
        }
      },
      js: {
        files: ['frontend/app.js', 'frontend/routes/routes.js', 'frontend/**/*.controller.js', 'frontend/**/directive.js', 'frontend/**/factory.js', 'frontend/**/service.js'],
        tasks: ['clean:js', 'jshint', 'concat', 'uglify'],
        options: {
          livereload: true
        }
      },
      html: {
        files: ['frontend/index.html', 'frontend/**/*.html'],
        tasks: ['clean:html', 'copy:mainhtml', 'copy:html'],
=======
        tasks: ['sass']
      },
      js: {
        files: ['gruntfile.js', 'frontend/app.js', 'frontend/**/controller.js', 'frontend/**/directive.js', 'frontend/**/factory.js', 'frontend/**/service.js'],
        tasks: ['jshint', 'uglify'],
>>>>>>> 1b1616cddd305a048d98e9c834535e1a96f72375
        options: {
          livereload: true
        }
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
<<<<<<< HEAD
  grunt.loadNpmTasks('grunt-contrib-concat');
=======
>>>>>>> 1b1616cddd305a048d98e9c834535e1a96f72375
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-nodemon');

// tasks
  grunt.registerTask('default', ['jshint', 'concurrent']);
<<<<<<< HEAD
  grunt.registerTask('dist', ['clean', 'jshint', 'concat', 'sass', 'copy', 'uglify', 'cssmin']);
=======
  grunt.registerTask('build', ['clean', 'jshint', 'browserify', 'uglify', 'sass']);
>>>>>>> 1b1616cddd305a048d98e9c834535e1a96f72375
  
};