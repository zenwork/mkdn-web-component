# mkdn-web-component
Collection of Web Components to show markdown content.

## Repo Doc
* [project overview](markdown-components/README.md) 

## Reference Doc
* [md-story](docs/md-story.md)
* [md-list](docs/md-list.md)
* [md-view](docs/md-view.md)
* [md-excerpt](docs/md-excerpt.md) (not implemented yet) 

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
  * general
      * e2e tests do not work in firefox
      * sort out minification and uglification
      * create online version of demo
      * build and publish
      * move /demo out /test one level up
      * review decision to have json and markdown transclusion... seems weird practice
      * figure out what the magic that webpack is doing!

