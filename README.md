# mkdn-web-component
Collection of Web Components to show markdown content.

## Repo Doc
* [project overview](markdown-components/README.md) 

## Reference Doc
* [md-story](docs/md-story.md)
* [md-list](docs/md-list.md)
* [md-view](docs/md-view.md)
* [md-excerpt](docs/md-excerpt.md) (not implemented yet) 

## Example

This set of components makes laying out a markdown based blog as simple as this

```
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Test Home</title>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css">
        <script src="https://cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/2.0.2/webcomponents-bundle.js"></script>
    </head>
    <body>
        <h1>My Blog</h1>
        <div class="container">
           <md-view class="row">
                <md-story class="col-7"></md-story>
                <md-list class="col-3"></md-list>
                <md-store src="/md/titles" stories="/md/title/"></md-store>
            </md-view>
        </div>
    
        <script src="/api/md-story.js"></script>
        <script src="/api/md-list.js"></script>
        <script src="/api/md-view.js"></script>
    
    </body>
    </html>
```
## Status

* Basic implementation works
* TODO:
  * md-story
      * add support for dropcaps at document start 
      * expose some kind of styling interface
  * md-list
      * implement support for groups
  * md-view
      * implement support for a rest-based back-end(md-store)
  * md-store and md-static-store
      * document the data formats and back-end api specification
  * general
      * e2e tests do not work in firefox
      * sort out minification and uglification
      * create online version of demo
      * build and publish
      * move /demo out /test one level up
      * review decision to have json and markdown transclusion... seems weird practice
      * figure out what the magic that webpack is doing!
      * events.js should probably be split into smaller files

