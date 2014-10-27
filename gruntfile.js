module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
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
          ext: '.min.css'
        }]
      }
    },
    copy: {
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
    },
    watch: {
      css: {
        files: ['frontend/**/*.scss'],
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
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-nodemon');

// tasks
  grunt.registerTask('default', ['jshint', 'concurrent']);
  grunt.registerTask('dist', ['clean', 'jshint', 'concat', 'sass', 'copy', 'uglify', 'cssmin']);
  
};