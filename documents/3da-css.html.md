---
layout: ebook-page.html.ejs
title: CSS, Fonts, and Stylesheets for creating good quality EPUB's
---

Just as EPUB3 adopted HTML5 because it's a modern web standard, it also adopted CSS3, and we can use the same fonts as on the web.  That means we have as much freedom to dress up and structure our content in an EPUB as on the Web.

For example consider this simple gradient generated at: http://www.cssmatic.com/gradient-generator

```
<div style="height: 40px; width: 100%; background: rgba(98,125,77,1); background: -moz-linear-gradient(left, rgba(98,125,77,1) 0%, rgba(31,59,8,1) 100%); background: -webkit-gradient(left top, right top, color-stop(0%, rgba(98,125,77,1)), color-stop(100%, rgba(31,59,8,1))); background: -webkit-linear-gradient(left, rgba(98,125,77,1) 0%, rgba(31,59,8,1) 100%); background: -o-linear-gradient(left, rgba(98,125,77,1) 0%, rgba(31,59,8,1) 100%); background: -ms-linear-gradient(left, rgba(98,125,77,1) 0%, rgba(31,59,8,1) 100%); background: linear-gradient(to right, rgba(98,125,77,1) 0%, rgba(31,59,8,1) 100%); filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#627d4d', endColorstr='#1f3b08', GradientType=1 );">
</div>
```

It renders just as you'd expect:

<div style="height: 40px; width: 100%; background: rgba(98,125,77,1); background: -moz-linear-gradient(left, rgba(98,125,77,1) 0%, rgba(31,59,8,1) 100%); background: -webkit-gradient(left top, right top, color-stop(0%, rgba(98,125,77,1)), color-stop(100%, rgba(31,59,8,1))); background: -webkit-linear-gradient(left, rgba(98,125,77,1) 0%, rgba(31,59,8,1) 100%); background: -o-linear-gradient(left, rgba(98,125,77,1) 0%, rgba(31,59,8,1) 100%); background: -ms-linear-gradient(left, rgba(98,125,77,1) 0%, rgba(31,59,8,1) 100%); background: linear-gradient(to right, rgba(98,125,77,1) 0%, rgba(31,59,8,1) 100%); filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#627d4d', endColorstr='#1f3b08', GradientType=1 );">
</div>

In other words, we can really go to town on using CSS to dress up our eBooks because EPUB3 opened the door to modern CSS.  Before you get too excited, Amazon's Kindle marketplace does not use EPUB3.  Books sold through Kindle might well lose the styling you create.

We are warned, however, of variation in CSS3 support by EPUB readers.  For example eInk devices, due to limitations of the display technology, provide a limited set of functions.

# CSS2.1 and CSS3 support

EPUB3 expects a Reader application to implement CSS2.1 support with the following exceptions:

* The fixed property cannot be used with position property.
* The direction and unicode-bidi properties must not be used. (HTML5 provides elements for internationalization.)

EPUB3 introduced support for some (at the time, 'newly minted') CSS3 modules.  This includes:

* Media Queries to support not just conditional styling, but importing CSS files
* CSS namespaces, in particular to bring in the `epub` namespace
* Fonts including the `@font-face` rules
* Multi-column layout
* CSS Writing Modes, Text and Speech.  Because these were experimental at the time EPUB3 was finalized, you must prefix the properties with `-epub-`.

Because EPUB3 includes JavaScript support, it's possible to use the Modernizr script (https://modernizr.com/) to fix up some CSS differences in given EPUB3 readers.

# Defining stylesheets and JavaScript

In the next section ([](4-configuration.html)) we go over the configuration files.  Assuming your stylesheets and JavaScript files are to appear on every page of the EPUB, it is simplest to declare them in the Configuration file.

```
config.addStylesheet({ href: "/style.css" });
```

You can declare as many as you like.  While EPUB3 requires all links to be relative, the Configuration file declaration should be an absolute link as shown.  AkashaEPUB will fix it so this is rewritten into a relative link.

