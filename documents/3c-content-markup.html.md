---
layout: ebook-page.html.ejs
title: Content markup formats
---

As we said earlier, AkashaRender (and therefore AkashaEPUB) capable of supporting several content markup formats.  It currently supports Markdown and EJS, with Markdown being primarily intended for people writing content, and EJS primarily intended for the web or book designer.  

The AkashaCMS website (http://akashacms.com/akasharender/layouts-partials.html) has more info on document formatting with AkashaCMS.

## Markdown files

Files are to be named `example.html.md` with the `.html.md` part of the file name indicating it is a Markdown file.

Markdown is a content markup language for plain text files.  The formatting syntax is designed to be easily written, with enough capability for routine text documents, and can be used in any plain text editor.   All the content in this guide is written using Markdown.

The Markdown Tutorial ([markdowntutorial.com/](http://markdowntutorial.com/)) is a good place to start your understanding of Markdown.

John Gruber invented Markdown, and wrote up its syntax on his site ([daringfireball.net/projects/markdown/](http://daringfireball.net/projects/markdown/)).  Unfortunately there has been incompatibility between different Markdown implementations.  CommonMark ([commonmark.org](http://commonmark.org/)) is an attempt to standardize the Markdown syntax among Markdown processors.  AkashaRender uses the markdown-it processor ([npmjs.com/package/markdown-it](https://www.npmjs.com/package/markdown-it)) processor, whose author is committed to the CommonMark cause.

The markdown-it processor used by AkashaCMS supports some of the Github Flavored Markdown extensions ([help.github.com/articles/github-flavored-markdown/](https://help.github.com/articles/github-flavored-markdown/)).

## HTML+EJS files

EJS uses special tags embedded in HTML allowing the substitution of data into HTML renderings.  In AkashaCMS, all the metadata is available as variables for easy substitution into rendered HTML.

It's not recommended to use EJS when writing, but it's a vital tool for layout template files as we've already seen.

For EJS documentation see the EJS module ([npmjs.com/package/ejs](https://www.npmjs.com/package/ejs)).

There are two tags of primary interest.
* `<%= variable %>` substitutes the value of the variable, encoding any special characters as HTML encodings.
* `<%- variable %>` substitutes the value of the variable, with no encoding.

## Other document formats

AkashaRender has a pluggable rendering system allowing one to fairly easily plug-in their own rendering algorithm.  Some writers prefer AsciiDOC over Markdown, for example, or perhaps might write content in an WYSIWYG HTML editor and develop a Renderer to extract content from the files it produces.

Another area of interest is different template engines like DustJS or Mustache.  They, too, would be integrated with AkashaRender the same way.

See the documentation on creating Renderer objects:  http://akashacms.com/akasharender/rendering-engines.html

Bottom line is that while AkashaRender today supports Markdown documents, and EJS templates, it's relatively simple to extend it to support other document formats and template systems.
