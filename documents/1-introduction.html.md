---
layout: page.html.ejs
title: Introduction to AkashaEPUB
---

AkashaEPUB rests on the shoulders of AkashaCMS - http://akashacms.com - a Content Management System which produces static HTML websites.  One day, while preparing content for an electric vehicle buyers guide - http://greentransportation.info/guide/index.html - I had an inspired (or maybe crazy) thought to adapt AkashaCMS to produce EPUB files.  An EPUB file is just some HTML files with additional metadata, meaning that AkashaCMS can generate all those files.

AkashaEPUB is an AkashaCMS plugin for generating EPUB 3 documents.  This guide - see https://github.com/akashacms/epub-guide for its source code - serves as both documentation for AkashaEPUB, and an example of its use.

The key features offered by AkashaEPUB are

* You can write content in Markdown, meaning your words are not trapped inside XML files or inside proprietary word processing systems.  Markdown files are simple text, meaning your words are free to be reused in many ways.
* The system takes care of generating the metadata XML files automatically.  You don't have to learn the ropes of XML nor EPUB's inner workings.
* AkashaCMS is very flexible meaning you can override almost everything if you need to customize how AkashaEPUB generates your book.
* AkashaEPUB and AkashaCMS are open source, meaning you can inspect how it works, you can fix it as needed, and you can contribute fixes back to the respective project maintainers.

I should mention up-front that AkashaEPUB is geek-friendly.  While it attempts to make the process very simple, it's a command line tool and editing the files requires a programmers text editor.  At this time, anyway.  It's plausible to build an in-browser editor and previewer for AkashaEPUB, but that hasn't been done.

The whole system is written in Node.js, a cross-platform programming environment written in JavaScript.  Node.js is becoming popular in the programming community, partly because it takes JavaScript out of the web browser landing it on server computers.  For AkashaEPUB users, the portability means you can use pretty much any computer system to produce books.  While producing this I work alternately on a MacBook Pro (OS X) and a Chromebook (ChromeOS) that's been reconfigured to run Linux.

## Installation

Install Node.js

Install AkashaCMS globally

## Create AkashaCMS work directory

package.json - npm install

config.js

assets

documents

