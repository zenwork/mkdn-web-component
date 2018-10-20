# Markdown Web Components Documentation

This is a collection of web components meant to work together.

* [md-story](../docs/md-story.md) - display a story
* [md-list](../docs/md-list.md) - provide a list of stories that can be displayed
* [md-backend](../docs/md-backend.md) - provide state, event handling, and data-caching(eventually) to the other two components


## Runinng the demos

Each component has a set of demos that are used to demo the features AND run e2e tests against.

make sure `http-server` is installed globally

```
npm install
npm run build
http-serve dist

```

browse to `http://localhost:8080/demo`

there will be links to different use-cases

## Running tests

### unit tests

```
npm run test
```
note: using [jest](https://jestjs.io/) for unit tests

### e2e tests
End-to-end tests require that the demo be running
```
npm run test:e2e
```

note: using [testcafe](https://devexpress.github.io/testcafe/) and [headless chrome](https://chromium.googlesource.com/chromium/src/+/lkgr/headless/) for e2e tests.



