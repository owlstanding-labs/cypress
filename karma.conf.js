module.exports = function(config) {
    config.set({
        basePath: '',
        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['mocha', 'riot'],
        files: [{
                pattern: 'node_modules/chai/chai.js',
                watched: false
            }, {
                pattern: 'node_modules/riot/riot+compiler.js',
                watched: false
            }, {
                pattern: 'test/**/*.js'
                    // watched: false
            },
            'app/**/*.pug',
            'app/**/*.spec.js'
        ],
        exclude: [
            'app/**/*.sass'
        ],
        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'app/**/*.pug': ['riot', 'babel'],
            'app/**/*.spec.js': ['babel'],
            'test/**/*.js': ['babel'],
        },
        riotPreprocessor: {
            options: {
                type: 'es6',
                template: 'pug',
                parsers: {
                    html: {
                        pug: (html, opts, url) => require('pug').compile(html),
                    },
                    css: {
                        sass: (tagName, css, opts, url) => require('node-sass').compile(css),
                    },
                }
            }
        },
        babelPreprocessor: {
            options: {
                presets: ['es2015-riot'],
                plugins: [
                    // resolve require, export, import ...
                    'transform-es2015-modules-umd'
                ],
                sourceMap: 'inline'
            },
            filename: function(file) {
                return file.originalPath.replace(/\.js$/, '-es5.js');
            },
            sourceFileName: function(file) {
                return file.originalPath;
            }
        },
        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress'],
        // web server port
        port: 9876,
        // enable / disable colors in the output (reporters and logs)
        colors: true,
        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,
        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,
        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['ChromiumHeadless'],
        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,
        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity
    })
}