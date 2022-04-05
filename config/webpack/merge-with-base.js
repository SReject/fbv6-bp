const path = require('path');

const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const ReactRefreshTypeScript = require('react-refresh-typescript');

const { exclude, mode, isDev } = require('./helpers.js');

module.exports = config => {
    let outputPath = path.resolve(__dirname, '../../build/', config.dir);

    const tsconfig = path.resolve(__dirname, '../../src/', config.dir, './tsconfig.json');

    let resolveExtensions = ['.js', '.ts'];
    if (config.resolve?.extensions) {
        resolveExtensions = resolveExtensions.concat(config.resolve.extensions);
    }

    let moduleRules = [{
        test: config.tsx ? /\.tsx?/i : /\.ts/i,
        exclude,
        use: [
            { loader: 'source-map-loader' },
            {
                loader: 'ts-loader',
                options: {
                    configFile: tsconfig,
                    getCustomTransformers: () => ({
                        before: [isDev() && config.tsx && ReactRefreshTypeScript()].filter(Boolean),
                    }),
                    transpileOnly: true,
                }
            }
        ]
    }];
    if (config.module?.rules) {
        moduleRules = moduleRules.concat(config.module.rules);
    }

    let plugins = [
        new ForkTsCheckerWebpackPlugin({ typescript: { configFile: tsconfig } })
    ];
    if (isDev() && config.tsx) {
        plugins.push(new ReactRefreshWebpackPlugin());
    }
    if (config.plugins) {
        plugins = plugins.concat(config.plugins);
    }

    let devServer;
    if (isDev() && config.tsx) {
        devServer = {
            hot: true,
            static: {
                directory: path.resolve(__dirname, '../../build/static/')
            }
        }
    }

    return {
        mode,
        entry: path.resolve(__dirname, '../../src/', config.dir, config.entry),
        output: {
            filename: 'index.js',
            path: outputPath
        },
        target: config.target,
        resolve: {
            extensions: resolveExtensions
        },
        module: {
            rules: moduleRules
        },
        plugins,
        devtool: 'source-map',
        devServer,
        stats: 'minimal'
    }
}