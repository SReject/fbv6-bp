const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");



module.exports = {
    mode: /^pro(?:d(?:uction)?)?$/i.test(process.env.NODE_ENV) ? 'production' : 'development',
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    plugins: [new ForkTsCheckerWebpackPlugin()]
};