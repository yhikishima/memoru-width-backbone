module.exports = (grunt)->
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json')

    concat:
      dist:
        src: [
          'src/js/jquery.js',
          'src/js/classlist.js',
          'src/js/create_global-object.js',
          'src/js/ua_check.js',
          'src/js/check_page-load.js'
          'src/js/create_usr-id.js',
          'src/js/insert_data.js',
          'src/js/delete_data.js',
          'src/js/change_data.js',
          'src/js/filter_memo.js',
          'src/js/modal.js',
          'src/js/tap.js',
          'src/js/execute_method.js'
        ]
        dest: 'public/js/memoru.js'

    uglify:
      dist:
        src: 'public/js/memoru.js',
        dest: 'public/js/memoru.min.js'

    compass:
      dist:
        options:
          config: 'config.rb'

    watch:
      css:
        files: ['src/sass/*.scss']
        tasks: ['compass']
        options:
          atBegin: true
      js:
        files: ['src/js/*.js']
        tasks: ['concat', 'uglify']
        options:
          atBegin: true

  })

  grunt.loadNpmTasks('grunt-contrib-compass')
  grunt.loadNpmTasks('grunt-contrib-concat')
  grunt.loadNpmTasks('grunt-contrib-uglify')
  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('grunt-contrib-clean')

  grunt.registerTask('default', [ 'concat', 'uglify', 'compass'])