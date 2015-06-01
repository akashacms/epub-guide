---
layout: chapter-index.html.ejs
title: Creating book content to be rendered by AkashaEPUB 
akashacmsEPUB:
    id: chapter3
    sections:
        - 3a-document-format.html
        - 3b-metadata.html
        - 3c-content-markup.html
        - 3d-rendering.html
        - 3e-html5-structure.html
chapterNumber: 3
sections: 
  - url: 3a-document-format.html
  - url: 3b-metadata.html
  - url: 3c-content-markup.html
  - url: 3d-rendering.html
  - url: 3e-html5-structure.html
---

The goal with AkashaEPUB is to generate XHTML files, CSS files and other assets, packaging them in an EPUB formatted ZIP archive.

To generate these files, AkashaEPUB leverages AkashaCMS's rendering flexibility.  The model is to take an easy-to-write markup format like Markdown, run it through some processing, packaging the HTML for the destination.  With AkashaCMS the destination is a web server for display on web browsers, and for AkashaEPUB the destination is an EPUB ebook reader.

You author the pages of your book in the `root_docs` directory.  Files under that directory are processed by the AkashaCMS rendering process.  Any 'asset' files (images, CSS, JavaScript) should be copied without processing, and therefore are to be placed in the `root_assets` directory.

An exception to this is if you with to write your CSS using a preprocessor like LESS.  Because it would be processed by AkashaCMS, put it in the `root_docs` directory.

The content files have a file name structure which sort of documents the processing.  For example:

<table>
<tr><th>Extension</th><th>Description</th></tr>
<tr><td>`example.html.md` </td><td> A Markdown file, that produces HTML.</td></tr>
<tr><td>`example.html.ejs` </td><td> for HTML with EJS markup, that produces HTML.</td></tr>
<tr><td>`example.html` </td><td> Straight HTML, copied with no processing.</td></tr>
<tr><td>`example.css.less` </td><td> A LESS file, that produces CSS.</td></tr>
</table>

The directory structure of `root_out` exactly mimics the structure in `root_assets` and `root_docs`.  Here's a few example files

<table>
<tr><th>root_out contents </th><th> root_docs </th><th> root_assets</th></tr>

<tr><td>css/style.css </td><td>   </td><td> root_assets/css/style.css </td></tr>
<tr><td>css/style.css     </td><td> root_docs/css/style.css.less </td><td>  </td></tr>
<tr><td>images/logo.png   </td><td>       </td><td> root_assets/images/logo.png </td></tr>
<tr><td>chapter1/intro.html </td><td> root_docs/chapter1/intro.html.md </td><td>  </td></tr>
<tr><td>chapter2/install.html </td><td> root_docs/chapter2/install.html.md </td><td>  </td></tr>
</table>

You can use any directory hierarchy that you wish.  The only limitation is the directory named `META-INF`.  AkashaEPUB generates that directory for you, because it has special significance to EPUB.  Don't create the META-INF directory yourself.

Another consideration is the Table of Contents you show to the reader.  Each Table of Contents entry corresponds to an HTML content file.  We'll go over this in more detail later.  In planning your content it's important to know that each addressable entry in the Table of Contents, whether it's a chapter or sub-chapter, must be in its own file.



