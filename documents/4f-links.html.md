---
layout: page.html.ejs
title: Linking to sections and asset files
---

The constraints of the EPUB container mean for some special considerations when linking to content within and outside the EPUB.

There are three linking scenarios to consider:

* Within the OPF file (and other metadata files) to content and assets within the EPUB
* Content files in the EPUB linking to other files within the EPUB
* Content files in the EPUB linking to sites on the Web

There are two basic constraints that make linking in an EPUB different from linking on a website.

* There is no "webroot" in an EPUB, so all internal URL's have to be relative from the source document
* EPUB rendering is presumed to be "offline" meaning stuff can't be fetched from over the Internet

# All internal URL's are relative -- no webroot

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

But for `chap3/macosx/install.html` the relative paths have to start with `../../` instead of just `../` because that file is buried two levels deep.

FAIR WARNING:  At this moment AkashaEPUB will break in this scenario.  You, the author, have no control over generating links to stylesheet or font files and therefore the layers of `../` necessary for a relative URL will not be generated.  However, you the author are in control of `img src=` URL's and must make sure to create correct URL's for things like `img` tags.

# Content files linking to each other

Because EPUB's are HTML files, you can easily make an `a` tag linking to other documents in the EPUB.

We've already gone over the special constraing -- there's no webroot, so make sure to create the correct relative URL in the linking document to the linked-to document.

AkashaEPUB does have a nice assistance feature to automatically make nice links between documents.  If you leave out the anchor text from the link, AkashaEPUB will look up the `title` metadata from the linked document and insert it as the anchor text.  For example, inside this guide a tag written as `<a href="2-installation.html"></a>` (or in Markdown `[](2-installation.html)`) will be rendered as `<a href="2-installation.html">Installing the AkashaEPUB toolchain</a>` (or [](2-installation.html)).

# Referencing external resources

Because an EPUB is presumed to be "offline", we can't write `<img src="http://example.com/images/logo.png"/>`.  The Internet isn't available from an EPUB, and therefore that image cannot be loaded.

EPUB3 does have a mechanism for referencing external files.  Multimedia files (video, audio) can be quite large and perhaps best stored on a website rather than inside the EPUB.  AkashaEPUB doesn't implement that mechanism, however.
