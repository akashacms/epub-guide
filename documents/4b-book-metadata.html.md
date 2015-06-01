---
layout: page.html.ejs
title: Book Metadata
akashacmsEPUB:
    id: chapter4b
---

A major part of EPUB is the metadata carrying information about the book, like the title, authors, publisher, identifying codes and more.  The OPF and NCX files both carry that metadata.

For AkashaEPUB, the `metadata` configuration object holds the data used to populate the OPF and NCX files.  In this section we'll go over the metadata, which should be pretty straight-forward.

To get the most out of this section it's best to be reading the `book.yml` for this book at [github.com/akashacms/epub-guide/blob/master/book.yml](https://github.com/akashacms/epub-guide/blob/master/book.yml).

## Title & Languages

The `title` member, of course, holds the Book Title.

The `languages` member specifies which language (or languages) in which the book is written.  Books can, and sometimes are, written in multiple languages, so simply list what's appropriate.  The language codes are taken from RFC5646 ([www.ietf.org/rfc/rfc5646.txt](http://www.ietf.org/rfc/rfc5646.txt)]) and might look like this for a book written in both English and French.

```
title: Skeletal AkashaEPUB book
languages: [ en, fr ]
```

## Identifiers

While the ISBN is the primary system for identifying books, it's not the only game in town.  For many important uses one doesn't even need an ISBN depending on how the book is being distributed.

Generally speaking an __identifier__ is a unique (hopefully) text string assigned to a specific book.  While that's seemingly simple, it's a little tricky in practice.  Book identifiers play different roles in different scenarios.

The ISBN is a product identifier.  The publisher doesn't have to acquire a new ISBN for minor revisions, but it is required to do so for a completely new edition.  The publisher also must acquire an ISBN for each format the book is published in.  In other words, the product identifier is how book distributors and stores distinguish one physical book from another.

The product identifier is useful for book distributors, but it doesn't tell us whether two versions of an electronic book are bit-for-bit identical.  

The EPUB3 committee settled on two identifiers that together satisfy both the need for a product identifier, and a bit-for-bit identicalness identifier.  Over the next few paragraphs we'll go over how to represent this in AkashaEPUB.

Consider:

```
identifiers: 
    - unique: true
      idstring: "urn:uuid:b624d2ee-e88a-11e4-b0db-376a7655914b"
```

The `identifiers` list contains product identifiers.  An EPUB can have multiple identifiers, hence we support more than one.  However, only one of them can be the unique identifier for the EPUB.  The `unique` attribute is required on one and only one of these identifiers.  It can have any value you wish, it just needs to be present.  The `idstring` attribute is the actual identifier string. 

The `idstring` attribute takes a URN (uniform resource name - [en.wikipedia.org/wiki/Uniform_resource_name](https://en.wikipedia.org/wiki/Uniform_resource_name)).  URN's are similar in purpose and format to a URL.  Instead of specifying an address of a page on the Web a URN more generally gives a unique name to a "resource", like a book.  The Wikipedia page has some good examples.  The URN prefix tells us what kind of resource name it is, in this case an ISBN.  For our purposes in building EPUB's there are approximately three URN formats of interest:

* DOI: `urn:doi:....` -- Digital Object Identifier
* ISBN: `urn:isbn:123456789X` -- This is the standard identifier string for books, the international standard book number
* UUID: `urn:uuid:6e8bc430-9c3a-11d9-9669-0800200c9a66` -- This is just a string of self-assigned numbers that you guarantee is a unique universal identifying number.

If you don't supply any identifier a random UUID identifier will be generated for you.  You can generate a UUID with the `uuid` or `uuidgen` command on some systems.  Some computer systems have a command-line program for generating a UUID.  Generate one if you have no need for any officially designated identifier:

```
$ uuid
a6cca476-e3a2-11e4-a466-3fac34d90757
```

The ISBN number system is controlled by the International ISBN Agency ([www.isbn-international.org/](https://www.isbn-international.org/)), through regional ISBN agencies.  Publishers or authors can acquire ISBN numbers through the agency for their country or region.  Some say that ISBN's are unnecessary for electronic books, and indeed none of the e-book marketplaces require an ISBN.  If you've acquired an ISBN for your book, use it in the method shown above.

If you must generate an NCX file, and if your NCX file has to carry a different identifier than the OPF file, do this:

```
identifiers: 
    - unique: true
      idstring: " .... one identifier"
      ncxidentifier: " ... another identifier"
```

If you do this, the epubcheck program (see [](5b-validation.html)) will give you a WARNING that the OPF and NCX identifiers should be equal.

So far we've talked about the publication identifier, and promised to discuss a second identifier that's used for bit-for-bit identicalness.  Now's the time to do so.

The method chosen by the EPUB3 committee was to use the `date` metadata value.  By gluing together the publishing identifier just discussed, and the publishing date, an EPUB reader can tell one EPUB from another.  One simply must be sure to generate a new publishing date each time the EPUB is gnerated.

The EPUB's publishing date is specified as so

```
date: "2015-02-21T00:00:00Z"
```

The date string most conform to the W3C date format, as shown here.  This `date` attribute fills in the `dc:date` element in the OPF metadata.  Another date field, the `dcterms:modified` element, is automatically generated by AkashaEPUB to indicate the exact time the EPUB was built.  If you do not provide a `date`, it is generated for you.

## Creators and Contributors

The `creators` member lists all the authors (creators) of the document.  

```
creators:
    - id: author
      name: John Smith
      nameReversed: Smith, John
```

List one per "creator".  The `name` and `nameReversed` field takes care of different ways the name is presented in different systems.  Additional fields can be given to refine the data.   You can also list `contributors` whose role was less significant. 

```
contributors:
    - id: contrib1
      name: "John Smith"
      nameReversed: "Smith, John"
```

## Other metadata

The `publisher` member gives the name of the publisher.  This is simply the proper name for the publisher.

The `subjects` member gives an array of keyphrases or keywords describing the topic or topics covered in the book.

The `rights` member is a statement of intellectual property rights held over the document.  For example: "Copyright 2015, David Herron".

The `source` member is used when an EPUB was derived from another source publication, such as a print version of a book.  Use the Identifier of that other publication.
