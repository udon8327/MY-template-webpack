const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const pathResolve = targetPath => path.resolve(__dirname, targetPath);

module.exports = {
  entry: "./src/index.js",
  output: {
    path: pathResolve("dist"),
    filename: "index.bundle.js"
  },
  module: {
    rules: [
			//將sass轉成css
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
			//將pug轉成html
      {
        test: /\.pug$/,
				use: ['pug-loader']
      }
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
  devServer: {
    port: 9000,
    open: true
  }
};
