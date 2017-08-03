---
layout: ebook-page.html.ejs
title: Detailed walk-through an embedding EPUB content in an AkashaCMS website
---

There are several 3rd party services letting you publish an electronic book on-line.  By correct use of AkashaCMS plugins you can achieve the same effect on your own website.  It requires building the website with AkashaCMS, building the EPUB with AkashaEPUB, and appropriate configuration settings and workflow.

The result allows you to publish the same content as either an EPUB and/or as part of a website.

Examples:

* https://akasharender.com/akasharender/toc.html -- The official guide for AkashaRender.  It has not been published independently as an EPUB, but it could be.
* https://akasharender.com/mahabhuta/toc.html -- Ditto, but for the Mahabhuta engine
* https://akasharender.com/epubtools/toc.html -- This guidebook that you're reading.  By the time you read this, it will have been published as an EPUB.
* https://greentransportation/ev-charging/toc.html -- A best-practices guidebook for electric car charging.  The content is available both on the website and as a Kindle book.
* https://greentransportation.info/fossil-fuels/toc.html -- An incomplete guidebook documenting the fossil fuel energy system.
* https://greentransportation.info/energy-transportation/toc.html -- An incomplete guidebook discussing the Energy system and the Transportation system

The system for publishing these eBooks both on a website and as a standalone EPUB is very straight-forward.  Anybody could implement the same on their own website.  Once you have it configured, publishing updates to both the website and EPUB is simple:  a) Run the corresponding build processes, b) Deploy the website to the webserver, c) Upload the EPUB to corresponding marketplaces.

The result is a low cost system.  Your website is can be hosted on any cheap shared hosting plan, while using leading edge web design techniques.  Your EPUB can, if you like, be sold via any online eBook marketplace or through your own distribution/sales channel.  

# Making an online electronic book feel like a book

Before we get into the details, let's take a step back and consider the goal.  You may have a different conceptualization of the correct way to publish an eBook on a website.  Changing the presentation is largely a matter of using different layout templates than the ones we'll show you.

For this feature I considered that to _feel like_ an electronic book, it should have

* Navigation centering on the Table of Contents
* Should read from chapter-to-chapter in order by a metaphoric flipping of the page
* Perhaps a fixed layout with a fixed header containing the ToC navigation tool

Spend some time with an EPUB reader before committing to how you'll present your EPUB on a website.  Ponder how the EPUB reader presents the content, and how you implement what you like or don't like in an online reading experience.

# The `epub-website` and `akasharender-epub` plugins

The `epub-website` contains the magic incantations required to massage EPUB content into an AkashaCMS website.

In the Configuration file for your website add this:

```
config.use(require('epub-website'));
```

And in the `package.json` add these dependencies:

```
"epub-website": "akashacms/epub-website",
"akasharender-epub": "akashacms/akasharender-epub",
```

The `epub-website` plugin handles formatting EPUB content for a website, and the `akasharender-epub` handles formatting the content for an EPUB.  Neither have been published to the npm repository, and can be installed in this fashion from the Github repository.

The `epub-website` plugin provides:

* A PartialsDir containing templates for an eBook header, a "nameplate", and a dropdown list for the Table of Contents
* An AssetsDir containing a stylesheet (CSS)
* A set of Mahabhuta functions

# Content metadata and using multiple DocumentDirs

The `epub-website` plugin relies on some metadata to retrieve the Table of Contents and other data.

The simplest way is to use multiple DocumentDir's, one for the website content, and one for each eBook.  The [Configuration file for akashacms.com](https://github.com/akashacms/akashacms-website/blob/master/config.js) contains a fairly complex configuration.  It can be instructive to study how AkashaCMS.com is structured, since you can learn much about how the Configuration object works.  It pulls together content from every plugin using multiple Documents directories.  But that site is so complex it will only hinder our discussion.  Let's go over a simplified version.

