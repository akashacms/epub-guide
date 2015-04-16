---
layout: page.html.ejs
title: Configuration
---

AkashaCMS provides for us a configuration format which you can read about on the website ([akashacms.com/configuration/index.html](http://akashacms.com/configuration/index.html)).  In this chapter we'll focus just on the parts of `config.js` required for AkashaEPUB.

For AkashaEPUB, the `config.js` has some specific considerations.  It's useful to study the config file for this guide to learn what to do. ([github.com/akashacms/epub-guide/blob/master/config.js](https://github.com/akashacms/epub-guide/blob/master/config.js))  Let's take a walk through that file and see how it's put together.

The `config.js` is a Node.js module itself, but we primarily use it to hold data rather than code.  It can, and does, contain code but it's primary purpose is holding data.  You won't need to write code in the `config.js`, just the configuration data we'll discuss here.  However, you do have the freedom to do so if desired.

# akashacmsEPUB - data to generate Manifest and Table of Contents

The EPUB format is a ZIP archive containing HTML files comprising the ebook content, image or CSS files to help present the content, and metadata files in XML format used by EPUB reader software.  In the previous chapter we went over creating the content files, now we need to see how AkashaEPUB generates these metadata files.  

These files are generated automatically by AkashaEPUB, derived from configuration data in `config.js`.  The `akashacmsEPUB` tag in `config.js` is where we put that data.

The files AkashaEPUB can generate (currently) are:

* `mimetype` - simple text file containing the required MIME type of the EPUB book.
* `ebook.opf` - An index to every file in the EPUB container, as well as metadata about the book.
* `toc.ncx` - Another index, focusing on the Table of Contents.
* `toc.html` - An HTML page version of the Table of Contents.
* `META-INF/container.xml` - Informs the EPUB software where to find the `ebook.opf`

The EPUB specification supports additional files.  At this time AkashaEPUB does not generate those files, and if needed/desired they can be added.

With EPUB3, the OPF file (Open Package Format) is the "package document" containing all the metadata information about the book.  It also generates an NCX file in an effort to be compatible with older EPUB2 readers.  

Within the `akashacmsEPUB` object are several objects holding the data required to generate those files.

* `files2generate` - lists the file names and other data used while AkashaEPUB generates the files.
* `metadata` - contains the book metadata.
* `manifest` - lists all the files to be written to the EPUB container, and other data used while generating the table of contents.
* `toc` - lists the `id` of Table of Contents entries, structured in a chapter/sub-chapter arrangement.
* `stylesheets` - lists CSS files to be used in HTML files.

## Files to Generate (`files2generate`)

Let's take a look at the `files2generate` object.


```
module.exports = {
...
    akashacmsEPUB: {
        files2generate: {
            opf: "ebook.opf",
            ncx: "toc.ncx",
            toc: "toc",
            epub: "guide.epub"
        },
    ...
    };
    ...
};
```

The `opf` member controls the file name for the OPF file.  That file name is squirted into `META-INF/container.xml` so that EPUB readers know where to find the file.  

The `ncx` member controls the file name for the NCX file.  This is a hold-over from EPUB2 that's still supported for EPUB3.  This file name turns into an entry in the `manifest` in the OPF file.  AkashaEPUB generates this file for compatibility with older EPUB reader software.

The `toc` member gives the `id` of the item in `manifest` for the HTML Table of Contents.  We'll cover this later on.

The `epub` member controls the file name of the generated EPUB file.
