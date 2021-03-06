---
layout: ebook-page.html.ejs
title: Cleaning up non-EPUB constructs with the `akasharender-epub` plugin
---

With AkashaCMS plugins it is easy to generate web pages for a website.  While EPUB3 uses HTML5, there are many things one can do with HTML5 which are not allowed in EPUB3.  Therefore, when using AkashaCMS tools to write content for an EPUB we need a strategy to convert non-allowed HTML5 constructs into something that's EPUB-safe and makes sense.  

That's the role for the `akasharender-epub` plugin.  In this chapter we'll look at what it does.

The source code repository is at https://github.com/akashacms/akasharender-epub

As we said earlier, this plugin is invoked with this statement in the Configuration file.

```
config
    .use(require('akasharender-epub'))
```

The `package.json` requires a corresponding dependency to `akashacms/akasharender-epub` to make the plugin available.  As of this writing, the plugin is not published into the npm registry, but is easy enough to use this way.

# Forcing XML mode to generate XHTML

EPUB3 requires an XHTML version of HTML5.  By default AkashaRender produces HTML files, not XML/XHTML.  However that's just a simple configuration away.

The `akasharender-epub` plugin automatically sets XML mode so that it automatically produces XHTML files.

However, even though the files are in XHTML format, the file extension is `.html`.  That's because AkashaRender's Renderer objects all produce `.html` filenames.  

If the files are not renamed from `.html` to `.xhtml` _epubcheck_ will give warnings and it will look like a problem.  It's actually not much of a problem, but it's always nicer to have zero warnings and zero errors from a tool like _epubcheck_.  

The _epubtools_ command includes a command `epubtools xhtml` that converts the `.html` files to `.xhtml` files.  See [](6-building-EPUB.html)

# Removal of `<html>/<body>` tags from embedded content

Some content retrieved by `akashacms-embeddables` inserts an `<html>` tag containing a `<body>`.  This is questionable enough for a website, but in an EPUB it's right out.  The `<html>/<body>` wrapper is removed leaving behind what had been within that wrapper.

# Using `akashacms-embeddables` with an EPUB

The `akashacms-embeddables` plugin makes it easy to _embed_ content from 3rd party websites.  The primary use is when you have a YouTube link, to automatically get the embed code for that video.  

For example, take this early video of Ryan Dahl talking about Node.js at Yahoo: https://www.youtube.com/watch?v=M-sc73Y-zQA  It can be easily embedded into an AkashaCMS website with:

```
<embed-resource
        href="https://www.youtube.com/watch?v=M-sc73Y-zQA"
        template="embed-resource-framed.html.ejs"/>
```

On an AkashaCMS website this shows the _title_, _description_, and other information including the embedded viewer.  While that's wonderful for a website it's not usable in an EPUB3 eBook.  Typical embedded viewers use an `<iframe>` tag that's simply not allowed in an EPUB.

Here is a live version of that tag:

<div style="margin: 5px; border: 1px solid grey;">
<embed-resource href="https://www.youtube.com/watch?v=M-sc73Y-zQA" template="embed-resource-framed.html.ejs"/>
</div>

The problem is, how do you use this construct so it works well in both an EPUB and on a website? To see how to embed EPUB content into a website see [](6aa-epub-website.html)

The `akashacms-epub` plugin doesn't do much to help in this case.  Instead, what we do is use an `embed-resource-framed.html.ejs` partial that does the right thing in an EPUB -- namely to just show the preview image.

The general idea is to fix things so the _thumbnail_ is used instead of the embedded content.  The trick is to override certain of the templates provided by `akashacms-embeddables`, such as `embed-resource-framed.html.ejs` and `embed-resource.html.ejs`.  In both `<%- embedCode %>` is used to embed the HTML snippet from the 3rd party website.  For example:

```
<div <%
    if (typeof embedClass !== 'undefined') {
        %>class="<%= embedClass %>" <%
    }
    if (typeof width !== 'undefined' && width) {
        %>width="<%= width %>" <%
    }

    if (typeof style !== 'undefined' && style) {
        %>style="<%= style %>" <%
    }
    %> >
    <h3><%= title %></h3>
    <p>Source: <a href="<%= embedUrl %>" rel="nofollow"><%= embedSource %></a></p>
    <% if ((typeof hideDescription === "undefined" || ! hideDescription) && description) {
    		%><%= description %><%
    	} %>
    <div class="embed-responsive embed-responsive-16by9" <%
    %> style="clear: both;">
        <a href="<%= embedHref %>"><img src="<%= imageUrl %>"/></a>
    </div>
</div>
```

The key thing is to replace `<%- embedCode %>` in the standard template with `<a href="<%= embedHref %>"><img src="<%= imageUrl %>"/></a>`.  The `imageUrl` is the preview image provided by the source website.

See https://github.com/akashacms/epub-guide/partials for how that is done in this book.

# `<a name="">` removal

EPUB doesn't allow the `name=` attribute on `<a>` tags, and these are removed.

# `<h1>` etc within a `<p>`

Sometimes the Markdown processor emits a `<h#>` tag within a `<p>` tag.  Browsers don't care about this, but _epubcheck_ does.  The `<p>` is removed.

# `href` attributes in `<a>` and `<link>` are relativized

Within `<a>` and `<link>` tags, if the `href` attribute points at a local resource, the link must be relative.  It's most convenient for the content author to just use `/path/to/file.html` instead of figuring out the relative path.  Such `href`'s are automatically rewritten.

## And... for `<img>` tags, remote images are auto-downloaded

For `<img>` tags the `src=` attribute recieves the same treatment for local references.  For remote image references, the image is auto-downloaded into a local directory and is automatically bundled into the EPUB.
