---
layout: page.html.ejs
title: Creating content for an AkashaEPUB book
---

In AkashaEPUB, the content files are simply whatever is recognized by AkashaCMS.  Out of the box HTML, HTML with EJS markup, or Markdown are supported.  It is possible to register other formats with AkashaCMS.  Markdown is the preferred format to use for writing.

You simply create content files in the `root_docs` directory named this way:
* `example.html.md` -- for Markdown
* `example.html.ejs` -- for HTML with EJS markup
* `example.html` -- Straight HTML

These file names are meant to be read from right-to-left.  A `.html.md` file is first processed by Markdown, producing `example.html` as the output.

There are two directories within which to put content, as we discussed earlier.

* `root_docs` (a.k.a. `documents`) contains document files that are processed into HTML.
* `root_assets` (a.k.a. `assets`) contains other kind of files that are simply copied without processing.

You can use any hierarchy under those directories that you wish.  The only limitation is the directory named `META-INF`.  AkashaEPUB generates that directory for you, so don't create it yourself.

AkashaEPUB generates one Table of Contents entry from each file.  That means anything you want listed in the Table of Contents has to be its own document file.

