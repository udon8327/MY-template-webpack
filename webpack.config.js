const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const devMode = process.env.NODE_ENV !== 'production';
const pathResolve = targetPath => path.resolve(__dirname, targetPath);

module.exports = {
  entry: "./src/index.js",
  output: {
    path: pathResolve("dist"),
    filename: "index.bundle.js"
	},
  devServer: {
    port: 9000,
    // open: true,
  },
  module: {
    rules: [
			//解析sass
      {
        test: /\.sass$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
					'css-loader',
					'sass-loader'
        ],
			},
			//解析pug
      {
        test: /\.pug$/,
				use: ['pug-loader']
			},
			//解析圖片
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
				use: [
					{
						loader: 'url-loader',
						options: {
							name: '[name].[ext]',
							outputPath: 'img/',
							// limit: 8192
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
		//自動清空dist資料夾
		new CleanWebpackPlugin()
	],
};
