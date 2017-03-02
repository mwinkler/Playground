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
        plugins.push(new ExtractText('[name].bundle.css'));
        plugins.push(new webpack.optimize.UglifyJsPlugin({
            comments: false
        }));
    }

    return {
        entry: {
            demo: './src/index.ts'
        },
        output: {
            filename: '[name].bundle.js',
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
                    test: /\.s?css$/,
                    use: isProd
                        ? ExtractText.extract({ use: 'css-loader' })
                        : [ 'style-loader', 'css-loader', 'sass-loader' ]
                },
                {
                    test: /\.(png|jpg)$/,
                    use: [{
                        loader: 'url-loader',
                        options: { limit: 10000 } // Convert images < 10k to base64 strings
                    }]
                }
            ],
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js']
        },
        devtool: isProd ? undefined : 'inline-source-map',
        plugins: plugins,
        devServer: {
        }
    }
}