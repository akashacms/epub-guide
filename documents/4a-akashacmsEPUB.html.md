---
layout: page.html.ejs
title: The akashacmsEPUB configuration object
---

As we just learned, we describe an EPUB in the configuration file, `config.js`.  Every bit of that configuration is located in the `akashacmsEPUB` object:

```
    module.exports = {
    ...
        akashacmsEPUB: {
        ...
        };
        ...
    };
```

The goal for the `akashacmsEPUB` object is providing data to generate the XHTML and XML files required for the EPUB container.  To that end the configuration object is structured as so:

```
module.exports = {
...
    akashacmsEPUB: {
        files: {
            // List file names for
            // some generated files
        },
        metadata: {
            // Lists data about the book,
            // like its title, identfiers 
            // like the ISBN, authors, etc.
        },
        cover: {
            // Describes the cover image
        },
        contents: {
            // Describes the 
            // Table of Contents file
        },
        chapters: [
            // Lists the files 
            // for each chapter and sub-chapter
            // Describes the Chapter structure
        ],
        stylesheets: [
            // Lists CSS stylesheets to use
        ],
        assets: [
            // Lists any additional files
            // like fonts or images
        ]
    };
    ...
};
```

All of this data is used to generate various metadata files, and packaging every required file into the EPUB file.  EPUB files are just ZIP files with a `.epub` extension, containing certain files as described in the EPUB3 specification.  And, yes, AkashaEPUB generates the metadata files and the other attributes of EPUB3 packaged documents.

The types of files AkashaEPUB can currently generate are:

* `mimetype` - simple text file containing the required MIME type of the EPUB book.
* `OPF` - The Open Package Format file which indexes every file in the EPUB container, as well as metadata about the book.  OPF is new to EPUB3, and supplants the NCX file.
* `NCX` - The older package index file which, while it has been deprecated by EPUB3, is still useful because many EPUB readers still look in this file for the Table of Contents.
* `HTML Navigation Document` - An HTML page containing the Table of Contents, with navigation markup specified in EPUB3.
* `META-INF/container.xml` - Informs the EPUB software where to find the `ebook.opf`

The EPUB3 specification supports some additional files.  At this time AkashaEPUB does not generate those files.

## Some common parameter types

All through the `akashacmsEPUB` object we'll be making little anonymous objects with attributes that end up as XML attributes in a metadata file.  Some attributes have the same name and behavior from one object to another:

* `id` -- This needs to be a unique identifier for the object.  It always turns into an `id=` attribute on an XML tag, and of course XML requires that `id=` attributes be unique.
* `href` -- This is the path, within the EPUB container, of a file in that container.
* `type` -- This is always the MIME Type of a file in the EPUB container.

## Names of generated files

Let's now look at the first segment of the `AkashaEPUB` configuration.

There are two files where you, the author of your EPUB, need to tell AkashaEPUB the file names to use:


```
    module.exports = {
    ...
        akashacmsEPUB: {
            files: {
                opf: "ebook.opf",
                epub: "guide.epub"
            },
        ...
        };
        ...
    };
```

The `opf` member controls the file name for the OPF file.  That file name is squirted into `META-INF/container.xml` so that EPUB readers know where to find the file.  

The `epub` member controls the file name of the generated EPUB file.

If you don't specify these, the following will be used:

```
    files: {
        opf: "ebook.opf",
        epub: "ebook.epub"
    }
```

## Generating an NCX file

The NCX file is optional.  While the EPUB3 specification says not to use NCX files, many EPUB readers still look for this file.  Some of us will find it useful to generate an NCX file into the EPUB.

The NCX file carries both metadata and a content index, organized to convey the chapter/sub-chapter structure.

To cause AkashacmsEPUB to generate the NCX file, add the following to the `contents` object:

```
    contents: {
        ...
        ncx: {
            id: "ncx",
            href: "toc.ncx"
        }
    },
```

We'll discuss the `contents` object in more detail in a future chapter - [](4d-table-contents.html).  

If the `contents.ncx` member is present, the NCX file is generated.  It's name within the EPUB will be the value of the `href` field.
