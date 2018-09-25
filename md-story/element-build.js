const fs = require('fs-extra');
const concat = require('concat');
(async function build() {
    const files = [
        './dist/md-story/runtime.js',
        './dist/md-story/polyfills.js',
        './dist/md-story/scripts.js',
        './dist/md-story/main.js'
    ];
    await fs.ensureDir('./dist/md-story-element');
    await concat(files, './dist/md-story-element/md-story.js');
    await fs.copyFile('./src/shell.html', './dist/md-story-element/index.html');
    // await fs.copyFile('./dist/md-story/styles.css', './dist/elements/styles.css')
    // await fs.copy('./dist/md-story/assets/', 'elements/assets/' )
})();
