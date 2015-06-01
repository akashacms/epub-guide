---
layout: page.html.ejs
title: Content markup formats
akashacmsEPUB:
    id: chapter3c
---

As we said earlier, AkashaCMS (and therefore AkashaEPUB) supports several content markup formats.  For the purpose of book writing, Markdown is recommended for the written content and EJS is recommended for layout templates.  However, if your book incorporates external data it might be useful to use EJS in some of the content pages.

The AkashaCMS website ([akashacms.com/documents/index.html](http://akashacms.com/documents/index.html)) has more info on document formatting with AkashaCMS.

## Markdown files

Files are to be named `example.html.md` with the `.html.md` part of the file name indicating it is a Markdown file.

Markdown is a content markup language for plain text files.  The formatting syntax is designed to be easily written, with enough capability for routine text documents, and can be used in any plain text editor.   All the content in this guide is written using Markdown.

The Markdown Tutorial ([markdowntutorial.com/](http://markdowntutorial.com/)) is a good place to start your understanding of Markdown.

John Gruber invented Markdown, and wrote up its syntax on his site ([daringfireball.net/projects/markdown/](http://daringfireball.net/projects/markdown/)).  CommonMark ([commonmark.org](http://commonmark.org/)) is an attempt to standardize the Markdown syntax among Markdown processors.  AkashaCMS uses the markdown-it processor ([npmjs.com/package/markdown-it](https://www.npmjs.com/package/markdown-it)) processor, whose author is committed to the CommonMark cause.

The markdown-it processor used by AkashaCMS supports some of the Github Flavored Markdown extensions ([help.github.com/articles/github-flavored-markdown/](https://help.github.com/articles/github-flavored-markdown/)).

## HTML+EJS files

EJS uses special tags embedded in HTML allowing the substitution of data into HTML renderings.  In AkashaCMS, all the metadata is available as variables for easy substitution into rendered HTML.

It's not recommended to use EJS when writing, but it's a vital tool for layout template files as we've already seen.

For EJS documentation see the EJS module ([npmjs.com/package/ejs](https://www.npmjs.com/package/ejs)).

There are two tags of primary interest.
* `<%= variable %>` substitutes the value of the variable, encoding any special characters as HTML encodings.
* `<%- variable %>` substitutes the value of the variable, with no encoding.


## Other document formats

AkashaCMS supports pluggable rendering systems.  Doing so means registering with AkashaCMS a simple object with three functions.  This gives the ability to integrate all kinds of document formats both for content markup and the output file.

For example all the XML files produced by AkashaEPUB are generated with the help of custom rendering modules.

See [akashacms.com/documents/rendering-chains.html](http://akashacms.com/documents/rendering-chains.html) for documentation.