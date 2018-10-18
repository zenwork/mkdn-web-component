# MdStory Web Component

This is a web component that renders markdown provided through the element's main slot (and probably in some other way as I figure things out with web components and this project)  


## Status

* In development
* it currently does not actually convert the markdown to html


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

## Runinng in demo mode
make sure `http-server` is installed glabally

```
npm install
npm run build
http-serve dist

```

browse to `http://localhost:8080/demo`

there will be links to different use-cases

## Running tests

unit tests:

```
npm run test
```
note: using [jest](https://jestjs.io/) for unit tests

e2e tests:
```
npm run test:e2e
```

note: using [testcafe](https://devexpress.github.io/testcafe/) and [headless chrome](https://chromium.googlesource.com/chromium/src/+/lkgr/headless/) for e2e tests.



