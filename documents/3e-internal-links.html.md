---
layout: ebook-page.html.ejs
title: LINK, IMG tags and the requirement for relative URL's
---

The `<link>` and `<img>` tags, and other tags referring to other content, are as we are accustomed to in regular websites.  They're used to refer to another file of some kind, whether it is a CSS stylesheet, an image, a font, or a JavaScript file.  The URL reference, usually in the `href` or `src` attribute, has some special considerations, however.

In EPUB there is no _webroot_ concept.  Therefore an `href="/css/style.css"` is wrong because the leading `/` does not resolve to anything, and instead causes an error.  Instead paths must always be relative to the current document.  Instead you might have `href="../../css/style.css"`.

Another limitation is that EPUB readers typically do not have an Internet connection.  Where a website might reference a stylesheet from a CDN, or pull down images from an image service, it's really bad form to do so in an EPUB.  In cases like an image or CSS file, the URL must be a local file reference and the corresponding resource file must be contained in the EPUB.  

It is possible to use an `<a>` tag to link to external web pages.  Just be clear that in some cases the person reading the document will not be able to click on the link.


The constraints of the EPUB container mean for some special considerations when linking to content within and outside the EPUB.

There are three linking scenarios to consider:

* Within the OPF file (and other metadata files) to content and assets within the EPUB
* Content files in the EPUB linking to other files within the EPUB
* Content files in the EPUB linking to sites on the Web

There are two basic constraints that make linking in an EPUB different from linking on a website.

* There is no _webroot_ in an EPUB, so all internal URL's have to be relative from the source document
* EPUB rendering is presumed to be _offline_ meaning no files can be fetched over the Internet (because there's no Internet)

## All internal URL's are relative -- no webroot

The first constraint means we cannot use an inner `href` like `/foo/bar/baz.html`.  Instead the file must be referenced with an appropriate `../../foo/bar/baz.html`.

On a normal website we have a short-cut to reference files at a known location within the website hierarchy.  For example, typical practice is to put CSS files in `/css`, and image asset files in `/images` (or similarly defined directory names).  Because EPUB's don't have a webroot those URL's break.  Instead all URL's have to be relative from the document that's doing the linking.

Consider an EPUB with these files

```
css/style.css
images/logo.png
chap1/intro.html
chap2/install.html
chap3/macosx/install.html
```

Each `.html` file will want to reference both `css/style.css` and `images/logo.png`.  For `chap1/intro.html` and `chap2/install.html` the HTML would be:

```
<html>
<head>
...
<link rel="stylesheet" type="text/css"
      href="../css/style.css"/>
...
</head>
<body>
...
<img src="../images/logo.png"/>
...
</body>
</html>
```

But for `chap3/macosx/install.html` the relative paths have to start with `../../` instead of just `../` because that file is located two levels deep in the file structure.

Most of these references are what you, the author, will write in your files.

* Links in `img` and `a` tags must be written with relative URL's like this.
* Chapter and section references in document metadata (see [](5-structure.html)) must be written with relative URL's, as shown earlier.

It's possible to use an absolute URL for both these instances, and AkashaEPUB will convert that into a relative URL.  In the above example, one could put `<img src="/images/logo.png"/>` and AkashaEPUB will automatically compute the relative URL.

The stylesheet link we show above is not something you will write yourself.  Instead, you list stylesheets in the Configuration file, which we discuss later.  (see [](4-configuration.html))

## Anchor text assistance

AkashaEPUB does have a nice assistance feature to automatically make nice links between documents.  If you leave out the anchor text from the link, AkashaEPUB will look up the `title` metadata from the linked document and insert it as the anchor text.

For example, inside this guide a tag written as `<a href="2-installation.html"></a>` (or in Markdown `[](2-installation.html)`) will be rendered as `<a href="2-installation.html">Installing the AkashaEPUB toolchain</a>` (or [](2-installation.html)).

## Referencing external resources

Because an EPUB is presumed to be "offline", we can't write `<img src="http://example.com/images/logo.png"/>`.  The Internet isn't available from an EPUB, and therefore that image cannot be loaded.

EPUB3 does have a mechanism for referencing external files.  Multimedia files (video, audio) can be quite large and perhaps best stored on a website rather than inside the EPUB.  AkashaEPUB doesn't support such files, however.
