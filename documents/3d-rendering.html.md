---
layout: page.html.ejs
title: The AkashaCMS rendering process
---

Now that we've discussed the AkashaCMS document format, metadata and content markup we can put it all together and discuss the rendering process.  At the end of this we'll have a complete HTML file suitable for an EPUB reader.  Promise.

The AkashaCMS website does have complete documentation about layouts and page rendering at - [akashacms.com/layout/index.html](http://akashacms.com/layout/index.html)

Generally speaking, AkashaCMS encapsulates the content within a series of layout template files as determined by layout tags in the templates.  As content is rendered into template after template, the complete HTML page structure is built.  Any document file or template file with a `layout` tag will be rendered into the named template.  An example will make this clearer.

This guide is formatted using `page.html.ejs`, meaning each page in the guide has this metadata:

```
    ---
    layout: page.html.ejs
    title:  Whatever the Title is
    ---
```

Then the `page.html.ejs` template reads as follows.

```
    ---
    layout: epub_page.html.ejs
    ---
    <header><h1><%= title %></h1></header>
    <%- content %>
```

In other words, the content file renders into `page.html.ejs`, and the result of that rendering is rendered into `epub_page.html.ejs`.  That template is provided by the `akashacms-epub` plugin.  Since it does not have a `layout` tag the rendering process stops at that point.  

The rendering process will continue so long as the template file specifies a `layout`.

The meaning of "renders into" varies depending on the content format being used in a given file.  This is determined by the file extension, with `.html.md` files being processed by Markdown and `.html.ejs` files being processed by EJS.

All document files in this guide use the `.html.md` extension, and the first stage is to process Markdown to HTML.  That HTML is made available to the `page.html.ejs` template as the `content` variable, while the `title` variable receives the value of the `title` metadata.

In EJS the `<%- content %>` tag inserts the value of `content` with no encoding of anything.  Since it's rendered HTML, that's what we want.  On the other hand the `<%= title %>` tag (note the difference between `<%-` and `<%=`) encodes the variable to safe HTML.

Because the `title` variable is injected inside the `h1` tag at the top of the page, each section of the EPUB starts with nice bold text telling you the section title, which is why the beginning of this section started with "AkashaCMS document metadata".

The `epub_page.html.ejs` template can be studied in the github repository if you like ([github.com/akashacms/akashacms-epub/blob/master/layouts/epub_page.html.ejs](https://github.com/akashacms/akashacms-epub/blob/master/layouts/epub_page.html.ejs)).  It is a complete HTML file formatted correctly for use in an EPUB.

As an example of a fancy use for metadata, consider a series of pages containing information tables.  The table data could be given as metadata, and the layout template could formats that data into an HTML table, and encapsulate it into a complete HTML file.

Suppose you were writing a book of ice cream sundae recipes.  The metadata could list the ingredients, while the content could describe how to asssemble the Sundae and perhaps author remniscences (and pictures) from childhood visits to Atlantic City.  

Consider - `bananna-split.html.md`

```
    ---
    layout: ice-cream-sundae.html.ejs
    title: Bananna Split Sundae
    dish-style: Tray
    base: 1 Bananna, cut in half lengthwise
    flavors: Vanilla
    topping: Chocolate Syrup
    sprinkles: Peanuts
    image: images/sundaes/bananna-split.png
    ---
    
    In the summer of 1967 I had my first REAL bananna split sundae, and
    I thought I'd gone to heaven it was so good.  These are easy to make
    and sure to be a crowd pleaser.
    ...
```

Plausible template - `ice-cream-sundae.html.ejs`

```
    ---
    layout: page.html.ejs
    ---
    
    <img src="<%- image %>/>
    
    <table>
    <tr><th>Dish style</th><td><%= dish-style %></td></tr>
    <tr><th>Base</th><td><%= base %></td></tr>
    <tr><th>Ice Cream Flavor</th><td><%= flavors %></td></tr>
    <tr><th>Topping</th><td><%= topping %></td></tr>
    <tr><th>Sprinkles</th><td><%= sprinkles %></td></tr>
    </table>
    
    <div><%- content %></div>
```

This template takes care of formatting the image, the table and the description.  It's then passed on to the `page.html.ejs` we looked at earlier, which adds the H1 title at the top.