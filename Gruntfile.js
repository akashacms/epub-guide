
var akasha = require('../../Node.js/akashacms');
var config = require('./config.js');
akasha.config(config);

module.exports = function(grunt) {
    
    // tasks: copyAssets, buildepub, buildweb
    
    grunt.initConfig({
        akasha: akasha,
        config: config
    });
    
    grunt.loadTasks('../../Node.js/akashacms/tasks');
    grunt.loadTasks('../../Node.js/akashacms-epub/tasks');
    
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