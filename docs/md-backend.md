# MD-BACKEND

This is a web component provides state, event handling, and data-caching facilities  

 
## Usage in Browser

```
    <html>
        <head>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/2.0.2/webcomponents-bundle.js"></script>
        </head>
        <body>
            <md-backend>
                <md-list></md-list>
                <md-story></md-story>
                <md-store indexbase="/index.json" storybase="/"></md-store>
            </md-backend>
            
            <script src="md-backend.js"></script>
            <script src="md-list.js"></script>
            <script src="md-story.js"></script>
        </body>
    </html>
```

## Sub-component

`md-static-store` - intended for simple cases like testing. Could be used with server-side templating.
`md-store` - 

### MD-STORE (not implemented yet)

```
    <md-backend>
        <md-list></md-list>
        <md-story></md-story>
        <md-store indexbase="/index.json" storybase="/"></md-store>
    </md-backend>
```

#### attributes

`indexbase` - where to find the story index
`storybase` - service base for retreiving individual story content.
`caching` - enable caching. 

### MD-STATIC-STORE

this sub-component is intended for testing and possibly for server-side templating

```
    <md-backend>
        <md-list></md-list>
        <md-story></md-story>
        <md-static-store >
            [
                {"key": "title-1", "title": "Title 1", "content": "# Title 1\n\nSome content about #1"},
                {"key": "title-2", "title": "Title 2", "content": "# Title 2\n\nSome content about #2"}
            ]
        </md-store>
    </md-backend>
```


