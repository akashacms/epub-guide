---
layout: page.html.ejs
title: Introduction to AkashaEPUB
---

The last few years have seen an explosion in electronic books to where it's become a mainstream thing.  Several large marketplaces exist for selling electronic books, and the rapidly growing number of apps for reading eBooks is giving us all more choice than ever.  It's given authors an opportunity to skip the traditional book distribution channels, go more-or-less direct to the consumer, while making it easier for an author to get started.

A key factor in this is the EPUB book publishing format.  In its third version, EPUB3, it is a ZIP archive containing XHTML files along with images, CSS and metadata.  By reusing open standards from the Web, it's fairly easy to create EPUB publications reusing normal web-centric tools.  One "just" creates suitable XHTML, CSS and image files, keeping in mind certain limitations imposed by the EPUB model, and voila you have an electronic book.

If only it were quite that simple.  While simple in concept there are enough moving parts to get exactly right that software tools are very helpful.  The typical recommended processes are

* Use a Word Processor like Microsoft Word, Libre Office, or Pages to create one or more documents.  The Kindle market will directly accept Word files, for example, or else you export them to HTML and do further processing.
* Use a special purpose E-Book editing application like Vellum

What about those of us who prefer open source tools, or chafe at the thought of using a big heavy Word Processor?  What about having good control over the metadata inside the EPUB? 

AkashaEPUB is an open source system for publishing books in the EPUB3 format.  Authors write their content using Markdown or HTML (more formats to be added in the future).  A very simple data object describes the book structure, asset files, and metadata.  A simple process, written in a Grunt build file, drives a Node.js based toolchain to produce an EPUB3 file.

AkashaEPUB is an AkashaCMS plugin, and AkashaCMS in turn is a general "content management system" for building static HTML websites.  In some circles that makes AkashaCMS a static site generator.  Essentially AkashaEPUB tricks AkashaCMS into producing the XHTML files and XML metadata required for EPUB3 format ebooks.  This works because AkashaCMS's core competency is producing such files.

EPUB is a widely used electronic book publishing format designed by the International Digital Publishing Forum.  There is a large and growing ecosystem of reading devices and software which can consume EPUB files.  Further, it allows you to publish books through electronic book markets like the Google Play Store, and Apple's iBook store.  Amazon's Kindle marketplace can accept EPUB files by using the KindleGen program to convert EPUBS to its own MOBI format.

AkashaEPUB makes it possible to produce a correctly structured EPUB3 document.  You can distribute it to others, confident it can be read on whatever device they have, or put on sale in electronic book markets.

This guide - see [github.com/akashacms/epub-guide](https://github.com/akashacms/epub-guide) for its source code - serves as both documentation for AkashaEPUB, and an example of its use.  Please submit corrections or new documentation ideas through Github, and see [](6-akashacms-project.html) to learn about the AkashaCMS project.

The key features offered by AkashaEPUB are

* You can write content in Markdown.  Because Markdown files are simple text, your words aren't trapped inside XML files or proprietary word processing documents.  Instead, your words are free to be reused in many ways.
* The system takes care of generating the metadata XML files automatically.  You don't have to learn the ropes of XML nor EPUB's inner workings.
* AkashaCMS is very flexible meaning you can override almost everything if you need to customize how AkashaEPUB generates your book.
* With a little work, it would be possible to publish the content as both a book and website simultaneously
* AkashaEPUB and AkashaCMS are open source, meaning you can inspect how it works, you can fix it as needed, and you can contribute fixes back to the project.

It's possible to construct an EPUB completely by hand.  The XHTML and XML for these files aren't terribly difficult to create, especially with web page editing software like Dreamweaver.  But learning to do this correctly means studying the nuances of several standards documents and hoping you remember to get every last detail correct.

Instead, AkashaEPUB offers the author a simplified model for writing the content and metadata.  The gronky details of correct XHTML and XML are handled by the system.

I should mention up-front that AkashaEPUB is geek-friendly.  While every effort has been made to simplify using AkashaEPUB, it is a command line tool and editing the files is best in a programming-oriented text editor.  

The whole system is written in Node.js, a cross-platform programming environment written in JavaScript.  Node.js is becoming popular in the programming community, partly because it takes JavaScript out of the web browser landing it on server computers.  That portability means you can use pretty much any computer system to produce books.  For example I routinely switch between a MacBook Pro (running Mac OS X) and a Chromebook that's been hacked (with Crouton) to run Linux.  I have Node.js and AkashaCMS/AkashaEPUB installed on both systems, can edit the same files on either, and use the same command line on either to build the book.

AkashaEPUB rests on the shoulders of AkashaCMS - [akashacms.com](http://akashacms.com) - a Content Management System which produces static HTML websites.  One day, while preparing content for an electric vehicle buyers guide - [greentransportation.info/guide/index.html](http://greentransportation.info/guide/index.html) - I had an inspired (or maybe crazy) thought to adapt AkashaCMS to produce EPUB files.  Vaguely remembering that an EPUB file is just some HTML files with additional metadata, I realized that AkashaCMS can generate all those files.  Within a few days I'd read enough of the specifications and sample EPUB's to get the first version of AkashaEPUB running, and to produce a sample EPUB.  Since then the software and EPUB spec's have been gone over carefully, and the result is a simple-to-use system that's producing good EPUB's.  Along the way it meant several useful architectural changes in AkashaCMS.  This book is proof that AkashaEPUB does what it says on the lable, and that it's fairly easy to use.

# Why use AkashaEPUB?

There are many tools on the market for producing EPUB files.  Why should you choose AkashaEPUB when all your friends says Jutoh or Vellum or Libre Office or whatever is the best way to go?

You are of course free to do as you wish.  Those other tools have their place as does a system like AkashaEPUB.  AkashaEPUB should appeal to certain values like:

* The freedom to freely reuse your words in many ways
* The freedom to build your own tools, or to know precisely how they work 
* The freedom to use the computer operating system of your choice
* Participation in the open source ecosystem
* Democratizing the publishing system so anybody can participate, even those of limited means
* A publishing system that could be integrated into other systems - such as a software build system that automatically generates a documentation EPUB
* The freedom to use lightweight appropriately sized tools - AkashaEPUB files are edited with simple text editor, and built at the command line
* The familiarity of using the same tools, text editors, command lines, etc, that are used in writing code, to write a book.

Those of us who write code for a living are more comfortable in a programmers text editor, doing things at the command line, and chafe at GUI-heavy Word Processors like Microsoft Word or Libre Office.  AkashaEPUB fits the typical programmer tools preferences like a glove.

