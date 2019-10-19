const webpack = require('webpack');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
	entry: "./src/index.js",
	output: {
		path: __dirname + "/dist",
		filename: "[name].js"
	},
	devServer: {
		port: 9000,
		// open: true,
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ['style-loader','css-loader']
			},
			{
				test: /\.sass$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							publicPath: '../',
						},
					},
					'css-loader',
					'sass-loader'
				],
			},
			{
				test: /\.pug$/,
				use: ['html-loader','pug-html-loader']
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf|png|svg|jpg|gif)$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							name: '[name].[ext]',
							outputPath: 'img',
							limit: '1000'
						}
					}
				]
			},
		]
	},
	plugins: [
		//自動生成執行用html檔案
		new HtmlWebPackPlugin({
			template: "./src/index.pug",
			filename: 'index.html',
			hash: true
		}),
		//將css從js獨立拆出來
		new MiniCssExtractPlugin({
			filename: 'css/[name].[contenthash:7].css',
		}),
		new webpack.ProvidePlugin({
			$: "jquery"
		}),
		//自動清空dist資料夾
		new CleanWebpackPlugin()
	],
	// devtool: 'source-map'
};
