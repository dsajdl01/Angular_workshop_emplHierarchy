// This file overrides some of the settings in karma.conf.js and is used when running from maven.

// This also includes coverage. If you want to see coverage when developing, run this: (from the project root directory)

//      ./node_modules/karma/bin/karma start src/test/javascript/karma.conf.ci.js

// Results will be in   emport-web/target/reports

var baseConfig = require('./karma.conf.js');

module.exports = function(config){
    // Load base config
    baseConfig(config);

    reportPath = config.basePath + "../../target/reports/";


    // Override base config
    config.set({
    	browsers: ['Chrome'], // This runs the tests in a headless (phantomJS) browser
        singleRun: true,
        autoWatch: false,

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: [
            'progress',
            'coverage'
        ],

        junitReporter: {
            outputFile: reportPath + 'junit/TESTS-xunit.xml'
        },

        coverageReporter: {
            type : 'lcov',
            dir : reportPath + 'coverage/',
            subdir: 'lcov'
        },

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
      ' app.js': ['coverage'],
        'controller/*.js': ['coverage'],
        'directives/*.js': ['coverage'] ,
        'service/*.js': ['coverage'],
        "js/views/accounts.html": [""]
    },

    });
};