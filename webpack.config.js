const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

function isDev({
    mode
}) {
    return mode === 'development'
}

function envPlugins(o) {
    let dev = isDev(o)
    if (dev) {
        htmlOpts = {
            minify: false,
            chunks: ['app'],
            template: '!!pug-loader!index.pug'
        }
    } else {
        htmlOpts = {
            hash: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true
            },
            template: '!!pug-loader!index.pug'
        }
    }
    return [
        new webpack.DefinePlugin({
            "DEV": JSON.stringify(dev)
        }),
        new MiniCssExtractPlugin({
            filename: '[id].css'
        }),
        new HtmlWebpackPlugin(htmlOpts)
    ];
};

function entries(list) {
    let obj = {};
    list.forEach(k => {
        obj[k] = ['js', 'sass'].map((ext) => `./${k}/index.${ext}`)
    });
    return obj;
}

module.exports = (env, args) => ({
    entry: entries(['app']),
    output: {
        hashDigest: 'hex',
        hashDigestLength: 8,
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        filename: '[id].js'
    },
    plugins: [
        ...envPlugins(args)
    ],
    devtool: isDev(args) ? 'inline-source-map' : false,
    module: {
        rules: [{
            test: /\.pug$/,
            exclude: /node_modules|^index\.pug/,
            use: [{
                loader: 'riot-tag-loader',
                query: {
                    type: 'es6', // transpile the riot tags using babel
                    template: 'pug',
                    style: 'sass',
                    parsers: {
                        html: {
                            pug: (html, opts, url) => require('pug').compile(html),
                        },
                        css: {
                            sass: (tagName, css, opts, url) => require('node-sass').compile(css),
                        },
                    },
                    hot: isDev(args)
                }
            }]
        }, {
            test: /\.pug$/,
            exclude: /node_modules/,
            use: [{
                loader: 'pug-lint-loader',
                options: require('./.puglintrc.json'),
            }, {
                loader: 'eslint-loader',
                options: {
                    formatter: require("eslint-friendly-formatter")
                }
            }],
            enforce: 'pre'
        }, {
            test: /\.sass$/,
            exclude: /node_modules/,
            use: [
                MiniCssExtractPlugin.loader,
                'css-loader', 'sass-loader'
            ]
        }, {
            test: /\.js$/,
            exclude: /node_modules/,
            use: [{
                loader: 'babel-loader',
                options: {
                    babelrc: false,
                    presets: ["es2015-riot"]
                }
            }, {
                loader: 'eslint-loader',
                options: {
                    formatter: require("eslint-friendly-formatter")
                }
            }]
        }]
    }
})