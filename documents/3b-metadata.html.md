---
layout: page.html.ejs
title: AkashaCMS document metadata 
---

The document format has a section for metadata, and a section for the content.  In this section we'll discuss the metadata in greater depth, and in the next section we'll discuss content formats, and the section after that we'll bring it all together to discuss the whole rendering process.

The metadata values don't directly show up in the rendered page.  Instead it's data that sits next to the content, and can be used in the rendering process.

For example, when the content is processed by the EJS template engine, every metadata value is available as a variable.  That means when the metadata contains a `title` value, you can inject that value into the content using this EJS command:

```
    <h1><%= title %></h1>
```

Some of the metadata values are interpreted by AkashaCMS or other plugins instead.  For example, the `layout` tag is used during the rendering process to determine which template to use in rendering the page.
