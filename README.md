# Overview

#### `<MkDn/>` is a collection of web components(v1) to show markdown content.

I started this as an exploration of the web components spec v1... and then I got a bit carried away.

Some could say that there is no need for yet another markdown component or yet another blogging platform. And they would be right. That said, I am trying to make the resulting tool as simple, light, and easy to use as possible:
* Enable end-users to own their own content delivery mechanism.
* Use as little 3rd-party dependencies as possible.
* Decouple your content from the presentation layer, frameworks, or any platform.
 

## Priniciples

* Provide a set of component that allows the easy integration of markdown content into ANY html ANYWHERE.
* Only require the knowledge of markdown, JSON, and html to create complex documentation-based websites such as blogs, documentation, etc.
* Provide SPA (single-page application) functionality without any programming
* Lower level components like `mkdn-story` and `mkdn-list` can be used in standalone mode.
* Backend integration is provided but is optional and flexible. The backend should be simple enough for simple manual setups... but it should be easy to create intelligent backends that can provide more complex meta-data when there is a lot of content to manage. 
* The target use-cases are:
    * A blog.
    * Online documentation.
    * Online fiction

## 5 minute setup

1. Create an empty directory with this structure
1. Copy all of the mkdn libraries to `/lib`
1. Create/copy markdown content to to `/md`
1. Create an `index.json` file that lists the `.md` files to render
1. Create an `index.html` file that contains your header, footer and an `mkdn-view`
1. run a server like `http-server` on the root of the project. For production you will likely need something designed for production express or nginx.

### Resulting `index.hmtl`

```
<html lang="en">
<head>
    <script src="https://cdn.jsdelivr.net/npm/@webcomponents/webcomponentsjs@2.1.3/webcomponents-loader.js"></script>
</head>
<body>
    <h1>My Blog</h1>
    <div class="container">
        <mkdn-view class="row">
            <mkdn-story></mkdn-story>
            <mkdn-list></mkdn-list>
            <mkdn-store src="/md/index.json" stories="/md/"></mkdn-store>
        </mkdn-view>
    </div>
    <script src="/api/mkdn-story.js"></script>
    <script src="/api/mkdn-list.js"></script>
    <script src="/api/mkdn-view.js"></script>
</body>
</html>
```

### Resulting file structure

```
   web-site
    |- index.html
    |
    |- lib
    |   |- mkdn-view.js
    |   |- mkdn-story.js
    |   |- mkdn-list.js
    |   |- mkdn-nav.js
    |
    |- md
    |   |- index.json
    |   |- md-file-1.md
    |   |- md-file-2.md
```



## Project Status

I am implenting this in my free time. A lot is done. But a lot remains to be done too.

* Basic implementation works
* TODO:
  * mkdn-story
      * add support for dropcaps at document start 
      * expose some kind of styling interface
  * mkdn-list
      * implement support for groups
  * mkdn-view
      * implement support for a rest-based back-end(mkdn-store)
  * mkdn-store and mkdn-static-store
      * document the data formats and back-end api specification
      * add caching support
  * general
      * e2e tests do not work in firefox
      * sort out minification and uglification
      * create online version of demo
      * build and publish
      * move /demo out /test one level up
      * review decision to have json and markdown transclusion... seems weird practice
      * figure out what the magic that webpack is doing!
      * events.js should probably be split into smaller files

