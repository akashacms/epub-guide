---
layout: page.html.ejs
title: AkashaCMS document metadata 
---

There's two kinds of metadata in AkashaEPUB.

1. The book metadata specified by EPUB to describe the document.
1. The per-file metadata enscribed inside each file that helps AkashaCMS render the files.

The [previous section](3a-document-format.html) just described the latter while going over the document format.  Let's take a look at how the per-file metadata is used.

The metadata doesn't directly show up in the rendered page.  Instead it is carried next to the content, and can be used in the rendering process.

Some rendering modules can inject the metadata into the rendered document.  For example, with the EJS template engine every metadata value is available as a variable inside the template.  For a file containing this metadata:

```
    ---
    title: The quick brown fox
    ... other metadata
    ---
    
    .... content
```

This EJS snippet brings the `title` value into the rendered document:

```
    <h1><%= title %></h1>
```

Other metadata values are interpreted by AkashaCMS or other plugins instead.  For example, the `layout` tag is used during the rendering process to determine which template to use in rendering the page.  The final rendered document depends on the sequence of templates used in the rendering.
