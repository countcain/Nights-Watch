module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks("grunt-contrib-connect");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-contrib-concat");

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      all: ['Gruntfile.js', 'src/*.js']
    },
    uglify: {
      options: {
        mangle: false
      },
      my_target: {
        files: {
          'build/nights-watch.js' : [
            'src/libs/platform.js',
            'src/basic-data-collector.js',
            'src/cookies-generator.js',
            'src/postman.js'
          ]
        }
      }
    },
    watch: {
      src: {
        files: ['src/*.js'],
        tasks: ['clean', 'concat', 'uglify']
      }
    },
    connect: {
      server: {
        options: {
          port: 9001,
          hostname: '*',
          base: 'demo/',
          debug: true
        }
      }
    },
    clean: ['build', 'demo/development.js'],
    concat: {
      options: {
        separator: "\n"
      },
      dist: {
        src: [
            'src/libs/platform.js',
            "src/basicDataCollector.js",
            'src/cookies-generator.js',
            'src/postman.js',
            'src/nightsWatcher.js',
            'src/runner.js'
        ],
        dest: 'demo/development.js'
      }
    }
  });

  grunt.registerTask('default', ['clean', 'concat', 'connect', 'watch']);
  grunt.registerTask('build', ['clean', 'uglify', 'connect', 'watch']);
};