---
layout: page.html.ejs
title: CSS Stylesheets
---

In the previous section we discussed the asset files that can improve our content.  CSS files of course are very important because they're what we use to improve content layout, colors, and more.

It's very simple:

```
    stylesheets: [
        { id: "stylesheet", href: "css/style.css", type: "text/css" },
    ],
```

The stylesheets listed in this array will be added in the HEAD section of every HTML file in the book.  That's all which is required.

If you just want to use a simple normal .css file, put `css/style.css` in the `root_assets` directory.  But CSS preprocessors are all the rage today, and out-of-the-box AkashaCMS supports LESS.  That means you can put `css/style.css.less` in the `root_docs` dirctory, and AkashaCMS will compile that down to `css/style.css` in `root_out`.