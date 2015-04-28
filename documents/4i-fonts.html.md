---
layout: page.html.ejs
title: Using Fonts
---

Each EPUB reading application chooses some default fonts, and perhaps that will be good enough for your purpose.  But your readers experience of your EPUB can be improved by selecting custom fonts.  Because the system is based on HTML5, the whole ecosystem of font choices are available with the caveat that font definition files have to be shipped inside the EPUB. 

Website developers using custom fonts has to do it carefully to limit the impact on download time.  When crafting an EPUB, one has to carefully choose the custom fonts to minimize the size of the EPUB.

Embedding a font in an EPUB is optional.  Doing so can improve the presentation of your book, but adds technical and administrative overhead.  Mitigating that overhead are two considerations:

1. AkashaEPUB has made the technical part fairly easy, 
2. Choosing an open source font (versus commercial) limits the administrative overhead to checking the font license.

There's more technical overhead than just the task of embedding the font.  EPUB reader software has a spotty record of supporting custom font choices.  Sometimes it's significantly difficult to get an embedded font to work correctly.  EPUB3 does require support for OpenType and WOFF fonts, however.  As EPUB reading systems move to EPUB3, supporting custom fonts should become easier.

Commercial font licenses prohibit redistributing the font in the way an EPUB does.  That is, anybody receiving the EPUB can simply unzip the file and copy the fonts elsewhere, which commercial font foundaries wish to avoid.  The EPUB3 spec includes a simple encryption mechanism that then allows one to distribute a commercial font in an EPUB.  AkashaEPUB, at this time, doesn't implement font encryption.  The good news is that the open source fonts can be very good, and are available under a license that presents zero administrative burden.

The problem you cannot get around is "bloat".  An EPUB with embedded font files is unavoidably larger than an EPUB which doesn't.

# Implementation

There are three steps to implementing a custom font:

1. Include the font file in the EPUB, and in the OPF manifest.
2. Declare the font in your CSS stylesheet.
3. Use the font on one or more elements in the stylesheet.

This first step declares the font files in the `assets` array, ensuring they end up in the OPF manifest.  Simply put the chosen font files wherever you wish and make everything match up.

```
    assets: [
        ... other asset files
        { id: "epub.embedded.font.1",
          href: "fonts/UbuntuMono-B.ttf",
          type: "application/vnd.ms-opentype" },
        { id: "epub.embedded.font.2", 
          href: "fonts/UbuntuMono-BI.ttf", 
          type: "application/vnd.ms-opentype" },
        { id: "epub.embedded.font.3", 
          href: "fonts/UbuntuMono-R.ttf", 
          type: "application/vnd.ms-opentype" },
        { id: "epub.embedded.font.4", 
          href: "fonts/UbuntuMono-RI.ttf", 
          type: "application/vnd.ms-opentype" },
        { id: "epub.embedded.font.5", 
          href: "fonts/FreeSerif.otf", 
          type: "application/vnd.ms-opentype" },
        { id: "epub.embedded.font.6",
          href: "fonts/FreeSansBold.otf", 
          type: "application/vnd.ms-opentype" }
    ]
```

Font file mime types:

* OpenType: `.otf` :- `application/vnd.ms-opentype`
* WOFF: `.woff` :- `application/font-woff`
* TrueType: `.ttf` :- `application/x-font-ttf`

Now you declare the fonts in the stylesheet, at the end of the stylesheet:

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

The path here, `../fonts/FontFile.ttf`, assumes a certain structure in the EPUB.  Namely that the `css` directory contains CSS files, and the `fonts` directory contains font files.  It means that, relative to the CSS files, font files are `../fonts/...` hence the `url()` values chosen here.

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



# Finding quality, free, fonts

You don't have to spend an arm and a leg on fonts, because there are many open source fonts available, such as the ones shown above.  Here are a few websites with fonts that can be downloaded for free

* The Open Font Library [http://openfontlibrary.org/](http://openfontlibrary.org/) 
* The Google Fonts library [http://www.google.com/fonts](http://www.google.com/fonts)
* Wikipedia Open Source Unicode Typefaces [https://en.wikipedia.org/wiki/Open-source_Unicode_typefaces](https://en.wikipedia.org/wiki/Open-source_Unicode_typefaces)
* The League of Movable Type [https://www.theleagueofmoveabletype.com/](https://www.theleagueofmoveabletype.com/)
* Wikipedia OpenType and FreeType [https://en.wikipedia.org/wiki/OpenType](https://en.wikipedia.org/wiki/OpenType) and [https://en.wikipedia.org/wiki/FreeType](https://en.wikipedia.org/wiki/FreeType)
* Open Source Hebrew Fonts [http://opensiddur.org/tools/fonts/](http://opensiddur.org/tools/fonts/)
* The SIL Open Font License [http://scripts.sil.org/cms/scripts/page.php?site_id=nrsi&id=OFL](http://scripts.sil.org/cms/scripts/page.php?site_id=nrsi&id=OFL)
* The SIL Project fonts [http://scripts.sil.org/cms/scripts/page.php?cat_id=FontDownloads](http://scripts.sil.org/cms/scripts/page.php?cat_id=FontDownloads)
* Lato Fonts [http://www.latofonts.com/](http://www.latofonts.com/)
* Font Squirrel [http://www.fontsquirrel.com/](http://www.fontsquirrel.com/)
* Deja Vu Fonts [http://dejavu-fonts.org[(http://dejavu-fonts.org/wiki/Main_Page)
* Wikipedia Web Typography [https://en.wikipedia.org/wiki/Web_typography](https://en.wikipedia.org/wiki/Web_typography)

