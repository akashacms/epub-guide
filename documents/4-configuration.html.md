---
layout: chapter-index.html.ejs
title: Structuring your book
akashacmsEPUB:
    id: chapter4
    sections:
        - 4a-akashacmsEPUB.html
        - 4b-book-metadata.html
        - 4c-cover-image.html
        - 4d-table-contents.html
        - 4e-copyright-page.html
        - 4f-links.html
        - 4g-assets.html
        - 4h-stylesheets.html
        - 4i-fonts.html
chapterNumber: 4
---

AkashaEPUB helps you to organize your book into chapters, and sub-chapters.  You can nest the chapter structure as deeply as you like, and AkashaEPUB will construct the table of contents for you and ensure the reading order of the pages is correct.  Your readers may hate you if the chapter nesting gets too deep, however.

The EPUB standard uses metadata to identify the book, and one or more navigation documents to help the reader navigate the book.  AkashaEPUB generates all that for you.

AkashaEPUB generates that metadata from data you provide, and from the files you put in the filesystem.  Your task is to put book metadata in the `book.yml`, to put chapter & section metadata in the document files, and to put CSS, JavaScript, image and font files in the directories.

As we said earlier, the Gruntfile contains a streamlined version of the AkashaCMS config object.  The `config.js` documentation on the AkashaCMS website ([akashacms.com/configuration/index.html](http://akashacms.com/configuration/index.html)) documents that object, primarily in the context of website configuration.  AkashaEPUB almost eliminates any need to use that config object, unless you have peculiar needs.

It's useful to study the Gruntfile for this guide to learn what to do. ([github.com/akashacms/epub-guide/blob/master/Gruntfile.js](https://github.com/akashacms/epub-guide/blob/master/Gruntfile.js))


