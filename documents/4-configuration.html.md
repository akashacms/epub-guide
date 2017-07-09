---
layout: chapter-index.html.ejs
title: Structuring your book
---

AkashaEPUB helps you to organize your book into chapters, and sub-chapters.  You can nest the chapter structure as deeply as you like, and AkashaEPUB will construct the table of contents for you and ensure the reading order of the pages is correct.  Your readers may hate you if the chapter nesting gets too deep, however.

The EPUB standard uses metadata to identify the book, and one or more navigation documents to help the reader navigate the book.  AkashaEPUB generates all that for you.

AkashaEPUB generates that metadata from data you provide, and from the files you put in the filesystem.  Your task is to put book metadata in the `book.yml`, to put chapter & section metadata in the document files, and to put CSS, JavaScript, image and font files in the directories.

As we said earlier, the Gruntfile contains a streamlined version of the AkashaCMS config object.  The `config.js` documentation on the AkashaCMS website ([akashacms.com/configuration/index.html](http://akashacms.com/configuration/index.html)) documents that object, primarily in the context of website configuration.  AkashaEPUB almost eliminates any need to use that config object, unless you have peculiar needs.







# AkashaCMS Directory structure and how it's used in AkashaEPUB


Now that you've seen AkashaEPUB can build an EPUB, let's take a quick tour of how this is done.

AkashaCMS (See [akashacms.com](http://akashacms.com)) forms the basis of AkashaEPUB.  That is, an AkashaEPUB workspace is an AkashaCMS workspace, adapted to creating EPUB's.  

It will help to refer to the source code (See [github.com/akashacms/epub-guide](https://github.com/akashacms/epub-guide) and [github.com/akashacms/epub-skeleton](https://github.com/akashacms/epub-skeleton)) to study a working example.


## AkashaCMS config object and the required directories



## The AkashaEPUB `root_out` is the EPUB directory structure


## Installing npm modules to customize your book

# The AkashaEPUB quick start guide


In <a href="2-installation.html"></a> we built a complete working EPUB with the epub-skeleton "book".

That means it's possible to skip all the details in the rest of this guide book, start your book with epub-skeleton, and just get on with the business of writing.

If you want to do that, do skim through the following two chapters:

* <a href="3-creating-content.html"></a>
* <a href="4-configuration.html"></a>

The files in epub-skeleton are self-explanatory enough to simply use them as an example.  Those two chapters will help you understand how everything fits together.
