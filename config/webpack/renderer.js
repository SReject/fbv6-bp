const path = require('path');

const baseConfig = require('./base.js');

const rendererConfig = {
    ...baseConfig,
    entry: path.resolve(__dirname, '../../src/renderer/index.tsx'),
    module: {
        rules: [
            {
                test: /\.css$/i,
                exclude: /node_modules/,
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
                test: /\.tsx?$/i,
                exclude: /[\\\/]node_modules(?:[\\\/]|$)/i,
                loader: 'ts-loader',
                options: {
                    transpileOnly: true,
                    config: path.resolve(__dirname, '../../src/renderer/tsconfig.json')
                }
            }
        ]
    }
};

// todo: merge baseConfig with rendererConfig;

module.exports = rendererConfig;