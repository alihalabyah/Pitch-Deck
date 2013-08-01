module.exports = function(grunt) {

  var path;

  path = {
    styles: {
      src: 'less/',
      dist: 'css/'
    },
    js: {
      components: 'components/',
      src: 'js/source/',
      dist: 'js/dist/'
    }
  };

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    less: {
      options: {
        yuicompress: true
      },
      files: {
        src: path.styles.src + 'presentation.less', dest: path.styles.dist + 'presentation.css'
      }
    },
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: [
          'components/jquery/jquery.js',
          'components/Chart.js/Chart.js',
          'components/jquery-animate-numbers/jquery.animateNumbers.js',
          'components/jquery-scrollspy/jquery-scrollspy.js',
          'components/jquery.typer.js/src/jquery.typer.js',
          'js/source/snap.js'
        ],
        dest: 'js/dist/main.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'js/dist/main.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },
    jshint: {
      files: ['gruntfile.js', 'js/*.js'],
      options: {
        // options here to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },
    watch: {
      files: ['less/**/*.less'],
      tasks: ['less']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-bump');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-less');

  grunt.registerTask('test', ['jshint']);
  grunt.registerTask('default', ['jshint', 'concat', 'less']);
  grunt.registerTask('compile', ['jshint', 'concat', 'uglify', 'less']);
  grunt.registerTask('deploy', ['jshint', 'concat', 'uglify', 'less', 'bump']);
};