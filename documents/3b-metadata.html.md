---
layout: page.html.ejs
title: AkashaCMS document metadata & page rendering
---

The metadata section provides additional data beyond the content section.  Some metadata values tell AkashaCMS what to do, and others are simply data.  Quite extensive things can be done with the document metadata.  However, within the context of generating EPUB files with AkashaEPUB, we expect the metadata needs to be modest.  The most likely-to-be-useful metadata tags are `title` and `layout`.

* `title` - The page title.
* `layout` - Specifies the layout template file to use, which is located in the root_layouts directory.

In this case, the `layout` tag tells AkashaCMS how to format the content into an HTML file, while the `title` tag is data about the page title.

The metadata values are made available as variables while rendering the templates.  We'll see in <a href="3d-rendering.html"></a> how they're used.