const path = require('path');

const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

const { exclude, mode } = require('./helpers.js');

module.exports = config => {
    let outputPath = path.resolve(__dirname, '../../build/', config.dir)

    let resolveExtensions = ['.js', '.ts'];
    if (config.resolve?.extensions) {
        resolveExtensions = resolveExtensions.concat(config.resolve.extensions);
    }

    let moduleRules = [{
        test: config.tsx ? /\.tsx?/i : /\.ts/i,
        exclude,
        use: {
            loader: 'ts-loader',
            options: {
                transpileOnly: true,
                config: path.resolve(__dirname, '../../src/', config.dir, './tsconfig.json')
            }
        }
    }];
    if (config.module?.rules) {
        moduleRules = moduleRules.concat(config.module.rules);
    }

    let plugins = [new ForkTsCheckerWebpackPlugin()];
    if (config.plugins) {
        plugins = plugins.concat(config.plugins);
    }


    return {
        mode,
        entry: path.resolve(__dirname, '../../src/', config.dir, config.entry),
        output: {
            path: outputPath
        },
        target: config.target,
        resolve: {
            extensions: resolveExtensions
        },
        module:{
            rules: moduleRules
        },
        plugins,
        devtool: 'inline-source-map',
        stats: 'minimal'
    }
}