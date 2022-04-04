const path = require('path');

const { exclude } = require('./helpers.js');
const mergeWithBase = require('./merge-with-base.js');

module.exports = mergeWithBase({
    // relative to /src/
    dir: './renderer/',

    // relative to /src/<dir>/
    entry: './app.tsx',

    target: 'electron-renderer',
    tsx: true,

    module: {
        rules: [
            {
                test: /\.css$/i,
                exclude,
                use: [
                    { loader: 'style-loader' },
                    {
                        loader: 'css-loader',
                        options: { importLoaders: 1 }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                config: path.resolve(__dirname, '../postcss/postcss.js')
                            }
                        }
                    }
                ]
            },
            {
                test: /\.html?$/i,
                exclude,
                type: 'asset/resource',
                generator: {
                    filename: '[base]'
                }
            },
            {
                test: /\.(gif|jpe?g|tiff|png|webp|bmp|svg|eot|ttf|woff|woff2)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/[base]',
                }
            }
        ]
    }
});