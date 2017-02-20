const path = require('path');
const Clean = require('clean-webpack-plugin');
const Copy = require('copy-webpack-plugin');

const dist = path.resolve(__dirname, 'dist');

module.exports = {
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
    plugins: [
        new Clean(['dist']),
        new Copy([{ from: 'src/index.html' }])
    ],
    devServer: {
    }
};