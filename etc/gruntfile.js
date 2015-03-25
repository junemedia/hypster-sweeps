/* global module */
module.exports = function(grunt) {

    'use strict';

    var amdclean = require('amdclean'),
        fs = require('fs'),
        amdcleanLogic = function(data) {
            var outputFile = data.path,
                intro = fs.readFileSync('../src/js/' + (data.path.match(/admin/) ? 'admin' : 'lib') + '/intro.js'),
                outro = fs.readFileSync('../src/js/' + (data.path.match(/admin/) ? 'admin' : 'lib') + '/outro.js');
            fs.writeFileSync(outputFile,
                intro +
                amdclean.clean({
                    'filePath': outputFile,
                    // 'prefixMode': 'camelCase',
                    'prefixTransform': function(postNormalizedModuleName, preNormalizedModuleName) {
                        // somehwat DANGEROUS -- this means that all module names must be unique!
                        return postNormalizedModuleName.replace(/.*_/, '');
                    },
                    'aggressiveOptimizations': true,
                    'escodegen': {
                        format: {
                            indent: {
                                style: '    '
                            }
                        }
                    },
                    wrap: false,
                    'transformAMDChecks': false,
                    'createAnonymousAMDModule': true,
                    'removeUseStricts': true
                }) +
                outro);
            // );
        };


    // Grunt configuration.
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        source: {
            js: ['../src/js/**/*.js'],
            css: ['../src/scss/**/*.scss'],
            php: [{
                expand: true,
                cwd: '../app/views',
                src: ['**/*.php'],
                dest: '../app/_views'
            }]
        },

        watch: {
            js: {
                files: '<%= source.js %>',
                tasks: ['requirejs', 'filerev', 'filerev_assets']
            },
            css: {
                files: '<%= source.css %>',
                tasks: ['compass:dist']
            },
            php: {
                // files: '<%= source.php %>', // this doesn't work for some reason
                files: ['../app/views/**/*.php'],
                tasks: ['htmlmin:dist']
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

        requirejs: {
            admin: {
                options: {
                    name: 'admin',
                    baseUrl: '../src/js',
                    out: '../web/js/admin.js',
                    optimize: 'uglify',
                    skipModuleInsertion: true,
                    onModuleBundleComplete: amdcleanLogic
                }
            },
            betterrecipes: {
                options: {
                    name: 'betterrecipes',
                    baseUrl: '../src/js',
                    out: '../web/js/betterrecipes.js',
                    optimize: 'uglify',
                    skipModuleInsertion: true,
                    onModuleBundleComplete: amdcleanLogic
                }
            },
            recipe4living: {
                options: {
                    name: 'recipe4living',
                    baseUrl: '../src/js',
                    out: '../web/js/recipe4living.js',
                    optimize: 'uglify',
                    skipModuleInsertion: true,
                    onModuleBundleComplete: amdcleanLogic
                }
            }
        },

        filerev: {
            options: {
                algorithm: 'md5',
                length: 6
            },
            js: {
                src: ['../web/js/*.js', '!../web/js/*.[0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f].js'],
                dest: '../web/js'
            },
            css: {
                src: ['../web/css/*.css', '!../web/css/*.[0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f].css'],
                dest: '../web/css'
            }
        },

        filerev_assets: {
            dist: {
                options: {
                    dest: 'assets.json',
                    cwd: '../web',
                    prettyPrint: true
                }
            }
        }

    });

    // Load the grunt plugins.
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-inline');
    grunt.loadNpmTasks('grunt-filerev');
    grunt.loadNpmTasks('grunt-filerev-assets');

    // Register task(s).
    grunt.registerTask('compile', ['htmlmin', 'compass', 'requirejs', 'filerev', 'filerev_assets']);
    grunt.registerTask('build', ['compile']);
    grunt.registerTask('default', ['compile', 'watch']);

};