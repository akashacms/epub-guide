---
layout: page.html.ejs
title: Building an EPUB with AkashaEPUB
---

Now that we know the [AkashaCMS directory structure](2a-akashacms-directory.html), [how to create content](3-creating-content.html), and [configuring AkashaEPUB](4-configuration.html) it's time to study the AkashaEPUB build process.

AkashaCMS comes with the `akashacms` command-line tool that's used when building AkashaCMS websites.  That tool has not been reworked to support AkashaEPUB, and instead we use Grunt.

Grunt is a popular build tool for use with Node.js projects (Gulp being the other popular build tool).  Both AkashaCMS and various plugin modules, including `akashacms-epub`, provide "tasks" which can be strung together, with other Grunt plugins, into a build process.

Both the epub-skeleton and epub-guide books contain example Gruntfile's (see [github.com/akashacms/epub-skeleton/blob/master/Gruntfile.js](https://github.com/akashacms/epub-skeleton/blob/master/Gruntfile.js) and [github.com/akashacms/epub-guide/blob/master/Gruntfile.js](https://github.com/akashacms/epub-guide/blob/master/Gruntfile.js)).

If you followed the [installation process](2-installation.html) correctly, you already have the Grunt toolchain installed.

Those Gruntfile's give you a complete build process.  It's likely you can just use one of those Gruntfile's directly without having to make any modifications.  In case you have some special needs, it's easy to change the Gruntfile to fit those needs.
