---
layout: page.html.ejs
title: Final miscellaneous configuration
---


# Suppressing certain default AkashaCMS behaviors

AkashaCMS was originally designed to build websites.  That means its core functions produce HTML with metadata and other items suitable for a website.  While EPUB3 uses HTML5, there are significant differences in usage between when its encapsulated in EPUB3 and when its displayed on a website.  At the moment we configure AkashaCMS for EPUB by turning off (suppressing) certain core features like so:

```
    builtin: {
        suppress: {
            layouts: true,
            // partials: true,
            assets: true,
            sitemap: true,
            extlink: true
        },
    	markdownIt: {
    		html:         true,        // Enable html tags in source
    		xhtmlOut:     false,        // Use '/' to close single tags (<br />)
    		breaks:       false,        // Convert '\n' in paragraphs into <br>
    		// langPrefix:   'language-',  // CSS language prefix for fenced blocks
    		linkify:      false,        // Autoconvert url-like texts to links
    		typographer:  true,         // Enable smartypants and other sweet transforms
    	  
    		// Highlighter function. Should return escaped html,
    		// or '' if input not changed
    		highlight: function (/*str, , lang*/) { return ''; }
    	}
    },
```

For example, if `extlink` were not suppressed then every link appearing in this book would have a little icon indicating it's an external link, and the icon file would have to be listed in the manifest.  Since this behavior isn't useful in an EPUB it's suppressed.  Likewise there's no need for a Sitemap in an EPUB.  Likewise, the website-oriented assets aren't appropriate for an EPUB.  Until AkashaCMS is refactored this technique of suppressing features is required.

The `markdownIt` object is used to configure the Markdown processor being used ([www.npmjs.com/package/markdown-it](https://www.npmjs.com/package/markdown-it)).  We found it necessary to turn off the `linkify` feature.


# Registering the required plugins

The last required piece in the `config.js` is to register the `akashacms-epub` plugin.  This plugin is what adapts AkashaCMS to producing EPUB files.

```
    config: function(akasha) {
    	akasha.registerPlugins(module.exports, [
            { name: 'akashacms-epub', plugin: require('akashacms-epub') },
        ...
        ]);
        ...
    }
```

If you want to use other plugins, go ahead and register them.  

