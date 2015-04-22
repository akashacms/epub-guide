---
layout: page.html.ejs
title: Structuring your book 
---

AkashaEPUB helps you to organize your book into chapters, and sub-chapters.  You can nest the chapter structure as deeply as you like, and AkashaEPUB will construct the table of contents for you and ensure the reading order of the pages is correct.  Your readers may hate you if the chapter nesting gets too deep, however.

The EPUB standard uses metadata to identify the book, and one or more navigation documents to help the reader navigate the book.  AkashaEPUB generates all that for you.

AkashaEPUB has to be given data about the chapter structure, metadata, and asset files (images, stylesheets, and font files).  Your task is to describe all that in the `config.js` file (the AkashaCMS configuration file).  The `config.js` documentation on the AkashaCMS website ([akashacms.com/configuration/index.html](http://akashacms.com/configuration/index.html)) is primarily concerned with the configuration of websites.  For AkashaEPUB we construct a data object, as described in this chapter, describing the book chapter structure and asset files.    Sample `config.js` files are in the epub-skeleton and epub-guide repositories, which you can copy for your own use.  

It's useful to study the config file for this guide to learn what to do. ([github.com/akashacms/epub-guide/blob/master/config.js](https://github.com/akashacms/epub-guide/blob/master/config.js))

This configuration data is used by AkashaEPUB to generate correct EPUB metadata files.  

The `config.js` is a Node.js module where the primary use to hold configuration data rather than code.  It can, and does, contain some executable code.  You probably won't need to write any code in your `config.js`, especially if you follow our recommendation to copy the epub-skeleton or epub-guide `config.js`.  You do have the freedom to write code in your `config.js`, if desired.  Just be warned that you'll need to know Node.js to do so.

* [](4a-akashacmsEPUB.html)
* [](4b-book-metadata.html)
* [](4c-cover-image.html)
* [](4d-table-contents.html)
* [](4e-copyright-page.html)
* [](4f-assets.html)
* [](4g-stylesheets.html)
* [](4h-fonts.html)
* [](4i-configjs.html)


