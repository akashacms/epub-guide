---
layout: ebook-page.html.ejs
title: Installing the AkashaEPUB toolchain
---

As we said in the previous chapter, AkashaEPUB is geek-friendly software.  It's use means editing with a programmers text editor to write the Markdown, and running command-line programs to render your electronic book as EPUB.  The model is familiar to anybody who writes code.  The closest to a WYSIWYG experience with AkashaEPUB is that some Markdown editors offer a pseudo-WYSIWYG experience.  Even that wouldn't show you how AkashaEPUB will end up rendering the page.

Bottom line is it's helpful if you're familiar with the sort of tools used by software developers.

Since AkashaEPUB is a Node.js based tool, the installation process is to first install Node.js, then to use npm to install AkashaRender and various plugins that together are called AkashaCMS and AkashaEPUB.

These components are are:
* Node.js ([nodejs.org](https://nodejs.org/)) provides the platform on which AkashaCMS is written
* AkashaCMS ([akashacms.com](https://akashacms.com)) is a content management system that produces static HTML websites
* AkashaRender ([akashacms.com/akasharender/toc.html](https://akashacms.com/akasharender/toc.html))
* AkashaEPUB ([akashacms.com/epubtools/toc.html](https://akashacms.com/epubtools/toc.html)) adds the ability to produce EPUBs to the AkashaCMS platform

Beyond that software you will need a programmer-friendly plain text editor.  The recommended build process presumes a (?bash?) shell command line environment.  This software hasn't been tested on a Windows machine, but in theory it should work (knock on wood).

I'm currently using Atom (https://atom.io), and in the past have used KomodoEDIT or BBEdit.  These editors offer a nice editing experience for Markdown, HTML, JavaScript, CSS and other related file formats.  

In the ChromeOS/ChromeBook world of packaged Chrome apps, the Mado editor is interesting because you edit Markdown in one side of the window, and a real-time rendering of the Markdown appears in the other side.  While that model is useful for editing generic Markdown text, AkashaCMS adds a lot of custom capabilities beyond straight Markdown which aren't rendered in Mado.

In the following sections we'll quickly take you through installing these components, and then we'll quickly run through building a sample EPUB with AkashaEPUB.

# Installing Node.js

Node.js runs on pretty much any computer system available.  The official place to download installable bundles is the website - [nodejs.org](https://nodejs.org) - simply click on the Download link.  The download link gives you an "installer" with which you make a one-time installation of the Node.js platform, including the npm package manager.

Once Node.js is installed, make sure the npm command is also available:

```
$ node --version
v6.9.1
$ npm --version
3.10.8
```

The question is, what do you do once the Node.js project updates the Node.js platform?  They'll have shipped a new release which may fix things or add features or make improvements that would be useful.  How do you easily stay up-to-date with the latest release, in other words.  

Maybe you would be comfortable staying with a Node.js release you know works for you.  If so, ignore the rest of this section, because we're about to go over a couple simple ways to keep your Node.js installation up-to-date.

The instructions for Node.js installation from package managers -- https://nodejs.org/en/download/package-manager/ -- is a great place to start.  On Most Linux distro's you can install Node.js via the package management system and be good-to-go.  On Mac OS X, you can use MacPorts or Homebrew for the same purpose.  On Windows it can be installed via Chocolatey or Scoop.

If installed via a package manager, updating Node.js to a newer release is a simple command to instruct the package manager to update the system.  On Ubuntu/Debian that means `apt-get update` followed by `apt-get upgrade`, etc.

Maybe instead you want multiple Node.js versions installed and the ability to switch from one to the other quickly.  An AkashaCMS user likely doesn't have that need, but a Node.js software developer does.  The `nvm` command at https://github.com/creationix/nvm is the best choice for that purpose.  

Once you install the `nvm` command simply run `nvm install 6` or `nvm install 8` to install Node.js in the named release branch.  Like so:

```
$ nvm install 6
Downloading https://nodejs.org/dist/v6.11.0/node-v6.11.0-darwin-x64.tar.xz...
######################################################################## 100.0%
WARNING: checksums are currently disabled for node.js v4.0 and later
Now using node v6.11.0 (npm v3.10.10)
$ node --version
v6.11.0
$ npm --version
3.10.10
```

# Short-circuiting AkashaCMS/etc installation by installing epub-skeleton

The simplest way to setup an AkashaEPUB project is by downloading the Skeleton project.

```
$ git clone https://github.com/akashacms/epub-skeleton.git
Cloning into 'epub-skeleton'...
remote: Counting objects: 65, done.
remote: Total 65 (delta 0), reused 0 (delta 0), pack-reused 65
Unpacking objects: 100% (65/65), done.
$ mv epub-skeleton newBookName
$ cd newBookName
$ npm install
.... much output
$ npm run rebuild
.... much output
$ ls -l skeleton.epub
-rw-r--r--  1 david  staff  129265 Jul  8 22:47 skeleton.epub
```

The result is an EPUB file that can be read using any EPUB3 compliant EPUB reader.  We have tested the toolchain to be capable of producing EPUB3 files that pass muster with the `epubcheck` tool.

When you ran `npm install`, the AkashaRender and AkashaEPUB tools were installed.  Inside `package.json` are command strings necessary to run the tools to render the content, bundling it in the EPUB format.

## Initializing an AkashaEPUB project from scratch

It's possible to create an AkashaEPUB project without starting from the Skeleton project.  Other chapters of this book go over the details.  At a high level it involves:

* Installing the npm packages for AkashaRender, AkashaEPUB, Mahabhuta, etc  The packages include:
    * `akasharender` -- Rendering system that can be used for producing both websites and electronic books
    * `akashacms-footnotes` -- Generates footnotes
    * `akasharender-epub` -- Adds EPUB-specific capabilities to AkashaRender
    * `mahabhuta` -- HTML DOM processing engine using a jQuery-like API
    * `epubtools` -- Commands for checking generated HTML and bundling HTML as an EPUB
    * `globfs` -- Performs various commands over a directory structure using glob patterns to select files
* Create a `config.js` to describe the AkashaCMS side of the project -- This covers configuration of the AkashaCMS packages to produce EPUB's
* Create a `package.json` to describe the Node.js side of the project -- This covers npm package dependencies, as well as the commands for the build process
* Create a `book.yml` to describe the AkashaEPUB side of the project -- This covers book metadata

# Conclusion

You now have a directory structure for a working AkashaEPUB project.  The remainder of the book covers:

* Creating content files -- [](3-creating-content.html)
* Configuration files -- [](4-configuration.html)
* Structuring your EPUB -- [](5-structure.html)
* Build process -- [](6-building-EPUB.html)
