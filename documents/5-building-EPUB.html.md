---
layout: chapter-index.html.ejs
title: Building an EPUB with AkashaEPUB
---

Now that we know how to [install AkashaEPUB](2-installation.html), [how to create content](3-creating-content.html), and [structure our book](4-configuration.html), it's time to use AkashaEPUB to build some books.  What's next is to go over the book building process.

AkashaEPUB refers to the combination of AkashaRender, the EPUB-related plugins, and _epubtools_.  The recommended workflow uses these tools, driven by commands in the `scripts` section of the `package.json`.  You're of course free to use a different build process.  The process we'll describe here is easy and convenient.

# AkashaRender Configuration file and `package.json`

The configuration of an AkashaRender project is split between the Configuration file and the `package.json`.  The latter is used by `npm` and the Node.js platform to list package `dependencies`, the available `scripts` for performing actions related to the project, and various metadata items like project owner identification or the projects home page.  For an AkashaEPUB project, the `scripts` section can be used to describe the build process, while the `dependencies` will list the EPUB-related AkashaCMS plugins.

The Configuration file, typically named `config.js`, is a Node.js module that produces an AkashaRender _Configuration_ object.  While the Configuration object can be created any way you like, it's most to use a `config.js` file.  There's nothing special about that file name, and it can be named anything you like.  In fact the project can have multiple Configuration files for different purposes.

Here's a couple `config.js` files for EPUB's:

* This book:  https://github.com/akashacms/epub-guide/blob/master/config.js
* The EPUB Skeleton: https://github.com/akashacms/epub-skeleton/blob/master/config.js

More details about AkashaRender project configuration are at: https://akashacms.com/akasharender/configuration.html

```
'use strict';

const akasha  = require('akasharender');

const config = new akasha.Configuration();

config
    .addAssetsDir('assets')
    .addLayoutsDir('layouts')
    .addDocumentsDir('documents')
    .addPartialsDir('partials');

config
    .use(require('akasharender-epub'))
    .use(require('akashacms-footnotes'));
config.addStylesheet({ href: "/css/style.css" });

config.setMahabhutaConfig({
    recognizeSelfClosing: true,
    recognizeCDATA: true,
    xmlMode: true
});

config.prepare();

module.exports = config;
```

This is a fairly simple configuration file.  They can grow to be rather complex depending on your needs.  We pull in the `akasharender` module, then instantiate a Configuration object, call some methods, and assign the object to `module.exports`.

The first set of methods, `addAssetsDir` and the others, inform AkashaRender what directories to use for certain purposes.

The second set, `use`, informs AkashaRender the AkashaCMS plugins to use.  In the `use` call we pass in the result of `require("plugin-name")` so that AkashaRender receives the module object.  There must be a corresponding entry in `package.json` for each of these so that we can easily use `npm` to download the dependencies required to build the book.

An AkashaCMS plugin will modify AkashaRender's execution to add new capabilities.  The most common addition a plugin makes is to add new custom tags using the Mahabhuta DOM-processing engine, or other DOM-processing tasks.  The two plugins listed here are especially useful for EPUB's:

* `akasharender-epub` contains various cleanup's required because of EPUB3 limitations.
* `akashacms-footnotes` provides a simple way to generate a list of footnotes at the bottom of the page.

With `addStylesheet` we declare a CSS file to use in every page.  

With `setMahabhutaConfig` we describe the HTML rendering output.  We have to specify `xmlMode: true` because the EPUB3 world requires XHTML files.

Likely package dependency entries in `package.json`:

```
"dependencies": {
    ...
    "akashacms-footnotes": ">=0.6",
    "akasharender-epub": "akashacms/akasharender-epub",
    "mahabhuta": ">=0.6.3",
    "akasharender": ">=0.6",
    "epubtools": ">=0.3",
    "globfs": "*"
    ...
}
```

## When do you use multiple Configuration files?

The AkashaRender Configuration file allows for quite a lot of flexibility.  Suppose you have some content, like a little guidebook about using some software like AkashaRender.  You might want that guidebook to be available on a website such as at https://akashacms.com/akasharender/toc.html.  And you may also want to publish that guidebook as a standalone EPUB.

We'll go over how to do that in more detail elsewhere.  Let's do a brief overview.

This goal means you have two AkashaRender projects:

1. The website containing this guidebook plus everything else on the website.  This content is to be rendered as a website.  In the case of AkashaCMS.com there are three guidebooks, a plugin directory, and a project news blog.
1. The guidebook formatted as an EPUB.

