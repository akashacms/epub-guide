---
layout: chapter-index.html.ejs
title: Building an EPUB with AkashaEPUB
---

Now that we know how to [install AkashaEPUB](2-installation.html), [how to create content](3-creating-content.html), and [structure our book](4-configuration.html), it's time to use AkashaEPUB to build some books.  What's next is to go over the book building process.

AkashaEPUB refers to the combination of AkashaRender, the EPUB-related plugins, and _epubtools_.  The recommended workflow uses these tools, driven by commands in the `scripts` section of the `package.json`.  You're of course free to use a different build process.  The process we'll describe here is easy and convenient.

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