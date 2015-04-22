---
layout: page.html.ejs
title: Chapters, sub-chapters, and the Table of Contents
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



