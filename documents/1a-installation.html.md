---
layout: page.html.ejs
title: Installing Node.js, AkashaCMS and AkashaEPUB
---

To get AkashaEPUB running there are four major pieces to install.  The steps are fairly simple, fortunately.

These are:
* Node.js ([nodejs.org](http://nodejs.org/)) provides the platform on which AkashaCMS is written
* Grunt ([gruntjs.com](http://gruntjs.com/)) is a build tool that runs on Node.js
* AkashaCMS ([akashacms.com](http://akashacms.com)) is a content management system that produces static HTML websites
* AkashaEPUB ([akashacms.com/plugins/epub.html](http://akashacms.com/plugins/epub.html)) adds the ability to produce EPUBs to the AkashaCMS platform

## Installing Node.js

Node.js runs on pretty much any computer system available.  The official place to download installable bundles is the website - http://nodejs.org/download/ ..  Instructions are available for most systems.

Once Node.js is installed, make sure the npm command is also available:

```
$ node --version
v0.10.25
$ npm --version
1.3.10
```

Next let's install Grunt -- see http://gruntjs.com/getting-started for more information

```
$ sudo npm install -g grunt-cli
```

That takes care of installing the Grunt command.  Later on we'll install the other half of Grunt.

## Installing AkashaCMS

Now that Node.js is installed we can follow the instructions to install AkashaCMS - http://akashacms.com/install.html

```
$ npm install -g akashacms
$ akashacms init akashacms-example
$ cd akashacms-example
$ npm install
$ akashacms build
$ akashacms preview
```

That first step might need to be done this way, if you get an error message:

```
$ sudo npm install -g akashacms
```

It's useful to glance through the `akashacms-example` directory just created and take a look at the configuration file and other files.

## Installing AkashaEPUB

Installing AkashaCMS plugins is done through a `package.json` file.  In the previous section, when we typed `npm install` it downloaded and installed some modules into a `node_modules` directory.

There are two things to do, and we'll refer to the files used to build this guide book.

In the package.json - https://github.com/akashacms/epub-guide/blob/master/package.json - we see

```
"dependencies": {
  "akashacms-epub": "*",
  "grunt": "*"
}
```

To get started, create a directory to contain a test book, with that package.json in the directory.

```
$ cd newBookDirectory
$ npm install
```

Notice that both `akashacms-epub` and `grunt` was downloaded and installed in the `node_modules` directory.

You've now installed AkashaEPUB.  To make it active in your project the `config.js` must contain these snippets:

```
module.exports = {
    root_assets: [ 'assets' ],
    root_layouts: [ 'layouts' ],
    root_partials: [ 'partials' ],
    root_out: 'out',
    root_docs: [ 'documents'],
    
    ...
    
    config: function(akasha) {
		akasha.registerPlugins(module.exports, [
            { name: 'akashacms-epub', plugin: require('akashacms-epub') }
        ]);
    }
};
```

The next thing is to create a Gruntfile, because unlike other AkashaCMS projects an AkashaEPUB book is built using Grunt.

Refer to the Gruntfile for this book for an example: https://github.com/akashacms/epub-guide/blob/master/Gruntfile.js

```
var akasha = require('akashacms');
var config = require('./config.js');
akasha.config(config);

module.exports = function(grunt) {
    grunt.initConfig({
        akasha: akasha,
        config: config
    });
    
    grunt.loadNpmTasks('akashacms');
    grunt.loadNpmTasks('akashacms-epub');
    
    grunt.registerTask('useEPUBStylesheets', function() {
        config.headerScripts.stylesheets = config.akashacmsEPUB.stylesheets;
    });
    
    grunt.registerTask("doepub", [
        'useEPUBStylesheets', 'emptyRootOut', 'copyAssets',
        'gatherDocuments', 'renderDocuments', 'generateEPUBFiles',
        'bundleEPUB'
    ] );
};
```


