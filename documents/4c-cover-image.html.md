---
layout: page.html.ejs
title: The Cover Image for your book
---

Even digital books need cover images.  We humans have hundreds of years experience of books with covers, and often judge books by their cover.  We do this even though we're warned to not judge a book by its cover.  The online e-book stores perpetuate this pattern by showing a cover image for each book.  Hence, a cover image is needed even for an electronic book that doesn't have a cover.

In EPUB the cover image is listed among the files in the OPF manifest, which we'll discuss in greater depth later - [](4d-table-contents.html)

There are two cover image objects used by EPUB.  The first is the image itself, and some EPUB reader software looks only at that image.  The second is an HTML file that only displays the cover image.  AkashaEPUB will put both into the manifest.

All the relavent information is declared this way:

```
cover:
    writeHtml: { id: "cover", href: "cover.html" }
    idImage: "cover-image"
    src:  "images/Human-Skeleton.jpg"
    alt:  "AkashaEPUB Skeleton Book"
    type: "image/jpeg"
```

The `writeHtml` element describes the generated HTML cover file.

The `src` member is the pathname to the image, while the `alt` member is the `alt=` text used in the HTML file, and the `type` member is its MIME type.

From this, AkashaEPUB generates two entries in the OPF manifest.  The first is the HTML file, that will be named `cover.html`, containing only an `img` tag to show the cover image.  The second simply refers to the image file.

## How big?

It pays to make a large cover image because the screens on EPUB readers are getting better and better.  For example, the highest resolution iPad currently on the market has a 2048x1536 pixel screen whereas the original iPad's screen resolution was 1024x768.  That's 4x the pixels in the same screen size.

It means that iPad EPUB reader software will fill most of the screen with your cover image.  If yours is 900x600 pixels, the reader software will have to scale it up to fill the screen, and it won't look good.

It's better to make the cover image too large and let the EPUB reader software scale it down, than to make the image too small and have it scaled up.

The other consideration is the width-to-height ratio.  The convention for cover images is that they're taller than they are wide, or what is otherwise called Portrait Mode.  The aspect ratio is up to you, but by convention is about 3:2.

In other words, a 2000 pixel wide cover image should be 3000 pixels high.

## Image format?

Our example above showed use of a PNG file.  They're good because of loss-less compression.

EPUB readers are also supposed to support SVG files, but that hasn't been tested with AkashaEPUB.  SVG is in theory better than any raster image format like PNG, because SVG is a Vector Graphics format and automatically scales to any resolution without loss of precision.
