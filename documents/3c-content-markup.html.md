---
layout: page.html.ejs
title: Content markup formats
---

## Markdown files

Markdown is a simplified text format for writing.  It uses plain text files, meaning one can use any plain text editor to write Markdown files, and the same can be said for AkashaCMS files.  The markdown syntax let's you easily insert headings, text and paragraph styles, links, images, and more using simple-to-understand sequences.

The Markdown Tutorial ([markdowntutorial.com/](http://markdowntutorial.com/)) is a good place to start your understanding of Markdown.

John Gruber invented Markdown, and wrote up its syntax on his site ([daringfireball.net/projects/markdown/](http://daringfireball.net/projects/markdown/)).

The markdown processor used by AkashaCMS supports some of the Github Flavored Markdown extensions ([help.github.com/articles/github-flavored-markdown/](https://help.github.com/articles/github-flavored-markdown/)).

## HTML+EJS files

It's not recommended to use EJS when writing, but it's a vital tool for layout template files as we've already seen.

Basically, EJS is HTML but with a couple special tags.  For documentation see the EJS module ([www.npmjs.com/package/ejs](https://www.npmjs.com/package/ejs)).

There are two tags of primary interest.
* `<%= variable %>` substitutes the value of the variable, encoding any special characters as HTML encodings.
* `<%- variable %>` substitutes the value of the variable, with no encoding.

As we already discussed the second form is necessary when you receiving HTML that you want displayed verbatim.

## Other document formats

AkashaCMS supports pluggable rendering systems.  Doing so means registering with AkashaCMS a simple object with three functions.  This gives the ability to integrate all kinds of document formats both for content markup and the output file.

For example all the XML files produced by AkashaEPUB are generated with the help of custom rendering modules.
