'use strict';

var webpack = require('webpack');

var LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

var env = process.env.NODE_ENV;
var config = {
    module: {
        rules: [
            {test: /\.js$/, loader: "babel-loader", exclude: /node_modules/}
        ]
    },
    output: {
        library: 'Truss',
        libraryTarget: 'umd'
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(env)
        }),
		new LodashModuleReplacementPlugin(),
		new webpack.optimize.ModuleConcatenationPlugin()
    ]
};

if (env === 'production') {
    config.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
			minimize: true,
            compressor: {
                pure_getters: true,
                unsafe: true,
                unsafe_comps: true,
                screw_ie8: true
            }
        })
    )
}

module.exports = config;
