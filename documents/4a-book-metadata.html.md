---
layout: page.html.ejs
title: Book Metadata
---


We specify the metadata in the `metadata` member, and then AkashaEPUB populates fields in both the OPF and NCX files.  The fields in the `metadata` object are pretty straight-forward.  Let's take them one at a time.

The `title` is the Book Title, of course.

The `languages` member specifies which language (or languages) in which the book is written.  Books can, and sometimes are, written in multiple languages, so simply list what's appropriate.  The language codes are taken from RFC5646 ([www.ietf.org/rfc/rfc5646.txt](http://www.ietf.org/rfc/rfc5646.txt)]) and might look like this for a book written in both English and French.

```
    akashacmsEPUB: {
    ...
        metadata: {
        ...
            languages: [ "en", "fr" ],
        ...
        }
    }
    ...
```

Now let's talk about the tricky subject of uniquely identifying the packaged EPUB document that we're creating.  EPUB readers need to know this, as do publishers and others.  Tricky because of the distinction between a persistent document identifier that's retained even if the document is updated (modified), and a unique identifier that changes any time the document is modified.

There are two elements to consider:

```
    akashacmsEPUB: {
    ...
        metadata: {
        ...
            ISBN: "urn:isbn:123456789X",
            identifier: "urn:isbn:123456789X",
        ...
        }
    }
    ...
```

The `ISBN` element is used in the NCX file, while the `identifier` is used in the OPF file.  They could be different.  

The format for these identifiers is a URN (uniform resource name - [en.wikipedia.org/wiki/Uniform_resource_name](https://en.wikipedia.org/wiki/Uniform_resource_name)).  These are similar in purpose and format to a URL, but instead of specifying an address of a page on the Web a URN more generally gives a unique name to a "resource".  The Wikipedia page has some good examples.  For our purposes there are approximately two URN formats of interest:

* ISBN: `urn:isbn:123456789X` -- This is the international standard book number
* UUID: `urn:uuid:6e8bc430-9c3a-11d9-9669-0800200c9a66` -- This is just a string of self-assigned numbers that you guarantee is a unique universal identifying number.

The `uuid` command available on some systems is sufficient for generating a UUID:

```
$ uuid
a6cca476-e3a2-11e4-a466-3fac34d90757
```

The ISBN number system is controlled by the International ISBN Agency ([www.isbn-international.org/](https://www.isbn-international.org/)), through regional ISBN agencies.  Publishers or authors acquire ISBN numbers through one of those agencies.

These two identifiers are persistent document identifier I mentioned above.  What about the unique identifier that changes every time the document is republished?

```
    date: "2015-02-21",
    modified: "2015-02-26T00:00:00Z",
```

These two fields give the publishing date of the document, and the modification time of the current version.  Concatenating the `identifier` with the `modified` date gives the unique identifier which changes on every modification.

The `creators` member lists all the authors (creators) of the document.  

```
creators: [
    { name: "David Herron", nameReversed: "Herron, David" },
],
```

List one per "creator".  The `name` and `nameReversed` field takes care of different ways the name is presented in different systems.  Additional fields can be given to refine the data.   You can also list `contributors` whose role was less significant. 

```
contributors: [
    { name: "John Smith", nameReversed: "Smith, John" },
],
```

The `publisher` member gives the name of the publisher.  This is simply the proper name for the publisher.

The `subjects` member gives an array of keyphrases or keywords describing the topic or topics covered in the book.

The `rights` member is a statement of intellectual property rights held over the document.  For example: "Copyright 2015, John Smith".
