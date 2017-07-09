---
layout: chapter-index.html.ejs
title: Building an EPUB with AkashaEPUB
---

Now that we know how to [install AkashaEPUB](2-installation.html), [how to create content](3-creating-content.html), and [structure our book](4-configuration.html), it's time to use AkashaEPUB to build some books.  What's next is to go over the book building process.

AkashaCMS was designed to build websites, and comes with the `akashacms` command-line tool.  It has several functions related to building websites.  It's functionality doesn't work well to build an EPUB because the process differs so much.  Instead of reworking the `akashacms` tool to support the AkashaEPUB workflow, we use Grunt.  Grunt lets one build any workflow you like, and it can even be used with AkashaCMS websites.

Grunt is a popular build tool for use with Node.js projects (Gulp being the other popular build tool).  The Grunt ecosystem has many relavent plugins for processing JavaScript, HTML, CSS and Image files.  That's exactly what is needed for building an EPUB.

With Grunt, one writes the build process in a file named `Gruntfile.js`.  The Gruntfile contains both configuration data and the build process, described as a series of steps, or tasks.  For AkashaEPUB we use tasks defined by AkashaCMS, AkashaEPUB, and several from the Grunt ecosystem.

Both the epub-skeleton and epub-guide books contain Gruntfile's which successfully build EPUB's (see [github.com/akashacms/epub-skeleton/blob/master/Gruntfile.js](https://github.com/akashacms/epub-skeleton/blob/master/Gruntfile.js) and [github.com/akashacms/epub-guide/blob/master/Gruntfile.js](https://github.com/akashacms/epub-guide/blob/master/Gruntfile.js)).  It's likely you can simply copy one of those Gruntfiles, make a few minor modifications, and get started right away with writing books.

If you followed the [installation process](2-installation.html) correctly, you already have the Grunt toolchain installed.
