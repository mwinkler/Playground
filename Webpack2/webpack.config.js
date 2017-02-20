const path = require('path');
const webpack = require('webpack');
const Clean = require('clean-webpack-plugin');
const Copy = require('copy-webpack-plugin');
const ExtractText = require('extract-text-webpack-plugin');
const Html = require('html-webpack-plugin');

module.exports = function(env) {

    const dist = path.resolve(__dirname, 'dist');
    const isProd = env === 'production';

    const plugins = [
        new Html({ template: 'src/index.html' })
    ];

    if (isProd) {
        plugins.push(new Clean(['dist']));
        plugins.push(new ExtractText('styles.css'));
        plugins.push(new webpack.optimize.UglifyJsPlugin({
            comments: false
        }));
    }

    return {
        entry: './src/index.ts',
        output: {
            filename: 'bundle.js',
            path: dist
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    loader: 'ts-loader',
                    exclude: /node_modules/,
                },
                {
                    test: /\.css$/,
                    use: isProd
                        ? ExtractText.extract({ use: 'css-loader' })
                        : [ 'style-loader', 'css-loader' ]
                }
            ],
        },
        resolve: {
            extensions: [".tsx", ".ts", ".js"]
        },
        plugins: plugins,
        devServer: {
        }
    }
};