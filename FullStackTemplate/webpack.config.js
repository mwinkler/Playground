
const path = require('path');
const webpack = require('webpack');
const ExtractText = require('extract-text-webpack-plugin');
const Clean = require('clean-webpack-plugin');
const Html = require('html-webpack-plugin');

// vars
const isProd = (process.env.NODE_ENV === 'production');
const src = 'src/Frontend/Client';
const output = 'src/Frontend/wwwroot';
const filename = `[name]${isProd ? '-[hash:6]' : ''}`;
const filenameExt = filename + '.[ext]';

// plugins
const plugins = [
    new Clean([path.resolve(output, '*')]),
    new Html({ filename: 'index.html', chunks: ['index'] }),
    new Html({ filename: 'demo.html', chunks: ['demo'] }),
    new Html({ filename: 'redux.html', chunks: ['redux-demo'] })
];

// production build plugins
if (isProd) {
    plugins.push(new ExtractText(filename + '.css'));
    plugins.push(new webpack.optimize.UglifyJsPlugin({
        mangle: { screw_ie8: true },
        compress: { screw_ie8: true },
        comments: false
    }));
}

module.exports = {
    entry: {
        index: path.resolve(src, 'index.ts'),
        demo: path.resolve(src, 'demo.tsx'),
        redux: path.resolve(src, 'redux-demo.tsx')
    },
    output: {
        path: path.resolve(__dirname, output),
        filename: filename + '.js',
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
                options: {
                    compilerOptions: {
                        lib: [
                            "dom",
                            "es2015"
                        ]
                    }
                }
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
                options: { name: filenameExt, limit: 1 } // Convert images < limit (byte) to base64 strings
            },
            {
                test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                loader: 'file-loader',
                options: { name: filenameExt }
            },
            {
                test: /\.html$/,
                loader: 'html-loader',
                options: { exportAsEs6Default: true }
            }
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    devtool: isProd
        ? false
        : 'inline-source-map',
    plugins: plugins
}