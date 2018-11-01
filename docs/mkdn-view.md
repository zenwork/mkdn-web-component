# mkdn-view

This is a web component provides state, event handling, and data-caching facilities  

 
## Usage in Browser

```
    <html>
        <head>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/2.0.2/webcomponents-bundle.js"></script>
        </head>
        <body>
            <mkdn-view>
                <mkdn-list></mkdn-list>
                <mkdn-story></mkdn-story>
                <mkdn-store indexbase="/index.json" storybase="/"></mkdn-store>
            </mkdn-view>
            
            <script src="mkdn-view.js"></script>
            <script src="mkdn-list.js"></script>
            <script src="mkdn-story.js"></script>
        </body>
    </html>
```

## Sub-component

`mkdn-static-store` - intended for simple cases like testing. Could be used with server-side templating.
`mkdn-store` - 

### mkdn-store (not implemented yet)

```
    <mkdn-view>
        <mkdn-list></mkdn-list>
        <mkdn-story></mkdn-story>
        <mkdn-store indexbase="/index.json" storybase="/"></mkdn-store>
    </mkdn-view>
```

#### attributes

`indexbase` - where to find the story index
`storybase` - service base for retreiving individual story content.
`caching` - enable caching. 

### mkdn-static-store

this sub-component is intended for testing and possibly for server-side templating

```
    <mkdn-view>
        <mkdn-list></mkdn-list>
        <mkdn-story></mkdn-story>
        <mkdn-static-store >
            [
                {"key": "title-1", "title": "Title 1", "content": "# Title 1\n\nSome content about #1"},
                {"key": "title-2", "title": "Title 2", "content": "# Title 2\n\nSome content about #2"}
            ]
        </mkdn-store>
    </mkdn-view>
```


