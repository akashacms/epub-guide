---
layout: ebook-page.html.ejs
title: Introduction to AkashaEPUB
---

The last few years have seen an explosion in electronic books.  Several large marketplaces exist for selling electronic books, and the rapidly growing number of eBook reading apps and devices is giving us all more choice than ever.  It's given authors an opportunity to skip traditional book distribution channels, go more-or-less direct to the consumer, while making it easier to get started writing books.

A key factor in this is the EPUB book publishing format.  In its third version, EPUB3, it is a ZIP archive containing XHTML files along with images, CSS and metadata.  The major advance in EPUB3 was to adopt most of HTML5 and CSS3, from the leading edge of web technology.  By reusing open standards from the Web, we can reuse tools from the website publishing world to create EPUB publications.  One "just" creates suitable XHTML, CSS and image files, keeping in mind certain limitations imposed by the EPUB model, and voila you have an electronic book.

If only it were quite that simple.  There are several moving parts involved, with files that have to be perfectly constructed.  Therefore good software tools are very helpful investment, to avoid the overhead of all the details.  The typical recommended tools are

* Use a Word Processor like Microsoft Word, Libre Office, or Pages to create one or more documents.  Then one either uploads the Word file directly to the Kindle, or else one export the document to HTML and does further processing.
* Use a special purpose E-Book editing application like Vellum

What about those of us who prefer open source tools, or chafe at the thought of using a big heavy Word Processor?  What about having good control over the metadata inside the EPUB?  What about submitting books to a marketplace which doesn't accept Word documents?  What about creating content while traveling with a tablet computer?  What about books that incorporate data from elsewhere?  What about creating an identical website and book at the same time from the same content?

Using a Word Processor to write electronic books is not a "one size fits all" solution.

AkashaEPUB is an open source system for publishing books in the EPUB3 format.  Authors write their content using Markdown or HTML (more formats to be added in the future) using a simple text editor.  A simple YAML data object describes the book metadata, and other information is automatically gathered from the document and asset files.  Content is processed using a jQuery-based HTML processing engine, allowing you to invent custom tags for any use.  A simple build process drives a Node.js based toolchain to produce an EPUB3 file.  The resulting file passes muster with `epubcheck`, the gold standard in verifying EPUB3 conformance.

In other words, AkashaEPUB has a lightweight process, that's open and flexible, while giving the author the power to produce proper EPUB3 files with precise control over the book metadata.

