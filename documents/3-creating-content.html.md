---
layout: ebook-page.html.ejs
title: Creating book content
---

In this chapter we'll learn how to use AkashaRender to generate the XHTML and CSS files, along with other asset files.  In later chapters we'll look into packaging those files into an EPUB.

To generate these files, AkashaEPUB leverages AkashaRender's rendering capabilities, aided by a couple plugins for EPUB-specific features.  The AkashaRender model is to take an easy-to-write markup format like Markdown, run it through some processing and templates to generate HTML, then packaging the HTML for the destination (in this case, EPUB).  With AkashaCMS the destination is a web server for display on web browsers, and for AkashaEPUB the destination is an EPUB ebook reader.

You author the pages of your book in the directory named in `addDocumentsDir()` in the configuration file.  In the examples shown so far, that directory was named `documents` but of course you're free to use any name you like.  Files inside a DocumentsDir are rendered by AkashaRender, if the file name follows a given pattern.  Any 'asset' files (images, CSS, JavaScript) should be copied without processing, and therefore are to be placed in the directory named in `addAssetsDir()` in the configuration.  We'll go over details of the configuration in a later section.  You can read more about AkashaCMS configuration at: http://akashacms.com/akasharender/configuration.html

# Content Files

Content files are stored in one of the directories named with `addDocumentsDir()` in the configuration file.  There can be multiple such directories.  As we just said, it is the content files that are processed by AkashaRender.  The processed content lands in the directory named in `setRenderDestination()` in the configuration, if `setRenderDestination()` is not called the rendering directory will be named `out`.

Content files have a file-name-structure meant to document the processing steps. For example:


Extension | Description
----------|--------------
`example.html.md` | A Markdown file, that produces HTML.
`example.html.ejs` | for HTML with EJS markup, that produces HTML.
`example.html` | Straight HTML, copied with no processing.
`example.css.less` | A LESS file, that produces CSS.


The structure of the rendering directory will have a one-to-one correspondence to files in the documents directories.


rendering directory | documents directories | assets directories
--------------------|-----------------------|-----------------------
css/style.css |   | assets/css/style.css
css/style.css     | documents/css/style.css.less |
images/logo.png   |   | assets/images/logo.png
chapter1/intro.html | documents/chapter1/intro.html.md |   
chapter2/install.html | documents/chapter2/install.html.md |  

You can use any directory hierarchy that you wish.  AkashaRender creates in the rendering directory the structure you create in the document and asset directories.  The only limitation placed on EPUB authors is the directory named `META-INF`.  AkashaEPUB automatically generates that directory, because it has special significance to packaging EPUB files.  Do not create the META-INF directory yourself.

Another consideration is the Table of Contents you show to the reader.  Each Table of Contents entry corresponds to an HTML content file.  We'll go over this in more detail later.  In planning your content it's important to know that each addressable entry in the Table of Contents, whether it's a chapter or sub-chapter, must be in its own file.

# Document format

AkashaCMS uses a fairly straightforward file format that supports "metadata" in addition to the content.

```
---
layout: page.html.ejs
title: Four Scores and Seven Years Ago
---
Four score and seven years ago our forefathers brought forth ...
```

The first part, between the `---` lines, is the metadata.  That section is often called _frontmatter_.  The rest is the content which will be rendered through the processing steps dictated by the filename.  

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

The metadata section is actually interpreted as YAML.  While the vast majority of metadata needs are satisfied with `tag: value`, sometimes the metadata must be structured data.  YAML is an immensely flexible structured data format, if you should need it.

Many more details about this are available at:  http://akashacms.com/akasharender/3-create-content.html

# Metadata


There's two kinds of metadata in AkashaEPUB.

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
