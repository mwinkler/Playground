const path = require('path');
const webpack = require('webpack');
//const Copy = require('copy-webpack-plugin');
const ExtractText = require('extract-text-webpack-plugin');
const Clean = require('clean-webpack-plugin');
const Html = require('html-webpack-plugin');

// vars
const isProd = (process.env.NODE_ENV === 'production');
const src = 'src/Frontend/Client';
const output = 'src/Frontend/wwwroot';

// plugins
const plugins = [
    new Clean([output]),
    new Html({ template: path.resolve(src, 'index.html') })
];

// production build plugins
if (isProd) {
    plugins.push(new ExtractText('[name].bundle-[hash:6].css'));
    plugins.push(new webpack.optimize.UglifyJsPlugin({
        mangle: { screw_ie8: true },
        compress: { screw_ie8: true },
        comments: false
    }));
}

module.exports = {
    entry: {
        demo: path.resolve(src, 'index.ts')
    },
    output: {
        path: path.resolve(__dirname, output),
        //publicPath: 'build/',
        filename: '[name].bundle-[hash:6].js',
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.s?css$/,
                use: isProd
                    ? ExtractText.extract(['css-loader?minimize', 'sass-loader'])
                    : ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader',
                options: { name: '[name]-[hash:6].[ext]', limit: 1 } // Convert images < limit (byte) to base64 strings
            },
            {
                test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                loader: 'file-loader',
                options: { name: '[name]-[hash:6].[ext]' }
            },
            {
                test: /\.html$/,
                loader: 'html-loader?exportAsEs6Default',
                //loader: 'file-loader!extract-loader!html-loader?exportAsEs6Default',
                //options: { exportAsEs6Default: true }
                //exclude: 'index.html'
            }
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    devtool: isProd ? false : 'inline-source-map',
    plugins: plugins,
    // devServer: {
    // }
}