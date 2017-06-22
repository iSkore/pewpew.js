/**
 * Created by mattputipong on 6/20/17.
 */

'use strict';

import { resolve } from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const extractSass = new ExtractTextPlugin( './css/main.css' );

export default {
    context: resolve( __dirname, '../app' ),
    entry: {
        app: [ './js/index.js' ]
    },
    output: {
        path: resolve( __dirname, '../dist' ),
        filename: './js/bundle.js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                include: resolve( __dirname, '../app/css' ),
                use: extractSass.extract( {
                    fallback: 'style-loader',
                    use: [ 'css-loader', 'sass-loader' ]
                } )
            },
            {
                test: /\.(woff|woff2)$/,
                use: {
                    loader: 'file-loader?publicPath=../&name=/fonts/[name].[ext]'
                }
            }
        ]
    },
    plugins: [
        extractSass
    ]
}
