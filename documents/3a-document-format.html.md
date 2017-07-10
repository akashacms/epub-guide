---
layout: page.html.ejs
title: The AkashaRender document format
---

AkashaCMS uses a fairly straightforward file format that supports "metadata" in addition to the content.

```
---
layout: page.html.ejs
title: Four Scores and Seven Years Ago
---
Four score and seven years ago our forefathers brought forth ...
```

The first part, between the `---` lines, is the metadata.  The rest is the content which will be rendered through the processing steps dictated by the filename.  

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
