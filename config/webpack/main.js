const mergeWithBase = require('./merge-with-base.js');

module.exports = mergeWithBase({

    // relative to /src/
    dir: './main/',

    // relative to /src/<dir>/
    entry: './main.ts',
    target: 'electron-main'
});

console.log(module.exports);