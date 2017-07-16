---
layout: page.html.ejs
title: The Copyright page
---

Having a legally correct copyright page makes the ownership clear to your readers.  While there is an automatic copyright when a work is published, it is probably helpful to go ahead and add a copyright page.

The implementation is easy, simply list a copyright page in the `chapters` of the HTML Table of Contents file.  In that page write the content you believe is the correct copyright statement.  Neither AkashaEPUB nor EPUB3 will attach any special significance to the file, it's just a bit of content to show to the reader.

```
---
title: Table of Contents
layout: page.html.ejs
akashacmsEPUB:
    id: "toc"
    toctype: 1
    tocstart: 0
    chapters:
        - 0a-copyright.html
        ...
---
```

That's it.  The page will show up in the Table of Contents, of course, and in the reading order of the book.

In [4b-book-metadata.html we briefly discussed the `rights` attribute in the metadata.  That's another place to put a copyright statement, but only a brief single-sentence statement.  The copyright page should contain a full copyright statement like you'd see in a printed book.
