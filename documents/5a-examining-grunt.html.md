---
layout: page.html.ejs
title: Exploring the Gruntfiles
---

To understand how to use Grunt to build an EPUB with AkashaEPUB, we'll step our way through the epub-skeleton Gruntfile.  

The first step is to initialize AkashaCMS and AkashaEPUB.  Because this isn't being run through the `akashacms` command-line tool, the Gruntfile has to do what the `akashacms` command does to initialize AkashaCMS.  The following code snippet is it.

The `akashaEPUB.startup` function is what eventually initializes AkashaCMS, by calling `akashacms.config`.  It does so after constructing a full AkashaCMS config object.  The object passed into the `startup` function is a minimalized config object.  As the comment says, we can add config object fields if desired or leave the config object as it is here.

```
var path = require('path');
var akashacms = require('akashacms');
var akashaEPUB = require('akashacms-epub');

akashaEPUB.startup(akashacms, {
    // Add any config.js fields here to use
    // Other fields will be filled in with defaults

    akashacmsEPUB: {
        metadataFile: path.join(__dirname, "book.yml")
    }

});
```

This code snippet makes the `akashacms` and `akashaEPUB` plugin objects available to Grunt tasks.

```
module.exports = function(grunt) {
    ...
    grunt.initConfig({
        akashacms: akashacms,
        akashaEPUB: akashaEPUB,
    });
    ...
};
```

In the Gruntfile, we register AkashaCMS and AkashaEPUB tasks with Grunt:

```
grunt.loadNpmTasks('akashacms');
grunt.loadNpmTasks('akashacms-epub');
```

We now have enough pieces declared to show the build process itself.

```
grunt.registerTask("doepub", [
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
```

When we typed `grunt doepub` back in [](2-installation.html), this is the process which ran.

It might look like this on your screen

<img src="images/akasha-epub-in-action.png"/>

The `renderDocuments` task is where the rendering process ([](3-creating-content.html)) is performed.

## Modifying the Gruntfile

Because the workflow is implemented in the Gruntfile, you can make it anything you want.  AkashaEPUB is an open system that lets you freely design your EPUB construction workflow.  As said earlier, you can use the Gruntfile's we provide and get on with the task of writing your book.  Or your book may require specific steps such as downloading data from somewhere to massage it into your book.  It's completely up to you how you make use of AkashaEPUB.

It may be useful to minify the HTML and CSS files before bundling the EPUB file.  The `grunt-contrib-htmlmin` and `grunt-contrib-cssmin` plugins are excellent for that purpose.

Maybe your workflow requires uploading the completed EPUB to a staging server.  The `grunt-sftp-deploy` plugin is a very useful tool to do so.
