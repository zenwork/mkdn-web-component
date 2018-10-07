const fs = require('fs-extra');
const concat = require('concat');
(async function build() {
    const files = [
        './dist/md-story/runtime.js',
        './dist/md-story/polyfills.js',
        // './dist/md-story/scripts.js',
        './dist/md-story/main.js'
    ];
    await fs.move('./dist/md-story','./dist/md-story-prod');
    await concat(files, './dist/md-story-prod/md-story.js');
    await fs.copyFile('./src/webcomponent.html', './dist/md-story-prod/index.html');
    // await fs.copyFile('./dist/md-story/styles.css', './dist/elements/styles.css')
    // await fs.copy('./dist/md-story/assets/', 'elements/assets/' )
})();