It can be instructive to puzzle out how AkashaCMS.com is structured, but its complexity will only confuse the discussion.  Instead I'll describe how another site, https://greentransportation.info/ is configured, with a guidebook at https://greentransportation.info/ev-charging/toc.html

The `config.js` for the website rendering simply has:

```
config
    .addDocumentsDir('documents')
    .addDocumentsDir({
        src: 'ev-charging',
        dest: 'ev-charging',
        baseMetadata: {
            bookHomeURL: "/ev-charging/toc.html",
            copyrightPartial: 'copyright-range-confidence.html'
        }
    })
```

The site has two documents directories.  One contains the bulk of the website content, and the second contains the content for the electric vehicle charging e-Book.

The `addDocumentsDir` function can take an object like this.  This says the files in the directory `ev-charging` are rendered into the `ev-charging` subdirectory of the RenderDestination.  The `baseMetadata` segment adds to the metadata used with each document.  Because the `ev-charging` content needed additional metadata, it had to be kept in a separate directory in order to specify that metadata.

When the greentransportation.info website is rendered, content from both directories are rendered into the website.

A second configuration file describes how the e-Book is structured.

```
config
    .addAssetsDir('assets-ebook')
    .addAssetsDir({
        src: 'assets/fonts',
        dest: 'fonts'
    })
    .addLayoutsDir('layouts-ebook')
    .addDocumentsDir('ev-charging')
    .addPartialsDir('partials-ebook')
    .setRenderDestination('out-range-confidence');
```

The book uses e-Book-specific versions of the `assets`, `layouts` and `partials` directory.  Because `ev-charging` is the only DocumentsDir, the entirety of the e-book content comes from that directory.

# Building an EPUB

Now that we know the configuration of directory structure and plugins, let's look at the build process.  Remember that we're recommending to use the `scripts` section of the `package.json`.

In the past _Grunt_ was used but over time it proved to be unwieldy.  Over the last couple years npm's `script` support has become a popular build mechanism.  For smaller workflows it is a very mechanism, and is well suited to using the AkashaEPUB toolset to build and package EPUB's.

This is the `scripts` section of the EPUB Skeleton project's `package.json`

```
"scripts": {
  "clean": "rm -rf out",
  "prebuild": "mkdir -p out && akasharender copy-assets config.js",
  "build": "akasharender render config.js",
  "postbuild": "epubtools mimetype out && epubtools containerxml out book.yml && epubtools makemeta out book.yml",
  "bundle": "epubtools package out book.yml",
  "rebuild": "npm run clean && npm run build && npm run bundle"
},
```

The first thing to call out is the hard-coded `out` directory.  This is the default RenderDestination.  There isn't any mechanism for retrieving Configuration options to use in a command-line script, so you'll just have to manually coordinate the directory name in these scripts with the setting of RenderDestination.

The `build` step has companion `prebuild` and `postbuild` steps.  Between `prebuild` and `postbuild` is the typical AkashaRender build where we first ensure the RenderDestination directory exists, then copy in the asset files, then render the content files.

The `postbuild` step is where _epubtools_ comes into the picture.  These commands construct the metadata files required by the EPUB.

It is in `bundle` where the RenderDestination directory is ZIP'd to create the EPUB file.  Care is taken to construct it according to the EPUB spec.  An EPUB is a ZIP archive with certain fingerprints.  For example the `mimetype` file has to be the first entry in the ZIP archive and it cannot be compressed.  By doing so, the text `application/epub+zip` appears in plain text at a certain offset into the file, as shown here:

```
0000000    P   K 003 004 024  \0  \b  \0  \0  \0 340 234 355   J  \0  \0
0000020   \0  \0  \0  \0  \0  \0  \0  \0  \0  \0  \b  \0  \0  \0   m   i
0000040    m   e   t   y   p   e   a   p   p   l   i   c   a   t   i   o
0000060    n   /   e   p   u   b   +   z   i   p   P   K  \a  \b   o   a
```

For convenience the `rebuild` command runs the entire process.  The output will look something like this:

