---
layout: page.html.ejs
title: Introduction to AkashaEPUB
---

AkashaEPUB is a system for publishing books in the EPUB3 format.  EPUB is a widely used electronic book publishing format designed by the International Digital Publishing Forum.  There is a large and growing ecosystem of reading devices and software which can consume EPUB files.  Further, it allows you to publish books through electronic book markets like the Google Play Store, and Apple's iBook store.  Amazon's Kindle marketplace can accept EPUB files by using the KindleGen program to convert EPUBS to its own MOBI format.

AkashaEPUB is an AkashaCMS plugin.  AkashaCMS is a general "content management system" for building static HTML websites.  That is, AkashaCMS is a static site generator.  The commonality is that, under the covers, EPUB3 format ebooks and share lots of technology with websites.  An EPUB file is just a clump of XHTML files packaged along with some XML files containing metadata.  That fact makes it possible to repurpose a static site generator to create EPUB files, as has been done with AkashaEPUB.  

This guide - see [github.com/akashacms/epub-guide](https://github.com/akashacms/epub-guide) for its source code - serves as both documentation for AkashaEPUB, and an example of its use.  Please submit corrections or new documentation ideas through Github, and see [](6-akashacms-project.html) to learn about the AkashaCMS project.

The key features offered by AkashaEPUB are

* You can write content in Markdown.  Your words aren't trapped inside XML files or inside proprietary word processing systems.  Markdown files are simple text, meaning your words are free to be reused in many ways.
* The system takes care of generating the metadata XML files automatically.  You don't have to learn the ropes of XML nor EPUB's inner workings.
* AkashaCMS is very flexible meaning you can override almost everything if you need to customize how AkashaEPUB generates your book.
* With a little work, it would be possible to publish the content as both a book and website simultaneously
* AkashaEPUB and AkashaCMS are open source, meaning you can inspect how it works, you can fix it as needed, and you can contribute fixes back to the project.

It's possible to construct an EPUB completely by hand.  The XHTML and XML for these files aren't terribly difficult, and some people use web page editing software like Dreamweaver.  With AkashaEPUB the author has a simplified model for writing the content and metadata, with AkashaEPUB taking care of the gronky details of correct XHTML and XML.

I should mention up-front that AkashaEPUB is geek-friendly.  While every effort has been made to simplify using AkashaEPUB, it is a command line tool and editing the files requires a programmers text editor.  

The whole system is written in Node.js, a cross-platform programming environment written in JavaScript.  Node.js is becoming popular in the programming community, partly because it takes JavaScript out of the web browser landing it on server computers.  That portability means you can use pretty much any computer system to produce books.  For example I routinely switch between a MacBook Pro (running Mac OS X) and a Chromebook that's been hacked (with Crouton) to run Linux.  I have Node.js and AkashaCMS/AkashaEPUB installed on both systems, can edit the same files on either, and use the same command line on either to build the book.

AkashaEPUB rests on the shoulders of AkashaCMS - [akashacms.com](http://akashacms.com) - a Content Management System which produces static HTML websites.  One day, while preparing content for an electric vehicle buyers guide - [greentransportation.info/guide/index.html](http://greentransportation.info/guide/index.html) - I had an inspired (or maybe crazy) thought to adapt AkashaCMS to produce EPUB files.  Thinking that an EPUB file is just some HTML files with additional metadata, I realized that AkashaCMS can generate all those files.  Along the way it meant several useful architectural changes in AkashaCMS.  This book is proof that the concept was valid, and that it's fairly easy to use.

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

