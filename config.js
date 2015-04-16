var fs   = require('fs');
var path = require('path');

module.exports = {
    root_assets: [ 'assets' ],
    root_layouts: [ 'layouts' ],
    root_partials: [ 'partials' ],
    root_out: 'out',
    root_docs: [ 'documents'],
    
    root_url: 'http://epub-guide.akashacms.com',
    
    doMinimize: false,
    
    deploy_rsync: {
        user: 'reikiman',
        host: 'epub-guide.akashacms.com',
        dir:  'epub-guide.akashacms.com'
    },
    
    akashacmsEPUB: {
        
        files2generate: {
            opf: "ebook.opf",
            ncx: "toc.ncx",
            toc: "toc",
            epub: "guide.epub"
        },
        
        metadata: {
            title: "AkashaCMS EPUB creators guide",
            languages: [ "en" ],
            ISBN: "urn:isbn:123456789X",
            identifier: "urn:isbn:123456789X",
            creators: [
                { name: "David Herron", nameReversed: "Herron, David" },
            ],
            publisher: "Amazon.com",
            subjects: [ 
                "Self Publishing", "Markdown", "EPUB", "EPUB3", "Open Source Publishing",
                "Electronic Books", "Electronic Book Publishing", "E-Books", "E-Book Publishing",
                "EPUB Publishing"
            ],
            date: "2015-04-15",
            modified: "2015-04-15T00:00:00Z",
            cover: "ebook-cover-image",
            rights: "Copyright 2015, David Herron"
        },
        
        manifest: [
            {
                id: "cover",
                title: "Cover",
                href: "cover.html",
                type: "application/xhtml+xml",
                spineorder: 1
            },
            {
                id: "toc",
                title: "Table of Contents",
                href: "toc.html",
                path: "toc.html.ejs",
                type: "application/xhtml+xml",
                spineorder: 2,
                navclass: "toc",
                toclayout: "page.html.ejs",
                properties: "nav"
            },
            {
                id: "ncx",
                href: "toc.ncx",
                type: "application/x-dtbncx+xml",
                spinetoc: true,
                navclass: "toc"
            },
            {
                id: "chapter1",
                title: "Introduction to AkashaEPUB",
                href: "1-introduction.html",
                type: "application/xhtml+xml",
                spineorder: 3,
                navclass: "book"
            },
            {
                id: "chapter2",
                title: "Installing Node.js, AkashaCMS and AkashaEPUB",
                href: "2-installation.html",
                type: "application/xhtml+xml",
                spineorder: 4,
                navclass: "book"
            },
            {
                id: "chapter2a",
                title: "AkashaCMS Directory structure and how it's used in AkashaEPUB",
                href: "2a-akashacms-directory.html",
                type: "application/xhtml+xml",
                spineorder: 5,
                navclass: "book"
            },
            {
                id: "chapter2b",
                title: "AkashaEPUB quick start",
                href: "2b-quickstart.html",
                type: "application/xhtml+xml",
                spineorder: 6,
                navclass: "book"
            },
            {
                id: "chapter3",
                title: "Creating content for an AkashaEPUB",
                href: "3-creating-content.html",
                type: "application/xhtml+xml",
                spineorder: 7,
                navclass: "book"
            },
            {
                id: "chapter3a",
                title: "AkashaCMS document format",
                href: "3a-document-format.html",
                type: "application/xhtml+xml",
                spineorder: 8,
                navclass: "book"
            },
            {
                id: "chapter3b",
                title: "AkashaCMS metadata",
                href: "3b-metadata.html",
                type: "application/xhtml+xml",
                spineorder: 9,
                navclass: "book"
            },
            {
                id: "chapter3c",
                title: "Content markup",
                href: "3c-content-markup.html",
                type: "application/xhtml+xml",
                spineorder: 10,
                navclass: "book"
            },
            {
                id: "chapter3d",
                title: "AkashaCMS rendering process",
                href: "3d-rendering.html",
                type: "application/xhtml+xml",
                spineorder: 11,
                navclass: "book"
            },
            {
                id: "chapter3e",
                title: "Summary of HTML5 markup in AkashaEPUB Documents",
                href: "3e-html5-structure.html",
                type: "application/xhtml+xml",
                spineorder: 12,
                navclass: "book"
            },
            {
                id: "chapter4",
                title: "Configuration",
                href: "4-configuration.html",
                type: "application/xhtml+xml",
                spineorder: 13,
                navclass: "book"
            },
            {
                id: "chapter4a",
                title: "Book Metadata",
                href: "4a-book-metadata.html",
                type: "application/xhtml+xml",
                spineorder: 14,
                navclass: "book"
            },
            {
                id: "chapter4b",
                title: "Generating the Table of Contents",
                href: "4b-table-contents.html",
                type: "application/xhtml+xml",
                spineorder: 15,
                navclass: "book"
            },
            {
                id: "chapter4c",
                title: "Final Config",
                href: "4c-final-misc-config.html",
                type: "application/xhtml+xml",
                spineorder: 16,
                navclass: "book"
            },
            {
                id: "chapter5",
                title: "Building an EPUB",
                href: "5-building-EPUB.html",
                type: "application/xhtml+xml",
                spineorder: 17,
                navclass: "book"
            },
            {
                id: "chapter5a",
                title: "Examining Grunt",
                href: "5a-examining-grunt.html",
                type: "application/xhtml+xml",
                spineorder: 18,
                navclass: "book"
            },
            {
                id: "chapter6",
                title: "Wrapping up",
                href: "6-wrapping-up.html",
                type: "application/xhtml+xml",
                spineorder: 19,
                navclass: "book"
            },
            { id: "stylesheet", href: "css/style.css", type: "text/css" },
            {
                id: "ebook-cover-image",
                properties: "cover-image",
                href: "images/epub-guide-cover.png",
                type: "image/png"
            }, // properties: "cover-image",
            { id: "epub.embedded.font.1", href: "fonts/UbuntuMono-B.ttf", type: "application/vnd.ms-opentype" },
            { id: "epub.embedded.font.2", href: "fonts/UbuntuMono-BI.ttf", type: "application/vnd.ms-opentype" },
            { id: "epub.embedded.font.3", href: "fonts/UbuntuMono-R.ttf", type: "application/vnd.ms-opentype" },
            { id: "epub.embedded.font.4", href: "fonts/UbuntuMono-RI.ttf", type: "application/vnd.ms-opentype" },
            { id: "epub.embedded.font.5", href: "fonts/FreeSerif.otf", type: "application/vnd.ms-opentype" },
            { id: "epub.embedded.font.6", href: "fonts/FreeSansBold.otf", type: "application/vnd.ms-opentype" },
        ],
        
        toc: [
            { id: "cover" },
            { id: "toc" },
            {
                id: "chapter1",
            },
            {
                id: "chapter2",
                subtoc: [
                    { id: "chapter2a" },
                    { id: "chapter2b" }
                ]
            },
            {
                id: "chapter3",
                subtoc: [
                    { id: "chapter3a" },
                    { id: "chapter3b" },
                    { id: "chapter3c" },
                    { id: "chapter3d" },
                    { id: "chapter3e" }
                ]
            },
            {
                id: "chapter4",
                subtoc: [
                    { id: "chapter4a" },
                    { id: "chapter4b" },
                    { id: "chapter4c" }
                ]
            },
            {
                id: "chapter5",
                subtoc: [
                    { id: "chapter5a" }
                ]
            },
            {
                id: "chapter6"
            }
        ],
        
        stylesheets: [
            { href: "css/style.css" }
        ]
    },
    
    data: {
        metarobots: "index,follow",
        metaOGtype: "website",
        metaOGsite_name: "AkashaCMS EPUB Guide",
        metasubject: "Content Management Systems",
        metalanguage: "EN"
    },
    
	google: {
		analyticsAccount: "UA-37003917-1", // TBD
		analyticsDomain: "epub-guide.akashacms.com",
		// siteVerification: "CcDz9XDUIb4D1cW8VuiGj3kI_hckLDPFuwMrM2tYBds",
	},
    
    headerScripts: {
        stylesheets: [ ],
        javaScriptTop: [ ],
        javaScriptBottom: [ ]
    },
	
    funcs: {
    },

    cheerio: {
        recognizeSelfClosing: true,
        recognizeCDATA: true,
        xmlMode: true
    },
    
	/* themeBootstrap: {
		bootstrapCSSurl: "//maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css",
		bootstrapThemeCSSurl: "//maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap-theme.min.css",
		bootstrapJSurl: "//maxcdn.bootstrapcdn.com/bootstrap/3.3.2/js/bootstrap.min.js",
		useHtml5shiv: true,
		useRespondJS: true
	}, */
    
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
	
    config: function(akasha) {
		akasha.registerPlugins(module.exports, [
            { name: 'akashacms-epub', plugin: require('akashacms-epub') },
			// { name: 'akashacms-theme-bootstrap', plugin: require('akashacms-theme-bootstrap') },
			// { name: 'akashacms-breadcrumbs', plugin: require('akashacms-breadcrumbs') },
			// { name: 'akashacms-booknav', plugin: require('akashacms-booknav') },
			// { name: 'akashacms-embeddables', plugin: require('akashacms-embeddables') },
			// { name: 'akashacms-blog-podcast', plugin: require('akashacms-blog-podcast') },
			// { name: 'akashacms-social-buttons', plugin: require('akashacms-social-buttons') },
			// { name: 'akashacms-tagged-content', plugin: require('akashacms-tagged-content') }
		]);
    }
};
