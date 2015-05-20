---
layout: page.html.ejs
title: Validating EPUB files built by AkashaEPUB 
akashacmsEPUB:
    id: chapter5b
---

Now that you've built an EPUB with AkashaEPUB, what will you do with it?  The big opportunity of course are the e-book marketplaces like Amazon's Kindle, Google's Play Store, or Apple's iBooks market.  All of them accept EPUB files either directly or, as is the case with Amazon, through a converter program.  

While verifying the EPUB document is properly constructed is a good practice, it's doubly so when approaching one of these commercial markets.  Verifying the EPUB is correctly built removes one layer of uncertainty if certain EPUB reader software fails to display your EPUB.  

## epubcheck

The official validation tool is `epubcheck`, developed by the IDPF.  It's a Java program meaning that it's portable to Windows, Mac OS X, Linux, etc.

To install `epubcheck` follow these steps:

* Ensure that Java is installed, and you can run the `java` command at the command line
* Go to its homepage at [github.com/IDPF/epubcheck](https://github.com/IDPF/epubcheck) to download the latest version
* Click on the Releases link 
* You'll need to find the first release which isn't an Alpha or Beta - at the time of this writing that's version 3.0.1
* Click on the download link which ends with ".zip" (e.g. epubcheck-3.0.1.zip)
* Once that downloads extract the .zip file contents

You'll end up with a directory containing `epubcheck-3.0.1.jar` (adjusting for the current version) and some other files.  Open a command line window, and change to the directory where you unpacked `epubcheck`.

First, explore what it can do by getting the help text: 

```
$ java -jar epubcheck-3.0.1.jar -help
```

The options we're interested in are these:

```
$ java -jar epubcheck-3.0.1.jar \
        path/to/ebook.epub
```

You can also check the unpacked EPUB this way:

```
$ java -jar epubcheck-3.0.1.jar \
        -mode exp path/to/root_out
```

There is what appears to be a spurious error message:

```
ERROR: guide.epub: Mimetype contains wrong type (application/epub+zip expected).
```

The `mimetype` file does have that exact text in it, but the tool prints this error.  Scratch head, mutter "idunno" ...

## GUI app's incorporating epubcheck

The `epubcheck` Wiki has a page listing GUI applications that make the process easier.

The **pagina EPUB Checker** (see [www.pagina-online.de/produkte/epub-checker/](http://www.pagina-online.de/produkte/epub-checker/)) is a GUI application to run `epubcheck`.  It's also a Java program, but is packaged properly for Windows, Mac and Linux for easy installation.  Once the application is installed, simply double-click its icon and then follow the instructions in the window which opens.  It automatically checks the EPUB once you've opened it.

For Mac OS X one can find a free application, **ePub Checker**, in the Mac OS X App Store.  Once you've installed the application, simply launch the app and then use it to open your EPUB file.  It automatically runs a check, displaying any error or warning messages in the window.  A nice feature is the button to recheck the file without having to restart the application.  Unfortunately it appears to be checking against EPUB version 2 and not the EPUB version 3 which AkashaEPUB produces.  That means ePub Checker shows a lot of problems with EPUB's produced by AkashaEPUB, but those problems are because AkashaEPUB uses EPUB3 features that would be an error for EPUB2.

## KindleGen

Amazon.com provides this tool to package books for the Kindle bookstore.  If your goal is to chase the self-publishing dream you need this application because you'll be uploading books to the Kindle marketplace.  Get it and install it, they provide versions for Windows, Mac OS X and Linux.

The validation process is to use KindleGen to convert the EPUB into the Kindle MOBI format.  Add the `-verbose` flag so it'll tell you everything, like so:

```
$ /path/to/KindleGen/kindlegen \
        /path/to/ebook.epub \
        -verbose
```


