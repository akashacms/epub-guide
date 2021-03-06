---
layout: ebook-page.html.ejs
title: Validating EPUB files built by AkashaEPUB
---

Now that you've built an EPUB with AkashaEPUB, what will you do with it?  The big opportunity of course are the e-book marketplaces like Amazon's Kindle, Google's Play Store, or Apple's iBooks market.  All of them accept EPUB files either directly or, as is the case with Amazon, through a converter program.  Successfully uploading an EPUB to one of these marketplaces requires that you first validate the EPUB is correctly constructed.

Verifying the EPUB is correctly built removes one layer of uncertainty.  Will an eBook marketplace will correctly handle your EPUB?  You're on firmer ground by validating the EPUB.  Will all EPUB reader applications correctly display your EPUB?  Again, having validated the EPUB you're on firmer ground.  

## epubcheck

The official validation tool is `epubcheck`, developed by the IDPF.  It's a Java program meaning that it's portable to Windows, Mac OS X, Linux, etc.  While there is an npm package for `epubcheck` (see https://www.npmjs.com/package/epubcheck) it's easy enough to install and run via official means.

To install `epubcheck` follow these steps:

* Ensure that Java is installed, and you can run the `java` command at the command line
* Go to the `epubcheck` homepage at [github.com/IDPF/epubcheck](https://github.com/IDPF/epubcheck) to download the latest version
* Click on the Releases link
* Find the first release which isn't an Alpha or Beta
* Click on the download link which ends with ".zip" (e.g. epubcheck-4.0.1.zip)
* Once that downloads extract the .zip file contents

You'll end up with a directory containing `epubcheck-4.0.1.jar` (adjusting for the current version) and some other files.  Open a command line window, and change to the directory where you unpacked `epubcheck`.

First, explore what it can do by getting the help text:

```
$ java -jar epubcheck-4.0.1.jar -help
```

The options we're interested in are these:

```
$ java -jar epubcheck-4.0.1.jar path/to/ebook.epub
```

You can also check the unpacked EPUB this way:

```
$ java -jar epubcheck-4.0.1.jar \
        -mode exp path/to/root_out
```

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

# Fixing common errors

As thorough as _epubcheck_ is, the messages it gives are very difficult to understand.

# Correct `id=` attributes in the Table of Contents

Previously we noted that Table of Contents entries require an `id` attribute, and that attribute is copied into the OPF and NCX files.  This is a simple way to fill in the metadata files with the required values.

The following errors arose, and unfortunately the error message doesn't explain anything useful.

```
ERROR(RSC-005): guide.epub/guide.opf(1,1819): Error while parsing file 'value of attribute "id" is invalid; must be an XML name without colons'.
ERROR(RSC-005): guide.epub/guide.opf(1,1905): Error while parsing file 'value of attribute "id" is invalid; must be an XML name without colons'.
ERROR(RSC-005): guide.epub/guide.opf(1,5091): Error while parsing file 'value of attribute "idref" is invalid; must be an XML name without colons'.
ERROR(RSC-005): guide.epub/guide.opf(1,5141): Error while parsing file 'value of attribute "idref" is invalid; must be an XML name without colons'.
ERROR(RSC-005): guide.epub/toc.ncx(1,1091): Error while parsing file 'value of attribute "id" is invalid; must be an XML name without colons'.
ERROR(RSC-005): guide.epub/toc.ncx(1,1253): Error while parsing file 'value of attribute "id" is invalid; must be an XML name without colons'.
```

On the [mobileread forum](https://www.mobileread.com/forums/showthread.php?t=204542) they discussed this error message and said that such `id` attributes cannot start with a numeric digits.  In this case the ToC had entries like this:

```
<li><a id="3c-content-markup" href="3c-content-markup.html"></a></li>
```

The `id` value does correspond to the file name, which is useful, but also starts with a numeric digit.  Simply changing the `id` to not start with a numeric digit did the trick.
