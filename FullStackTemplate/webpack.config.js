const path = require('path');
const webpack = require('webpack');
//const Copy = require('copy-webpack-plugin');
const ExtractText = require('extract-text-webpack-plugin');
const Html = require('html-webpack-plugin');

module.exports = env => {

    const isProd = env === 'prod';

    const plugins = [
        new Html({ template: 'src/client/index.html' })
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

    return {
        entry: {
            demo: './src/client/index.ts'
        },
        output: {
            filename: '[name].bundle-[hash:6].js',
            path: path.resolve(__dirname, 'build', 'client')
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
                    options: { name: 'assets/[name]-[hash:6].[ext]', limit: 1 } // Convert images < limit (byte) to base64 strings
                },
                {
                    test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                    loader: 'file-loader',
                    options: { name: 'assets/[name]-[hash:6].[ext]' }
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
}