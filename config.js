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
        
        files: {
            opf: "guide.opf",
            epub: "guide.epub"
        },
        
        metadata: {
            title: "Creating eBooks with Markdown and Open Source Tools",
            languages: [ "en" ],
            identifiers: [
                {
                    // Rather than pay for an ISBN we'll use this
                    unique: true,
                    idstring: "urn:uuid:3580db0e-c802-4820-9862-8d8b42e9b9b3",
                    // Keep for testing ... ncxidentifier: "urn:uuid:3c485a80-e868-11e4-af50-e75499556c5d"
                },
                /* { // Keep this one for testing
                    idstring: "urn:uuid:7b3a1b62-e867-11e4-8ff3-3f9f9cafc991"
                } */
            ],
            creators: [
                { id: "author", role: "aut", name: "David Herron", fileAs: "Herron, David", nameReversed: "Herron, David" },
            ],
            publisher: "David Herron",
            subjects: [ 
                "Self Publishing", "Markdown", "EPUB", "EPUB3", "Open Source Publishing",
                "Electronic Books", "Electronic Book Publishing", "E-Books", "E-Book Publishing",
                "EPUB Publishing", "Create eBooks"
            ],
            // TEST: date: "2015-04-15",
            // TEST: modified: "2015-04-15T00:00:00Z",
            cover: "ebook-cover-image",
            rights: "Copyright 2015, David Herron"
        },
        
        cover: {
            id: "cover",
            idImage: "cover-image",
            // src:  "images/epub-guide-cover.png",
            src:  "images/cover.png",
            alt:  "AkashaEPUB Book Creators Guide",
            type: "image/png"
        },
        
        contents: {
            id: "toc",
            title: "Table of Contents",
            subtitle: undefined,
            href: "toc.html",
            path: "toc.html.ejs",
            type: "application/xhtml+xml",
            toclayout: "epub_page.html.ejs",
            
            toctype: "1",
            tocstart: "0",
            
            ncx: {
                id: "ncx",
                href: "toc.ncx"
            }
        },
        
        chapters: [
            {
                id: "chapter0",
                title: "Copyright",
                href: "0a-copyright.html",
                type: "application/xhtml+xml",
                navclass: "book"
                
            },
            {
                id: "chapter1",
                title: "Introduction to AkashaEPUB",
                href: "1-introduction.html",
                type: "application/xhtml+xml",
                navclass: "book"
                
            },
            {
                id: "chapter2",
                title: "Installing Node.js, AkashaCMS and AkashaEPUB",
                href: "2-installation.html",
                type: "application/xhtml+xml",
                navclass: "book",
                
                subchapters: [
                    {
                        id: "chapter2a",
                        title: "Installing Node.js, Grunt",
                        href: "2a-install-nodejs.html",
                        type: "application/xhtml+xml",
                        navclass: "book"
                    },
                    {
                        id: "chapter2b",
                        title: "Installing AkashaCMS, AkashaEPUB",
                        href: "2b-install-akashacms.html",
                        type: "application/xhtml+xml",
                        navclass: "book"
                    },
                    {
                        id: "chapter2c",
                        title: "AkashaCMS Directory structure and how it's used in AkashaEPUB",
                        href: "2c-akashacms-directory.html",
                        type: "application/xhtml+xml",
                        navclass: "book"
                    },
                    {
                        id: "chapter2d",
                        title: "AkashaEPUB quick start",
                        href: "2d-quickstart.html",
                        type: "application/xhtml+xml",
                        navclass: "book"
                    }
                ]
            },
            {
                id: "chapter3",
                title: "Creating content for an AkashaEPUB",
                href: "3-creating-content.html",
                type: "application/xhtml+xml",
                navclass: "book",
                
                subchapters: [
                    {
                        id: "chapter3a",
                        title: "AkashaCMS document format",
                        href: "3a-document-format.html",
                        type: "application/xhtml+xml",
                        navclass: "book"
                    },
                    {
                        id: "chapter3b",
                        title: "AkashaCMS metadata",
                        href: "3b-metadata.html",
                        type: "application/xhtml+xml",
                        navclass: "book"
                    },
                    {
                        id: "chapter3c",
                        title: "Content markup",
                        href: "3c-content-markup.html",
                        type: "application/xhtml+xml",
                        navclass: "book"
                    },
                    {
                        id: "chapter3d",
                        title: "AkashaCMS rendering process",
                        href: "3d-rendering.html",
                        type: "application/xhtml+xml",
                        navclass: "book"
                    },
                    {
                        id: "chapter3e",
                        title: "Summary of HTML5 markup in AkashaEPUB Documents",
                        href: "3e-html5-structure.html",
                        type: "application/xhtml+xml",
                        navclass: "book"
                    }
                ]
            },
            
            {
                id: "chapter4",
                title: "Configuration",
                href: "4-configuration.html",
                type: "application/xhtml+xml",
                navclass: "book",
                
                subchapters: [
                    {
                        id: "chapter4a",
                        title: "akashacmsEPUB",
                        href: "4a-akashacmsEPUB.html",
                        type: "application/xhtml+xml",
                        navclass: "book"
                    },
                    {
                        id: "chapter4b",
                        title: "Book Metadata",
                        href: "4b-book-metadata.html",
                        type: "application/xhtml+xml",
                        navclass: "book"
                    },
                    {
                        id: "chapter4c",
                        title: "Cover Image",
                        href: "4c-cover-image.html",
                        type: "application/xhtml+xml",
                        navclass: "book"
                    },
                    {
                        id: "chapter4d",
                        title: "Chapters and the Table of Contents",
                        href: "4d-table-contents.html",
                        type: "application/xhtml+xml",
                        navclass: "book"
                    },
                    {
                        id: "chapter4e",
                        title: "Copyright page",
                        href: "4e-copyright-page.html",
                        type: "application/xhtml+xml",
                        navclass: "book"
                    },
                    {
                        id: "chapter4f",
                        title: "Links",
                        href: "4f-links.html",
                        type: "application/xhtml+xml",
                        navclass: "book"
                    },
                    {
                        id: "chapter4g",
                        title: "Assets and images",
                        href: "4g-assets.html",
                        type: "application/xhtml+xml",
                        navclass: "book"
                    },
                    {
                        id: "chapter4h",
                        title: "CSS Stylesheets",
                        href: "4h-stylesheets.html",
                        type: "application/xhtml+xml",
                        navclass: "book"
                    },
                    {
                        id: "chapter4i",
                        title: "Fonts",
                        href: "4i-fonts.html",
                        type: "application/xhtml+xml",
                        navclass: "book"
                    },
                    {
                        id: "chapter4j",
                        title: "Config.js",
                        href: "4j-configjs.html",
                        type: "application/xhtml+xml",
                        navclass: "book"
                    }
                ]
            },
            
            {
                id: "chapter5",
                title: "Building an EPUB",
                href: "5-building-EPUB.html",
                type: "application/xhtml+xml",
                navclass: "book",
                
                subchapters: [
                    {
                        id: "chapter5a",
                        title: "Examining Grunt",
                        href: "5a-examining-grunt.html",
                        type: "application/xhtml+xml",
                        navclass: "book"
                    },
                    {
                        id: "chapter5b",
                        title: "Validating your EPUB",
                        href: "5b-validation.html",
                        type: "application/xhtml+xml",
                        navclass: "book"
                    }
                ]
            },
            
            {
                id: "chapter6",
                title: "AkashaCMS Project",
                href: "6-akashacms-project.html",
                type: "application/xhtml+xml",
                navclass: "book"
            },
            {
                id: "chapter7",
                title: "About",
                href: "7-about.html",
                type: "application/xhtml+xml",
                navclass: "book"
            },
            {
                id: "chapter8",
                title: "References",
                href: "8-references.html",
                type: "application/xhtml+xml",
                navclass: "book"
            }
        ],
        
        stylesheets: [
            { id: "stylesheet", href: "css/style.css", type: "text/css" },
            // { id: "stylesheet", href: "style.css", type: "text/css" },
        ],
        
        assets: [
            { id: "ccbyndimage", href: "images/cc-by-nd-88x31.png", type: "image/png" },
            { id: "epubinaction", href: "images/akasha-epub-in-action.png", type: "image/png" },
            { id: "nodewebdev",  href: "images/node-web-dev-cover.jpg", type: "image/jpeg" },
            { id: "metaltype",  href: "images/640px-Metal_movable_type.jpg", type: "image/jpeg" },
            { id: "epub.embedded.font.1", href: "fonts/UbuntuMono-B.ttf", type: "application/vnd.ms-opentype" },
            { id: "epub.embedded.font.2", href: "fonts/UbuntuMono-BI.ttf", type: "application/vnd.ms-opentype" },
            { id: "epub.embedded.font.3", href: "fonts/UbuntuMono-R.ttf", type: "application/vnd.ms-opentype" },
            { id: "epub.embedded.font.4", href: "fonts/UbuntuMono-RI.ttf", type: "application/vnd.ms-opentype" },
            /* { id: "epub.embedded.font.5", href: "fonts/FreeSerif.otf", type: "application/vnd.ms-opentype" },
            { id: "epub.embedded.font.6", href: "fonts/FreeSansBold.otf", type: "application/vnd.ms-opentype" }, */
            { id: "epub.embedded.font.7", href: "fonts/OpenSans/OpenSans-Bold.ttf", type: "application/x-font-ttf" },
            { id: "epub.embedded.font.8", href: "fonts/OpenSans/OpenSans-BoldItalic.ttf", type: "application/x-font-ttf" },
            /* { id: "epub.embedded.font.9", href: "fonts/OpenSans/OpenSans-ExtraBold.ttf", type: "application/x-font-ttf" },
            { id: "epub.embedded.font.10", href: "fonts/OpenSans/OpenSans-ExtraBoldItalic.ttf", type: "application/x-font-ttf" }, */
            { id: "epub.embedded.font.11", href: "fonts/OpenSans/OpenSans-Italic.ttf", type: "application/x-font-ttf" },
            /* { id: "epub.embedded.font.12", href: "fonts/OpenSans/OpenSans-Light.ttf", type: "application/x-font-ttf" },
            { id: "epub.embedded.font.13", href: "fonts/OpenSans/OpenSans-LightItalic.ttf", type: "application/x-font-ttf" }, */
            { id: "epub.embedded.font.14", href: "fonts/OpenSans/OpenSans-Regular.ttf", type: "application/x-font-ttf" },
            /* { id: "epub.embedded.font.15", href: "fonts/OpenSans/OpenSans-Semibold.ttf", type: "application/x-font-ttf" },
            { id: "epub.embedded.font.16", href: "fonts/OpenSans/OpenSans-SemiboldItalic.ttf", type: "application/x-font-ttf" }, */
			
			/* { id: "epub.embedded.font.7", href: "fonts/Raleway/Raleway-Bold.ttf", type: "application/x-font-ttf" },
			{ id: "epub.embedded.font.8", href: "fonts/Raleway/Raleway-ExtraBold.ttf", type: "application/x-font-ttf" },
			{ id: "epub.embedded.font.9", href: "fonts/Raleway/Raleway-ExtraLight.ttf", type: "application/x-font-ttf" },
			{ id: "epub.embedded.font.10", href: "fonts/Raleway/Raleway-Heavy.ttf", type: "application/x-font-ttf" },
			{ id: "epub.embedded.font.11", href: "fonts/Raleway/Raleway-Light.ttf", type: "application/x-font-ttf" },
			{ id: "epub.embedded.font.12", href: "fonts/Raleway/Raleway-Medium.ttf", type: "application/x-font-ttf" },
			{ id: "epub.embedded.font.13", href: "fonts/Raleway/Raleway-Regular.ttf", type: "application/x-font-ttf" },
			{ id: "epub.embedded.font.14", href: "fonts/Raleway/Raleway-SemiBold.ttf", type: "application/x-font-ttf" },
			{ id: "epub.embedded.font.15", href: "fonts/Raleway/Raleway-Thin.ttf", type: "application/x-font-ttf" },
			{ id: "epub.embedded.font.16", href: "fonts/Roboto/Roboto-Black.ttf", type: "application/x-font-ttf" },
			{ id: "epub.embedded.font.17", href: "fonts/Roboto/Roboto-BlackItalic.ttf", type: "application/x-font-ttf" },
			{ id: "epub.embedded.font.18", href: "fonts/Roboto/Roboto-Bold.ttf", type: "application/x-font-ttf" },
			{ id: "epub.embedded.font.19", href: "fonts/Roboto/Roboto-BoldItalic.ttf", type: "application/x-font-ttf" },
			{ id: "epub.embedded.font.20", href: "fonts/Roboto/Roboto-Italic.ttf", type: "application/x-font-ttf" },
			{ id: "epub.embedded.font.21", href: "fonts/Roboto/Roboto-Light.ttf", type: "application/x-font-ttf" },
			{ id: "epub.embedded.font.22", href: "fonts/Roboto/Roboto-LightItalic.ttf", type: "application/x-font-ttf" },
			{ id: "epub.embedded.font.23", href: "fonts/Roboto/Roboto-Medium.ttf", type: "application/x-font-ttf" },
			{ id: "epub.embedded.font.24", href: "fonts/Roboto/Roboto-MediumItalic.ttf", type: "application/x-font-ttf" },
			{ id: "epub.embedded.font.25", href: "fonts/Roboto/Roboto-Regular.ttf", type: "application/x-font-ttf" },
			{ id: "epub.embedded.font.26", href: "fonts/Roboto/Roboto-Thin.ttf", type: "application/x-font-ttf" },
			{ id: "epub.embedded.font.27", href: "fonts/Roboto/Roboto-ThinItalic.ttf", type: "application/x-font-ttf" } */

			
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
    
    builtin: {
        suppress: {
            layouts: true,
            // partials: true,
            assets: true,
            sitemap: true,
            extlink: true
        }
    },
	
    config: function(akasha) {
		akasha.registerPlugins([
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
