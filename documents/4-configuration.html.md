---
layout: page.html.ejs
title: Configuration files for AkashaEPUB projects
---

Any AkashaCMS project requires two configuration files:

* `package.json` contains Node.js dependencies, a `scripts` section for command strings, and various bits of metadata like a project home page or source code repository
* The _Configuration_ object, usually in a file named `config.js`, describing the project to AkashaCMS

AkashaEPUB projects have another configuration file, the publishing metadata that's contained a YAML file typically called `book.yml`.

In this chapter we'll go over all three.


# AkashaRender Configuration file and `package.json`

The configuration of any AkashaRender/AkashaCMS project is split between the Configuration file and the `package.json`.  The latter is used by `npm` and the Node.js platform to list package `dependencies`, the available `scripts` for performing actions related to the project, and various metadata items like project owner identification or the projects home page.  For an AkashaEPUB project, the `scripts` section can be used to describe the build process, while the `dependencies` will list the EPUB-related AkashaCMS plugins.

The Configuration file, typically named `config.js`, is a Node.js module that produces an AkashaRender _Configuration_ object.  While the Configuration object can be created any way you like, it's most to use a `config.js` file.  There's nothing special about that file name, and it can be named anything you like.  In fact the project can have multiple Configuration files for different purposes.

More details about AkashaRender project configuration are at: https://akashacms.com/akasharender/configuration.html

Here's a couple `config.js` files for EPUB's:

* This book:  https://github.com/akashacms/epub-guide/blob/master/config.js
* The EPUB Skeleton: https://github.com/akashacms/epub-skeleton/blob/master/config.js



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

This is a fairly simple configuration file.  They can grow to be rather complex depending on your needs.  We pull in the `akasharender` module, then instantiate a Configuration object, call some methods, and assign the object to `module.exports`.  The last step makes the Configuration object available to AkashaRender.

The first set of methods, `addAssetsDir` and the others, inform AkashaRender what directories to use for certain purposes.

The second set, `use`, informs AkashaRender the AkashaCMS plugins to use.  In the `use` call we pass in the result of `require("plugin-name")` so that AkashaRender receives the module object.  There must be a corresponding entry in `package.json` for each of these so that we can easily use `npm` to download the dependencies required to build the book.

An AkashaCMS plugin will modify AkashaRender's execution to add new capabilities.  The most common is for plugins to add a Partials directory, and to add new custom DOM processing and custom tag functions using the Mahabhuta DOM-processing engine.  The two plugins listed here are especially useful for EPUB's:

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

The AkashaRender Configuration file allows for quite a lot of flexibility.  Sometimes a project will require multiple Configuration files, each one serving a different purpose.

Suppose you have a little guidebook about using some software like AkashaRender.  You might want that guidebook to be available on a website such as at https://akashacms.com/akasharender/toc.html.  And you may also want to publish that guidebook as a standalone EPUB.  Closer to home, this book you're reading right now is both published online at https://akashacms.com/epubtools/toc.html and as a book in the Kindle marketplace.

We'll go over the details elsewhere.  For now, let's do a brief overview.

This goal means you have two AkashaRender projects:

1. One project covers publishing the entire website containing the guidebook.
1. The other project covers formatting just the guidebook content as an EPUB.

It can be instructive to puzzle out how AkashaCMS.com is structured.  It pulls together content from every plugin with multiple Documents directories, but that complexity will only hinder our discussion.  Instead I'll describe how another site, https://greentransportation.info/ is configured, with a guidebook at https://greentransportation.info/ev-charging/toc.html that is also published in the Kindle marketplace.

The `config.js` for the greentransportation.info website rendering has these two Documents directories:

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

The first documents directory contains the main website content.  The second contains the content for the electric vehicle charging e-Book.  But it's a little bit different.

The `addDocumentsDir` function can take an object like this.  This object says the files in the directory `ev-charging` are rendered into the `ev-charging` subdirectory of the RenderDestination.  The `baseMetadata` segment adds to the metadata used with each document.  Because the `ev-charging` content needed additional metadata, it had to be kept in a separate directory in order to specify that metadata.

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

# Publishing metadata - `book.yaml`

The third configuration file is used by _epubtools_ and contains the metadata required for the XML files that are tucked inside the EPUB.  What _epubtools_ does is to automatically generate those XML files for you from data it gathers from the content files and from this metadata file.

This is from the EPUB Skeleton project https://github.com/akashacms/epub-skeleton/blob/master/book.yml

```
opf: skeleton.opf
epub: skeleton.epub

title: Skeletal AkashaEPUB book
languages: [ en ]
identifiers:
    - unique: true
      idstring: "urn:uuid:b624d2ee-e88a-11e4-b0db-376a7655914b"
published:
    date: "2017-07-06T22:15:14Z"
creators:
    - id: author
      name: John Smith
      nameReversed: Smith, John
publisher: AkashaCMS.COM
subjects: [ "Reference" ]
rights: "Public Domain"

cover:
    writeHtml: { id: "cover", href: "cover.html" }
    idImage: "cover-image"
    src:  "images/Human-Skeleton.jpg"
    alt:  "AkashaEPUB Skeleton Book"
    type: "image/jpeg"

toc: { id: "toc", href: "toc.html" }
ncx: { id: "ncx", href: "toc.ncx"  }
```

The entries should be fairly self-explanatory.  We'll go over these in more detail later in the book, but let's say a few things here.

The `opf` item controls the name of the OPF file that's embedded inside the EPUB.  The `ncx` item likewise controls the name of the NCX file.  Both these files are auto-generated by _epubtools_.  While _epubtools_ could have been opinionated and declared the name for each of these files, we decided to instead let the book author do so.

The `title` in this file can be different from the `title` elsewhere in the book, for example in the `<title>` tag of content pages.  This `title` is what an EPUB marketplace like the Kindle store will show to customers.

The `identifiers` section is for listing things like an ISBN number.  Since ISBN numbers aren't terribly useful for electronic books, _epubtools_ does not currently support ISBN numbers.  It supports other kinds of URN's, like the UUID shown here.

The best documentation I've found for YAML is at https://en.wikipedia.org/wiki/YAML
