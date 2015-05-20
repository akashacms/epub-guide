---
layout: page.html.ejs
title: AkashaCMS Directory structure and how it's used in AkashaEPUB
akashacmsEPUB:
    id: chapter2c
---

Now that you've seen AkashaEPUB can build an EPUB, let's take a quick tour of how this is done.

AkashaCMS (See [akashacms.com](http://akashacms.com)) forms the basis of AkashaEPUB.  That is, an AkashaEPUB workspace is an AkashaCMS workspace, adapted to creating EPUB's.  

It will help to refer to the source code (See [github.com/akashacms/epub-guide](https://github.com/akashacms/epub-guide) and [github.com/akashacms/epub-skeleton](https://github.com/akashacms/epub-skeleton)) to study a working example.

## The AkashaEPUB Gruntfile.js

Gruntfile's are used by `grunt` to drive a build process.  AkashaEPUB uses grunt because the rich ecosystem of web asset tools gives the possibility of using those tools to build EPUB's.    AkashaEPUB's process is driven by this recommended Gruntfile:

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

module.exports = function(grunt) {
    
    grunt.initConfig({
        akashacms: akashacms,
        akashaEPUB: akashaEPUB,
    });
    
    grunt.loadNpmTasks('akashacms');
    grunt.loadNpmTasks('akashacms-epub');
    
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
    
    // grunt.registerTask('epubcheck', [ 'EPUBcheck' ]);
};
```

The first part initializes AkashaCMS and AkashaEPUB.

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

The `akashaEPUB.startup` function takes care of initializing everything.  The second argument is a simplified configuration object, which we'll discuss in the next section.  Most of the config object complexity is hidden within the `startup` function.  The book metadata is stored as a YAML file, which we read here.

The rest of the Gruntfile is what's normally done - declaring the grunt tasks, and specifying the order of their execution.

## AkashaCMS config object and the required directories

The AkashaCMS configuration object is normally kept in a file named `config.js`.  That file is treated as a Node.js module, and can get quite lengthy.  See [akashacms.com/configuration/index.html](http://akashacms.com/configuration/index.html) for details.  But fear not, AkashaEPUB's defaults means your config object can be extremely small as shown above.

That is, AkashaEPUB has default values for the long list of config object elements.  The defaults, if acceptible to you, are what minimizes config object.

The directory structure is as follows:

<table>
<tr><th>Config variable</th><th>Default</th><th>Description</th></tr>
<tr><td>root_assets</td><td>assets</td><td>Contains "asset" files that aren't built, but are simply copied to the `root_out` directory.  Such as image, CSS or font files.</td></tr>
<tr><td>root_layouts</td><td>layouts</td><td> These are templates into which the content is rendered.  The AkashaCMS rendering model is to progressively render content into more comprehensive page containers until the content is rendered into a full page.  The system is quite comprehensive, and is documented at <a href="http://akashacms.com/layout/index.html">akashacms.com/layout/index.html</a>.  For AkashaEPUB we probably only need simple layouts.</td></tr>
<tr><td>root_partials</td><td>partials</td><td> Partials are similar to the templates, but can be thought of as content snippets that can be inserted inline a document.</td></tr>
<tr><td>root_docs</td><td>documents</td><td> Contains the content documents</td></tr>
<tr><td>root_out</td><td>out</td><td> AkashaCMS builds the rendered website (or EPUB for AkashaEPUB) into this directory</td></tr>
</table>

The epub-skeleton and epub-guide projects use the default directories as listed in the "Default" column.  In `akashaEPUB.startup` the Default directories are detected and initialized into the config object.  For example if the `partials` directory is present, `root_partials` will be set up appropriately, but if there's no `partials` directory then `root_partials` will be empty.

If you wish to change things, the code would look like this:

```
akashaEPUB.startup(akashacms, {
    ...
    root_assets: [ 'assetz' ],
    root_layouts: [ 'layoutz' ],
    root_partials: [ 'partialz' ],
    root_out: 'out',
    root_docs: [ 'documentz'],
    ...
});
```

You can name any of these directories as you want, but it's best to leave these defaults alone.


## The AkashaEPUB `root_out` is the EPUB directory structure

The built EPUB files land in the `root_out` (default: `out`) directory with file content correctly organized as an EPUB.  The `makeMetaInfDir`, `makeMimetypeFile`, `makeContainerXml`, `makeCoverFiles`, `makeTOC`, `makeOPF`, and `renderDocuments` tasks are what construct the rendered directory structure.  The `bundleEPUB` task constructs the EPUB file from that directory.

The contents of the `root_assets` and `root_docs` directories (there can be multiple instances of each) map directly to the `root_out` directory.  For example, `root_assets/css/style.css` is copied directly to `root_out/css/style.css` with no processing.  Likewise, `root_docs/1-introduction.html.md` is copied to `root_out/1-introduction.html` after being processed to render it into a full HTML page.

EPUB's are a mix of HTML files, CSS, Images and metadata files in XML format.  You do not create the metadata files.  Instead, AkashaEPUB creates them for you from metadata picked up from files in the project.

## Installing npm modules to customize your book

Because AkashaCMS is built with the Node.js platform, any additional modules to be installed must be declared in a `package.json` file, and then installed using npm.  The plugin modules land in a directory named `node_modules`.

First declare the module in in the config object:

```
akashaEPUB.startup(akashacms, {
    ...
    config: function() {
        akasha.registerPlugins([
            { name: 'akashacms-epub',
              plugin: require('akashacms-epub') },
            { name: 'akashacms-breadcrumbs',
              plugin: require('akashacms-breadcrumbs') }
        ]);
    }
    ...
};
```

Next declare it in the `package.json`

```
"dependencies": {
    "akashacms": "*",
    "akashacms-epub": "*",
    "akashacms-breadcrumbs": "*",
    "grunt": "*",
    "ejs": "*"
}
```

If the plugin module provides some tasks, add the following to `Gruntfile.js`

```
grunt.loadNpmTasks('akashacms-breadcrumbs');
```

Then install the modules

```
$ npm install
```

If all's good this installs the new modules.