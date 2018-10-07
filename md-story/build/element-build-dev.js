const fs = require('fs-extra');
const concat = require('concat');
(async function build() {
    const files = [
        './dist/md-story/runtime.js',
        './dist/md-story/polyfills.js',
        './dist/md-story/styles.js',
        './dist/md-story/vendor.js',
        './dist/md-story/main.js'
    ];
    await concat(files, './dist/md-story/webcomponent.js');
    await fs.move('./dist/md-story/index.html', './dist/md-story/wc.html');
    await fs.copyFile('./src/webcomponent.html', './dist/md-story/index.html');
    await fs.remove('./dist/md-story-dev');
    await fs.move('./dist/md-story', './dist/md-story-dev');
    // await fs.copyFile('./dist/md-story/styles.css', './dist/elements/styles.css')
    // await fs.copy('./dist/md-story/assets/', 'elements/assets/' )
})();
