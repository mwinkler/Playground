const path = require('path');
const webpack = require('webpack');
const Clean = require('clean-webpack-plugin');
const Copy = require('copy-webpack-plugin');

module.exports = function(env) {

    const dist = path.resolve(__dirname, 'dist');
    const isProd = env === 'production';

    const plugins = [
        new Copy([{ from: 'src/index.html' }])
    ];

    if (isProd) {
        plugins.push(new webpack.optimize.UglifyJsPlugin({
            comments: false
        }));
        plugins.push(new Clean(['dist']));
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
                    use: [ 'style-loader', 'css-loader' ]
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