
var akasha = require('akashacms');
var config = require('./config.js');
akasha.config(config);

module.exports = function(grunt) {
    
    // tasks: copyAssets, buildepub, buildweb
    
    grunt.initConfig({
        akasha: akasha,
        config: config
    });
    
    grunt.loadNpmTasks('akashacms');
    grunt.loadNpmTasks('akashacms-epub');
    
    // TBD useWebStylesheets
    grunt.registerTask('useEPUBStylesheets', function() {
        config.headerScripts.stylesheets = config.akashacmsEPUB.stylesheets;
    });
    
    grunt.registerTask("doepub", [
        'useEPUBStylesheets', 'emptyRootOut', 'copyAssets',
        'gatherDocuments', 'renderDocuments', 'generateEPUBFiles',
        'bundleEPUB'
    ] );
    
    // grunt.registerTask('epubcheck', [ 'EPUBcheck' ]);
    
};