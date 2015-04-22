---
layout: page.html.ejs
title: Installing Node.js, Grunt
---


Node.js runs on pretty much any computer system available.  The official place to download installable bundles is the website - [nodejs.org/download/](http://nodejs.org/download/) ..  Instructions are available for most systems, and it's very straightforward.

Once Node.js is installed, make sure the npm command is also available:

```
    $ node --version
    v0.10.38
    $ npm --version
    1.4.28
```

Next let's install Grunt, a tool for automating build processes.  We use Grunt to build AkashaEPUB books into EPUB format.  See [gruntjs.com/getting-started](http://gruntjs.com/getting-started) for more information

```
    $ sudo npm install -g grunt-cli
```

That takes care of installing the Grunt command-line tool.  Later on we'll install the other half of Grunt.

