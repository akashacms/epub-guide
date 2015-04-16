---
layout: page.html.ejs
title: Generating the Table of Contents
---


There are three sources from which an EPUB reader can get a table of contents to display:  the `OPF` file (in its `manifest`), the `NCX` file (in its `navMap`), and the `toc.html` file.  AkashaEPUB generates all three, with the NCX file being present primarily for older EPUB readers.  The OPF and NCX files are XML, meant for the EPUB reader to interpret, while the HTML file is meant for direct human display.

The primary source is the `manifest` and `toc` members of the `akashacmsEPUB` object.  There's a lot of moving parts here so pay careful attention.

The `manifest` does two things 
* it lists every file that's packaged into the EPUB 
* it lists detailed information on the items in the Table of Contents.
* 
Consider:

```

    manifest: [
    ...
    
        {
            id: "chapter1",
            title: "Introduction to AkashaEPUB",
            href: "1-introduction.html",
            type: "application/xhtml+xml",
            spineorder: 3,
            navclass: "book"
        },
        ...
        { id: "stylesheet", href: "css/style.css", type: "text/css" },
        ...
        { 
            id: "epub.embedded.font.1",
            href: "fonts/UbuntuMono-B.ttf",
            type: "application/vnd.ms-opentype" 
        },
        ...
    ]
```

Items in the `manifest` that are meant to appear in the Table of Contents must have a `spineorder` property.  The `spineorder` is an integer used to sort these entries into the desired order, specifically controlling both the order of `navPoint` entries in the NCX file and the order of `spine` section of the OPF file.  The `manifest` will also list other files such as images or CSS stylesheets, and these must not have a `spineorder` property.

The `id` attribute is a unique identifier within the scope of the NCX and OPF files.  The `title` attribute will be dynamically replaced by the `title` metadata attribute from the corresponding document file.  The `href` attribute is the pathname, within the EPUB container, of the file.  The `type` attribute is the MIME type for the file.  The `navclass` attribute controls the `class` attribute of `navPoint` entries in the NCX file.

The likely MIME types are:

* `application/xhtml+xml` - Use this for the HTML files.
* `text/css` - Use this for CSS stylesheets.
* `image/png` - Use this for PNG images, `image/jpeg` for JPG images, etc
* `application/vnd.ms-opentype` - Use this for Open Type font files

One manifest entry controls the cover image, like this:

```
    {
        id: "ebook-cover-image",
        properties: "cover-image",
        href: "images/epub-guide-cover.png",
        type: "image/png"
    },
```

Use the `properties` attribute as shown.  The `id` property should match this `metadata` entry:

```
    cover: "ebook-cover-image",
```

One manifest entry controls the generated HTML Table of Contents, like this:

```
    {
        id: "toc",
        title: "Table of Contents",
        href: "toc.html",
        path: "toc.html.ejs",
        type: "application/xhtml+xml",
        spineorder: 2,
        navclass: "toc",
        toclayout: "page.html.ejs",
        properties: "nav"
    },
```

The `id` attribute should match the `toc` entry in the `files2generate` object.  This `manifest` entry is a little different because it doesn't correspond to an actual file on disk.  That is, we don't create a `toc.html.ejs` file in the `root_docs` directory.  Instead, AkashaEPUB generates an in-memory file for us using the `path`, `title` and `toclayout` attributes, pretending that we had created a file named `toc.html.ejs` containing this:

```
    ---
    layout: page.html.ejs
    title: Table of Contents
    ---
    
    ... HTML for the Table of Contents
```

When all the files are rendered, this in-memory Table of Contents is rendered into `toc.html`.  You are in control of the title and layout of the Table of Contents page, and the entries all come from the `manifest`.

## Generating the chapter/sub-chapter structure

Generally speaking books are structured as Chapters and Sub-chapters, or sections.  In some cases there will be sub-sections and sub-sub-sections, and so on.  In your content you'll use the H1 through H6 tags as appropriate, but how do you represent this in the Table of Contents?

The HTML Table of Contents is rendered as nested OL lists to represent the chapter/sub-chapter structure.

We know that the `manifest` provides all the entries for the Table of Contents, but how do we describe the chapter/sub-chapter structure?  We do so with the `toc` object.  This example object should demonstrate the chapter/sub-chapter hierarchy.

```
    toc: [
        { id: "cover" },
        { id: "toc" },
        {
            id: "chapter1",
            subtoc: [
                { id: "chapter1a" },
                { id: "chapter1b" }
            ]
        },
        {
            id: "chapter2",
            subtoc: [
                { id: "chapter2a" }
            ]
        },
        {
            id: "chapter3"
        }
    ],
```

The `id` attributes refer to `manifest` entries, and the `subtoc` attributes form the chapter/sub-chapter hierarchy.  Where the `spineorder` attribute puts the `manifest` entries in order, it is this `toc` object which gives the desired structure.

The HTML Table of Contents is generated by traversing this data, as is the `spine` attribute in the OPF file.
