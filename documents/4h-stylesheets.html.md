---
layout: page.html.ejs
title: CSS Stylesheets
---

In the previous section we discussed the asset files that can improve our content.  CSS files of course are very important because they're what we use to improve content layout, colors, and more.  Generally speaking EPUB3 supports CSS3, but support might be spotty across the EPUB readers.

Simply put something like this in the `book.yml`:

```
stylesheets:
    - { id: "stylesheet", href: "/css/style.css" }
```

The stylesheets listed in this array will be added in the HEAD section of every HTML file in the book.  That's all which is required.

When the `<link id="stylesheet" href="/css/style.css" type="text/css"/>` tag is generated, AkashaEPUB will automatically rewrite the `href` attribute to the correct relative URL.

If you just want to use a simple normal .css file, put `css/style.css` in the `root_assets` directory.  But CSS preprocessors are all the rage today, and out-of-the-box AkashaCMS supports LESS.  That means you can put `css/style.css.less` in the `root_docs` dirctory, and AkashaCMS will compile that down to `css/style.css` in `root_out`.

## Media queries - responsive EPUB3 design

Not all EPUB readers can display colors, so you might do this to use a grayscale design on non-color devices.

```
@import url(color.css) screen and (color);
@import url(grayscale.css) screen and (not color);
```

Different page layouts can be chosen based on display size:

```
@media screen and (max-width: 720px) {
...
}
@media screen and (max-width: 1024px) {
...
}
```

EPUB3 supports CSS Multicolumn Layout making this possible:

```
article {
    column-count: 2;
    column-gap: 1em;
    /* styling of dividing line
       between columns */
    column-rule: rgb(0,0,0) dashed 1px;
}
```
