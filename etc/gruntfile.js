/* global module */
module.exports = function(grunt) {

    'use strict';

    // Grunt configuration.
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        source: {
            php: [{
                    expand: true,
                    cwd: '../app/views',
                    src: [ '**/*.php' ],
                    dest: '../app/_views'
            }],
            css: [ '../src/scss/**/*.scss' ],
            main: {
                js: [
                    '../src/js/rd.log.js',
                    '../src/js/rd.cookie.js',
                    '../src/js/rd.db.js',
                    '../src/js/br.js',
                    '../src/js/sweeps.js'
                ]
            },
            admin: {
                js: [
                    '../src/js/admin.js'
                ]
            }
        },

        watch: {
            php: {
                // files: '<%= source.php %>', // this doesn't work for some reason
                files: [ '../app/views/**/*.php' ],
                tasks: ['htmlmin:dist']
            },
            css: {
                files: '<%= source.css %>',
                tasks: ['compass:dist']
            },
            jsmain: {
                files: '<%= source.main.js %>',
                tasks: ['uglify:main']
            },
            jsadmin: {
                files: '<%= source.admin.js %>',
                tasks: ['uglify:admin']
            }
        },

        htmlmin: {
            options: {
                ignoreCustomComments: [/<\?(.|\n|\s)+?\?>/], // regex
                removeComments: true, // removes SSI includes :(
                collapseWhitespace: true,
                removeIgnored: false,
                removeCommentsFromCDATA: true,
                removeCDATASectionsFromCDATA: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true
            },
            dist: {
                files: '<%= source.php %>'
            }
        },

        compass: {
            dist: {
                options: {
                    // defined in config.rb
                }
            }
        },

        uglify: {
            options: {
                // beautify: true
            },
            main: {
                files: {
                    '../web/js/jds.js': '<%= source.main.js %>'
                }
            },
            admin: {
                files: {
                    '../web/js/admin.js': '<%= source.admin.js %>'
                }
            }
        },
    });

    // Load the grunt plugins.
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-inline');

    // Register task(s).
    grunt.registerTask('compile', ['htmlmin', 'compass', 'uglify:main', 'uglify:admin']);
    grunt.registerTask('default', ['compile', 'watch']);

};