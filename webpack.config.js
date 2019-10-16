const path = require('path');

const exclude = '/node_modules';

module.exports = {
    mode: process.env.NODE_ENV,
    resolve: {
        extensions: ['.js', '.jsx', '.tsx', '.ts'],
    },
    entry: {
        index: ['./index.js'],
    },
    output: {
        path: path.resolve(__dirname, './build/'),
        libraryTarget: 'umd',
        filename: '[name].js',
        publicPath: '/build/',
    },
    // optimization: {
    //     splitChunks: {
    //         chunks: 'all',
    //     },
    // },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(png|gif|svg)$/i,
                loader: 'url-loader',
                options: {
                    limit: 100000,
                },
            },
            {
                test: /\.(js|jsx)$/,
                exclude,
                loader: 'babel-loader',
            },
            {
                test: /\.scss$/,
                loaders: [
                    {
                        loader: 'style-loader',
                    }, {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            modules: {
                                mode: 'local',
                                localIdentName: '[name]__[local]--[hash:base64:5]',
                            },
                        },
                    }, {
                        loader: 'sass-loader',
                    },
                ],
            },
        ],
    },
};
