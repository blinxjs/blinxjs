var path = require("path");
var webpack = require("webpack");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var enviroment = require('./enviroment.js');


module.exports = {
	entry: [
	/**"babel-polyfill", **/"./app.js"
	],
	debug: true,
	devtool: 'source-map',
	output: {
		publicPath: "minified/scripts/",
		path: __dirname + "/minified/scripts/",
		filename: "[name]-[hash].js",
		chunkname: "[name]-[hash].js"
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				include: path.join(__dirname, '../'),
				exclude: /(node_modules|bower_components)/,
				loader: 'babel',
				query: {
					presets: ['es2015', 'stage-0']
				}
			},
			{
				test: /\.less$/,
				loader: "style!css!less"
			},
			{
				test: /\.html$/,
				loader: "handlebars-loader",
				query: {
					helperDirs: [
						__dirname + "/template-helpers"
					]
				}
			}
		]
	},
	resolve: {
		root: [
			path.resolve(__dirname),
			path.resolve('./modules'),
			path.resolve('../')

		],
		alias: {
			modules: enviroment.modules,
			apps: enviroment.apps
		},
		extensions: ['', '.js']
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'Blinx',
			template: './index.ejs',
			inject: 'body',
			filename: '../../index.html'
		}),
		new CleanWebpackPlugin(['scripts'], {
			root: enviroment.minified,
			verbose: true,
			dry: false
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: "shared",
			minChunks: Infinity // disable automatic module selection
		})
	]
};
