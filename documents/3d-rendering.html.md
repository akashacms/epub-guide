---
layout: ebook-page.html.ejs
title: The AkashaCMS rendering process
---

This is what we've been working towards for a few sections - rendering HTML files from any content file.  The EPUB3 specification uses the XHTML variant of HTML5 and CSS for the rendered content.  That's our goal at the moment, to take a Markdown file and turn it into XHTML5 suitable for display on an EPUB reader.  At the end of this section we'll we'll know how to do this.  Promise.

The AkashaCMS website does have complete documentation about layouts and page rendering at - https://akashacms.com/akasharender/layouts-partials.html

AkashaRender renders the content to HTML, then encapsulates that HTML within a layout template file declared in the `layout` tag in the document.  That is, a four-stage process is followed:

1. The content file is rendered, producing an HTML output.
1. Custom tags and other DOM processing are performed by Mahabhuta.
1. Assuming the content declares a `layout` template, the HTML from stage 1 is rendered into the corresponding template.
1. Custom tags and other DOM processing is again performed by Mahabhuta.

This guide is formatted using the `ebook-page.html.ejs` layout template (see: https://github.com/akashacms/epub-guide/blob/master/layouts/ebook-page.html.ejs).  Therefore, each page in the guide has at least this much metadata:

```
---
layout: ebook-page.html.ejs
title:  Whatever the Title is
---
```

That template is currently:

```
<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops">
<head>
<title><%= title %></title>
<ak-stylesheets></ak-stylesheets>
<ak-headerJavaScript></ak-headerJavaScript>
</head>
<body>
    <section>
    <header><h1><%= title %></h1></header>
    <article><%- content %></article>
    <footer style="margin-top: 5em;"><hr/>Copyright © 2015 by David Herron, Creative Commons, CC BY-ND, see <a href="0a-copyright.html">copyright page</a> for details </footer>
    </section>
<ak-footerJavaScript></ak-footerJavaScript>
</body>
</html>
```

This allows for a page title, page content inside an `<article>` tag, a `<footer>`, and space for CSS and JavaScript files.  While EPUB readers have traditionally been very limited devices, EPUB3 allows for limited use of the full HTML5, CSS3 and JavaScript paradigm used in modern web browsers.

# Brief overview of EJS templates

The `content` variable is autogenerated by AkashaRender and contains the rendered content.  This segment of the code inserts the rendering without any encoding:

```
<%- content %>
```

By using the `<%- %>` sequence, the HTML in the `content` variable is inserted as HTML.  The HTML is simply copied to the output file as-is with no interpretation.

The `<header><h1><%= title %></h1></header>` sequence instead encodes `title` to safe HTML values.  

This is bog-standard EJS behavior, and your templates use one or the other form depending on the circumstances.

EJS also lets you write code inside the template.  What if the `title` variable was left out of a content file?  The processing would crash at that point, and maybe your book doesn't require a section header at the beginning of each section.  Consider:

```
<% if (title) { %>
<header><h1><%= title %></h1></header>
<% } %>
```

This says if the `title` variable is present, then render the `header` and `h1` tags shown here, but don't do so if there's no `title`.


## Using data in a fancier template

As an example of more comprehensive metadata usage, consider a series of pages containing information tables.  The table data could be given as metadata.   The layout template could format that data into an HTML table, and encapsulate it into a complete HTML file.

Suppose you were writing a book of ice cream sundae recipes.  The metadata could list the ingredients, while the content could describe how to assemble the Sundae and perhaps author remniscences (and pictures) from childhood visits to Atlantic City.  

Consider - `banana-split.html.md`

```
---
layout: ice-cream-sundae.html.ejs
title: Banana Split Sundae
dishStyle: Tray
base: 1 Banana, cut in half lengthwise
flavors: Vanilla
topping: Chocolate Syrup
sprinkles: Peanuts
image: images/sundaes/banana-split.png
---

In the summer of 1967 I had my first
REAL banana split sundae, and I thought
I'd gone to heaven it was so good.
These are easy to make and
sure to be a crowd pleaser.
...
```

Plausible template - `ice-cream-sundae.html.ejs`

```
<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops">
<head>
<title><%= title %></title>
<ak-stylesheets></ak-stylesheets>
<ak-headerJavaScript></ak-headerJavaScript>
</head>
<body>
    <section>
    <header><h1><%= title %></h1></header>
    <article>

    <img src="<%- image %>"/>

    <table>
    <tr><th>Dish style</th><td><%= dishStyle %></td></tr>
    <tr><th>Base</th><td><%= base %></td></tr>
    <tr><th>Ice Cream Flavor</th><td><%= flavors %></td></tr>
    <tr><th>Topping</th><td><%= topping %></td></tr>
    <tr><th>Sprinkles</th><td><%= sprinkles %></td></tr>
    </table>

    <div><%- content %></div>

    </article>
    <footer style="margin-top: 5em;"><hr/>Copyright © 2015 by David Herron, Creative Commons, CC BY-ND, see <a href="0a-copyright.html">copyright page</a> for details </footer>
    </section>
<ak-footerJavaScript></ak-footerJavaScript>
</body>
</html>
```

This template would be used in an e-book (or website) with several Ice Cream Sundae recipes.  For each you describe the ingredients in the page metadata, and the template formats that metadata into a nice table.  The overall page structure is the same as the `page.html.ejs` template shown earlier.

## Mahabhuta

Earlier we mentioned the Mahabhuta engine.  Full documentation is online at https://akashacms.com/mahabhuta/toc.html

Mahabhuta's purpose is to process HTML as a DOM using a jQuery-like API.  It lets you transfer some front-end-engineering knowledge into back-end document construction.  One of Mahabhuta's biggest purposes is custom tags one can invent for specific purposes.

We've already seen an example in the page templates above:

```
<ak-stylesheets></ak-stylesheets>
<ak-headerJavaScript></ak-headerJavaScript>
```

These two custom tags generate `<link>` and `<script>` tags corresponding to the CSS and JavaScript files to be used by the rendered HTML.  With Mahabhuta a web or e-book developer can code up any kind of DOM manipulation to customize their rendered HTML.

The ice cream sundae example discussed earlier could be implemented a different way.  Like:

```
<ice-cream-sundae dish-style="Tray"
    base="1 Banana, cut in half lengthwise"
    flavors="Vanilla"
    topping="Chocolate Syrup"
    sprinkles="Peanuts"
    image="images/sundaes/banana-split.png" />
```

Now that you've got the custom tag, what do you do?

First step is creating a _Mahafunc_, or Mahabhuta Function.

```
class IceCreamSundaeElement extends mahabhuta.CustomElement {
    get elementName() { return "ice-cream-sundae"; }
    process($element, metadata, dirty, done) {
        return akasha.partial(metadata.config, "ice-cream-sundae.html.ejs", {
            dishStyle: $element.attr('dish-style'),
            base: $element.attr('base'),
            flavors: $element.attr('flavors'),
            topping: $element.attr('topping'),
            sprinkles: $element.attr('sprinkles')
        });
    }
}
module.exports.mahabhuta.addMahafunc(new IceCreamSundaeElement());
```

By the time this code is executed, the HTML content has been parsed down to a jQuery-esque DOM, the elements matching the selector string returned by `elementName` have been found, and this function receives one of those elements as `$element`.  The element will be erased and completely replaced by whatever HTML is returned from the function.

This relies on a different AkashaRender feature, the _Partial_.  Partials are little snippets of HTML, either straight HTML or an HTML template, that can be reused in multiple places.  We've specified a Partial named `ice-cream-sundae.html.ejs` which could be:

```
<table>
<tr><th>Dish style</th><td><%= dishStyle %></td></tr>
<tr><th>Base</th><td><%= base %></td></tr>
<tr><th>Ice Cream Flavor</th><td><%= flavors %></td></tr>
<tr><th>Topping</th><td><%= topping %></td></tr>
<tr><th>Sprinkles</th><td><%= sprinkles %></td></tr>
</table>
```

The template variables in this case come from the anonymous object passed to `akasha.partial`.  The template is processed as an EJS template because of the file name.  If you follow the connections, the attributes passed in the tag above make their way through the CustomElement class to this template, where they're substituted into the HTML table, that's then passed back replacing the `<ice-cream-sundae>` element.

## A missed Partial opportunity

The page templates above missed an opportunity to make the `<footer>` reusable in a Partial.  Instead of hard-coding the same `<footer>` tag in every template, the templates could all have:

```
<partial file-name="footer.html"/>
```

The `<partial>` tag does what you expect, it evaluates the named partial and replacing itself with the resulting HTML.  The file named `footer.html` could contain this:

```
<footer style="margin-top: 5em;">
<hr/>Copyright © 2015 by David Herron, Creative Commons, CC BY-ND,
see <a href="0a-copyright.html">copyright page</a> for details
</footer>
```

You then have one file, `footer.html`, to edit any time you wish to edit the footer.  