The CSS files can be kept in a AssetsDir directory, where its file name must have the `.css` extension, or they can be kept in a DocumentsDir directory, where they can have the `.css.less` extension.  A `.css.less` file is of course written using LESS constructs. (http://lesscss.org/)

JavaScript is added in a similar way:

```
config
    .addFooterJavaScript({ href: "/js/file-for-footer.js" })
    .addHeaderJavaScript({ href: "/js/file-for-header.js"  })
```

On the Web we often want to put JavaScript in the foot of the file, rather than the head, for better loading time.  AkashaCMS supports loading the JavaScript into either location.

We just mentioned Modernizr, and it will be instructive to go over exactly how to set this up.

Go to https://modernizr.com/download and click on the options you wish to include.  Then click on the **Build** button and a JavaScript file will download.

Add that JavaScript file into your AssetsDir and in the Configuration use this:

```
config
    .addHeaderJavaScript({ href: "/path/to/modernizr-custom.js"  })
```

## CSS Resets?

In the Web, we often use CSS Reset stylesheets to get things to a known blank slate.  In EPUB3 it's thought best to not do this, unless you need pixel-perfect layout.

# A few useful CSS rules for EPUB3

You are of course free to design your own stylesheet.  You can just use regular CSS constructs (almost) exactly like on the Web.  

The stylesheet for this book will be instructive:  https://github.com/akashacms/epub-guide/blob/master/assets/css/style.css

The sections in that file include:

* Styling to the `<nav>` structure in the Table of Contents
* Making code sections look like code
* Alternate striping for table rows

Among the EPUB3 examples kept by the EPUB3 committee in their Github repositories is the complete book, _Accessible EPUB3_, by O'Reilly and Associates.  That book includes an interesting-looking CSS file at: https://github.com/IDPF/epub3-samples/blob/master/30/accessible_epub_3/EPUB/css/epub.css

It begins with a few CSS Resets and then gets to the business of styling elements for that book.  It may give you some inspiration.


# EPUB-Specific media queries

Generally media queries work on EPUB3 readers as they do on the Web.  You detect attributes like screen size, and adjust things to fit.

However, many EPUB3 have limited color support, or only support grayscale.  This may be useful:

```
@import url(color.css) screen and (color);
@import url(grayscale.css) screen and (not color);
```

This would set up different color schemes depending on whether the display supported color or grayscale.

# CSS namespaces

The primary use for CSS namespaces will be creating CSS rules matching HTML elements containing attributes in the `epub:` namespace.

An example:

```
@namespace epub "http://www.idpf.org/2007/ops";

section[epub|type='dedication'] {
    background-color: rgb(210,210,210);
}
```

The first line defines the `epub` namespace.  Next we have a CSS selector matching `<section epub:type="dedication">`.

It's important to not that where in HTML the attribute is `epub:type` (with a `:`), in a CSS selector the `:` is replaced with `|`.

# Multi-column layout

CSS3 supports multi-column layout using the `column-count` property.

Simply add it to a stylesheet like:

```
article {
    column-count: 2
}
```

Or, as in the following example, add it to a given tag `<div style="column-count: 2">`

<div style="column-count: 2">
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eget neque purus. Maecenas eu sapien id nisi pretium laoreet. Phasellus eget convallis eros, non porta mi. Nullam efficitur facilisis mauris quis tristique. Etiam pulvinar, dolor eget viverra tristique, diam sem suscipit justo, sed volutpat lectus turpis a dui. Etiam aliquam vehicula dui sit amet tincidunt. Donec aliquet laoreet nisl non sodales. Pellentesque cursus nibh quis ipsum rhoncus, ut malesuada ipsum convallis. Pellentesque et metus in quam aliquet lobortis sit amet convallis justo. Nunc bibendum, dolor quis pretium eleifend, libero magna efficitur dolor, sagittis tempor mauris augue condimentum lectus. Sed varius ante eu risus tempor, vel egestas nulla molestie. Nulla placerat mollis quam et pellentesque. Nam maximus, sapien sit amet vulputate venenatis, sem enim aliquet enim, eu scelerisque tellus sapien ut risus. Praesent lobortis felis non urna imperdiet, non vulputate ipsum posuere.</p>

<p>Nam nec augue euismod, vestibulum risus at, pharetra lacus. Aenean at faucibus tortor, eget aliquam nisi. Maecenas ac nisi iaculis, condimentum ante ut, facilisis erat. Aenean mi purus, hendrerit ac massa id, molestie rhoncus ipsum. Sed facilisis tellus lorem, nec lobortis nunc facilisis in. Phasellus porta et velit eu imperdiet. Maecenas ultrices et libero vitae feugiat. Curabitur in elit in justo condimentum rhoncus eget id tortor. Aenean quam neque, finibus quis risus ut, consequat bibendum risus. Nunc vel orci quis lectus maximus mattis. Aenean vitae dolor a odio rhoncus malesuada. Cras a congue arcu. Proin pulvinar arcu quam, in placerat nisi viverra in.</p>

<p>Ut faucibus, elit sit amet gravida tempus, velit tortor feugiat ligula, at euismod ipsum libero sit amet erat. Donec congue neque ut aliquam interdum. Praesent nec mi suscipit, ullamcorper tellus vitae, ultricies nisl. Praesent auctor, purus id lacinia blandit, risus elit aliquam risus, tempor rhoncus urna arcu non dolor. Nullam erat nulla, ultrices vitae pharetra at, efficitur ac neque. Cras semper porttitor arcu, non ullamcorper erat pharetra sed. Duis ut nisl non turpis semper vestibulum id nec sapien. Phasellus eleifend quis tellus sit amet auctor. Nunc lobortis facilisis massa, eget accumsan neque commodo vel. Nam venenatis auctor est quis pellentesque. Pellentesque varius dictum semper. Curabitur ac imperdiet velit. Maecenas convallis lacus quis sem finibus, et vulputate sem efficitur. Fusce pharetra massa auctor neque posuere iaculis. Maecenas rutrum ante lectus, in tincidunt risus tempus quis.</p>

<p>Duis metus diam, sollicitudin eget odio vitae, molestie placerat augue. Curabitur finibus magna at ullamcorper fringilla. Fusce semper mollis sem vitae ultrices. Nulla egestas mollis justo et malesuada. Sed ac dolor elit. Donec elementum eleifend nibh, in tincidunt metus pulvinar at. Duis fringilla dolor vitae ante auctor gravida convallis et sapien.</p>

<p>Nunc eu tortor et nulla gravida blandit. Nullam leo elit, tincidunt quis rhoncus sit amet, scelerisque vitae neque. Curabitur rutrum sit amet tortor a porta. Mauris sollicitudin odio euismod, varius quam sit amet, mattis eros. Aenean venenatis quam velit, sed aliquet nisl porttitor nec. Aenean imperdiet quam turpis, at eleifend urna rhoncus a. Nam a nisl id nunc ullamcorper vestibulum. Praesent bibendum ex eget est gravida viverra. Proin mattis orci feugiat, congue orci in, blandit ante.</p>
</div>

That's cool, a simple way to make multi-column text.  But what if you want this to be responsive to the size of the screen?  On a small screen your book could display as 1-column, and on a large display as 2-column.

Consider this pair of CSS declarations.

```
/* conditional multi-column support */

.responsive-2columns {
    column-count: 1;
}

@media only screen and (min-device-width : 768px) {
    .responsive-2columns {
        column-count: 2
    }
}
```

The default, _mobile-first_, choice is 1-column.  Then at a certain screen width the text flips to 2-column layout.

<div class="responsive-2columns">
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eget neque purus. Maecenas eu sapien id nisi pretium laoreet. Phasellus eget convallis eros, non porta mi. Nullam efficitur facilisis mauris quis tristique. Etiam pulvinar, dolor eget viverra tristique, diam sem suscipit justo, sed volutpat lectus turpis a dui. Etiam aliquam vehicula dui sit amet tincidunt. Donec aliquet laoreet nisl non sodales. Pellentesque cursus nibh quis ipsum rhoncus, ut malesuada ipsum convallis. Pellentesque et metus in quam aliquet lobortis sit amet convallis justo. Nunc bibendum, dolor quis pretium eleifend, libero magna efficitur dolor, sagittis tempor mauris augue condimentum lectus. Sed varius ante eu risus tempor, vel egestas nulla molestie. Nulla placerat mollis quam et pellentesque. Nam maximus, sapien sit amet vulputate venenatis, sem enim aliquet enim, eu scelerisque tellus sapien ut risus. Praesent lobortis felis non urna imperdiet, non vulputate ipsum posuere.</p>

<p>Nam nec augue euismod, vestibulum risus at, pharetra lacus. Aenean at faucibus tortor, eget aliquam nisi. Maecenas ac nisi iaculis, condimentum ante ut, facilisis erat. Aenean mi purus, hendrerit ac massa id, molestie rhoncus ipsum. Sed facilisis tellus lorem, nec lobortis nunc facilisis in. Phasellus porta et velit eu imperdiet. Maecenas ultrices et libero vitae feugiat. Curabitur in elit in justo condimentum rhoncus eget id tortor. Aenean quam neque, finibus quis risus ut, consequat bibendum risus. Nunc vel orci quis lectus maximus mattis. Aenean vitae dolor a odio rhoncus malesuada. Cras a congue arcu. Proin pulvinar arcu quam, in placerat nisi viverra in.</p>

<p>Ut faucibus, elit sit amet gravida tempus, velit tortor feugiat ligula, at euismod ipsum libero sit amet erat. Donec congue neque ut aliquam interdum. Praesent nec mi suscipit, ullamcorper tellus vitae, ultricies nisl. Praesent auctor, purus id lacinia blandit, risus elit aliquam risus, tempor rhoncus urna arcu non dolor. Nullam erat nulla, ultrices vitae pharetra at, efficitur ac neque. Cras semper porttitor arcu, non ullamcorper erat pharetra sed. Duis ut nisl non turpis semper vestibulum id nec sapien. Phasellus eleifend quis tellus sit amet auctor. Nunc lobortis facilisis massa, eget accumsan neque commodo vel. Nam venenatis auctor est quis pellentesque. Pellentesque varius dictum semper. Curabitur ac imperdiet velit. Maecenas convallis lacus quis sem finibus, et vulputate sem efficitur. Fusce pharetra massa auctor neque posuere iaculis. Maecenas rutrum ante lectus, in tincidunt risus tempus quis.</p>

<p>Duis metus diam, sollicitudin eget odio vitae, molestie placerat augue. Curabitur finibus magna at ullamcorper fringilla. Fusce semper mollis sem vitae ultrices. Nulla egestas mollis justo et malesuada. Sed ac dolor elit. Donec elementum eleifend nibh, in tincidunt metus pulvinar at. Duis fringilla dolor vitae ante auctor gravida convallis et sapien.</p>

<p>Nunc eu tortor et nulla gravida blandit. Nullam leo elit, tincidunt quis rhoncus sit amet, scelerisque vitae neque. Curabitur rutrum sit amet tortor a porta. Mauris sollicitudin odio euismod, varius quam sit amet, mattis eros. Aenean venenatis quam velit, sed aliquet nisl porttitor nec. Aenean imperdiet quam turpis, at eleifend urna rhoncus a. Nam a nisl id nunc ullamcorper vestibulum. Praesent bibendum ex eget est gravida viverra. Proin mattis orci feugiat, congue orci in, blandit ante.</p>
</div>

# Using Fonts

Each EPUB reading application chooses some default fonts, and perhaps that will be good enough for your purpose.  But your readers experience of your EPUB can be improved by selecting custom fonts.  Because the system is based on HTML5, the whole ecosystem of font choices are available with the caveat that font definition files have to be shipped inside the EPUB.  (because the Internet is not available from an EPUB reader)

Website developers using custom fonts have to do so carefully to limit the impact on download time.  When crafting an EPUB, one has to carefully choose the custom fonts to minimize the size of the EPUB.

Embedding a font in an EPUB is optional.  Doing so can improve the presentation of your book, but adds technical and administrative overhead.  Mitigating that overhead are two considerations:

1. AkashaEPUB has made the technical part fairly easy,
2. Choosing an open source font (versus commercial) limits the administrative overhead to checking the font license.

There's more technical overhead than just the task of embedding the font.  EPUB reader software has a spotty record of supporting custom font choices.  Sometimes it's significantly difficult to get an embedded font to work correctly.  EPUB3 does require support for OpenType and WOFF fonts, however.  As EPUB reading systems move to EPUB3, supporting custom fonts should become easier.

Commercial font licenses prohibit redistributing the font in the way an EPUB does.  That is, anybody receiving the EPUB can simply unzip the file and copy the fonts elsewhere, which commercial font foundaries wish to avoid.  The EPUB3 spec includes a simple encryption mechanism that then allows one to distribute a commercial font in an EPUB.  AkashaEPUB, at this time, doesn't implement font encryption.  The good news is that the open source fonts can be very good, and are available under a license that presents zero administrative burden.

The problem you cannot get around is "bloat".  An EPUB with embedded font files is unavoidably larger than an EPUB which doesn't.

## Implementation

There are three steps to implementing a custom font:

1. Include the font file in the EPUB, and in the OPF manifest.
2. Declare the font in your CSS stylesheet.
3. Use the font on one or more elements in the stylesheet.

For the first step, just put the font file somewhere under an Assets directory.  AkashaEPUB will automatically copy it to the RenderDestination and automatically list it in the OPF manifest.

Now you declare the fonts in the stylesheet.  At the end of the stylesheet declare the font-face's as so.  You must of course use a relative URL from the CSS file to the font file(s):

```
@font-face {
  font-family: "Free Serif";
  font-style: normal;
  font-weight: normal;
  src: url(../fonts/FreeSerif.otf);
}

@font-face {
  font-family: "Free Sans Bold";
  font-style: normal;
  font-weight: bold;
  src: url(../fonts/FreeSansBold.otf);
}

@font-face {
  font-family: "Ubuntu Mono";
  font-weight: normal;
  font-style: normal;
  src: url(../fonts/UbuntuMono-R.ttf);
}

@font-face {
  font-family: "Ubuntu Mono Bold";
  font-style: normal;
  font-weight: bold;
  src: url(../fonts/UbuntuMono-B.ttf);
}

@font-face {
  font-family: "Ubuntu Mono BoldItal";
  font-weight: bold;
  font-style: italic;
  src: url(../fonts/UbuntuMono-BI.ttf);
}

@font-face {
  font-family: "Ubuntu Mono Ital";
  font-weight: normal;
  font-style: italic;
  src: url(../fonts/UbuntuMono-RI.ttf);
}
```

The last thing is to use the fonts as so in your CSS:

```
h1 {
  font-size: 1.5em;
  font-weight: bold;
  font-family: "Free Sans Bold", sans-serif;
  margin-top: 20px !important;
}
```

The `font-family` line here should match one of the `@font-face` declarations.  As one does on the Web, you declare multiple fonts as a fall-back for any missing glyphs.  

It can be useful to declare a radically different fallback font to make it easy to spot glyphs missing from your chosen font.  For example, use `serif` as a backup for a sans-serif font, as is done here.

```
font-family: "Free Sans Bold", serif;
```

## Finding quality, free, fonts

You don't have to spend an arm and a leg on fonts, because there are many open source fonts available, such as the ones shown above.  Here are a few websites with fonts that can be downloaded for free

* The Open Font Library http://openfontlibrary.org/
* The Google Fonts library http://www.google.com/fonts
* Wikipedia Open Source Unicode Typefaces https://en.wikipedia.org/wiki/Open-source_Unicode_typefaces
* The League of Movable Type https://www.theleagueofmoveabletype.com/
* Wikipedia OpenType and FreeType https://en.wikipedia.org/wiki/OpenType and https://en.wikipedia.org/wiki/FreeType
* Open Source Hebrew Fonts http://opensiddur.org/tools/fonts/
* The SIL Open Font License http://scripts.sil.org/cms/scripts/page.php?site_id=nrsi&id=OFL
* The SIL Project fonts http://scripts.sil.org/cms/scripts/page.php?cat_id=FontDownloads
* Lato Fonts http://www.latofonts.com/
* Font Squirrel http://www.fontsquirrel.com/
* Deja Vu Fonts http://dejavu-fonts.org/wiki/Main_Page
* Wikipedia Web Typography https://en.wikipedia.org/wiki/Web_typography
