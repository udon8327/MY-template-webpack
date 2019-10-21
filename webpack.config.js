const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
	entry: {
		index: './src/js/index.js',
		login: './src/js/login.js'
	},
	output: {
		path: __dirname + '/dist',
		filename: 'js/[name].js'
	},
	plugins: [
		//自動生成執行用html檔案
		new HtmlWebPackPlugin({
			template: './src/index.pug',
			filename: 'index.html',
			hash: true,
			chunks: ['jquery','index']
		}),
		new HtmlWebPackPlugin({
			template: './src/login.pug',
			filename: 'login.html',
			hash: true,
			chunks: ['jquery','login']
		}),
		//將css從js獨立拆出來
		new MiniCssExtractPlugin({
			filename: 'css/[name].css',
		}),
		new webpack.ProvidePlugin({
			$: 'jquery'
		}),
		//自動清空dist資料夾
		new CleanWebpackPlugin(),
	],
	module: {
		rules: [
			{
				test: /\.(s?css|sass)$/,
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
				test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
				loader: 'url-loader',
				options: {
					limit: 10000,
					name: 'img/[name].[ext]?[hash:7]',
				}
			},
			{
				test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
				loader: 'url-loader',
				options: {
					limit: 10000,
					name: 'media/[name].[ext]?[hash:7]',
				}
			},
			{
				test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
				loader: 'url-loader',
				options: {
					limit: 10000,
					name: 'fonts/[name].[ext]?[hash:7]',
				}
			},
			{
				test: /\.(js?x)?$/,
				use: {
					loader: 'babel-loader'
				}, 
				exclude: /node_modules/
			}
		]
	},
	optimization: {
		splitChunks: {
			cacheGroups: {
				commons: {
					test: /jquery/,
					name: 'jquery',
					chunks: 'all'
				}
			}
		}
	},
	// devServer: {
	// 	port: 9000,
	// 	hot: true,
	// 	hotOnly: true
	// },
	// devtool: 'source-map'
};
