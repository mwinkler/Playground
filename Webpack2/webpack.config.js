const path = require('path');
const webpack = require('webpack');
const Clean = require('clean-webpack-plugin');
const Copy = require('copy-webpack-plugin');
const ExtractText = require('extract-text-webpack-plugin');
const Html = require('html-webpack-plugin');

module.exports = env => {

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
                        ? ExtractText.extract({ 
                            use: [
                                { loader: 'css-loader', options: { minimize: true } }, 
                                'sass-loader'
                            ] 
                        })
                        : [ 'style-loader', 'css-loader', 'sass-loader' ]
                },
                {
                    test: /\.(png|jpg|gif)$/,
                    use: [{
                        loader: 'url-loader',
                        options: { limit: 1 } // Convert images < limit (byte) to base64 strings
                    }]
                },
                {
                    test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                    loader: 'file-loader'
                }
            ],
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js']
        },
        devtool: isProd ? false : 'inline-source-map',
        plugins: plugins,
        devServer: {
        }
    }
}