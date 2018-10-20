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
                <md-history></md-history>
                <md-story></md-story>
                <md-store indexbase="/index.json" storybase="/"></md-store>
            </md-backend>
            
            <script src="md-backend.js"></script>
            <script src="md-history.js"></script>
            <script src="md-story.js"></script>
        </body>
    </html>
```

## Sub-component

`md-static-store` - intended for simple cases like testing. Could be used with server-side templating.
`md-store` - 



