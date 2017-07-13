---
layout: page.html.ejs
title: Chapter & section metadata, and the Table of Contents
---

We structure book content into chapters and sections.  It's more than just a hold-over from print books, it's a good way to divide books into topical sections.  

The implementation in an EPUB file is

* The OPF file contains a linear flat list of links to HTML pages
* The NCX file (optional, and deprecated) contains a tree structured list of links to HTML pages
* The Navigation Document is an HTML file, that appears in the reading order of the book pages, containing nested OL lists linking to the HTML pages.  This file also has HTML5 markup allowing EPUB reader software to treat it as data.

AkashaEPUB looks for a tree of chapter/section data in the document metadata.  That tree starts in the Table of Contents HTML file, which is declared in `book.yml` this way:

```
toc: { href: "toc.html" }
```

The document metadata for that file (in this case, `toc.html.ejs`) lists the chapters.  It is done as so:

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
        - 1-introduction.html
        - 2-installation.html
        - 3-creating-content.html
        - 4-configuration.html
        - 5-building-EPUB.html
        - 6-akashacms-project.html
        - 7-about.html
        - 8-references.html
---
```

The `akashacmsEPUB.id` item must be present in every chapter or section document, and must be unique across the whole book.  This item specifies the `id` in manifest entries in the OPF and NCX files.

In the HTML Table of Contents, AkashaEPUB generates a tree of nested OL lists corresponding to the chapter/section structure found in the document metadata.
The top-level OL of the HTML Table of Contents can have its numbering style controlled by `toctype` and `tocstart`.  These attributes become `<ol type=".." start="..">...</ol>`.

Hence, the values for toctype are:

* '1' - decimal
* 'a' - lower-case alpha
* 'A' - upper-case alpha
* 'i' - lower-case roman numerals
* 'I' - upper-case roman numerals

As shown here the top-level OL will start at '0', and that's to make the Copyright page into "Chapter 0" and to have Chapter 1 be numbered as '1' in the HTML Table of Contents.

The `toc.html.md` file tells AkashaEPUB which documents to treat as chapters.  Chapters are at the top level of the nested OL lists, and if an NCX is to be generated they are at the top level of that files manifest.  What about the sections?

Consider:

```
---
layout: chapter-index.html.ejs
title: Structuring your book
akashacmsEPUB:
    id: chapter4
    sections:
        - 4a-akashacmsEPUB.html
        - 4b-book-metadata.html
        - 4c-cover-image.html
        - 4d-table-contents.html
        - 4e-copyright-page.html
        - 4f-links.html
        - 4g-assets.html
        - 4h-stylesheets.html
        - 4i-fonts.html
        - 4j-configjs.html
---
```

The metadata structure is similar to what we saw in `toc.html.md` except it contains a "sections" object where, before, there'd been a "chapters" object.  Other than the name of the object, they're identical in purpose.  Both are a list of references to other documents.

Any document for which there is to be sub-sections must have an `akashacmsEPUB.sections` list.

To recap how the chapter/section structure is described to AkashaEPUB

* **Chapters**: These are listed in the metadata of `toc.html.md`
* **Sections**: These are listed in the metadata of any other document file

Internally, AkashaEPUB goes through the documents constructing a data structure corresponding to the chapter/section tree.
