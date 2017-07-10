---
layout: chapter-index.html.ejs
title: Creating book content to be rendered by AkashaEPUB
---

The goal with AkashaEPUB is to generate XHTML files, CSS files and other assets, packaging them in an EPUB formatted ZIP archive.

To generate these files, AkashaEPUB leverages AkashaRender's rendering capabilities, aided by a couple plugins for EPUB-specific features.  The AkashaRender model is to take an easy-to-write markup format like Markdown, run it through some processing and templates to generate HTML, then packaging the HTML for the destination (in this case, EPUB).  With AkashaCMS the destination is a web server for display on web browsers, and for AkashaEPUB the destination is an EPUB ebook reader.

You author the pages of your book in the directory named in `addDocumentsDir()` in the configuration file.  Files under that directory are rendered by AkashaRender.  Any 'asset' files (images, CSS, JavaScript) should be copied without processing, and therefore are to be placed in the directory named in `addAssetsDir()` in the configuration.  We'll go over details of the configuration in a later section.  You can read more about AkashaCMS configuration at: http://akashacms.com/akasharender/configuration.html

# Content Files

Content files are stored in one of the directories named with `addDocumentsDir()` in the configuration file.  There can be multiple such directories.  As we just said, it is the content files that are processed by AkashaRender.  The processed content lands in the directory named in `setRenderDestination()` in the configuration, if `setRenderDestination()` is not called the rendering directory will be named `out`.

Content files have a file-name-structure meant to document the processing steps. For example:


Extension | Description
----------|--------------
`example.html.md` | A Markdown file, that produces HTML.
`example.html.ejs` | for HTML with EJS markup, that produces HTML.
`example.html` | Straight HTML, copied with no processing.
`example.css.less` | A LESS file, that produces CSS.


The structure of the rendering directory will have a one-to-one correspondance to files in the documents directories.


rendering directory | documents directories | assets directories
--------------------|-----------------------|-----------------------
css/style.css |   | root_assets/css/style.css
css/style.css     | root_docs/css/style.css.less |
images/logo.png   |   | root_assets/images/logo.png
chapter1/intro.html | root_docs/chapter1/intro.html.md |   
chapter2/install.html | root_docs/chapter2/install.html.md |  

You can use any directory hierarchy that you wish.  AkashaRender creates in the rendering directory the structure you create in the document and asset directories.  The only limitation placed on EPUB authors is the directory named `META-INF`.  AkashaEPUB automatically generates that directory, because it has special significance to packaging EPUB files.  Do not create the META-INF directory yourself.

Another consideration is the Table of Contents you show to the reader.  Each Table of Contents entry corresponds to an HTML content file.  We'll go over this in more detail later.  In planning your content it's important to know that each addressable entry in the Table of Contents, whether it's a chapter or sub-chapter, must be in its own file.