AkashaEPUB (https://akashacms.com/epubtools/toc.html) is an AkashaCMS plugin, and AkashaCMS (https://akashacms.com) in turn is a general "content management system" for building static HTML websites.  In some circles that makes AkashaCMS a static site generator.  Essentially AkashaEPUB tricks AkashaCMS into producing the XHTML files and XML metadata required for EPUB3 format ebooks.  

AkashaCMS and AkashaEPUB is not the name of a specific piece of software.  Instead they are loose terms referring to the combination of AkashaRender and the plugins.  The combination of AkashaRender with the plugins intended on website development, is called AkashaCMS.  Combining it with the plugins for EPUB development, including _epubtools_, is called AkashaEPUB.

EPUB is a widely used electronic book publishing format designed by the International Digital Publishing Forum.  There is a large and growing ecosystem of reading devices and software to consume EPUB files.  Further, it allows you to publish books through electronic book markets like the Google Play Store, and Apple's iBook store.  Amazon's Kindle marketplace can accept EPUB files by using the KindleGen program to convert EPUBS to its own MOBI format.

AkashaEPUB makes it possible to produce a correctly structured EPUB3 document.  You can distribute it to others, confident it can be read on whatever device they have, or put on sale in electronic book markets.

This guide - see [github.com/akashacms/epub-guide](https://github.com/akashacms/epub-guide) for its source code - serves as both documentation for AkashaEPUB, and an example of its use.  Please see [](7-akashacms-project.html) to learn about the AkashaCMS project.

The key features offered by AkashaEPUB are

* _You can write content in Markdown._  Because Markdown files are simple text, your words aren't trapped inside XML files or proprietary word processing documents.  Instead, your words are free to be reused in many ways.
* _The system takes care of generating the metadata XML files automatically._  You don't have to learn the ropes of XML nor EPUB's inner workings.
* _AkashaCMS is very flexible_ meaning you can override almost everything if you need to customize how AkashaEPUB generates your book.
* _Publishing to both website and EPUB._  With a little work, it would be possible to publish the content as both a book and website simultaneously
* _AkashaEPUB and AkashaCMS are open source,_ meaning you can inspect how it works, you can fix it as needed, and you can contribute fixes back to the project.

It's possible to construct an EPUB completely by hand.  The XHTML and XML for these files aren't terribly difficult to create, especially with web page editing software like Dreamweaver.  But learning to do this correctly means studying the nuances of several standards documents and hoping you remember to get every last detail correct.

Instead, AkashaEPUB offers the author a simplified model for writing the content and metadata.  The gronky details of correct XHTML and XML are handled by the system.

I should mention up-front that AkashaEPUB is geek-friendly.  While every effort has been made to simplify using AkashaEPUB, it is a command line tool and editing the files is best done in a programming-oriented text editor.  

# Implementation

<img src="akashacms-logo.gif" style="float: right"/>The whole system is written in Node.js, a cross-platform programming environment written in JavaScript.  Node.js is becoming popular in the programming community, partly because it takes JavaScript out of the web browser to live on server computers.  Node.js isn't just for server web-applications, because it is a general purpose programming platform.  It is portable across pretty much any computer system, making it possible to use AkashaEPUB to produce books on whatever computer you have.

For example I routinely switch between a MacBook Pro (running Mac OS X) and a Chromebook that's been hacked (with Crouton) to run Linux.  I have Node.js and AkashaCMS/AkashaEPUB installed on both systems, can edit the same files on either, use the same editing application on either, and use the same command line tools on either to build the book.  If I'd been using a proper Word Processor (like Libre Office) to write content the Chromebook would have presented a serious challenge.

<img src="akashaepub-logo.png" style="float: right"/>AkashaEPUB rests on the shoulders of AkashaCMS - [akashacms.com](http://akashacms.com) - a Content Management System which produces static HTML websites.  One day, while preparing content for an electric vehicle buyers guide - [greentransportation.info/ev-charging/toc.html](https://greentransportation.info/ev-charging/toc.html) - I had an inspired (or maybe crazy) thought to adapt AkashaCMS to produce EPUB files.  Vaguely remembering that an EPUB file is just some HTML files with additional metadata, I realized that AkashaCMS can generate all those files.  Within a few days I'd read enough of the specifications and sample EPUB's to get the first version of AkashaEPUB running, and to produce a sample EPUB.  Since then the software and EPUB spec's have been gone over carefully, and the result is a simple-to-use system that's producing good EPUB's.  Along the way it meant several useful architectural changes in AkashaCMS.  This book is proof that AkashaEPUB does what it says on the label, and that it's fairly easy to use.

# Crafting books in the age of electronic books

<figure>
<img src="images/640px-Metal_movable_type.jpg"/>
<figcaption>"Metal movable type" by Willi Heidelbach. Licensed under CC BY 2.5 via Wikimedia Commons - https://commons.wikimedia.org/wiki/File:Metal_movable_type.jpg#/media/File:Metal_movable_type.jpg</figcaption>
</figure>

In days of yore, typesetting a book meant placing physical typeface's (a metal block containing one character) to create a printing plate for each page.  The printer would build one printing plate, printing pages for that plate, then tear it apart to repeat the process for the next page.  We've come a long way since then.

Certain limitations in the book model are still carried over from books printed on paper.  Digital books have a linear reading order, for example, meaning that the reader starts at page 1, reads page after page, until reaching the last page.  Modern computer gizmos could give us a different user interface for books, in theory.  If Gutenberg were able to hyperlink between pages, wouldn't he have done so?

EPUB3 offers amazing tools to not just nicely present pages of text with hyperlinks, but to embed audio, video and interactivity.  The EPUB3 standard supports audio and video tags, so your book can play movies or audio.  Further, it supports JavaScript so the reader can interact with the book like they would a web page.  These features are, today, supported only by a few of the EPUB reader applications, but we should expect over time that the apps will grow more powerful.  What is the future of literature when we have children who've grown up reading interactive books?

We have a practical limitation that the makers of electronic book readers implement what they can, and what they think best, in the limitations of the device or application they sell.  Not all of them have caught up with EPUB3, and not all of them are interested in nor capable of implementing the fullness of what HTML5 and CSS and JavaScript could possibly do in an electronic book.

In other words, AkashaEPUB targets EPUB3 but not all EPUB devices can consume EPUB3.  

Crafting books in this era means knowing HTML5, CSS, JavaScript and XML -- all common tools of the current technology trade -- using them the way specified by the EPUB3 standard.

The future for electronic books is exciting as the device and software makers move forward with implementing the promise of books crafted from modern web technologies.

# Why use AkashaEPUB?

There are many tools on the market for producing EPUB files.  Why should you choose AkashaEPUB when all your friends says Jutoh or Vellum or Libre Office or whatever is the best way to go?

You are of course free to do as you wish.  Those other tools have their place as does a system like AkashaEPUB.  AkashaEPUB should appeal to certain values like:

* The freedom to freely reuse your words in many ways
* The freedom to build your own tools, or to know precisely how they work
* The freedom to quickly iterate through developing your book -- the entire book creation process is in the hands of the author, and is light-weight enough to run on their laptop
* Use special tags and other special HTML processing thanks to Mahabhuta.  This is an engine for AkashaCMS which brings the power of jQuery DOM manipulation to AkashaCMS or AkashaEPUB documents.
* The freedom to use the computer operating system of your choice
* Participation in the open source ecosystem
* Democratizing the publishing system so anybody can participate, even those of limited means
* A publishing system that could be integrated into other systems -- such as a software build system that automatically generates a documentation EPUB
* The freedom to use lightweight appropriately sized tools -- AkashaEPUB files are edited with simple text editor, and built at the command line
* The familiarity of using the same tools, text editors, command lines, etc, that are used in writing code, to write a book.

Those of us who write code for a living are more comfortable in a programmers text editor, doing things at the command line, and chafe at GUI-heavy Word Processors like Microsoft Word or Libre Office.  AkashaEPUB fits the typical programmer tools preferences like a glove.
