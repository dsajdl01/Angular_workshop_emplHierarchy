// Karma test runner configuration

// BSW - To run these tests manually (mithout Maven), from the prject root (e.g. emport-web) run:
//      ./node_modules/karma/bin/karma start src/test/javascript/karma.conf.js

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '../js/',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
      'vendor/angular/angular.js',
      'vendor/angularjs-toaster/toaster.js',
      'vendor/angular-animate/angular-animate.js',
      'vendor/angular-mocks/angular-mocks.js',
      'vendor/angular-route/angular-route.js',
      'vendor/angular-resource/angular-resource.js',
      'vendor/angular-messages/angular-messages.js',
      'vendor/angular-sanitize/angular-sanitize.js',
      'vendor/angular-strap/dist/angular-strap.js',
      'vendor/angular-strap/dist/angular-strap.tpl.js',
      'vendor/angular-ui-utils/ui-utils.js',
      'vendor/angular-ui-select/dist/select.js',

      'app.js',
      'controller/*.js',
      'directives/*.js',
      'service/*.js'
    ],


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: [
        'progress'
    ],

    // list of files to exclude
    exclude: [
    ],

    preprocessors: {
      "js/views/accounts.html": ["ng-html2js"]
    },

    ngHtml2JsPreprocessor: {
        // If your build process changes the path to your templates,
        // use stripPrefix and prependPrefix to adjust it.
        stripPrefix: "HierarchyProject/js/views/.*/",
        prependPrefix: "HierarchyProject/js/views/",

        // the name of the Angular module to create
        moduleName: "myMngtHierarchyApp"
    },

    // web server port
    port: 8080,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true
  });
};
