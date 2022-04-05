const mergeWithBase = require('./merge-with-base.js');

module.exports = mergeWithBase({

    // relative to /src/
    dir: './preload/',

    // relative to /src/<dir>/
    entry: './preload.ts',
    target: 'electron-preload'
});