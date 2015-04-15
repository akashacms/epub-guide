---
layout: page.html.ejs
title: AkashaCMS Directory structure and how it's used in AkashaEPUB
---

Now that you've seen AkashaEPUB can build an EPUB, let's take a quick tour of how this is done.

AkashaCMS (See [akashacms.com](http://akashacms.com)) forms the basis of AkashaEPUB.  That is, an AkashaEPUB workspace is an AkashaCMS workspace, adapted to creating EPUB's.  

It will help to refer to the source code (See [github.com/akashacms/epub-guide](https://github.com/akashacms/epub-guide) and [github.com/akashacms/epub-skeleton](https://github.com/akashacms/epub-skeleton)) to study a working example.

## AkashaCMS config.js and required directories

Among other things, the AkashaCMS `config.js` declares a set of input directories containing _assets_ (`root_assets`), _partials_ (`root_partials`), _layouts_ (`root_partials`) and _documents_ (`root_docs`) as well as the directory into which to build the result (`root_out`).  These are the typical values

```
module.exports = {
    root_assets: [ 'assets' ],
    root_layouts: [ 'layouts' ],
    root_partials: [ 'partials' ],
    root_out: 'out',
    root_docs: [ 'documents'],
    ...
};
```

You can name any of these directories as you want, but it's best to leave these defaults alone.

The purpose of each are as follows:
* `root_assets`: Contains "asset" files that aren't built, but are simply copied to the `root_out` directory.  Such as image, CSS or font files.
* `root_layouts`: These are templates into which the content is rendered.  The AkashaCMS rendering model is to progressively render content into more comprehensive page containers until the content is rendered into a full page.  The system is quite comprehensive, and is documented at [akashacms.com/layout/index.html](http://akashacms.com/layout/index.html).  For AkashaEPUB we probably only need simple layouts.
* `root_partials`: Partials are similar to the templates, but can be thought of as content snippets that can be inserted inline a document.
* `root_docs`: Contains the content documents
* `root_out`: AkashaCMS builds the rendered website (or EPUB for AkashaEPUB) into this directory

## The AkashaEPUB `root_out` is the EPUB directory structure

After building the EPUB, the `root_out` directory contains the rendered files, with AkashaEPUB arranging for that directory to be correctly structured as an EPUB.  The `bundleEPUB` task takes care of creating the EPUB file from that directory.

The contents of the `root_assets` and `root_docs` directories (there can be multiple instances of each) map directly to the `root_out` directory.  For example, `root_assets/css/style.css` is copied directly to `root_out/css/style.css` with no processing.  Likewise, `root_docs/1-introduction.html.md` is copied to `root_out/1-introduction.html` after being processed to render it into a full HTML page.

EPUB's are a mix of HTML files, CSS, Images and metadata files in XML format.  You do not create the metadata files.  Instead, AkashaEPUB creates them for you from metadata you enscribe in the `config.js`.

## Installing npm modules to customize your book

Because AkashaCMS is built with the Node.js platform, any additional modules to be installed must be declared in a `package.json` file, and then installed using npm.  Those files land in a directory named `node_modules`.
