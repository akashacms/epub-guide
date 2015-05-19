---
layout: page.html.ejs
title: Chapters, sub-chapters, and the Table of Contents
akashacmsEPUB:
    id: chapter4d
---

We structure book content into chapters and sub-chapters.  It's more than just a hold-over from print books, it's a good way to divide books into topical sections.  

The implementation in EPUB is

* The OPF file contains a linear flat list of links to HTML pages
* The NCX file (optional, and deprecated) contains a tree structured list of links to HTML pages
* The Navigation Document is an HTML file, that appears in the reading order of the book pages, containing nested OL lists linking to the HTML pages.  This file also has HTML5 markup allowing EPUB reader software to treat it as data.

AkashaEPUB generates all this from a tree-structured array of objects describing the HTML files comprising the book.

Consider:

```
chapters: [
    {
        id: "chapter1",
        title: "Introduction to AkashaEPUB",
        href: "1-introduction.html",
        type: "application/xhtml+xml",
        navclass: "book"
        
    },
    {
        id: "chapter2",
        title: "Installing Node.js, AkashaCMS and AkashaEPUB",
        href: "2-installation.html",
        type: "application/xhtml+xml",
        navclass: "book",
        
        subchapters: [
            {
            id: "chapter2a",
            title: "Installing Node.js, Grunt",
            href: "2a-install-nodejs.html",
            type: "application/xhtml+xml",
            navclass: "book"
            },
        ...
        ]
    },
...
]
```

Each item in the `chapters` array has a list of fields with fairly obvious meanings.  Any chapter with subchapters has an array named `subchapters`, whose items have the same fields, and which in turn can have `subchapters` of their own.  This can be nested as deeply as you like.

The fields are:

* `id` - The identifier for this chapter within the scope of the NCX and OPF files.  It must be unique.
* `title` - The chapter title is dynamically replaced at runtime with the title from the file metadata.
* `href` - Link to the rendered file.
* `type` - It's MIME type, which will almost certainly be `application/xhtml+xml`.
* `navclass` - Used solely for the NCX file, and is the class attribute of navPoint elements.

The linearized version of this list becomes the `manifest` entry in the OPF file.  The nested structure becomes the OL lists in the HTML navigation document, and the nested `navMap` elements in the NCX file.  In [](4a-akashacmsEPUB.html) we went over how to tell AkashaEPUB the file names for these files.

# The `contents` object

In addition to the `chapters` array, the `contents` object describes additional parameters for the various forms the Table of Contents can take.  Consider this `contents` object used for this guide.

```
    contents: {
        id: "toc",
        title: "Table of Contents",
        subtitle: undefined,
        href: "toc.html",
        path: "toc.html.ejs",
        type: "application/xhtml+xml",
        toclayout: "epub_page.html.ejs",
        
        toctype: "1",
        tocstart: "0",
        
        ncx: {
            id: "ncx",
            href: "toc.ncx"
        }
    },
```

The `id` attribute is used for the OPF manifest for the HTML generated Table of Contents, and the `type` attribute is added to that manifest entry.  The `title` and `subtitle` (if present) are used within that file.  The `href` parameter is the filename into which it is rendered. 

The HTML Table of Contents is generated from an in-memory virtual file.  AkashaEPUB pretends it had been stored on disc as the file named in `path`, with the `layout` tag specified in `toclayout`.

The top-level OL of the HTML Table of Contents can have its numbering style controlled by `toctype` and `tocstart`.  These attributes become `<ol type=".." start="..">...</ol>`.

Hence, the values for toctype are:

* '1' - decimal
* 'a' - lower-case alpha
* 'A' - upper-case alpha
* 'i' - lower-case roman numerals
* 'I' - upper-case roman numerals

As shown here the top-level OL will start at '0', and that's to make the Copyright page into "Chapter 0" and to have Chapter 1 be numbered as '1' in the HTML Table of Contents.

The `ncx` attribute is used to control whether an NCX file is generated, and if it is what its file name will be.
