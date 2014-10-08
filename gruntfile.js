module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      options: {
        reporter: require('jshint-stylish')
      },
      dev: ['gruntfile.js', 'frontend/app.js', 'frontend/**/*.js', 'backend/**/*.js'],
      build: ['dist/js/*.js']
    },
    uglify: {
      options: {
        mangle: false
      },
      build: {
        files: {
          'dist/js/ngapp.min.js' : ['frontend/app.js', 'frontend/**/controller.js', 'frontend/**/directive.js', 'frontend/**/factory.js', 'frontend/**/service.js']
        }
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
      build: {
        files: {

        }
      }
    },
    cssmin: {
      build: {
        files: [{
          expand: true,
          cwd: 'dist',
          src: ['css/**/*.css'],
          dest: 'dist/',
          ext: '.min.css'
        }]
      }
    },
    copy: {
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
    },
    watch: {
      css: {
        files: ['frontend/**/*.scss'],
        tasks: ['sass']
      },
      js: {
        files: ['gruntfile.js', 'frontend/app.js', 'frontend/**/controller.js', 'frontend/**/directive.js', 'frontend/**/factory.js', 'frontend/**/service.js'],
        tasks: ['jshint', 'uglify'],
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
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-nodemon');

// tasks
  grunt.registerTask('default', ['jshint', 'concurrent']);
  grunt.registerTask('build', ['clean', 'jshint', 'browserify', 'uglify', 'sass']);
  
};