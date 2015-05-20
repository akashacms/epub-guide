---
layout: page.html.ejs
title: Installing AkashaCMS, AkashaEPUB
akashacmsEPUB:
    id: chapter2b
---


Now that Node.js and Grunt are installed we can follow the instructions to install AkashaCMS.  

See [akashacms.com/install.html](http://akashacms.com/install.html) for more details on how to install AkashaCMS.  The basic process is:

```
    $ npm install -g akashacms-cli
```

That step might need to be done this way, if you get an error message:

```
    $ sudo npm install -g akashacms-cli
```

The AkashaCMS website gives some additional steps resulting in a sample website, so you can see its ability to build websites.  However, for the purpose of building electronic books we have a couple sample books available for you to build.

## Installing AkashaEPUB

You don't install AkashaEPUB separately.  Instead, it's installed as a plugin to an AkashaCMS workspace.  In a normal AkashaCMS workspace, the plugins are declared in a `config.js` file.  AkashaEPUB supports an extremely simplified configuration method, that can exist entirely within a streamlined `Gruntfile.js`.  

To make it easier to get started with AkashaEPUB, a skeleton book has been created in the [github.com/akashacms/epub-skeleton](https://github.com/akashacms/epub-skeleton) repository.  It has all the basic elements of a "book" including a book cover image (of a skeleton).

This is the recommended process for starting a new book:

```
    $ git clone https://github.com/akashacms/epub-skeleton.git
    $ mv epub-skeleton newBookName
    $ cd newBookName
    $ npm install
```

Notice that when you ran `npm install`, that `akashacms`, `akashacms-epub`, `grunt` and other npm modules were downloaded and installed in the `node_modules` directory.  You can verify the Grunt installation as so

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
