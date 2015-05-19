---
layout: page.html.ejs
title: The AkashaEPUB quick start guide
akashacmsEPUB:
    id: chapter2d
---

In <a href="2-installation.html"></a> we built a complete working EPUB with the epub-skeleton "book".

That means it's possible to skip all the details in the rest of this guide book, start your book with epub-skeleton, and just get on with the business of writing.

If you want to do that, do skim through the following two chapters:

* <a href="3-creating-content.html"></a>
* <a href="4-configuration.html"></a>

The files in epub-skeleton are self-explanatory enough to simply use them as an example.  Those two chapters will help you understand how everything fits together.

The quick start is:

1. Download epub-skeleton, renaming it to match your book title
2. Modify the metadata in `config.js` to match your book title
3. Start writing Markdown files, using the files in epub-skeleton as a guide
4. Drop any required image files into the `root_assets` directory
5. Declare all files in the `manifest` object in `config.js`
6. Use `grunt doepub` to build the EPUB
7. PROFIT


