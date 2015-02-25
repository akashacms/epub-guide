---
layout: page.html.ejs
title: Creating content for an AkashaEPUB
---

In AkashaEPUB, the content files are simply whatever is recognized by AkashaCMS.  Out of the box it supports HTML, HTML with EJS markup, or Markdown.  For writing, Markdown is the preferred format to use of those three.

You simply create a content file in the `root_docs` directory named as so:
* `example.html.md` -- for Markdown
* `example.html.ejs` -- for HTML with EJS markup
* `example.html` -- Straight HTML

Inside the file you put the content desired, of course.

Markdown files --> documents

images and other assets --> assets

Declare in the Manifest, which is in the config, which we'll go over in the next chapter
