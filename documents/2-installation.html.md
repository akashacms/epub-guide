---
layout: chapter-index.html.ejs
title: Installing the AkashaEPUB toolchain
chapterNumber: 2
sections:
  - url: 2a-install-nodejs.html
  - url: 2b-install-akashacms.html
  - url: 2c-akashacms-directory.html
  - url: 2d-quickstart.html
---

As we said in the previous chapter, AkashaEPUB is geek-friendly software.  It's use (currently) means using a programmers text editor to write the Markdown, and running command-line programs to generate your EPUB.  The model is familiar to anybody who writes code.

Since AkashaEPUB is a Node.js/Grunt based tool, the installation process is to first install Node.js, then to use npm to install Grunt, AkashaCMS and AkashaEPUB.

These components are are:
* Node.js ([nodejs.org](http://nodejs.org/)) provides the platform on which AkashaCMS is written
* Grunt ([gruntjs.com](http://gruntjs.com/)) is a build tool that runs on Node.js
* AkashaCMS ([akashacms.com](http://akashacms.com)) is a content management system that produces static HTML websites
* AkashaEPUB ([akashacms.com/plugins/epub.html](http://akashacms.com/plugins/epub.html)) adds the ability to produce EPUBs to the AkashaCMS platform

Beyond that software you will need a programmer-friendly plain text editor.  I switch between a Mac OS X laptop and a Chromebook on which I've installed Crouton to run Ubuntu Linux.  Both systems have a bash shell command line environment, and thanks to the efforts by the Ubuntu and MacPorts communities the same command-line tools.  This software hasn't been tested on a Windows machine, but in theory it should work (knock on wood).

For a text editor I've used Komodo and BBEdit at various times.  However, one should take a look at the Chrome packaged applications because that app ecosystem is improving rapidly.  The "Ra" text editor, a Chrome packaged application, is very good.

In the following sections we'll quickly take you through installing these pieces, and then we'll quickly run through building a sample EPUB with AkashaEPUB.
