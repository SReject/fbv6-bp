module.exports.exclude = /(?:^|[\\\/])(?:(?:node_modules)|(?:config)|(?:\.vscode)|(?:dist)|(?:temp))(?:[\\\/]|$)/i;
module.exports.mode = /^pro(?:d(?:uction)?)?$/i.test(process.env.NODE_ENV) ? 'production' : 'development';
module.exports.isDev = () => module.exports.mode !== 'production';