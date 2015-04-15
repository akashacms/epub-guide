---
layout: page.html.ejs
title: Installing Node.js, AkashaCMS and AkashaEPUB
---

To get AkashaEPUB running there are four major pieces to install.  The steps are fairly simple, fortunately.

These are:
* Node.js ([nodejs.org](http://nodejs.org/)) provides the platform on which AkashaCMS is written
* Grunt ([gruntjs.com](http://gruntjs.com/)) is a build tool that runs on Node.js
* AkashaCMS ([akashacms.com](http://akashacms.com)) is a content management system that produces static HTML websites
* AkashaEPUB ([akashacms.com/plugins/epub.html](http://akashacms.com/plugins/epub.html)) adds the ability to produce EPUBs to the AkashaCMS platform

## Installing Node.js

Node.js runs on pretty much any computer system available.  The official place to download installable bundles is the website - http://nodejs.org/download/ ..  Instructions are available for most systems, and it's very straightforward.

Once Node.js is installed, make sure the npm command is also available:

```
$ node --version
v0.10.38
$ npm --version
1.4.28
```

Next let's install Grunt, a tool for automating build processes.  We use Grunt to build AkashaEPUB books into EPUB format.  See http://gruntjs.com/getting-started for more information

```
$ sudo npm install -g grunt-cli
```

That takes care of installing the Grunt command.  Later on we'll install the other half of Grunt.

## Installing AkashaCMS

Now that Node.js and Grunt is installed we can follow the instructions to install AkashaCMS.  As we said, AkashaCMS is a "content management system" which basically means builds an HTML website from a bunch of documents.  As we'll see, an EPUB file is also a cluster of HTML files, and AkashaEPUB simply adapts AkashaCMS to building HTML and XML files required for an EPUB. -

See http://akashacms.com/install.html for more details on how to install AkashaCMS.

```
$ npm install -g akashacms
$ akashacms init akashacms-example
$ cd akashacms-example
$ npm install
$ akashacms build
$ akashacms preview
```

That first step might need to be done this way, if you get an error message:

```
$ sudo npm install -g akashacms
```

It's useful to glance through the `akashacms-example` directory just created and take a look at the configuration file and other files.

## Installing AkashaEPUB

To make it easier to use AkashaEPUB I've created a skeleton book in the https://github.com/akashacms/epub-skeleton repository.  It has all the basic elements of a "book" including a book cover image (of a skeleton).

```
$ git clone https://github.com/akashacms/epub-skeleton.git
$ mv epub-skeleton newBookName
$ cd newBookName
$ npm install
```

Notice that both `akashacms-epub` and `grunt` was downloaded and installed in the `node_modules` directory.  You can verify the Grunt installation as so

```
$ grunt --version
grunt-cli v0.1.13
```

And, for the impatient among you, you can build the `skeleton.epub` like so:

```
$ grunt doepub
[2015-04-14 19:28:15.998] [INFO] epub - akashacms-epub
Running "useEPUBStylesheets" task

Running "emptyRootOut" task
[2015-04-14 19:28:16.188] [INFO] akashacms - removing out
[2015-04-14 19:28:16.193] [INFO] akashacms - making empty out
... mucho output
Running "bundleEPUB" task
[2015-04-14 19:28:16.845] [INFO] epub - 124034 total bytes
[2015-04-14 19:28:16.845] [INFO] epub - archiver has been finalized and the output file descriptor has closed.

Done, without errors.
```

You can then open `skeleton.epub` with an EPUB reader and view your handiwork.
