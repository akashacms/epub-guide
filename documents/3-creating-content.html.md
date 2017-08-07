---
layout: ebook-page.html.ejs
title: Creating book content
---

In this chapter we'll learn how to use AkashaRender to generate the XHTML, CSS files, and asset files used in your eBook.  In later chapters we'll look into packaging those files into an EPUB.  Generating these files in AkashaEPUB leverages AkashaRender and a couple plugins for EPUB-specific features.  

The AkashaRender model is writing files in an easy-to-write markup format like Markdown, processing the files with partials and templates, generating HTML, then packaging the HTML for the destination.  Each destination has its own packaging and delivery considerations.  With AkashaCMS the destination is a web server for display on web browsers, and for AkashaEPUB the destination is an EPUB ebook reader.  

# Quick overview on configuring content directories

In a later chapter we'll make a deep dive into the configuration files.  Understanding this section requires a little preview of the Configuration object.

Content files are stored in two kinds of directories:

Directory type | Config method | Discussion
---------------|---------------|-------------
`AssetsDir`    | `addAssetsDir()` | Files that are simply copied to the `RenderDestination` with no processing
`DocumentsDir` | `addDocumentsDir()` | Files requiring processing (a.k.a. rendering), with the rendered result copied to the `RenderDestination`

The RenderDestination is the output directory.  AkashaRender renders all the input files into the RenderDestination directory.  The directory structure of the input directories (AssetsDir and DocumentsDir) is replicated in the RenderDestination.  Files in the RenderDestination might receive some post-processing such as minfying HTML or CSS or JavaScript. The RenderDestination is then delivered to the destination, meaning its either copied to a webserver, packaged into an EPUB or some other delivery mechanism.

Typically your images, JavaScript and CSS files, a.k.a. _asset files_, go in AssetsDir's.  However, files in DocumentsDir's not requiring rendering are also simply copied to the RenderDestination.  It is possible to place the _asset files_ in the DocumentDir's, depending on your preference.  There are two additional directory types, PartialsDir and LayoutsDir, that we'll discuss later.

There is only one RenderDestination directory.  With AssetsDir, DocumentsDir, LayoutsDir, and PartialsDir, there can be and often are multiple directories, since each is an array/list.  When AkashaRender looks for an instance of a given type of file, it searches each directory in the the corresponding list stopping on the first match.

We'll go over details of the configuration in a later section: [](4-configuration.html)  You can read more about AkashaCMS configuration at: http://akashacms.com/akasharender/configuration.html

# Content File Names

AkashaRender detects which files require what processing by inspecting the file name extension.  The rendering process is named by the extension as so:

Extension | Description
----------|--------------
`example.html.md` | A Markdown file, that produces HTML.
`example.html.ejs` | for HTML with EJS markup, that produces HTML.
`example.php.ejs` | for PHP with EJS markup, that produces PHP.
`example.html` | Straight HTML, copied with no processing.
`example.css.less` | A LESS file, that produces CSS.

Hence, a RenderDestination file named `css/style.css` could either come from an AssetsDir file `css/style.css` or a DocumentsDir file `css/style.css.less`.  Likewise, a RenderDestination file `chapter2/install.html` must come from a DocumentsDir file named either `chapter2/install.html.md` or `chapter2/install.html.ejs` or simply `chapter2/install.html`.

You can use any directory hierarchy that you wish.  AkashaRender creates in the rendering directory the structure you create in the DocumentsDir and AssetsDir directories.  For the purpose of packing EPUB's, authors must remember the directory named `META-INF` cannot be used for your content.  AkashaEPUB automatically generates that directory, because it has special significance to packaging EPUB files.

# Format of document's that render to HTML

Some files in DocumentsDir's render to HTML, depending on their file extension.  These files use a fairly straightforward file format supporting _metadata_ in addition to the content.

```
---
layout: page.html.ejs
title: Four Scores and Seven Years Ago
---
Four score and seven years ago our forefathers brought forth ...
```

The first part, between the `---` lines, is the metadata, a.k.a. _frontmatter_.  The rest is the _content_.  The content will be rendered through the processing steps dictated by the filename.  The metadata is used by the rendering process in various ways.  The `layout` tag declares the layout template, and the `title` tag gives the page title, for example.

If the file ends in `.html.md` the content will be treated as Markdown and rendered through the Markdown processor.  If it ends in `.html.ejs` the content will instead be rendered through the EJS template engine.

At its simplest the metadata follows a simple `tag: value` system:

```
---
tag1: value1
tag2: value2
tag3: value3
---
The lazy brown fox jumped over the quick green tortoise
causing many heads to be scratched.
```

The metadata section is actually YAML (https://en.wikipedia.org/wiki/YAML).  Most of the time we'll simply use `tag: value` constructs in the metadata.  But by using YAML, AkashaRender has the flexibility to use structured data when it's needed.

Many more details about the docuyment format are available at:  http://akashacms.com/akasharender/3-create-content.html

# Metadata

Metadata comes not just from the frontmatter in the content document.  The configuration file can declare metadata as well.

1. Optional metadata declared in `addDocumentsDir()` in the configuration file
1. Metadata declared in document file

The metadata is carried alongside the content all through AkashaRender's processing.  The purpose of the metadata is to either instruct choices made at different rendering steps, or to provide data that's rendered into the document.

An example of an instruction to the rendering process is the `layout` metadata tag.  It tells the system the layout template to use for the final rendering.

```
---
layout:  template-file-name.html.ejs
title: The quick brown fox
... other metadata
---

.... content
```

Depending on the value in `layout` one template file or another will be used.  That choice determines the final rendered output.

Some rendering modules can inject the metadata into the rendered document.  For example, with the EJS template engine every metadata value is available as a variable inside the template.  

This EJS snippet brings the `title` value into the rendered document:

```
<h1><%= title %></h1>
```

For more information on both, see: http://akashacms.com/akasharender/layouts-partials.html
