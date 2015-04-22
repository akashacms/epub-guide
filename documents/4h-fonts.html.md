---
layout: page.html.ejs
title: Using Fonts
---

Selecting custom fonts can also improve the readers experience of your EPUB.  

```
    assets: [
        { id="fooberjpg", href: "images/foobar.jpg", type: "image/jpeg" },
        { id: "epub.embedded.font.1", href: "fonts/UbuntuMono-B.ttf", type: "application/vnd.ms-opentype" },
        { id: "epub.embedded.font.2", href: "fonts/UbuntuMono-BI.ttf", type: "application/vnd.ms-opentype" },
        { id: "epub.embedded.font.3", href: "fonts/UbuntuMono-R.ttf", type: "application/vnd.ms-opentype" },
        { id: "epub.embedded.font.4", href: "fonts/UbuntuMono-RI.ttf", type: "application/vnd.ms-opentype" },
        { id: "epub.embedded.font.5", href: "fonts/FreeSerif.otf", type: "application/vnd.ms-opentype" },
        { id: "epub.embedded.font.6", href: "fonts/FreeSansBold.otf", type: "application/vnd.ms-opentype" }
    ]
```

This lists the font files such that they end up in the OPF manifest.

The next thing is to insert declarations like this in your CSS:

```
h1 {
  font-size: 1.5em;
  font-weight: bold;
  font-family: "Free Sans Bold", sans-serif;
  margin-top: 20px !important;
}
```

This, of course, declares that H1 tags are rendered using the "Free Sans Bold" font.
