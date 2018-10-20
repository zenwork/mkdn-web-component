# MD-STORY Web Component

This is a web component that renders markdown provided through the element's main slot (and probably in some other way as I figure things out with web components and this project)  
 
## Usage in Browser

```
    <html>
        <head>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/2.0.2/webcomponents-bundle.js"></script>
        </head>
        <body>
            <md-story>
                some markdown
            </md-story>
            <script src="md-story.js"></script>
        </body>
    </html>
```

## Supported attributes

* transclusion - the content of the element is converted from markdown to HTML
* `hidden` - flag that hides the content of the component. The `<md-story>` element is still visible in the DOM.
* `style`  - canonical attribute is injected into the component. 

