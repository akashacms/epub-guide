---
layout: chapter-index.html.ejs
title: Structuring your book
---

AkashaEPUB helps you to organize your book into chapters, and sub-chapters.  You can nest the chapter structure as deeply as you like, and AkashaEPUB will construct the table of contents for you and ensure the reading order of the pages is correct.  Your readers may hate you if the chapter nesting gets too deep, however.

The EPUB standard uses metadata to identify the book, and one or more navigation documents to help the reader navigate the book.  AkashaEPUB generates all that for you.

AkashaEPUB generates that metadata from data you provide, and from the files you put in the filesystem.  Your task is to put book metadata in the `book.yml`, to create the `<nav>` element containing the table of contents, and to put CSS, JavaScript, image and font files in the directories.

The `config.js` documentation on the AkashaCMS website ([akashacms.com/configuration/index.html](http://akashacms.com/configuration/index.html)) documents that object, primarily in the context of website configuration.  AkashaEPUB almost eliminates any need to use that config object, unless you have peculiar needs.


# AkashaRender Configuration file and `package.json`

The configuration of an AkashaRender project is split between the Configuration file and the `package.json`.  The latter is used by `npm` and the Node.js platform to list package `dependencies`, the available `scripts` for performing actions related to the project, and various metadata items like project owner identification or the projects home page.  For an AkashaEPUB project, the `scripts` section can be used to describe the build process, while the `dependencies` will list the EPUB-related AkashaCMS plugins.

The Configuration file, typically named `config.js`, is a Node.js module that produces an AkashaRender _Configuration_ object.  The Configuration object can be created any way you like.  The most straight-forward method is with the `config.js` file.  There's nothing special about that file name, and it can be named anything you like.

Here's a couple `config.js` files for EPUB's:

* This book:  https://github.com/akashacms/epub-guide/blob/master/config.js
* The EPUB Skeleton: https://github.com/akashacms/epub-skeleton/blob/master/config.js

More details about AkashaRender project configuration are at: https://akashacms.com/akasharender/configuration.html

```
'use strict';

const akasha  = require('akasharender');

const config = new akasha.Configuration();

config
    .addAssetsDir('assets')
    .addLayoutsDir('layouts')
    .addDocumentsDir('documents')
    .addPartialsDir('partials');

config
    .use(require('akasharender-epub'))
    .use(require('akashacms-footnotes'));
config.addStylesheet({ href: "/css/style.css" });

config.setMahabhutaConfig({
    recognizeSelfClosing: true,
    recognizeCDATA: true,
    xmlMode: true
});

config.prepare();

module.exports = config;
```

This is a fairly simple configuration file.  They can grow to be rather complex depending on your needs.  We pull in the `akasharender` module, then instantiate a Configuration object, call some methods, and assign the object to `module.exports`.

The first set of methods, `addAssetsDir` and the others, inform AkashaRender what directories to use for certain purposes.

The second set, `use`, informs AkashaRender the AkashaCMS plugins to use.  In the `use` call we pass in the result of `require("plugin-name")` so that AkashaRender receives the module object.  There must be a corresponding entry in `package.json` for each of these so that we can easily use `npm` to download the dependencies required to build the book.

An AkashaCMS plugin will modify AkashaRender's execution to add new capabilities.  The most common addition a plugin makes is to add new custom tags using the Mahabhuta DOM-processing engine, or other DOM-processing tasks.  The two plugins listed here are especially useful for EPUB's:

* `akasharender-epub` contains various cleanup's required because of EPUB3 limitations.
* `akashacms-footnotes` provides a simple way to generate a list of footnotes at the bottom of the page.

With `addStylesheet` we declare a CSS file to use in every page.  

With `setMahabhutaConfig` we describe the HTML rendering output.  We have to specify `xmlMode: true` because the EPUB3 world requires XHTML files.

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

## When do you use multiple Configuration files?

The AkashaRender Configuration file allows for quite a lot of flexibility.  Suppose you have some content, like a little guidebook about using some software like AkashaRender.  You might want that guidebook to be available on a website such as at https://akashacms.com/akasharender/toc.html.  And you may also want to publish that guidebook as a standalone EPUB.

We'll go over how to do that in more detail elsewhere.  Let's do a brief overview.

This goal means you have two AkashaRender projects:

1. The website containing this guidebook plus everything else on the website.  This content is to be rendered as a website.  In the case of AkashaCMS.com there are three guidebooks, a plugin directory, and a project news blog.
1. The guidebook formatted as an EPUB.

It can be instructive to puzzle out how AkashaCMS.com is structured, but its complexity will only confuse the discussion.  Instead I'll describe how another site, https://greentransportation.info/ is configured, with a guidebook at https://greentransportation.info/ev-charging/toc.html

The `config.js` for the website rendering simply has:

```
config
    .addDocumentsDir('documents')
    .addDocumentsDir({
        src: 'ev-charging',
        dest: 'ev-charging',
        baseMetadata: {
            bookHomeURL: "/ev-charging/toc.html",
            copyrightPartial: 'copyright-range-confidence.html'
        }
    })
```

In other words, it has two documents directories.  One contains the bulk of the website content.  The second contains the content for the electric vehicle charging e-Book.

The `addDocumentsDir` function can take an object like this.  This says the files in `ev-charging` are rendered into the `ev-charging` subdirectory of the RenderDestination.  The `baseMetadata` segment adds to the metadata used with each document.  Because the `ev-charging` content needed additional metadata, it had to be kept in a separate directory in order to specify that metadata.

When the greentransportation.info website is rendered, content from both directories are rendered into the website.

A second configuration file describes how the e-Book is structured.

```
config
    .addAssetsDir('assets-ebook')
    .addAssetsDir({
        src: 'assets/fonts',
        dest: 'fonts'
    })
    .addLayoutsDir('layouts-ebook')
    .addDocumentsDir('ev-charging')
    .addPartialsDir('partials-ebook')
    .setRenderDestination('out-range-confidence');
```

The book uses e-Book-specific versions of the `assets`, `layouts` and `partials` directory.  Because `ev-charging` is the only DocumentsDir, the entirety of the e-book content comes from that directory.

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

In the `book.yml` add a section:

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

Clearly declaring who owns or created the book is very important.  There's a whole industry of intellectual property rights associated with that need.

```
title: "The Brilliant Title to my Wonderful Book"
languages: [ en ]
identifiers:
    - unique: true
      uuid: "D4C91B0C-33C0-4E00-810A-E4C2D8CD4BAE"
published:
    date: "2017-04-27T17:21:38Z"
creators:
    - id: author
      name: John Smith
      nameReversed: Smith, John
publisher: Your Publisher Name
subjects: [ "Comma", "Separated", "List", "Of Topics" ]
rights: "Copyright 2017, John Smith"
```

This declares various metadata items about the book.  These items should be obvious, and the destination for this information is the OPF and NCX files inside the EPUB.

You can list multiple _identifiers_.  The supported identifier formats are:

* `uuid` or Unique Universal ID.  The format is simply a UUID string.
* `urn` or Universal Resource Notation.  There are many other URN formats to use.

Having a legally correct copyright page makes the ownership clear to your readers.  While there is an automatic copyright when a work is published, it is probably helpful to go ahead and add a copyright page.  We don't have a recommendation for the format of the text in a copyright page.

The implementation is easy.  After creating your preferred copyright statement, simply list the corresponding copyright file in the table of contents.  Neither AkashaEPUB nor EPUB3 will attach any special significance to the file.  It's just another file to show to the reader.

# Using Fonts

Each EPUB reading application chooses some default fonts, and perhaps that will be good enough for your purpose.  But your readers experience of your EPUB can be improved by selecting custom fonts.  Because the system is based on HTML5, the whole ecosystem of font choices are available with the caveat that font definition files have to be shipped inside the EPUB.  (because the Internet is not available from an EPUB reader)

Website developers using custom fonts have to do so carefully to limit the impact on download time.  When crafting an EPUB, one has to carefully choose the custom fonts to minimize the size of the EPUB.

Embedding a font in an EPUB is optional.  Doing so can improve the presentation of your book, but adds technical and administrative overhead.  Mitigating that overhead are two considerations:

1. AkashaEPUB has made the technical part fairly easy,
2. Choosing an open source font (versus commercial) limits the administrative overhead to checking the font license.

There's more technical overhead than just the task of embedding the font.  EPUB reader software has a spotty record of supporting custom font choices.  Sometimes it's significantly difficult to get an embedded font to work correctly.  EPUB3 does require support for OpenType and WOFF fonts, however.  As EPUB reading systems move to EPUB3, supporting custom fonts should become easier.

Commercial font licenses prohibit redistributing the font in the way an EPUB does.  That is, anybody receiving the EPUB can simply unzip the file and copy the fonts elsewhere, which commercial font foundaries wish to avoid.  The EPUB3 spec includes a simple encryption mechanism that then allows one to distribute a commercial font in an EPUB.  AkashaEPUB, at this time, doesn't implement font encryption.  The good news is that the open source fonts can be very good, and are available under a license that presents zero administrative burden.

The problem you cannot get around is "bloat".  An EPUB with embedded font files is unavoidably larger than an EPUB which doesn't.

## Implementation

There are three steps to implementing a custom font:

1. Include the font file in the EPUB, and in the OPF manifest.
2. Declare the font in your CSS stylesheet.
3. Use the font on one or more elements in the stylesheet.

For the first step, just put the font file somewhere under an Assets directory.  AkashaEPUB will automatically copy it to the RenderDestination and automatically list it in the OPF manifest.

Now you declare the fonts in the stylesheet.  At the end of the stylesheet declare the font-face's as so.  You must of course use a relative URL from the CSS file to the font file(s):

```
@font-face {
  font-family: "Free Serif";
  font-style: normal;
  font-weight: normal;
  src: url(../fonts/FreeSerif.otf);
}

@font-face {
  font-family: "Free Sans Bold";
  font-style: normal;
  font-weight: bold;
  src: url(../fonts/FreeSansBold.otf);
}

@font-face {
  font-family: "Ubuntu Mono";
  font-weight: normal;
  font-style: normal;
  src: url(../fonts/UbuntuMono-R.ttf);
}

@font-face {
  font-family: "Ubuntu Mono Bold";
  font-style: normal;
  font-weight: bold;
  src: url(../fonts/UbuntuMono-B.ttf);
}

@font-face {
  font-family: "Ubuntu Mono BoldItal";
  font-weight: bold;
  font-style: italic;
  src: url(../fonts/UbuntuMono-BI.ttf);
}

@font-face {
  font-family: "Ubuntu Mono Ital";
  font-weight: normal;
  font-style: italic;
  src: url(../fonts/UbuntuMono-RI.ttf);
}
```

The last thing is to use the fonts as so in your CSS:

```
h1 {
  font-size: 1.5em;
  font-weight: bold;
  font-family: "Free Sans Bold", sans-serif;
  margin-top: 20px !important;
}
```

The `font-family` line here should match one of the `@font-face` declarations.  As one does on the Web, you declare multiple fonts as a fall-back for any missing glyphs.  

It can be useful to declare a radically different fallback font to make it easy to spot glyphs missing from your chosen font.  For example, use `serif` as a backup for a sans-serif font, as is done here.

```
font-family: "Free Sans Bold", serif;
```

## Finding quality, free, fonts

You don't have to spend an arm and a leg on fonts, because there are many open source fonts available, such as the ones shown above.  Here are a few websites with fonts that can be downloaded for free

* The Open Font Library http://openfontlibrary.org/
* The Google Fonts library http://www.google.com/fonts
* Wikipedia Open Source Unicode Typefaces https://en.wikipedia.org/wiki/Open-source_Unicode_typefaces
* The League of Movable Type https://www.theleagueofmoveabletype.com/
* Wikipedia OpenType and FreeType https://en.wikipedia.org/wiki/OpenType and https://en.wikipedia.org/wiki/FreeType
* Open Source Hebrew Fonts http://opensiddur.org/tools/fonts/
* The SIL Open Font License http://scripts.sil.org/cms/scripts/page.php?site_id=nrsi&id=OFL
* The SIL Project fonts http://scripts.sil.org/cms/scripts/page.php?cat_id=FontDownloads
* Lato Fonts http://www.latofonts.com/
* Font Squirrel http://www.fontsquirrel.com/
* Deja Vu Fonts http://dejavu-fonts.org/wiki/Main_Page
* Wikipedia Web Typography https://en.wikipedia.org/wiki/Web_typography


# Generating EPUB container XML files with `epubtools`

# Packaging the EPUB with `epubtools`
