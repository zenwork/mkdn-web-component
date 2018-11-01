# mkdn-list Web Component

This is a web component that renders a list of selectable stories.

## Usage in Browser

```
    <html>
        <head>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/2.0.2/webcomponents-bundle.js"></script>
        </head>
        <body>
            <mkdn-list>
                {
                "title-1": "Title 1",
                "title-2": "Title 2"
                }
            </mkdn-list>
            <script src="mkdn-story.js"></script>
        </body>
    </html>
```

## Supported attributes

* transcluded - the content provided as JSON will be converted to a list.

