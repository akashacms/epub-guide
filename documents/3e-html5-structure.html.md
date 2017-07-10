---
layout: page.html.ejs
title: Summary of HTML5 markup in AkashaEPUB Documents
---

In EPUB2, content was supposed to be written in XHTML, the XML variant of HTML.  With the switch to EPUB3 there was an opportunity to switch to straight HTML, but they stuck with XHTML to preserve compatibility with older EPUB Reader devices.  However, they did adopt HTML5 because that's the neat new hotness on the block.  The HTML5 specification includes a variant, XHTML5, and that is what EPUB3 uses.

AkashaEPUB's Markdown renderer automatically generates the correct sort of HTML.

When including your own HTML tags in a document remember that with XHTML5 you must include the closing tag.  We have to reform our old lazy ways of leaving off the closing tag, in other words.  The ```<tagname/>``` variation doesn't work terribly well in my experience.  Instead you must write tags as ```<tagname></tagname>```.

## Useful HTML5 tags

There are some useful HTML5 to consider using in your documents

```
<section></section>
<section epub:type="..."></section>
```

Informs web browsers or eReaders of some structure in the document.

Types:
  * `epub:type=chapter`:  Marks a chapter, so you can have multiple chapters per content file.
  * `epub:type=part`:


```
<article></article>
```

This would be useful for something like a magazine or newspaper, where the publication contains a group of individual articles.

```
<aside></aside>
<aside id="..." epub:type="..."></aside>
```

Containing content that is outside, aside to, the normal reading flow.  Such as a sidebar or footnote.
  * `epub:type=sidebar`:
  * `epub:type=endnote`:


```
<a href="#anchorName" epub:type="noteref">2</a>
<aside epub:type="footnote">... footnote content</aside>
```

Is how to represent a footnote.

```
<dl epub:type="glossary">
<dt><dfn>Brimstone</dfn></dt>
<dd>Sulphur; See <a href="#def-sulphur">Sulphur</a>.</dd>
</dl>
```

For glossary entries.


```
<nav epub:type="toc"><h2>...</h2><ol>...</ol></nav>
```

Creates navigational links.  The primary use is in the navigation document, a.k.a. table of contents page.  But it can be used anywhere you want to have additional lists of links.  For example, some authors like to put a small table of contents at the beginning of chapters.

```
<header>...</header>
<footer>...</footer>
```

Stuff for the top or bottom of a page.

```
<audio>...</audio>
<video>...</video>
```

Play multimedia

### Read further

There's a lot more HTML5 tags available, these just scratch the surface and were chosen because of their likelihood for use in an EPUB and that they're outside the typical tags.


### LINK, IMG tags and the requirement for relative URL's

The `<link>` and `<img>` tags, and other tags referring to other content, are as we are accustomed to in regular websites.  They're used to refer to another file of some kind, whether it is a CSS stylesheet, an image, a font, or a JavaScript file.  The URL reference, usually in the `href` or `src` attribute, has some special considerations, however.

In EPUB there is no "webroot" concept.  Therefore an `href="/css/style.css"` is wrong because the leading `/` does not resolve to anything, and instead causes an error.  Instead paths must always be relative to the current document.  Instead you might have `href="../../css/style.css"`.

Another limitation is that EPUB readers typically do not have an Internet connection.  Where a website might reference a stylesheet from a CDN, or pull down images from an image service, it's really bad form to do so in an EPUB.  In cases like an image or CSS file, the URL must be a local file reference and the corresponding resource file must be contained in the EPUB.  

It is possible to use an `<a>` tag to link to external web pages.  Just be clear that in some cases the person reading the document will not be able to click on the link.
