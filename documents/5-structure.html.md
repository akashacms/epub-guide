---
layout: ebook-page.html.ejs
title: Structuring your book
---

So far we've walked you through the EPUB Skeleton, demonstrating how to [install AkashaEPUB](2-installation.html) and [create content in an AkashaEPUB project](3-creating-content.html).  It's now time to go over details of how such a project is structured.

There are two different aspects to the "structure" of an AkashaEPUB project.  One is obviously the content structure of your book.  While you're the one most responsible for the content of your book, we'll give a few ideas.  The other aspect is the directory layout and different tools that are used.

AkashaEPUB helps you to organize your book into chapters, and sub-chapters.  You can nest the chapter structure as deeply as you like, and AkashaEPUB will construct the table of contents for you and ensure the reading order of the pages is correct.  Your readers may hate you if the chapter nesting gets too deep, however.

The EPUB standard uses metadata to identify the book, and one or more navigation documents to help the reader navigate the book.  AkashaEPUB generates all that for you.

AkashaEPUB generates that metadata from data you provide, and from the files you put in the filesystem.  Your task is to put book metadata in the `book.yml`, to create the `<nav>` element containing the table of contents, and to put CSS, JavaScript, image and font files in the directories.

The `config.js` documentation on the AkashaCMS website ([akashacms.com/configuration/index.html](http://akashacms.com/configuration/index.html)) documents that object, primarily in the context of website configuration.  AkashaEPUB almost eliminates any need to use that config object, unless you have peculiar needs.

# AkashaCMS Directory structure and how it's used in AkashaEPUB

The Configuration file lists some directories for AkashaRender's use.  These are as follows:

Configuration Method | Default | Description
---------------------|---------|------------
`setRenderDestination` | `out` | The project is rendered into this directory
`addAssetsDir` | `assets` | A list of directories containing files copied as-is with no modification to the `RenderDestination`
`addDocumentsDir` | `documents` | A list of directories containing content files that are rendered into the `RenderDestination`
`addLayoutsDir` | `layouts` | A list of directories containing page layout templates
`addPartialsDir` | `partials` | A list of directories containing _partials_ a.k.a. HTML or template snippets

Most of these can be a list of directories, meaning you can call those functions more than once.  AkashaRender searches these directories for the first file matching the file name.  

Another thing often provided by an AkashaCMS plugin is one or more Partial's in a directory contained within the plugin.

## The AkashaEPUB RenderDestination is the EPUB directory structure

In case it's not obvious, the RenderDestination is what will be bundled into the EPUB.  Any file your project places in this directory will be bundled into the EPUB.

The `epubtools` command will generate the various XML files.  Your project must not attempt to do so.  We'll go over how `epubtools` generates those files later.  

# Book Metadata in `book.yml`

So far we've discussed how to configure AkashaRender so the RenderDestination will work as an EPUB.  It's not complete because we've not gone over how `epubtools` generates the XML files.

We mentioned at the top the `book.yml` file containing publishing metadata about the book.  It's formatted in YAML and contains details such as the book title, identification strings like an ISBN number, the publisher, and the name for the XML files.

We have two sample files:

* This book: https://github.com/akashacms/epub-guide/blob/master/book.yml
* The Skeleton EPUB: https://github.com/akashacms/epub-skeleton/blob/master/book.yml

The entries in this file are fairly straightforward.  We'll go over this file elsewhere.

# HTML for Table of Contents in `toc.html`

Every EPUB3 e-Book must have a _Navigation Document_ containing at least one `<nav>` that serves as the Table of Contents.  The EPUB3 Navigation Document replaced the NCX file used in EPUB2.  For compatibility purposes, `epubtools` automatically generates an NCX file while bundling the EPUB.

The actual file name for these two files are declared in these `book.yml` entries:

```
toc: { id: "toc", href: "toc.html" }
ncx: { id: "ncx", href: "toc.ncx"  }
```

In other words, you are to create a file matching the name you specify in the `toc` entry.  The file named in the `ncx` entry is auto-generated.

The Navigation Document for the EPUB Skeleton is: https://github.com/akashacms/epub-skeleton/blob/master/documents/toc.html.ejs

It uses the layout: https://github.com/akashacms/epub-skeleton/blob/master/layouts/page.html.ejs

The Navigation Document must incorporate the EPUB namespace as so:

```
<html xmlns="http://www.w3.org/1999/xhtml"
      xmlns:epub="http://www.idpf.org/2007/ops" ... >
```

The next step is within the `<body>` tag you place a `<nav>` element containing an `<ol>` list containing the table of contents.

```
<nav epub:type="toc" id="toc">
    <ol type="1" start="1">
    </ol>
</nav>
```

The `epub:type` attribute declares the kind of navigation element, in this case it is a `toc nav` or a `nav` used for a Table of Contents.  As of this writing AkashaEPUB only supports the `toc nav` and the other `nav` types are not supported.  An `<ol>` list must exist within this `<nav>` element.

The `<ol>` shown here is suitable for a typical table of contents with numbered chapters starting at Chapter 1.  The structure of this list can be nested as deeply as you like.

The values for `type` are:

* `1` - decimal
* `a` - lower-case alpha
* `A` - upper-case alpha
* `i` - lower-case roman numerals
* `I` - upper-case roman numerals

# XHTML page templates

EPUB3 uses XHTML5 rather than straight HTML like we use on the Web.  There are a few things this means for AkashaEPUB.  

One issue is something for which there is not a solution:  The file extensions should be `.xhtml` rather than `.html`.  AkashaRender's rendering engines produce files named with `.html` and does not have a mechanism to instead produce `.xhtml` files.  The `epubcheck` tool gives a simple warning rather than an error for this issue.

The other issues means the content of the HTML files must be XHTML.  That means a couple specific things.

The page templates must start with this:

```
<!DOCTYPE html>
<html
    xmlns="http://www.w3.org/1999/xhtml"
    xmlns:epub="http://www.idpf.org/2007/ops" ... >
```

We already saw this when discussing the Navigation Document.  The `epub:` namespace is useful not just in that file, but in other cases.

For example an `epub:type=".."` attribute can be used on lots of tags, not just the `<nav>` tag in the Navigation Document.

# Cover Page (`cover.html`)

Even digital books need cover images.  We humans have hundreds of years experience of books with covers, and often judge books by their cover.  We do this even though we're warned to not judge a book by its cover.  The online e-book stores perpetuate this pattern by showing a cover image for each book.  Hence, a cover image is needed even for an electronic book that doesn't have a cover.

There are two cover image objects used by EPUB.  The first is the image itself, and some EPUB reader software looks only at that image.  The second is an HTML file that only displays the cover image.  AkashaEPUB will put both into the manifest.

All the relavent information is declared this way in `book.yml`:

```
cover:
    coverHtml: { id: "cover", href: "cover.html" }
    idImage: "cover-image"
    src: "range-confidence-cover.jpg"
    alt:  "Electric Vehicle Charging Guide"
    type: "image/jpeg"
```

The cover page will be contained in `cover.html`.  The image to be used is named in the `src` tag, and its MIME type is in the `type` tag.  The required entries in the OPF file will be created by `epubtools`.

The `writeHtml` element describes the generated HTML cover file.

The `src` member is the pathname to the image, while the `alt` member is the `alt=` text used in the HTML file, and the `type` member is its MIME type.

From this, AkashaEPUB generates two entries in the OPF manifest.  The first is the HTML file, that will be named `cover.html`, containing only an `img` tag to show the cover image.  The second simply refers to the image file.

The HTML file should have this structure:

```
<html>
<head>
<title>Cover</title>
<style type="text/css">
body {
    margin: 0em;
    padding: 0em;
}
img {
    max-width: 100%;
    max-height: 100%;
}
</style>
</head>
<body>
<img src="images/cover.jpg" alt="cover image"/>
</body>
</head>
```

Using `max-width` on the image styling is important so the image will scale to the device.

## How big of a cover image?

It pays to make a large cover image because the screens on EPUB readers are getting better and better.  For example, the highest resolution iPad currently on the market has a 2048x1536 pixel screen whereas the original iPad's screen resolution was 1024x768.  That's 4x the pixels in the same screen size.

It means that iPad EPUB reader software will fill most of the screen with your cover image.  If yours is 900x600 pixels, the reader software will have to scale it up to fill the screen, and it won't look good.

It's better to make the cover image too large and let the EPUB reader software scale it down, than to make the image too small and have it scaled up.

The other consideration is the width-to-height ratio.  The convention for cover images is that they're taller than they are wide, or what is otherwise called Portrait Mode.  The aspect ratio is up to you, but by convention is about 3:2.

In other words, a 2000 pixel wide cover image should be 3000 pixels high.

## Cover image format?

Our example above showed use of a PNG file.  They're good because of loss-less compression.

EPUB readers are also supposed to support SVG files, but that hasn't been tested with AkashaEPUB.  SVG is in theory better than any raster image format like PNG, because SVG is a Vector Graphics format and automatically scales to any resolution without loss of precision.

# Declaring ownership, copy rights, and the copyright page

Earlier we discussed declaring in the `book.yml` the document identifiers [](4-configuration.html)

Having a legally correct copyright page makes the ownership clear to your readers.  While there is an automatic copyright when a work is published, it is probably helpful to go ahead and add a copyright page.  The References section lists links to a few recommended formats of the text in a copyright page: [](9-references.html)

The implementation is easy.  After creating your preferred copyright statement, simply list the corresponding copyright file in the table of contents.  Neither AkashaEPUB nor EPUB3 will attach any special significance to the file.  It's just another file to show to the reader.
