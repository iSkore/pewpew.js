'use strict';

import webpack from 'webpack';
import Merge from 'webpack-merge';
import CommonConfig from './webpack.base.config';
import { resolve } from 'path';

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
    devServer: {
        contentBase: resolve( __dirname, '../dist' )
    }
} );
