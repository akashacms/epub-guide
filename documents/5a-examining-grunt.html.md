---
layout: page.html.ejs
title: Exploring the Gruntfiles
---

Grunt uses a configuration file named `Gruntfile.js` to declare the build process for a given project.  There is a large ecosystem of Grunt plugins available for a wide range of purposes.  Grunt is widely used in building website assets, meaning many of those Grunt plugins are directly suitable for building AkashaCMS websites or EPUB's with AkashaEPUB.

Because AkashaEPUB builds are done with Grunt rather than the `akashacms` command-line tool, we have to initialize AkashaCMS ourselves.  This bit of code does so exactly as the `akashacms` tool initializes AkashaCMS.

```
    var akasha = require('akashacms');
    var config = require('./config.js');
    akasha.config(config);
```

The next step is to make those objects available to Grunt tasks.

```
    module.exports = function(grunt) {
        ...
        grunt.initConfig({
            akasha: akasha,
            config: config
        });
        ...
    };
```

A Grunt task then retrieves these values as so:

```
    grunt.config.requires('akasha');
    grunt.config.requires('config');
    var akasha = grunt.config('akasha');
    var config = grunt.config('config');
```

The task can then proceed with calling AkashaCMS API functions, or referring to data in the site configuration.

Finally, we register tasks with Grunt:

```
    grunt.loadNpmTasks('akashacms');
    grunt.loadNpmTasks('akashacms-epub');
```

AkashaCMS provides a set of web-centric CSS stylesheets that we don't want anywhere near the EPUB file.  To replace the AkashaCMS stylesheets with ones useful for EPUB, use this in-line task.  It resets the configuration to use the stylesheets declared in `config.js`.

```
    grunt.registerTask('useEPUBStylesheets', function() {
        config.headerScripts.stylesheets = config.akashacmsEPUB.stylesheets;
    });
```

Now we have enough pieces declared to show the build process itself.

```
    grunt.registerTask("doepub", [
        'useEPUBStylesheets', 'emptyRootOut', 'copyAssets',
        'gatherDocuments', 'renderDocuments', 'generateEPUBFiles',
        'bundleEPUB'
    ] );
```

When we typed `grunt doepub` back in <a href="2-installation.html"></a>, this is the process which ran.

The tasks are:

* `useEPUBStylesheets` As we just discussed, this substitutes EPUB-centric CSS files.
* `emptyRootOut` Deletes the existing `root_out` directory, and creates an empty one.
* `copyAssets` Copies files from all the `root_assets` directories.
* `gatherDocuments` Scans the `root_docs` directories for document files.
* `renderDocuments` Renders all the documents into `root_out`.
* `generateEPUBFiles` Provided by `akashacms-epub`, this generates all the EPUB packaging files.
* `bundleEPUB` Provided by `akashacms-epub`, this builds the .EPUB file.

The tasks can be run individually if desired.

```
    $ grunt emptyRootOut copyAssets
```

This would just set up the `root_out` with asset files, and do nothing else.  The build could then be done:

```
    $ grunt useEPUBStylesheets gatherDocuments renderDocuments generateEPUBFiles
```

And finally build the EPUB as a separate task

```
    $ grunt bundleEPUB
```

## Modifying the Gruntfile

It may be useful to minify the HTML and CSS files before bundling the EPUB file.  The `grunt-contrib-htmlmin` and `grunt-contrib-cssmin` plugins are excellent for that purpose, and can easily be integrated into `doepub`.

Maybe your workflow requires uploading the EPUB to a staging server.  The `grunt-sftp-deploy` plugin is a very useful tool to do so.

The build process for the akashacms.com website ([github.com/akashacms/akashacms-website/blob/master/Gruntfile.js](https://github.com/akashacms/akashacms-website/blob/master/Gruntfile.js)) shows how to integrate all three of those tools.


