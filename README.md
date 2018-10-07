# mkdn-web-component
Markdown Web Component

## Web Component examples

### Angular Elements 

in the `md-story` directory

#### Example 1: angular docs example

This example runs a single angular application and loads components as a regular component or a web component. I am not sure what the point of the example is!

##### commands to view:
1. make sure `main.ts` file loads the `./app/app.module`
1. run `ng serve`

#### Example 2: compiling a webcompent

seems to run fine but it's not running in a shadow DOM. I am not sure how isolated each component is.

##### commands to view
1. make sure `main.ts` file loads the `./app-alt/app.module`
1. run `npm run build:element`
1. run `http-serve dist/md-story-dev`
1. browse to `http://localhost:8080`
1. press the 'add' button to add instances

### Various Simple Examples

##### commands to view
1. cd to `simplest`
1. run `http-serve src/shadow`
1. browse to `http://localhost:8080/` followed by `simple1.html`, `simple2.html`, or `simple13.html` 

