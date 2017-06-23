/**
 * Created by mattputipong on 6/20/17.
 */

'use strict';

import webpack from 'webpack';
import Merge from 'webpack-merge';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CommonConfig from './webpack.base.config';
import { resolve } from 'path';

const
    extractHtml    = new HtmlWebpackPlugin( {
        template: 'index.html',
        filename: '../dist/index.html'
    } );

export default Merge( CommonConfig, {
    devtool: 'eval-source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    },
    plugins: [
        extractHtml
    ],
    devServer: {
        contentBase: resolve( __dirname, '../dist' )
    }
} );
