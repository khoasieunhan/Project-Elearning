const path = require('path');
// const webpack = require('webpack');
require('../du-an/node_modules/mdbootstrap/js/popper.min.js');

module.exports = {
    entry: {
        admin: ['./Controller/admin.ts'],
        user: ['./Controller/dsKhoaHoc.ts'],
    },
    devtool: 'source-map',
    module: {
        rules: [
            //Typescript loader
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            //SASS LOADER ĐỂ ĐÓNG GÓI CÁC FILE SASS
            {
                test: /\.scss$/,
                use: [{
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader",
                        options: {
                            minimize: true,
                        }
                    },
                    {
                        loader: "sass-loader"
                    },
                ]
            },

            //CSS LOADER ĐỂ ĐÓNG GÓI CÁC FILE CSS
            {
                test: /\.css$/,
                use: [{
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader",
                        options: {
                            minimize: true,
                        }
                    }
                ],
            },
            //ĐÓNG GÓI HÌNH ẢNH
            {
                test: /\.(jpg|png)$/,
                use: {
                    loader: "url-loader",
                    options: {
                        name: "../[path][name].[ext]",
                        limit: 1000,
                    },
                },
            },
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    // plugins: [
    //     new webpack.ProvidePlugin({
    //         'Popper': 'popper.min.js'
    //     })

    // ],
    // optimization: {
    //     splitChunks: {
    //         cacheGroups: {
    //             vendor: {
    //                 test: /node_modules/,
    //                 chunks: "initial",
    //                 name: "vendor",
    //                 priority: -10,
    //                 enforce: true,
    //             }
    //         }

    //     },
    // },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
};