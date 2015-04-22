---
layout: page.html.ejs
title: Asset files
---

HTML supports displaying images and using CSS to customize page formatting and styling.  With EPUB3 some of the cutting edge modern HTML5 techniques are supported by EPUB readers, so we might as well take advantage of them.

Over the next two sections we'll discuss inserting the image and stylesheet files into our EPUB, and how to use them in the content.

The word `assets` refers to any additional files, like images, fonts or stylesheets, to support displaying content pages as desired.  

If an image is worth a thousand words to you, then by all means include images.  Customizing the fonts and the presentation of certain elements can make a big difference in readibility and what your readers feel about your product.

How do we include asset files in the EPUB?  Simply drop them into either the `root_assets` or `root_docs` directories.  AkashaCMS will automatically copy everything over to `root_out`.

The next step is to make sure the EPUB container informs EPUB readers about these files.  It does so by listing entries in the OPF file manifest.  

The asset files are held in these two portions of the `akashacmsEPUB` object.

```
    stylesheets: [
        // Lists CSS stylesheets to use
    ],
    assets: [
        // Lists any additional files like fonts or images
    ]
```

The items listed in these arrays end up in the OPF manifest.

## Using image files

In your content you can write `<img src="images/foobar.jpg"/>` and drop `foobar.jpg` into the `images` directory under `root_assets`.  When the EPUB is built, the image will be copied to `root_out` as `images/foobar.jpg`.  Does that mean you're done?  Nope.  The manifest in the OPF file needs to list the image.  The way to do this is with this entry in the `assets` array.

```
    assets: [
        { id="fooberjpg", href: "images/foobar.jpg", type: "image/jpeg" }
    ]
```

That takes care of generating the correct OPF manifest entry.  The fields should be self-explanatory, because we've already used these object attributes several times:

* `id` -- The `id=` value in the OPF file
* `href` -- The location within the EPUB for the file
* `type` -- The MIME type for the file.

All asset files in both the `stylesheets` and `assets` array use this object format.  What will differ is the MIME type which of course needs to match the file.