```
config
    .addAssetsDir('assets')
    .addAssetsDir({
        src: 'node_modules/bootstrap/dist',
        dest: 'vendor/bootstrap'
    })
   .addAssetsDir({
        src: 'node_modules/jquery/dist',
        dest: 'vendor/jquery'
    })
    .addLayoutsDir('layouts')
    .addDocumentsDir('documents')
    .addDocumentsDir({
        src: 'documents-e-book',
        dest: 'e-book',
        baseMetadata: {
            bookHomeURL: "/e-book/toc.html"
        }
    })
    .addPartialsDir('partials');
```

Except for the two `addDocumentsDir` calls this is a normal AkashaCMS website configuration.  It includes the normal `assets`, `layouts`, and `partials` directories.  Let's focus on the two documents directories.

The first, `documents`, refers to the regular website content.  The content in this directory doesn't require anything special, so we just list it this way.

The second refers to the eBook content.  The `addDocumentsDir` function can take an object like this.  This object says the files in the directory `documents-e-book` are rendered into the `e-book` subdirectory of the RenderDestination.  The `baseMetadata` segment adds to the metadata used with each document.  In this case `bookHomeURL` is specific to the `epub-website` plugin.

With multiple eBook's simply repeat this `addDocumentsDir` function as many times as necessary.

The stylesheet named here is visible at: https://github.com/akashacms/epub-website/blob/master/assets/akasha/epub-website/style.css  It's purpose is layout of the eBook pages.

A second configuration file describes how the e-Book is structured.

```
config
    .addAssetsDir('assets-ebook')
    .addLayoutsDir('layouts-ebook')
    .addDocumentsDir('documents-e-book')
    .addPartialsDir('partials-ebook')
    .setRenderDestination('out-e-book');
```

Notice that the AssetsDir, LayoutsDir, PartialsDir, and RenderDestination directories are all different.  This is so the book formatting is different than the website formatting.  The eBook cannot use all the greentransportation.info navigation elements, and the eBook also must fit certain constraints from the EPUB spec.  For example one page in the eBook has an embedded YouTube video, and on the website an embedded YouTube video player is perfectly what is required, but in the eBook all that can be used is the thumbnail image.

Also notice that `documents-e-book` is the only DocumentsDir.  The entirety of the e-book content is in that directory, and therefore it is the only content included when rendering the eBook.

Finally, the RenderDestination is set so that the eBook renders into its own directory.  In the website configuration file, this value was not set and therefore the default value of `out` is used.  For the eBook, this other directory is used so the two do not interfere with each other.

## The `bookHomeURL` metadata

This metadata item identifies the file containing the Table of Contents.  The Navigation Document, in other words.  The Navigation Document's location is used by the `epub-website` tool to locate necessary metadata.

This value must be a relative path within the rendered website naming the Navigation Document's file.  The content of this file is used by the Partials and Mahabhuta tags in `epub-website`.

# Partials and Mahabhuta tags

## The `<ebook-page-header>` tag

This and its corresponding Partial, `ebook-header.html.ejs`, serves as the header of an eBook page.  It looks for these metadata items in the file referred to by `bookHomeURL`.

* `logoImage`: The URL for a logo image corresponding to the eBook
* `logoHeight`, `headerHeight`: The width and height of the eBook's logo image
* `siteLogoImage`, `siteLogoWidth`: The URL and size for a logo image corresponding to the website
* `bookTitle`, `bookSubTitle`: The title and sub-title for the eBook
* `bookAuthor`: The author name for the eBook

## The `<ebook-navigation-header>` tag

This and its corresponding Partial, `ebook-navigation-header.html.ejs`, constructs a dropdown menu from the Table of Contents in the file named in `bookHomeURL`.  

It reads the Table of Contents file.  The contents of the `<nav>` element are copied into a dropdown menu contained within that Partial.

## The `<ebook-nameplate-block>` tag

This and its corresponding Partial, `ebook-nameplate-block.html.ejs`, is meant to present something like the Nameplate page in a printed book.  

# Page layout and Layout templates

There are one or more page layouts to use:

1. `ebook-toc-page.html.ejs` Layout for the Table of Contents page
2. `ebook-page.html.ejs` Layout for other pages

