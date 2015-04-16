---
layout: page.html.ejs
title: AkashaCMS document format
---


AkashaCMS uses a fairly straightforward file format that supports "metadata" in addition to the content.

```
    ---
    layout: page.html.ejs
    title: Four Scores and Seven Years Ago
    ---
    Four score and seven years ago our fathers brought forth ...
```

The first part, between the `---` lines, is the metadata.  

While the metadata looks like a simple `tag: value` system, it's actually interpreted as YAML making it possible to put well-structured data in the metadata section.  It's unlikely that someone generating EPUB files with AkashaEPUB will need well structured metadata of the sort YAML can represent.  In fact, we're unlikely to need more than those two tags.

The content section must, of course, be formatted as indicated by the file extension (either Markdown, HTML/EJS or HTML).

You can learn many more details about AkashaCMS documents on the website - [akashacms.com/documents/index.html](http://akashacms.com/documents/index.html)
