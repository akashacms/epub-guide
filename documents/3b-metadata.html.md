---
layout: page.html.ejs
title: AkashaRender document metadata
---

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

For more information on both, see: http://akashacms.com/akasharender/layouts-partials.html
