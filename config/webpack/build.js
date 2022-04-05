const path = require('path');

const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const ReactRefreshTypeScript = require('react-refresh-typescript');

const mode = /^pro(?:d(?:uction)?)?$/i.test(process.env.NODE_ENV) ? 'production' : 'development';
const isDev = mode !== 'production';
const exclude = /(?:^|[\\\/])(?:(?:node_modules)|(?:config)|(?:\.vscode)|(?:dist)|(?:temp))(?:[\\\/]|$)/i;

module.exports.exclude = exclude;
module.exports.merge = config => {
    const tsconfig = path.resolve(__dirname, '../../src/', config.dir, './tsconfig.json');

    let outputPath = path.resolve(__dirname, '../../build/', config.dir);
    let resolveExtensions = ['.js', '.ts'];
    if (config.resolve?.extensions) {
        resolveExtensions = resolveExtensions.concat(config.resolve.extensions);
    }

    const plugins = [
        new ForkTsCheckerWebpackPlugin({ typescript: { configFile: tsconfig } })
    ];

    let devServer, getCustomTransformers;
    if (isDev && config.tsx) {
        plugins.push(new ReactRefreshWebpackPlugin());
        devServer = {
            hot: true,
            static: {
                directory: path.resolve(__dirname, '../../build/static/')
            }
        };
        getCustomTransformers = () => ({
            before: [ReactRefreshTypeScript()]
        });
    }

    const optimization = config.optimization;

    return {
        mode,
        entry: path.resolve(__dirname, '../../src/', config.dir, config.entry),
        output: {
            filename: 'index.js',
            path: outputPath
        },
        target: config.target,
        resolve: {
            extensions: resolveExtensions,
            alias: {
                '@assets' : path.resolve(__dirname, '../../assets/')
            }
        },
        module: {
            rules: [
                {
                    test: config.tsx ? /\.tsx?/i : /\.ts/i,
                    exclude,
                    use: [
                        { loader: 'source-map-loader' },
                        {
                            loader: 'ts-loader',
                            options: {
                                configFile: tsconfig,
                                transpileOnly: true,
                                getCustomTransformers
                            }
                        }
                    ]
                },
                ...(config.module?.rules ?? [])
            ]
        },
        plugins: [...plugins, ...(config.plugins ?? [])],
        optimization,
        devtool: 'source-map',
        devServer,
        stats: 'minimal'
    }
}