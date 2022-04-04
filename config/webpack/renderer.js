const path = require('path');

const { exclude } = require('./helpers.js');
const mergeWithBase = require('./merge-with-base.js');

module.exports = mergeWithBase({
    // relative to /src/
    dir: './renderer/',

    // relative to /src/<dir>/
    entry: './index.tsx',

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
                test: /\.(gif|jpe?g|tiff|png|webp|bmp|svg|eot|ttf|woff|woff2)$/i,
                type: 'asset',
                generator: {
                    filename: 'assets/[hash][ext][query]',
                }
            }
        ]
    }
});

console.log(module.exports);