---
layout: page.html.ejs
title: AkashaCMS document format
akashacmsEPUB:
    id: chapter3a
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

For most people this is a simple `tag: value` system:

```
    ---
    tag1: value1
    tag2: value2
    tag3: value3
    ---
    The lazy brown fox jumped over the quick green tortoise
    causing many heads to be scratched.
```

The metadata section is actually interpreted as YAML.  That makes it possible to put well-structured data in the metadata section, if you should need it. 

The content section must, of course, be formatted as indicated by the file extension.  For example a filename ending with `.html.md` must be written using Markdown syntax.

You can learn many more details about AkashaCMS documents on the website - [akashacms.com/documents/index.html](http://akashacms.com/documents/index.html)