It's of course possible to have other page layouts if required by your book.

An example for the Table of Contents template is:

```
<!doctype html>
<!-- paulirish.com/2008/conditional-stylesheets-vs-css-hacks-answer-neither/ -->
<!--[if lt IE 7]> <html class="no-js lt-ie9 lt-ie8 lt-ie7" lang="en"> <![endif]-->
<!--[if IE 7]>    <html class="no-js lt-ie9 lt-ie8" lang="en"> <![endif]-->
<!--[if IE 8]>    <html class="no-js lt-ie9" lang="en"> <![endif]-->
<!-- Consider adding a manifest.appcache: h5bp.com/d/Offline -->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en"> <!--<![endif]-->
<head>
<meta charset="utf-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
<meta name="viewport" content="width=device-width" />
<partial file-name="favicon.html"/>

<title><%= title %></title>
<ak-header-metatags></ak-header-metatags>
<xml-sitemap></xml-sitemap>
<site-verification></site-verification>
<ak-header-linkreltags></ak-header-linkreltags>
<ak-stylesheets></ak-stylesheets>
<ak-headerJavaScript></ak-headerJavaScript>
<open-graph-promote-images root="article"></open-graph-promote-images>

</head>
<body class="ebook-toc-page">

<partial file-name="navbar.html"></partial>

<div class="container" role="main">
<div class="row">
<ebook-page-header class="col-sm-12"></ebook-page-header>
</div>

<div class="row">
  <article class="col-sm-8">
    <div class="panel panel-default">
        <div class="panel-body">
            <ebook-nameplate-block></ebook-nameplate-block>
            <div class="ebook-toc-page-toc">
            <%- content %>
            </div>
        </div>
    </div>
  </article>
  <div class="col-sm-4">
      <img src="<%= coverImage %>" width="100%"/>
  </div>
</div>

<footer class="row" style="text-align: center; height: 100px;">
  <partial file-name="site-footer.html"></partial>
</footer>
</div>

<ak-footerJavaScript></ak-footerJavaScript>

</body>
</html>
```

This template uses Bootstrap responsive classes to produce a usable Table of Contents page.  It includes the _nameplate_ block, the Table of Contents, and a _coverImage_.

An example for regular eBook pages:

```
<!doctype html>
<html class="ebook-page ebook-page-flex" lang="en">
<head>
<meta charset="utf-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
<meta name="viewport" content="width=device-width" />
<partial file-name="favicon.html"/>

<title><%= title %></title>
<ak-header-metatags></ak-header-metatags>
<xml-sitemap></xml-sitemap>
<site-verification></site-verification>
<ak-header-linkreltags></ak-header-linkreltags>
<ak-stylesheets></ak-stylesheets>
<ak-headerJavaScript></ak-headerJavaScript>
<open-graph-promote-images root="#book-page-content"></open-graph-promote-images>

</head>

<body class="ebook-page ebook-page-flex">

<partial file-name="navbar.html"></partial>

<div id="page-container"> <!--  class="panel panel-default" -->
    <ebook-page-header id="ebook-masthead" header-height="60px"/>
    <div class="panel panel-default">
        <ebook-navigation-header id="ebook-navigation" class="panel-heading"/>
        <div id="book-page-content" class="panel-body">
            <% if (typeof teaser  !== "undefined") { %>
                <div class="jumbotron"><span class="lead"><%- teaser %></span></div>
            <% } %>
            <%- content %>
            <% if (typeof copyrightPartial !== "undefined") { %>
                <partial file-name="<%= copyrightPartial %>"/>
            <% } %>
            <ebook-navigation-header id="ebook-navigation-bottom" class="panel-heading"/>
        </div>
    </div>
    <footer id="footer-row" class="container">
    <partial file-name="site-footer.html"></partial>
    </footer>
</div>

<ak-footerJavaScript></ak-footerJavaScript>
</body>
</html>
```

This template handles other page layouts.  It does not use Bootstrap classes for layout, and instead presumes your CSS handles the page layout.
