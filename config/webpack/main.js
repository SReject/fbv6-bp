const path = require('path');

const baseConfig = require('./base.js');

const mainConfig = {
    ...baseConfig,
    entry: path.resolve(__dirname, '../../src/main/main.ts'),
    target: 'electron-main',
    module: {
        rules: [
            {
                test: /\.tsx?$/i,
                exclude: /[\\\/]node_modules(?:[\\\/]|$)/i,
                loader: 'ts-loader',
                options: {
                    transpileOnly: true,
                    config: path.resolve(__dirname, '../../src/main/tsconfig.json')
                }
            }
        ]
    }
};

module.exports = mainConfig;