```
$ npm run rebuild

> epub-skeleton@ rebuild /Users/david/akasharender/epub-skeleton
> npm run clean && npm run build && npm run bundle


> epub-skeleton@ clean /Users/david/akasharender/epub-skeleton
> rm -rf out


> epub-skeleton@ prebuild /Users/david/akasharender/epub-skeleton
> mkdir -p out && akasharender copy-assets config.js


> epub-skeleton@ build /Users/david/akasharender/epub-skeleton
> akasharender render config.js

.html.md documents/chap1.html.md ==> out/chap1.html
.html.md documents/chap1a.html.md ==> out/chap1a.html
.html.md documents/chap2.html.md ==> out/chap2.html
.html.md documents/chap3.html.md ==> out/chap3.html
.html.md documents/chap3a.html.md ==> out/chap3a.html
.html.md documents/chap3b.html.md ==> out/chap3b.html
.html.md documents/chap4.html.md ==> out/chap4.html
SKIP DIRECTORY documents/chap5
SKIP DIRECTORY documents/chap5/b
.html.md documents/chap5/b/chap5b.html.md ==> out/chap5/b/chap5b.html
.html.md documents/chap5/chap5.html.md ==> out/chap5/chap5.html
.html.md documents/chap5/chap5a.html.md ==> out/chap5/chap5a.html
.html.md documents/cover.html.md ==> out/cover.html
.html.ejs documents/toc.html.ejs ==> out/toc.html

> epub-skeleton@ postbuild /Users/david/akasharender/epub-skeleton
> epubtools mimetype out && epubtools containerxml out book.yml && epubtools makemeta out book.yml


> epub-skeleton@ bundle /Users/david/akasharender/epub-skeleton
> epubtools package out book.yml

```

# The _epubtools_ command

```
$ epubtools --help

  Usage: epubtools [options] [command]


  Options:

    -V, --version  output the version number
    -h, --help     output usage information


  Commands:

    package <rendered> <bookYaml>       Package an EPUB3 file from a directory
    extract <epubFileName> <dirName>    Extract an EPUB3 file to a directory
    stats <rendered>                    Print text statistics for rendered HTML file in a directory
    words <rendered>                    Print word count statistics for rendered HTML file in a directory
    mimetype <rendered>                 Create an EPUB3 mimetype file in a directory
    containerxml <rendered> <bookYaml>  Create an EPUB3 container.xml file in a directory
    makemeta <rendered> <bookYaml>      Create OPF and NCX files in a directory
    check <rendered>                    Check an EPUB directory for valid HTML
    tohtml <convertYaml>                Convert EPUB to HTML
```


# Building both a website and EPUB

We've already shown that we can reuse the content of an EPUB in an AkashaCMS website.  The build process is a little more complex in this case.  To demonstrate, we'll show the `scripts` section for the greentransportation.info website.

```
"scripts": {
  "prebuild": "akasharender copy-assets config.js",
  "build": "akasharender render config.js",
  "deploy": "cd out && rsync --archive --delete --verbose ./ user-name@web-server-domain.com:sub-directory-for-greentransportation.info/ ",
  "preview": "cd out && ../node_modules/.bin/hostr",
  "clean-range-confidence": "rm -rf out-range-confidence",
  "prebuild-range-confidence": "mkdir -p out-range-confidence && akasharender copy-assets config-ebook-range-confidence.js && globfs copy documents/ev-charging out-range-confidence '**/cover.html'",
  "build-range-confidence": "akasharender render config-ebook-range-confidence.js",
  "postbuild-range-confidence": "rm -rf out-range-confidence/vendor/Viewer.js && epubtools mimetype out-range-confidence && epubtools containerxml out-range-confidence book-range-confidence.yml && epubtools makemeta out-range-confidence book-range-confidence.yml",
  "bundle-range-confidence": "epubtools package out-range-confidence book-range-confidence.yml",
  "rebuild-range-confidence": "npm run clean-range-confidence && npm run build-range-confidence && npm run bundle-range-confidence",
  "check-range-confidence": "java -jar /usr/bin/epubcheck range-confidence.epub",
  "kindle-range-confidence": "~/KindleGen/kindlegen range-confidence.epub"
},
```

The `prebuild`, `build`, `deploy` and `preview` scripts correspond to building the website.  These steps use the website-oriented configuration file, `config.js`, whose RenderDestination is `out`.

The scripts ending with `-range-confidence` correspond to building the eBook.  These steps use a different configuration file, `config-ebook-range-confidence.js`, whose RenderDestination is `out-range-confidence`.  Other than that the steps are largely the same as in the EPUB Skeleton project.

There are two additional steps, `check-range-confidence` and `kindle-range-confidence`.  The first runs the _epubcheck_ tool to verify the EPUB is correct.  The second runs the _KindleGen_ tool to repackage the EPUB into the MOBI format used by Amazon's Kindle online store.
