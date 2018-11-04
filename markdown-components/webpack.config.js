const path = require('path')

const CopyWebpackPlugin = require('copy-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const plugins = require('./build/webpack-files.js')

const base = [
    new CleanWebpackPlugin([ path.resolve(__dirname, 'dist') ]),
    new CopyWebpackPlugin(plugins.copyPlugins),
]

const allplugins = base
    .concat(plugins.htmlPlugins)
    .concat(plugins.ejsPlugins)

/**
 * THE CONFIG
 */
module.exports = {
    mode: 'none',
    entry: {
        polyfill: '@babel/polyfill',
        'mkdn-story': './src/components/mkdn-story.js',
        'mkdn-list': './src/components/mkdn-list.js',
        'mkdn-view': './src/components/mkdn-view.js',
        'mkdn-nav': './src/components/mkdn-nav.js',
        'md-parentchild': './test/test-parent-child.js',
        'mkdn-bundle': './src/bundle.js',
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: allplugins,
    module: {
        rules: [ {
            test: /\.js$/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: [
                        [ '@babel/preset-env', {
                            targets: {
                                chrome: '60',
                                safari: '11',
                                ie: '11',
                            },
                            modules: false,
                        } ],
                    ],
                    plugins: [
                        '@babel/plugin-transform-regenerator',
                        [ '@babel/plugin-proposal-decorators', {
                            legacy: true,
                        } ],
                        [ '@babel/plugin-proposal-class-properties', {
                            loose: true,
                        } ],
                    ],
                },
            },
        },
        {
            test: /\.css$/,
            use: [
                'to-string-loader',
                'css-loader',
            ],
        },
        ],
    },
    devtool: 'source-map',
    // ,
    // optimization:{
    // 	splitChunks:{
    // 		chunks:'all'
    // 	}
    // }
}
