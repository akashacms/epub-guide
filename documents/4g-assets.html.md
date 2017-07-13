---
layout: page.html.ejs
title: Asset files
---

HTML supports displaying images and using CSS to customize page formatting and styling.  With EPUB3 some of the cutting edge modern HTML5 techniques are supported by EPUB readers, so we might as well take advantage of them.

Over the next two sections we'll discuss inserting the image and stylesheet files into our EPUB, and how to use them in the content.

The word `assets` refers to any additional files, like images, fonts or stylesheets, to support displaying content pages as desired.  

If an image is worth a thousand words to you, then by all means include images.  Customizing the fonts and the presentation of certain elements can make a big difference in readibility and what your readers feel about your product.

How do we include asset files in the EPUB?  Simply drop them into either the `root_assets` or `root_docs` directory.  AkashaCMS will automatically copy everything over to `root_out`.

That's it.  AkashaEPUB will automatically ensure the asset files are listed in the OPF file manifest.
