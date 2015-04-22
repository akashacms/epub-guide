---
layout: page.html.ejs
title: The Copyright page
---

Having a legally correct copyright page makes the ownership clear to your readers.  While there is an automatic copyright when a work is published, it is probably helpful to go ahead and add a copyright page.

The implementation is easy, simply list a copyright page in the `chapters` array, then in that page write the content you believe is the correct copyright statement.  Neither AkashaEPUB nor EPUB3 will attach any special significance to the file, it's just a bit of content to show to the reader.

```
    chapters: [
        {
            id: "chapter0",
            title: "Copyright",
            href: "0a-copyright.html",
            type: "application/xhtml+xml",
            navclass: "book"
            
        },
    ...
    },
```

That's it.  The page will show up in the Table of Contents, of course, and in the reading order of the book.

In [](4b-book-metadata.html) we briefly discussed the `rights` attribute in the metadata.  That's another place to put a copyright statement, but only a brief single-sentence statement.  The copyright page should contain a full copyright statement like you'd see in a printed book.