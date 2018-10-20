# mkdn-web-component
Collection of Web Components to show markdown content.

* [overview](markdown-components/README.md) 
* [md-story](markdown-components/md-story.md)
* [md-history](markdown-components/md-history.md)
* [md-backend](markdown-components/md-backend.md)
* [md-excerpt](markdown-components/md-excerpt.md) (not implemented yet) 

## Status

* Basic implementation works
* TODO:
  * md-story
      * add support for dropcaps at document start 
      * expose some kind of styling interface
  * md-history
      * implement support for groups
      * rename to md-list
  * md-backend
      * implement support for a rest-based back-end(md-store)
      * rename to md-view
  * general
      * e2e tests do not work in firefox
      * sort out minification and uglification
      * create online version of demo
      * build and publish
      * move /demo out /test one level up
      * review decision to have json and markdown transclusion... seems weird practice
      * ...

