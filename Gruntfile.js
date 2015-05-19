
var path = require('path');
var akashacms = require('akashacms');
var akashaEPUB = require('../akashacms-epub');

akashaEPUB.startup(akashacms, {
    // Add any config.js fields here to use
    // Other fields will be filled in with defaults
    
    akashacmsEPUB: {
        metadataFile: path.join(__dirname, "book.yml")
    }
    
});

module.exports = function(grunt) {
    
    grunt.initConfig({
        akashacms: akashacms,
        akashaEPUB: akashaEPUB,
    });
    
    grunt.loadNpmTasks('akashacms');
    grunt.loadTasks('../akashacms-epub/tasks');
    
    grunt.registerTask("doepub", [
        // 'akashacmsEPUBstart',
        'emptyRootOut', 'copyAssets', 'ePubConfigCheck',
        'gatherDocuments',
        'makeMetaInfDir', 'makeMimetypeFile', 'makeContainerXml',
        'makeCoverFiles',  'scanForBookMetadata',
        'assetManifestEntries',
        'makeTOC',
        'makeOPF',
        'renderDocuments',
        'bundleEPUB'
    ] );
    
    // grunt.registerTask('epubcheck', [ 'EPUBcheck' ]);
    
};