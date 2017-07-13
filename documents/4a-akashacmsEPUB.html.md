---
layout: page.html.ejs
title: Loading book metadata (book.yml)
---

As we just learned, we describe an EPUB in the `book.yml` configuration file.  We tell AkashaEPUB which file to read for book metadata this way::

```
akashaEPUB.startup(akashacms, {
    ...
    akashacmsEPUB: {
        metadataFile: path.join(__dirname, "book.yml")
    }
    ...
});
```

The `akashacmsEPUB` object is used internally for lots of other data.

This sample `book.yml` comes from the EPUB Skeleton project.

```
opf: skeleton.opf
epub: skeleton.epub

title: Skeletal AkashaEPUB book
languages: [ en ]
identifiers:
    - unique: true
      idstring: "urn:uuid:b624d2ee-e88a-11e4-b0db-376a7655914b"
creators:
    - id: author
      name: John Smith
      nameReversed: Smith, John
publisher: AkashaCMS.COM
subjects: [ "Reference" ]
rights: "Public Domain"

cover:
    writeHtml: { id: "cover", href: "cover.html" }
    idImage: "cover-image"
    src:  "images/Human-Skeleton.jpg"
    alt:  "AkashaEPUB Skeleton Book"
    type: "image/jpeg"

toc: { href: "toc.html" }
ncx: { id: "ncx", href: "toc.ncx"  }


stylesheets:
    - { id: "stylesheet", href: "/css/style.css" }
#    
# javaScriptTop:
#     - { id: 'foojs', href: 'foo/foo.js' }
#
# javaScriptBottom:
#     - { id: 'oofoojs', href: 'oofoo/oofoo.js' }
```

## What is YAML?

The YAML format is a powerful-but-simple text format for encoding richly structured data.  Think of it as JSON or XML without all the curly braces or angle brackets.  We'll quickly go over the YAML format and in later sections go over specific data items.  The YAML page on Wikipedia ([https://en.wikipedia.org/wiki/YAML](https://en.wikipedia.org/wiki/YAML)) is the best documentation I've found on YAML.

An object is declared using a `name: value` structure.  For string objects the quotation marks are optional.

An array of items is declared using square brackets: `name: [ value1, value2, value3 ]`

An object with named elements is declared with subsidiary `name: value` items.  There are several ways to write such objects:

```
name:
    id: "someId"
    title: The Title String

name: { id: "someId", title: "The Title String" }
```

Finally, a list of items is declared using a `-` character to denote the beginning of each item:

```
name:
    - item1
    - item2

list:
    - { id: "id1", title: "The Title String" }
    - { id: "id2", title: "Another Title String" }
```


## EPUB Metadata files


The metadata you enscribe in your book project is used to generate various metadata files and packaging every required file into the EPUB file.  EPUB files are just ZIP files with a `.epub` extension, containing certain files as described in the EPUB3 specification.  

The types of files AkashaEPUB can currently generate are:

* `mimetype` - simple text file containing the required MIME type of the EPUB book.
* `OPF` - The Open Package Format file which indexes every file in the EPUB container, as well as metadata about the book.  OPF is new to EPUB3, and supplants the NCX file.
* `NCX` - The older package index file which, while it has been deprecated by EPUB3, is still useful because many EPUB readers still look in this file for the Table of Contents.
* `HTML Navigation Document` - An HTML page containing the Table of Contents, with navigation markup specified in EPUB3.
* `META-INF/container.xml` - Informs the EPUB software where to find the `ebook.opf`

The EPUB3 specification supports some additional files.  At this time AkashaEPUB does not generate those files.

## Names of generated files

Let's now look at the first segment of the `book.yml` configuration.

There are two files where you, the author of your EPUB, need to tell AkashaEPUB the file names to use:


```
opf: skeleton.opf
epub: skeleton.epub
```

The `opf` member controls the file name for the OPF file.  That file name is squirted into `META-INF/container.xml` so that EPUB readers know where to find the file.  

The `epub` member controls the file name of the generated EPUB file.

If you don't specify these, the following will be used:

```
opf: "ebook.opf"
epub: "ebook.epub"
```

## Generating an NCX file

The NCX file is optional.  While the EPUB3 specification says not to use NCX files, many EPUB readers still look for this file.  Some of us will find it useful to generate an NCX file into the EPUB.

The NCX file carries both metadata and a content index, organized to convey the chapter/sub-chapter structure.

To cause AkashacmsEPUB to generate the NCX file, add the following to the `book.yml` file:

```
toc: { href: "toc.html" }
ncx: { id: "ncx", href: "toc.ncx"  }
```

We'll discuss Table of Contents generation in more detail in a future chapter - [](4d-table-contents.html).  

If the `ncx` member is present, the NCX file is generated.  It's name within the EPUB will be the value of the `href` field.
