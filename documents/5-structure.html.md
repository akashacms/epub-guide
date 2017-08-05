---
layout: ebook-page.html.ejs
title: Structuring your book
---

So far we've walked you through the EPUB Skeleton, demonstrating how to [install AkashaEPUB](2-installation.html) and [create content in an AkashaEPUB project](3-creating-content.html).  It's now time to go over details of how such a project is structured.

There are two different aspects to the "structure" of an AkashaEPUB project.  One is obviously the content structure of your book.  Obviously you are responsible for the structure of the content of your book.  What we mean here by _structure_ is the directory layout and some important files to consider.

The EPUB standard uses metadata files (the OPF and NCX files) to identify the book, and the files it contains.  A navigation document contains a _table of contents_ to help the reader navigate the book.  AkashaEPUB generates the metadata files for you, while you must create the navigation document.  AkashaEPUB generates that metadata from data you provide, and from the files you put in the filesystem.  

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

The entries in this file are fairly straightforward.  See: [](4-configuration.html)

# The Navigation Document, a.ka. the Table of Contents, in `toc.html`

Every EPUB3 e-Book must have a _Navigation Document_ containing at least one `<nav>` that serves as the Table of Contents.  The EPUB3 Navigation Document replaced the NCX file used in EPUB2.  For compatibility purposes, `epubtools` automatically generates an NCX file while bundling the EPUB.  The `<nav>` structure in the Navigation Document will be extracted by the reading system so it can display navigational aids to the user.

The actual file name for these two files are declared in these `book.yml` entries:

```
toc: { id: "toc", href: "toc.html" }
ncx: { id: "ncx", href: "toc.ncx"  }
```

You must create a file that will render to the file given in the `toc` element.  In other words, `toc.html.md` or `toc.html.ejs` or even just `toc.html` will serve the purpose.  You do not need to create the `toc.ncx` file, however, as `epubtools` will auto-generate that file for you.

The Navigation Document for the EPUB Skeleton is: https://github.com/akashacms/epub-skeleton/blob/master/documents/toc.html.ejs

It uses the layout: https://github.com/akashacms/epub-skeleton/blob/master/layouts/page.html.ejs

The Navigation Document must incorporate the EPUB namespace as so:

```
<html xmlns="http://www.w3.org/1999/xhtml"
      xmlns:epub="http://www.idpf.org/2007/ops" ... >
```

The next step is within the `<body>` tag you place a `<nav epub:type="toc" id="toc">` element containing an `<ol>` list containing the table of contents.  The `epub:type` attribute is required, and the `id` must match what you put in the `book.yml` declaration.

```
<nav epub:type="toc" id="toc">
    <ol type="1" start="1">
    <li><a id="chap1" href="chap1.html"></a>
        <ol>
            <li><a id="chap1a" href="chap1a.html"></a></li>
        </ol>
    </li>
    <li><a id="chap2" href="chap2.html"></a></li>
    <li><a id="chap3" href="chap3.html"></a>
        <ol>
            <li><a id="chap3a" href="chap3a.html"></a></li>
            <li><a id="chap3b" href="chap3b.html"></a></li>
        </ol>
    </li>
    <li><a id="chap4" href="chap4.html"></a></li>
    <li><a id="chap5" href="chap5/chap5.html"></a>
        <ol>
            <li><a id="chap5a" href="chap5/chap5a.html"></a></li>
            <li><a id="chap5b" href="chap5/b/chap5b.html"></a></li>
        </ol>
    </li>
    </ol>
</nav>
```

The `epub:type` attribute declares the kind of navigation element, in this case it is a _toc nav_ or a `nav` used for a Table of Contents.  As of this writing AkashaEPUB only supports the _toc nav_ and the other `nav` types are not supported.  An `<ol>` list must exist within this `<nav>` element.

The `<ol>` shown here is suitable for a typical table of contents with numbered chapters starting at Chapter 1.  The structure of this list can be nested as deeply as you like.  Typically the nesting organizes the content by chapters and sections.  EPUB3 reading systems should display the nested structure.

The values for `type` are:

* `1` - decimal
* `a` - lower-case alpha
* `A` - upper-case alpha
* `i` - lower-case roman numerals
* `I` - upper-case roman numerals

## The `id=` attributes in Table of Contents entries

You'll see `id` attributes in the sample Table of Contents entries above.  Those `id` values are copied by _epubtools_ into the OPF and NCX files to use as the required `id` values.

The `id` attributes are not required by the EPUB specification.  You won't see them recommended in documents about creating files for an EPUB document.  

However, it is required that entries in OPF and NCX files have `id` attributes.  Since _epubtools_ creates those files for you, it must get those `id` attributes from somewhere.  The Table of Contents is that place.

## Navigation Document Page title

It's tempting for the page title of this page to simply be _Table of Contents_, like this:

```
<body>
       <section>
<h1>Table of Contents</h1>
<nav epub:type="toc" id="toc">
...
</nav>
       </section>
    <body>
```

This might be misleading to the readers, especially if the Navigation Document is the first thing they see upon opening the book.  It might instead be better to put the book title instead of _Table of Contents_.

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
